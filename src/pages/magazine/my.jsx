import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Navigator} from '@tarojs/components';
import './my.less';
import {AtAvatar} from "taro-ui";
import {sexIcon1, sexIcon2} from "../../static/images";

class Index extends Component {

  config = {
    navigationBarTitleText: '我的账户'
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
      <View className='my'>

        <View className="header">
          <Image className='header__bg' src='http://yanxuan.nosdn.127.net/c661ccc2fdcf2ab7e25129a2fa7dced0.jpg'/>
          <View className='userinfo'>
            <AtAvatar image={headimg} size={"large"} circle/>
            <View style={{marginLeft: '20px'}}>
              <Text className='userinfo__name'>{name}</Text>
              <Text className='userinfo__id'>ID: {id}</Text>
              <Image className='userinfo__sex' src={sex === 1 ? sexIcon1 : sexIcon2}/>
            </View>
          </View>
          <Navigator className='edit' url={`/pages/magazine/userifno-edit`}>
            编辑
          </Navigator>
        </View>

        <View className="data">
          <View className="data__item">
            <Text className='data__item__number'>{magazineNum}</Text>
            <Text>杂志</Text>
          </View>
          <View className="data__item">
            <Text className='data__item__number'>{codeNum}</Text>
            <Text>阅读码</Text>
          </View>
        </View>

      </View>
    );
  }
}

export default Index;
