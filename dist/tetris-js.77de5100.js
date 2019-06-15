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
})({"index.ts":[function(require,module,exports) {
var FigureType;

(function (FigureType) {
  FigureType[FigureType["first"] = 1] = "first";
  FigureType[FigureType["second"] = 2] = "second";
  FigureType[FigureType["third"] = 3] = "third";
})(FigureType || (FigureType = {}));

var FigureMaker =
/** @class */
function () {
  function FigureMaker() {}

  FigureMaker.create = function (type) {
    var pattern = []; // Will be random value
    // Should be in empty space

    if (type === FigureType.first) {
      pattern[0] = [0, 1, 1, 0];
      pattern[1] = [1, 1, 1, 1];
    }

    if (type === FigureType.second) {
      pattern[0] = [1, 1, 1, 1];
      pattern[1] = [0, 0, 0, 1];
    }

    if (type === FigureType.third) {
      pattern[0] = [1, 1, 1, 1];
      pattern[1] = [1, 0, 0, 0];
    }

    return new Figure(pattern, [2, -2]);
  };

  return FigureMaker;
}();

var Figure =
/** @class */
function () {
  function Figure(pattern, position) {
    this.pattern = pattern;
    this.position = position;
    this.htmlNode = document.createElement('div');
  }

  Figure.prototype.getPattern = function () {
    return this.pattern;
  };

  Figure.prototype.getPosition = function () {
    return this.position;
  };

  Figure.prototype.updatePosition = function (diffX, diffY) {
    this.position[0] += diffX;
    this.position[1] += diffY;
  };

  return Figure;
}();

var Layout =
/** @class */
function () {
  function Layout(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.grid = [];
    this.node = document.getElementById('js-tetris');
    this.rect = this.node.getBoundingClientRect(); // size of 1 cell = 20px

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        if (!this.grid[i]) {
          this.grid[i] = [];
        }

        this.grid[i][j] = 0;
      }
    }
  }

  Layout.prototype.fillLayoutOne = function (pattern, start) {
    var _this = this;

    var x = start[0],
        y = start[1];
    pattern.forEach(function (row, indexRow) {
      row.forEach(function (col, indexCol) {
        _this.grid[y + indexRow + 1][x + indexCol] = col;
      });
    });
    return true;
  };

  Layout.prototype.getNode = function () {
    return this.node;
  };

  Layout.prototype.renderFigure = function (figure) {
    var currPos = figure.getPosition();
    var pattern = figure.getPattern();
    var x = currPos[0],
        y = currPos[1];
    var html = "\n      <div class='figure' style='position: absolute;      \n      left: " + x * 20 + "px;\n      top: " + y * 20 + "px'>\n        " + pattern.reduce(function (acc, nextRow) {
      return acc + ("\n            <div class='figure__row'>" + nextRow.reduce(function (acc, next) {
        return acc + ("<div class=\"figure__point " + (next ? 'active' : '') + "\">" + next + "</div>");
      }, '') + "</div>\n          ");
    }, '') + "\n      </div>\n    ";
    figure.htmlNode.innerHTML = html;
    this.node.appendChild(figure.htmlNode);
  };

  return Layout;
}();

var config = {
  rows: 8,
  columns: 20
};

var Compositor =
/** @class */
function () {
  function Compositor(layout, figureCreator) {
    var _this = this;

    this.figureCreator = figureCreator;
    this.layout = layout;
    this.currentFigure = null;
    this.figureStack = [];
    this.runStep();
    this.interval = setInterval(function () {
      _this.runStep();
    }, 200);
  }

  Compositor.prototype.onPressLeft = function (e) {};

  Compositor.prototype.onPressRight = function (e) {};

  Compositor.prototype.keyListeners = function () {
    var _this = this;

    document.addEventListener('keypress', function (e) {
      switch (e.keyCode) {
        case 39:
          _this.onPressRight(e);

          break;

        case 37:
          _this.onPressRight(e);

          break;
      }
    });
  };

  Compositor.prototype.generateFigure = function () {
    var figure = this.figureCreator.create(!this.figureStack.length ? FigureType.first : FigureType.second);
    this.figureStack.push(figure);
    return figure;
  };

  Compositor.prototype.canChangePosition = function (diffX, diffY) {
    var _a;

    var currPosFigure = this.currentFigure.getPosition();
    var figureX = currPosFigure[0];
    var figureY = currPosFigure[1];
    var patternFigure = this.currentFigure.getPattern();
    var figureWidth = patternFigure[0].length;
    var figureHeight = patternFigure.length; // debugger

    if (figureY + figureHeight >= config.rows || figureX + figureWidth >= config.columns || figureX + diffX < 0) {
      return false;
    }

    var nextStepInterval = [figureX, figureX + figureWidth];

    var layoutInterval = (_a = this.layout.grid[figureY + diffY + figureHeight]).slice.apply(_a, nextStepInterval);

    return !layoutInterval.some(function (layoutPoint, index) {
      return patternFigure[figureHeight - 1][index] + layoutPoint > 1;
    });
  };

  Compositor.prototype.updateLayout = function () {
    this.layout.renderFigure(this.currentFigure);
  };

  Compositor.prototype.runStep = function () {
    // TODO: Refactor it
    if (!this.currentFigure) {
      this.currentFigure = this.generateFigure();

      for (var i = 0; i < 2; i++) {
        if (this.canChangePosition(0, 1)) {
          this.currentFigure.updatePosition(0, 1);
        } else {
          clearInterval(this.interval);
          alert('end game');
          return;
        }
      }

      this.updateLayout();
    } else if (this.canChangePosition(0, 1)) {
      this.currentFigure.updatePosition(0, 1);
      this.updateLayout();
    } else {
      var _a = this.currentFigure.getPosition(),
          x = _a[0],
          y = _a[1];

      this.layout.fillLayoutOne(this.currentFigure.getPattern(), [x, y]);
      this.currentFigure = null;
    }
  };

  return Compositor;
}();

var tetris = new Compositor(new Layout(40, 20), FigureMaker);
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57607" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/tetris-js.77de5100.js.map