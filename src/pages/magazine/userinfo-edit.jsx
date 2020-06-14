import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Navigator} from '@tarojs/components';
import './userinfo-edit.less';
import {AtAvatar} from "taro-ui";

class Index extends Component {

  config = {
    navigationBarTitleText: '完善个人资料'
  };

  state = {
    id: 'id',
    name: '名字名字名字',
    headimg: 'http://yanxuan.nosdn.127.net/ca6d234917832d759c2905c2094b2a54.png',
    sex: 1,
    magazineNum: 1,
    codeNum: 1
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
    const {id, name, headimg, codeNum, sex, magazineNum} = this.state;
    return (
      <View className='userinfo-edit'>

      </View>
    );
  }
}

export default Index;
