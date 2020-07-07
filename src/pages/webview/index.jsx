import Taro, {Component} from '@tarojs/taro';
import {WebView,} from '@tarojs/components';
import "./index.less";

class Index extends Component {

  config = {
    navigationBarTitleText: 'loading...'
  };

  state = {
    webUrl: ''
  };

  componentDidMount() {
    // 页面初始化 options为页面跳转所带来的参数
    const {url} = this.$router.params;
    this.setState({
      webUrl: decodeURIComponent(url)
    })
  }


  render() {
    const {webUrl} = this.state;
    return (
      <WebView src={webUrl}/>
    );
  }
}

export default Index;
