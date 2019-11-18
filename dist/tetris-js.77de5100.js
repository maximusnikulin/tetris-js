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
    return this;
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

var Colors;

(function (Colors) {
  Colors["green"] = "green";
  Colors["blue"] = "blue";
  Colors["aqua"] = "aqua";
  Colors["violet"] = "violet";
  Colors["yellow"] = "yellow";
  Colors["transparent"] = "transparent";
})(Colors = exports.Colors || (exports.Colors = {}));

var Figure =
/** @class */
function () {
  function Figure(state, pos, color) {
    if (pos === void 0) {
      pos = [0, 0];
    }

    this.state = state;
    this.position = pos;
    this.color = color;
  }

  Figure.prototype.setPosition = function (pos) {
    this.position = pos;
  };

  Figure.prototype.rotateFigure = function () {};

  Figure.prototype.getSize = function () {
    return {
      height: this.state.getPattern().length,
      width: this.state.getPattern()[0].length
    };
  };

  Figure.prototype.getMapPoints = function () {
    var _this = this;

    var coordPoint = {};
    var pattern = this.state.getPattern();
    debugger;
    pattern.forEach(function (ptrnRow, y) {
      ptrnRow.forEach(function (value, x) {
        if (!value) {
          return;
        }

        coordPoint[x + _this.position[0] + "," + (y + _this.position[1])] = new Point_1.Point(!!value, value ? _this.color : Colors.transparent);
      });
    });
    return coordPoint;
  };

  Figure.prototype.isFillPoint = function (pos) {
    var x = pos[0],
        y = pos[1];
    return !!this.state.getPattern()[y][x];
  };

  Figure.prototype.getPattern = function () {
    return this.state.getPattern();
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
},{"../Point":"classes/Point.ts"}],"classes/Figure/FigureTypes.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var T = [[[0, 1, 0], [1, 1, 1]], [[1, 0], [1, 1], [1, 0]], [[1, 1, 1], [0, 1, 0]], [[0, 1], [1, 1], [0, 1]]];
var S = [[[0, 1, 1], [1, 1, 0]], [[1, 0], [1, 1], [0, 1]]];
var L = [[[1, 0], [1, 0], [1, 1]], [[0, 0, 1], [1, 1, 1]], [[1, 1], [0, 1], [0, 1]], [[1, 1, 1], [1, 0, 0]]];
var I = [[[1, 1, 1, 1]], [[1], [1], [1], [1]]];
var O = [[[1, 1], [1, 1]]];
var FigureTypes;

(function (FigureTypes) {
  FigureTypes["O"] = "O";
  FigureTypes["I"] = "I";
  FigureTypes["T"] = "T";
  FigureTypes["L"] = "L";
  FigureTypes["S"] = "S";
})(FigureTypes = exports.FigureTypes || (exports.FigureTypes = {}));

exports.FigureTypePatterns = {
  O: O,
  I: I,
  T: T,
  L: L,
  S: S
};
},{}],"classes/helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRndValInterval(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getRndValInterval = getRndValInterval;
},{}],"classes/Figure/helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var helpers_1 = require("../helpers");

var Figure_1 = require("./Figure");

exports.createFigureState = function (patterns, activePattern) {
  return {
    patterns: patterns,
    activePattern: activePattern,
    setNextPattern: function setNextPattern() {
      if (this.activePattern === patterns.length) {
        this.activePattern = 1;
      } else {
        this.activePattern++;
      }
    },
    getPattern: function getPattern() {
      return this.patterns[this.activePattern - 1];
    }
  };
};

