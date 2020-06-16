import Taro, {Component} from '@tarojs/taro';
import {View, Picker, Input} from '@tarojs/components';
import {AtList, AtListItem} from "taro-ui";
import './userinfo-edit.less';

class Index extends Component {

  config = {
    navigationBarTitleText: '完善个人资料'
  };

  state = {
    id: 'id',
    name: '名字名字名字',
    headimg: 'http://yanxuan.nosdn.127.net/3dc2f889100928735ca662a71fbca862.jpg',
    sex: 1,
    birthday: '2020-11-11'
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

  onChangeSex = e => {
    const sexArr = [
      '女', '男'
    ];
    this.setState({sex: sexArr[e.detail.value]})
  };

  onChangeDate = e => {
    this.setState({birthday: e.detail.value})
  };


  render() {
    const {name, sex, birthday} = this.state;
    return (
      <View className='userinfo-edit'>

        {/* 按照taro-ui list的布局*/}
        <View className='at-list at-list--no-border'>
          <View className='at-list__item at-list--no-border'>
            <View className='at-list__item-container'>
              <View className='at-list__item-content item-content'>
                <View className='item-content__info'>
                  <View className='item-content__info-title'>昵称</View>
                </View>
              </View>
              <View className='at-list__item-extra item-extra'>
                <View className='item-extra__info'>
                  <Input
                    placeholder='请输入昵称'
                    value={name}
                    onInput={event => {
                      this.setState({name: event.detail.value})
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>


        <Picker mode='selector' range={['男', '女']} onChange={this.onChangeSex}>
          <AtList hasBorder={false}>
            <AtListItem
              title='性别'
              arrow='right'
              hasBorder={false}
              extraText={sex === 1 ? '男' : '女'}
            />
          </AtList>
        </Picker>

        <Picker mode='date' onChange={this.onChangeDate}>
          <AtList hasBorder={false}>
            <AtListItem
              title='出生日期'
              arrow='right'
              hasBorder={false}
              extraText={birthday || '选择日期'}
            />
          </AtList>
        </Picker>

      </View>
    );
  }
}

export default Index;
