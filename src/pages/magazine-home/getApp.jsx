import Taro, {Component} from '@tarojs/taro';
export default {
  getApp: () => {
    return new Promise((resolve, reject)=>{
      setTimeout(()=> {
        let app = Taro.getApp();
        resolve(app);
      }, 3000);
    });
  }
};
