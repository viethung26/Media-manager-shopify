webpackHotUpdate("main",{

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.css */ \"./src/app.css\");\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_app_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/image */ \"./src/components/image.jsx\");\n/* harmony import */ var _components_uploadingImage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/uploadingImage */ \"./src/components/uploadingImage.jsx\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar TEST_DATA = '[{\"key\":\"assets/27434.jpg\",\"public_url\":\"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/27434.jpg?13180284403782496566\",\"created_at\":\"2019-02-15T03:23:41-05:00\",\"updated_at\":\"2019-02-15T03:23:41-05:00\",\"content_type\":\"image/jpeg\",\"size\":311069,\"theme_id\":70634537024},{\"key\":\"assets/collection-view-grid.svg\",\"public_url\":\"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/collection-view-grid.svg?13180284403782496566\",\"created_at\":\"2019-02-14T08:57:39-05:00\",\"updated_at\":\"2019-02-14T08:57:39-05:00\",\"content_type\":\"image/svg+xml\",\"size\":906,\"theme_id\":70634537024},{\"key\":\"assets/collection-view-list.svg\",\"public_url\":\"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/collection-view-list.svg?13180284403782496566\",\"created_at\":\"2019-02-14T08:57:39-05:00\",\"updated_at\":\"2019-02-14T08:57:39-05:00\",\"content_type\":\"image/svg+xml\",\"size\":1166,\"theme_id\":70634537024},{\"key\":\"assets/example.jpg\",\"public_url\":\"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/example.jpg?13180284403782496566\",\"created_at\":\"2019-02-15T22:43:56-05:00\",\"updated_at\":\"2019-02-15T22:43:56-05:00\",\"content_type\":\"image/jpeg\",\"size\":80206,\"theme_id\":70634537024},{\"key\":\"assets/ico-select.svg\",\"public_url\":\"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/ico-select.svg?13180284403782496566\",\"created_at\":\"2019-02-14T08:57:44-05:00\",\"updated_at\":\"2019-02-14T08:57:44-05:00\",\"content_type\":\"image/svg+xml\",\"size\":613,\"theme_id\":70634537024},{\"key\":\"assets/icons.svg\",\"public_url\":\"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/icons.svg?13180284403782496566\",\"created_at\":\"2019-02-14T08:57:39-05:00\",\"updated_at\":\"2019-02-14T08:57:39-05:00\",\"content_type\":\"image/svg+xml\",\"size\":14669,\"theme_id\":70634537024},{\"key\":\"assets/password-page-background.jpg\",\"public_url\":\"https://cdn.shopify.com/s/files/1/0171/4431/5968/t/3/assets/password-page-background.jpg?13180284403782496566\",\"created_at\":\"2019-02-14T08:57:40-05:00\",\"updated_at\":\"2019-02-14T08:57:40-05:00\",\"content_type\":\"image/jpeg\",\"size\":76069,\"theme_id\":70634537024}]';\n\nvar App =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(App, _Component);\n\n  function App(props) {\n    var _this;\n\n    _classCallCheck(this, App);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));\n    _this.state = {\n      assets: null,\n      selects: [],\n      uploads: [],\n      views: 'grid',\n      sort: 'newest',\n      search: ''\n    };\n\n    _this.previewFile = function (file) {\n      var reader = new FileReader();\n      reader.readAsDataURL(file);\n\n      reader.onloadend = function () {\n        var img = {\n          name: file.name,\n          percentage: 0,\n          isSelected: false\n        };\n        img.src = reader.result;\n        var uploads = _this.state.uploads;\n        uploads.push(img);\n\n        _this.setState({\n          uploads: uploads\n        });\n      };\n    };\n\n    _this.handleProgress = function (name, percentage) {\n      console.log(name);\n      var uploads = _this.state.uploads;\n      var index = uploads.findIndex(function (file) {\n        return file.name === name;\n      });\n      uploads[index].percentage = percentage;\n\n      _this.setState({\n        uploads: uploads\n      });\n    };\n\n    _this.handleFile = function (e) {\n      var fileList = e.target.files;\n\n      for (var i = 0; i < fileList.length; i++) {\n        _this.uploadFile(fileList[i]);\n      }\n    };\n\n    _this.handleOver = function (e) {\n      e.preventDefault(); // console.log(this)\n      // this.setState({dragover: true})\n    };\n\n    _this.handleDrop = function (e) {\n      e.preventDefault();\n      var data = e.dataTransfer;\n\n      var files = _toConsumableArray(data.files);\n\n      files.forEach(function (file) {\n        return _this.uploadFile(file);\n      });\n    };\n\n    _this.uploadFile = function (file) {\n      console.log(file);\n\n      _this.previewFile(file);\n\n      var shop = localStorage.getItem('shop');\n      var url = '/images?shop=' + shop;\n      var formData = new FormData();\n      formData.append('file', file);\n      var xhr = new XMLHttpRequest();\n      xhr.open('POST', url, true);\n      xhr.upload.addEventListener(\"progress\", function (e) {\n        if (e.lengthComputable) {\n          var percentage = Math.round(e.loaded * 100 / e.total);\n\n          _this.handleProgress(file.name, percentage);\n        }\n      });\n\n      xhr.onload = function () {\n        if (xhr.response) {\n          var newImage = JSON.parse(xhr.response);\n          newImage.isNew = true;\n          var _this$state = _this.state,\n              assets = _this$state.assets,\n              uploads = _this$state.uploads;\n          var index = uploads.findIndex(function (upload) {\n            return upload.name === file.name;\n          });\n          if (index !== -1) uploads.splice(index, 1);\n          assets.push(newImage);\n\n          _this.setState({\n            assets: assets,\n            uploads: uploads\n          });\n        }\n      };\n\n      xhr.onerror = function () {\n        console.error(xhr.statusText);\n      };\n\n      xhr.send(formData);\n    };\n\n    _this.handleSelect = function (key) {\n      console.log(key);\n      var _this$state2 = _this.state,\n          assets = _this$state2.assets,\n          selects = _this$state2.selects;\n      var index = assets.findIndex(function (file) {\n        return file.key === key;\n      });\n      assets[index].isSelected = !assets[index].isSelected;\n\n      if (selects.indexOf(key) !== -1) {\n        selects.splice(selects.indexOf(key), 1);\n      } else selects.push(key);\n\n      _this.setState({\n        assets: assets,\n        selects: selects\n      });\n    };\n\n    _this.handleDelete = function (key) {\n      var shop = localStorage.getItem('shop');\n      var url = \"/images?shop=\".concat(shop, \"&key=\").concat(key);\n      fetch(url, {\n        method: 'DELETE'\n      }).then(function (res) {\n        return res.json();\n      }).then(function (res) {\n        if (res) {\n          var assets = _this.state.assets;\n          var index = assets.findIndex(function (file) {\n            return file.key === key;\n          });\n          if (index !== -1) assets.splice(index, 1);\n\n          _this.setState(assets);\n        }\n      }).catch(function (e) {\n        return console.log(e);\n      });\n    };\n\n    _this.deleteFiles = function () {\n      var selects = _this.state.selects;\n\n      while (selects.length > 0) {\n        var key = selects.pop();\n\n        _this.handleDelete(key);\n      }\n\n      _this.setState({\n        selects: selects\n      });\n    };\n\n    _this.handleSort = function (value) {\n      var assets = _this.state.assets;\n      assets.sort(function (a, b) {\n        var dateA = new Date(a.updated_at).getTime();\n        var dateB = new Date(b.updated_at).getTime();\n        console.log(dateA, dateB);\n        return value === 'oldest' ? dateA - dateB : dateB - dateA;\n      });\n\n      _this.setState({\n        sort: value,\n        assets: assets\n      });\n    };\n\n    return _this;\n  }\n\n  _createClass(App, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var _this2 = this;\n\n      var shop = localStorage.getItem('shop');\n\n      if (shop) {\n        var regex = /image\\/*/;\n        fetch(\"/images?shop=\".concat(shop)).then(function (response) {\n          return response.json();\n        }).then(function (data) {\n          data = data.assets.filter(function (val) {\n            return regex.test(val.content_type);\n          });\n          console.log(JSON.stringify(data));\n\n          _this2.setState({\n            assets: data\n          });\n        });\n      }\n    }\n  }, {\n    key: \"renderImage\",\n    value: function renderImage() {\n      var _this3 = this;\n\n      var rows = [];\n      var _this$state3 = this.state,\n          assets = _this$state3.assets,\n          views = _this$state3.views,\n          search = _this$state3.search;\n      if (assets) assets.forEach(function (image, index) {\n        if (image.key.substr(7).indexOf(search) !== -1) rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n          key: image.key,\n          views: views,\n          image: image,\n          delete: _this3.handleDelete,\n          select: _this3.handleSelect\n        }));\n      });\n      return rows;\n    }\n  }, {\n    key: \"renderUploading\",\n    value: function renderUploading() {\n      var rows = [];\n      var uploads = this.state.uploads;\n      if (uploads) uploads.forEach(function (image, index) {\n        rows.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_uploadingImage__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n          key: index,\n          src: image.src,\n          title: image.name,\n          value: image.percentage\n        }));\n      });\n      return rows;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this4 = this;\n\n      var _this$state4 = this.state,\n          selects = _this$state4.selects,\n          assets = _this$state4.assets,\n          search = _this$state4.search,\n          sort = _this$state4.sort;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"popup\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h3\", null, \"Select Image \", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"close\"\n      }, \"\\xD7\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"p-8\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n        className: \"title secondary-color p-8\"\n      }, \"My Images \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        id: \"upload2\",\n        className: \"button right\",\n        htmlFor: \"fileElement\"\n      }, \"Upload\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"secondary-color p-8\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        className: \"m-4\",\n        type: \"text\",\n        placeholder: \"Search...\",\n        value: search,\n        onChange: function onChange(e) {\n          return _this4.setState({\n            search: e.target.value\n          });\n        }\n      }), selects.length > 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"m-4 delete-files\",\n        onClick: function onClick() {\n          return _this4.deleteFiles();\n        }\n      }, \"Delete\") : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"right p-4\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        htmlFor: \"sorting\"\n      }, \"Sorting \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n        name: \"sorting\",\n        id: \"sorting\",\n        value: sort,\n        onChange: function onChange(e) {\n          return _this4.handleSort(e.target.value);\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"newest\"\n      }, \"Newest\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"oldest\"\n      }, \"Oldest\")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", null, \"View options \"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"fas fa-th-large\",\n        onClick: function onClick() {\n          return _this4.setState({\n            views: 'grid'\n          });\n        }\n      }), \"\\xA0\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"fas fa-th-list\",\n        onClick: function onClick() {\n          return _this4.setState({\n            views: 'list'\n          });\n        }\n      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"file\",\n        id: \"fileElement\",\n        accept: \"image/*\",\n        multiple: true,\n        onChange: this.handleFile\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"drop-area\",\n        onDragOver: this.handleOver,\n        onDrop: this.handleDrop,\n        onDragLeave: function onDragLeave() {\n          return _this4.setState({\n            isDragEnter: false\n          });\n        },\n        onDragEnter: function onDragEnter() {\n          return _this4.setState({\n            isDragEnter: true\n          });\n        }\n      }, this.state.isDragEnter ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"drag-over p-8\"\n      }, \"Drop files to upload\") : null, this.state.assets ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        id: \"upload\",\n        className: \"center\",\n        htmlFor: \"fileElement\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: \"fas fa-upload\"\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"br\", null), \"Drag and Drop or click here to upload\"), this.renderImage(), this.renderUploading()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"options secondary-color p-8\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"right\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        disabled: selects.length !== 1 ? true : false\n      }, \"Select\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", null, \"Cancel\")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/App.jsx?");

/***/ })

})