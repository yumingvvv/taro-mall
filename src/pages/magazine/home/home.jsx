import Taro , { Component } from '@tarojs/taro';
import { View, Text , Button, Swiper, SwiperItem } from '@tarojs/components'
import './index.less';

class Index extends Component {

   config = {
       navigationBarTitleText: '地址管理'
  }

  state={
    addressList: [],
    total: 0
  }

  componentWillMount () {}
  componentDidMount () {}
  componentWillReceiveProps (nextProps,nextContext) {}
  componentWillUnmount () {}
  componentDidShow () {
    // 页面显示
    // this.getAddressList();
  }
  componentDidHide () {}
  componentDidCatchError () {}
  componentDidNotFound () {}



  
  
  render() {
    const {addressList} = this.state;
    console.log('--addressList---', addressList);
    return (
      <View className='container'>
        <Swiper
        className='test-h'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical
        circular
        indicatorDots
        autoplay>
        <SwiperItem>
          <View className='demo-text-1'>1</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-2'>2</View>
        </SwiperItem>
        <SwiperItem>
          <View className='demo-text-3'>3</View>
        </SwiperItem>
      </Swiper>
      </View>
    );
  }
}
export default Index;
