(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/qui-auth/qui-auth"],{"1d43":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=u(a("8605")),r=u(a("245a")),s=a("0301"),i=a("198a"),o=u(a("412c"));function u(t){return t&&t.__esModule?t:{default:t}}var c={mixins:[n.default,r.default,o.default],computed:{t:function(){return this.i18n.t("auth")}},methods:{handleGetUserInfo:function(e){if("getUserInfo:ok"===e.detail.errMsg){var a=t.getStorageSync("register");this.getmpParams(a)}else this.$emit("login")},getmpParams:function(){var e=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise((function(n,r){t.login({success:function(n){if("login:ok"===n.errMsg){var s=n.code;t.getUserInfo({success:function(t){var n={data:{attributes:{js_code:s,iv:t.iv,encryptedData:t.encryptedData,register:a}}};e.$store.dispatch("session/setParams",n),e.refreshmpParams(),e.getParams()},fail:function(t){r(t)}})}},fail:function(t){r(t)}})}))},getParams:function(){var e={data:{attributes:{}}},a=this.$store.getters["session/get"]("params");a&&a.data&&a.data.attributes&&(e.data.attributes.js_code=a.data.attributes.js_code,e.data.attributes.iv=a.data.attributes.iv,e.data.attributes.encryptedData=a.data.attributes.encryptedData,e.data.attributes.register=a.data.attributes.register);var n=t.getStorageSync("inviteCode");""!==n&&(e.data.attributes.code=n);var r=t.getStorageSync("isSend");r&&this.noSenseLogin(e)},noSenseLogin:function(e){var a=this,n=getCurrentPages(),r=n[n.length-1].route;"pages/site/partner-invite"===r||"pages/user/login"===r||"pages/user/phone-login"===r||"pages/user/phone-login-register"===r?t.setStorage({key:"page",data:"/pages/home/index"}):t.setStorage({key:"page",data:(0,i.getCurUrl)()}),this.$store.dispatch("session/noSenseMPLogin",e).then((function(e){if(e&&e.data){if(a.$emit("login"),e.data.data&&e.data.data.id){if(a.logind(),a.forums&&a.forums.set_site&&a.forums.set_site.site_mode!==s.SITE_PAY){t.getStorage({key:"page",success:function(e){t.redirectTo({url:e.data})}});var n=t.getStorageSync("isBind");n?t.showToast({title:"绑定成功",duration:2e3}):t.showToast({title:"登录成功",duration:2e3})}a.forums&&a.forums.set_site&&a.forums.set_site.site_mode===s.SITE_PAY&&a.user&&!a.user.paid&&(t.redirectTo({url:"/pages/site/info"}),t.getStorage({key:"isBind",success:function(e){e.data?t.showToast({title:"绑定成功",duration:2e3}):t.showToast({title:"登录成功",duration:2e3})}}))}if(e.data.errors&&("no_bind_user"===e.data.errors[0].code||"register_close"===e.data.errors[0].code)){var r={headimgurl:e.data.errors[0].user.headimgurl,username:e.data.errors[0].user.username};t.setStorageSync("token",e.data.errors[0].token),t.setStorageSync("userInfo",r),a.jump2RegisterBindPage()}}})).catch((function(t){console.log(t)}))},close:function(){this.$emit("close")}}};e.default=c}).call(this,a("543d")["default"])},"2cc6":function(t,e,a){},"881b":function(t,e,a){"use strict";var n=a("2cc6"),r=a.n(n);r.a},c060:function(t,e,a){"use strict";a.r(e);var n=a("dce8"),r=a("c50a");for(var s in r)"default"!==s&&function(t){a.d(e,t,(function(){return r[t]}))}(s);a("881b");var i,o=a("f0c5"),u=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,"72542cbf",null,!1,n["a"],i);e["default"]=u.exports},c50a:function(t,e,a){"use strict";a.r(e);var n=a("1d43"),r=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=r.a},dce8:function(t,e,a){"use strict";a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return n}));var n={quiIcon:function(){return a.e("components/qui-icon/qui-icon").then(a.bind(null,"5d1d"))},quiButton:function(){return a.e("components/qui-button/qui-button").then(a.bind(null,"a67c"))}},r=function(){var t=this,e=t.$createElement;t._self._c},s=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/qui-auth/qui-auth-create-component',
    {
        'components/qui-auth/qui-auth-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c060"))
        })
    },
    [['components/qui-auth/qui-auth-create-component']]
]);