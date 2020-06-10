import Taro, {Component} from '@tarojs/taro';
import {Image, View} from '@tarojs/components';
import classnames from "classnames";
import {AtAvatar,Text} from "taro-ui";
import './subscription.less';

class Index extends Component {

  config = {
    navigationBarTitleText: '订阅排行榜'
  };

  state = {
    cover: '',//封面图
    list: Array(20).fill({
      name: '名字',
      headimg: '',
      number: 124
    }, 0)
  };

  componentWillMount() {
  }

  componentDidMount() {
    // 页面初始化 options为页面跳转所带来的参数
    const {id} = this.$router.params;

  }

  componentWillReceiveProps(nextProps, nextConText) {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  componentDidNotFound() {
  }


  render() {
    const {cover, list} = this.state;
    const leadArr = list.slice(0, 3);
    [leadArr[0], leadArr[1]] = [leadArr[1], leadArr[0]];
    return (
      <View className='container'>

        <View className='cover'>
          <Image src={cover} className='cover__img' />
        </View>

        {leadArr.map((it, index) => {
          return <View className={classnames('ranking-card', {'ranking-card--large': index === 1})}>
            <AtAvatar circle image={it.headimg} text={it.name} />
            <Text>{it.name}</Text>
            <Text>{it.number}</Text>
          </View>
        })}

      </View>
    );
  }
}

export default Index;
