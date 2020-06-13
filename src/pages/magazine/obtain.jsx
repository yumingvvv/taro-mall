import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Swiper, SwiperItem, Navigator} from '@tarojs/components';
import {AtFloatLayout} from "taro-ui";
import './obtain.less';
import {linkIcon} from "../../static/images";

class Index extends Component {

  config = {
    navigationBarTitleText: '这是杂志的标题'
  };

  state = {
    id: 'id',
    name: '名字名字名字名字名字名字名字名字',
    number: 124,
    swiperImg: Array(4).fill({
      imgUrl: 'http://yanxuan.nosdn.127.net/ca6d234917832d759c2905c2094b2a54.png'
    }),
    isOpenFloat: false,
    exchangeCode: ''
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

  // 购买阅读码
  onBuy = () => {
    const {id} = this.state;
    Taro.navigateTo({
      url: `/pages/magazine/buy?id=${id}`
    })
  };

  // 使用兑换码进行兑换
  onExchange = () => {
    const {exchangeCode} = this.state;
    if (!exchangeCode) {
      Taro.showToast({
        icon: 'none',
        title: '请输入阅读码'
      });
      return;
    }
    Taro.showToast({
      icon: 'none',
      title: '暂时无法兑换~'
    })
  };

  // 阅读码兑换弹层显示状态切换
  onToggleFloatLayout = () => {
    this.setState(prev => {
      return {isOpenFloat: !prev.isOpenFloat}
    })
  };

  render() {
    const {id, name, number, swiperImg, isOpenFloat, exchangeCode} = this.state;
    return (
      <View className='obtain'>

        <Swiper
          circular
          indicatorDots
          indicatorActiveColor='#c32830'
          className='swiper'>
          {swiperImg.map(it => {
            return <SwiperItem
              key={it.imgUrl}
              className='swiper__item'>
              <Image className='swiper__img' src={it.imgUrl}/>
            </SwiperItem>
          })}
        </Swiper>

        <View className="info">
          <Text className='number'>{number}次订阅</Text>
          <Text className='name'>{name}</Text>
          <Navigator className='link' url={`/pages/magazine/subscription?id=-${id}`}>
            <Image className='link__icon' src={linkIcon}/>
            <Text className='link__text'>点击查看订阅排行榜</Text>
          </Navigator>
        </View>

        <View className="footer">
          <Button className='footer__btn' onClick={this.onBuy}>购买阅读码</Button>
          <Button className='footer__btn black' onClick={this.onToggleFloatLayout}>使用阅读码</Button>
        </View>

        <AtFloatLayout isOpened={isOpenFloat} onClose={this.onToggleFloatLayout.bind(this)}>
          <Text className='float-layout__title'>请输入您的阅读码</Text>
          <Text className='float-layout__desc'>使用阅读码成功兑换期刊后，可免费阅读期刊，已兑换过的期刊无法再次兑换，可将阅读码分享给其他好有。</Text>
          <Input
            placeholder='输入阅读码'
            value={exchangeCode}
            className='float-layout__input'
            onInput={event => {
              this.setState({exchangeCode: event.detail.value})
            }}
          />
          <View className="btn-group">
            <Button className="btn btn-cancel" onClick={this.onToggleFloatLayout}>取消</Button>
            <Button className="btn btn-confrim" onClick={this.onExchange}>确定</Button>
          </View>
        </AtFloatLayout>

      </View>
    );
  }
}

export default Index;
