import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Navigator} from '@tarojs/components';
import {AtAvatar, AtList, AtListItem} from "taro-ui";
import {sexIcon1, sexIcon2} from "../../static/images";
import './my.less';

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

        <View className='header'>
          <Image className='header__bg' src='http://yanxuan.nosdn.127.net/c661ccc2fdcf2ab7e25129a2fa7dced0.jpg'/>
          <View className='userinfo'>
            <AtAvatar image={headimg} size='large' circle/>
            <View style={{marginLeft: '20px'}}>
              <Text className='userinfo__name'>{name}</Text>
              <Text className='userinfo__id'>ID: {id}</Text>
              <Image className='userinfo__sex' src={sex === 1 ? sexIcon1 : sexIcon2}/>
            </View>
          </View>
          <Navigator className='edit' url='/pages/magazine/userinfo-edit'>
            编辑
          </Navigator>
        </View>

        <View className='data'>
          <View className='data__item'>
            <Text className='data__item__number'>{magazineNum}</Text>
            <Text className='data__item__text'>杂志</Text>
          </View>
          <View className='data__item'>
            <Text className='data__item__number'>{codeNum}</Text>
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
