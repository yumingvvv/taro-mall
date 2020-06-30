var __placeImgeUrlHttps = "https", __emojisReg = "", __emojisBaseSrc = "", __emojis = {}, wxDiscode = require("wxDiscode.js"), HTMLParser = require("htmlparser.js"), empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), block = makeMap("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");

function makeMap(e) {
    for (var t = {}, s = e.split(","), o = 0; o < s.length; o++) t[s[o]] = !0;
    return t;
}

function q(e) {
    return '"' + e + '"';
}

function removeDOCTYPE(e) {
    return e.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*\>\n/, "").replace(/<!DOCTYPE.*\>\n/, "");
}

function html2json(e, n) {
    e = removeDOCTYPE(e), e = wxDiscode.strDiscode(e);
    var i = [], l = {
        node: n,
        nodes: [],
        images: [],
        imageUrls: []
    };
    return HTMLParser(e, {
        start: function(e, t, s) {
            var r = {
                node: "element",
                tag: e
            };
            if (block[e] ? r.tagType = "block" : inline[e] ? r.tagType = "inline" : closeSelf[e] && (r.tagType = "closeSelf"), 
            0 !== t.length && (r.attr = t.reduce(function(e, t) {
                var s = t.name, o = t.value;
                return "class" == s && (r.classStr = o), "style" == s && (r.styleStr = o), o.match(/ /) && (o = o.split(" ")), 
                e[s] ? Array.isArray(e[s]) ? e[s].push(o) : e[s] = [ e[s], o ] : e[s] = o, e;
            }, {})), "img" === r.tag) {
                r.imgIndex = l.images.length;
                var o = r.attr.src;
                o = wxDiscode.urlToHttpUrl(o, __placeImgeUrlHttps), r.attr.src = o, r.from = n, 
                l.images.push(r), l.imageUrls.push(o);
            }
            if (s) {
                var a = i[0] || l;
                void 0 === a.nodes && (a.nodes = []), a.nodes.push(r);
            } else i.unshift(r);
        },
        end: function(e) {
            var t = i.shift();
            if (t.tag !== e && console.error("invalid state: mismatch end tag"), 0 === i.length) l.nodes.push(t); else {
                var s = i[0];
                void 0 === s.nodes && (s.nodes = []), s.nodes.push(t);
            }
        },
        chars: function(e) {
            var t = {
                node: "text",
                text: e,
                textArray: transEmojiStr(e)
            };
            if (0 === i.length) l.nodes.push(t); else {
                var s = i[0];
                void 0 === s.nodes && (s.nodes = []), s.nodes.push(t);
            }
        },
        comment: function(e) {
            var t = {
                node: "comment",
                text: e
            }, s = i[0];
            void 0 === s.nodes && (s.nodes = []), s.nodes.push(t);
        }
    }), l;
}

function transEmojiStr(e) {
    var t = [];
    if (0 == __emojisReg.length || !__emojis) return (n = {
        node: "text"
    }).text = e, o = [ n ];
    e = e.replace(/\[([^\[\]]+)\]/g, ":$1:");
    for (var s = new RegExp("[:]"), o = e.split(s), r = 0; r < o.length; r++) {
        var a = o[r], n = {};
        __emojis[a] ? (n.node = "element", n.tag = "emoji", n.text = __emojis[a], n.baseSrc = __emojisBaseSrc) : (n.node = "text", 
        n.text = a), t.push(n);
    }
    return t;
}

function emojisInit() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", s = arguments[2];
    __emojisReg = e, __emojisBaseSrc = t, __emojis = s;
}

module.exports = {
    html2json: html2json,
    emojisInit: emojisInit
};