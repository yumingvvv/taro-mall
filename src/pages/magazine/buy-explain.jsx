import Taro, {Component} from '@tarojs/taro';
import {View, Text,} from '@tarojs/components';
import "./buy-explain.less";

class Index extends Component {

  config = {
    navigationBarTitleText: '购买说明'
  };

  state = {};


  render() {
    return (
      <View className='buy-explain'>

        <View className='view'>
          <Text className='text'>1、如何使用阅读码?</Text>
          <Text className='text'>
            答:在我的账户一我的阅读码里可以查看到您刚刚订阅
            的阅读码。如要使用,请在电子杂志里点击进入该期杂
            志,点击屏幕下方的使用阅读码’,会弹出提示是否消耗
            一个阅读码,开始阅读,点击‘确定'后,就可以进行阅读
          </Text>
        </View>

        <View className='view'>
          <Text className='text'>2、没使用过的阅读码可以退换么?</Text>
          <Text className='text'>
            答:电子杂志属于虚拟产品,如无系统问题概不退换。
          </Text>
        </View>

        <View className='view'>
          <Text className='text'>3、找不到阅读码?</Text>
          <Text className='text'>
            答:首先,您可以尝试删除小程序,再次进入查看。删除
            小程序的方法:在微信聊天界面拖住屏幕下拉,出现最近
            使用的小程序列表。找到 STARBOX小程序,拖拽图标到
            屏幕最底部进行删除。删除后,请再次进入 STARBOX小
            程序进行查看。如问题仍未解决,请在我的账户一意见
            反馈’里向客服反应情况,我们会有相应的工作人员帮您
            解决问题
          </Text>
        </View>

        <View className='view'>
          <Text className='text'> 4、我购买的实体杂志大概多久能发货?</Text>
          <Text className='text'>
            答:预售情况一般发货周期是4周左右。非预售的情况发
            货时间是下单后的2-5个工作日,请您耐心等候!
          </Text>
        </View>

      </View>
    );
  }
}

export default Index;
