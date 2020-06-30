if (process.env.TARO_ENV === 'h5') {
    var Taro = require('@tarojs/taro-h5');
}

if (process.env.TARO_ENV === 'weapp') {
    var Taro = require('@tarojs/taro-weapp');
}

var getApp = require('../../../pages/magazine-home/getApp');

var util = require("../js/util.js");

module.exports = {
    request: function(t, e) {
        var o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0, a = arguments[3], s = (arguments[4], 
        5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : "GET");
        debugger;
        util.request({
            url: t,
            method: s,
            data: e,
            cachetime: o,
            success: function(t) {
                a(t.data.data);
            },
            fail: function(e) {
                "1" == e.data.errno ? a(Taro.showToast({
                    title: e.data.message,
                    icon: "success",
                    duration: 3e3
                })) : "2" == e.data.errno ? a(Taro.showModal({
                    title: "提示",
                    content: e.data.message,
                    success: function(t) {
                        e.confirm ? Taro.navigateBack() : e.cancel;
                    }
                })) : a(Taro.showModal({
                    title: "提示",
                    content: e.data.message,
                    success: function(t) {}
                }));
            }
        });
    },
    getUserinfo: function(o) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "", e = Taro.getStorageSync("userInfo");
        e ? 1 == t ? module.exports.request("entry/wxapp/GetUserInfoOne", {
            openid: e.openid
        }, "", function(t) {
            if (0 != t) return Taro.setStorageSync("userInfo", t), o.setData({
                userInfo: t
            }), !1;
            module.exports.jump(1, "/dg_costread/pages/user/tips-info/index");
        }, this) : (Taro.setStorageSync("userInfo", e), o.setData({
            userInfo: e
        })) : Taro.login({
            success: function(t) {
                var e = this;
                t.code ? module.exports.request("entry/wxapp/GetSessionkey", {
                    code: t.code
                }, "", function(t) {
                    t && module.exports.request("entry/wxapp/GetUserInfoOne", {
                        openid: t.openid
                    }, "", function(t) {
                        if (0 != t) return Taro.setStorageSync("userInfo", t), o.setData({
                            userInfo: t
                        }), !1;
                        module.exports.jump(1, "/dg_costread/pages/user/tips-info/index");
                    }, e);
                }, this) : callback(Taro.showModal({
                    title: "提示",
                    content: t.data.message
                }));
            }
        });
    },
    hint: function(t, e, o, a) {
        1 == t ? Taro.showToast({
            title: e,
            icon: "none",
            duration: o
        }) : a(2 == t ? Taro.showModal({
            title: o,
            content: e,
            success: function(t) {
                t.confirm ? Taro.navigateBack() : t.cancel && Taro.navigateBack();
            }
        }) : Taro.showModal({
            title: o,
            content: e,
            success: function(t) {
                console.log(t);
            }
        }));
    },
    jump: function(t, e) {
        1 == t ? Taro.navigateTo({
            url: e
        }) : 2 == t ? Taro.redirectTo({
            url: e
        }) : 3 == t ? Taro.switchTab({
            url: e
        }) : 4 == t ? Taro.reLaunch({
            url: e
        }) : 5 == t && Taro.navigateBack({
            delta: e
        });
    },
    system: function(e) {
        var o = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
        module.exports.request("entry/wxapp/System", "", "", function(t) {
            e.setData({
                color: t.color
            }), Taro.setNavigationBarColor({
                frontColor: t.frontColor,
                backgroundColor: t.topBackcolor
            }), Taro.setStorageSync("title", t.title), Taro.setStorageSync("share_title", t.share_title), 
            1 == o && Taro.setNavigationBarTitle({
                title: t.title
            }), Taro.setStorageSync("tabbar", t.tabbar), e.setData({
                tabbar: t.tabbar,
                tabbarcolor: t.tabbarcolor,
                textcolor: t.textcolor
            });
        }, e);
    },
    uploadImage: function(e) {
        var o = this, a = e.i ? e.i : 0, s = e.success ? e.success : 0, n = e.fail ? e.fail : 0, i = e.formData;
        if (i.orderTwo = a, null != e.path[a]) {
            var t = e.path[a].indexOf("images");
            console.log("data.path[i]", e.path[a]), -1 == t ? Taro.uploadFile({
                url: e.url,
                filePath: e.path[a],
                name: "file",
                formData: i,
                success: function(t) {
                    s++;
                },
                fail: function(t) {
                    n++;
                },
                complete: function(t) {
                    console.log("res", t), a++, console.log("有更新请求"), a >= e.path.length ? console.log("成功：" + s, "失败：" + n) : (e.i = a, 
                    e.success = s, e.fail = n, o.uploadImage(e));
                }
            }) : (i.path = e.path[a], console.log(i), this.request("entry/wxapp/PublishUploads", i, "", function(t) {
                delete i.path, console.log(i), a++, console.log("无更新请求"), a >= e.path.length || (e.i = a, 
                e.success = s, e.fail = n, o.uploadImage(e));
            }, this));
        }
    },
    getMobleInfo: function() {
        Taro.getSystemInfo({
            success: function(t) {
                var e = t.system.substr(0, 3).toLocaleLowerCase();
                getApp.default.getApp().then(function(app){
                    app.globalData.MobileSystem = "ios" == e ? 1 : 0;
                });
            },
            fail: function(t) {
                getApp.default.getApp().then(function(app){
                    app.globalData.MobileSystem = 1;
                });
            }
        });
    }
};