(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/topic/content"],{2127:function(t,e,o){"use strict";o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var n={quiPage:function(){return Promise.all([o.e("common/vendor"),o.e("components/qui-page/qui-page")]).then(o.bind(null,"2bf0"))},quiPageMessage:function(){return Promise.all([o.e("common/vendor"),o.e("components/qui-page-message/qui-page-message")]).then(o.bind(null,"f097"))},quiIcon:function(){return o.e("components/qui-icon/qui-icon").then(o.bind(null,"5d1d"))},quiThreadItem:function(){return Promise.all([o.e("common/vendor"),o.e("components/qui-thread-item/qui-thread-item")]).then(o.bind(null,"d4fb"))},quiLoadMore:function(){return o.e("components/qui-load-more/qui-load-more").then(o.bind(null,"80d7"))}},i=function(){var t=this,e=t.$createElement,o=(t._self._c,t.query.id&&!t.loadedErr?t.i18n.t("topic.allTopics"):null),n=t.query.id&&!t.loadedErr?t.i18n.t("topic.hot"):null,i=t.query.id&&!t.loadedErr?t.i18n.t("topic.contents"):null,a=t.query.id&&!t.loadedErr?t.i18n.t("topic.share"):null;t.$mp.data=Object.assign({},{$root:{g0:o,g1:n,g2:i,g3:a}})},a=[]},"65bc":function(t,e,o){"use strict";o.r(e);var n=o("2127"),i=o("aa1d");for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("788c");var r,s=o("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"8c580ae6",null,!1,n["a"],r);e["default"]=c.exports},7110:function(t,e,o){"use strict";(function(t){o("3768");n(o("66fd"));var e=n(o("65bc"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"788c":function(t,e,o){"use strict";var n=o("dcec"),i=o.n(n);i.a},"944f":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(o("8605"));function i(t){return t&&t.__esModule?t:{default:t}}var a={mixins:[n.default],data:function(){return{shareShow:!1,topicData:[],query:{},isGreat:!1,editThreadId:"",pageNum:1,pageSize:20,loadingtype:"more",nowThreadId:0,meta:"",scrollTop:0,loadedErr:!1}},computed:{topic:function(){return this.query.id?this.$store.getters["jv/get"]("topics/".concat(this.query.id)):{}}},created:function(){},onLoad:function(e){var o=this;wx.showShareMenu({withShareTicket:!0,menus:["shareAppMessage","shareTimeline"]}),this.query=e,e.id?(console.log("2222222222222"),this.loadThreads(),this.$store.dispatch("jv/get","topics/".concat(e.id)).then((function(e){t.setNavigationBarTitle({title:e.content})})).catch((function(t){console.log("走了catct"),o.loadedErr=!0,404===t.statusCode&&o.$store.dispatch("forum/setError",{code:"type_404",status:500})}))):(console.log("11111111111111"),this.$store.dispatch("forum/setError",{code:"type_404",status:500}),this.loadedErr=!0)},onShow:function(){this.uploadItem()},methods:{handleClickShare:function(t){console.log(t,"e"),this.nowThreadId=t},toTopic:function(t){this.editThreadId=t},uploadItem:function(){var t=this;if(this.editThreadId){var e=this.$store.getters["jv/get"]("threads/".concat(this.editThreadId));this.topicData.forEach((function(o,n){o._jv.id===t.editThreadId&&(t.editThreadId="",t.$set(t.topicData,n,e))}))}},loadThreads:function(){var t=this,e={"filter[isApproved]":1,"filter[isDeleted]":"no","filter[topicId]":this.query.id,"page[number]":this.pageNum,"page[limit]":this.pageSize,include:["user","user.groups","firstPost","firstPost.images","firstPost.postGoods","category","threadVideo","threadAudio","question","question.beUser","question.beUser.groups"]};this.$store.dispatch("jv/get",["threads",{params:e}]).then((function(e){t.meta=e._jv.json.meta,t.pageNum>1?t.topicData=t.topicData.concat(e):(t.topicData=e,t.loadingtype="noMore")}))}},onShareAppMessage:function(t){if("button"===t.from&&"top"!==t.target.id){var e=this.$store.getters["jv/get"]("/threads/".concat(this.nowThreadId));return{title:1===e.type?e.title:e.firstPost.summaryText,path:"/topic/index?id=".concat(this.nowThreadId)}}return{title:this.topic.content,path:"/pages/topic/content?id=".concat(this.topic)}},onPullDownRefresh:function(){var e=this;e.pageNum=1,e.topicData=[],setTimeout((function(){e.uploadItem(),e.loadThreads(),t.stopPullDownRefresh()}),1e3)},onReachBottom:function(){this.meta?this.meta.pageCount>1&&(this.pageNum+=1,this.loadThreads()):this.loadingtype="noMore"},onPageScroll:function(t){this.scrollTop=t.scrollTop}};e.default=a}).call(this,o("543d")["default"])},aa1d:function(t,e,o){"use strict";o.r(e);var n=o("944f"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},dcec:function(t,e,o){}},[["7110","common/runtime","common/vendor"]]]);