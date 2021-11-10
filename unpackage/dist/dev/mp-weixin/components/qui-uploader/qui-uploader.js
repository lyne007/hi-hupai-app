(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/qui-uploader/qui-uploader"],{

/***/ 876:
/*!********************************************************************************!*\
  !*** E:/wamp/www/hi-hupai-wechat-pro/components/qui-uploader/qui-uploader.vue ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _qui_uploader_vue_vue_type_template_id_992d4578_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./qui-uploader.vue?vue&type=template&id=992d4578&scoped=true& */ 877);
/* harmony import */ var _qui_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./qui-uploader.vue?vue&type=script&lang=js& */ 879);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _qui_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _qui_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _qui_uploader_vue_vue_type_style_index_0_id_992d4578_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./qui-uploader.vue?vue&type=style&index=0&id=992d4578&scoped=true&lang=scss& */ 881);
/* harmony import */ var _G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 15);

var renderjs





/* normalize component */

var component = Object(_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _qui_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _qui_uploader_vue_vue_type_template_id_992d4578_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _qui_uploader_vue_vue_type_template_id_992d4578_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "992d4578",
  null,
  false,
  _qui_uploader_vue_vue_type_template_id_992d4578_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/qui-uploader/qui-uploader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 877:
/*!***************************************************************************************************************************!*\
  !*** E:/wamp/www/hi-hupai-wechat-pro/components/qui-uploader/qui-uploader.vue?vue&type=template&id=992d4578&scoped=true& ***!
  \***************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_template_id_992d4578_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./qui-uploader.vue?vue&type=template&id=992d4578&scoped=true& */ 878);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_template_id_992d4578_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_template_id_992d4578_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_template_id_992d4578_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_template_id_992d4578_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 878:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/wamp/www/hi-hupai-wechat-pro/components/qui-uploader/qui-uploader.vue?vue&type=template&id=992d4578&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    quiIcon: function() {
      return __webpack_require__.e(/*! import() | components/qui-icon/qui-icon */ "components/qui-icon/qui-icon").then(__webpack_require__.bind(null, /*! @/components/qui-icon/qui-icon.vue */ 766))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.uploadBeforeList, function(item, index) {
    var $orig = _vm.__get_orig(item)

    var g0 =
      _vm.numberdata[index] && _vm.numberdata[index].state < 100
        ? _vm.i18n.t("discuzq.image.imageUploading")
        : null
    return {
      $orig: $orig,
      g0: g0
    }
  })

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 879:
/*!*********************************************************************************************************!*\
  !*** E:/wamp/www/hi-hupai-wechat-pro/components/qui-uploader/qui-uploader.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./qui-uploader.vue?vue&type=script&lang=js& */ 880);
/* harmony import */ var _G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 880:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/wamp/www/hi-hupai-wechat-pro/components/qui-uploader/qui-uploader.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 8));














































var _locale = __webpack_require__(/*! @/locale */ 16);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var uploadTimes = 0;var _default2 =

