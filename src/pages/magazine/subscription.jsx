import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text} from '@tarojs/components';
import classnames from "classnames";
import {AtAvatar} from "taro-ui";
import './subscription.less';
import {goldMedal, copperMedal, silverMedal} from '../../static/images';

class Index extends Component {

  config = {
    navigationBarTitleText: '订阅排行榜'
  };

  state = {
    cover: 'http://yanxuan.nosdn.127.net/9d99e1db487b96b9835b081bcc43e9af.png',//封面图
    list: Array(20).fill({
      name: '名字',
      headimg: 'http://yanxuan.nosdn.127.net/9d99e1db487b96b9835b081bcc43e9af.png',
      number: 124
    }, 0)
  };

  cardIcon = [
    goldMedal,
    copperMedal,
    silverMedal,
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
    const {cover, list} = this.state;
    const leadArr = list.slice(0, 3);
    const listArr = list.slice(4);
    [leadArr[0], leadArr[1]] = [leadArr[1], leadArr[0]];

    return (
      <View className='subscription'>

        <View className='cover'>
          <Image src={cover} className='cover__img' mode={"widthFix"}/>
        </View>

        <View className="ranking-card">
          {leadArr.map((it, index) => {
            return <View className={classnames('ranking-card__item', {'ranking-card__item--large': index === 1})}>
              <AtAvatar circle image={it.headimg} text={it.name} size={index === 1 ? 'large' : 'default'}/>
              <Text className='ranking-card__name'>{it.name}</Text>
              <Text className='ranking-card__number'>{it.number}次订阅</Text>
              <Image className='ranking-card__icon' src={this.cardIcon[index]}/>
            </View>
          })}
        </View>

        <View className="ranking-list">

          <View className={classnames('ranking-list__header')}>
            <Text className='text'>排名</Text>
            <Text className='text'>订阅量</Text>
          </View>

          {listArr.map((it, index) => {
            return <View className={classnames('ranking-list__item')}>
              <Text className='ranking-list__number'>{index + 4}</Text>
              <View className="ranking-list__content">
                <View className="ranking-list__user">
                  <AtAvatar circle image={it.headimg} text={it.name} size={"small"}/>
                  <Text className='ranking-list__name'>{it.name}</Text>
                </View>
                <Text className='ranking-list__number'>{it.number}次</Text>
              </View>
            </View>
          })}
        </View>


      </View>
    );
  }
}

export default Index;
