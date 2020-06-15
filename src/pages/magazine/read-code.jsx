import Taro, {Component} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import {AtCard} from "taro-ui";

class Index extends Component {

  config = {
    navigationBarTitleText: '我的阅读码'
  };

  state = {
    list: Array(10),
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


  render() {
    const {list} = this.state;
    return (
      <View className='read-code'>

        <AtCard
          note='阅读码可以用来兑换杂志哦！'
          title='阅读码'
        >
          阅读码是：1111
        </AtCard>


      </View>
    );
  }
}

export default Index;
