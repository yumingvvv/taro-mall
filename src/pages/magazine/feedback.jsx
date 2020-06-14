import Taro, {Component} from '@tarojs/taro';
import {View, Text, Button,} from '@tarojs/components';
import "./feedback.less";
import {AtButton, AtTextarea} from "taro-ui";

class Index extends Component {

  config = {
    navigationBarTitleText: '意见反馈'
  };

  state = {
    value: ''
  };

  textareaChange(value) {
    this.setState({
      value
    })
  }

  onConfrim = () => {
    Taro.showToast({
      icon: 'success',
      title: '提交！'
    })
  };

  render() {
    const {value} = this.state;
    return (
      <View className='feedback'>

        <AtTextarea
          value={value}
          onChange={this.textareaChange.bind(this)}
          maxLength={200}
          placeholder='如您近期电子刊购买后未收到阅读码,请尝试删除小程序再次进入,具体方法参考【使用帮助没收到阅读码?】;如您早期的电子刊丢失,请注明期刊名称、订阅日期、以及订阅本数。我们会在后台进行核实,并在1个工作日内在【我的消'
        />

        <Button className='btn-confrim' onClick={this.onConfrim}>提交</Button>

      </View>
    );
  }
}

export default Index;
