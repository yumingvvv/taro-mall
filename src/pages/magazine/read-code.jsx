import Taro, {Component} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import {AtCard} from "taro-ui";
import api from "../../config/api";
import {isLogin} from "../../utils/user";

class Index extends Component {

  config = {
    navigationBarTitleText: '我的阅读码'
  };

  state = {
    list: [],
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
    if (isLogin()) {
      this.fetchReadCode();
    }
  }

  componentDidHide() {
  }

  fetchReadCode = () => {
    // todo 我怎么知道是哪个杂志的兑换码？？
    const app = Taro.getApp().config;
    const _function = app._function;
    const openid = Taro.getStorageSync('openid');
    _function.request(api.magazineGetReadCode, {openid}, "", (res) => {
      console.log(res);
      this.setState({list: res || []})
    }, this, "GET");
  };

  render() {
    const {list} = this.state;
    return (
      <View className='read-code'>
        {list.map(item => {
          return <View style={{marginBottom: "10px"}}>
            <AtCard
              onClick={() => {
                Taro.setClipboardData({
                  data: item.code
                }).then(() => {
                  Taro.showToast({
                    icon: 'success',
                    title: '已复制'
                  })
                }).catch(() => {
                  Taro.showToast({
                    icon: 'none',
                    title: '设备暂不支持'
                  })
                })
              }}
              title={`阅读码${item.status === 1 ? "已使用" : "未使用"}`}
            >
              阅读码：{item.code}，点击复制
            </AtCard>
          </View>
        })}

      </View>
    );
  }
}

export default Index;
