(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/profile/like"],{"0ad1":function(t,e,n){"use strict";var r=n("f916"),i=n.n(r);i.a},"2e46":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n("db65");function i(t){return s(t)||u(t)||a(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t,e){if(t){if("string"===typeof t)return d(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(t,e):void 0}}function u(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function s(t){if(Array.isArray(t))return d(t)}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var l={props:{userId:{type:String,default:""}},data:function(){return{loadingType:"",data:[],pageSize:20,pageNum:1,editThreadId:"",currentLoginId:this.$store.getters["session/get"]("userId")}},mounted:function(){this.loadlikes()},methods:{toTopic:function(t){this.editThreadId=t},handleClickShare:function(t){this.$emit("handleClickShare",t)},pullDownRefresh:function(){this.pageNum=1,this.data=[],this.loadlikes("pullDownRefresh")},loadlikes:function(e){var n=this;this.loadingType="loading";var o={include:["user","user.groups","firstPost","firstPost.images","firstPost.postGoods","category","threadVideo","threadAudio","question","question.beUser","question.beUser.groups"],"page[number]":this.pageNum,"page[limit]":this.pageSize,"filter[isApproved]":1,"filter[user_id]":this.userId};r.status.run((function(){return n.$store.dispatch("jv/get",["threads/likes",{params:o}])})).then((function(r){r._jv&&delete r._jv,n.loadingType=r.length===n.pageSize?"more":"nomore",n.data=[].concat(i(n.data),i(r)),e&&"pullDownRefresh"===e&&t.stopPullDownRefresh()}))},greatCallBack:function(t,e){if(t&&this.currentLoginId===this.userId){var n=JSON.parse(JSON.stringify(this.data));n.splice(e,1),this.data=n,this.$emit("changeFollow",{userId:this.userId})}},pullDown:function(){"more"===this.loadingType&&(this.pageNum+=1,this.loadlikes())},uploadItem:function(){var t=this;if(this.editThreadId){var e=this.$store.getters["jv/get"]("threads/".concat(this.editThreadId));this.data.forEach((function(n,r){n._jv.id===t.editThreadId&&(t.editThreadId="",t.$set(t.data,r,e))}))}}}};e.default=l}).call(this,n("543d")["default"])},"3bb9":function(t,e,n){"use strict";n.r(e);var r=n("2e46"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},"5b01":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var r={quiThreadItem:function(){return Promise.all([n.e("common/vendor"),n.e("components/qui-thread-item/qui-thread-item")]).then(n.bind(null,"d4fb"))},quiLoadMore:function(){return n.e("components/qui-load-more/qui-load-more").then(n.bind(null,"80d7"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"60ee":function(t,e,n){"use strict";n.r(e);var r=n("5b01"),i=n("3bb9");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("0ad1");var a,u=n("f0c5"),s=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);e["default"]=s.exports},f916:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/profile/like-create-component',
    {
        'pages/profile/like-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("60ee"))
        })
    },
    [['pages/profile/like-create-component']]
]);
