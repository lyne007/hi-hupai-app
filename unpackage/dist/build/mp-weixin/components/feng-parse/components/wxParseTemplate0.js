(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/feng-parse/components/wxParseTemplate0"],{"143d":function(e,n,t){"use strict";t.r(n);var o=t("ae58"),a=t("b8b6");for(var r in a)"default"!==r&&function(e){t.d(n,e,(function(){return a[e]}))}(r);var s,c=t("f0c5"),u=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);n["default"]=u.exports},"74d5":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){t.e("components/feng-parse/components/wxParseTemplate1").then(function(){return resolve(t("c7e0"))}.bind(null,t)).catch(t.oe)},a=function(){t.e("components/feng-parse/components/wxParseImg").then(function(){return resolve(t("3f69"))}.bind(null,t)).catch(t.oe)},r=function(){t.e("components/feng-parse/components/wxParseVideo").then(function(){return resolve(t("1584"))}.bind(null,t)).catch(t.oe)},s=function(){t.e("components/feng-parse/components/wxParseAudio").then(function(){return resolve(t("152c"))}.bind(null,t)).catch(t.oe)},c=function(){t.e("components/feng-parse/components/wxParseTable").then(function(){return resolve(t("30e1"))}.bind(null,t)).catch(t.oe)},u={name:"wxParseTemplate0",props:{node:{}},components:{wxParseTemplate:o,wxParseImg:a,wxParseVideo:r,wxParseAudio:s,wxParseTable:c},methods:{wxParseATap:function(e,n){var t=n.currentTarget.dataset.href;if(t){var o=this.$parent;while(!o.preview||"function"!==typeof o.preview)o=o.$parent;o.navigate(t,n,e)}},getClass:function(e){return Array.isArray(e.nodes)&&e.nodes.length>0&&e.nodes[0].attr&&e.nodes[0].attr["data-task-id"]?" task":""}}};n.default=u},ae58:function(e,n,t){"use strict";var o;t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}));var a=function(){var e=this,n=e.$createElement,t=(e._self._c,"element"==e.node.node&&"button"!=e.node.tag&&"a"!=e.node.tag&&"li"!=e.node.tag&&"input"!=e.node.tag&&"table"!=e.node.tag&&"br"!=e.node.tag&&"video"!=e.node.tag&&"audio"!=e.node.tag&&"img"!=e.node.tag&&"strong"!=e.node.tag&&"span"!=e.node.tag&&"em"!=e.node.tag?e.getClass(e.node):null);e.$mp.data=Object.assign({},{$root:{m0:t}})},r=[]},b8b6:function(e,n,t){"use strict";t.r(n);var o=t("74d5"),a=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/feng-parse/components/wxParseTemplate0-create-component',
    {
        'components/feng-parse/components/wxParseTemplate0-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("143d"))
        })
    },
    [['components/feng-parse/components/wxParseTemplate0-create-component']]
]);
