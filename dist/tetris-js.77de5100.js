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
})({"classes/Point.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Figure_1 = require("./Figure/Figure");

var Point =
/** @class */
function () {
  function Point(fill, color) {
    if (fill === void 0) {
      fill = false;
    }

    if (color === void 0) {
      color = Figure_1.Colors.transparent;
    }

    this.color = color;
    this.fill = fill;
  }

  Point.prototype.isFill = function () {
    return this.fill;
  };

  Point.prototype.getColor = function () {
    return this.color;
  };

  Point.prototype.setColor = function (color) {
    this.color = color;
  };

  Point.prototype.setValue = function (value) {
    this.fill = value;
  };

  return Point;
}();

exports.Point = Point;
},{"./Figure/Figure":"classes/Figure/Figure.ts"}],"classes/Figure/Figure.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Point_1 = require("../Point");

var FigureType;

(function (FigureType) {
  FigureType[FigureType["first"] = 1] = "first";
  FigureType[FigureType["second"] = 2] = "second";
  FigureType[FigureType["third"] = 3] = "third";
  FigureType[FigureType["forth"] = 4] = "forth";
})(FigureType = exports.FigureType || (exports.FigureType = {}));

var Colors;

(function (Colors) {
  Colors["green"] = "green";
  Colors["blue"] = "blue";
  Colors["black"] = "black";
  Colors["violet"] = "violet";
  Colors["transparent"] = "transparent";
  Colors["yellow"] = "yellow";
})(Colors = exports.Colors || (exports.Colors = {}));

var Figure =
/** @class */
function () {
  function Figure(pattern, position, color) {
    if (position === void 0) {
      position = [0, 0];
    }

    this.pattern = pattern;
    this.position = position;
    this.color = color || Colors.violet;
  }

  Figure.prototype.setPosition = function (pos) {
    this.position = pos;
  };

  Figure.prototype.getSize = function () {
    return {
      height: this.pattern.length,
      width: this.pattern[0].length
    };
  };

  Figure.prototype.getFigurePoints = function () {
    var _this = this;

    var coordPoint = {};
    this.pattern.forEach(function (ptrnRow, y) {
      ptrnRow.forEach(function (value, x) {
        coordPoint[x + _this.position[0] + "," + (y + _this.position[1])] = new Point_1.Point(!!value, value ? _this.color : Colors.transparent);
      });
    });
    return coordPoint;
  };

  Figure.prototype.isFillPoint = function (pos) {
    var x = pos[0],
        y = pos[1];
    return !!this.pattern[y][x];
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

exports.default = Figure;
},{"../Point":"classes/Point.ts"}],"classes/RendererCanvas.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Figure_1 = require("./Figure/Figure");

var RendererCanvas =
/** @class */
function () {
  function RendererCanvas(width, height, square) {
    if (square === void 0) {
      square = 20;
    }

    this.node = document.getElementById('tetris-js');
    this.ctx = this.node.getContext('2d');
    this.columns = width / square + 1;
    this.rows = height / square + 1;
    this.width = width + 1;
    this.height = height + 1;
    this.node.width = this.width;
    this.node.height = this.height;
    this.square = square;
  }

  RendererCanvas.prototype.renderGrid = function () {
    this.ctx.lineWidth = 1;

    for (var i = 0; i <= this.columns; i++) {
      this.ctx.moveTo(i * this.square + 0.5, 0);
      this.ctx.lineTo(i * this.square + 0.5, this.height);
      this.ctx.stroke();
    }

    for (var j = 0; j <= this.rows; j++) {
      this.ctx.moveTo(0, j * this.square + 0.5);
      this.ctx.lineTo(this.width, j * this.square + 0.5);
      this.ctx.stroke();
    }
  };

  RendererCanvas.prototype.renderPoints = function (points) {
    var _this = this;

    var width = this.width;
    var height = this.height;
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.beginPath();
    this.renderGrid();
    Object.keys(points).forEach(function (key) {
      var point = points[key];

      var _a = key.split(',').map(Number),
          x = _a[0],
          y = _a[1];

      _this.ctx.fillStyle = Figure_1.Colors.transparent;

      if (point.value === 1) {
        _this.ctx.fillStyle = point.color;

        _this.ctx.rect( // TODO: Create util for thar
        x * _this.square + 0.5, y * _this.square + 0.5, _this.square, _this.square);

        _this.ctx.fill();

        _this.ctx.strokeStyle = Figure_1.Colors.violet;

        _this.ctx.stroke();
      }

      _this.ctx.closePath();
    });
  };

  return RendererCanvas;
}();

