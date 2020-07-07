import Taro, {Component} from '@tarojs/taro'
import {Provider} from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss';
import dva from './dva';
import models from './models';
import * as user from './utils/user';
import {set as setGlobalData, get as getGlobalData} from './global_data';

import Index from './pages/index'


// import configStore from './store'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// const store = configStore()


const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    console.log('系统出错了!');
    // dispatch(action("sys/error", e));
  },
});
const store = dvaApp.getStore();

class App extends Component {

  config = {
    pages: [
      'pages/magazine-home/index',//杂志首页
      'pages/magazine-ucenter/my', //  我的账户
      'pages/index/index',
      'pages/payResult/payResult',
      'pages/checkout/checkout',
      'pages/goods/goods',
      'pages/search/search',
      'pages/catalog/catalog',
      'pages/cart/cart',
      'pages/groupon/myGroupon/myGroupon',
      'pages/category/category',
      'pages/coupon/coupon',
      'pages/webview/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    globalData: {
      userInfo: null
    },
    util: require('./we7/resource/js/util.js'),
    _function: require('./we7/resource/function/function.js'),
    siteInfo: require('./siteInfo.js'),
    tabBar: {
      "backgroundColor": "#fafafa",
      "borderStyle": "white",
      "selectedColor": "#AB956D",
      "color": "#666",
      "list": [{
        "pagePath": "pages/magazine-home/index",
        "iconPath": './static/images/home.png',
        "selectedIconPath": './static/images/home@selected.png',
        "text": "电子杂志"
      }, {
        "pagePath": "pages/index/index",
        "iconPath": './static/images/cart.png',
        "selectedIconPath": './static/images/cart@selected.png',
        "text": "实体商城"
      }, {
        "pagePath": 'pages/magazine-ucenter/my',
        "iconPath": './static/images/my.png',
        "selectedIconPath": './static/images/my@selected.png',
        "text": "我的账户"
      }]
    },
    subpackages: [{
      root: "pages/magazine/",
      name: "magazine",
      pages: [
        'read-code', //  我的阅读码
        'magazine-order', //  我的杂志订单
        'userinfo-edit', //   完善个人资料
        'feedback', //  意见反馈
        'help', //  使用帮助
        'buy-explain', // 购买说明
        'buy', // 杂志购买
        'obtain', //获取杂志：购买、兑换
        'subscription',//杂志订阅排行榜
        'auth/login',//授权登录
      ],
    },
      {
        root: "pages/ucenter/",
        name: "ucenter",
        pages: [
          'index/index',
          'address/address',
          'addressAdd/addressAdd',
          'order/order',
          'orderDetail/orderDetail',
          'aftersaleList/aftersaleList',
          'couponList/couponList',
          'collect/collect',
          'footprint/footprint',
          'couponSelect/couponSelect',

        ],
      },
      {
        root: "pages/auth/",
        name: "auth",
        pages: [
          'login/login',
          'accountLogin/accountLogin',
          'register/register',
          'reset/reset'
        ],
      },
      // {
      //   root: "pages/goods/",
      //   name: "goods",
      //   pages: [
      //     'pages/checkout/checkout',
      //     'pages/goods/goods',
      //     'pages/search/search',
      //     'pages/catalog/catalog',
      //     'pages/cart/cart',
      //     'pages/groupon/myGroupon/myGroupon',
      //     'pages/category/category',
      //     'pages/coupon/coupon',
      //   ]
      // }
    ],
    "networkTimeout": {
      "request": 10000,
      "downloadFile": 10000
    },
    "debug": true,
  };

  componentWillMount() {
    this.update();
  }

  update = () => {
    if (process.env.TARO_ENV === 'weapp') {
      const updateManager = Taro.getUpdateManager();
      Taro.getUpdateManager().onUpdateReady(function () {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })
    }
  };

  componentDidShow() {
    user.checkLogin().then(res => {
      setGlobalData('hasLogin', true);
    }).catch(() => {
      setGlobalData('hasLogin', false);
    });
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
