(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"), require("p-cancelable"));
	else if(typeof define === 'function' && define.amd)
		define(["axios", "p-cancelable"], factory);
	else if(typeof exports === 'object')
		exports["CancelableAPI"] = factory(require("axios"), require("p-cancelable"));
	else
		root["CancelableAPI"] = factory(root["axios"], root["p-cancelable"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_axios__, __WEBPACK_EXTERNAL_MODULE_p_cancelable__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/CancelableAPI.js":
/*!******************************!*\
  !*** ./lib/CancelableAPI.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var p_cancelable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! p-cancelable */ \"p-cancelable\");\n/* harmony import */ var p_cancelable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(p_cancelable__WEBPACK_IMPORTED_MODULE_1__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n/**\n * API通信をする\n * @param {string} apiRoot - APIルート\n * @param {Object} options - APIオプション\n * @param {string} options.method - 通信メソッド名\n * @param {string} options.endpoint - 通信先\n * @param {Object?} options.query - 通信につけるクエリ\n * @param {Object?} options.header - 通信につけるヘッダー\n * @param {number?} options.timeout - 通信のタイムアウト\n * @returns {PCancelable} - キャンセル可能なPromise\n */\n\nfunction _request(apiRoot, options) {\n  var method = options.method,\n      endpoint = options.endpoint,\n      _options$query = options.query,\n      query = _options$query === void 0 ? {} : _options$query,\n      _options$timeout = options.timeout,\n      timeout = _options$timeout === void 0 ? 15000 : _options$timeout;\n\n  var headers = _objectSpread({}, options.headers);\n\n  var url = \"\".concat(apiRoot).concat(endpoint); // axiosでキャンセルするためにsourceを作る\n\n  var source = axios__WEBPACK_IMPORTED_MODULE_0___default.a.CancelToken.source();\n  return new p_cancelable__WEBPACK_IMPORTED_MODULE_1___default.a(function (resolve, reject, onCancel) {\n    // リクエスト中をstoreに送る(pCancelableを渡したいためここで書く)\n    //store.commit(mutationTypes.REQUESTING, { method, url });\n    // requestのパラメータを生成する\n    var requestOptions = {\n      method: method,\n      url: url,\n      headers: headers,\n      timeout: timeout,\n      cancelToken: source.token\n    };\n    requestOptions[method === BaseAPI.GET ? 'params' : 'data'] = query; // リクエストの生成\n\n    axios__WEBPACK_IMPORTED_MODULE_0___default()(requestOptions).then(function (res) {\n      // リクエストに成功したことをstoreに送る\n      //store.commit(mutationTypes.SUCCESS, { method, url });\n      resolve(res);\n    }).catch(function (err) {\n      // キャンセルされた時のエラーは何もしない（onCancel側で処理を書く)\n      if (axios__WEBPACK_IMPORTED_MODULE_0___default.a.isCancel(err)) {\n        return;\n      } // 通信に失敗したことをstoreに送る\n      //store.commit(mutationTypes.FAILURE, { method, url });\n\n\n      reject({\n        isCancel: false,\n        err: err\n      });\n    }); // キャンセルを実行した時\n\n    onCancel(function () {\n      // 通信をキャンセルすることをstoreに送る\n      //store.commit(mutationTypes.CANCEL, { method, url });\n      // 通信をキャンセルする\n      source.cancel();\n      reject({\n        isCancel: true\n      });\n    });\n  });\n} // APIインスタンスリスト\n\n\nvar APIs = [];\n/**\n * API通信のベースとなるクラス\n */\n\nvar BaseAPI =\n/*#__PURE__*/\nfunction () {\n  // HTTPメソッド\n\n  /**\n   * コンストラクタ\n   * @param {string} apiRoot - APIルート\n   */\n  function BaseAPI() {\n    var apiRoot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n    _classCallCheck(this, BaseAPI);\n\n    // APIルート\n    this.apiRoot = apiRoot; // 通信中のcancelable promiseリスト\n\n    this.pCancelableList = []; // APIインスタンスリストに登録する\n\n    APIs.push(this);\n  }\n  /**\n   * APIルートの設定\n   * @param {string} apiRoot - APIルート\n   */\n\n\n  _createClass(BaseAPI, [{\n    key: \"setAPIRoot\",\n    value: function setAPIRoot(apiRoot) {\n      this.apiRoot = apiRoot;\n    }\n    /**\n     * API通信をする\n     * @param {Object} requestOptions - リクエストオプション\n     * @param {string} requestOptions.method - 通信メソッド名\n     * @param {string} requestOptions.endpoint - 通信先\n     * @param {Object?} requestOptions.query - 通信につけるクエリ\n     * @param {Object?} requestOptions.header - 通信につけるヘッダー\n     * @param {number?} requestOptions.timeout - 通信のタイムアウト\n     * @param {Object} additionalOptions - 追加オプション\n     * @param {boolean?} additionalOptions.ignoreErrorStatusCodes - エラー時にダイアログを開かないステータスコードリスト\n     * @returns {PCancelable} - キャンセル可能なPromise\n     */\n\n  }, {\n    key: \"request\",\n    value: function request(requestOptions) {\n      var _this = this;\n\n      var additionalOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n      // pCancelableリストに登録する\n      var pCancelable = _request(this.apiRoot, requestOptions);\n\n      this.pCancelableList.push(pCancelable);\n      pCancelable // デフォルトのエラーダイアログを表示する\n      .catch(function (_ref) {\n        var isCancel = _ref.isCancel,\n            err = _ref.err;\n\n        // キャンセルの場合は何もしない\n        if (isCancel) {\n          return;\n        }\n\n        var _additionalOptions$ig = additionalOptions.ignoreErrorStatusCodes,\n            ignoreErrorStatusCodes = _additionalOptions$ig === void 0 ? [] : _additionalOptions$ig;\n        var statusCode = err.response ? err.response.status : '--';\n        console.log(ignoreErrorStatusCodes, statusCode); // エラーで無視していいステータスコードでない場合はダイアログを開く\n        // if (ignoreErrorStatusCodes.indexOf(statusCode) === -1) {\n        //   Dialog.open({\n        //     title: `通信エラー (${statusCode})`,\n        //     okButtonText: '閉じる'\n        //   });\n        // }\n      }) // Promiseが終了した時にリストから外す\n      .finally(function () {\n        _this.pCancelableList = _this.pCancelableList.filter(function (promise) {\n          return promise !== pCancelable;\n        });\n      });\n      return pCancelable;\n    }\n    /**\n     * 一つのインスタンスで実行された通信中のものを全てキャンセルする\n     */\n\n  }, {\n    key: \"cancelAll\",\n    value: function cancelAll() {\n      this.pCancelableList.forEach(function (pCancelable) {\n        pCancelable.cancel();\n      }); // cancelableのリストはrequestメソッド側で外れるが、先に外してしまう\n\n      this.pCancelableList = [];\n    }\n    /**\n     * 静的キャンセルメソッドで、全ての通信をキャンセルする\n     */\n\n  }], [{\n    key: \"cancelAll\",\n    value: function cancelAll() {\n      APIs.forEach(function (API) {\n        API.cancelAll();\n      });\n    }\n  }]);\n\n  return BaseAPI;\n}();\n\nBaseAPI.GET = 'get';\nBaseAPI.POST = 'post';\nBaseAPI.PUT = 'put';\nBaseAPI.DELETE = 'delete';\n/* harmony default export */ __webpack_exports__[\"default\"] = (BaseAPI);\n\n//# sourceURL=webpack://CancelableAPI/./lib/CancelableAPI.js?");

/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./lib/CancelableAPI.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/onuma/Documents/testProject/cancelable-api/lib/CancelableAPI.js */\"./lib/CancelableAPI.js\");\n\n\n//# sourceURL=webpack://CancelableAPI/multi_./lib/CancelableAPI.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_axios__;\n\n//# sourceURL=webpack://CancelableAPI/external_%22axios%22?");

/***/ }),

/***/ "p-cancelable":
/*!*******************************!*\
  !*** external "p-cancelable" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_p_cancelable__;\n\n//# sourceURL=webpack://CancelableAPI/external_%22p-cancelable%22?");

/***/ })

/******/ });
});
