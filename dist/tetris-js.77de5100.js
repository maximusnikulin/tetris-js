// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"classes/RendererCanvas.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var RendererCanvas =
/** @class */
function () {
  function RendererCanvas() {
    this.node = document.getElementById('tetris-js');
    this.ctx = this.node.getContext('2d');
  }

  RendererCanvas.prototype.renderGrid = function () {
    var width = 20;
    var height = 20;
    this.node.width = 201;
    this.node.height = 401;
    this.ctx.lineWidth = 1;

    for (var i = 0; i <= 11; i++) {
      this.ctx.moveTo(i * 20 + 0.5, 0);
      this.ctx.lineTo(i * 20 + 0.5, 400);
      this.ctx.stroke();
    }

    for (var j = 0; j <= 21; j++) {
      this.ctx.moveTo(0, j * 20 + 0.5);
      this.ctx.lineTo(200, j * 20 + 0.5);
      this.ctx.stroke();
    }
  };

  RendererCanvas.prototype.render = function (layout) {};

  return RendererCanvas;
}();

exports["default"] = RendererCanvas;
},{}],"classes/Figure/Figure.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var FigureType;

(function (FigureType) {
  FigureType[FigureType["first"] = 1] = "first";
  FigureType[FigureType["second"] = 2] = "second";
  FigureType[FigureType["third"] = 3] = "third";
  FigureType[FigureType["forth"] = 4] = "forth";
})(FigureType = exports.FigureType || (exports.FigureType = {}));

var Colors;

(function (Colors) {
  Colors[Colors["green"] = 1] = "green";
  Colors[Colors["blue"] = 2] = "blue";
  Colors[Colors["black"] = 3] = "black";
  Colors[Colors["violet"] = 4] = "violet";
  Colors[Colors["transparent"] = 5] = "transparent";
})(Colors = exports.Colors || (exports.Colors = {}));

var Figure =
/** @class */
function () {
  function Figure(pattern, position, color) {
    this.pattern = pattern;
    this.position = position;
    this.color = color || Colors.black;
  }

  Figure.prototype.getSize = function () {
    return {
      height: this.pattern.length,
      width: this.pattern[0].length
    };
  };

  Figure.prototype.getPatternValue = function (pos) {
    var x = pos[0],
        y = pos[1];
    return this.pattern[y][x];
  };

  Figure.prototype.getPattern = function () {
    return this.pattern;
  };

  Figure.prototype.getPosition = function () {
    return this.position;
  };

  Figure.prototype.getColor = function () {
    return this.color;
  };

  return Figure;
}();

exports["default"] = Figure;
},{}],"classes/Point.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Figure_1 = require("./Figure/Figure");

var Point =
/** @class */
function () {
  function Point(x, y, value, color) {
    if (color === void 0) {
      color = Figure_1.Colors.transparent;
    }

    this.x = x;
    this.y = y;
    this.color = color;

    if (typeof value !== 'undefined') {
      this.value = value;
    }
  }

  Point.prototype.setColor = function (color) {
    this.color = color;
  };

  Point.prototype.setValue = function (value) {
    this.value = value;
  };

  return Point;
}();

exports.Point = Point;
},{"./Figure/Figure":"classes/Figure/Figure.ts"}],"classes/Layout/Layout.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Point_1 = require("../Point");

exports.sum = function (a, b) {
  return a + b;
};

var Layout =
/** @class */
function () {
  function Layout(rows, columns, defaultValue) {
    if (defaultValue === void 0) {
      defaultValue = 0;
    }

    this.rows = rows;
    this.columns = columns;
    this.grid = [[]];
    this.create(defaultValue);
  }

  Layout.prototype.create = function (defaultValue) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        if (!this.grid[i]) {
          this.grid[i] = [];
        }

        this.grid[i][j] = new Point_1.Point(j, i, defaultValue);
      }
    }
  };

  Layout.prototype.getPoint = function (pos) {
    var x = pos[0],
        y = pos[1];
    return this.grid[y][x];
  };

  Layout.prototype.addFigure = function (figure, pos) {
    var _a = figure.getSize(),
        height = _a.height,
        width = _a.width;

    var x = pos[0],
        y = pos[1];

    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        var patternValue = figure.getPatternValue([j, i]);
        debugger;
        this.grid[y + i][x + j].setValue(patternValue);
      }
    }
  };

  Layout.prototype.getSize = function () {
    return {
      width: this.grid[0].length,
      height: this.grid.length
    };
  };

  Layout.prototype.canPosFigure = function (figure, pos) {
    var _a = figure.getSize(),
        height = _a.height,
        width = _a.width;

    var pattern = figure.getPattern();
    var x = pos[0],
        y = pos[1];
    var res = true;

    out: for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        if (this.getPoint([j + x, i + y]).value + figure.getPatternValue([j, i]) > 1) {
          res = false;
          break out;
        }
      }
    }

    return res;
  };

  return Layout;
}();

exports["default"] = Layout;
},{"../Point":"classes/Point.ts"}],"classes/FigureMaker.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

exports.__esModule = true;

var Figure_1 = __importStar(require("./Figure/Figure"));

var FigureMaker =
/** @class */
function () {
  function FigureMaker() {}

  FigureMaker.create = function (type, pos) {
    var pattern = []; // Will be random value
    // Should be in empty space

    if (type === Figure_1.FigureType.first) {
      pattern[0] = [0, 1, 1, 0];
      pattern[1] = [1, 1, 1, 1];
    }

    if (type === Figure_1.FigureType.second) {
      pattern[0] = [1, 1, 1, 1];
      pattern[1] = [0, 0, 0, 1];
    }

    if (type === Figure_1.FigureType.third) {
      pattern[0] = [1, 1, 1, 1];
      pattern[1] = [1, 0, 0, 0];
    }

    if (type === Figure_1.FigureType.forth) {
      pattern[0] = [1, 1, 1, 1];
    }

    return new Figure_1["default"](pattern, pos);
  };

  return FigureMaker;
}();

exports["default"] = FigureMaker;
},{"./Figure/Figure":"classes/Figure/Figure.ts"}],"classes/Tetris.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var RendererCanvas_1 = __importDefault(require("./RendererCanvas"));

var Layout_1 = __importDefault(require("./Layout/Layout"));

var FigureMaker_1 = __importDefault(require("./FigureMaker"));

var Figure_1 = require("./Figure/Figure");

var Tetris =
/** @class */
function () {
  function Tetris() {
    this.layout = new Layout_1["default"](40, 20);
    this.renderer = new RendererCanvas_1["default"]();
    this.figureStack = [];
    this.renderer.renderGrid();
  }

  Tetris.prototype.createFigure = function () {
    return FigureMaker_1["default"].create(Figure_1.FigureType.first);
  };

  Tetris.prototype.posFigure = function (figure) {
    var initPos = [0, 2];

    if (this.layout.canPosFigure(figure, initPos)) {
      this.layout.addFigure(figure, initPos);
    }
  };

  Tetris.prototype.runStep = function () {
    var figure = this.createFigure();
    this.figureStack.push(figure);
    this.posFigure(figure);
  };

  return Tetris;
}();

exports.Tetris = Tetris;
},{"./RendererCanvas":"classes/RendererCanvas.ts","./Layout/Layout":"classes/Layout/Layout.ts","./FigureMaker":"classes/FigureMaker.ts","./Figure/Figure":"classes/Figure/Figure.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Tetris_1 = require("./classes/Tetris");

var tetris = new Tetris_1.Tetris();
tetris.runStep();
},{"./classes/Tetris":"classes/Tetris.ts"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49423" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/tetris-js.77de5100.js.map