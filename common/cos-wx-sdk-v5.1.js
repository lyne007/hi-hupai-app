(function(e, a) {
  for (var i in a) e[i] = a[i];
})(
  exports,
  /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports;
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {},
        /******/
      }); // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__,
      ); // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true; // Return the exports of the module
      /******/
      /******/ /******/ return module.exports;
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
        /******/
      }
      /******/
    }; // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function(exports) {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
    /******/
    /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
      value,
      mode,
    ) {
      /******/ if (mode & 1) value = __webpack_require__(value);
      /******/ if (mode & 8) return value;
      /******/ if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
      /******/ var ns = Object.create(null);
      /******/ __webpack_require__.r(ns);
      /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value });
      /******/ if (mode & 2 && typeof value != 'string')
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function(key) {
              return value[key];
            }.bind(null, key),
          );
      /******/ return ns;
      /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module['default'];
            }
          : /******/ function getModuleExports() {
              return module;
            };
      /******/ __webpack_require__.d(getter, 'a', getter);
      /******/ return getter;
      /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 0));
    /******/
  })(
    /************************************************************************/
    /******/ [
      /* 0 */
      /***/ function(module, exports, __webpack_require__) {
        const COS = __webpack_require__(1);
        const vodUtil = __webpack_require__(2);
        const { UploaderEvent } = __webpack_require__(3);

        class Uploader {
          constructor(opts) {
            const self = this;

            if (vodUtil.getType(opts) !== 'object') {
              throw new Error('opts must be a object');
            }

            self.retryCommitNum = 3;
            self.retryApplyNum = 3;

            let videoFile;
            if (opts.mediaFile) {
              // alias
              videoFile = opts.mediaFile;
            } else {
              ({ videoFile } = opts);
            }

            if (!videoFile) {
              throw new Error('need `mediaFile` param');
            }

            if (opts.mediaName) {
              // alias
              self.fileName = opts.mediaName;
            } else {
              self.fileName = opts.fileName;
            }

            const { coverFile } = opts;

            self.videoFileMessage = vodUtil.getFileMessage(videoFile, self.fileName);
            if (coverFile) {
              coverFile.tempFilePath = coverFile.tempFilePaths[0];
              self.coverFileMessage = vodUtil.getFileMessage(coverFile, self.fileName);
            }
            self.getSignature = opts.getSignature;
            self.success = opts.success;
            self.error = opts.error;
            self.progress = opts.progress;
            self.finish = opts.finish;
            if (!self.getSignature) {
              throw new Error('need `getSignature` param');
            }
            if (
              !vodUtil.isFunction(self.getSignature) ||
              !vodUtil.isFunction(self.success) ||
              !vodUtil.isFunction(self.error) ||
              !vodUtil.isFunction(self.progress) ||
              !vodUtil.isFunction(self.finish)
            ) {
              throw new Error('getSignature, success, error, progress, finish must be a Function.');
            }
          }

          start() {
            const self = this;

            self.applyUpload(result => {
              self.uploadFile(result, () => {
                self.commitUpload();
              });
            });
          }

          applyUpload(callback) {
            const self = this;
            self.getSignature(signature => {
              self.signature = signature;
              const sendParams = {
                signature: signature,
                videoName: self.videoFileMessage.name,
                videoType: self.videoFileMessage.type,
                videoSize: self.videoFileMessage.size,
              };
              if (self.coverFileMessage) {
                // upload video together with cover
                sendParams.coverName = self.coverFileMessage.name;
                sendParams.coverType = self.coverFileMessage.type;
                sendParams.coverSize = self.coverFileMessage.size;
              }
              wx.request({
                method: 'POST',
                url: 'https://vod2.qcloud.com/v3/index.php?Action=ApplyUploadUGC',
                data: sendParams,
                dataType: 'json',
                success: result => {
                  if (result.data.code === 0) {
                    self.vodSessionKey = result.data.data.vodSessionKey;
                    callback(result);
                  } else {
                    // eslint-disable-next-line no-lonely-if
                    if (self.retryApplyNum > 0) {
                      self.retryApplyNum -= 1;
                      self.applyUpload(callback);
                    } else {
                      // eslint-disable-next-line no-lonely-if
                      if (vodUtil.isFunction(self.error)) {
                        self.error(result);
                      }
                    }
                  }
                },
                fail: result => {
                  if (vodUtil.isFunction(self.error)) {
                    self.error(result);
                  }
                },
              });
            });
          }

          uploadFile(result, cb) {
            const self = this;

            const applyData = result.data.data;

            const cos = new COS({
              getAuthorization: (options, callback) => {
                callback({
                  TmpSecretId: applyData.tempCertificate.secretId,
                  TmpSecretKey: applyData.tempCertificate.secretKey,
                  XCosSecurityToken: applyData.tempCertificate.token,
                  ExpiredTime: applyData.tempCertificate.expiredTime,
                });
              },
            });

            const cosCommonParam = {
              bucket: `${applyData.storageBucket}-${applyData.storageAppId}`,
              region: applyData.storageRegionV5,
            };

            const uploadCosParams = [];

            if (this.videoFileMessage) {
              const cosVideoParam = {
                ...cosCommonParam,
                filePath: this.videoFileMessage.tempFilePath,
                key: applyData.video.storagePath,
                onProgress: function onProgress(data) {
                  self.emit(UploaderEvent.video_progress, data);
                  self.emit(UploaderEvent.media_progress, data);
                },
              };
              uploadCosParams.push(cosVideoParam);
            }

            if (this.coverFileMessage) {
              const cosCoverParam = {
                ...cosCommonParam,
                filePath: this.coverFileMessage.tempFilePath,
                key: applyData.cover.storagePath,
                // cover don't need progress
                // onProgress: function onProgress(data) {
                //   self.emit(UploaderEvent.cover_progress, data);
                // }
              };
              uploadCosParams.push(cosCoverParam);
            }

            const uploadPromises = uploadCosParams.map(uploadCosParam => {
              return new Promise(function(resolve, reject) {
                cos.postObject(
                  {
                    Bucket: uploadCosParam.bucket,
                    Region: uploadCosParam.region,
                    Key: uploadCosParam.key,
                    FilePath: uploadCosParam.filePath,
                    onProgress: info => {
                      if (vodUtil.isFunction(self.progress)) {
                        self.progress(info);
                      }
                    },
                  },
                  (err, data) => {
                    if (err) {
                      // when fails
                      if (vodUtil.isFunction(self.error)) {
                        self.error(err);
                      }
                      reject();
                      return;
                    }
                    // when succeeds
                    if (vodUtil.isFunction(self.success)) {
                      self.success(data);
                    }
                    resolve();
                  },
                );
              });
            });

            Promise.all(uploadPromises).then(function() {
              cb();
            });
          }

          commitUpload() {
            const self = this;

            const sendParam = {
              signature: this.signature,
              vodSessionKey: this.vodSessionKey,
            };

            wx.request({
              method: 'POST',
              url: 'https://vod2.qcloud.com/v3/index.php?Action=CommitUploadUGC',
              data: sendParam,
              dataType: 'json',
              success: result => {
                if (result.data.code === 0) {
                  const res = result.data.data;
                  if (vodUtil.isFunction(self.finish)) {
                    self.finish({
                      fileId: res.fileId,
                      videoName: self.videoFileMessage.name,
                      videoUrl: res.video && res.video.url,
                      coverUrl: res.cover && res.cover.url,
                    });
                  }
                } else {
                  // eslint-disable-next-line no-lonely-if
                  if (self.retryCommitNum > 0) {
                    self.retryCommitNum -= 1;
                    self.commitUpload();
                  } else {
                    // eslint-disable-next-line no-lonely-if
                    if (vodUtil.isFunction(self.error)) {
                      self.error(result);
                    }
                  }
                }
              },
              fail: result => {
                if (vodUtil.isFunction(self.error)) {
                  self.error(result);
                }
              },
            });
          }
        }

        module.exports = {
          start: params => {
            const uploader = new Uploader(params);
            uploader.start();
          },
        };

        /***/
      },
      /* 1 */
      /***/ function(module, exports, __webpack_require__) {
        !(function(e, t) {
          true ? (module.exports = t()) : undefined;
        })(this, function() {
          return (function(e) {
            function t(r) {
              if (n[r]) return n[r].exports;
              var o = (n[r] = { i: r, l: !1, exports: {} });
              return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
            }
            var n = {};
            return (
              (t.m = e),
              (t.c = n),
              (t.i = function(e) {
                return e;
              }),
              (t.d = function(e, n, r) {
                t.o(e, n) ||
                  Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r });
              }),
              (t.n = function(e) {
                var n =
                  e && e.__esModule
                    ? function() {
                        return e.default;
                      }
                    : function() {
                        return e;
                      };
                return t.d(n, 'a', n), n;
              }),
              (t.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
              }),
              (t.p =
                'E:\\tx\\manageconsole_vod_qcloud_proj\\branches\\wx_web_sdk\\module\\statics\\source\\wx_sdk\\cos-wx-sdk-v5-master\\demo\\lib'),
              t((t.s = 4))
            );
          })([
            function(e, t, n) {
              'use strict';
              (function(t) {
                function r(e) {
                  return encodeURIComponent(e)
                    .replace(/!/g, '%21')
                    .replace(/'/g, '%27')
                    .replace(/\(/g, '%28')
                    .replace(/\)/g, '%29')
                    .replace(/\*/g, '%2A');
                }
                function o(e) {
                  return u(e, function(e) {
                    return 'object' == typeof e ? o(e) : e;
                  });
                }
                function i(e, t) {
                  return (
                    c(t, function(n, r) {
                      e[r] = t[r];
                    }),
                    e
                  );
                }
                function a(e) {
                  return e instanceof Array;
                }
                function s(e, t) {
                  for (var n = !1, r = 0; r < e.length; r++)
                    if (t === e[r]) {
                      n = !0;
                      break;
                    }
                  return n;
                }
                function c(e, t) {
                  for (var n in e) e.hasOwnProperty(n) && t(e[n], n);
                }
                function u(e, t) {
                  var n = a(e) ? [] : {};
                  for (var r in e) e.hasOwnProperty(r) && (n[r] = t(e[r], r));
                  return n;
                }
                function l(e, t) {
                  var n = a(e),
                    r = n ? [] : {};
                  for (var o in e)
                    e.hasOwnProperty(o) && t(e[o], o) && (n ? r.push(e[o]) : (r[o] = e[o]));
                  return r;
                }
                var d = n(8),
                  f = n(6),
                  h = n(10),
                  p = n(7),
                  g = n(5),
                  m = (g.atob, g.btoa),
                  y = function(e) {
                    e = e || {};
                    var t = e.SecretId,
                      n = e.SecretKey,
                      i = (e.method || e.Method || 'get').toLowerCase(),
                      a = e.pathname || e.Key || '/',
                      s = o(e.Query || e.params || {}),
                      c = o(e.Headers || e.headers || {});
                    if ((0 !== a.indexOf('/') && (a = '/' + a), !t))
                      return console.error('lack of param SecretId');
                    if (!n) return console.error('lack of param SecretKey');
                    var u = function(e) {
                        var t = [];
                        for (var n in e) e.hasOwnProperty(n) && t.push(n);
                        return t.sort();
                      },
                      l = function(e) {
                        var t,
                          n,
                          o,
                          i = [],
                          a = u(e);
                        for (t = 0; t < a.length; t++)
                          (n = a[t]),
                            (o = void 0 === e[n] || null === e[n] ? '' : '' + e[n]),
                            (n = n.toLowerCase()),
                            (n = r(n)),
                            (o = r(o) || ''),
                            i.push(n + '=' + o);
                        return i.join('&');
                      },
                      d = parseInt(new Date().getTime() / 1e3) - 1,
                      h = d,
                      p = e.Expires || e.expires;
                    h += void 0 === p ? 900 : 1 * p || 0;
                    var g = t,
                      m = d + ';' + h,
                      y = d + ';' + h,
                      v = u(c)
                        .join(';')
                        .toLowerCase(),
                      C = u(s)
                        .join(';')
                        .toLowerCase(),
                      x = f.HmacSHA1(y, n).toString(),
                      b = [i, a, l(s), l(c), ''].join('\n'),
                      A = ['sha1', m, f.SHA1(b).toString(), ''].join('\n');
                    return [
                      'q-sign-algorithm=sha1',
                      'q-ak=' + g,
                      'q-sign-time=' + m,
                      'q-key-time=' + y,
                      'q-header-list=' + v,
                      'q-url-param-list=' + C,
                      'q-signature=' + f.HmacSHA1(A, x).toString(),
                    ].join('&');
                  },
                  v = function(e) {
                    var t = {};
                    for (var n in e) void 0 !== e[n] && null !== e[n] && (t[n] = e[n]);
                    return t;
                  },
                  C = function(e, t) {
                    var n,
                      r = new FileReader();
                    FileReader.prototype.readAsBinaryString
                      ? ((n = FileReader.prototype.readAsBinaryString),
                        (r.onload = function() {
                          t(this.result);
                        }))
                      : FileReader.prototype.readAsArrayBuffer
                      ? (n = function(e) {
                          var n = '',
                            r = new FileReader();
                          (r.onload = function(e) {
                            for (
                              var o = new Uint8Array(r.result), i = o.byteLength, a = 0;
                              a < i;
                              a++
                            )
                              n += String.fromCharCode(o[a]);
                            t(n);
                          }),
                            r.readAsArrayBuffer(e);
                        })
                      : console.error('FileReader not support readAsBinaryString'),
                      n.call(r, e);
                  },
                  x = function(e, t) {
                    C(e, function(e) {
                      var n = d(e);
                      t(null, n);
                    });
                  },
                  b = function(e) {
                    var t,
                      n,
                      r,
                      o = '';
                    for (t = 0, n = e.length / 2; t < n; t++)
                      (r = parseInt(e[2 * t] + e[2 * t + 1], 16)), (o += String.fromCharCode(r));
                    return m(o);
                  },
                  A = function() {
                    var e = function() {
                      return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
                    };
                    return e() + e() + '-' + e() + '-' + e() + '-' + e() + '-' + e() + e() + e();
                  },
                  k = function(e, t) {
                    var n = t.Bucket,
                      r = t.Region,
                      o = t.Key;
                    return e.indexOf('Bucket') > -1 ||
                      'deleteMultipleObject' === e ||
                      'multipartList' === e ||
                      'listObjectVersions' === e
                      ? n && r
                      : !(
                          e.indexOf('Object') > -1 ||
                          e.indexOf('multipart') > -1 ||
                          'sliceUploadFile' === e ||
                          'abortUploadTask' === e
                        ) ||
                          (n && r && o);
                  },
                  R = function(e, t) {
                    return function(n, r) {
                      'function' == typeof n && ((r = n), (n = {})), (n = i({}, n));
                      var o = n.Headers || {};
                      n &&
                        'object' == typeof n &&
                        (!(function() {
                          for (var e in n)
                            n.hasOwnProperty(e) && e.indexOf('x-cos-') > -1 && (o[e] = n[e]);
                        })(),
                        (o['x-cos-mfa'] = n.MFA),
                        (o['Content-MD5'] = n.ContentMD5),
                        (o['Content-Length'] = n.ContentLength),
                        (o['Content-Type'] = n.ContentType),
                        (o.Expect = n.Expect),
                        (o.Expires = n.Expires),
                        (o['Cache-Control'] = n.CacheControl),
                        (o['Content-Disposition'] = n.ContentDisposition),
                        (o['Content-Encoding'] = n.ContentEncoding),
                        (o.Range = n.Range),
                        (o['If-Modified-Since'] = n.IfModifiedSince),
                        (o['If-Unmodified-Since'] = n.IfUnmodifiedSince),
                        (o['If-Match'] = n.IfMatch),
                        (o['If-None-Match'] = n.IfNoneMatch),
                        (o['x-cos-copy-source'] = n.CopySource),
                        (o['x-cos-copy-source-Range'] = n.CopySourceRange),
                        (o['x-cos-metadata-directive'] = n.MetadataDirective),
                        (o['x-cos-copy-source-If-Modified-Since'] = n.CopySourceIfModifiedSince),
                        (o['x-cos-copy-source-If-Unmodified-Since'] =
                          n.CopySourceIfUnmodifiedSince),
                        (o['x-cos-copy-source-If-Match'] = n.CopySourceIfMatch),
                        (o['x-cos-copy-source-If-None-Match'] = n.CopySourceIfNoneMatch),
                        (o['x-cos-server-side-encryption'] = n.ServerSideEncryption),
                        (o['x-cos-acl'] = n.ACL),
                        (o['x-cos-grant-read'] = n.GrantRead),
                        (o['x-cos-grant-write'] = n.GrantWrite),
                        (o['x-cos-grant-full-control'] = n.GrantFullControl),
                        (o['x-cos-grant-read-acp'] = n.GrantReadAcp),
                        (o['x-cos-grant-write-acp'] = n.GrantWriteAcp),
                        (o['x-cos-storage-class'] = n.StorageClass),
                        (n.Headers = v(o)));
                      var a = function(e) {
                          return (
                            e &&
                              e.headers &&
                              (e.headers['x-cos-version-id'] &&
                                (e.VersionId = e.headers['x-cos-version-id']),
                              e.headers['x-cos-delete-marker'] &&
                                (e.DeleteMarker = e.headers['x-cos-delete-marker'])),
                            e
                          );
                        },
                        s = function(e, t) {
                          r && r(a(e), a(t));
                        };
                      if ('getService' !== e && 'abortUploadTask' !== e) {
                        if (!k(e, n)) return void s({ error: 'lack of required params' });
                        if (n.Region && -1 === n.Region.indexOf('-') && 'yfb' !== n.Region)
                          return void s({
                            error:
                              'Region format error, find help here: https://cloud.tencent.com/document/product/436/6224',
                          });
                        if (n.Region && n.Region.indexOf('cos.') > -1)
                          return void s({ error: 'Region should not be start with "cos."' });
                        if (n.Bucket) {
                          if (!/^(.+)-(\d+)$/.test(n.Bucket))
                            if (n.AppId) n.Bucket = n.Bucket + '-' + n.AppId;
                            else {
                              if (!this.options.AppId)
                                return void s({
                                  error: 'Bucket should format as "test-1250000000".',
                                });
                              n.Bucket = n.Bucket + '-' + this.options.AppId;
                            }
                          n.AppId &&
                            (console.warn(
                              'warning: AppId has been deprecated, Please put it at the end of parameter Bucket(E.g Bucket:"test-1250000000" ).',
                            ),
                            delete n.AppId);
                        }
                        n.Key && '/' === n.Key.substr(0, 1) && (n.Key = n.Key.substr(1));
                      }
                      var c = t.call(this, n, s);
                      if ('getAuth' === e || 'getObjectUrl' === e) return c;
                    };
                  },
                  _ = function(e, t) {
                    function n() {
                      if (((o = 0), t && 'function' == typeof t)) {
                        r = Date.now();
                        var n,
                          i = Math.max(0, Math.round(((s - a) / ((r - c) / 1e3)) * 100) / 100);
                        (n = 0 === s && 0 === e ? 1 : Math.round((s / e) * 100) / 100 || 0),
                          (c = r),
                          (a = s);
                        try {
                          t({ loaded: s, total: e, speed: i, percent: n });
                        } catch (e) {}
                      }
                    }
                    var r,
                      o,
                      i = this,
                      a = 0,
                      s = 0,
                      c = Date.now();
                    return function(t, r) {
                      if ((t && ((s = t.loaded), (e = t.total)), r)) clearTimeout(o), n();
                      else {
                        if (o) return;
                        o = setTimeout(n, i.options.ProgressInterval);
                      }
                    };
                  },
                  w = {
                    apiWrapper: R,
                    getAuth: y,
                    xml2json: h,
                    json2xml: p,
                    md5: d,
                    clearKey: v,
                    getFileMd5: x,
                    binaryBase64: b,
                    extend: i,
                    isArray: a,
                    isInArray: s,
                    each: c,
                    map: u,
                    filter: l,
                    clone: o,
                    uuid: A,
                    throttleOnProgress: _,
                    isBrowser: !!t.document,
                  };
                e.exports = w;
              }.call(t, n(11)));
            },
            function(e, t) {
              function n(e, t) {
                for (var n in e) t[n] = e[n];
              }
              function r(e, t) {
                function r() {}
                var o = e.prototype;
                if (Object.create) {
                  var i = Object.create(t.prototype);
                  o.__proto__ = i;
                }
                o instanceof t ||
                  ((r.prototype = t.prototype), (r = new r()), n(o, r), (e.prototype = o = r)),
                  o.constructor != e &&
                    ('function' != typeof e && console.error('unknow Class:' + e),
                    (o.constructor = e));
              }
              function o(e, t) {
                if (t instanceof Error) var n = t;
                else
                  (n = this),
                    Error.call(this, oe[e]),
                    (this.message = oe[e]),
                    Error.captureStackTrace && Error.captureStackTrace(this, o);
                return (n.code = e), t && (this.message = this.message + ': ' + t), n;
              }
              function i() {}
              function a(e, t) {
                (this._node = e), (this._refresh = t), s(this);
              }
              function s(e) {
                var t = e._node._inc || e._node.ownerDocument._inc;
                if (e._inc != t) {
                  var r = e._refresh(e._node);
                  H(e, 'length', r.length), n(r, e), (e._inc = t);
                }
              }
              function c() {}
              function u(e, t) {
                for (var n = e.length; n--; ) if (e[n] === t) return n;
              }
              function l(e, t, n, r) {
                if ((r ? (t[u(t, r)] = n) : (t[t.length++] = n), e)) {
                  n.ownerElement = e;
                  var o = e.ownerDocument;
                  o && (r && v(o, e, r), y(o, e, n));
                }
              }
              function d(e, t, n) {
                var r = u(t, n);
                if (!(r >= 0)) throw o(ae, new Error(e.tagName + '@' + n));
                for (var i = t.length - 1; r < i; ) t[r] = t[++r];
                if (((t.length = i), e)) {
                  var a = e.ownerDocument;
                  a && (v(a, e, n), (n.ownerElement = null));
                }
              }
              function f(e) {
                if (((this._features = {}), e)) for (var t in e) this._features = e[t];
              }
              function h() {}
              function p(e) {
                return (
                  ('<' == e && '&lt;') ||
                  ('>' == e && '&gt;') ||
                  ('&' == e && '&amp;') ||
                  ('"' == e && '&quot;') ||
                  '&#' + e.charCodeAt() + ';'
                );
              }
              function g(e, t) {
                if (t(e)) return !0;
                if ((e = e.firstChild))
                  do {
                    if (g(e, t)) return !0;
                  } while ((e = e.nextSibling));
              }
              function m() {}
              function y(e, t, n) {
                e && e._inc++,
                  'http://www.w3.org/2000/xmlns/' == n.namespaceURI &&
                    (t._nsMap[n.prefix ? n.localName : ''] = n.value);
              }
              function v(e, t, n, r) {
                e && e._inc++,
                  'http://www.w3.org/2000/xmlns/' == n.namespaceURI &&
                    delete t._nsMap[n.prefix ? n.localName : ''];
              }
              function C(e, t, n) {
                if (e && e._inc) {
                  e._inc++;
                  var r = t.childNodes;
                  if (n) r[r.length++] = n;
                  else {
                    for (var o = t.firstChild, i = 0; o; ) (r[i++] = o), (o = o.nextSibling);
                    r.length = i;
                  }
                }
              }
              function x(e, t) {
                var n = t.previousSibling,
                  r = t.nextSibling;
                return (
                  n ? (n.nextSibling = r) : (e.firstChild = r),
                  r ? (r.previousSibling = n) : (e.lastChild = n),
                  C(e.ownerDocument, e),
                  t
                );
              }
              function b(e, t, n) {
                var r = t.parentNode;
                if ((r && r.removeChild(t), t.nodeType === te)) {
                  var o = t.firstChild;
                  if (null == o) return t;
                  var i = t.lastChild;
                } else o = i = t;
                var a = n ? n.previousSibling : e.lastChild;
                (o.previousSibling = a),
                  (i.nextSibling = n),
                  a ? (a.nextSibling = o) : (e.firstChild = o),
                  null == n ? (e.lastChild = i) : (n.previousSibling = i);
                do {
                  o.parentNode = e;
                } while (o !== i && (o = o.nextSibling));
                return (
                  C(e.ownerDocument || e, e),
                  t.nodeType == te && (t.firstChild = t.lastChild = null),
                  t
                );
              }
              function A(e, t) {
                var n = t.parentNode;
                if (n) {
                  var r = e.lastChild;
                  n.removeChild(t);
                  var r = e.lastChild;
                }
                var r = e.lastChild;
                return (
                  (t.parentNode = e),
                  (t.previousSibling = r),
                  (t.nextSibling = null),
                  r ? (r.nextSibling = t) : (e.firstChild = t),
                  (e.lastChild = t),
                  C(e.ownerDocument, e, t),
                  t
                );
              }
              function k() {
                this._nsMap = {};
              }
              function R() {}
              function _() {}
              function w() {}
              function N() {}
              function T() {}
              function S() {}
              function E() {}
              function B() {}
              function D() {}
              function I() {}
              function O() {}
              function P() {}
              function M(e, t) {
                var n = [],
                  r = 9 == this.nodeType ? this.documentElement : this,
                  o = r.prefix,
                  i = r.namespaceURI;
                if (i && null == o) {
                  var o = r.lookupPrefix(i);
                  if (null == o) var a = [{ namespace: i, prefix: null }];
                }
                return F(this, n, e, t, a), n.join('');
              }
              function L(e, t, n) {
                var r = e.prefix || '',
                  o = e.namespaceURI;
                if (!r && !o) return !1;
                if (
                  ('xml' === r && 'http://www.w3.org/XML/1998/namespace' === o) ||
                  'http://www.w3.org/2000/xmlns/' == o
                )
                  return !1;
                for (var i = n.length; i--; ) {
                  var a = n[i];
                  if (a.prefix == r) return a.namespace != o;
                }
                return !0;
              }
              function F(e, t, n, r, o) {
                if (r) {
                  if (!(e = r(e))) return;
                  if ('string' == typeof e) return void t.push(e);
                }
                switch (e.nodeType) {
                  case z:
                    o || (o = []);
                    var i = (o.length, e.attributes),
                      a = i.length,
                      s = e.firstChild,
                      c = e.tagName;
                    (n = q === e.namespaceURI || n), t.push('<', c);
                    for (var u = 0; u < a; u++) {
                      var l = i.item(u);
                      'xmlns' == l.prefix
                        ? o.push({ prefix: l.localName, namespace: l.value })
                        : 'xmlns' == l.nodeName && o.push({ prefix: '', namespace: l.value });
                    }
                    for (var u = 0; u < a; u++) {
                      var l = i.item(u);
                      if (L(l, n, o)) {
                        var d = l.prefix || '',
                          f = l.namespaceURI,
                          h = d ? ' xmlns:' + d : ' xmlns';
                        t.push(h, '="', f, '"'), o.push({ prefix: d, namespace: f });
                      }
                      F(l, t, n, r, o);
                    }
                    if (L(e, n, o)) {
                      var d = e.prefix || '',
                        f = e.namespaceURI,
                        h = d ? ' xmlns:' + d : ' xmlns';
                      t.push(h, '="', f, '"'), o.push({ prefix: d, namespace: f });
                    }
                    if (s || (n && !/^(?:meta|link|img|br|hr|input)$/i.test(c))) {
                      if ((t.push('>'), n && /^script$/i.test(c)))
                        for (; s; ) s.data ? t.push(s.data) : F(s, t, n, r, o), (s = s.nextSibling);
                      else for (; s; ) F(s, t, n, r, o), (s = s.nextSibling);
                      t.push('</', c, '>');
                    } else t.push('/>');
                    return;
                  case J:
                  case te:
                    for (var s = e.firstChild; s; ) F(s, t, n, r, o), (s = s.nextSibling);
                    return;
                  case V:
                    return t.push(' ', e.name, '="', e.value.replace(/[<&"]/g, p), '"');
                  case X:
                    return t.push(e.data.replace(/[<&]/g, p));
                  case W:
                    return t.push('<![CDATA[', e.data, ']]>');
                  case Y:
                    return t.push('\x3c!--', e.data, '--\x3e');
                  case ee:
                    var g = e.publicId,
                      m = e.systemId;
                    if ((t.push('<!DOCTYPE ', e.name), g))
                      t.push(' PUBLIC "', g), m && '.' != m && t.push('" "', m), t.push('">');
                    else if (m && '.' != m) t.push(' SYSTEM "', m, '">');
                    else {
                      var y = e.internalSubset;
                      y && t.push(' [', y, ']'), t.push('>');
                    }
                    return;
                  case Z:
                    return t.push('<?', e.target, ' ', e.data, '?>');
                  case $:
                    return t.push('&', e.nodeName, ';');
                  default:
                    t.push('??', e.nodeName);
                }
              }
              function U(e, t, n) {
                var r;
                switch (t.nodeType) {
                  case z:
                    (r = t.cloneNode(!1)), (r.ownerDocument = e);
                  case te:
                    break;
                  case V:
                    n = !0;
                }
                if ((r || (r = t.cloneNode(!1)), (r.ownerDocument = e), (r.parentNode = null), n))
                  for (var o = t.firstChild; o; ) r.appendChild(U(e, o, n)), (o = o.nextSibling);
                return r;
              }
              function j(e, t, n) {
                var r = new t.constructor();
                for (var o in t) {
                  var a = t[o];
                  'object' != typeof a && a != r[o] && (r[o] = a);
                }
                switch (
                  (t.childNodes && (r.childNodes = new i()), (r.ownerDocument = e), r.nodeType)
                ) {
                  case z:
                    var s = t.attributes,
                      u = (r.attributes = new c()),
                      l = s.length;
                    u._ownerElement = r;
                    for (var d = 0; d < l; d++) r.setAttributeNode(j(e, s.item(d), !0));
                    break;
                  case V:
                    n = !0;
                }
                if (n)
                  for (var f = t.firstChild; f; ) r.appendChild(j(e, f, n)), (f = f.nextSibling);
                return r;
              }
              function H(e, t, n) {
                e[t] = n;
              }
              function K(e) {
                switch (e.nodeType) {
                  case z:
                  case te:
                    var t = [];
                    for (e = e.firstChild; e; )
                      7 !== e.nodeType && 8 !== e.nodeType && t.push(K(e)), (e = e.nextSibling);
                    return t.join('');
                  default:
                    return e.nodeValue;
                }
              }
              var q = 'http://www.w3.org/1999/xhtml',
                G = {},
                z = (G.ELEMENT_NODE = 1),
                V = (G.ATTRIBUTE_NODE = 2),
                X = (G.TEXT_NODE = 3),
                W = (G.CDATA_SECTION_NODE = 4),
                $ = (G.ENTITY_REFERENCE_NODE = 5),
                Q = (G.ENTITY_NODE = 6),
                Z = (G.PROCESSING_INSTRUCTION_NODE = 7),
                Y = (G.COMMENT_NODE = 8),
                J = (G.DOCUMENT_NODE = 9),
                ee = (G.DOCUMENT_TYPE_NODE = 10),
                te = (G.DOCUMENT_FRAGMENT_NODE = 11),
                ne = (G.NOTATION_NODE = 12),
                re = {},
                oe = {},
                ie =
                  ((re.INDEX_SIZE_ERR = ((oe[1] = 'Index size error'), 1)),
                  (re.DOMSTRING_SIZE_ERR = ((oe[2] = 'DOMString size error'), 2)),
                  (re.HIERARCHY_REQUEST_ERR = ((oe[3] = 'Hierarchy request error'), 3))),
                ae =
                  ((re.WRONG_DOCUMENT_ERR = ((oe[4] = 'Wrong document'), 4)),
                  (re.INVALID_CHARACTER_ERR = ((oe[5] = 'Invalid character'), 5)),
                  (re.NO_DATA_ALLOWED_ERR = ((oe[6] = 'No data allowed'), 6)),
                  (re.NO_MODIFICATION_ALLOWED_ERR = ((oe[7] = 'No modification allowed'), 7)),
                  (re.NOT_FOUND_ERR = ((oe[8] = 'Not found'), 8))),
                se =
                  ((re.NOT_SUPPORTED_ERR = ((oe[9] = 'Not supported'), 9)),
                  (re.INUSE_ATTRIBUTE_ERR = ((oe[10] = 'Attribute in use'), 10)));
              (re.INVALID_STATE_ERR = ((oe[11] = 'Invalid state'), 11)),
                (re.SYNTAX_ERR = ((oe[12] = 'Syntax error'), 12)),
                (re.INVALID_MODIFICATION_ERR = ((oe[13] = 'Invalid modification'), 13)),
                (re.NAMESPACE_ERR = ((oe[14] = 'Invalid namespace'), 14)),
                (re.INVALID_ACCESS_ERR = ((oe[15] = 'Invalid access'), 15));
              (o.prototype = Error.prototype),
                n(re, o),
                (i.prototype = {
                  length: 0,
                  item: function(e) {
                    return this[e] || null;
                  },
                  toString: function(e, t) {
                    for (var n = [], r = 0; r < this.length; r++) F(this[r], n, e, t);
                    return n.join('');
                  },
                }),
                (a.prototype.item = function(e) {
                  return s(this), this[e];
                }),
                r(a, i),
                (c.prototype = {
                  length: 0,
                  item: i.prototype.item,
                  getNamedItem: function(e) {
                    for (var t = this.length; t--; ) {
                      var n = this[t];
                      if (n.nodeName == e) return n;
                    }
                  },
                  setNamedItem: function(e) {
                    var t = e.ownerElement;
                    if (t && t != this._ownerElement) throw new o(se);
                    var n = this.getNamedItem(e.nodeName);
                    return l(this._ownerElement, this, e, n), n;
                  },
                  setNamedItemNS: function(e) {
                    var t,
                      n = e.ownerElement;
                    if (n && n != this._ownerElement) throw new o(se);
                    return (
                      (t = this.getNamedItemNS(e.namespaceURI, e.localName)),
                      l(this._ownerElement, this, e, t),
                      t
                    );
                  },
                  removeNamedItem: function(e) {
                    var t = this.getNamedItem(e);
                    return d(this._ownerElement, this, t), t;
                  },
                  removeNamedItemNS: function(e, t) {
                    var n = this.getNamedItemNS(e, t);
                    return d(this._ownerElement, this, n), n;
                  },
                  getNamedItemNS: function(e, t) {
                    for (var n = this.length; n--; ) {
                      var r = this[n];
                      if (r.localName == t && r.namespaceURI == e) return r;
                    }
                    return null;
                  },
                }),
                (f.prototype = {
                  hasFeature: function(e, t) {
                    var n = this._features[e.toLowerCase()];
                    return !(!n || (t && !(t in n)));
                  },
                  createDocument: function(e, t, n) {
                    var r = new m();
                    if (
                      ((r.implementation = this),
                      (r.childNodes = new i()),
                      (r.doctype = n),
                      n && r.appendChild(n),
                      t)
                    ) {
                      var o = r.createElementNS(e, t);
                      r.appendChild(o);
                    }
                    return r;
                  },
                  createDocumentType: function(e, t, n) {
                    var r = new S();
                    return (r.name = e), (r.nodeName = e), (r.publicId = t), (r.systemId = n), r;
                  },
                }),
                (h.prototype = {
                  firstChild: null,
                  lastChild: null,
                  previousSibling: null,
                  nextSibling: null,
                  attributes: null,
                  parentNode: null,
                  childNodes: null,
                  ownerDocument: null,
                  nodeValue: null,
                  namespaceURI: null,
                  prefix: null,
                  localName: null,
                  insertBefore: function(e, t) {
                    return b(this, e, t);
                  },
                  replaceChild: function(e, t) {
                    this.insertBefore(e, t), t && this.removeChild(t);
                  },
                  removeChild: function(e) {
                    return x(this, e);
                  },
                  appendChild: function(e) {
                    return this.insertBefore(e, null);
                  },
                  hasChildNodes: function() {
                    return null != this.firstChild;
                  },
                  cloneNode: function(e) {
                    return j(this.ownerDocument || this, this, e);
                  },
                  normalize: function() {
                    for (var e = this.firstChild; e; ) {
                      var t = e.nextSibling;
                      t && t.nodeType == X && e.nodeType == X
                        ? (this.removeChild(t), e.appendData(t.data))
                        : (e.normalize(), (e = t));
                    }
                  },
                  isSupported: function(e, t) {
                    return this.ownerDocument.implementation.hasFeature(e, t);
                  },
                  hasAttributes: function() {
                    return this.attributes.length > 0;
                  },
                  lookupPrefix: function(e) {
                    for (var t = this; t; ) {
                      var n = t._nsMap;
                      if (n) for (var r in n) if (n[r] == e) return r;
                      t = t.nodeType == V ? t.ownerDocument : t.parentNode;
                    }
                    return null;
                  },
                  lookupNamespaceURI: function(e) {
                    for (var t = this; t; ) {
                      var n = t._nsMap;
                      if (n && e in n) return n[e];
                      t = t.nodeType == V ? t.ownerDocument : t.parentNode;
                    }
                    return null;
                  },
                  isDefaultNamespace: function(e) {
                    return null == this.lookupPrefix(e);
                  },
                }),
                n(G, h),
                n(G, h.prototype),
                (m.prototype = {
                  nodeName: '#document',
                  nodeType: J,
                  doctype: null,
                  documentElement: null,
                  _inc: 1,
                  insertBefore: function(e, t) {
                    if (e.nodeType == te) {
                      for (var n = e.firstChild; n; ) {
                        var r = n.nextSibling;
                        this.insertBefore(n, t), (n = r);
                      }
                      return e;
                    }
                    return (
                      null == this.documentElement && e.nodeType == z && (this.documentElement = e),
                      b(this, e, t),
                      (e.ownerDocument = this),
                      e
                    );
                  },
                  removeChild: function(e) {
                    return this.documentElement == e && (this.documentElement = null), x(this, e);
                  },
                  importNode: function(e, t) {
                    return U(this, e, t);
                  },
                  getElementById: function(e) {
                    var t = null;
                    return (
                      g(this.documentElement, function(n) {
                        if (n.nodeType == z && n.getAttribute('id') == e) return (t = n), !0;
                      }),
                      t
                    );
                  },
                  createElement: function(e) {
                    var t = new k();
                    return (
                      (t.ownerDocument = this),
                      (t.nodeName = e),
                      (t.tagName = e),
                      (t.childNodes = new i()),
                      ((t.attributes = new c())._ownerElement = t),
                      t
                    );
                  },
                  createDocumentFragment: function() {
                    var e = new I();
                    return (e.ownerDocument = this), (e.childNodes = new i()), e;
                  },
                  createTextNode: function(e) {
                    var t = new w();
                    return (t.ownerDocument = this), t.appendData(e), t;
                  },
                  createComment: function(e) {
                    var t = new N();
                    return (t.ownerDocument = this), t.appendData(e), t;
                  },
                  createCDATASection: function(e) {
                    var t = new T();
                    return (t.ownerDocument = this), t.appendData(e), t;
                  },
                  createProcessingInstruction: function(e, t) {
                    var n = new O();
                    return (
                      (n.ownerDocument = this),
                      (n.tagName = n.target = e),
                      (n.nodeValue = n.data = t),
                      n
                    );
                  },
                  createAttribute: function(e) {
                    var t = new R();
                    return (
                      (t.ownerDocument = this),
                      (t.name = e),
                      (t.nodeName = e),
                      (t.localName = e),
                      (t.specified = !0),
                      t
                    );
                  },
                  createEntityReference: function(e) {
                    var t = new D();
                    return (t.ownerDocument = this), (t.nodeName = e), t;
                  },
                  createElementNS: function(e, t) {
                    var n = new k(),
                      r = t.split(':'),
                      o = (n.attributes = new c());
                    return (
                      (n.childNodes = new i()),
                      (n.ownerDocument = this),
                      (n.nodeName = t),
                      (n.tagName = t),
                      (n.namespaceURI = e),
                      2 == r.length ? ((n.prefix = r[0]), (n.localName = r[1])) : (n.localName = t),
                      (o._ownerElement = n),
                      n
                    );
                  },
                  createAttributeNS: function(e, t) {
                    var n = new R(),
                      r = t.split(':');
                    return (
                      (n.ownerDocument = this),
                      (n.nodeName = t),
                      (n.name = t),
                      (n.namespaceURI = e),
                      (n.specified = !0),
                      2 == r.length ? ((n.prefix = r[0]), (n.localName = r[1])) : (n.localName = t),
                      n
                    );
                  },
                }),
                r(m, h),
                (k.prototype = {
                  nodeType: z,
                  hasAttribute: function(e) {
                    return null != this.getAttributeNode(e);
                  },
                  getAttribute: function(e) {
                    var t = this.getAttributeNode(e);
                    return (t && t.value) || '';
                  },
                  getAttributeNode: function(e) {
                    return this.attributes.getNamedItem(e);
                  },
                  setAttribute: function(e, t) {
                    var n = this.ownerDocument.createAttribute(e);
                    (n.value = n.nodeValue = '' + t), this.setAttributeNode(n);
                  },
                  removeAttribute: function(e) {
                    var t = this.getAttributeNode(e);
                    t && this.removeAttributeNode(t);
                  },
                  appendChild: function(e) {
                    return e.nodeType === te ? this.insertBefore(e, null) : A(this, e);
                  },
                  setAttributeNode: function(e) {
                    return this.attributes.setNamedItem(e);
                  },
                  setAttributeNodeNS: function(e) {
                    return this.attributes.setNamedItemNS(e);
                  },
                  removeAttributeNode: function(e) {
                    return this.attributes.removeNamedItem(e.nodeName);
                  },
                  removeAttributeNS: function(e, t) {
                    var n = this.getAttributeNodeNS(e, t);
                    n && this.removeAttributeNode(n);
                  },
                  hasAttributeNS: function(e, t) {
                    return null != this.getAttributeNodeNS(e, t);
                  },
                  getAttributeNS: function(e, t) {
                    var n = this.getAttributeNodeNS(e, t);
                    return (n && n.value) || '';
                  },
                  setAttributeNS: function(e, t, n) {
                    var r = this.ownerDocument.createAttributeNS(e, t);
                    (r.value = r.nodeValue = '' + n), this.setAttributeNode(r);
                  },
                  getAttributeNodeNS: function(e, t) {
                    return this.attributes.getNamedItemNS(e, t);
                  },
                  getElementsByTagName: function(e) {
                    return new a(this, function(t) {
                      var n = [];
                      return (
                        g(t, function(r) {
                          r === t || r.nodeType != z || ('*' !== e && r.tagName != e) || n.push(r);
                        }),
                        n
                      );
                    });
                  },
                  getElementsByTagNameNS: function(e, t) {
                    return new a(this, function(n) {
                      var r = [];
                      return (
                        g(n, function(o) {
                          o === n ||
                            o.nodeType !== z ||
                            ('*' !== e && o.namespaceURI !== e) ||
                            ('*' !== t && o.localName != t) ||
                            r.push(o);
                        }),
                        r
                      );
                    });
                  },
                }),
                (m.prototype.getElementsByTagName = k.prototype.getElementsByTagName),
                (m.prototype.getElementsByTagNameNS = k.prototype.getElementsByTagNameNS),
                r(k, h),
                (R.prototype.nodeType = V),
                r(R, h),
                (_.prototype = {
                  data: '',
                  substringData: function(e, t) {
                    return this.data.substring(e, e + t);
                  },
                  appendData: function(e) {
                    (e = this.data + e), (this.nodeValue = this.data = e), (this.length = e.length);
                  },
                  insertData: function(e, t) {
                    this.replaceData(e, 0, t);
                  },
                  appendChild: function(e) {
                    throw new Error(oe[ie]);
                  },
                  deleteData: function(e, t) {
                    this.replaceData(e, t, '');
                  },
                  replaceData: function(e, t, n) {
                    (n = this.data.substring(0, e) + n + this.data.substring(e + t)),
                      (this.nodeValue = this.data = n),
                      (this.length = n.length);
                  },
                }),
                r(_, h),
                (w.prototype = {
                  nodeName: '#text',
                  nodeType: X,
                  splitText: function(e) {
                    var t = this.data,
                      n = t.substring(e);
                    (t = t.substring(0, e)),
                      (this.data = this.nodeValue = t),
                      (this.length = t.length);
                    var r = this.ownerDocument.createTextNode(n);
                    return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
                  },
                }),
                r(w, _),
                (N.prototype = { nodeName: '#comment', nodeType: Y }),
                r(N, _),
                (T.prototype = { nodeName: '#cdata-section', nodeType: W }),
                r(T, _),
                (S.prototype.nodeType = ee),
                r(S, h),
                (E.prototype.nodeType = ne),
                r(E, h),
                (B.prototype.nodeType = Q),
                r(B, h),
                (D.prototype.nodeType = $),
                r(D, h),
                (I.prototype.nodeName = '#document-fragment'),
                (I.prototype.nodeType = te),
                r(I, h),
                (O.prototype.nodeType = Z),
                r(O, h),
                (P.prototype.serializeToString = function(e, t, n) {
                  return M.call(e, t, n);
                }),
                (h.prototype.toString = M);
              try {
                Object.defineProperty &&
                  (Object.defineProperty(a.prototype, 'length', {
                    get: function() {
                      return s(this), this.$$length;
                    },
                  }),
                  Object.defineProperty(h.prototype, 'textContent', {
                    get: function() {
                      return K(this);
                    },
                    set: function(e) {
                      switch (this.nodeType) {
                        case z:
                        case te:
                          for (; this.firstChild; ) this.removeChild(this.firstChild);
                          (e || String(e)) &&
                            this.appendChild(this.ownerDocument.createTextNode(e));
                          break;
                        default:
                          (this.data = e), (this.value = e), (this.nodeValue = e);
                      }
                    },
                  }),
                  (H = function(e, t, n) {
                    e['$$' + t] = n;
                  }));
              } catch (e) {}
              (t.DOMImplementation = f), (t.XMLSerializer = P);
            },
            function(e, t) {
              var n = function(e) {
                  var t = {},
                    n = function(e) {
                      return !t[e] && (t[e] = []), t[e];
                    };
                  (e.on = function(e, t) {
                    n(e).push(t);
                  }),
                    (e.off = function(e, t) {
                      for (var r = n(e), o = r.length - 1; o >= 0; o--)
                        t === r[o] && r.splice(o, 1);
                    }),
                    (e.emit = function(e, t) {
                      for (
                        var r = n(e).map(function(e) {
                            return e;
                          }),
                          o = 0;
                        o < r.length;
                        o++
                      )
                        r[o](t);
                    });
                },
                r = function() {
                  n(this);
                };
              (e.exports.init = n), (e.exports.EventProxy = r);
            },
            function(e, t, n) {
              'use strict';
              var r = n(0),
                o = n(2),
                i = n(17),
                a = n(16),
                s = n(14),
                c = {
                  SecretId: '',
                  SecretKey: '',
                  FileParallelLimit: 3,
                  ChunkParallelLimit: 3,
                  ChunkSize: 1048576,
                  ProgressInterval: 1e3,
                  Domain: '',
                  ServiceDomain: '',
                  Protocol: '',
                },
                u = function(e) {
                  (this.options = r.extend(r.clone(c), e || {})), o.init(this), i.init(this);
                };
              r.extend(u.prototype, a),
                r.extend(u.prototype, s),
                (u.getAuthorization = r.getAuth),
                (u.version = '0.6.0'),
                (e.exports = u);
            },
            function(e, t, n) {
              var r = n(3);
              e.exports = r;
            },
            function(e, t) {
              var n = (function(e) {
                e = e || {};
                var t,
                  n = e.Base64,
                  r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                  o = (function(e) {
                    for (var t = {}, n = 0, r = e.length; n < r; n++) t[e.charAt(n)] = n;
                    return t;
                  })(r),
                  i = String.fromCharCode,
                  a = function(e) {
                    if (e.length < 2) {
                      var t = e.charCodeAt(0);
                      return t < 128
                        ? e
                        : t < 2048
                        ? i(192 | (t >>> 6)) + i(128 | (63 & t))
                        : i(224 | ((t >>> 12) & 15)) +
                          i(128 | ((t >>> 6) & 63)) +
                          i(128 | (63 & t));
                    }
                    var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
                    return (
                      i(240 | ((t >>> 18) & 7)) +
                      i(128 | ((t >>> 12) & 63)) +
                      i(128 | ((t >>> 6) & 63)) +
                      i(128 | (63 & t))
                    );
                  },
                  s = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
                  c = function(e) {
                    return e.replace(s, a);
                  },
                  u = function(e) {
                    var t = [0, 2, 1][e.length % 3],
                      n =
                        (e.charCodeAt(0) << 16) |
                        ((e.length > 1 ? e.charCodeAt(1) : 0) << 8) |
                        (e.length > 2 ? e.charCodeAt(2) : 0);
                    return [
                      r.charAt(n >>> 18),
                      r.charAt((n >>> 12) & 63),
                      t >= 2 ? '=' : r.charAt((n >>> 6) & 63),
                      t >= 1 ? '=' : r.charAt(63 & n),
                    ].join('');
                  },
                  l = e.btoa
                    ? function(t) {
                        return e.btoa(t);
                      }
                    : function(e) {
                        return e.replace(/[\s\S]{1,3}/g, u);
                      },
                  d = t
                    ? function(e) {
                        return (e.constructor === t.constructor ? e : new t(e)).toString('base64');
                      }
                    : function(e) {
                        return l(c(e));
                      },
                  f = function(e, t) {
                    return t
                      ? d(String(e))
                          .replace(/[+\/]/g, function(e) {
                            return '+' == e ? '-' : '_';
                          })
                          .replace(/=/g, '')
                      : d(String(e));
                  },
                  h = function(e) {
                    return f(e, !0);
                  },
                  p = new RegExp(['[À-ß][-¿]', '[à-ï][-¿]{2}', '[ð-÷][-¿]{3}'].join('|'), 'g'),
                  g = function(e) {
                    switch (e.length) {
                      case 4:
                        var t =
                            ((7 & e.charCodeAt(0)) << 18) |
                            ((63 & e.charCodeAt(1)) << 12) |
                            ((63 & e.charCodeAt(2)) << 6) |
                            (63 & e.charCodeAt(3)),
                          n = t - 65536;
                        return i(55296 + (n >>> 10)) + i(56320 + (1023 & n));
                      case 3:
                        return i(
                          ((15 & e.charCodeAt(0)) << 12) |
                            ((63 & e.charCodeAt(1)) << 6) |
                            (63 & e.charCodeAt(2)),
                        );
                      default:
                        return i(((31 & e.charCodeAt(0)) << 6) | (63 & e.charCodeAt(1)));
                    }
                  },
                  m = function(e) {
                    return e.replace(p, g);
                  },
                  y = function(e) {
                    var t = e.length,
                      n = t % 4,
                      r =
                        (t > 0 ? o[e.charAt(0)] << 18 : 0) |
                        (t > 1 ? o[e.charAt(1)] << 12 : 0) |
                        (t > 2 ? o[e.charAt(2)] << 6 : 0) |
                        (t > 3 ? o[e.charAt(3)] : 0),
                      a = [i(r >>> 16), i((r >>> 8) & 255), i(255 & r)];
                    return (a.length -= [0, 0, 2, 1][n]), a.join('');
                  },
                  v = e.atob
                    ? function(t) {
                        return e.atob(t);
                      }
                    : function(e) {
                        return e.replace(/[\s\S]{1,4}/g, y);
                      },
                  C = t
                    ? function(e) {
                        return (e.constructor === t.constructor
                          ? e
                          : new t(e, 'base64')
                        ).toString();
                      }
                    : function(e) {
                        return m(v(e));
                      },
                  x = function(e) {
                    return C(
                      String(e)
                        .replace(/[-_]/g, function(e) {
                          return '-' == e ? '+' : '/';
                        })
                        .replace(/[^A-Za-z0-9\+\/]/g, ''),
                    );
                  };
                return {
                  VERSION: '2.1.9',
                  atob: v,
                  btoa: l,
                  fromBase64: x,
                  toBase64: f,
                  utob: c,
                  encode: f,
                  encodeURI: h,
                  btou: m,
                  decode: x,
                  noConflict: function() {
                    var t = e.Base64;
                    return (e.Base64 = n), t;
                  },
                };
              })();
              e.exports = n;
            },
            function(e, t) {
              var n =
                n ||
                (function(e, t) {
                  var n = {},
                    r = (n.lib = {}),
                    o = function() {},
                    i = (r.Base = {
                      extend: function(e) {
                        o.prototype = this;
                        var t = new o();
                        return (
                          e && t.mixIn(e),
                          t.hasOwnProperty('init') ||
                            (t.init = function() {
                              t.$super.init.apply(this, arguments);
                            }),
                          (t.init.prototype = t),
                          (t.$super = this),
                          t
                        );
                      },
                      create: function() {
                        var e = this.extend();
                        return e.init.apply(e, arguments), e;
                      },
                      init: function() {},
                      mixIn: function(e) {
                        for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                        e.hasOwnProperty('toString') && (this.toString = e.toString);
                      },
                      clone: function() {
                        return this.init.prototype.extend(this);
                      },
                    }),
                    a = (r.WordArray = i.extend({
                      init: function(e, t) {
                        (e = this.words = e || []),
                          (this.sigBytes = void 0 != t ? t : 4 * e.length);
                      },
                      toString: function(e) {
                        return (e || c).stringify(this);
                      },
                      concat: function(e) {
                        var t = this.words,
                          n = e.words,
                          r = this.sigBytes;
                        if (((e = e.sigBytes), this.clamp(), r % 4))
                          for (var o = 0; o < e; o++)
                            t[(r + o) >>> 2] |=
                              ((n[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) <<
                              (24 - ((r + o) % 4) * 8);
                        else if (65535 < n.length)
                          for (o = 0; o < e; o += 4) t[(r + o) >>> 2] = n[o >>> 2];
                        else t.push.apply(t, n);
                        return (this.sigBytes += e), this;
                      },
                      clamp: function() {
                        var t = this.words,
                          n = this.sigBytes;
                        (t[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)),
                          (t.length = e.ceil(n / 4));
                      },
                      clone: function() {
                        var e = i.clone.call(this);
                        return (e.words = this.words.slice(0)), e;
                      },
                      random: function(t) {
                        for (var n = [], r = 0; r < t; r += 4)
                          n.push((4294967296 * e.random()) | 0);
                        return new a.init(n, t);
                      },
                    })),
                    s = (n.enc = {}),
                    c = (s.Hex = {
                      stringify: function(e) {
                        var t = e.words;
                        e = e.sigBytes;
                        for (var n = [], r = 0; r < e; r++) {
                          var o = (t[r >>> 2] >>> (24 - (r % 4) * 8)) & 255;
                          n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16));
                        }
                        return n.join('');
                      },
                      parse: function(e) {
                        for (var t = e.length, n = [], r = 0; r < t; r += 2)
                          n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4);
                        return new a.init(n, t / 2);
                      },
                    }),
                    u = (s.Latin1 = {
                      stringify: function(e) {
                        var t = e.words;
                        e = e.sigBytes;
                        for (var n = [], r = 0; r < e; r++)
                          n.push(String.fromCharCode((t[r >>> 2] >>> (24 - (r % 4) * 8)) & 255));
                        return n.join('');
                      },
                      parse: function(e) {
                        for (var t = e.length, n = [], r = 0; r < t; r++)
                          n[r >>> 2] |= (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8);
                        return new a.init(n, t);
                      },
                    }),
                    l = (s.Utf8 = {
                      stringify: function(e) {
                        try {
                          return decodeURIComponent(escape(u.stringify(e)));
                        } catch (e) {
                          throw Error('Malformed UTF-8 data');
                        }
                      },
                      parse: function(e) {
                        return u.parse(unescape(encodeURIComponent(e)));
                      },
                    }),
                    d = (r.BufferedBlockAlgorithm = i.extend({
                      reset: function() {
                        (this._data = new a.init()), (this._nDataBytes = 0);
                      },
                      _append: function(e) {
                        'string' == typeof e && (e = l.parse(e)),
                          this._data.concat(e),
                          (this._nDataBytes += e.sigBytes);
                      },
                      _process: function(t) {
                        var n = this._data,
                          r = n.words,
                          o = n.sigBytes,
                          i = this.blockSize,
                          s = o / (4 * i),
                          s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0);
                        if (((t = s * i), (o = e.min(4 * t, o)), t)) {
                          for (var c = 0; c < t; c += i) this._doProcessBlock(r, c);
                          (c = r.splice(0, t)), (n.sigBytes -= o);
                        }
                        return new a.init(c, o);
                      },
                      clone: function() {
                        var e = i.clone.call(this);
                        return (e._data = this._data.clone()), e;
                      },
                      _minBufferSize: 0,
                    }));
                  r.Hasher = d.extend({
                    cfg: i.extend(),
                    init: function(e) {
                      (this.cfg = this.cfg.extend(e)), this.reset();
                    },
                    reset: function() {
                      d.reset.call(this), this._doReset();
                    },
                    update: function(e) {
                      return this._append(e), this._process(), this;
                    },
                    finalize: function(e) {
                      return e && this._append(e), this._doFinalize();
                    },
                    blockSize: 16,
                    _createHelper: function(e) {
                      return function(t, n) {
                        return new e.init(n).finalize(t);
                      };
                    },
                    _createHmacHelper: function(e) {
                      return function(t, n) {
                        return new f.HMAC.init(e, n).finalize(t);
                      };
                    },
                  });
                  var f = (n.algo = {});
                  return n;
                })(Math);
              !(function() {
                var e = n,
                  t = e.lib,
                  r = t.WordArray,
                  o = t.Hasher,
                  i = [],
                  t = (e.algo.SHA1 = o.extend({
                    _doReset: function() {
                      this._hash = new r.init([
                        1732584193,
                        4023233417,
                        2562383102,
                        271733878,
                        3285377520,
                      ]);
                    },
                    _doProcessBlock: function(e, t) {
                      for (
                        var n = this._hash.words,
                          r = n[0],
                          o = n[1],
                          a = n[2],
                          s = n[3],
                          c = n[4],
                          u = 0;
                        80 > u;
                        u++
                      ) {
                        if (16 > u) i[u] = 0 | e[t + u];
                        else {
                          var l = i[u - 3] ^ i[u - 8] ^ i[u - 14] ^ i[u - 16];
                          i[u] = (l << 1) | (l >>> 31);
                        }
                        (l = ((r << 5) | (r >>> 27)) + c + i[u]),
                          (l =
                            20 > u
                              ? l + (1518500249 + ((o & a) | (~o & s)))
                              : 40 > u
                              ? l + (1859775393 + (o ^ a ^ s))
                              : 60 > u
                              ? l + (((o & a) | (o & s) | (a & s)) - 1894007588)
                              : l + ((o ^ a ^ s) - 899497514)),
                          (c = s),
                          (s = a),
                          (a = (o << 30) | (o >>> 2)),
                          (o = r),
                          (r = l);
                      }
                      (n[0] = (n[0] + r) | 0),
                        (n[1] = (n[1] + o) | 0),
                        (n[2] = (n[2] + a) | 0),
                        (n[3] = (n[3] + s) | 0),
                        (n[4] = (n[4] + c) | 0);
                    },
                    _doFinalize: function() {
                      var e = this._data,
                        t = e.words,
                        n = 8 * this._nDataBytes,
                        r = 8 * e.sigBytes;
                      return (
                        (t[r >>> 5] |= 128 << (24 - (r % 32))),
                        (t[14 + (((r + 64) >>> 9) << 4)] = Math.floor(n / 4294967296)),
                        (t[15 + (((r + 64) >>> 9) << 4)] = n),
                        (e.sigBytes = 4 * t.length),
                        this._process(),
                        this._hash
                      );
                    },
                    clone: function() {
                      var e = o.clone.call(this);
                      return (e._hash = this._hash.clone()), e;
                    },
                  }));
                (e.SHA1 = o._createHelper(t)), (e.HmacSHA1 = o._createHmacHelper(t));
              })(),
                (function() {
                  var e = n,
                    t = e.enc.Utf8;
                  e.algo.HMAC = e.lib.Base.extend({
                    init: function(e, n) {
                      (e = this._hasher = new e.init()), 'string' == typeof n && (n = t.parse(n));
                      var r = e.blockSize,
                        o = 4 * r;
                      n.sigBytes > o && (n = e.finalize(n)), n.clamp();
                      for (
                        var i = (this._oKey = n.clone()),
                          a = (this._iKey = n.clone()),
                          s = i.words,
                          c = a.words,
                          u = 0;
                        u < r;
                        u++
                      )
                        (s[u] ^= 1549556828), (c[u] ^= 909522486);
                      (i.sigBytes = a.sigBytes = o), this.reset();
                    },
                    reset: function() {
                      var e = this._hasher;
                      e.reset(), e.update(this._iKey);
                    },
                    update: function(e) {
                      return this._hasher.update(e), this;
                    },
                    finalize: function(e) {
                      var t = this._hasher;
                      return (
                        (e = t.finalize(e)), t.reset(), t.finalize(this._oKey.clone().concat(e))
                      );
                    },
                  });
                })(),
                (function() {
                  var e = n,
                    t = e.lib,
                    r = t.WordArray,
                    o = e.enc;
                  o.Base64 = {
                    stringify: function(e) {
                      var t = e.words,
                        n = e.sigBytes,
                        r = this._map;
                      e.clamp();
                      for (var o = [], i = 0; i < n; i += 3)
                        for (
                          var a = (t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255,
                            s = (t[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 255,
                            c = (t[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 255,
                            u = (a << 16) | (s << 8) | c,
                            l = 0;
                          l < 4 && i + 0.75 * l < n;
                          l++
                        )
                          o.push(r.charAt((u >>> (6 * (3 - l))) & 63));
                      var d = r.charAt(64);
                      if (d) for (; o.length % 4; ) o.push(d);
                      return o.join('');
                    },
                    parse: function(e) {
                      var t = e.length,
                        n = this._map,
                        o = n.charAt(64);
                      if (o) {
                        var i = e.indexOf(o);
                        -1 != i && (t = i);
                      }
                      for (var a = [], s = 0, c = 0; c < t; c++)
                        if (c % 4) {
                          var u = n.indexOf(e.charAt(c - 1)) << ((c % 4) * 2),
                            l = n.indexOf(e.charAt(c)) >>> (6 - (c % 4) * 2);
                          (a[s >>> 2] |= (u | l) << (24 - (s % 4) * 8)), s++;
                        }
                      return r.create(a, s);
                    },
                    _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
                  };
                })(),
                (e.exports = n);
            },
            function(e, t) {
              function n(e) {
                return ('' + e)
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/'/g, '&apos;')
                  .replace(/"/g, '&quot;')
                  .replace(o, '');
              }
              var r = new RegExp(
                  '^([^a-zA-Z_À-ÖØ-öø-ÿͰ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿿、-퟿豈-﷏ﷰ-�])|^((x|X)(m|M)(l|L))|([^a-zA-Z_À-ÖØ-öø-ÿͰ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿿、-퟿豈-﷏ﷰ-�-.0-9·̀-ͯ‿⁀])',
                  'g',
                ),
                o = /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm,
                i = function(e) {
                  var t = [];
                  if (e instanceof Object) for (var n in e) e.hasOwnProperty(n) && t.push(n);
                  return t;
                },
                a = function(e, t) {
                  var o = function(e, n, o, i, a) {
                    var s = void 0 !== t.indent ? t.indent : '\t',
                      c = t.prettyPrint ? '\n' + new Array(i).join(s) : '';
                    t.removeIllegalNameCharacters && (e = e.replace(r, '_'));
                    var u = [c, '<', e, o || ''];
                    return (
                      n && n.length > 0
                        ? (u.push('>'),
                          u.push(n),
                          a && u.push(c),
                          u.push('</'),
                          u.push(e),
                          u.push('>'))
                        : u.push('/>'),
                      u.join('')
                    );
                  };
                  return (function e(r, a, s) {
                    var c = typeof r;
                    switch (
                      ((Array.isArray
                      ? Array.isArray(r)
                      : r instanceof Array)
                        ? (c = 'array')
                        : r instanceof Date && (c = 'date'),
                      c)
                    ) {
                      case 'array':
                        var u = [];
                        return (
                          r.map(function(t) {
                            u.push(e(t, 1, s + 1));
                          }),
                          t.prettyPrint && u.push('\n'),
                          u.join('')
                        );
                      case 'date':
                        return r.toJSON ? r.toJSON() : r + '';
                      case 'object':
                        var l = [];
                        for (var d in r)
                          if (r[d] instanceof Array)
                            for (var f in r[d])
                              l.push(o(d, e(r[d][f], 0, s + 1), null, s + 1, i(r[d][f]).length));
                          else l.push(o(d, e(r[d], 0, s + 1), null, s + 1));
                        return t.prettyPrint && l.length > 0 && l.push('\n'), l.join('');
                      case 'function':
                        return r();
                      default:
                        return t.escape ? n(r) : '' + r;
                    }
                  })(e, 0, 0);
                },
                s = function(e) {
                  var t = ['<?xml version="1.0" encoding="UTF-8"'];
                  return e && t.push(' standalone="yes"'), t.push('?>'), t.join('');
                },
                c = function(e, t) {
                  if (
                    (t || (t = { xmlHeader: { standalone: !0 }, prettyPrint: !0, indent: '  ' }),
                    'string' == typeof e)
                  )
                    try {
                      e = JSON.parse(e.toString());
                    } catch (e) {
                      return !1;
                    }
                  var n = '',
                    r = '';
                  return (
                    t &&
                      ('object' == typeof t
                        ? (t.xmlHeader && (n = s(!!t.xmlHeader.standalone)),
                          void 0 !== t.docType && (r = '<!DOCTYPE ' + t.docType + '>'))
                        : (n = s())),
                    (t = t || {}),
                    [n, t.prettyPrint && r ? '\n' : '', r, a(e, t)]
                      .join('')
                      .replace(/\n{2,}/g, '\n')
                      .replace(/\s+$/g, '')
                  );
                };
              e.exports = c;
            },
            function(e, t) {
              var n = function(e) {
                function t(e, t) {
                  return (e << t) | (e >>> (32 - t));
                }
                function n(e, t) {
                  var n, r, o, i, a;
                  return (
                    (o = 2147483648 & e),
                    (i = 2147483648 & t),
                    (n = 1073741824 & e),
                    (r = 1073741824 & t),
                    (a = (1073741823 & e) + (1073741823 & t)),
                    n & r
                      ? 2147483648 ^ a ^ o ^ i
                      : n | r
                      ? 1073741824 & a
                        ? 3221225472 ^ a ^ o ^ i
                        : 1073741824 ^ a ^ o ^ i
                      : a ^ o ^ i
                  );
                }
                function r(e, t, n) {
                  return (e & t) | (~e & n);
                }
                function o(e, t, n) {
                  return (e & n) | (t & ~n);
                }
                function i(e, t, n) {
                  return e ^ t ^ n;
                }
                function a(e, t, n) {
                  return t ^ (e | ~n);
                }
                function s(e, o, i, a, s, c, u) {
                  return (e = n(e, n(n(r(o, i, a), s), u))), n(t(e, c), o);
                }
                function c(e, r, i, a, s, c, u) {
                  return (e = n(e, n(n(o(r, i, a), s), u))), n(t(e, c), r);
                }
                function u(e, r, o, a, s, c, u) {
                  return (e = n(e, n(n(i(r, o, a), s), u))), n(t(e, c), r);
                }
                function l(e, r, o, i, s, c, u) {
                  return (e = n(e, n(n(a(r, o, i), s), u))), n(t(e, c), r);
                }
                function d(e) {
                  var t,
                    n,
                    r = '',
                    o = '';
                  for (n = 0; n <= 3; n++)
                    (t = (e >>> (8 * n)) & 255),
                      (o = '0' + t.toString(16)),
                      (r += o.substr(o.length - 2, 2));
                  return r;
                }
                var f,
                  h,
                  p,
                  g,
                  m,
                  y,
                  v,
                  C,
                  x,
                  b = Array();
                for (
                  e = (function(e) {
                    e = e.replace(/\r\n/g, '\n');
                    for (var t = '', n = 0; n < e.length; n++) {
                      var r = e.charCodeAt(n);
                      r < 128
                        ? (t += String.fromCharCode(r))
                        : r > 127 && r < 2048
                        ? ((t += String.fromCharCode((r >> 6) | 192)),
                          (t += String.fromCharCode((63 & r) | 128)))
                        : ((t += String.fromCharCode((r >> 12) | 224)),
                          (t += String.fromCharCode(((r >> 6) & 63) | 128)),
                          (t += String.fromCharCode((63 & r) | 128)));
                    }
                    return t;
                  })(e),
                    b = (function(e) {
                      for (
                        var t,
                          n = e.length,
                          r = n + 8,
                          o = (r - (r % 64)) / 64,
                          i = 16 * (o + 1),
                          a = Array(i - 1),
                          s = 0,
                          c = 0;
                        c < n;

                      )
                        (t = (c - (c % 4)) / 4),
                          (s = (c % 4) * 8),
                          (a[t] = a[t] | (e.charCodeAt(c) << s)),
                          c++;
                      return (
                        (t = (c - (c % 4)) / 4),
                        (s = (c % 4) * 8),
                        (a[t] = a[t] | (128 << s)),
                        (a[i - 2] = n << 3),
                        (a[i - 1] = n >>> 29),
                        a
                      );
                    })(e),
                    y = 1732584193,
                    v = 4023233417,
                    C = 2562383102,
                    x = 271733878,
                    f = 0;
                  f < b.length;
                  f += 16
                )
                  (h = y),
                    (p = v),
                    (g = C),
                    (m = x),
                    (y = s(y, v, C, x, b[f + 0], 7, 3614090360)),
                    (x = s(x, y, v, C, b[f + 1], 12, 3905402710)),
                    (C = s(C, x, y, v, b[f + 2], 17, 606105819)),
                    (v = s(v, C, x, y, b[f + 3], 22, 3250441966)),
                    (y = s(y, v, C, x, b[f + 4], 7, 4118548399)),
                    (x = s(x, y, v, C, b[f + 5], 12, 1200080426)),
                    (C = s(C, x, y, v, b[f + 6], 17, 2821735955)),
                    (v = s(v, C, x, y, b[f + 7], 22, 4249261313)),
                    (y = s(y, v, C, x, b[f + 8], 7, 1770035416)),
                    (x = s(x, y, v, C, b[f + 9], 12, 2336552879)),
                    (C = s(C, x, y, v, b[f + 10], 17, 4294925233)),
                    (v = s(v, C, x, y, b[f + 11], 22, 2304563134)),
                    (y = s(y, v, C, x, b[f + 12], 7, 1804603682)),
                    (x = s(x, y, v, C, b[f + 13], 12, 4254626195)),
                    (C = s(C, x, y, v, b[f + 14], 17, 2792965006)),
                    (v = s(v, C, x, y, b[f + 15], 22, 1236535329)),
                    (y = c(y, v, C, x, b[f + 1], 5, 4129170786)),
                    (x = c(x, y, v, C, b[f + 6], 9, 3225465664)),
                    (C = c(C, x, y, v, b[f + 11], 14, 643717713)),
                    (v = c(v, C, x, y, b[f + 0], 20, 3921069994)),
                    (y = c(y, v, C, x, b[f + 5], 5, 3593408605)),
                    (x = c(x, y, v, C, b[f + 10], 9, 38016083)),
                    (C = c(C, x, y, v, b[f + 15], 14, 3634488961)),
                    (v = c(v, C, x, y, b[f + 4], 20, 3889429448)),
                    (y = c(y, v, C, x, b[f + 9], 5, 568446438)),
                    (x = c(x, y, v, C, b[f + 14], 9, 3275163606)),
                    (C = c(C, x, y, v, b[f + 3], 14, 4107603335)),
                    (v = c(v, C, x, y, b[f + 8], 20, 1163531501)),
                    (y = c(y, v, C, x, b[f + 13], 5, 2850285829)),
                    (x = c(x, y, v, C, b[f + 2], 9, 4243563512)),
                    (C = c(C, x, y, v, b[f + 7], 14, 1735328473)),
                    (v = c(v, C, x, y, b[f + 12], 20, 2368359562)),
                    (y = u(y, v, C, x, b[f + 5], 4, 4294588738)),
                    (x = u(x, y, v, C, b[f + 8], 11, 2272392833)),
                    (C = u(C, x, y, v, b[f + 11], 16, 1839030562)),
                    (v = u(v, C, x, y, b[f + 14], 23, 4259657740)),
                    (y = u(y, v, C, x, b[f + 1], 4, 2763975236)),
                    (x = u(x, y, v, C, b[f + 4], 11, 1272893353)),
                    (C = u(C, x, y, v, b[f + 7], 16, 4139469664)),
                    (v = u(v, C, x, y, b[f + 10], 23, 3200236656)),
                    (y = u(y, v, C, x, b[f + 13], 4, 681279174)),
                    (x = u(x, y, v, C, b[f + 0], 11, 3936430074)),
                    (C = u(C, x, y, v, b[f + 3], 16, 3572445317)),
                    (v = u(v, C, x, y, b[f + 6], 23, 76029189)),
                    (y = u(y, v, C, x, b[f + 9], 4, 3654602809)),
                    (x = u(x, y, v, C, b[f + 12], 11, 3873151461)),
                    (C = u(C, x, y, v, b[f + 15], 16, 530742520)),
                    (v = u(v, C, x, y, b[f + 2], 23, 3299628645)),
                    (y = l(y, v, C, x, b[f + 0], 6, 4096336452)),
                    (x = l(x, y, v, C, b[f + 7], 10, 1126891415)),
                    (C = l(C, x, y, v, b[f + 14], 15, 2878612391)),
                    (v = l(v, C, x, y, b[f + 5], 21, 4237533241)),
                    (y = l(y, v, C, x, b[f + 12], 6, 1700485571)),
                    (x = l(x, y, v, C, b[f + 3], 10, 2399980690)),
                    (C = l(C, x, y, v, b[f + 10], 15, 4293915773)),
                    (v = l(v, C, x, y, b[f + 1], 21, 2240044497)),
                    (y = l(y, v, C, x, b[f + 8], 6, 1873313359)),
                    (x = l(x, y, v, C, b[f + 15], 10, 4264355552)),
                    (C = l(C, x, y, v, b[f + 6], 15, 2734768916)),
                    (v = l(v, C, x, y, b[f + 13], 21, 1309151649)),
                    (y = l(y, v, C, x, b[f + 4], 6, 4149444226)),
                    (x = l(x, y, v, C, b[f + 11], 10, 3174756917)),
                    (C = l(C, x, y, v, b[f + 2], 15, 718787259)),
                    (v = l(v, C, x, y, b[f + 9], 21, 3951481745)),
                    (y = n(y, h)),
                    (v = n(v, p)),
                    (C = n(C, g)),
                    (x = n(x, m));
                return (d(y) + d(v) + d(C) + d(x)).toLowerCase();
              };
              e.exports = n;
            },
            function(e, t) {
              var n = function(e) {
                  var t,
                    n,
                    r,
                    o = [],
                    i = Object.keys(e);
                  for (t = 0; t < i.length; t++)
                    (n = i[t]), (r = e[n] || ''), o.push(n + '=' + encodeURIComponent(r));
                  return o.join('&');
                },
                r = function(e, t) {
                  var r,
                    o = e.filePath,
                    i = e.headers || {},
                    a = e.url,
                    s = e.method,
                    c = e.onProgress,
                    u = function(e, n) {
                      t(e, { statusCode: n.statusCode, headers: n.header }, n.data);
                    };
                  if (o) {
                    var l = a.match(/^(https?:\/\/[^\/]+\/)(.*)$/),
                      d = decodeURIComponent(l[2] || ''),
                      f = d.substring(0, d.indexOf('/'));
                    (d = d.substring(d.indexOf('/') + 1)), (a = l[1]);
                    var h = { key: d, success_action_status: 200, Signature: i.Authorization },
                      p = [
                        'Cache-Control',
                        'Content-Type',
                        'Content-Disposition',
                        'Content-Encoding',
                        'Expires',
                        'x-cos-storage-class',
                        'x-cos-security-token',
                      ];
                    for (var d in e.headers)
                      e.headers.hasOwnProperty(d) &&
                        (d.indexOf('x-cos-meta-') > -1 || p.indexOf(d) > -1) &&
                        (h[d] = e.headers[d]);
                    i['x-cos-acl'] && (h.acl = i['x-cos-acl']),
                      !h['Content-Type'] && (h['Content-Type'] = ''),
                      (r = wx.uploadFile({
                        url: a,
                        method: s,
                        name: 'file',
                        filePath: o,
                        formData: h,
                        header: { 'Vod-Forward-Cos': f },
                        success: function(e) {
                          u(null, e);
                        },
                        fail: function(e) {
                          u(e.errMsg, e);
                        },
                      })),
                      r.onProgressUpdate(function(e) {
                        c({
                          loaded: e.totalBytesSent,
                          total: e.totalBytesExpectedToSend,
                          progress: e.progress / 100,
                        });
                      });
                  } else {
                    var g = (e.qs && n(e.qs)) || '';
                    g && (a += (a.indexOf('?') > -1 ? '&' : '?') + g),
                      i['Content-Length'] && delete i['Content-Length'],
                      wx.request({
                        url: a,
                        method: s,
                        header: i,
                        dataType: 'text',
                        data: e.body,
                        success: function(e) {
                          u(null, e);
                        },
                        fail: function(e) {
                          u(e.errMsg, e);
                        },
                      });
                  }
                  return r;
                };
              e.exports = r;
            },
            function(e, t, n) {
              var r = n(12).DOMParser,
                o = function(e) {
                  'use strict';
                  function t(e) {
                    var t = e.localName;
                    return (
                      null == t && (t = e.baseName), (null != t && '' != t) || (t = e.nodeName), t
                    );
                  }
                  function n(e) {
                    return e.prefix;
                  }
                  function o(e) {
                    return 'string' == typeof e
                      ? e
                          .replace(/&/g, '&amp;')
                          .replace(/</g, '&lt;')
                          .replace(/>/g, '&gt;')
                          .replace(/"/g, '&quot;')
                          .replace(/'/g, '&apos;')
                      : e;
                  }
                  function i(e, t, n, r) {
                    for (var o = 0; o < e.length; o++) {
                      var i = e[o];
                      if ('string' == typeof i) {
                        if (i == r) break;
                      } else if (i instanceof RegExp) {
                        if (i.test(r)) break;
                      } else if ('function' == typeof i && i(t, n, r)) break;
                    }
                    return o != e.length;
                  }
                  function a(t, n, r) {
                    switch (e.arrayAccessForm) {
                      case 'property':
                        t[n] instanceof Array
                          ? (t[n + '_asArray'] = t[n])
                          : (t[n + '_asArray'] = [t[n]]);
                    }
                    !(t[n] instanceof Array) &&
                      e.arrayAccessFormPaths.length > 0 &&
                      i(e.arrayAccessFormPaths, t, n, r) &&
                      (t[n] = [t[n]]);
                  }
                  function s(e) {
                    var t = e.split(/[-T:+Z]/g),
                      n = new Date(t[0], t[1] - 1, t[2]),
                      r = t[5].split('.');
                    if (
                      (n.setHours(t[3], t[4], r[0]),
                      r.length > 1 && n.setMilliseconds(r[1]),
                      t[6] && t[7])
                    ) {
                      var o = 60 * t[6] + Number(t[7]);
                      (o = 0 + ('-' == (/\d\d-\d\d:\d\d$/.test(e) ? '-' : '+') ? -1 * o : o)),
                        n.setMinutes(n.getMinutes() - o - n.getTimezoneOffset());
                    } else
                      -1 !== e.indexOf('Z', e.length - 1) &&
                        (n = new Date(
                          Date.UTC(
                            n.getFullYear(),
                            n.getMonth(),
                            n.getDate(),
                            n.getHours(),
                            n.getMinutes(),
                            n.getSeconds(),
                            n.getMilliseconds(),
                          ),
                        ));
                    return n;
                  }
                  function c(t, n, r) {
                    if (e.datetimeAccessFormPaths.length > 0) {
                      var o = r.split('.#')[0];
                      return i(e.datetimeAccessFormPaths, t, n, o) ? s(t) : t;
                    }
                    return t;
                  }
                  function u(t, n, r, o) {
                    return (
                      !(n == k.ELEMENT_NODE && e.xmlElementsFilter.length > 0) ||
                      i(e.xmlElementsFilter, t, r, o)
                    );
                  }
                  function l(r, o) {
                    if (r.nodeType == k.DOCUMENT_NODE) {
                      for (var i = new Object(), s = r.childNodes, d = 0; d < s.length; d++) {
                        var f = s.item(d);
                        if (f.nodeType == k.ELEMENT_NODE) {
                          var h = t(f);
                          i[h] = l(f, h);
                        }
                      }
                      return i;
                    }
                    if (r.nodeType == k.ELEMENT_NODE) {
                      var i = new Object();
                      i.__cnt = 0;
                      for (var s = r.childNodes, d = 0; d < s.length; d++) {
                        var f = s.item(d),
                          h = t(f);
                        if (f.nodeType != k.COMMENT_NODE) {
                          var p = o + '.' + h;
                          u(i, f.nodeType, h, p) &&
                            (i.__cnt++,
                            null == i[h]
                              ? ((i[h] = l(f, p)), a(i, h, p))
                              : (null != i[h] &&
                                  (i[h] instanceof Array || ((i[h] = [i[h]]), a(i, h, p))),
                                (i[h][i[h].length] = l(f, p))));
                        }
                      }
                      for (var g = 0; g < r.attributes.length; g++) {
                        var m = r.attributes.item(g);
                        i.__cnt++, (i[e.attributePrefix + m.name] = m.value);
                      }
                      var y = n(r);
                      return (
                        null != y && '' != y && (i.__cnt++, (i.__prefix = y)),
                        null != i['#text'] &&
                          ((i.__text = i['#text']),
                          i.__text instanceof Array && (i.__text = i.__text.join('\n')),
                          e.stripWhitespaces && (i.__text = i.__text.trim()),
                          delete i['#text'],
                          'property' == e.arrayAccessForm && delete i['#text_asArray'],
                          (i.__text = c(i.__text, h, o + '.' + h))),
                        null != i['#cdata-section'] &&
                          ((i.__cdata = i['#cdata-section']),
                          delete i['#cdata-section'],
                          'property' == e.arrayAccessForm && delete i['#cdata-section_asArray']),
                        0 == i.__cnt && 'text' == e.emptyNodeForm
                          ? (i = '')
                          : 1 == i.__cnt && null != i.__text
                          ? (i = i.__text)
                          : 1 != i.__cnt || null == i.__cdata || e.keepCData
                          ? i.__cnt > 1 &&
                            null != i.__text &&
                            e.skipEmptyTextNodesForObj &&
                            ((e.stripWhitespaces && '' == i.__text) || '' == i.__text.trim()) &&
                            delete i.__text
                          : (i = i.__cdata),
                        delete i.__cnt,
                        !e.enableToStringFunc ||
                          (null == i.__text && null == i.__cdata) ||
                          (i.toString = function() {
                            return (
                              (null != this.__text ? this.__text : '') +
                              (null != this.__cdata ? this.__cdata : '')
                            );
                          }),
                        i
                      );
                    }
                    if (r.nodeType == k.TEXT_NODE || r.nodeType == k.CDATA_SECTION_NODE)
                      return r.nodeValue;
                  }
                  function d(t, n, r, i) {
                    var a = '<' + (null != t && null != t.__prefix ? t.__prefix + ':' : '') + n;
                    if (null != r)
                      for (var s = 0; s < r.length; s++) {
                        var c = r[s],
                          u = t[c];
                        e.escapeMode && (u = o(u)),
                          (a += ' ' + c.substr(e.attributePrefix.length) + '='),
                          e.useDoubleQuotes ? (a += '"' + u + '"') : (a += "'" + u + "'");
                      }
                    return (a += i ? '/>' : '>');
                  }
                  function f(e, t) {
                    return '</' + (null != e.__prefix ? e.__prefix + ':' : '') + t + '>';
                  }
                  function h(e, t) {
                    return -1 !== e.indexOf(t, e.length - t.length);
                  }
                  function p(t, n) {
                    return !!(
                      ('property' == e.arrayAccessForm && h(n.toString(), '_asArray')) ||
                      0 == n.toString().indexOf(e.attributePrefix) ||
                      0 == n.toString().indexOf('__') ||
                      t[n] instanceof Function
                    );
                  }
                  function g(e) {
                    var t = 0;
                    if (e instanceof Object) for (var n in e) p(e, n) || t++;
                    return t;
                  }
                  function m(t, n, r) {
                    return (
                      0 == e.jsonPropertiesFilter.length ||
                      '' == r ||
                      i(e.jsonPropertiesFilter, t, n, r)
                    );
                  }
                  function y(t) {
                    var n = [];
                    if (t instanceof Object)
                      for (var r in t)
                        -1 == r.toString().indexOf('__') &&
                          0 == r.toString().indexOf(e.attributePrefix) &&
                          n.push(r);
                    return n;
                  }
                  function v(t) {
                    var n = '';
                    return (
                      null != t.__cdata && (n += '<![CDATA[' + t.__cdata + ']]>'),
                      null != t.__text && (e.escapeMode ? (n += o(t.__text)) : (n += t.__text)),
                      n
                    );
                  }
                  function C(t) {
                    var n = '';
                    return (
                      t instanceof Object
                        ? (n += v(t))
                        : null != t && (e.escapeMode ? (n += o(t)) : (n += t)),
                      n
                    );
                  }
                  function x(e, t) {
                    return '' === e ? t : e + '.' + t;
                  }
                  function b(e, t, n, r) {
                    var o = '';
                    if (0 == e.length) o += d(e, t, n, !0);
                    else
                      for (var i = 0; i < e.length; i++)
                        (o += d(e[i], t, y(e[i]), !1)), (o += A(e[i], x(r, t))), (o += f(e[i], t));
                    return o;
                  }
                  function A(e, t) {
                    var n = '';
                    if (g(e) > 0)
                      for (var r in e)
                        if (!p(e, r) && ('' == t || m(e, r, x(t, r)))) {
                          var o = e[r],
                            i = y(o);
                          if (null == o || void 0 == o) n += d(o, r, i, !0);
                          else if (o instanceof Object)
                            if (o instanceof Array) n += b(o, r, i, t);
                            else if (o instanceof Date)
                              (n += d(o, r, i, !1)), (n += o.toISOString()), (n += f(o, r));
                            else {
                              var a = g(o);
                              a > 0 || null != o.__text || null != o.__cdata
                                ? ((n += d(o, r, i, !1)), (n += A(o, x(t, r))), (n += f(o, r)))
                                : (n += d(o, r, i, !0));
                            }
                          else (n += d(o, r, i, !1)), (n += C(o)), (n += f(o, r));
                        }
                    return (n += C(e));
                  }
                  (e = e || {}),
                    (function() {
                      void 0 === e.escapeMode && (e.escapeMode = !0),
                        (e.attributePrefix = e.attributePrefix || '_'),
                        (e.arrayAccessForm = e.arrayAccessForm || 'none'),
                        (e.emptyNodeForm = e.emptyNodeForm || 'text'),
                        void 0 === e.enableToStringFunc && (e.enableToStringFunc = !0),
                        (e.arrayAccessFormPaths = e.arrayAccessFormPaths || []),
                        void 0 === e.skipEmptyTextNodesForObj && (e.skipEmptyTextNodesForObj = !0),
                        void 0 === e.stripWhitespaces && (e.stripWhitespaces = !0),
                        (e.datetimeAccessFormPaths = e.datetimeAccessFormPaths || []),
                        void 0 === e.useDoubleQuotes && (e.useDoubleQuotes = !1),
                        (e.xmlElementsFilter = e.xmlElementsFilter || []),
                        (e.jsonPropertiesFilter = e.jsonPropertiesFilter || []),
                        void 0 === e.keepCData && (e.keepCData = !1);
                    })();
                  var k = {
                    ELEMENT_NODE: 1,
                    TEXT_NODE: 3,
                    CDATA_SECTION_NODE: 4,
                    COMMENT_NODE: 8,
                    DOCUMENT_NODE: 9,
                  };
                  (this.parseXmlString = function(e) {
                    if (void 0 === e) return null;
                    var t;
                    if (r) {
                      var n = new r(),
                        o = null;
                      try {
                        o = n
                          .parseFromString('INVALID', 'text/xml')
                          .getElementsByTagName('parsererror')[0].namespaceURI;
                      } catch (e) {
                        o = null;
                      }
                      try {
                        (t = n.parseFromString(e, 'text/xml')),
                          null != o &&
                            t.getElementsByTagNameNS(o, 'parsererror').length > 0 &&
                            (t = null);
                      } catch (e) {
                        t = null;
                      }
                    } else
                      0 == e.indexOf('<?') && (e = e.substr(e.indexOf('?>') + 2)),
                        (t = new ActiveXObject('Microsoft.XMLDOM')),
                        (t.async = 'false'),
                        t.loadXML(e);
                    return t;
                  }),
                    (this.asArray = function(e) {
                      return void 0 === e || null == e ? [] : e instanceof Array ? e : [e];
                    }),
                    (this.toXmlDateTime = function(e) {
                      return e instanceof Date
                        ? e.toISOString()
                        : 'number' == typeof e
                        ? new Date(e).toISOString()
                        : null;
                    }),
                    (this.asDateTime = function(e) {
                      return 'string' == typeof e ? s(e) : e;
                    }),
                    (this.xml2json = function(e) {
                      return l(e);
                    }),
                    (this.xml_str2json = function(e) {
                      var t = this.parseXmlString(e);
                      return null != t ? this.xml2json(t) : null;
                    }),
                    (this.json2xml_str = function(e) {
                      return A(e, '');
                    }),
                    (this.json2xml = function(e) {
                      var t = this.json2xml_str(e);
                      return this.parseXmlString(t);
                    }),
                    (this.getVersion = function() {
                      return '1.2.0';
                    });
                },
                i = function(e) {
                  if (!e) return null;
                  var t = new r(),
                    n = t.parseFromString(e, 'text/xml'),
                    i = new o(),
                    a = i.xml2json(n);
                  return a.html && a.getElementsByTagName('parsererror').length ? null : a;
                };
              e.exports = i;
            },
            function(e, t) {
              var n;
              n = (function() {
                return this;
              })();
              try {
                n = n || Function('return this')() || (0, eval)('this');
              } catch (e) {
                'object' == typeof window && (n = window);
              }
              e.exports = n;
            },
            function(e, t, n) {
              function r(e) {
                this.options = e || { locator: {} };
              }
              function o(e, t, n) {
                function r(t) {
                  var r = e[t];
                  !r &&
                    a &&
                    (r =
                      2 == e.length
                        ? function(n) {
                            e(t, n);
                          }
                        : e),
                    (o[t] =
                      (r &&
                        function(e) {
                          r('[xmldom ' + t + ']\t' + e + s(n));
                        }) ||
                      function() {});
                }
                if (!e) {
                  if (t instanceof i) return t;
                  e = t;
                }
                var o = {},
                  a = e instanceof Function;
                return (n = n || {}), r('warning'), r('error'), r('fatalError'), o;
              }
              function i() {
                this.cdata = !1;
              }
              function a(e, t) {
                (t.lineNumber = e.lineNumber), (t.columnNumber = e.columnNumber);
              }
              function s(e) {
                if (e)
                  return (
                    '\n@' +
                    (e.systemId || '') +
                    '#[line:' +
                    e.lineNumber +
                    ',col:' +
                    e.columnNumber +
                    ']'
                  );
              }
              function c(e, t, n) {
                return 'string' == typeof e
                  ? e.substr(t, n)
                  : e.length >= t + n || t
                  ? new java.lang.String(e, t, n) + ''
                  : e;
              }
              function u(e, t) {
                e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
              }
              (r.prototype.parseFromString = function(e, t) {
                var n = this.options,
                  r = new l(),
                  a = n.domBuilder || new i(),
                  s = n.errorHandler,
                  c = n.locator,
                  u = n.xmlns || {},
                  d = { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'" };
                return (
                  c && a.setDocumentLocator(c),
                  (r.errorHandler = o(s, a, c)),
                  (r.domBuilder = n.domBuilder || a),
                  /\/x?html?$/.test(t) &&
                    ((d.nbsp = ' '), (d.copy = '©'), (u[''] = 'http://www.w3.org/1999/xhtml')),
                  (u.xml = u.xml || 'http://www.w3.org/XML/1998/namespace'),
                  e ? r.parse(e, u, d) : r.errorHandler.error('invalid doc source'),
                  a.doc
                );
              }),
                (i.prototype = {
                  startDocument: function() {
                    (this.doc = new d().createDocument(null, null, null)),
                      this.locator && (this.doc.documentURI = this.locator.systemId);
                  },
                  startElement: function(e, t, n, r) {
                    var o = this.doc,
                      i = o.createElementNS(e, n || t),
                      s = r.length;
                    u(this, i), (this.currentElement = i), this.locator && a(this.locator, i);
                    for (var c = 0; c < s; c++) {
                      var e = r.getURI(c),
                        l = r.getValue(c),
                        n = r.getQName(c),
                        d = o.createAttributeNS(e, n);
                      this.locator && a(r.getLocator(c), d),
                        (d.value = d.nodeValue = l),
                        i.setAttributeNode(d);
                    }
                  },
                  endElement: function(e, t, n) {
                    var r = this.currentElement;
                    r.tagName;
                    this.currentElement = r.parentNode;
                  },
                  startPrefixMapping: function(e, t) {},
                  endPrefixMapping: function(e) {},
                  processingInstruction: function(e, t) {
                    var n = this.doc.createProcessingInstruction(e, t);
                    this.locator && a(this.locator, n), u(this, n);
                  },
                  ignorableWhitespace: function(e, t, n) {},
                  characters: function(e, t, n) {
                    if ((e = c.apply(this, arguments))) {
                      if (this.cdata) var r = this.doc.createCDATASection(e);
                      else var r = this.doc.createTextNode(e);
                      this.currentElement
                        ? this.currentElement.appendChild(r)
                        : /^\s*$/.test(e) && this.doc.appendChild(r),
                        this.locator && a(this.locator, r);
                    }
                  },
                  skippedEntity: function(e) {},
                  endDocument: function() {
                    this.doc.normalize();
                  },
                  setDocumentLocator: function(e) {
                    (this.locator = e) && (e.lineNumber = 0);
                  },
                  comment: function(e, t, n) {
                    e = c.apply(this, arguments);
                    var r = this.doc.createComment(e);
                    this.locator && a(this.locator, r), u(this, r);
                  },
                  startCDATA: function() {
                    this.cdata = !0;
                  },
                  endCDATA: function() {
                    this.cdata = !1;
                  },
                  startDTD: function(e, t, n) {
                    var r = this.doc.implementation;
                    if (r && r.createDocumentType) {
                      var o = r.createDocumentType(e, t, n);
                      this.locator && a(this.locator, o), u(this, o);
                    }
                  },
                  warning: function(e) {
                    console.warn('[xmldom warning]\t' + e, s(this.locator));
                  },
                  error: function(e) {
                    console.error('[xmldom error]\t' + e, s(this.locator));
                  },
                  fatalError: function(e) {
                    throw (console.error('[xmldom fatalError]\t' + e, s(this.locator)), e);
                  },
                }),
                'endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl'.replace(
                  /\w+/g,
                  function(e) {
                    i.prototype[e] = function() {
                      return null;
                    };
                  },
                );
              var l = n(13).XMLReader,
                d = (t.DOMImplementation = n(1).DOMImplementation);
              (t.XMLSerializer = n(1).XMLSerializer), (t.DOMParser = r);
            },
            function(e, t) {
              function n() {}
              function r(e, t, n, r, u) {
                function h(e) {
                  if (e > 65535) {
                    e -= 65536;
                    var t = 55296 + (e >> 10),
                      n = 56320 + (1023 & e);
                    return String.fromCharCode(t, n);
                  }
                  return String.fromCharCode(e);
                }
                function p(e) {
                  var t = e.slice(1, -1);
                  return t in n
                    ? n[t]
                    : '#' === t.charAt(0)
                    ? h(parseInt(t.substr(1).replace('x', '0x')))
                    : (u.error('entity not found:' + e), e);
                }
                function g(t) {
                  if (t > k) {
                    var n = e.substring(k, t).replace(/&#?\w+;/g, p);
                    x && m(k), r.characters(n, 0, t - k), (k = t);
                  }
                }
                function m(t, n) {
                  for (; t >= v && (n = C.exec(e)); )
                    (y = n.index), (v = y + n[0].length), x.lineNumber++;
                  x.columnNumber = t - y + 1;
                }
                for (
                  var y = 0,
                    v = 0,
                    C = /.*(?:\r\n?|\n)|.*$/g,
                    x = r.locator,
                    b = [{ currentNSMap: t }],
                    A = {},
                    k = 0;
                  ;

                ) {
                  try {
                    var R = e.indexOf('<', k);
                    if (R < 0) {
                      if (!e.substr(k).match(/^\s*$/)) {
                        var _ = r.doc,
                          w = _.createTextNode(e.substr(k));
                        _.appendChild(w), (r.currentElement = w);
                      }
                      return;
                    }
                    switch ((R > k && g(R), e.charAt(R + 1))) {
                      case '/':
                        var N = e.indexOf('>', R + 3),
                          T = e.substring(R + 2, N),
                          S = b.pop();
                        N < 0
                          ? ((T = e.substring(R + 2).replace(/[\s<].*/, '')),
                            u.error('end tag name: ' + T + ' is not complete:' + S.tagName),
                            (N = R + 1 + T.length))
                          : T.match(/\s</) &&
                            ((T = T.replace(/[\s<].*/, '')),
                            u.error('end tag name: ' + T + ' maybe not complete'),
                            (N = R + 1 + T.length));
                        var E = S.localNSMap,
                          B = S.tagName == T;
                        if (B || (S.tagName && S.tagName.toLowerCase() == T.toLowerCase())) {
                          if ((r.endElement(S.uri, S.localName, T), E))
                            for (var D in E) r.endPrefixMapping(D);
                          B ||
                            u.fatalError(
                              'end tag name: ' +
                                T +
                                ' is not match the current start tagName:' +
                                S.tagName,
                            );
                        } else b.push(S);
                        N++;
                        break;
                      case '?':
                        x && m(R), (N = d(e, R, r));
                        break;
                      case '!':
                        x && m(R), (N = l(e, R, r, u));
                        break;
                      default:
                        x && m(R);
                        var I = new f(),
                          O = b[b.length - 1].currentNSMap,
                          N = i(e, R, I, O, p, u),
                          P = I.length;
                        if (
                          (!I.closed &&
                            c(e, N, I.tagName, A) &&
                            ((I.closed = !0), n.nbsp || u.warning('unclosed xml attribute')),
                          x && P)
                        ) {
                          for (var M = o(x, {}), L = 0; L < P; L++) {
                            var F = I[L];
                            m(F.offset), (F.locator = o(x, {}));
                          }
                          (r.locator = M), a(I, r, O) && b.push(I), (r.locator = x);
                        } else a(I, r, O) && b.push(I);
                        'http://www.w3.org/1999/xhtml' !== I.uri || I.closed
                          ? N++
                          : (N = s(e, N, I.tagName, p, r));
                    }
                  } catch (e) {
                    u.error('element parse error: ' + e), (N = -1);
                  }
                  N > k ? (k = N) : g(Math.max(R, k) + 1);
                }
              }
              function o(e, t) {
                return (t.lineNumber = e.lineNumber), (t.columnNumber = e.columnNumber), t;
              }
              function i(e, t, n, r, o, i) {
                for (var a, s, c = ++t, u = v; ; ) {
                  var l = e.charAt(c);
                  switch (l) {
                    case '=':
                      if (u === C) (a = e.slice(t, c)), (u = b);
                      else {
                        if (u !== x) throw new Error('attribute equal must after attrName');
                        u = b;
                      }
                      break;
                    case "'":
                    case '"':
                      if (u === b || u === C) {
                        if (
                          (u === C &&
                            (i.warning('attribute value must after "="'), (a = e.slice(t, c))),
                          (t = c + 1),
                          !((c = e.indexOf(l, t)) > 0))
                        )
                          throw new Error("attribute value no end '" + l + "' match");
                        (s = e.slice(t, c).replace(/&#?\w+;/g, o)), n.add(a, s, t - 1), (u = k);
                      } else {
                        if (u != A) throw new Error('attribute value must after "="');
                        (s = e.slice(t, c).replace(/&#?\w+;/g, o)),
                          n.add(a, s, t),
                          i.warning('attribute "' + a + '" missed start quot(' + l + ')!!'),
                          (t = c + 1),
                          (u = k);
                      }
                      break;
                    case '/':
                      switch (u) {
                        case v:
                          n.setTagName(e.slice(t, c));
                        case k:
                        case R:
                        case _:
                          (u = _), (n.closed = !0);
                        case A:
                        case C:
                        case x:
                          break;
                        default:
                          throw new Error("attribute invalid close char('/')");
                      }
                      break;
                    case '':
                      return (
                        i.error('unexpected end of input'), u == v && n.setTagName(e.slice(t, c)), c
                      );
                    case '>':
                      switch (u) {
                        case v:
                          n.setTagName(e.slice(t, c));
                        case k:
                        case R:
                        case _:
                          break;
                        case A:
                        case C:
                          (s = e.slice(t, c)),
                            '/' === s.slice(-1) && ((n.closed = !0), (s = s.slice(0, -1)));
                        case x:
                          u === x && (s = a),
                            u == A
                              ? (i.warning('attribute "' + s + '" missed quot(")!!'),
                                n.add(a, s.replace(/&#?\w+;/g, o), t))
                              : (('http://www.w3.org/1999/xhtml' === r[''] &&
                                  s.match(/^(?:disabled|checked|selected)$/i)) ||
                                  i.warning(
                                    'attribute "' + s + '" missed value!! "' + s + '" instead!!',
                                  ),
                                n.add(s, s, t));
                          break;
                        case b:
                          throw new Error('attribute value missed!!');
                      }
                      return c;
                    case '':
                      l = ' ';
                    default:
                      if (l <= ' ')
                        switch (u) {
                          case v:
                            n.setTagName(e.slice(t, c)), (u = R);
                            break;
                          case C:
                            (a = e.slice(t, c)), (u = x);
                            break;
                          case A:
                            var s = e.slice(t, c).replace(/&#?\w+;/g, o);
                            i.warning('attribute "' + s + '" missed quot(")!!'), n.add(a, s, t);
                          case k:
                            u = R;
                        }
                      else
                        switch (u) {
                          case x:
                            n.tagName;
                            ('http://www.w3.org/1999/xhtml' === r[''] &&
                              a.match(/^(?:disabled|checked|selected)$/i)) ||
                              i.warning(
                                'attribute "' + a + '" missed value!! "' + a + '" instead2!!',
                              ),
                              n.add(a, a, t),
                              (t = c),
                              (u = C);
                            break;
                          case k:
                            i.warning('attribute space is required"' + a + '"!!');
                          case R:
                            (u = C), (t = c);
                            break;
                          case b:
                            (u = A), (t = c);
                            break;
                          case _:
                            throw new Error(
                              "elements closed character '/' and '>' must be connected to",
                            );
                        }
                  }
                  c++;
                }
              }
              function a(e, t, n) {
                for (var r = e.tagName, o = null, i = e.length; i--; ) {
                  var a = e[i],
                    s = a.qName,
                    c = a.value,
                    l = s.indexOf(':');
                  if (l > 0)
                    var d = (a.prefix = s.slice(0, l)),
                      f = s.slice(l + 1),
                      h = 'xmlns' === d && f;
                  else (f = s), (d = null), (h = 'xmlns' === s && '');
                  (a.localName = f),
                    !1 !== h &&
                      (null == o && ((o = {}), u(n, (n = {}))),
                      (n[h] = o[h] = c),
                      (a.uri = 'http://www.w3.org/2000/xmlns/'),
                      t.startPrefixMapping(h, c));
                }
                for (var i = e.length; i--; ) {
                  a = e[i];
                  var d = a.prefix;
                  d &&
                    ('xml' === d && (a.uri = 'http://www.w3.org/XML/1998/namespace'),
                    'xmlns' !== d && (a.uri = n[d || '']));
                }
                var l = r.indexOf(':');
                l > 0
                  ? ((d = e.prefix = r.slice(0, l)), (f = e.localName = r.slice(l + 1)))
                  : ((d = null), (f = e.localName = r));
                var p = (e.uri = n[d || '']);
                if ((t.startElement(p, f, r, e), !e.closed))
                  return (e.currentNSMap = n), (e.localNSMap = o), !0;
                if ((t.endElement(p, f, r), o)) for (d in o) t.endPrefixMapping(d);
              }
              function s(e, t, n, r, o) {
                if (/^(?:script|textarea)$/i.test(n)) {
                  var i = e.indexOf('</' + n + '>', t),
                    a = e.substring(t + 1, i);
                  if (/[&<]/.test(a))
                    return /^script$/i.test(n)
                      ? (o.characters(a, 0, a.length), i)
                      : ((a = a.replace(/&#?\w+;/g, r)), o.characters(a, 0, a.length), i);
                }
                return t + 1;
              }
              function c(e, t, n, r) {
                var o = r[n];
                return (
                  null == o &&
                    ((o = e.lastIndexOf('</' + n + '>')),
                    o < t && (o = e.lastIndexOf('</' + n)),
                    (r[n] = o)),
                  o < t
                );
              }
              function u(e, t) {
                for (var n in e) t[n] = e[n];
              }
              function l(e, t, n, r) {
                switch (e.charAt(t + 2)) {
                  case '-':
                    if ('-' === e.charAt(t + 3)) {
                      var o = e.indexOf('--\x3e', t + 4);
                      return o > t
                        ? (n.comment(e, t + 4, o - t - 4), o + 3)
                        : (r.error('Unclosed comment'), -1);
                    }
                    return -1;
                  default:
                    if ('CDATA[' == e.substr(t + 3, 6)) {
                      var o = e.indexOf(']]>', t + 9);
                      return n.startCDATA(), n.characters(e, t + 9, o - t - 9), n.endCDATA(), o + 3;
                    }
                    var i = p(e, t),
                      a = i.length;
                    if (a > 1 && /!doctype/i.test(i[0][0])) {
                      var s = i[1][0],
                        c = a > 3 && /^public$/i.test(i[2][0]) && i[3][0],
                        u = a > 4 && i[4][0],
                        l = i[a - 1];
                      return (
                        n.startDTD(
                          s,
                          c && c.replace(/^(['"])(.*?)\1$/, '$2'),
                          u && u.replace(/^(['"])(.*?)\1$/, '$2'),
                        ),
                        n.endDTD(),
                        l.index + l[0].length
                      );
                    }
                }
                return -1;
              }
              function d(e, t, n) {
                var r = e.indexOf('?>', t);
                if (r) {
                  var o = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
                  if (o) {
                    o[0].length;
                    return n.processingInstruction(o[1], o[2]), r + 2;
                  }
                  return -1;
                }
                return -1;
              }
              function f(e) {}
              function h(e, t) {
                return (e.__proto__ = t), e;
              }
              function p(e, t) {
                var n,
                  r = [],
                  o = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                for (o.lastIndex = t, o.exec(e); (n = o.exec(e)); ) if ((r.push(n), n[1])) return r;
              }
              var g = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
                m = new RegExp(
                  '[\\-\\.0-9' + g.source.slice(1, -1) + '\\u00B7\\u0300-\\u036F\\u203F-\\u2040]',
                ),
                y = new RegExp('^' + g.source + m.source + '*(?::' + g.source + m.source + '*)?$'),
                v = 0,
                C = 1,
                x = 2,
                b = 3,
                A = 4,
                k = 5,
                R = 6,
                _ = 7;
              (n.prototype = {
                parse: function(e, t, n) {
                  var o = this.domBuilder;
                  o.startDocument(),
                    u(t, (t = {})),
                    r(e, t, n, o, this.errorHandler),
                    o.endDocument();
                },
              }),
                (f.prototype = {
                  setTagName: function(e) {
                    if (!y.test(e)) throw new Error('invalid tagName:' + e);
                    this.tagName = e;
                  },
                  add: function(e, t, n) {
                    if (!y.test(e)) throw new Error('invalid attribute:' + e);
                    this[this.length++] = { qName: e, value: t, offset: n };
                  },
                  length: 0,
                  getLocalName: function(e) {
                    return this[e].localName;
                  },
                  getLocator: function(e) {
                    return this[e].locator;
                  },
                  getQName: function(e) {
                    return this[e].qName;
                  },
                  getURI: function(e) {
                    return this[e].uri;
                  },
                  getValue: function(e) {
                    return this[e].value;
                  },
                }),
                h({}, h.prototype) instanceof h ||
                  (h = function(e, t) {
                    function n() {}
                    (n.prototype = t), (n = new n());
                    for (t in e) n[t] = e[t];
                    return n;
                  }),
                (t.XMLReader = n);
            },
            function(e, t, n) {
              function r(e, t) {
                var n = e.Bucket,
                  r = e.Region,
                  a = e.Key,
                  s = e.UploadId,
                  c = e.Level || 'task',
                  l = e.AsyncLimit,
                  d = this,
                  f = new u();
                if (
                  (f.on('error', function(e) {
                    return t(e);
                  }),
                  f.on('get_abort_array', function(i) {
                    o.call(
                      d,
                      {
                        Bucket: n,
                        Region: r,
                        Key: a,
                        Headers: e.Headers,
                        AsyncLimit: l,
                        AbortArray: i,
                      },
                      function(e, n) {
                        if (e) return t(e);
                        t(null, n);
                      },
                    );
                  }),
                  'bucket' === c)
                )
                  i.call(d, { Bucket: n, Region: r }, function(e, n) {
                    if (e) return t(e);
                    f.emit('get_abort_array', n.UploadList || []);
                  });
                else if ('file' === c) {
                  if (!a) return t({ error: 'abort_upload_task_no_key' });
                  i.call(d, { Bucket: n, Region: r, Key: a }, function(e, n) {
                    if (e) return t(e);
                    f.emit('get_abort_array', n.UploadList || []);
                  });
                } else {
                  if ('task' !== c) return t({ error: 'abort_unknown_level' });
                  if (!s) return t({ error: 'abort_upload_task_no_id' });
                  if (!a) return t({ error: 'abort_upload_task_no_key' });
                  f.emit('get_abort_array', [{ Key: a, UploadId: s }]);
                }
              }
              function o(e, t) {
                var n = e.Bucket,
                  r = e.Region,
                  o = e.Key,
                  i = e.AbortArray,
                  a = e.AsyncLimit || 1,
                  s = this,
                  u = 0,
                  l = new Array(i.length);
                c.eachLimit(
                  i,
                  a,
                  function(t, i) {
                    var a = u;
                    if (o && o != t.Key) return i(null, { KeyNotMatch: !0 });
                    var c = t.UploadId || t.UploadID;
                    s.multipartAbort(
                      { Bucket: n, Region: r, Key: t.Key, Headers: e.Headers, UploadId: c },
                      function(e, o) {
                        var s = { Bucket: n, Region: r, Key: t.Key, UploadId: c };
                        (l[a] = { error: e, task: s }), i(null);
                      },
                    ),
                      u++;
                  },
                  function(e) {
                    if (e) return t(e);
                    for (var n = [], r = [], o = 0, i = l.length; o < i; o++) {
                      var a = l[o];
                      a.task && (a.error ? r.push(a.task) : n.push(a.task));
                    }
                    return t(null, { successList: n, errorList: r });
                  },
                );
              }
              function i(e, t) {
                var n = this,
                  r = [],
                  o = { Bucket: e.Bucket, Region: e.Region, Prefix: e.Key },
                  i = function() {
                    n.multipartList(o, function(e, n) {
                      if (e) return t(e);
                      r.push.apply(r, n.Upload || []),
                        'true' == n.IsTruncated
                          ? ((o.KeyMarker = n.NextKeyMarker),
                            (o.UploadIdMarker = n.NextUploadIdMarker),
                            i())
                          : t(null, { UploadList: r });
                    });
                  };
                i();
              }
              function a(e, t) {
                var n,
                  r,
                  o = new u(),
                  i = this,
                  a = e.Bucket,
                  d = e.Region,
                  f = e.Key,
                  h = e.CopySource,
                  p = h.slice(h.indexOf('/') + 1, h.length),
                  g = Math.min(e.SliceSize, 5368709120),
                  m = e.ChunkSize || this.options.ChunkSize,
                  y = this.options.ChunkParallelLimit,
                  v = 0;
                o.on('copy_slice_complete', function(e) {
                  i.multipartComplete(
                    { Bucket: a, Region: d, Key: f, UploadId: e.UploadId, Parts: e.PartList },
                    function(e, o) {
                      if (e) return r(null, !0), t(e);
                      r({ loaded: n, total: n }, !0), t(null, o);
                    },
                  );
                }),
                  o.on('get_copy_data_finish', function(e) {
                    c.eachLimit(
                      e.PartList,
                      y,
                      function(o, c) {
                        var u = o.PartNumber,
                          l = o.CopySourceRange,
                          p = o.end - o.start,
                          g = 0;
                        s.call(
                          i,
                          {
                            Bucket: a,
                            Region: d,
                            Key: f,
                            CopySource: h,
                            UploadId: e.UploadId,
                            PartNumber: u,
                            CopySourceRange: l,
                            onProgress: function(e) {
                              (v += e.loaded - g), (g = e.loaded), r({ loaded: v, total: n });
                            },
                          },
                          function(e, i) {
                            if (e) return t(e);
                            r({ loaded: v, total: n }),
                              (v += p - g),
                              (o.ETag = i.ETag),
                              c(e || null, i);
                          },
                        );
                      },
                      function(n) {
                        if (n) return r(null, !0), t(n);
                        o.emit('copy_slice_complete', e);
                      },
                    );
                  }),
                  o.on('get_file_size_finish', function() {
                    !(function() {
                      for (
                        var t = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120],
                          r = 1048576,
                          o = 0;
                        o < t.length && ((r = 1024 * t[o] * 1024), !(n / r < 1e4));
                        o++
                      );
                      e.ChunkSize = m = Math.max(m, r);
                      for (var i = Math.ceil(n / m), a = [], s = 1; s <= i; s++) {
                        var c = (s - 1) * m,
                          u = s * m < n ? s * m : n - 1,
                          l = {
                            PartNumber: s,
                            start: c,
                            end: u,
                            CopySourceRange: 'bytes=' + c + '-' + u,
                          };
                        a.push(l);
                      }
                      e.PartList = a;
                    })(),
                      (r = l.throttleOnProgress.call(i, n, e.onProgress)),
                      i.multipartInit({ Bucket: a, Region: d, Key: f }, function(n, r) {
                        if (n) return t(n);
                        (e.UploadId = r.UploadId), o.emit('get_copy_data_finish', e);
                      });
                  }),
                  i.headObject({ Bucket: a, Region: d, Key: p }, function(r, a) {
                    if (r)
                      return r.statusCode && 404 === r.statusCode
                        ? t({ ErrorStatus: p + ' Not Exist' })
                        : void t(r);
                    (n = e.FileSize = a.headers['Content-Length']),
                      (void 0 !== n && n) ||
                        t({
                          error:
                            'get Content-Length error, please add "Content-Length" to CORS ExposeHeader setting.',
                        }),
                      n <= g ? i.putObjectCopy(e, t) : o.emit('get_file_size_finish');
                  });
              }
              function s(e, t) {
                var n = e.TaskId,
                  r = e.Bucket,
                  o = e.Region,
                  i = e.Key,
                  a = e.CopySource,
                  s = e.UploadId,
                  u = 1 * e.PartNumber,
                  l = e.CopySourceRange,
                  d = this.options.ChunkRetryTimes,
                  f = this;
                c.retry(
                  d,
                  function(t) {
                    f.uploadPartCopy(
                      {
                        TaskId: n,
                        Bucket: r,
                        Region: o,
                        Key: i,
                        CopySource: a,
                        UploadId: s,
                        PartNumber: u,
                        CopySourceRange: l,
                        onProgress: e.onProgress,
                      },
                      function(e, n) {
                        t(e || null, n);
                      },
                    );
                  },
                  function(e, n) {
                    return t(e, n);
                  },
                );
              }
              var c = n(15),
                u = n(2).EventProxy,
                l = n(0),
                d = { abortUploadTask: r, sliceCopyFile: a };
              l.each(d, function(e, n) {
                t[n] = l.apiWrapper(n, e);
              });
            },
            function(e, t) {
              var n = function(e, t, n, r) {
                  if (((r = r || function() {}), !e.length || t <= 0)) return r();
                  var o = 0,
                    i = 0,
                    a = 0;
                  !(function s() {
                    if (o >= e.length) return r();
                    for (; a < t && i < e.length; )
                      (i += 1),
                        (a += 1),
                        n(e[i - 1], function(t) {
                          t
                            ? (r(t), (r = function() {}))
                            : ((o += 1), (a -= 1), o >= e.length ? r() : s());
                        });
                  })();
                },
                r = function(e, t, n) {
                  var r = function(o) {
                    t(function(t, i) {
                      t && o < e ? r(o + 1) : n(t, i);
                    });
                  };
                  e < 1 ? n() : r(1);
                },
                o = { eachLimit: n, retry: r };
              e.exports = o;
            },
            function(e, t, n) {
              'use strict';
              function r(e, t) {
                'function' == typeof e && ((t = e), (e = {}));
                var n = this.options.ServiceDomain,
                  r = e.AppId || this.options.appId;
                n
                  ? ((n = n.replace(/\{\{AppId\}\}/gi, r || '').replace(/\{\{.*?\}\}/gi, '')),
                    /^[a-zA-Z]+:\/\//.test(n) || (n = 'https://' + n),
                    '/' === n.slice(-1) && (n = n.slice(0, -1)))
                  : (n = 'https://service.cos.myqcloud.com'),
                  $.call(this, { url: n + '/', method: 'GET' }, function(e, n) {
                    if (e) return t(e);
                    var r =
                      (n &&
                        n.ListAllMyBucketsResult &&
                        n.ListAllMyBucketsResult.Buckets &&
                        n.ListAllMyBucketsResult.Buckets.Bucket) ||
                      [];
                    (r = Y.isArray(r) ? r : [r]),
                      t(null, { Buckets: r, statusCode: n.statusCode, headers: n.headers });
                  });
              }
              function o(e, t) {
                $.call(
                  this,
                  { Bucket: e.Bucket, Region: e.Region, headers: e.Headers, method: 'HEAD' },
                  function(e, n) {
                    t(e, n);
                  },
                );
              }
              function i(e, t) {
                var n = {};
                (n.prefix = e.Prefix),
                  (n.delimiter = e.Delimiter),
                  (n.marker = e.Marker),
                  (n['max-keys'] = e.MaxKeys),
                  (n['encoding-type'] = e.EncodingType),
                  $.call(
                    this,
                    {
                      method: 'GET',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      headers: e.Headers,
                      qs: n,
                    },
                    function(e, n) {
                      if (e) return t(e);
                      var r = n.ListBucketResult || {},
                        o = r.Contents || [],
                        i = r.CommonPrefixes || [];
                      (o = Y.isArray(o) ? o : [o]), (i = Y.isArray(i) ? i : [i]);
                      var a = Y.clone(r);
                      Y.extend(a, {
                        Contents: o,
                        CommonPrefixes: i,
                        statusCode: n.statusCode,
                        headers: n.headers,
                      }),
                        t(null, a);
                    },
                  );
              }
              function a(e, t) {
                var n = this,
                  r = {};
                (r['x-cos-acl'] = e.ACL),
                  (r['x-cos-grant-read'] = e.GrantRead),
                  (r['x-cos-grant-write'] = e.GrantWrite),
                  (r['x-cos-grant-read-acp'] = e.GrantReadAcp),
                  (r['x-cos-grant-write-acp'] = e.GrantWriteAcp),
                  (r['x-cos-grant-full-control'] = e.GrantFullControl),
                  $.call(
                    this,
                    { method: 'PUT', Bucket: e.Bucket, Region: e.Region, headers: r },
                    function(r, o) {
                      if (r) return t(r);
                      var i = X({
                        domain: n.options.Domain,
                        bucket: e.Bucket,
                        region: e.Region,
                        isLocation: !0,
                      });
                      t(null, { Location: i, statusCode: o.statusCode, headers: o.headers });
                    },
                  );
              }
              function s(e, t) {
                $.call(
                  this,
                  { Bucket: e.Bucket, Region: e.Region, headers: e.Headers, method: 'DELETE' },
                  function(e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, { statusCode: n.statusCode, headers: n.headers });
                  },
                );
              }
              function c(e, t) {
                $.call(
                  this,
                  {
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'acl',
                  },
                  function(e, n) {
                    if (e) return t(e);
                    var r = n.AccessControlPolicy || {},
                      o = r.Owner || {},
                      i = r.AccessControlList.Grant || [];
                    i = Y.isArray(i) ? i : [i];
                    var a = z(r);
                    n.headers && n.headers['x-cos-acl'] && (a.ACL = n.headers['x-cos-acl']),
                      (a = Y.extend(a, {
                        Owner: o,
                        Grants: i,
                        statusCode: n.statusCode,
                        headers: n.headers,
                      })),
                      t(null, a);
                  },
                );
              }
              function u(e, t) {
                var n = e.Headers,
                  r = '';
                if (e.AccessControlPolicy) {
                  var o = Y.clone(e.AccessControlPolicy || {}),
                    i = o.Grants || o.Grant;
                  (i = Y.isArray(i) ? i : [i]),
                    delete o.Grant,
                    delete o.Grants,
                    (o.AccessControlList = { Grant: i }),
                    (r = Y.json2xml({ AccessControlPolicy: o })),
                    (n['Content-Type'] = 'application/xml'),
                    (n['Content-MD5'] = Y.binaryBase64(Y.md5(r)));
                }
                Y.each(n, function(e, t) {
                  0 === t.indexOf('x-cos-grant-') && (n[t] = V(n[t]));
                }),
                  $.call(
                    this,
                    {
                      method: 'PUT',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      headers: n,
                      action: 'acl',
                      body: r,
                    },
                    function(e, n) {
                      if (e) return t(e);
                      t(null, { statusCode: n.statusCode, headers: n.headers });
                    },
                  );
              }
              function l(e, t) {
                $.call(
                  this,
                  {
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'cors',
                  },
                  function(e, n) {
                    if (e)
                      if (
                        404 === e.statusCode &&
                        e.error &&
                        'NoSuchCORSConfiguration' === e.error.Code
                      ) {
                        var r = { CORSRules: [], statusCode: e.statusCode };
                        e.headers && (r.headers = e.headers), t(null, r);
                      } else t(e);
                    else {
                      var o = n.CORSConfiguration || {},
                        i = o.CORSRules || o.CORSRule || [];
                      (i = Y.clone(Y.isArray(i) ? i : [i])),
                        Y.each(i, function(e) {
                          Y.each(
                            ['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'],
                            function(t, n) {
                              var r = t + 's',
                                o = e[r] || e[t] || [];
                              delete e[t], (e[r] = Y.isArray(o) ? o : [o]);
                            },
                          );
                        }),
                        t(null, { CORSRules: i, statusCode: n.statusCode, headers: n.headers });
                    }
                  },
                );
              }
              function d(e, t) {
                var n = e.CORSConfiguration || {},
                  r = n.CORSRules || e.CORSRules || [];
                (r = Y.clone(Y.isArray(r) ? r : [r])),
                  Y.each(r, function(e) {
                    Y.each(
                      ['AllowedOrigin', 'AllowedHeader', 'AllowedMethod', 'ExposeHeader'],
                      function(t, n) {
                        var r = t + 's',
                          o = e[r] || e[t] || [];
                        delete e[r], (e[t] = Y.isArray(o) ? o : [o]);
                      },
                    );
                  });
                var o = Y.json2xml({ CORSConfiguration: { CORSRule: r } }),
                  i = e.Headers;
                (i['Content-Type'] = 'application/xml'),
                  (i['Content-MD5'] = Y.binaryBase64(Y.md5(o))),
                  $.call(
                    this,
                    {
                      method: 'PUT',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      body: o,
                      action: 'cors',
                      headers: i,
                    },
                    function(e, n) {
                      if (e) return t(e);
                      t(null, { statusCode: n.statusCode, headers: n.headers });
                    },
                  );
              }
              function f(e, t) {
                $.call(
                  this,
                  {
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'cors',
                  },
                  function(e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, {
                          statusCode: n.statusCode || e.statusCode,
                          headers: n.headers,
                        });
                  },
                );
              }
              function h(e, t) {
                var n = e.Policy,
                  r = n;
                try {
                  'string' == typeof n ? (n = JSON.parse(r)) : (r = JSON.stringify(n));
                } catch (e) {
                  t({ error: 'Policy format error' });
                }
                var o = e.Headers;
                (o['Content-Type'] = 'application/json'),
                  (o['Content-MD5'] = Y.binaryBase64(Y.md5(r))),
                  $.call(
                    this,
                    {
                      method: 'PUT',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      action: 'policy',
                      body: Y.isBrowser ? r : n,
                      headers: o,
                      json: !0,
                    },
                    function(e, n) {
                      return e && 204 === e.statusCode
                        ? t(null, { statusCode: e.statusCode })
                        : e
                        ? t(e)
                        : void t(null, { statusCode: n.statusCode, headers: n.headers });
                    },
                  );
              }
              function p(e, t) {
                $.call(
                  this,
                  {
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'location',
                  },
                  function(e, n) {
                    if (e) return t(e);
                    t(null, n);
                  },
                );
              }
              function g(e, t) {
                $.call(
                  this,
                  {
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'policy',
                    rawBody: !0,
                  },
                  function(e, n) {
                    if (e)
                      return t(
                        e.statusCode && 403 === e.statusCode
                          ? { ErrorStatus: 'Access Denied' }
                          : e.statusCode && 405 === e.statusCode
                          ? { ErrorStatus: 'Method Not Allowed' }
                          : e.statusCode && 404 === e.statusCode
                          ? { ErrorStatus: 'Policy Not Found' }
                          : e,
                      );
                    var r = {};
                    try {
                      r = JSON.parse(n.body);
                    } catch (e) {}
                    t(null, { Policy: r, statusCode: n.statusCode, headers: n.headers });
                  },
                );
              }
              function m(e, t) {
                $.call(
                  this,
                  {
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'tagging',
                  },
                  function(e, n) {
                    if (e)
                      if (
                        404 !== e.statusCode ||
                        !e.error ||
                        ('Not Found' !== e.error && 'NoSuchTagSet' !== e.error.Code)
                      )
                        t(e);
                      else {
                        var r = { Tags: [], statusCode: e.statusCode };
                        e.headers && (r.headers = e.headers), t(null, r);
                      }
                    else {
                      var o = [];
                      try {
                        o = n.Tagging.TagSet.Tag || [];
                      } catch (e) {}
                      (o = Y.clone(Y.isArray(o) ? o : [o])),
                        t(null, { Tags: o, statusCode: n.statusCode, headers: n.headers });
                    }
                  },
                );
              }
              function y(e, t) {
                var n = e.Tagging || {},
                  r = n.TagSet || n.Tags || e.Tags || [];
                r = Y.clone(Y.isArray(r) ? r : [r]);
                var o = Y.json2xml({ Tagging: { TagSet: { Tag: r } } }),
                  i = e.Headers;
                (i['Content-Type'] = 'application/xml'),
                  (i['Content-MD5'] = Y.binaryBase64(Y.md5(o))),
                  $.call(
                    this,
                    {
                      method: 'PUT',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      body: o,
                      action: 'tagging',
                      headers: i,
                    },
                    function(e, n) {
                      return e && 204 === e.statusCode
                        ? t(null, { statusCode: e.statusCode })
                        : e
                        ? t(e)
                        : void t(null, { statusCode: n.statusCode, headers: n.headers });
                    },
                  );
              }
              function v(e, t) {
                $.call(
                  this,
                  {
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'tagging',
                  },
                  function(e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, { statusCode: n.statusCode, headers: n.headers });
                  },
                );
              }
              function C(e, t) {
                var n = e.LifecycleConfiguration || {},
                  r = n.Rules || [];
                r = Y.clone(r);
                var o = Y.json2xml({ LifecycleConfiguration: { Rule: r } }),
                  i = e.Headers;
                (i['Content-Type'] = 'application/xml'),
                  (i['Content-MD5'] = Y.binaryBase64(Y.md5(o))),
                  $.call(
                    this,
                    {
                      method: 'PUT',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      body: o,
                      action: 'lifecycle',
                      headers: i,
                    },
                    function(e, n) {
                      return e && 204 === e.statusCode
                        ? t(null, { statusCode: e.statusCode })
                        : e
                        ? t(e)
                        : void t(null, { statusCode: n.statusCode, headers: n.headers });
                    },
                  );
              }
              function x(e, t) {
                $.call(
                  this,
                  {
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'lifecycle',
                  },
                  function(e, n) {
                    if (e)
                      if (
                        404 === e.statusCode &&
                        e.error &&
                        'NoSuchLifecycleConfiguration' === e.error.Code
                      ) {
                        var r = { Rules: [], statusCode: e.statusCode };
                        e.headers && (r.headers = e.headers), t(null, r);
                      } else t(e);
                    else {
                      var o = [];
                      try {
                        o = n.LifecycleConfiguration.Rule || [];
                      } catch (e) {}
                      (o = Y.clone(Y.isArray(o) ? o : [o])),
                        t(null, { Rules: o, statusCode: n.statusCode, headers: n.headers });
                    }
                  },
                );
              }
              function b(e, t) {
                $.call(
                  this,
                  {
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'lifecycle',
                  },
                  function(e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, { statusCode: n.statusCode, headers: n.headers });
                  },
                );
              }
              function A(e, t) {
                if (!e.VersioningConfiguration)
                  return void t({ error: 'lack of param VersioningConfiguration' });
                var n = e.VersioningConfiguration || {},
                  r = Y.json2xml({ VersioningConfiguration: n }),
                  o = e.Headers;
                (o['Content-Type'] = 'application/xml'),
                  (o['Content-MD5'] = Y.binaryBase64(Y.md5(r))),
                  $.call(
                    this,
                    {
                      method: 'PUT',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      body: r,
                      action: 'versioning',
                      headers: o,
                    },
                    function(e, n) {
                      return e && 204 === e.statusCode
                        ? t(null, { statusCode: e.statusCode })
                        : e
                        ? t(e)
                        : void t(null, { statusCode: n.statusCode, headers: n.headers });
                    },
                  );
              }
              function k(e, t) {
                $.call(
                  this,
                  {
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'versioning',
                  },
                  function(e, n) {
                    e ||
                      (!n.VersioningConfiguration && (n.VersioningConfiguration = {}),
                      !n.VersioningConfiguration.MFADelete &&
                        (n.VersioningConfiguration.MFADelete = 'Disabled'),
                      !n.VersioningConfiguration.Status &&
                        (n.VersioningConfiguration.Status = 'Disabled')),
                      t(e, n);
                  },
                );
              }
              function R(e, t) {
                var n = Y.clone(e.ReplicationConfiguration);
                (n.Rule = n.Rules), delete n.Rules;
                var r = Y.json2xml({ ReplicationConfiguration: n }),
                  o = e.Headers;
                (o['Content-Type'] = 'application/xml'),
                  (o['Content-MD5'] = Y.binaryBase64(Y.md5(r))),
                  $.call(
                    this,
                    {
                      method: 'PUT',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      body: r,
                      action: 'replication',
                      headers: o,
                    },
                    function(e, n) {
                      return e && 204 === e.statusCode
                        ? t(null, { statusCode: e.statusCode })
                        : e
                        ? t(e)
                        : void t(null, { statusCode: n.statusCode, headers: n.headers });
                    },
                  );
              }
              function _(e, t) {
                $.call(
                  this,
                  {
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'replication',
                  },
                  function(e, n) {
                    if (e)
                      if (
                        404 !== e.statusCode ||
                        !e.error ||
                        ('Not Found' !== e.error &&
                          'ReplicationConfigurationnotFoundError' !== e.error.Code)
                      )
                        t(e);
                      else {
                        var r = {
                          ReplicationConfiguration: { Rules: [] },
                          statusCode: e.statusCode,
                        };
                        e.headers && (r.headers = e.headers), t(null, r);
                      }
                    else
                      e || (!n.ReplicationConfiguration && (n.ReplicationConfiguration = {})),
                        t(e, n);
                  },
                );
              }
              function w(e, t) {
                $.call(
                  this,
                  {
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    action: 'replication',
                  },
                  function(e, n) {
                    return e && 204 === e.statusCode
                      ? t(null, { statusCode: e.statusCode })
                      : e
                      ? t(e)
                      : void t(null, { statusCode: n.statusCode, headers: n.headers });
                  },
                );
              }
              function N(e, t) {
                $.call(
                  this,
                  {
                    method: 'HEAD',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    VersionId: e.VersionId,
                    headers: e.Headers,
                  },
                  function(n, r) {
                    if (n) {
                      var o = n.statusCode;
                      return e.Headers['If-Modified-Since'] && o && 304 === o
                        ? t(null, { NotModified: !0, statusCode: o })
                        : t(n);
                    }
                    t(null, r);
                  },
                );
              }
              function T(e, t) {
                $.call(
                  this,
                  {
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    headers: e.Headers,
                    qs: { prefix: e.Prefix },
                    action: 'versions',
                  },
                  function(e, n) {
                    if (e) return t(e);
                    var r = n.ListVersionsResult || {},
                      o = r.DeleteMarker || [];
                    o = Y.isArray(o) ? o : [o];
                    var i = r.Version || [];
                    i = Y.isArray(i) ? i : [i];
                    var a = Y.clone(r);
                    delete a.DeleteMarker,
                      delete a.Version,
                      Y.extend(a, {
                        DeleteMarkers: o,
                        Versions: i,
                        statusCode: n.statusCode,
                        headers: n.headers,
                      }),
                      t(null, a);
                  },
                );
              }
              function S(e, t) {
                var n = {};
                (n['response-content-type'] = e.ResponseContentType),
                  (n['response-content-language'] = e.ResponseContentLanguage),
                  (n['response-expires'] = e.ResponseExpires),
                  (n['response-cache-control'] = e.ResponseCacheControl),
                  (n['response-content-disposition'] = e.ResponseContentDisposition),
                  (n['response-content-encoding'] = e.ResponseContentEncoding);
                var r;
                (r = Y.isBrowser ? 'string' : 'buffer'),
                  $.call(
                    this,
                    {
                      method: 'GET',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      Key: e.Key,
                      VersionId: e.VersionId,
                      headers: e.Headers,
                      qs: n,
                      rawBody: !0,
                    },
                    function(n, o) {
                      if (n) {
                        var i = n.statusCode;
                        return e.Headers['If-Modified-Since'] && i && 304 === i
                          ? t(null, { NotModified: !0 })
                          : t(n);
                      }
                      var a = {};
                      'string' === r && (a.Body = o.body),
                        Y.extend(a, { statusCode: o.statusCode, headers: o.headers }),
                        t(null, a);
                    },
                  );
              }
              function E(e, t) {
                var n = this,
                  r = e.Headers,
                  o = e.Body;
                if (!o || 'string' != typeof o)
                  return void t({
                    error: 'params body format error, Only allow Buffer, Stream, Blob.',
                  });
                (r['Content-Length'] = o.length),
                  $.call(
                    this,
                    {
                      TaskId: e.TaskId,
                      method: 'PUT',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      Key: e.Key,
                      headers: r,
                      body: o,
                    },
                    function(r, o) {
                      if (r) return t(r);
                      if (o && o.headers && o.headers.etag) {
                        var i = X({
                          protocol: n.options.Protocol,
                          domain: n.options.Domain,
                          bucket: e.Bucket,
                          region: e.Region,
                          object: e.Key,
                        });
                        return t(null, {
                          Location: i,
                          ETag: o.headers.etag,
                          statusCode: o.statusCode,
                          headers: o.headers,
                        });
                      }
                      t(null, o);
                    },
                  );
              }
              function B(e, t) {
                var n = this,
                  r = {};
                (r['Cache-Control'] = e.CacheControl),
                  (r['Content-Disposition'] = e.ContentDisposition),
                  (r['Content-Encoding'] = e.ContentEncoding),
                  (r['Content-MD5'] = e.ContentMD5),
                  (r['Content-Length'] = e.ContentLength),
                  (r['Content-Type'] = e.ContentType),
                  (r.Expect = e.Expect),
                  (r.Expires = e.Expires),
                  (r['x-cos-acl'] = e.ACL),
                  (r['x-cos-grant-read'] = e.GrantRead),
                  (r['x-cos-grant-write'] = e.GrantWrite),
                  (r['x-cos-grant-full-control'] = e.GrantFullControl),
                  (r['x-cos-storage-class'] = e.StorageClass);
                var o = e.FilePath;
                for (var i in e)
                  (i.indexOf('x-cos-meta-') > -1 || i.indexOf('Vod-Forward-Cos') > -1) &&
                    (r[i] = e[i]);
                var a = Y.throttleOnProgress.call(n, r['Content-Length'], e.onProgress);
                $.call(
                  this,
                  {
                    method: 'POST',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: r,
                    filePath: o,
                    onProgress: a,
                  },
                  function(r, o) {
                    if ((a(null, !0), r)) return t(r);
                    if (o) {
                      var i = X({
                        protocol: n.options.Protocol,
                        domain: n.options.Domain,
                        bucket: e.Bucket,
                        region: e.Region,
                        object: e.Key,
                      });
                      return t(null, { Location: i, statusCode: o.statusCode });
                    }
                    t(null, o);
                  },
                );
              }
              function D(e, t) {
                $.call(
                  this,
                  {
                    method: 'DELETE',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: e.Headers,
                    VersionId: e.VersionId,
                  },
                  function(e, n) {
                    if (e) {
                      var r = e.statusCode;
                      return r && 204 === r
                        ? t(null, { statusCode: r })
                        : r && 404 === r
                        ? t(null, { BucketNotFound: !0, statusCode: r })
                        : t(e);
                    }
                    t(null, { statusCode: n.statusCode, headers: n.headers });
                  },
                );
              }
              function I(e, t) {
                $.call(
                  this,
                  {
                    method: 'GET',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    headers: e.Headers,
                    action: 'acl',
                  },
                  function(e, n) {
                    if (e) return t(e);
                    var r = n.AccessControlPolicy || {},
                      o = r.Owner || {},
                      i = (r.AccessControlList && r.AccessControlList.Grant) || [];
                    i = Y.isArray(i) ? i : [i];
                    var a = z(r);
                    n.headers && n.headers['x-cos-acl'] && (a.ACL = n.headers['x-cos-acl']),
                      (a = Y.extend(a, {
                        Owner: o,
                        Grants: i,
                        statusCode: n.statusCode,
                        headers: n.headers,
                      })),
                      t(null, a);
                  },
                );
              }
              function O(e, t) {
                var n = e.Headers,
                  r = '';
                if (e.AccessControlPolicy) {
                  var o = Y.clone(e.AccessControlPolicy || {}),
                    i = o.Grants || o.Grant;
                  (i = Y.isArray(i) ? i : [i]),
                    delete o.Grant,
                    delete o.Grants,
                    (o.AccessControlList = { Grant: i }),
                    (r = Y.json2xml({ AccessControlPolicy: o })),
                    (n['Content-Type'] = 'application/xml'),
                    (n['Content-MD5'] = Y.binaryBase64(Y.md5(r)));
                }
                Y.each(n, function(e, t) {
                  0 === t.indexOf('x-cos-grant-') && (n[t] = V(n[t]));
                }),
                  $.call(
                    this,
                    {
                      method: 'PUT',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      Key: e.Key,
                      action: 'acl',
                      headers: n,
                      body: r,
                    },
                    function(e, n) {
                      if (e) return t(e);
                      t(null, { statusCode: n.statusCode, headers: n.headers });
                    },
                  );
              }
              function P(e, t) {
                var n = e.Headers;
                (n.Origin = e.Origin),
                  (n['Access-Control-Request-Method'] = e.AccessControlRequestMethod),
                  (n['Access-Control-Request-Headers'] = e.AccessControlRequestHeaders),
                  $.call(
                    this,
                    {
                      method: 'OPTIONS',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      Key: e.Key,
                      headers: n,
                    },
                    function(e, n) {
                      if (e)
                        return e.statusCode && 403 === e.statusCode
                          ? t(null, { OptionsForbidden: !0, statusCode: e.statusCode })
                          : t(e);
                      var r = n.headers || {};
                      t(null, {
                        AccessControlAllowOrigin: r['access-control-allow-origin'],
                        AccessControlAllowMethods: r['access-control-allow-methods'],
                        AccessControlAllowHeaders: r['access-control-allow-headers'],
                        AccessControlExposeHeaders: r['access-control-expose-headers'],
                        AccessControlMaxAge: r['access-control-max-age'],
                        statusCode: n.statusCode,
                        headers: n.headers,
                      });
                    },
                  );
              }
              function M(e, t) {
                $.call(
                  this,
                  {
                    method: 'PUT',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    VersionId: e.VersionId,
                    headers: e.Headers,
                  },
                  function(e, n) {
                    if (e) return t(e);
                    var r = Y.clone(n.CopyObjectResult || {});
                    Y.extend(r, { statusCode: n.statusCode, headers: n.headers }), t(null, r);
                  },
                );
              }
              function L(e, t) {
                $.call(
                  this,
                  {
                    method: 'PUT',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    VersionId: e.VersionId,
                    qs: { partNumber: e.PartNumber, uploadId: e.UploadId },
                    headers: e.Headers,
                  },
                  function(e, n) {
                    if (e) return t(e);
                    var r = Y.clone(n.CopyPartResult || {});
                    Y.extend(r, { statusCode: n.statusCode, headers: n.headers }), t(null, r);
                  },
                );
              }
              function F(e, t) {
                var n = e.Objects || {},
                  r = e.Quiet,
                  o = Y.json2xml({ Delete: { Object: n, Quiet: r || !1 } }),
                  i = e.Headers;
                (i['Content-Type'] = 'application/xml'),
                  (i['Content-MD5'] = Y.binaryBase64(Y.md5(o))),
                  $.call(
                    this,
                    {
                      method: 'POST',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      body: o,
                      action: 'delete',
                      headers: i,
                    },
                    function(e, n) {
                      if (e) return t(e);
                      var r = n.DeleteResult || {},
                        o = r.Deleted || [],
                        i = r.Error || [];
                      (o = Y.isArray(o) ? o : [o]), (i = Y.isArray(i) ? i : [i]);
                      var a = Y.clone(r);
                      Y.extend(a, {
                        Error: i,
                        Deleted: o,
                        statusCode: n.statusCode,
                        headers: n.headers,
                      }),
                        t(null, a);
                    },
                  );
              }
              function U(e, t) {
                var n = e.Headers;
                if (!e.RestoreRequest) return void t({ error: 'lack of param RestoreRequest' });
                var r = e.RestoreRequest || {},
                  o = Y.json2xml({ RestoreRequest: r });
                (n['Content-Type'] = 'application/xml'),
                  (n['Content-MD5'] = Y.binaryBase64(Y.md5(o))),
                  $.call(
                    this,
                    {
                      method: 'POST',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      Key: e.Key,
                      VersionId: e.VersionId,
                      body: o,
                      action: 'restore',
                      headers: n,
                    },
                    function(e, n) {
                      t(e, n);
                    },
                  );
              }
              function j(e, t) {
                $.call(
                  this,
                  {
                    method: 'POST',
                    Bucket: e.Bucket,
                    Region: e.Region,
                    Key: e.Key,
                    action: 'uploads',
                    headers: e.Headers,
                  },
                  function(e, n) {
                    return e
                      ? t(e)
                      : (n = Y.clone(n || {})) && n.InitiateMultipartUploadResult
                      ? t(
                          null,
                          Y.extend(n.InitiateMultipartUploadResult, {
                            statusCode: n.statusCode,
                            headers: n.headers,
                          }),
                        )
                      : void t(null, n);
                  },
                );
              }
              function H(e, t) {
                for (var n = this, r = e.UploadId, o = e.Parts, i = 0, a = o.length; i < a; i++)
                  0 !== o[i].ETag.indexOf('"') && (o[i].ETag = '"' + o[i].ETag + '"');
                var s = Y.json2xml({ CompleteMultipartUpload: { Part: o } }),
                  c = e.Headers;
                (c['Content-Type'] = 'application/xml'),
                  (c['Content-MD5'] = Y.binaryBase64(Y.md5(s))),
                  $.call(
                    this,
                    {
                      method: 'POST',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      Key: e.Key,
                      qs: { uploadId: r },
                      body: s,
                      headers: c,
                    },
                    function(r, o) {
                      if (r) return t(r);
                      var i = X({
                          protocol: n.options.Protocol,
                          domain: n.options.Domain,
                          bucket: e.Bucket,
                          region: e.Region,
                          object: e.Key,
                          isLocation: !0,
                        }),
                        a = o.CompleteMultipartUploadResult || {},
                        s = Y.extend(a, {
                          Location: i,
                          statusCode: o.statusCode,
                          headers: o.headers,
                        });
                      t(null, s);
                    },
                  );
              }
              function K(e, t) {
                var n = {};
                (n.delimiter = e.Delimiter),
                  (n['encoding-type'] = e.EncodingType),
                  (n.prefix = e.Prefix),
                  (n['max-uploads'] = e.MaxUploads),
                  (n['key-marker'] = e.KeyMarker),
                  (n['upload-id-marker'] = e.UploadIdMarker),
                  (n = Y.clearKey(n)),
                  $.call(
                    this,
                    {
                      method: 'GET',
                      Bucket: e.Bucket,
                      Region: e.Region,
                      headers: e.Headers,
                      qs: n,
                      action: 'uploads',
                    },
                    function(e, n) {
                      if (e) return t(e);
                      if (n && n.ListMultipartUploadsResult) {
                        var r = n.ListMultipartUploadsResult.Upload || [],
                          o = n.ListMultipartUploadsResult.CommonPrefixes || [];
                        (o = Y.isArray(o) ? o : [o]),
                          (r = Y.isArray(r) ? r : [r]),
                          (n.ListMultipartUploadsResult.Upload = r),
                          (n.ListMultipartUploadsResult.CommonPrefixes = o);
                      }
                      var i = Y.clone(n.ListMultipartUploadsResult || {});
                      Y.extend(i, { statusCode: n.statusCode, headers: n.headers }), t(null, i);
                    },
                  );
              }
              function q(e) {
                return Y.getAuth({
                  SecretId: e.SecretId || this.options.SecretId || '',
                  SecretKey: e.SecretKey || this.options.SecretKey || '',
                  Method: e.Method,
                  Key: e.Key,
                  Query: e.Query,
                  Headers: e.Headers,
                  Expires: e.Expires,
                });
              }
              function G(e, t) {
                var n = this,
                  r = X({
                    protocol: n.options.Protocol,
                    domain: n.options.Domain,
                    bucket: e.Bucket,
                    region: e.Region,
                    object: e.Key,
                  });
                if (void 0 !== e.Sign && !e.Sign) return t(null, { Url: r }), r;
                var o = W.call(
                  this,
                  {
                    Bucket: e.Bucket || '',
                    Region: e.Region || '',
                    Method: e.Method || 'get',
                    Key: e.Key,
                  },
                  function(e) {
                    if (t) {
                      var n = { Url: r + '?sign=' + encodeURIComponent(e.Authorization) };
                      e.XCosSecurityToken && (n.XCosSecurityToken = e.XCosSecurityToken),
                        e.ClientIP && (n.ClientIP = e.ClientIP),
                        e.ClientUA && (n.ClientUA = e.ClientUA),
                        e.Token && (n.Token = e.Token),
                        setTimeout(function() {
                          t(null, n);
                        });
                    }
                  },
                );
                return o ? r + '?sign=' + encodeURIComponent(o) : r;
              }
              function z(e) {
                var t = {
                    GrantFullControl: [],
                    GrantWrite: [],
                    GrantRead: [],
                    GrantReadAcp: [],
                    GrantWriteAcp: [],
                    ACL: '',
                  },
                  n = {
                    FULL_CONTROL: 'GrantFullControl',
                    WRITE: 'GrantWrite',
                    READ: 'GrantRead',
                    READ_ACP: 'GrantReadAcp',
                    WRITE_ACP: 'GrantWriteAcp',
                  },
                  r = e.AccessControlList.Grant;
                r && (r = Y.isArray(r) ? r : [r]);
                var o = { READ: 0, WRITE: 0, FULL_CONTROL: 0 };
                return (
                  r.length &&
                    Y.each(r, function(r) {
                      'qcs::cam::anyone:anyone' === r.Grantee.ID ||
                      'http://cam.qcloud.com/groups/global/AllUsers' === r.Grantee.URI
                        ? (o[r.Permission] = 1)
                        : r.Grantee.ID !== e.Owner.ID &&
                          t[n[r.Permission]].push('id="' + r.Grantee.ID + '"');
                    }),
                  o.FULL_CONTROL || (o.WRITE && o.READ)
                    ? (t.ACL = 'public-read-write')
                    : o.READ
                    ? (t.ACL = 'public-read')
                    : (t.ACL = 'private'),
                  Y.each(n, function(e) {
                    t[e] = V(t[e].join(','));
                  }),
                  t
                );
              }
              function V(e) {
                var t,
                  n,
                  r = e.split(','),
                  o = {};
                for (t = 0; t < r.length; )
                  (n = r[t].trim()), o[n] ? r.splice(t, 1) : ((o[n] = !0), (r[t] = n), t++);
                return r.join(',');
              }
              function X(e) {
                var t = e.bucket,
                  n = t.substr(0, t.lastIndexOf('-')),
                  r = t.substr(t.lastIndexOf('-') + 1),
                  o = e.domain,
                  i = e.region,
                  a = e.object,
                  s = e.protocol || 'https:';
                o ||
                  (o =
                    ['cn-south', 'cn-south-2', 'cn-north', 'cn-east', 'cn-southwest', 'sg'].indexOf(
                      i,
                    ) > -1
                      ? '{{Bucket}}-{{AppId}}.{{Region}}.myqcloud.com'
                      : '{{Bucket}}-{{AppId}}.cos.{{Region}}.myqcloud.com'),
                  (o = o
                    .replace(/\{\{AppId\}\}/gi, r)
                    .replace(/\{\{Bucket\}\}/gi, n)
                    .replace(/\{\{Region\}\}/gi, i)
                    .replace(/\{\{.*?\}\}/gi, '')),
                  /^[a-zA-Z]+:\/\//.test(o) || (o = s + '//vod2.qcloud.com/' + o),
                  '/' === o.slice(-1) && (o = o.slice(0, -1));
                var c = o;
                return (
                  a && (c += '/' + encodeURIComponent(a).replace(/%2F/g, '/')),
                  e.isLocation && (c = c.replace(/^https?:\/\//, '')),
                  c
                );
              }
              function W(e, t) {
                var n = this,
                  r = e.Bucket || '',
                  o = e.Region || '';
                n._StsMap = n._StsMap || {};
                var i = n._StsMap[r + '.' + o] || {},
                  a = function() {
                    var n = Y.getAuth({
                        SecretId: i.TmpSecretId,
                        SecretKey: i.TmpSecretKey,
                        Method: e.Method,
                        Key: e.Key || '',
                        Query: e.Query,
                        Headers: e.Headers,
                      }),
                      r = {
                        Authorization: n,
                        XCosSecurityToken: i.XCosSecurityToken || '',
                        Token: i.Token || '',
                        ClientIP: i.ClientIP || '',
                        ClientUA: i.ClientUA || '',
                      };
                    t && t(r);
                  };
                if (i.ExpiredTime && i.ExpiredTime - (Date.now() / 1e3 > 60)) a();
                else if (n.options.getAuthorization)
                  n.options.getAuthorization.call(
                    n,
                    {
                      Bucket: r,
                      Region: o,
                      Method: e.Method,
                      Key: e.Key || '',
                      Query: e.Query,
                      Headers: e.Headers,
                    },
                    function(e) {
                      'string' == typeof e && (e = { Authorization: e }),
                        e.TmpSecretId && e.TmpSecretKey && e.XCosSecurityToken && e.ExpiredTime
                          ? ((i = n._StsMap[r + '.' + o] = e), a())
                          : t && t(e);
                    },
                  );
                else {
                  if (!n.options.getSTS) {
                    var s = Y.getAuth({
                      SecretId: e.SecretId || n.options.SecretId,
                      SecretKey: e.SecretKey || n.options.SecretKey,
                      Method: e.Method,
                      Key: e.Key || '',
                      Query: e.Query,
                      Headers: e.Headers,
                    });
                    return t && t({ Authorization: s }), s;
                  }
                  n.options.getSTS.call(n, { Bucket: r, Region: o }, function(e) {
                    (i = n._StsMap[r + '.' + o] = e || {}),
                      (i.TmpSecretId = i.SecretId),
                      (i.TmpSecretKey = i.SecretKey),
                      a();
                  });
                }
                return '';
              }
              function $(e, t) {
                var n = this;
                !e.headers && (e.headers = {}),
                  !e.qs && (e.qs = {}),
                  e.VersionId && (e.qs.versionId = e.VersionId),
                  (e.qs = Y.clearKey(e.qs)),
                  e.headers && (e.headers = Y.clearKey(e.headers)),
                  e.qs && (e.qs = Y.clearKey(e.qs));
                var r = Y.clone(e.qs);
                e.action && (r[e.action] = ''),
                  W.call(
                    n,
                    {
                      Bucket: e.Bucket || '',
                      Region: e.Region || '',
                      Method: e.method,
                      Key: e.filePath && 'POST' === e.method ? '' : e.Key,
                      Query: r,
                      Headers: e.headers,
                    },
                    function(r) {
                      var o = r.Authorization,
                        i = !1;
                      if (o)
                        if (o.indexOf(' ') > -1) i = !1;
                        else if (
                          o.indexOf('q-sign-algorithm=') > -1 &&
                          o.indexOf('q-ak=') > -1 &&
                          o.indexOf('q-sign-time=') > -1 &&
                          o.indexOf('q-key-time=') > -1 &&
                          o.indexOf('q-url-param-list=') > -1
                        )
                          i = !0;
                        else
                          try {
                            (o = atob(o)),
                              o.indexOf('a=') > -1 &&
                                o.indexOf('k=') > -1 &&
                                o.indexOf('t=') > -1 &&
                                o.indexOf('r=') > -1 &&
                                o.indexOf('b=') > -1 &&
                                (i = !0);
                          } catch (e) {}
                      if (!i) return void t('authorization error');
                      (e.AuthData = r), Q.call(n, e, t);
                    },
                  );
              }
              function Q(e, t) {
                var n = this,
                  r = e.TaskId;
                if (!r || n._isRunningTask(r)) {
                  var o = e.Bucket,
                    i = e.Region,
                    a = e.Key,
                    s = e.method || 'GET',
                    c = e.url,
                    u = e.body,
                    l = e.json,
                    d = e.rawBody;
                  (c =
                    c ||
                    X({
                      protocol: n.options.Protocol,
                      domain: n.options.Domain,
                      bucket: o,
                      region: i,
                      object: a,
                    })),
                    e.action && (c = c + (a ? '' : '/') + '?' + e.action);
                  var f = {
                    method: s,
                    url: c,
                    headers: e.headers,
                    qs: e.qs,
                    filePath: e.filePath,
                    body: u,
                    json: l,
                  };
                  (f.headers.Authorization = e.AuthData.Authorization),
                    e.AuthData.Token && (f.headers.token = e.AuthData.Token),
                    e.AuthData.ClientIP && (f.headers.clientIP = e.AuthData.ClientIP),
                    e.AuthData.ClientUA && (f.headers.clientUA = e.AuthData.ClientUA),
                    e.AuthData.XCosSecurityToken &&
                      (f.headers['x-cos-security-token'] = e.AuthData.XCosSecurityToken),
                    f.headers && (f.headers = Y.clearKey(f.headers)),
                    (f = Y.clearKey(f)),
                    e.onProgress &&
                      'function' == typeof e.onProgress &&
                      (f.onProgress = function(t) {
                        if (!r || n._isRunningTask(r)) {
                          var o = t ? t.loaded : 0;
                          e.onProgress({ loaded: o, total: t.total });
                        }
                      });
                  var h = Z(f, function(e, o, i) {
                      var a,
                        s = function(e, i) {
                          if ((r && n.off('inner-kill-task', p), !a)) {
                            a = !0;
                            var s = {};
                            o && o.statusCode && (s.statusCode = o.statusCode),
                              o && o.headers && (s.headers = o.headers),
                              e
                                ? ((e = Y.extend(e || {}, s)), t(e, null))
                                : ((i = Y.extend(i || {}, s)), t(null, i));
                          }
                        };
                      if (e) return void s({ error: e });
                      var c;
                      try {
                        c = Y.xml2json(i) || {};
                      } catch (e) {
                        c = i || {};
                      }
                      var u = o.statusCode;
                      return 2 !== Math.floor(u / 100)
                        ? void s({ error: c.Error || c })
                        : (d && ((c = {}), (c.body = i)),
                          c.Error ? void s({ error: c.Error }) : void s(null, c));
                    }),
                    p = function(e) {
                      e.TaskId === r && (h && h.abort && h.abort(), n.off('inner-kill-task', p));
                    };
                  r && n.on('inner-kill-task', p);
                }
              }
              var Z = n(9),
                Y = n(0),
                J = {
                  getService: r,
                  putBucket: a,
                  getBucket: i,
                  headBucket: o,
                  deleteBucket: s,
                  getBucketAcl: c,
                  putBucketAcl: u,
                  getBucketCors: l,
                  putBucketCors: d,
                  deleteBucketCors: f,
                  getBucketLocation: p,
                  putBucketTagging: y,
                  getBucketTagging: m,
                  deleteBucketTagging: v,
                  getBucketPolicy: g,
                  putBucketPolicy: h,
                  getBucketLifecycle: x,
                  putBucketLifecycle: C,
                  deleteBucketLifecycle: b,
                  putBucketVersioning: A,
                  getBucketVersioning: k,
                  putBucketReplication: R,
                  getBucketReplication: _,
                  deleteBucketReplication: w,
                  getObject: S,
                  headObject: N,
                  listObjectVersions: T,
                  putObject: E,
                  postObject: B,
                  deleteObject: D,
                  getObjectAcl: I,
                  putObjectAcl: O,
                  optionsObject: P,
                  putObjectCopy: M,
                  restoreObject: U,
                  deleteMultipleObject: F,
                  uploadPartCopy: L,
                  multipartInit: j,
                  multipartComplete: H,
                  multipartList: K,
                  getObjectUrl: G,
                  getAuth: q,
                };
              Y.each(J, function(e, n) {
                t[n] = Y.apiWrapper(n, e);
              });
            },
            function(e, t, n) {
              var r = n(0),
                o = function(e) {
                  var t = [],
                    n = {},
                    o = 0,
                    i = 0,
                    a = {};
                  r.each(['postObject'], function(t) {
                    (a[t] = e[t]),
                      (e[t] = function(n, r) {
                        e._addTask(t, n, r);
                      });
                  });
                  var s = function(e) {
                      var t = {
                        id: e.id,
                        Bucket: e.Bucket,
                        Region: e.Region,
                        Key: e.Key,
                        FilePath: e.FilePath,
                        state: e.state,
                        loaded: e.loaded,
                        size: e.size,
                        speed: e.speed,
                        percent: e.percent,
                        hashPercent: e.hashPercent,
                      };
                      return e.FilePath && (t.FilePath = e.FilePath), t;
                    },
                    c = function() {
                      e.emit('list-update', { list: r.map(t, s) });
                    },
                    u = function() {
                      if (i < t.length && o < e.options.FileParallelLimit) {
                        var n = t[i];
                        'waiting' === n.state &&
                          (o++,
                          (n.state = 'checking'),
                          !n.params.UploadData && (n.params.UploadData = {}),
                          a[n.api].call(e, n.params, function(t, r) {
                            ('checking' !== n.state && 'uploading' !== n.state) ||
                              ((n.state = t ? 'error' : 'success'),
                              o--,
                              u(e),
                              n.callback && n.callback(t, r),
                              'success' === n.state && (delete n.params, delete n.callback));
                          }),
                          c()),
                          i++,
                          u(e);
                      }
                    },
                    l = function(t, r) {
                      var i = n[t];
                      if (i) {
                        var a = i && 'waiting' === i.state,
                          s = i && ('checking' === i.state || 'uploading' === i.state);
                        if (a || s || ('canceled' === r && 'paused' === i.state)) {
                          if (
                            'paused' === r &&
                            i.params.Body &&
                            'function' == typeof i.params.Body.pipe
                          )
                            return void console.error('stream not support pause');
                          (i.state = r),
                            e.emit('inner-kill-task', { TaskId: t }),
                            c(),
                            s && (o--, u(e)),
                            'canceled' === r && (delete i.params, delete i.callback);
                        }
                      }
                    };
                  (e._addTasks = function(t) {
                    r.each(t, function(t) {
                      (t.params.IgnoreAddEvent = !0), e._addTask(t.api, t.params, t.callback);
                    }),
                      c();
                  }),
                    (e._addTask = function(o, i, a) {
                      var s = r.uuid();
                      i.TaskReady && i.TaskReady(s);
                      var l;
                      i.Body && i.Body.size
                        ? (l = i.Body.size)
                        : i.Body && i.Body.length
                        ? (l = i.Body.length)
                        : void 0 !== i.ContentLength && (l = i.ContentLength),
                        void 0 === i.ContentLength && (i.ContentLength = l),
                        (i.TaskId = s);
                      var d = {
                          params: i,
                          callback: a,
                          api: o,
                          index: t.length,
                          id: s,
                          Bucket: i.Bucket,
                          Region: i.Region,
                          Key: i.Key,
                          FilePath: i.FilePath || '',
                          state: 'waiting',
                          loaded: 0,
                          size: l,
                          speed: 0,
                          percent: 0,
                          hashPercent: 0,
                        },
                        f = i.onHashProgress;
                      i.onHashProgress = function(t) {
                        e._isRunningTask(d.id) && ((d.hashPercent = t.percent), f && f(t), c());
                      };
                      var h = i.onProgress;
                      return (
                        (i.onProgress = function(t) {
                          e._isRunningTask(d.id) &&
                            ('checking' === d.state && (d.state = 'uploading'),
                            (d.loaded = t.loaded),
                            (d.speed = t.speed),
                            (d.percent = t.percent),
                            h && h(t),
                            c());
                        }),
                        t.push(d),
                        (n[s] = d),
                        !i.IgnoreAddEvent && c(),
                        u(e),
                        s
                      );
                    }),
                    (e._isRunningTask = function(e) {
                      var t = n[e];
                      return !(!t || ('checking' !== t.state && 'uploading' !== t.state));
                    }),
                    (e.getTaskList = function() {
                      return r.map(t, s);
                    }),
                    (e.cancelTask = function(e) {
                      l(e, 'canceled');
                    }),
                    (e.pauseTask = function(e) {
                      l(e, 'paused');
                    }),
                    (e.restartTask = function(e) {
                      var t = n[e];
                      !t ||
                        ('paused' !== t.state && 'error' !== t.state) ||
                        ((t.state = 'waiting'), c(), (i = Math.min(i, t.index)), u());
                    });
                };
              e.exports.init = o;
            },
          ]);
        });

        /***/
      },
      /* 2 */
      /***/ function(module, exports) {
        const vodUtil = {
          getType: function getType(a) {
            if (a === null) {
              return 'null';
            }
            if (a === undefined) {
              return 'undefined';
            }
            return Object.prototype.toString
              .call(a)
              .slice(8, -1)
              .toLowerCase();
          },
          isFunction: function isFunction(para) {
            if (para && this.getType(para) !== 'function') {
              return false;
            }
            return true;
          },
          getFileMessage: function getFileMessage(file, fileName) {
            const fileMsg = {};
            fileMsg.tempFilePath = file.tempFilePath;
            fileMsg.type = file.tempFilePath.substring(file.tempFilePath.lastIndexOf('.') + 1);
            if (typeof fileName === 'string') {
              fileMsg.name = fileName;
            } else {
              fileMsg.name = '来自小程序';
            }
            fileMsg.size = file.size;
            return fileMsg;
          },
        };

        module.exports = vodUtil;

        /***/
      },
      /* 3 */
      /***/ function(module, exports) {
        const UploaderEvent = {
          video_progress: 'video_progress',
          media_progress: 'media_progress',
        };

        exports.UploaderEvent = UploaderEvent;

        /***/
      },
      /******/
    ],
  ),
);