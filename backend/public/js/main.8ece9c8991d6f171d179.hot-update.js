webpackHotUpdate("main",{

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.css */ \"./src/app.css\");\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_css__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar App =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(App, _Component);\n\n  function App(props) {\n    var _this;\n\n    _classCallCheck(this, App);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));\n    _this.state = {\n      assets: null\n    };\n\n    _this.handleFile = function (e) {\n      console.log(\"hihihi\");\n      console.log(e.target.files);\n      var shop = localStorage.getItem('shop');\n\n      if (shop) {\n        var regex = /image\\/*/;\n        fetch(\"/images?shop=\".concat(shop)).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          data = data.assets.filter(function (val) {\n            return regex.test(val.content_type);\n          });\n\n          _this.setState({\n            assets: data\n          });\n        });\n      }\n    };\n\n    return _this;\n  }\n\n  _createClass(App, [{\n    key: \"renderImage\",\n    value: function renderImage() {\n      var row = [];\n      this.state.assets.forEach(function (image) {\n        row.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"image\", {\n          src: image.public_url\n        }));\n      });\n      return row;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"popup\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, \"Select Image \", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"close\"\n      }, \"\\xD7\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"p-8\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"title secondary-color p-8\"\n      }, \"My Images \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"right\"\n      }, \"Upload\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"secondary-color p-8\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"text\",\n        placeholder: \"Search...\"\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"right\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        htmlFor: \"sorting\"\n      }, \"Sorting \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n        name: \"sorting\",\n        id: \"sorting\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"Newest\"\n      }, \"Newest\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"Oldest\"\n      }, \"Oldest\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"View options \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"fas fa-th-large\"\n      }), \"\\xA0\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"fas fa-th-list\"\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"drop-area\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"file\",\n        id: \"fileElement\",\n        accept: \"image/*\",\n        multiple: true,\n        onChange: this.handleFile\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        id: \"upload\",\n        className: \"button center\",\n        htmlFor: \"fileElement\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"fas fa-upload\"\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), \"Drag and Drop or click here to upload\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"secondary-color p-8\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"right\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", null, \"Select\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", null, \"Cancel\")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, this.renderImage));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/App.jsx?");

/***/ })

})