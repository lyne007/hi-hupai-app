(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/share/site"],{"4ea2":function(t,e,i){"use strict";(function(t){i("3768");n(i("66fd"));var e=n(i("c80b"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},5641:function(t,e,i){"use strict";i.r(e);var n=i("e5c3"),s=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=s.a},c4e7:function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={quiPage:function(){return Promise.all([i.e("common/vendor"),i.e("components/qui-page/qui-page")]).then(i.bind(null,"2bf0"))},quiButton:function(){return i.e("components/qui-button/qui-button").then(i.bind(null,"a67c"))}},s=function(){var t=this,e=t.$createElement,i=(t._self._c,t.i18n.t("share.savealbum"));t.$mp.data=Object.assign({},{$root:{g0:i}})},o=[]},c80b:function(t,e,i){"use strict";i.r(e);var n=i("c4e7"),s=i("5641");for(var o in s)"default"!==o&&function(t){i.d(e,t,(function(){return s[t]}))}(o);i("cfe1");var a,r=i("f0c5"),u=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,"a81cb100",null,!1,n["a"],a);e["default"]=u.exports},cfe1:function(t,e,i){"use strict";var n=i("e43d"),s=i.n(n);s.a},e43d:function(t,e,i){},e5c3:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("1419")),s=a(i("63a3")),o=a(i("8605"));function a(t){return t&&t.__esModule?t:{default:t}}var r={mixins:[o.default],data:function(){return{userid:"",imagePath:"",width:700,template:{},headerImg:"",headerName:"",slitename:"",slitelogo:"",sliteback:"",themnumber:"",contdata:"",introd:"",themwidth:180,renamewidth:400,openSettingBtnHidden:!0,jurisdiction:!0,leftwidth:253,pages:"/pages/home/index"}},onLoad:function(){var e=this;t.showLoading({title:this.i18n.t("share.generating"),mask:!0}),"public"===this.forums.set_site.site_mode?this.pages="/pages/home/index":"pay"===this.forums.set_site.site_mode&&(this.pages="/pages/site/index"),this.$nextTick((function(){e.userid=e.usersid,e.slitename=e.forums.set_site.site_name,e.slitelogo=e.forums.set_site.site_header_logo||"".concat(e.$u.host(),"static/logo.png"),e.sliteback=e.forums.set_site.site_background_image,e.themnumber=e.forums.other.count_users,e.contdata=e.forums.other.count_threads,e.introd=e.forums.set_site.site_introduction||e.i18n.t("share.nothing"),e.usertitle()}))},computed:{usersid:function(){return this.$store.getters["session/get"]("userId")},userInfo:function(){return this.$store.getters["jv/get"]("users/".concat(this.userid))}},methods:{usertitle:function(){var e=this,i=this;this.headerName=this.userInfo.username,this.themwidth=28*this.headerName.length+3,this.themwidth>=240&&(this.themwidth=240),this.renamewidth=160+this.themwidth,this.headerImg=this.userInfo.avatarUrl||"".concat(this.$u.host(),"static/images/noavatar.gif"),this.slitelogo&&t.getImageInfo({src:i.slitelogo,success:function(t){var e=t.width*(88/t.height);i.leftwidth=(700-e)/2}}),setTimeout((function(){e.initData()}),300)},initData:function(){var t={username:this.headerName+this.i18n.t("share.recomment"),userheader:this.headerImg,slitename:this.slitename,slitelogo:this.slitelogo,sliteback:this.sliteback,themnumber:this.themnumber,contdata:this.contdata,introd:this.introd,leftwidth:this.leftwidth,userweixincode:"".concat(this.$u.host(),"api/oauth/wechat/miniprogram/code?path=").concat(this.pages),namewidth:this.themwidth,renamewidth:this.renamewidth,longpressrecog:this.i18n.t("share.longpressrecog"),recomment:this.i18n.t("share.recomment"),siteintroduction:this.i18n.t("share.siteintroduction"),comefrom:this.i18n.t("share.comefrom"),member:this.i18n.t("share.member"),contents:this.i18n.t("share.contents")};this.sliteback?this.template=(new n.default).palette(t):this.template=(new s.default).palette(t)},onImgOK:function(e){this.imagePath=e.detail.path,t.hideLoading()},imgErr:function(){t.hideLoading(),t.showModal({title:this.i18n.t("discuzq.msgbox.title"),content:this.i18n.t("share.buildfailed"),showCancel:!1})},fun:function(){var e=this;t.getSetting({success:function(t){t.authSetting["scope.writePhotosAlbum"]?e.jurisdiction=t.authSetting["scope.writePhotosAlbum"]:e.jurisdiction=!1}}),this.jurisdiction||t.openSetting({success:function(t){e.jurisdiction=t.authSetting["scope.writePhotosAlbum"]}}),t.showModal({title:e.i18n.t("discuzq.msgbox.title"),content:e.i18n.t("share.confirm"),success:function(i){i.confirm&&t.saveImageToPhotosAlbum({filePath:e.imagePath,success:function(){t.showToast({title:e.i18n.t("share.successfully"),icon:"none",duration:2e3})},fail:function(i){"saveImageToPhotosAlbum:fail auth deny"===i.errMsg&&(e.jurisdiction=!1),t.showToast({title:e.i18n.t("share.savefailed"),icon:"none",duration:2e3})}})}})},previewImage:function(){var e=this.imagePath;t.previewImage({current:e,urls:[e]})}}};e.default=r}).call(this,i("543d")["default"])}},[["4ea2","common/runtime","common/vendor"]]]);