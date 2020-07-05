import Taro, {Component} from '@tarojs/taro';
import {View, Button} from '@tarojs/components';
import './login.less';
import api from "../../../config/api";

class Index extends Component {

  config = {
    navigationBarTitleText: '授权登录'
  };

  state = {};

  onGetUserInfo = (res) => {
    if (!res.detail.iv) {
      Taro.showToast({
        icon: "none",
        title: "登录授权被拒绝"
      });
      return;
    }
    Taro.showLoading({
      title: '登录中',
      mask: true
    });
    const app = Taro.getApp().config;
    const _function = app._function;
    Taro.login().then(loginRes => {
      _function.request(api.loginByWeixin, {
        code: loginRes.code,
        userInfo: JSON.stringify(res.detail.userInfo)
      }, '', (loginByWeixinRes) => {
        Taro.hideLoading();
        Taro.setStorageSync('userInfo', res.detail.userInfo);
        Taro.setStorageSync('openid', loginByWeixinRes.openid);
        Taro.setStorageSync('session_key', loginByWeixinRes.session_key);
        Taro.navigateBack();
        console.log(loginByWeixinRes);
      }, this, "POST");
    });
  };

  onError = () => {
    Taro.showModal({
      title: '提示',
      content: '您的手机网络可能存在问题，如果不能正常登录请尝试切换网络后重新访问',
      showCancel: false
    })
  };

  // 取消登录
  onCancelLogin = () => {
    const pages = Taro.getCurrentPages();
    if (pages.length > 1) {
      Taro.navigateBack()
    } else {
      Taro.switchTab({
        url: `/pages/index/index`
      })
    }
  };


  render() {
    return (
      <View className='auth-login'>

        <View className='avatar'>
          <OpenData type='userAvatarUrl' default-avatar='/statics/imgs/logo.png'/>
        </View>

        <View className='text'>
          <OpenData type='userNickName' default-text='用户' onError={this.onError}/>，您当前的操作需要登录才能继续，如果需要继续操作请授权获得您的公开信息（昵称、头像等）。
        </View>

        <Button openType='getUserInfo' className='btn' onGetUserInfo={this.onGetUserInfo}>授权登录</Button>

        <Button className='btn bg-color--888 margin-top--20' onClick={this.onCancelLogin}>暂不登录</Button>

      </View>
    );
  }
}

export default Index;
