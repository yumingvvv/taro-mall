import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Navigator} from '@tarojs/components';
import './index.less';

class Index extends Component {

  config = {
    navigationBarTitleText: '我的杂志'
  };

  state = {
    list: Array(10).fill({
      id: (Math.random() * 100) + '',
      title: '郑云龙&阿云嘎：呼朋引伴',
      time: '06-15 12:12',
      cover: 'http://yanxuan.nosdn.127.net/3dc2f889100928735ca662a71fbca862.jpg'
    }),
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
      <View className='index'>

        {list ? list.map((magazine, magazineIndex) => {
            return <View key={magazine.id} className='magazine__wrap'>
              <Text className={`magazine__index magazine__index--${magazineIndex + 1}`}>
                {magazineIndex + 1}
              </Text>
              <Navigator
                url={`/pages/magazine/obtain?id=${magazine.id}`}
                className='magazine__item'
              >
                <Image className='magazine__cover' src={magazine.cover}/>
                <Text className='magazine__title'>{magazine.title}</Text>
                <Text className='magazine__number'>{magazine.time}订阅</Text>
              </Navigator>
            </View>
          }) :
          <View className='null-tips'>暂无数据</View>}

      </View>
    );
  }
}

export default Index;