exports.getRandomColor = function () {
  var colorId = helpers_1.getRndValInterval(0, 4);
  var nameColors = Object.keys(Figure_1.Colors);
  var colorKey = nameColors[colorId];
  return Figure_1.Colors[colorKey];
};
},{"../helpers":"classes/helpers.ts","./Figure":"classes/Figure/Figure.ts"}],"classes/Figure/FigureFactory.ts":[function(require,module,exports) {
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

var Figure_1 = __importStar(require("./Figure"));

var FigureTypes_1 = require("./FigureTypes");

var helpers_1 = require("../helpers");

var helpers_2 = require("./helpers");

var FigureFactory =
/** @class */
function () {
  function FigureFactory() {}

  FigureFactory.create = function (type, state, pos, color) {
    if (state === void 0) {
      state = 1;
    }

    if (color === void 0) {
      color = Figure_1.Colors.violet;
    }

    return new Figure_1.default(helpers_2.createFigureState(FigureTypes_1.FigureTypePatterns[type], 1), pos, color);
  };

  FigureFactory.createRandomFigure = function (stackSize) {
    var columns = stackSize.columns,
        rows = stackSize.rows;
    var rndTypeIndex = helpers_1.getRndValInterval(0, Object.keys(FigureTypes_1.FigureTypes).length - 1);
    var patterns = FigureTypes_1.FigureTypePatterns[Object.keys(FigureTypes_1.FigureTypes)[rndTypeIndex]];
    var activePattern = helpers_1.getRndValInterval(1, patterns.length);
    var state = helpers_2.createFigureState(patterns, activePattern);
    var color = helpers_2.getRandomColor();
    var rndX = helpers_1.getRndValInterval(0, columns - state.getPattern()[0].length);
    return new Figure_1.default(state, [rndX, 0], color);
  };

  return FigureFactory;
}();

exports.default = FigureFactory;
},{"./Figure":"classes/Figure/Figure.ts","./FigureTypes":"classes/Figure/FigureTypes.ts","../helpers":"classes/helpers.ts","./helpers":"classes/Figure/helpers.ts"}],"classes/PointsStack/PointsStack.ts":[function(require,module,exports) {
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
  function PointsStack(columns, rows, points) {
    this.points = [];
    this.columns = columns;
    this.rows = rows;
    this.create(columns, rows, points);
  }

  PointsStack.prototype.getMapPoints = function () {
    var res = {};
    this.points.forEach(function (row, index) {
      var indRow = index;
      row.forEach(function (point, indPoint) {
        res[indPoint + "," + indRow] = point;
      });
    });
    return res;
  };

  PointsStack.prototype.create = function (columns, rows, points) {
    if (points) {
      this.points = points;
      return;
    }

    for (var i = 0; i < rows; i++) {
      if (!this.points[i]) {
        this.points[i] = [];
      }

      for (var j = 0; j < columns; j++) {
        this.points[i][j] = new Point_1.Point(false);
      }
    }
  };

  PointsStack.prototype.getEqualsRows = function () {
    return this.points.reduce(function (acc, row, index) {
      if (row.every(function (point) {
        return point.isFill();
      })) {
        acc.push(index);
      }

      return acc;
    }, []);
  };

  PointsStack.prototype.removeRow = function (rowNum) {
    this.points.splice(rowNum, 1);
    this.points.unshift(this.points[0].map(function () {
      return new Point_1.Point(false);
    }));
  };

  PointsStack.prototype.collapse = function () {
    var _this = this;

    var equalRows = [];

    while ((equalRows = this.getEqualsRows()).length) {
      equalRows.forEach(function (rowNum) {
        return _this.removeRow(rowNum);
      });
    }
  };

  PointsStack.prototype.getPoint = function (pos) {
    var x = pos[0],
        y = pos[1];
    var match = this.points[y][x];

    if (!this.points[y][x]) {
      throw new Error("Can't get point");
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

  PointsStack.prototype.getPoints = function () {
    return this.points;
  };

  PointsStack.prototype.addPoints = function (points) {
    var _this = this;

    Object.keys(points).forEach(function (key) {
      var _a = key.split(',').map(Number),
          x = _a[0],
          y = _a[1];

      var match;

      try {
        match = _this.points[y][x];
      } catch (_b) {
        throw new Error('Coordinate is not exists');
      }

      if (!match.isFill()) {
        _this.points[y][x] = points[key];
      }
    });
  };

  return PointsStack;
}();

exports.default = PointsStack;
},{"../Point":"classes/Point.ts"}],"classes/Positioner/Positioner.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Positioner =
/** @class */
function () {
  function Positioner(pointsStack, figure) {
    this.pointsStack = pointsStack;
    this.figure = figure;
    this.createdTs = Date.now();
  }

  Positioner.prototype.canAddFigureToStack = function () {
    var figureMapPoints = this.figure.getMapPoints();
    var points = this.pointsStack.getPoints();
    return Object.keys(figureMapPoints).every(function (key) {
      var _a = key.split(',').map(Number),
          x = _a[0],
          y = _a[1];

      var match = null;

      try {
        match = points[y][x];
      } catch (_b) {
        throw new Error('Coordinate is not exists');
      }

      return !(figureMapPoints[key].isFill() && match.isFill());
    });
  };

  Positioner.prototype.addFigureToStack = function () {
    this.pointsStack.addPoints(this.figure.getMapPoints());
  };

  Positioner.prototype.shrinkFigureDown = function () {
    this.shrinkFigureVertical(1);
  };

  Positioner.prototype.shrinkFigureVertical = function (diff) {
    if (diff === void 0) {
      diff = 1;
    }

    var _a = this.figure.getPosition(),
        x = _a[0],
        y = _a[1];

    this.figure.setPosition([x, y + diff]);
  };

  Positioner.prototype.shrinkFigureLeft = function () {
    this.shrinkFigureHorizontal(-1);
  };

  Positioner.prototype.shrinkFigureRight = function () {
    this.shrinkFigureHorizontal(1);
  };

  Positioner.prototype.shrinkFigureHorizontal = function (diff) {
    if (diff === void 0) {
      diff = 0;
    }

    var _a = this.figure.getPosition(),
        x = _a[0],
        y = _a[1];

    this.figure.setPosition([x + diff, y]);
  };

  Positioner.prototype.shrinkFigureMaxDown = function () {
    while (this.canShrinkFigureDown()) {
      this.shrinkFigureDown();
    }
  };

  Positioner.prototype.canShrinkFigureDown = function (diff) {
    if (diff === void 0) {
      diff = 1;
    }

    var maxY = this.pointsStack.getSize().rows;

    var _a = this.figure.getPosition(),
        x = _a[0],
        y = _a[1];

    var size = this.figure.getSize();
    var newBottomY = y + diff + size.height;

    if (newBottomY > maxY) {
      return false;
    }

    return this.canShrinkFigure(function (_a) {
      var x = _a[0],
          y = _a[1];
      return [x, y + 1];
    });
  };

  Positioner.prototype.canShrinkFigureLeft = function () {
    return this.canShrinkFigureVertical(-1);
  };

  Positioner.prototype.canShrinkFigureRight = function () {
    return this.canShrinkFigureVertical(1);
  };

  Positioner.prototype.canShrinkFigure = function (getNewCoordinates) {
    var _this = this;

    var figPoints = this.figure.getMapPoints();
    return Object.keys(figPoints).every(function (pos) {
      var _a = pos.split(',').map(Number),
          x = _a[0],
          y = _a[1];

      var pointInStack = _this.pointsStack.getPoint(getNewCoordinates([x, y]));

      return !(pointInStack.isFill() && figPoints[pos].isFill());
    });
  };

  Positioner.prototype.canShrinkFigureVertical = function (diff) {
    var _a = this.figure.getPosition(),
        x = _a[0],
        y = _a[1];

    var size = this.figure.getSize();

    if (diff < 1) {
      var newX = x + diff;

      if (newX < 0) {
        return false;
      }
    } else {
      var newRightX = x + diff + size.width;

      if (newRightX > this.pointsStack.getSize().columns) {
        return false;
      }
    }

    return this.canShrinkFigure(function (_a) {
      var x = _a[0],
          y = _a[1];
      return [x + diff, y];
    });
  };

  Positioner.prototype.shrinkFigureByKey = function (keyCode) {
    var code = keyCode;

    switch (code) {
      case 37:
        {
          if (this.canShrinkFigureLeft()) {
            this.shrinkFigureLeft();
          }
        }
        break;

      case 39:
        {
          if (this.canShrinkFigureRight()) {
            this.shrinkFigureRight();
          }
        }
        break;

      case 40:
        {
          this.shrinkFigureMaxDown();
        }
        break;

      case 38:
        {//rotate
        }
    }
  };

  return Positioner;
}();

exports.default = Positioner;
},{}],"classes/RendererCanvas.ts":[function(require,module,exports) {
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

      if (point.isFill()) {
        _this.ctx.fillStyle = point.getColor();

        _this.ctx.fillRect(x * _this.square + 0.5, y * _this.square + 0.5, _this.square, _this.square);

        _this.ctx.stroke();
      }

      _this.ctx.closePath();
    });
  };

  return RendererCanvas;
}();

