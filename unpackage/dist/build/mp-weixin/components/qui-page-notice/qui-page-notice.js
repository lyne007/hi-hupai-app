(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/qui-page-notice/qui-page-notice"],{"296d":function(e,t,n){"use strict";n.r(t);var i=n("318c"),r=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=r.a},"318c":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("4317"),r=a(n("245a"));function a(e){return e&&e.__esModule?e:{default:e}}function o(e){return c(e)||d(e)||s(e)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(e,t){if(e){if("string"===typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(e,t):void 0}}function d(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function c(e){if(Array.isArray(e))return l(e)}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}var p=function(){n.e("components/uni-popup/uni-popup-dialog").then(function(){return resolve(n("8b8a"))}.bind(null,n)).catch(n.oe)},f={components:{uniPopupDialog:p},mixins:[r.default],props:{navTheme:{type:String,default:""}},data:function(){return{title:this.i18n.t("notice.notice"),list:[{id:1,title:"notice.relate",type:"related",unReadNum:0,border:!0},{id:2,title:"notice.reply",type:"replied",unReadNum:0,border:!0},{id:3,title:"notice.like",type:"liked",unReadNum:0,border:!0},{id:4,title:"notice.reward",type:"rewarded,withdrawal",unReadNum:0,border:!0},{id:5,title:"notice.questionsAnswers",type:"questioned",unReadNum:0,border:!0},{id:6,title:"notice.system",type:"system",unReadNum:0,border:!1}],loadingType:"more",isFirst:!0,pageSize:10,pageNum:1,dialogList:[],currentDialog:{},navbarHeight:0}},computed:{currentLoginId:function(){var e=this.$store.getters["session/get"]("userId");return parseInt(e,10)}},mounted:function(){var t=this;this.navbarHeight=e.getSystemInfoSync().statusBarHeight+44,e.$on("updateNotiNum",(function(){t.getUnreadNoticeNum()}))},destroyed:function(){e.$off("updateNotiNum")},methods:{deleteMessage:function(e){this.currentDialog=e,this.$refs.popDelete.open()},handleCancel:function(){this.$refs.popDelete.close()},handleOk:function(){var e=this;this.$store.dispatch("jv/delete","dialog/".concat(this.currentDialog._jv.id)).then((function(){e.$refs.popDelete.close();var t=e.currentDialog,n=e.dialogList;e.dialogList.forEach((function(e,i){e._jv.id===t._jv.id&&n.splice(i,1)})),e.dialogList=n}))},getDialogList:function(e){var t=this,n={"page[number]":this.pageNum,"page[limit]":this.pageSize,sort:"-dialogMessageId",include:["sender","recipient","sender.groups","recipient.groups","dialogMessage"]};this.$store.dispatch("jv/get",["dialog",{params:n}]).then((function(n){if(n&&n.length>0){for(var r=JSON.parse(JSON.stringify(n)),a=0;a<r.length;a+=1)r[a]&&r[a].dialogMessage&&(r[a].time=(0,i.time2DateAndHM)(r[a].dialogMessage.created_at?r[a].dialogMessage.created_at:"")),r[a]&&r[a].recipient&&r[a].sender?r[a].recipient.id===t.currentLoginId?(r[a].username=r[a].sender.username,r[a].avatarUrl=r[a].sender.avatarUrl,r[a].groupname=r[a].sender.groups,r[a].readAt=r[a].recipient_read_at,r[a].isReal=r[a].sender.isReal):r[a].sender.id===t.currentLoginId&&(r[a].username=r[a].recipient.username,r[a].avatarUrl=r[a].recipient.avatarUrl,r[a].groupname=r[a].recipient.groups,r[a].readAt=r[a].sender_read_at,r[a].isReal=r[a].recipient.isReal):(r[a].username=t.i18n.t("core.userDeleted"),r[a].avatarUrl="");t.dialogList=e&&"refresh"===e?o(r):[].concat(o(t.dialogList),o(r)),t.loadingType=n.length===t.pageSize?"more":"nomore"}}))},getUnreadNoticeNum:function(){this.user&&this.user.typeUnreadNotifications&&(this.list[0].unReadNum=this.user.typeUnreadNotifications.related||"",this.list[1].unReadNum=this.user.typeUnreadNotifications.replied||"",this.list[2].unReadNum=this.user.typeUnreadNotifications.liked||"",this.list[3].unReadNum=this.user.typeUnreadNotifications.rewarded||this.user.typeUnreadNotifications.withdrawal||"",this.list[4].unReadNum=this.user.typeUnreadNotifications.questioned||"",this.list[5].unReadNum=this.user.typeUnreadNotifications.system||"")},jumpNoticePage:function(t){t.unReadNum&&this.getUserInfo(!0),e.navigateTo({url:"/pages/notice/notice?title=".concat(this.i18n.t(t.title),"&type=").concat(t.type,"&unReadNum=").concat(t.unReadNum)})},jumpMsglistPage:function(t,n){t&&(this.dialogList[n].readAt="1",e.navigateTo({url:"/pages/notice/msglist?dialogId=".concat(t._jv.id,"&username=").concat(t.username)}))},pullDown:function(){"more"===this.loadingType&&(this.pageNum+=1,this.getDialogList())},ontrueGetList:function(){this.getDialogList(),this.getUnreadNoticeNum()}}};t.default=f}).call(this,n("543d")["default"])},"32d1":function(e,t,n){},"335f":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}));var i={uniNavBar:function(){return n.e("components/uni-nav-bar/uni-nav-bar").then(n.bind(null,"8fb0"))},quiCellItem:function(){return n.e("components/qui-cell-item/qui-cell-item").then(n.bind(null,"bd3e"))},quiAvatar:function(){return Promise.all([n.e("common/vendor"),n.e("components/qui-avatar/qui-avatar")]).then(n.bind(null,"ce3f"))},quiIcon:function(){return n.e("components/qui-icon/qui-icon").then(n.bind(null,"5d1d"))},quiLoadMore:function(){return n.e("components/qui-load-more/qui-load-more").then(n.bind(null,"80d7"))},uniPopup:function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"f1be"))}},r=function(){var e=this,t=e.$createElement,n=(e._self._c,e.$u.light()),i=e.$u.light(),r=e.__map(e.list,(function(t,n){var i=e.__get_orig(t),r=e.i18n.t(t.title);return{$orig:i,g2:r}})),a=e.i18n.t("core.deleteMessageSure");e.$mp.data=Object.assign({},{$root:{g0:n,g1:i,l0:r,g3:a}})},a=[]},"6c5d":function(e,t,n){"use strict";var i=n("32d1"),r=n.n(i);r.a},"72a8":function(e,t,n){"use strict";n.r(t);var i=n("335f"),r=n("296d");for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("6c5d");var o,u=n("f0c5"),s=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);t["default"]=s.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/qui-page-notice/qui-page-notice-create-component',
    {
        'components/qui-page-notice/qui-page-notice-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("72a8"))
        })
    },
    [['components/qui-page-notice/qui-page-notice-create-component']]
]);
