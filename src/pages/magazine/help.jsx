import Taro, {Component} from '@tarojs/taro';
import {View, Text,} from '@tarojs/components';
import {AtAccordion} from "taro-ui";
import "./help.less";

class Index extends Component {

  config = {
    navigationBarTitleText: '使用帮助'
  };

  state = {
    helpContent: [
      {
        title: '如何使用阅读码?',
        content: `答:进入【 STARBOX小程序】,在【我的账户一-我的阅读码】里可以查看阅读码。如要使用,请在【电子杂志】里点击进入该期杂志,点击屏幕下方的【使用阅读码】,会弹出提示‘是否消耗一个阅读码,开始阅读’,点击确定'后,就可以进行阅读了。`
      },
      {
        title: '没收到阅读码?',
        content: `答:首先,您可以尝试删除小程序,再次进入查看。删除小程序的方法:在微信聊天界面拖住屏幕下拉,出现最近使用的小程序列表。找到 STARBOX小程序,拖拽图标到屏幕最底部进行删除。删除后,请再次进入 STARBOX小程序进行查看。如问题仍未解决,请在【我的账户—-意见反馈】里向客服反应情况,我们会有相应的工作人员联系您,请您随时关注【我的账户我的消息】里给您发送的消息。`
      },
      {
        title: '我以前的电子杂志丢失了怎么办?',
        content: `答:请您发送邮件到【 yunying@ tarbox. top】,需包含如下内容a)邮件标题为‘电子刊丢失b)邮件正文请附上您的小程序ID号码(我的账户一您头像昵称下方的一串ID数字),并列出您丢失的杂志的名称和本数,我们的工作人员核实后会在一个工作日内帮您解决问题。如有特殊情况也请在邮件正文里注明。`
      },
      {
        title: '没有使用过的阅读码可以退换么?',
        content: `答:电子杂志属于虚拟产品,如无系统问题无法退换。`
      },
    ]
  };


  render() {
    const {helpContent} = this.state;
    return (
      <View className='help'>

        {helpContent.map((it, index) => {
          return <AtAccordion
            key={index}
            title={index + 1 + '、' + it.title}
            open={it.isOpen}
            isAnimation={false}
            onClick={() => {
              helpContent[index].isOpen = !helpContent[index].isOpen;
              this.setState({helpContent});
            }}
          >
            <Text className='text'>
              {it.content}
            </Text>
          </AtAccordion>
        })}

      </View>
    );
  }
}

export default Index;
