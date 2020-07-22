import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Navigator} from '@tarojs/components';
import {AtAvatar, AtList, AtListItem} from "taro-ui";
import {sexIcon1, sexIcon2} from "../../static/images";
import './my.less';
import {isLogin} from "../../utils/user";

class Index extends Component {

  config = {
    navigationBarTitleText: '我的账户'
  };

  state = {
    id: 'id',
    nickName: '名字名字名字',
    avatarUrl: 'http://yanxuan.nosdn.127.net/3dc2f889100928735ca662a71fbca862.jpg',
    gender: 1,
    share_profit: 0,
    shang_profit: 0
  };

  myNavMenu = [
    {
      thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      title: '我的阅读码',
      link: '/pages/magazine/read-code'
    },
    {
      thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      title: '我的杂志',
      link: '/pages/magazine/magazine-order'
    },
    {
      thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      title: '意见反馈',
      link: '/pages/magazine/feedback'
    },
    {
      thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
      title: '使用帮助',
      link: '/pages/magazine/help'
    },
  ];

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    if (!isLogin()) {
      Taro.navigateTo({
        url: `/pages/magazine/auth/login`
      });
      return;
    }
    const userInfo = Taro.getStorageSync('userInfo');
    this.setState(userInfo);
  }

  componentDidHide() {
  }


  render() {
    const {id, nickName, avatarUrl, shang_profit, gender, share_profit} = this.state;
    return (
      <View className='my'>

        <View className='header'>
          <Image className='header__bg' src='http://yanxuan.nosdn.127.net/c661ccc2fdcf2ab7e25129a2fa7dced0.jpg'/>
          <View className='userinfo'>
            <AtAvatar image={avatarUrl} size='large' circle/>
            <View style={{marginLeft: '20px'}}>
              <Text className='userinfo__name'>{nickName}</Text>
              <Text className='userinfo__id'>ID: {id}</Text>
              <Image className='userinfo__sex' src={gender === 1 ? sexIcon1 : sexIcon2}/>
            </View>
          </View>
          <Navigator className='edit' url='/pages/magazine/userinfo-edit'>
            编辑
          </Navigator>
        </View>

        <View className='data'>
          <View className='data__item'>
            <Text className='data__item__number'>{share_profit}</Text>
            <Text className='data__item__text'>杂志</Text>
          </View>
          <View className='data__item'>
            <Text className='data__item__number'>{shang_profit}</Text>
            <Text className='data__item__text'>阅读码</Text>
          </View>
        </View>

        <AtList hasBorder={false}>
          {this.myNavMenu.map((it, index) => {
            return <AtListItem
              key={it.title}
              title={it.title}
              arrow='right'
              thumb={it.thumb}
              onClick={() => {
                Taro.navigateTo({
                  url: it.link
                })
              }}
            />
          })}
        </AtList>

      </View>
    );
  }
}

export default Index;
