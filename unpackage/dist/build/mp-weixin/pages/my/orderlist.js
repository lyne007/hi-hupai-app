(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/orderlist"],{"0b3c":function(t,e,i){"use strict";var r=i("a7fc"),n=i.n(r);n.a},3421:function(t,e,i){"use strict";i.r(e);var r=i("ce84"),n=i.n(r);for(var a in r)"default"!==a&&function(t){i.d(e,t,(function(){return r[t]}))}(a);e["default"]=n.a},"36b4":function(t,e,i){"use strict";i.r(e);var r=i("4dd0"),n=i("3421");for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);i("0b3c");var o,l=i("f0c5"),c=Object(l["a"])(n["default"],r["b"],r["c"],!1,null,"26ee56c2",null,!1,r["a"],o);e["default"]=c.exports},"4dd0":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return r}));var r={quiPage:function(){return Promise.all([i.e("common/vendor"),i.e("components/qui-page/qui-page")]).then(i.bind(null,"2bf0"))},quiCellItem:function(){return i.e("components/qui-cell-item/qui-cell-item").then(i.bind(null,"bd3e"))},quiIcon:function(){return i.e("components/qui-icon/qui-icon").then(i.bind(null,"5d1d"))},quiFilterModal:function(){return i.e("components/qui-filter-modal/qui-filter-modal").then(i.bind(null,"7339"))},quiLoadMore:function(){return i.e("components/qui-load-more/qui-load-more").then(i.bind(null,"80d7"))}},n=function(){var t=this,e=t.$createElement,i=(t._self._c,t.i18n.t("profile.status")),r=t.i18n.t("profile.time"),n=t.dataList.length>0?t.__map(t.dataList,(function(e,i){var r=t.__get_orig(e),n=t.timeHandle(e.created_at);return{$orig:r,m0:n}})):null;t.$mp.data=Object.assign({},{$root:{g0:i,g1:r,l0:n}})},a=[]},9199:function(t,e,i){"use strict";(function(t){i("3768");r(i("66fd"));var e=r(i("36b4"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},a7fc:function(t,e,i){},ce84:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i("db65"),n=i("4317");function a(t){return u(t)||c(t)||l(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(t,e){if(t){if("string"===typeof t)return s(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?s(t,e):void 0}}function c(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function u(t){if(Array.isArray(t))return s(t)}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}function d(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,r)}return i}function f(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?d(Object(i),!0).forEach((function(e){p(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):d(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function p(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var h={data:function(){var t=new Date,e=t.getFullYear(),i=t.getMonth()+1;i=i<10?"0".concat(i):i;var r="".concat(e,"-").concat(i);return{loadingType:"",flag:!0,pageSize:20,pageNum:1,show:!1,date:r,userId:this.$store.getters["session/get"]("userId"),dataList:[],filterSelected:{label:this.i18n.t("profile.all"),value:""},statusType:{0:this.i18n.t("profile.tobepaid"),1:this.i18n.t("profile.paid"),2:this.i18n.t("profile.cancelorder"),3:this.i18n.t("profile.payfail"),4:this.i18n.t("profile.orderexpired")},filterList:[{title:this.i18n.t("profile.type"),data:[{label:this.i18n.t("profile.all"),value:"",selected:!0},{label:this.i18n.t("profile.tobepaid"),value:0},{label:this.i18n.t("profile.paid"),value:1},{label:this.i18n.t("profile.cancelorder"),value:2},{label:this.i18n.t("profile.payfail"),value:3},{label:this.i18n.t("profile.orderexpired"),value:4}]}]}},onLoad:function(){this.getList()},methods:{confirm:function(t){this.filterSelected=f({},t[0].data),this.getList("filter")},changeType:function(t){this.filterList=t},showFilter:function(){this.show=!0,this.$refs.filter.setData()},timeHandle:function(t){return(0,n.time2MinuteOrHour)(t)},bindDateChange:function(t){this.date=t.target.value,this.getList("filter")},getList:function(t){var e=this;this.loadingType="loading";var i=this.date.split("-"),n=new Date(i[0],i[1],0).getDate(),o={include:["user","thread","thread.firstPost"],"filter[user]":this.userId,"page[number]":this.pageNum,"page[limit]":this.pageSize,"filter[start_time]":"".concat(this.date,"-01-00-00-00"),"filter[end_time]":"".concat(this.date,"-").concat(n,"-00-00-00")};t&&"filter"===t&&(o.pageNum=1,this.dataList=[]),(this.filterSelected.value||0===this.filterSelected.value)&&(o["filter[status]"]=this.filterSelected.value),r.status.run((function(){return e.$store.dispatch("jv/get",["orders",{params:o}])})).then((function(t){t._jv&&delete t._jv,t.forEach((function(i,r){var n=e.handleTitle(i);n.length>42&&(n="".concat(n.substr(0,42),"...")),t[r].titleType=n})),e.loadingType=t.length===e.pageSize?"more":"nomore",e.dataList=[].concat(a(e.dataList),a(t))}))},toTopic:function(e){e.thread&&t.navigateTo({url:"/topic/index?id=".concat(e.thread._jv.id)})},handleTitle:function(t){switch(t.type){case 1:return this.i18n.t("profile.register");case 2:var e=/(<([^>]+)>)/gi,i=t.thread?t.thread.title.replace(e,""):this.i18n.t("profile.thethemewasdeleted");return"".concat(this.i18n.t("profile.givearewardforthetheme")," ").concat(i);case 3:var r=/(<([^>]+)>)/gi,n=t.thread?t.thread.title.replace(r,""):this.i18n.t("profile.thethemewasdeleted");return"".concat(this.i18n.t("profile.paidtoview")," ").concat(n);case 4:return this.i18n.t("profile.paygroup");case 5:var a=/(<([^>]+)>)/gi,o=t.thread?t.thread.title.replace(a,""):this.i18n.t("profile.thethemewasdeleted");return"".concat(this.i18n.t("profile.paidtoviewQuestion")," ").concat(o);case 6:var l=/(<([^>]+)>)/gi,c=t.thread?t.thread.title.replace(l,""):this.i18n.t("profile.thethemewasdeleted");return"".concat(this.i18n.t("profile.paidtowatchQuestion")," ").concat(c);case 7:var u=/(<([^>]+)>)/gi,s=t.thread?t.thread.title.replace(u,""):this.i18n.t("profile.thethemewasdeleted");return"".concat(this.i18n.t("profile.paidtoviewFiles")," ").concat(s);default:return t.type}},pullDown:function(){"more"===this.loadingType&&(this.pageNum+=1,this.getList())}}};e.default=h}).call(this,i("543d")["default"])}},[["9199","common/runtime","common/vendor"]]]);