(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/profile"],{"09d1":function(e,n,t){"use strict";var o=t("1769"),i=t.n(o);i.a},1769:function(e,n,t){},"54f8":function(e,n,t){"use strict";(function(e){t("3768");o(t("66fd"));var n=o(t("5f79"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},"5f79":function(e,n,t){"use strict";t.r(n);var o=t("8428"),i=t("6dec");for(var s in i)"default"!==s&&function(e){t.d(n,e,(function(){return i[e]}))}(s);t("09d1");var r,a=t("f0c5"),u=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"c6a1e8b4",null,!1,o["a"],r);n["default"]=u.exports},"6dec":function(e,n,t){"use strict";t.r(n);var o=t("947f"),i=t.n(o);for(var s in o)"default"!==s&&function(e){t.d(n,e,(function(){return o[e]}))}(s);n["default"]=i.a},8428:function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return o}));var o={quiPage:function(){return Promise.all([t.e("common/vendor"),t.e("components/qui-page/qui-page")]).then(t.bind(null,"2bf0"))},quiCellItem:function(){return t.e("components/qui-cell-item/qui-cell-item").then(t.bind(null,"bd3e"))},quiAvatar:function(){return Promise.all([t.e("common/vendor"),t.e("components/qui-avatar/qui-avatar")]).then(t.bind(null,"ce3f"))},quiUploader:function(){return Promise.all([t.e("common/vendor"),t.e("components/qui-uploader/qui-uploader")]).then(t.bind(null,"7fe4"))},quiToast:function(){return t.e("components/qui-toast/qui-toast").then(t.bind(null,"6512"))},uniPopup:function(){return t.e("components/uni-popup/uni-popup").then(t.bind(null,"f1be"))},quiAuthPhone:function(){return Promise.all([t.e("common/vendor"),t.e("components/qui-auth-phone/qui-auth-phone")]).then(t.bind(null,"bc43"))}},i=function(){var e=this,n=e.$createElement,t=(e._self._c,e.profile.canEditUsername?e.i18n.t("profile.username"):null),o=e.profile.canEditUsername?null:e.i18n.t("profile.username"),i=e.i18n.t("profile.avatar"),s=e.forums.qcloud&&e.forums.qcloud.qcloud_sms?e.i18n.t("profile.mobile"):null,r=e.forums.qcloud&&e.forums.qcloud.qcloud_sms&&!e.profile.mobile?e.i18n.t("profile.bindingmobile"):null,a=e.i18n.t("profile.password"),u=e.profile.hasPassword?e.i18n.t("profile.modify"):null,l=e.profile.hasPassword?null:e.i18n.t("profile.setpassword"),c=e.forums.passport&&e.forums.passport.miniprogram_close?e.i18n.t("profile.wechat"):null,f=e.profile.realname&&e.forums.qcloud&&e.forums.qcloud.qcloud_faceid?e.i18n.t("profile.certification"):null,d=!e.profile.realname&&e.forums.qcloud&&e.forums.qcloud.qcloud_faceid?e.i18n.t("profile.certification"):null,p=!e.profile.realname&&e.forums.qcloud&&e.forums.qcloud.qcloud_faceid?e.i18n.t("profile.tocertification"):null,h=e.i18n.t("profile.signature"),m=e.i18n.t("profile.modify"),g=e.i18n.t("user.noBindTips"),v=e.i18n.t("user.changeBindTips");e.$mp.data=Object.assign({},{$root:{g0:t,g1:o,g2:i,g3:s,g4:r,g5:a,g6:u,g7:l,g8:c,g9:f,g10:d,g11:p,g12:h,g13:m,g14:g,g15:v}})},s=[]},"947f":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("0301"),i=a(t("8605")),s=a(t("412c")),r=t("198a");function a(e){return e&&e.__esModule?e:{default:e}}var u=function(){t.e("components/uni-popup/uni-popup-dialog").then(function(){return resolve(t("8b8a"))}.bind(null,t)).catch(t.oe)},l={components:{uniPopupDialog:u},mixins:[i.default,s.default],data:function(){return{hasPassword:!1,header:{},formData:{},profile:{},name:"",show:!1,host:o.DISCUZ_REQUEST_HOST,userId:this.$store.getters["session/get"]("userId")}},onShow:function(){this.getUserInfo()},onLoad:function(){var n=e.getStorageSync("access_token");this.header={authorization:"Bearer ".concat(n)},this.formData={type:1}},methods:{bindPhone:function(){this.profile&&""===this.profile.mobile?this.$refs.authPhone.open():e.navigateTo({url:"/pages/modify/mobile?id=".concat(this.userId)})},bindWechat:function(){if("绑定"===this.name)return e.setStorage({key:"page",data:(0,r.getCurUrl)()}),e.setStorageSync("isSend",!0),e.setStorageSync("isBind",!0),void this.$store.getters["session/get"]("auth").open();"绑定"!==this.name&&this.name.indexOf("解绑")>-1&&this.$refs.noBind.open(),"绑定"!==this.name&&this.name.indexOf("换绑")>-1&&this.forums&&this.forums.set_reg&&2===this.forums.set_reg.register_type&&(e.setStorage({key:"page",data:(0,r.getCurUrl)()}),e.setStorageSync("isSend",!1),e.setStorageSync("isBind",!1),this.$refs.changeBind.open())},clickNoBind:function(){var n=this;this.$store.dispatch("jv/delete","users/".concat(this.userId,"/wechat")).then((function(t){t&&t._jv&&t._jv.id&&(n.getUserInfo(),n.closeNoBind(),e.showToast({title:"解绑成功",duration:2e3}))}))},closeNoBind:function(){this.$refs.noBind.close()},clickChangeBind:function(){this.jump2LoginBindPage()},closeChangeBind:function(){this.$refs.changeBind.close()},getUserInfo:function(){var n=this,t={include:"groups,wechat"};this.$store.dispatch("jv/get",["users/".concat(this.userId),{params:t}]).then((function(t){if(t&&t._jv&&t._jv.id){n.profile=t,t&&t.wechat&&""!==t.wechat.min_openid?n.forums&&n.forums.set_reg&&2===n.forums.set_reg.register_type?n.name="".concat(t.wechat.nickname," (换绑)"):n.name="".concat(t.wechat.nickname," (解绑)"):n.name="绑定";var o={headimgurl:t.avatarUrl,username:t.username};e.setStorageSync("userInfo",o)}}))},uploadSuccess:function(n){if(e.hideLoading(),n.statusCode>=200&&n.statusCode<300){this.$refs.toast.show({message:this.i18n.t("profile.successfullyuploadedtheavatar")});var t=JSON.parse(n.data).data.attributes.avatarUrl;this.profile.avatarUrl=t}else{var o=JSON.parse(n.data).errors[0].code;"upload_time_not_up"===o?this.$refs.toast.show({message:this.i18n.t("profile.uploadtimenotup")}):"validation_error"===o?this.$refs.toast.show({message:this.i18n.t("profile.validationerror")}):this.$refs.toast.show({message:o})}},changeAvatar:function(){this.$refs.upload.uploadClick()},chooseSuccess:function(){e.showLoading()},closeDialog:function(){this.$refs.authPhone.close()}}};n.default=l}).call(this,t("543d")["default"])}},[["54f8","common/runtime","common/vendor"]]]);