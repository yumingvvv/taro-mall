import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Swiper, SwiperItem, Navigator, Button, Input} from '@tarojs/components';
import {AtFloatLayout} from "taro-ui";
import './obtain.less';
import {linkIcon} from "../../static/images";
import api from "../../config/api";
import {isLogin} from "../../utils/user";

class Index extends Component {

  config = {
    navigationBarTitleText: 'loading...'
  };

  state = {
    id: '',
    title: 'loading...',
    zanNum: 0,
    pay_money: '',
    swiperImg: [],
    isOpenFloat: false,
    exchangeCode: ''
  };


  componentWillMount() {
  }

  componentDidMount() {
    // 页面初始化 options为页面跳转所带来的参数
    const {id} = this.$router.params;
    this.setState({id});
    this.getDetail(id);
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  getDetail = (id) => {
    Taro.showLoading({
      mask:true
    });
    const app = Taro.getApp().config;
    const _function = app._function;
    _function.request(api.magazineDetail, {id}, "", (res) => {
      const {article, related} = res;
      const swiperImg = [];
      if (article.thumb) {
        swiperImg.push(article.thumb);
      }
      related.forEach(item => {
        swiperImg.push(item.thumb)
      });
      Taro.setNavigationBarTitle({
        title: article.title
      });
      this.setState({...article, swiperImg});
      setTimeout(()=>{
        Taro.hideLoading();
      },600)
    }, this, "GET");
  };

  // 购买阅读码
  onBuy = () => {
    if (!isLogin()) {
      Taro.navigateTo({
        url: `/pages/magazine/auth/login`
      });
      return;
    }
    const {id} = this.state;
    this.$preload(this.state);
    Taro.navigateTo({
      url: `/pages/magazine/buy?id=${id}`
    })
  };

  // 使用兑换码进行兑换
  onExchange = () => {
    const {id, exchangeCode} = this.state;
    if (!exchangeCode) {
      Taro.showToast({
        icon: 'none',
        title: '请输入阅读码'
      });
      return;
    }
    const app = Taro.getApp().config;
    const _function = app._function;
    const openId = Taro.getStorageSync('openid');
    _function.request(api.magazineRead, {id, readCode: exchangeCode, openId}, "", (res) => {
      const {url} = res;
      if (url) {
        Taro.showToast({
          icon: 'none',
          title: '兑换成功'
        });

        var _url = Taro.getStorageSync('currentUrl');
        var _urlData = Taro.getStorageSync('currentUrlData');

        var newUrl = url + '&id=' + _urlData.id + '&readCode=' + _urlData.readCode;
        _url = _url.replace(/Read/, 'DetailImg').replace(/(.*)\?(.*)/, '$2');
        newUrl = newUrl + '&' + _url;
        console.log(33333);
        console.log(newUrl);
        setTimeout(() => {
          Taro.navigateTo({
            url: `/pages/webview/index?url=${encodeURIComponent(newUrl)}`
          })
        }, 1000)
      }

    }, this, "GET");
  };

  // 阅读码兑换弹层显示状态切换
  onToggleFloatLayout = () => {
    this.setState(prev => {
      return {isOpenFloat: !prev.isOpenFloat}
    })
  };

  render() {
    const {id, title, zanNum, swiperImg, isOpenFloat, exchangeCode} = this.state;
    return (
      <View className='obtain'>

        <Swiper
          circular
          indicatorDots
          indicatorActiveColor='#c32830'
          className='swiper'
        >
          {swiperImg.map(it => {
            return <SwiperItem
              key={it}
              className='swiper__item'
            >
              <Image className='swiper__img' webp mode={"aspectFill"} src={it}/>
            </SwiperItem>
          })}
        </Swiper>

        <View className='info'>
          <Text className='number'>{zanNum}次订阅</Text>
          <Text className='name'>{title}</Text>
          <Navigator className='link' url={`/pages/magazine/subscription?id=-${id}`}>
            <Image className='link__icon' src={linkIcon}/>
            <Text className='link__text'>点击查看订阅排行榜</Text>
          </Navigator>
        </View>

        <View className='footer'>
          <Button className='footer__btn' onClick={this.onBuy}>购买阅读码</Button>
          <Button className='footer__btn black' onClick={this.onToggleFloatLayout}>使用阅读码</Button>
        </View>

        <AtFloatLayout isOpened={isOpenFloat} onClose={this.onToggleFloatLayout.bind(this)}>
          <Text className='float-layout__title'>请输入您的阅读码</Text>
          <Text className='float-layout__desc'>使用阅读码成功兑换期刊后，可免费阅读期刊，已兑换过的期刊无法再次兑换，可将阅读码分享给其他好友。</Text>
          <Input
            placeholder='输入阅读码'
            value={exchangeCode}
            className='float-layout__input'
            onInput={event => {
              this.setState({exchangeCode: event.detail.value})
            }}
          />
          <View className='btn-group'>
            <Button className='btn btn-cancel' onClick={this.onToggleFloatLayout}>取消</Button>
            <Button className='btn btn-confrim' onClick={this.onExchange}>确定</Button>
          </View>
        </AtFloatLayout>

      </View>
    );
  }
}

export default Index;