{
  name: 'QuiUploader',
  props: {
    // 上传类型 0是首页上传，1是默认上传
    chooseType: {
      default: 1,
      type: Number },

    url: {
      default: '',
      type: String },

    // header: {
    //   type: Object,
    //   default: () => {
    //     return {};
    //   },
    // },
    type: {
      default: 'image',
      type: String },

    formData: {
      default: Object,
      type: Object },

    name: {
      default: 'file',
      type: String },

    count: {
      default: 9,
      type: [Number, String] },

    asyncClear: {
      default: false,
      type: Boolean },

    filePreview: {
      type: Array,
      default: function _default() {
        return [];
      } },

    delayTime: {
      default: 500,
      type: Number } },


  data: function data() {
    return {
      uploadBeforeList: [],
      uploadList: [],
      uploadIndex: '',
      formDataAppend: {},
      lastOrder: 0,
      numberdata: [],
      indexs: '',
      erroindex: '',
      number: 0,
      detailindex: [],
      newindex: [],
      cunmumber: 1,
      uploadType: '',
      header: {}, // 上传图片header
      dataCount: this.count, // 接收图片限制数量
      chooseLength: 0, // 一次选择图片的长度
      uploadCount: 0 };

  },
  watch: {
    // 监听得到的数据
    formData: {
      handler: function handler(newVal) {
        this.formData = newVal;
        this.uploadStatus = true;
      },
      deep: true,
      immediate: true }

    // uploadList: {
    //   handler(newVal) {
    //     this.uploadList = newVal;
    //     this.$emit('change', this.uploadList, true);
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
  created: function created() {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              setTimeout(function () {
                _this2.uploadBeforeList = _this2.uploadBeforeList.concat(_this2.filePreview);
                _this2.uploadList.concat(_this2.filePreview).forEach(function (item) {
                  _this2.uploadList.push(item);
                });
                if (_this2.uploadBeforeList.length > 0) {
                  _this2.uploadBeforeList.map(function () {
                    return _this2.numberdata.push({ state: 100 });
                  });
                }
              }, _this2.delayTime);
              if (_this2.filePreview.length) {
                _this2.lastOrder = _this2.filePreview[_this2.filePreview.length - 1].order;
              } else {
                _this2.lastOrder = 0;
              }case 2:case "end":return _context.stop();}}}, _callee);}))();
  },
  methods: {
    getValue: function getValue() {
      return this.uploadList;
    },
    uploadDelete: function uploadDelete(index) {
      this.uploadList.sort(this.compare('order'));
      var beforeUpload = this.uploadList[index];
      if (!this.asyncClear) {
        this.uploadBeforeList.splice(index, 1);
        this.uploadList.splice(index, 1);
        this.numberdata.splice(index, 1);
        this.$emit('clear', this.uploadList, beforeUpload);
      } else {
        // 开启异步删除图片后，返回删除图片的数据和下标，调用clear()需要把下标传进去
        this.$emit('clear', beforeUpload, index);
      }
    },
    clear: function clear(index) {
      this.uploadList.sort(this.compare('order'));
      var beforeUpload = this.uploadList[index];
      this.uploadBeforeList.splice(index, 1);
      this.numberdata.splice(index, 1);
      return beforeUpload;
    },

    // 图片预览
    previewPicture: function previewPicture(index, item) {

      var _this = this;
      var preview = [];
      for (var i = 0, len = _this.uploadBeforeList.length; i < len; i += 1) {
        preview.push(_this.uploadBeforeList[i].path);
      }
      uni.previewImage({
        current: index,
        urls: preview,
        indicator: 'default' });





    },
    compare: function compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    // 上传图片到本地
    uploadClick: function uploadClick() {
      var _this = this;
      // 获取上一次上传图片的长度，用于比较这次上传长度。
      var beforeUploadFile = _this.uploadBeforeList.length;
      if (_this.chooseType === 0) {
        _this.uploadList = [];
        _this.uploadBeforeList = [];
        // _this.dataCount = 0;
        _this.dataCount = 9;
        _this.lastOrder = 0;
        uploadTimes = 0;
      }
      if (_this.uploadList.length < _this.dataCount || _this.name === 'avatar') {

        wx.chooseImage({
          count: _this.dataCount - _this.uploadBeforeList.length,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function success(res) {
            _this.chooseLength = res.tempFiles.length;
            uni.$emit('uploadLength', _this.chooseLength);
            // 上传图片后返回false状态
            _this.$emit('uploadClick', false);
            // 自定义开始上传的效果和回调
            _this.$emit('chooseSuccess');
            var promise = res.tempFiles.map(function (item, index) {
              _this.lastOrder += 1;
              return new Promise(function (resolve, reject) {
                res.tempFiles[index].uploadPercent = 0;
                res.tempFiles[index].uploadStatus = false;
                _this.uploadBeforeList.push(res.tempFiles[index]);
                _this.numberdata.push({ state: 0 });
                _this.newindex.push(res.tempFiles[index]);
                // if (_this.uploadBeforeList.length > _this.count) {
                //   _this.uploadBeforeList = _this.uploadBeforeList.slice(0, _this.count);
                //   _this.numberdata = _this.numberdata.slice(0, _this.count);
                //   _this.newindex = _this.newindex.slice(0, _this.count);
                // }
                _this.upload(
                res.tempFilePaths[index],
                _this.uploadBeforeList.length - 1,
                beforeUploadFile,
                _this.lastOrder,
                resolve,
                reject);

              });
            });

            Promise.race(promise).then(function () {
              // 返回上传成功列表和成功状态值
              if (_this.uploadBeforeList.length > _this.dataCount) {
                var uploadListSuccess = _this.uploadList.slice(0, _this.dataCount);
                _this.uploadList.splice(0);
                uploadListSuccess.forEach(function (item) {
                  _this.uploadList.push(item);
                });
              }
              _this.$emit('change', _this.uploadList, true);
            });
          } });

















































      }
    },
    // 上传图片到服务器
    upload: function upload(pathUrl, index, length, imgOrder, resolve, reject) {
      var _this = this;

      // if (_this.chooseType === 0) {
      //   _this.uploadCount = 0;
      // }
      var token = uni.getStorageSync('access_token');
      _this.header = {
        authorization: "Bearer ".concat(token) };

      if (_this.chooseType === 0) {
        // 这是首页上传图片
        uni.showLoading({
          title: _this.i18n.t('core.loading'),
          mask: true });

      }
      var formdataObj = { type: _this.formData.type, order: imgOrder };
      _this.formDataAppend = {};
      var uploadTask = uni.uploadFile({
        url: _this.url,
        fileType: _this.type,
        filePath: pathUrl,
        header: _this.header,
        name: _this.name,
        formData: formdataObj,
        success: function success(res) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            setTimeout(function () {
              uploadTimes += 1;
              if (_this.chooseType === 0 && index <= 8) {
                uni.$emit('uploadOver', { data: JSON.parse(res.data), times: uploadTimes });
              }
              if (index < _this.uploadBeforeList.length) {
                _this.uploadBeforeList[index].uploadPercent = 100;
                _this.uploadBeforeList[index].id = JSON.parse(res.data).data.id;
                _this.numberdata[index].state = 100;
              }
              if (
              _this.erroindex !== '' &&
              _this.erroindex >= 0 &&
              _this.erroindex < _this.uploadBeforeList.length)
              {
                _this.uploadBeforeList[_this.erroindex].uploadPercent = 100;
                _this.numberdata[_this.erroindex].state = 100;
              }
              if (
              _this.indexs >= 0 &&
              _this.indexs !== '' &&
              _this.indexs < _this.uploadBeforeList.length)
              {
                _this.uploadBeforeList[_this.indexs].uploadPercent = 100;
                _this.numberdata[_this.indexs].state = 100;
              }
              _this.uploadList.push(JSON.parse(res.data).data);
              if (_this.uploadList.length > _this.dataCount) {
                _this.uploadList.sort(_this.compare('order'));
                _this.uploadBeforeList = _this.uploadBeforeList.slice(0, _this.count);
                // _this.uploadList = _this.uploadList.slice(0, _this.dataCount);

                var uploadListSuccess = _this.uploadList.slice(0, _this.dataCount);
                _this.uploadList.splice(0);
                uploadListSuccess.forEach(function (item) {
                  _this.uploadList.push(item);
                });

                _this.numberdata = _this.numberdata.slice(0, _this.dataCount);
                _this.newindex = _this.newindex.slice(0, _this.dataCount);
              }
              _this.newindex = [];
              _this.formDataAppend = {};
            }, 500);
          } else {
            _this.number += 1;
            var resObj = JSON.parse(res.data);
            if (resObj.errors[0].detail) {
              uni.showToast({
                icon: 'none',
                title: "".concat(_locale.i18n.t("core.".concat(resObj.errors[0].code)), "\n").concat(resObj.errors[0].detail[0]) });

            } else {
              uni.showToast({ icon: 'none', title: resObj.errors[0].code });
            }
            if (_this.uploadBeforeList.length > 1) {
              for (var i = 0; i < _this.uploadBeforeList.length; i += 1) {
                if (_this.uploadBeforeList[i] === _this.newindex[index]) {
                  _this.uploadBeforeList.splice(i, 1);
                  _this.uploadList.splice(i, 1);
                  _this.numberdata.splice(i, 1);
                  _this.erroindex = i;
                }
              }
            } else {
              _this.uploadBeforeList.splice(0, 1);
              _this.uploadList.splice(0, 1);
              _this.numberdata.splice(0, 1);
            }
            if (index > 0 && index === _this.uploadBeforeList.length) {
              _this.indexs = index - 1;
            } else if (index > 0 && index < _this.uploadBeforeList.length) {
              _this.indexs = index;
            } else if (index > 0 && index >= _this.uploadBeforeList.length) {
              _this.indexs = index - _this.number;
            } else if (index === 0) {
              _this.indexs = 0;
            }
            _this.$emit('uploadFail', res, _this.uploadList);
            // uni.$emit('uploadFail', res);
            return reject(res);
          }
          _this.formDataAppend = {};
          // 抛出接口信息
          _this.$emit('uploadSuccess', res, _this.uploadList);
          // _this.numberdata.splice(index, 1);
          return resolve(_this.uploadList);
        },
        fail: function fail(res) {
          _this.uploadBeforeList.splice(index, 1);
          _this.uploadList.splice(index, 1);
          _this.numberdata.splice(index, 1);
          // 上传失败回调
          _this.$emit('uploadFail', res, _this.uploadList);
          // uni.$emit('uploadFail', res);
          return reject(res);
        },
        complete: function complete(res) {
          if (
          _this.chooseType === 0 &&
          JSON.parse(res.data).errors &&
          JSON.parse(res.data).errors.length > 0)
          {
            _this.chooseLength =
            _this.chooseLength > _this.dataCount ? _this.dataCount : _this.chooseLength;
            uni.$emit('uploadFail', {
              data: JSON.parse(res.data) });

          }
        } });


      uploadTask.onProgressUpdate( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(res) {var progress, i;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                    res.progress);case 2:progress = _context2.sent;
                  for (i = length; i < _this.uploadBeforeList.length; i += 1) {
                    if (progress < 100) {
                      _this.uploadBeforeList[i].uploadPercent = progress;
                      if (_this.numberdata[i]) {
                        _this.numberdata[i].state = _this.uploadBeforeList[i].uploadPercent;
                      }
                    } else if (progress === 100) {
                      _this.uploadBeforeList[i].uploadPercent = 90;
                      if (_this.numberdata[i]) {
                        _this.numberdata[i].state = _this.uploadBeforeList[i].uploadPercent;
                      }
                    }
                  }case 4:case "end":return _context2.stop();}}}, _callee2);}));return function (_x) {return _ref.apply(this, arguments);};}());

    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 881:
/*!******************************************************************************************************************************************!*\
  !*** E:/wamp/www/hi-hupai-wechat-pro/components/qui-uploader/qui-uploader.vue?vue&type=style&index=0&id=992d4578&scoped=true&lang=scss& ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _G_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_style_index_0_id_992d4578_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./qui-uploader.vue?vue&type=style&index=0&id=992d4578&scoped=true&lang=scss& */ 882);
/* harmony import */ var _G_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_style_index_0_id_992d4578_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_G_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_style_index_0_id_992d4578_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _G_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_style_index_0_id_992d4578_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _G_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_style_index_0_id_992d4578_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_G_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_G_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_G_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_G_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_G_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_qui_uploader_vue_vue_type_style_index_0_id_992d4578_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 882:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/wamp/www/hi-hupai-wechat-pro/components/qui-uploader/qui-uploader.vue?vue&type=style&index=0&id=992d4578&scoped=true&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/qui-uploader/qui-uploader.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/qui-uploader/qui-uploader-create-component',
    {
        'components/qui-uploader/qui-uploader-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(876))
        })
    },
    [['components/qui-uploader/qui-uploader-create-component']]
]);
