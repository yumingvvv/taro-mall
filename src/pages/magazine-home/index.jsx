import Taro, {Component} from '@tarojs/taro';
import {Image, View, Text, Swiper, SwiperItem, Navigator} from '@tarojs/components';
import './index.less';
import {AtTabs, AtTabsPane} from "taro-ui";
import api from "../../config/api";

class Index extends Component {

  config = {
    navigationBarTitleText: "凝iDEAL"
  };

  state = {
    is_pay: false,
    dg_article_title: '',
    wxapp_article_hottitle: '',
    wxapp_serialize_newtitle: '',
    recommend: [],
    classify: [],
    listObj: {},
    curTab: 0,
  };


  componentWillMount() {
  }

  componentDidMount() {
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
    this.setState({curTab: index})
  };

  getDatum = () => {
    const app = Taro.getApp().config;
    const _function = app._function;
    _function.request(api.magazineHome, {}, "", (res) => {
      const {classify, recom, listObj, modules} = res;
      const {msgsh, artsh, vipCon, is_pay, dg_article_title, wxapp_article_hottitle, w} = modules;
      app.globalData.msgsh = msgsh;
      app.globalData.artsh = artsh;
      app.globalData.vipCon = vipCon;
      Taro.setStorageSync("is_pay", is_pay);
      // 处理返回数据和taro ui字段不一致
      const classifyArr = classify.map(it => {
        return {...it, title: it['name']}
      });
      this.setState({
        is_pay,
        dg_article_title: dg_article_title,
        wxapp_article_hottitle: wxapp_article_hottitle,
        wxapp_serialize_newtitle: w,
        recommend: recom || [],
        classify: classifyArr,
        listObj: {
          [classify[0].id]: listObj
        },
      });
    }, this, "POST");
  };


  render() {
    const {recommend, classify, listObj, curTab} = this.state;
    return (
      <View className='index'>

        <Swiper
          circular
          className='recommend'
          previousMargin='30px'
          nextMargin='30px'
        >
          {recommend && recommend.map(it => {
            return <SwiperItem key={it.id} className='recommend__item'>
              <Text className='recommend__title'>{it.title}</Text>
              <Text className='recommend__number'>{it.zanNum || 0}次订阅</Text>
              <Navigator url={`/pages/magazine/obtain?id=${it.id}`}>
                <Image className='recommend__cover'
                       src={it.thumb.replace('http://10.211.55.5', 'https://yumingvvv.thanks.echosite.cn')}/>
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

          {classify && classify.map((it, index) => {
            const magazineList = it.id in listObj && listObj[it.id];
            return <AtTabsPane current={curTab} index={index} key={it.id}>
              <View className='magazine'>
                {magazineList ? magazineList.map((magazine, magazineIndex) => {
                    return <View key={magazine.id} className='magazine__wrap'>
                      <Text className={`magazine__index magazine__index--${magazineIndex + 1}`}
                            style={{opacity: index === 0 ? 1 : 0}}
                      >
                        {magazineIndex + 1}
                      </Text>
                      <Navigator
                        url={`/pages/magazine/obtain?id=${magazine.id}`}
                        className='magazine__item'
                      >
                        <Image className='magazine__cover'
                               src={(magazine.thumb).replace('http://10.211.55.5', 'https://yumingvvv.thanks.echosite.cn')}/>
                        <Text className='magazine__title'>{magazine.title}</Text>
                        <Text className='magazine__number'>{magazine.zanNum || 0}次订阅</Text>
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
