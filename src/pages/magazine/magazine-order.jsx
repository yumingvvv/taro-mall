import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Navigator} from '@tarojs/components';
import './index.less';
import api from "../../config/api";

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
    this.getOrder();
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  getOrder = () => {
    const app = Taro.getApp().config;
    const _function = app._function;
    _function.request(api.magazineUserArticle, {}, "", (res) => {
      console.log(res);
    }, this, "GET");
  };

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
