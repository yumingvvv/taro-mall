import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Navigator, Radio, RadioGroup, Label, Button} from '@tarojs/components';
import {AtInputNumber} from "taro-ui";
import './buy.less';

class Index extends Component {

  config = {
    navigationBarTitleText: '订单支付'
  };

  state = {
    id: 'id',
    name: '名字名字名字名字名字名字名字名字',
    cover: 'http://yanxuan.nosdn.127.net/ca6d234917832d759c2905c2094b2a54.png',
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
    })
  };

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
