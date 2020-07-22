import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Navigator, Radio, RadioGroup, Label, Button} from '@tarojs/components';
import {AtInputNumber} from "taro-ui";
import './buy.less';
import api from "../../config/api";

class Index extends Component {

  config = {
    navigationBarTitleText: '订单支付'
  };

  state = {
    id: '8',
    author_id: '0',
    userId: '24',
    userOpenId: '',
    userFopenId: 'null',
    cover: '',
    title: 'loading...',
    zanNum: 0,
    thumb: '',
    pay_money: '',
    inputNumber: 1,//输入的要购买的数量
    buyNumber: -1, //要购买的数量,-1标识取 inputVal 的值
  };


  componentWillMount() {
  }

  componentDidMount() {
    const {id} = this.$router.params;
    const preload = this.$router.preload;
    if (!id || !preload) {
      Taro.showToast({
        icon: 'none',
        title: '网络繁忙，请返回稍后重新进入'
      });
      return;
    }
    this.setState(preload);
    this.fetchUserInfo();
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  fetchUserInfo = () => {
    const app = Taro.getApp().config;
    const _function = app._function;
    const openid = Taro.getStorageSync('openid');
    this.setState({userOpenId: openid});
    _function.request(api.magazineGetUserInfoOne, {openid}, "", (res) => {

    }, this, "GET");
  };

  // 点击确定购买
  onConfrimBuy = () => {
    const {id, author_id, userId, userOpenId, pay_money, userFopenId, inputNumber, buyNumber} = this.state;
    const app = Taro.getApp().config;
    const _function = app._function;
    _function.request(api.magazinePay, {
      id,
      uid: userId,
      openid: userOpenId,
      money: pay_money,
      types: 1,
      amount: Number(buyNumber) === -1 ? inputNumber : buyNumber,
      fxid: Taro.getStorageSync("fxid"),
      fopenid: userFopenId,
    }, "", (res) => {
      const {timeStamp, nonceStr, paySign} = res;
      Taro.requestPayment({
        timeStamp,
        nonceStr,
        package: res.package,
        signType: "MD5",
        paySign,
      })
        .then((res) => {
          console.log(res);
          Taro.showToast({
            icon: 'success',
            title: '已支付'
          });

          _function.request("entry/wxapp/ProduceCode", {
            id,
            uid: userId,
            openid: userOpenId,
            money: pay_money,
            types: 1,
            amount: Number(buyNumber) === -1 ? inputNumber : buyNumber,
            fxid: Taro.getStorageSync("fxid"),
            fopenid: userFopenId,
          }, "", function (t) {
              //产生code之后
              console.log(t);
          }, this, "POST");

        })
        .catch((err) => {
          Taro.showToast({
            icon: 'none',
            title: err.errMsg || '取消支付'
          });
        })

    });
  };


  pay = (t) => {
    let wx = Taro;
    let _function = Taro.getApp().config._function;
    var e = this;

    var a = wx.getStorageSync("fxid");

    // i = wx.getStorageSync("fx_pay_type");
    // this.data.userInfo.fopenid || "scene" != i || _function.request("entry/wxapp/Binding", {
    //     fxid: a,
    //     fx_pay_type: i,
    //     uid: this.data.userInfo.id
    // }, "", function(t) {}, this, "POST");

    var n = 1;//t.currentTarget.dataset.types;
    var o = '9.90'; //t.currentTarget.dataset.money;
    var s;//t.currentTarget.dataset.vid;
    var day;//t.currentTarget.dataset.day;

    // a = a == this.data.userInfo.id ? "" : a;

    // _function.getUserinfo();

    _function.request("entry/wxapp/Pay", {
      id: e.state.id,
      author_id: e.state.author_id,
      uid: e.state.userId,
      openid: e.state.userOpenId,
      money: o,
      types: n,
      day: day,
      fxid: a,
      fopenid: e.state.userFopenId,
      vid: s
    }, "", function (t) {
      var a = e;
      1 == t.state ? wx.requestPayment({
        timeStamp: t.timeStamp,
        nonceStr: t.nonceStr,
        package: t.package,
        signType: "MD5",
        paySign: t.paySign,
        success: function (t) {

          // wx.playBackgroundAudio({
          //     dataUrl: a.data.datum.article.bg_music,
          //     complete: a.onPlay
          // });
        },
        fail: function (t) {
          _function.hint(3, "支付失败^_^!", "网络提示", function (t) {
          });
        }
      }) : _function.hint(1, "网络错误！", "", function (t) {
      });
    }, this, "POST");
  }


  render() {
    const {id, title, thumb, pay_money, inputNumber} = this.state;
    return (
      <View className='buy'>

        <View className='buy-box'>
          <Text className='buy-box__title'>正在购买</Text>
          <View className='goods'>
            <Image src={thumb} className='goods__cover'/>
            <View className='goods__content'>
              <Text className='goods__name'>{title}</Text>
              <Text className='goods__price'>￥{pay_money}</Text>
            </View>
          </View>
        </View>

        <View className='buy-box'>
          <Text className='buy-box__title'>购买数量</Text>
          <RadioGroup className='buy-number'
                      onChange={event => {
                        this.setState({buyNumber: event.detail.value})
                      }}>
            {[1, 10, 100, 500].map((it, index) => {
              return <Label key={it} className='buy-number__item'>
                <View>
                  {process.env.TARO_ENV === 'h5' ?
                    <Radio checked={index === 0} value={it}/> :
                    <Radio color='red' checked={index === 0} value={it} className='buy-number__radio'/>}
                  <Text className='buy-number__text'>购买{it}本</Text>
                </View>
                <Text className='buy-number__price'>￥{(pay_money * it).toFixed(2)}</Text>
              </Label>
            })}
            <Label className='buy-number__item'>
              <View>
                {process.env.TARO_ENV === 'h5' ?
                  <Radio value={-1}/> :
                  <Radio color='red' className='buy-number__radio' value={-1}/>}
                <AtInputNumber
                  type='number'
                  value={inputNumber}
                  min={1}
                  disabledInput
                  onChange={value => {
                    this.setState({inputNumber: value})
                  }}
                />
              </View>
              <Text className='buy-number__price'>￥{(pay_money * inputNumber).toFixed(2)}</Text>
            </Label>
          </RadioGroup>
          <Navigator className='buy-explain' url='/pages/magazine/buy-explain'>查看购买说明</Navigator>
        </View>

        <Button className='btn-confrim' onClick={this.onConfrimBuy}>确认购买</Button>
      </View>
    );
  }


}


export default Index;
