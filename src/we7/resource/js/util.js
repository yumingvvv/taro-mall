if (process.env.TARO_ENV === 'h5') {
    var Taro = require('@tarojs/taro-h5');
}

if (process.env.TARO_ENV === 'weapp') {
    var Taro = require('@tarojs/taro-weapp');
}
var getApp = require('../../../pages/magazine-home/getApp');
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var util = {};

getApp.default.getApp().then(function(app){
    util.app = app;
});

function getQuery(e) {
    var t = [];
    if (-1 != e.indexOf("?")) for (var a = e.split("?")[1].split("&"), n = 0; n < a.length; n++) a[n].split("=")[0] && unescape(a[n].split("=")[1]) && (t[n] = {
        name: a[n].split("=")[0],
        value: unescape(a[n].split("=")[1])
    });
    return t;
}

function getUrlParam(e, t) {
    var a = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), n = e.split("?")[1].match(a);
    return null != n ? unescape(n[2]) : null;
}

function getSign(e, t, a) {
    var n = require("./underscore.js"), r = require("./md5.js"), i = "", o = getUrlParam(e, "sign");
    if (o || t && t.sign) return !1;
    if (e && (i = getQuery(e)), t) {
        var s = [];
        for (var u in t) u && t[u] && (s = s.concat({
            name: u,
            value: t[u]
        }));
        i = i.concat(s);
    }
    i = n.sortBy(i, "name"), i = n.uniq(i, !0, "name");
    for (var c = "", g = 0; g < i.length; g++) i[g] && i[g].name && i[g].value && (c += i[g].name + "=" + i[g].value,
    g < i.length - 1 && (c += "&"));
    return o = r(c + (a = a || util.app.config.siteInfo.token));
}

