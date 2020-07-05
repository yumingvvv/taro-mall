import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Navigator, Radio, RadioGroup, Label, Button} from '@tarojs/components';
import {AtInputNumber} from "taro-ui";
import './buy.less';

class Index extends Component {

  config = {
    navigationBarTitleText: '订单支付'
  };

  state = {
    id: '8',
    author_id: '0',
    userId: '24',
    userOpenId: 'oTLpX4wLGk5Pb7PH_ZiEbjBEIM2g',//fixme
    userFopenId: 'null',
    name: '杂志名字',
    cover: 'http://yanxuan.nosdn.127.net/3dc2f889100928735ca662a71fbca862.jpg',
    price: 8,
    buyNumber: 1
  };


  componentWillMount() {
  }

  componentDidMount() {
    // 页面初始化 options为页面跳转所带来的参数
    // const {id} = this.$router.params;

  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  // 点击确定购买
  onConfrimBuy = () => {
    Taro.showToast({
      icon: 'success',
      title: '购买！'
    });
    this.pay();
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
    }, "", function(t) {
        var a = e;
console.log(t);
        1 == t.state ? wx.requestPayment({
            timeStamp: t.timeStamp,
            nonceStr: t.nonceStr,
            package: t.package,
            signType: "MD5",
            paySign: t.paySign,
            success: function(t) {

                // wx.playBackgroundAudio({
                //     dataUrl: a.data.datum.article.bg_music,
                //     complete: a.onPlay
                // });
            },
            fail: function(t) {
                _function.hint(3, "支付失败^_^!", "网络提示", function(t) {});
            }
        }) : _function.hint(1, "网络错误！", "", function(t) {});
    }, this, "POST");
}

  render() {
    const {id, name, cover, price, buyNumber} = this.state;
    return (
      <View className='buy'>

        <View className='buy-box'>
          <Text className='buy-box__title'>正在购买</Text>
          <View className='goods'>
            <Image src={cover} className='goods__cover' />
            <View className='goods__content'>
              <Text className='goods__name'>{name}</Text>
              <Text className='goods__price'>￥{price}</Text>
            </View>
          </View>
        </View>

        <View className='buy-box'>
          <Text className='buy-box__title'>购买数量</Text>
          <RadioGroup className='buy-number'>
            {[1, 10, 100, 500].map((it, index) => {
              return <Label key={it} className='buy-number__item'>
                <View>
                  {process.env.TARO_ENV === 'h5' ?
                    <Radio checked={index === 0} /> :
                    <Radio color='red' checked={index === 0} className='buy-number__radio' />}
                  <Text className='buy-number__text'>购买{it}本</Text>
                </View>
                <Text className='buy-number__price'>￥{price * it}</Text>
              </Label>
            })}
            <Label className='buy-number__item'>
              <View>
                {process.env.TARO_ENV === 'h5' ?
                  <Radio /> :
                  <Radio color='red' className='buy-number__radio' />}

                <AtInputNumber
                  type='number'
                  value={1}
                  min={1}
                  disabledInput
                  onChange={ev => {
                    console.log(ev);
                  }}
                />
              </View>
              <Text className='buy-number__price'>￥{price}</Text>
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
