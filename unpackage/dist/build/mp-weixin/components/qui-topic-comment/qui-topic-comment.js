(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/qui-topic-comment/qui-topic-comment"],{"1e8c":function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));var i={quiAvatar:function(){return Promise.all([n.e("common/vendor"),n.e("components/qui-avatar/qui-avatar")]).then(n.bind(null,"ce3f"))},quiIcon:function(){return n.e("components/qui-icon/qui-icon").then(n.bind(null,"5d1d"))},quiUparse:function(){return Promise.all([n.e("common/vendor"),n.e("components/qui-uparse/qui-uparse")]).then(n.bind(null,"62d3"))},quiImage:function(){return n.e("components/qui-image/qui-image").then(n.bind(null,"10f2"))},quiReply:function(){return n.e("components/qui-reply/qui-reply").then(n.bind(null,"10cb"))}},u=function(){var e=this,t=e.$createElement;e._self._c},o=[]},"471e":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("4317"),u={props:{commentType:{type:Number,default:0},refreshStatus:{type:Boolean,default:!1},commentAvatarUrl:{type:String,default:""},postId:{type:[Number,String],default:""},userName:{type:String,default:""},isReal:{type:Boolean,default:!1},userRole:{type:Array,default:function(){return[]}},commentStatus:{type:[String,Number],default:"1"},isLiked:{type:Boolean,default:!1},commentContent:{type:String,default:""},replyList:{type:Array,default:function(){return[]}},replyCount:{type:Number,default:0},commentTime:{type:String,default:""},imagesList:{type:Array,default:function(){return[]}},modeVal:{type:String,default:"aspectFill"},commentShow:{type:Boolean,default:!1},commentLikeCount:{type:Number,default:0},canDelete:{type:Boolean,default:!0}},data:function(){return{isAdmin:!0,isGreat:!1,imageStatus:!0}},computed:{t:function(){return this.i18n.t("topic")},localTime:function(){return(0,i.time2DateAndHM)(this.commentTime?this.commentTime:"")}},watch:{commentLikeCount:{handler:function(e){this.commentLikeCount=e},deep:!0,immediate:!0},refreshStatus:{handler:function(e){this.refreshStatus=e,!0===this.refreshStatus&&this.$forceUpdate()},deep:!0,immediate:!0}},methods:{commentJump:function(){this.$emit("commentJump")},personJump:function(){this.$emit("personJump")},commentLikeClick:function(e){this.$emit("commentLikeClick",e)},deleteComment:function(){this.$emit("deleteComment")},replyComment:function(){this.$emit("replyComment")},previewPicture:function(t){for(var n=this,i=[],u=0,o=n.imagesList.length;u<o;u+=1)i.push(n.imagesList[u].url);e.previewImage({current:t,urls:i,indicator:"number"})},imageError:function(){this.imageStatus=!1}}};t.default=u}).call(this,n("543d")["default"])},5520:function(e,t,n){"use strict";var i=n("e66a"),u=n.n(i);u.a},"91b9":function(e,t,n){"use strict";n.r(t);var i=n("1e8c"),u=n("9658");for(var o in u)"default"!==o&&function(e){n.d(t,e,(function(){return u[e]}))}(o);n("5520");var r,a=n("f0c5"),c=Object(a["a"])(u["default"],i["b"],i["c"],!1,null,"2fb00917",null,!1,i["a"],r);t["default"]=c.exports},9658:function(e,t,n){"use strict";n.r(t);var i=n("471e"),u=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=u.a},e66a:function(e,t,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/qui-topic-comment/qui-topic-comment-create-component',
    {
        'components/qui-topic-comment/qui-topic-comment-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("91b9"))
        })
    },
    [['components/qui-topic-comment/qui-topic-comment-create-component']]
]);