exports.default = RendererCanvas;
},{"./Figure/Figure":"classes/Figure/Figure.ts"}],"classes/Statistic/Statistic.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Statistic =
/** @class */
function () {
  function Statistic() {
    this.data = {
      scores: 0,
      speed: 10
    };
  }

  Statistic.prototype.update = function (data) {
    this.data = __assign({}, this.data, data);
  };

  return Statistic;
}();

exports.default = Statistic;
},{}],"classes/Tetris.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FigureFactory_1 = __importDefault(require("./Figure/FigureFactory"));

var PointsStack_1 = __importDefault(require("./PointsStack/PointsStack"));

var Positioner_1 = __importDefault(require("./Positioner/Positioner"));

var RendererCanvas_1 = __importDefault(require("./RendererCanvas"));

var Statistic_1 = __importDefault(require("./Statistic/Statistic"));

var Tetris =
/** @class */
function () {
  function Tetris() {
    this.figure = null;
    this.positioner = null;
    this.pointsStack = new PointsStack_1.default(10, 5);
    this.renderer = this.createRenderer(this.pointsStack);
    this.statistic = new Statistic_1.default();
    this.init();
  }

  Tetris.prototype.init = function () {
    this.renderer.renderGrid();
    this.initKeyListener();
    this.runCircleFigure();
  };

  Tetris.prototype.runCircleFigure = function () {
    this.figure = FigureFactory_1.default.createRandomFigure(this.pointsStack.getSize());
    this.positioner = new Positioner_1.default(this.pointsStack, this.figure);

    if (this.positioner.canAddFigureToStack()) {
      this.render();
      this.runFigureDownInterval();
    } else {
      clearInterval(this.interval);
      this.endGame();
    }
  };

  Tetris.prototype.endGame = function () {
    this.render();
    this.interval = null;
    this.positioner = null;
    console.log('endGame');
  };

  Tetris.prototype.runFigureDownInterval = function () {
    var _this = this;

    this.interval = setInterval(function () {
      var positioner = _this.positioner;

      if (positioner.canShrinkFigureDown()) {
        positioner.shrinkFigureDown();

        _this.render();
      } else if (positioner.canAddFigureToStack()) {
        positioner.addFigureToStack();
        clearInterval(_this.interval);
        _this.interval = null;

        _this.pointsStack.collapse();

        _this.runCircleFigure();
      } else {
        clearInterval(_this.interval);

        _this.endGame();
      }
    }, this.statistic.data.speed / 3 * 100);
  };

  Tetris.prototype.initKeyListener = function () {
    var _this = this;

    document.addEventListener('keydown', function (e) {
      if (!_this.interval || !_this.positioner) {
        return;
      }

      _this.positioner.shrinkFigureByKey(e.keyCode);

      _this.render();
    });
  };

  Tetris.prototype.createRenderer = function (pointsStack) {
    var _a = pointsStack.getSize(),
        columns = _a.columns,
        rows = _a.rows;

    return new RendererCanvas_1.default(columns * 20, rows * 20);
  };

  Tetris.prototype.render = function () {
    var points = {};

    if (!this.figure) {
      points = this.pointsStack.getMapPoints();
    } else {
      points = __assign({}, this.pointsStack.getMapPoints(), this.figure.getMapPoints());
    }

    this.renderer.renderPoints(points);
  };

  return Tetris;
}();

exports.Tetris = Tetris;
},{"./Figure/FigureFactory":"classes/Figure/FigureFactory.ts","./PointsStack/PointsStack":"classes/PointsStack/PointsStack.ts","./Positioner/Positioner":"classes/Positioner/Positioner.ts","./RendererCanvas":"classes/RendererCanvas.ts","./Statistic/Statistic":"classes/Statistic/Statistic.ts"}],"index.ts":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50169" + '/');

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