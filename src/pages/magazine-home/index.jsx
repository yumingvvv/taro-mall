import Taro, { Component } from '@tarojs/taro';
import { Image, View, Text, Swiper, SwiperItem, Navigator } from '@tarojs/components';
import './index.less';
import { AtTabs, AtTabsPane } from "taro-ui";

class Index extends Component {



  state = {
    is_pay: false,
    dg_article_title: '',
    wxapp_article_hottitle: '',
    wxapp_serialize_newtitle: '',
    recommend: Array(10).fill({
      id: (Math.random() * 100) + '',
      title: '左卓：有人在等我',
      number: 454,
      cover: 'http://yanxuan.nosdn.127.net/aa61b539c0f3ad675dbfd12d6fb64254.png'
    }),
    classify: Array(10).fill({
      id: 'id',
      title: '分类标题'
    }),
    listObj: {
      // 以分类id当做键值
      'id': Array(10).fill({
        id: (Math.random() * 100) + '',
        title: '左卓：有人在等我',
        number: 454,
        cover: 'http://yanxuan.nosdn.127.net/aa61b539c0f3ad675dbfd12d6fb64254.png'
      })
    },
    curTab: 0,
  };

  config = {
    navigationBarTitleText: "凝iDEAL"
  };

  componentWillMount() {
  }

  componentDidMount() {
    // 页面初始化 options为页面跳转所带来的参数
    // const {id} = this.$router.params;

    this.getDatum();

  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  // 点击杂志切换分类
  clickTab = (index) => {
    this.setState({ curTab: index })
  };


  getDatum = () => {
    var a = this;
    let app = Taro.getApp().config;
    var _function = app._function;

    _function.request("entry/wxapp/Index", {}, "", function (t) {
      app.globalData.msgsh = t.modules.msgsh;
      app.globalData.artsh = t.modules.artsh;
      app.globalData.vipCon = t.modules.vipCon;
      t.modules
      Taro.setStorageSync("is_pay", t.modules.is_pay);
      var e = Taro.getStorageSync("is_pay");

      a.setState({
        is_pay: 1 == e,
        dg_article_title: t.modules.dg_article_title,
        wxapp_article_hottitle: t.modules.wxapp_article_hottitle,
        wxapp_serialize_newtitle: t.modules.w
      });
    }, this, "POST");
  };


  render() {
    const { recommend, classify, listObj, curTab } = this.state;
    return (
      <View className='index'>

        <Swiper
          circular
          className='recommend'
          previousMargin='30px'
          nextMargin='30px'
        >
          {recommend.map(it => {
            return <SwiperItem key={it.id} className='recommend__item'>
              <Text className='recommend__title'>{it.title}</Text>
              <Text className='recommend__number'>{it.number}次订阅</Text>
              <Navigator url={`/pages/magazine/obtain?id=${it.id}`}>
                <Image className='recommend__cover' src={it.cover} />
              </Navigator>
            </SwiperItem>
          })}
        </Swiper>

        <AtTabs
          current={curTab}
          scroll
          tabList={classify}
          onClick={this.clickTab.bind(this)}
        >

          {classify.map((it, index) => {
            const magazineList = it.id in listObj && listObj[it.id];
            return <AtTabsPane current={curTab} index={index} key={it.id}>
              <View className='magazine'>
                {magazineList ? magazineList.map((magazine, magazineIndex) => {
                  return <View key={magazine.id} className='magazine__wrap'>
                    <Text className={`magazine__index magazine__index--${magazineIndex + 1}`}
                      style={{ opacity: index === 0 ? 1 : 0 }}
                    >
                      {magazineIndex + 1}
                    </Text>
                    <Navigator
                      url={`/pages/magazine/obtain?id=${magazine.id}`}
                      className='magazine__item'
                    >
                      <Image className='magazine__cover' src={magazine.cover} />
                      <Text className='magazine__title'>{magazine.title}</Text>
                      <Text className='magazine__number'>{magazine.number}次订阅</Text>
                    </Navigator>
                  </View>
                }) :
                  <View className='null-tips'>暂无数据</View>}
              </View>
            </AtTabsPane>
          })}

        </AtTabs>

      </View>
    );
  }
}

export default Index;