exports.default = RendererCanvas;
},{"./Figure/Figure":"classes/Figure/Figure.ts"}],"classes/FigureMaker.ts":[function(require,module,exports) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Figure_1 = __importStar(require("./Figure/Figure"));

exports.firstPattern = [[0, 1, 1, 0], [1, 1, 1, 1]];
exports.secondPattern = [[1, 1, 1, 1], [0, 0, 0, 1]];
exports.thirdPattern = [[1, 1, 1, 1], [1, 0, 0, 0]];
exports.forthPattern = [[1, 1, 1, 1]];

var FigureMaker =
/** @class */
function () {
  function FigureMaker() {}

  FigureMaker.create = function (type, pos) {
    var pattern = [];
    var color = Figure_1.Colors.violet;

    if (type === Figure_1.FigureType.first) {
      pattern = exports.firstPattern;
      color = Figure_1.Colors.violet;
    }

    if (type === Figure_1.FigureType.second) {
      pattern = exports.secondPattern;
      color = Figure_1.Colors.green;
    }

    if (type === Figure_1.FigureType.third) {
      pattern = exports.thirdPattern;
      color = Figure_1.Colors.blue;
    }

    if (type === Figure_1.FigureType.forth) {
      pattern = exports.forthPattern;
      color = Figure_1.Colors.yellow;
    }

    return new Figure_1.default(pattern, pos, color);
  };

  return FigureMaker;
}();

exports.default = FigureMaker;
},{"./Figure/Figure":"classes/Figure/Figure.ts"}],"classes/PointsStack/PointsStack.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Point_1 = require("../Point");

exports.sum = function (a, b) {
  return a + b;
};

var PointsStack =
/** @class */
function () {
  function PointsStack(columns, rows, pattern) {
    this.rows = rows;
    this.columns = columns;
    this.points = [];
    this.create(pattern);
  }

  PointsStack.prototype.getPoints = function () {
    return this.points;
  };

  PointsStack.prototype.create = function (pattern) {
    for (var i = 0; i < this.rows; i++) {
      if (!this.points[i]) {
        this.points[i] = [];
      }

      for (var j = 0; j < this.columns; j++) {
        var val = pattern ? pattern[i][j] : 0;
        this.points[i][j] = new Point_1.Point(!!val);
      }
    }
  }; // private isEqual = (row: number) => {
  //   return this.points[row].every(p => p.isFill())
  // }
  // findEqualRows() {
  //   return this.points.reduce(
  //     (acc, next, index) => {
  //       const isEqual = this.isEqual(index)
  //       if (isEqual) {
  //         acc.push(index)
  //       }
  //       return acc
  //     },
  //     [] as number[]
  //   )
  // }


  PointsStack.prototype.shrink = function (numRow) {
    this.points.splice(numRow, 1);
    this.points.unshift(this.points[0].map(function () {
      return new Point_1.Point(false);
    }));
  };

  PointsStack.prototype.getPoint = function (pos) {
    var x = pos[0],
        y = pos[1];
    var match = this.points[y][x];

    if (!this.points[y][x]) {
      throw new Error('Cant add point');
    }

    return match;
  };

  PointsStack.prototype.getSize = function () {
    return {
      columns: this.columns,
      rows: this.rows
    };
  };

  PointsStack.prototype.getRow = function (row) {
    if (!this.points[row]) {
      throw new Error('Row is not exists');
    }

    return this.points[row];
  };

  PointsStack.prototype.addPoints = function (points) {
    var _this = this;

    Object.keys(points).forEach(function (key) {
      var _a = key.split(','),
          x = _a[0],
          y = _a[1];

      var match = null;

      try {
        match = _this.points[y][x];
      } catch (_b) {
        throw new Error('Coordinate is not exists');
      }

      _this.points[y][x] = points[key];
    });
  };

  return PointsStack;
}();

exports.default = PointsStack;
},{"../Point":"classes/Point.ts"}],"classes/Tetris.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var RendererCanvas_1 = __importDefault(require("./RendererCanvas"));

var FigureMaker_1 = __importDefault(require("./FigureMaker"));

var Figure_1 = require("./Figure/Figure");

var PointsStack_1 = __importDefault(require("./PointsStack/PointsStack"));

var Tetris =
/** @class */
function () {
  function Tetris() {
    this.pointsStack = new PointsStack_1.default(10, 20);

    var _a = this.pointsStack.getSize(),
        columns = _a.columns,
        rows = _a.rows;

    this.renderer = new RendererCanvas_1.default(columns * 20, rows * 20);
    this.figureStack = [];
    this.renderer.renderGrid();
  }

  Tetris.prototype.createFigure = function () {
    return FigureMaker_1.default.create(Figure_1.FigureType.first);
  };

  return Tetris;
}();

exports.Tetris = Tetris;
},{"./RendererCanvas":"classes/RendererCanvas.ts","./FigureMaker":"classes/FigureMaker.ts","./Figure/Figure":"classes/Figure/Figure.ts","./PointsStack/PointsStack":"classes/PointsStack/PointsStack.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Tetris_1 = require("./classes/Tetris");

var tetris = new Tetris_1.Tetris();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55504" + '/');

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