util.url = function(e, t, a) {
    return new Promise(function(resolve){
        getApp.default.getApp().then(function(app){

            var n = (a = util.app).config.siteInfo.siteroot + "?i=" + a.config.siteInfo.uniacid + "&t=" + a.config.siteInfo.multiid + "&v=" + a.config.siteInfo.version + "&from=wxapp&";
    if (e && ((e = e.split("/"))[0] && (n += "c=" + e[0] + "&"), e[1] && (n += "a=" + e[1] + "&"),
    e[2] && (n += "do=" + e[2] + "&")), t) for (param in t) param && t[param] && (n += "param=" + t[param] + "&");
            resolve(n);
        });
    });
}, util.request = function(n) {
    require("./underscore.js");
    var e, t = require("./md5.js"), r = util.app;
    (n = n || {}).cachetime = n.cachetime ? n.cachetime : 0, n.showLoading = void 0 === n.showLoading || n.showLoading;
    var a = Taro.getStorageSync("userInfo").sessionid, i = n.url;
    util.url(i).then(function(_url){
        if (-1 == i.indexOf("http://") && -1 == i.indexOf("https://") && (i = _url),
    getUrlParam(i, "state") || n.data && n.data.state || !a || (i = i + "&state=we7sid-" + a),
    !n.data || !n.data.m) {
        var o = Taro.getCurrentPages();
        o && (o = o[Taro.getCurrentPages().length - 1]).__route__ && (i = i + "&m=" + 'dg_costread'); //fixme:o.__route__.split("/")[0]);
    }
    var s = getSign(i, n.data);
    if (s && (i = i + "&sign=" + s), !i) return !1;
    if (Taro.showNavigationBarLoading(), n.showLoading && util.showLoading(), n.cachetime) {
        var u = t(i), c = Taro.getStorageSync(u), g = Date.parse(new Date());
        if (c && c.data) {
            if (c.expire > g) return n.complete && "function" == typeof n.complete && n.complete(c),
            n.success && "function" == typeof n.success && n.success(c), Taro.hideLoading(), Taro.hideNavigationBarLoading(),
            !0;
            Taro.removeStorageSync(u);
        }
    }
    Taro.request((_defineProperty(e = {
        url: i,
        data: n.data ? n.data : {},
        header: n.header ? n.header : {},
        method: n.method ? n.method : "GET"
    }, "header", {
        "content-type": "application/x-www-form-urlencoded"
    }), _defineProperty(e, "success", function(e) {
        if (Taro.hideNavigationBarLoading(), Taro.hideLoading(), e.data.errno) {
            if ("41009" == e.data.errno) return Taro.setStorageSync("userInfo", ""), void util.getUserInfo(function() {
                util.request(n);
            });
            if (n.fail && "function" == typeof n.fail) n.fail(e); else if (e.data.message) {
                if (null != e.data.data && e.data.data.redirect) var t = e.data.data.redirect; else t = "";
                r.util.message(e.data.message, t, "error");
            }
        } else if (n.success && "function" == typeof n.success && n.success(e), n.cachetime) {
            var a = {
                data: e.data,
                expire: g + 1e3 * n.cachetime
            };
            Taro.setStorageSync(u, a);
        }
    }), _defineProperty(e, "fail", function(e) {
        Taro.hideNavigationBarLoading(), Taro.hideLoading();
        var t = require("./md5.js")(i), a = Taro.getStorageSync(t);
        if (a && a.data) return n.success && "function" == typeof n.success && n.success(a),
        console.log("failreadcache:" + i), !0;
        n.fail && "function" == typeof n.fail && n.fail(e);
    }), _defineProperty(e, "complete", function(e) {
        n.complete && "function" == typeof n.complete && n.complete(e);
    }), e));
    });


}, util.getUserInfo = function(a) {
    var e = function() {
        console.log("start login");
        var t = {
            sessionid: "",
            wxInfo: "",
            memberInfo: ""
        };
        Taro.login({
            success: function(e) {
                util.request({
                    url: "auth/session/openid",
                    data: {
                        code: e.code
                    },
                    cachetime: 0,
                    success: function(e) {
                        e.data.errno || (t.sessionid = e.data.data.sessionid, Taro.setStorageSync("userInfo", t),
                        Taro.getUserInfo({
                            success: function(e) {
                                t.wxInfo = e.userInfo, Taro.setStorageSync("userInfo", t), util.request({
                                    url: "auth/session/userinfo",
                                    data: {
                                        signature: e.signature,
                                        rawData: e.rawData,
                                        iv: e.iv,
                                        encryptedData: e.encryptedData
                                    },
                                    method: "POST",
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    cachetime: 0,
                                    success: function(e) {
                                        e.data.errno || (t.memberInfo = e.data.data, Taro.setStorageSync("userInfo", t)),
                                        "function" == typeof a && a(t);
                                    }
                                });
                            },
                            fail: function() {},
                            complete: function() {}
                        }));
                    }
                });
            },
            fail: function() {
                Taro.showModal({
                    title: "获取信息失败",
                    content: "请允许授权以便为您提供给服务",
                    success: function(e) {
                        e.confirm && util.getUserInfo();
                    }
                });
            }
        });
    }, t = Taro.getStorageSync("userInfo");
    t.sessionid ? Taro.checkSession({
        success: function() {
            "function" == typeof a && a(t);
        },
        fail: function() {
            t.sessionid = "", console.log("relogin"), Taro.removeStorageSync("userInfo"), e();
        }
    }) : e();
}, util.navigateBack = function(t) {
    var e = t.delta ? t.delta : 1;
    if (t.data) {
        var a = Taro.getCurrentPages(), n = a[a.length - (e + 1)];
        n.pageForResult ? n.pageForResult(t.data) : n.setData(t.data);
    }
    Taro.navigateBack({
        delta: e,
        success: function(e) {
            "function" == typeof t.success && t.success(e);
        },
        fail: function(e) {
            "function" == typeof t.fail && t.function(e);
        },
        complete: function() {
            "function" == typeof t.complete && t.complete();
        }
    });
}, util.footer = function(e) {
    var t = e, a = util.app.tabBar;
    for (var n in a.list) a.list[n].pageUrl = a.list[n].pagePath.replace(/(\?|#)[^"]*/g, "");
    console.log("asdasdasdasd"), console.log(a), t.setData({
        tabBar: a,
        "tabBar.thisurl": t.__route__
    });
}, util.message = function(e, t, a) {
    if (!e) return !0;
    if ("object" == (void 0 === e ? "undefined" : _typeof(e)) && (t = e.redirect, a = e.type,
    e = e.title), t) {
        var n = t.substring(0, 9), r = "", i = "";
        "navigate:" == n ? (i = "navigateTo", r = t.substring(9)) : "redirect:" == n ? (i = "redirectTo",
        r = t.substring(9)) : (r = t, i = "redirectTo");
    }
    a || (a = "success"), "success" == a ? Taro.showToast({
        title: e,
        icon: "success",
        duration: 2e3,
        mask: !!r,
        complete: function() {
            r && setTimeout(function() {
                wx[i]({
                    url: r
                });
            }, 1800);
        }
    }) : "error" == a && Taro.showModal({
        title: "系统信息",
        content: e,
        showCancel: !1,
        complete: function() {
            r && wx[i]({
                url: r
            });
        }
    });
}, util.user = util.getUserInfo, util.showLoading = function() {
    Taro.getStorageSync("isShowLoading") && (Taro.hideLoading(), Taro.setStorageSync("isShowLoading", !1)),
    Taro.showLoading({
        title: "加载中",
        complete: function() {
            Taro.setStorageSync("isShowLoading", !0);
        },
        fail: function() {
            Taro.setStorageSync("isShowLoading", !1);
        }
    });
}, util.showImage = function(e) {
    var t = e ? e.currentTarget.dataset.preview : "";
    if (!t) return !1;
    Taro.previewImage({
        urls: [ t ]
    });
}, util.parseContent = function(e) {
    if (!e) return e;
    var t = e.match(new RegExp([ "\ud83c[\udf00-\udfff]", "\ud83d[\udc00-\ude4f]", "\ud83d[\ude80-\udeff]" ].join("|"), "g"));
    if (t) for (var a in t) e = e.replace(t[a], "[U+" + t[a].codePointAt(0).toString(16).toUpperCase() + "]");
    return e;
}, util.date = function() {
    this.isLeapYear = function(e) {
        return 0 == e.getYear() % 4 && (e.getYear() % 100 != 0 || e.getYear() % 400 == 0);
    }, this.dateToStr = function(e, t) {
        e = e || "yyyy-MM-dd HH:mm:ss", t = t || new Date();
        var a = e;
        return a = (a = (a = (a = (a = (a = (a = (a = (a = (a = (a = (a = (a = a.replace(/yyyy|YYYY/, t.getFullYear())).replace(/yy|YY/, 9 < t.getYear() % 100 ? (t.getYear() % 100).toString() : "0" + t.getYear() % 100)).replace(/MM/, 9 < t.getMonth() ? t.getMonth() + 1 : "0" + (t.getMonth() + 1))).replace(/M/g, t.getMonth())).replace(/w|W/g, [ "日", "一", "二", "三", "四", "五", "六" ][t.getDay()])).replace(/dd|DD/, 9 < t.getDate() ? t.getDate().toString() : "0" + t.getDate())).replace(/d|D/g, t.getDate())).replace(/hh|HH/, 9 < t.getHours() ? t.getHours().toString() : "0" + t.getHours())).replace(/h|H/g, t.getHours())).replace(/mm/, 9 < t.getMinutes() ? t.getMinutes().toString() : "0" + t.getMinutes())).replace(/m/g, t.getMinutes())).replace(/ss|SS/, 9 < t.getSeconds() ? t.getSeconds().toString() : "0" + t.getSeconds())).replace(/s|S/g, t.getSeconds());
    }, this.dateAdd = function(e, t, a) {
        switch (a = a || new Date(), e) {
          case "s":
            return new Date(a.getTime() + 1e3 * t);

          case "n":
            return new Date(a.getTime() + 6e4 * t);

          case "h":
            return new Date(a.getTime() + 36e5 * t);

          case "d":
            return new Date(a.getTime() + 864e5 * t);

          case "w":
            return new Date(a.getTime() + 6048e5 * t);

          case "m":
            return new Date(a.getFullYear(), a.getMonth() + t, a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());

          case "y":
            return new Date(a.getFullYear() + t, a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds());
        }
    }, this.dateDiff = function(e, t, a) {
        switch (e) {
          case "s":
            return parseInt((a - t) / 1e3);

          case "n":
            return parseInt((a - t) / 6e4);

          case "h":
            return parseInt((a - t) / 36e5);

          case "d":
            return parseInt((a - t) / 864e5);

          case "w":
            return parseInt((a - t) / 6048e5);

          case "m":
            return a.getMonth() + 1 + 12 * (a.getFullYear() - t.getFullYear()) - (t.getMonth() + 1);

          case "y":
            return a.getFullYear() - t.getFullYear();
        }
    }, this.strToDate = function(dateStr) {
        var data = dateStr, reCat = /(\d{1,4})/gm, t = data.match(reCat);
        return t[1] = t[1] - 1, eval("var d = new Date(" + t.join(",") + ");"), d;
    }, this.strFormatToDate = function(e, t) {
        var a = 0, n = -1, r = t.length;
        -1 < (n = e.indexOf("yyyy")) && n < r && (a = t.substr(n, 4));
        var i = 0;
        -1 < (n = e.indexOf("MM")) && n < r && (i = parseInt(t.substr(n, 2)) - 1);
        var o = 0;
        -1 < (n = e.indexOf("dd")) && n < r && (o = parseInt(t.substr(n, 2)));
        var s = 0;
        (-1 < (n = e.indexOf("HH")) || 1 < (n = e.indexOf("hh"))) && n < r && (s = parseInt(t.substr(n, 2)));
        var u = 0;
        -1 < (n = e.indexOf("mm")) && n < r && (u = t.substr(n, 2));
        var c = 0;
        return -1 < (n = e.indexOf("ss")) && n < r && (c = t.substr(n, 2)), new Date(a, i, o, s, u, c);
    }, this.dateToLong = function(e) {
        return e.getTime();
    }, this.longToDate = function(e) {
        return new Date(e);
    }, this.isDate = function(e, t) {
        null == t && (t = "yyyyMMdd");
        var a = t.indexOf("yyyy");
        if (-1 == a) return !1;
        var n = e.substring(a, a + 4), r = t.indexOf("MM");
        if (-1 == r) return !1;
        var i = e.substring(r, r + 2), o = t.indexOf("dd");
        if (-1 == o) return !1;
        var s = e.substring(o, o + 2);
        return !(!isNumber(n) || "2100" < n || n < "1900") && (!(!isNumber(i) || "12" < i || i < "01") && !(s > getMaxDay(n, i) || s < "01"));
    }, this.getMaxDay = function(e, t) {
        return 4 == t || 6 == t || 9 == t || 11 == t ? "30" : 2 == t ? e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? "29" : "28" : "31";
    }, this.isNumber = function(e) {
        return /^\d+$/g.test(e);
    }, this.toArray = function(e) {
        e = e || new Date();
        var t = Array();
        return t[0] = e.getFullYear(), t[1] = e.getMonth(), t[2] = e.getDate(), t[3] = e.getHours(),
        t[4] = e.getMinutes(), t[5] = e.getSeconds(), t;
    }, this.datePart = function(e, t) {
        t = t || new Date();
        var a = "";
        switch (e) {
          case "y":
            a = t.getFullYear();
            break;

          case "M":
            a = t.getMonth() + 1;
            break;

          case "d":
            a = t.getDate();
            break;

          case "w":
            a = [ "日", "一", "二", "三", "四", "五", "六" ][t.getDay()];
            break;

          case "ww":
            a = t.WeekNumOfYear();
            break;

          case "h":
            a = t.getHours();
            break;

          case "m":
            a = t.getMinutes();
            break;

          case "s":
            a = t.getSeconds();
        }
        return a;
    }, this.maxDayOfDate = function(e) {
        (e = e || new Date()).setDate(1), e.setMonth(e.getMonth() + 1);
        var t = e.getTime() - 864e5;
        return new Date(t).getDate();
    };
}, module.exports = util;
