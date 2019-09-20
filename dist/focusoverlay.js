(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.FocusOverlay = factory());
}(this, function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.9' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.1 Object.assign(target, source, ...)






	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
	((function () {
	  if (!Element.prototype.matches) {
	    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	  }

	  if (!Element.prototype.closest) {
	    Element.prototype.closest = function (s) {
	      var el = this;

	      do {
	        if (el.matches(s)) return el;
	        el = el.parentElement || el.parentNode;
	      } while (el !== null && el.nodeType === 1);

	      return null;
	    };
	  }
	})());

	var dP$1 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors && dP$1(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	function extend() {
	  var obj,
	      name,
	      copy,
	      target = arguments[0] || {},
	      i = 1,
	      length = arguments.length;

	  for (; i < length; i++) {
	    if ((obj = arguments[i]) !== null) {
	      for (name in obj) {
	        copy = obj[name];

	        if (target === copy) {
	          continue;
	        } else if (copy !== undefined) {
	          target[name] = copy;
	        }
	      }
	    }
	  }

	  return target;
	}

	// https://stackoverflow.com/a/32623832/8862005
	function absolutePosition(el) {
	  var found,
	      left = 0,
	      top = 0,
	      width = 0,
	      height = 0,
	      offsetBase = absolutePosition.offsetBase;

	  if (!offsetBase && document.body) {
	    offsetBase = absolutePosition.offsetBase = document.createElement('div');
	    offsetBase.style.cssText = 'position:absolute;left:0;top:0';
	    document.body.appendChild(offsetBase);
	  }

	  if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
	    var boundingRect = el.getBoundingClientRect();
	    var baseRect = offsetBase.getBoundingClientRect();
	    found = true;
	    left = boundingRect.left - baseRect.left;
	    top = boundingRect.top - baseRect.top;
	    width = boundingRect.right - boundingRect.left;
	    height = boundingRect.bottom - boundingRect.top;
	  }

	  return {
	    found: found,
	    left: left,
	    top: top,
	    width: width,
	    height: height,
	    right: left + width,
	    bottom: top + height
	  };
	}

	/**
	 * Cross browser transitionEnd event
	 * https://davidwalsh.name/css-animation-callback
	 * @return {String} Browser's supported transitionend type
	 */
	function whichTransitionEvent () {
	  var el = document.createElement('fakeelement');
	  var transitions = {
	    transition: 'transitionend',
	    OTransition: 'oTransitionEnd',
	    MozTransition: 'transitionend',
	    WebkitTransition: 'webkitTransitionEnd'
	  };

	  for (var t in transitions) {
	    if (el.style[t] !== undefined) {
	      return transitions[t];
	    }
	  }
	}

	/**
	 * The plugin constructor
	 * @param {Element|String} element The DOM element where plugin is applied
	 * @param {Object} options Options passed to the constructor
	 */

	var FocusOverlay =
	/*#__PURE__*/
	function () {
	  function FocusOverlay(element, options) {
	    _classCallCheck(this, FocusOverlay);

	    this.active = false;
	    this.scopedEl;
	    this.focusBox;
	    this.previousTarget;
	    this.nextTarget;
	    this.timeout = 0;
	    this.inScope = false;
	    this.transitionEvent = whichTransitionEvent();
	    this.options = extend({
	      // Class added to the focus box
	      class: 'focus-overlay',
	      // Class added while the focus box is active
	      activeClass: 'focus-overlay-active',
	      // Class added while the focus box is animating
	      animatingClass: 'focus-overlay-animating',
	      // Class added to the target element
	      targetClass: 'focus-overlay-target',
	      // z-index of focus box
	      zIndex: 9001,
	      // Duration of the animatingClass (milliseconds)
	      duration: 500,
	      // Removes activeClass after duration
	      inactiveAfterDuration: false,
	      // Tab, Arrow Keys, Enter, Space, Shift, Ctrl, Alt, ESC
	      triggerKeys: [9, 36, 37, 38, 39, 40, 13, 32, 16, 17, 18, 27],
	      // Make focus box inactive when a non specified key is pressed
	      inactiveOnNonTriggerKey: true,
	      // Make focus box inactive when a user clicks
	      inactiveOnClick: true,
	      // Force the box to always stay active. Overrides everything
	      alwaysActive: false,
	      // Reposition focus box on transitionEnd for focused elements
	      watchTransitionEnd: true,
	      // Initialization event
	      onInit: function onInit() {},
	      // Before focus box move
	      onBeforeMove: function onBeforeMove() {},
	      // After focus box move
	      onAfterMove: function onAfterMove() {},
	      // After FocusOverlay is destroyed
	      onDestroy: function onDestroy() {}
	    }, options || {});
	    /**
	     * Setup main scoped element. First expect a DOM element, then
	     * fallback to a string querySelector, and finally fallback to <body>
	     */

	    if (element instanceof Element) {
	      this.scopedEl = element;
	    } else if (typeof element === 'string' || element instanceof String) {
	      this.scopedEl = document.querySelector(element);
	    } else {
	      this.scopedEl = document.querySelector('body');
	    } // Binding


	    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
	    this.onFocusHandler = this.onFocusHandler.bind(this);
	    this.moveFocusBox = this.moveFocusBox.bind(this);
	    this.stop = this.stop.bind(this); // Initialize

	    this.init();
	  }
	  /**
	   * Initialize the plugin instance. Add event listeners
	   * to the window depending on which options are enabled.
	   */


	  _createClass(FocusOverlay, [{
	    key: "init",
	    value: function init() {
	      if (this.options.alwaysActive) {
	        this.active = true;
	        window.addEventListener('focusin', this.onFocusHandler, true);
	      } else {
	        window.addEventListener('keydown', this.onKeyDownHandler, false);

	        if (this.options.inactiveOnClick) {
	          window.addEventListener('mousedown', this.stop, false);
	        }
	      }

	      this._createFocusBox();

	      this.options.onInit(this);
	    }
	    /**
	     * Handler method for the keydown event
	     * @param {Event}
	     */

	  }, {
	    key: "onKeyDownHandler",
	    value: function onKeyDownHandler(e) {
	      var _this = this;

	      var code = e.which; // Checks if the key pressed is in the triggerKeys array

	      if (this.options.triggerKeys.includes(code)) {
	        if (this.active === false) {
	          this.active = true;
	          window.addEventListener('focusin', this.onFocusHandler, true);
	        }
	        /**
	         * Iframes don't trigger a focus event so I hacked this check in there.
	         * Slight delay on the setTimeout for cross browser reasons.
	         * See https://stackoverflow.com/a/28932220/8862005
	         */


	        setTimeout(function () {
	          var activeEl = document.activeElement;
	          /**
	           * Check if the active element is an iframe, is part of
	           * the scope, and that focusOverlay is currently active.
	           */

	          if (activeEl instanceof HTMLIFrameElement && _this.scopedEl.contains(activeEl) && _this.active === true) {
	            _this.moveFocusBox(activeEl);
	          }
	        }, 5);
	      } else if (this.options.inactiveOnNonTriggerKey) {
	        this.stop();
	      }
	    }
	    /**
	     * Creates the focusBox DIV element and appends itself to the DOM
	     */

	  }, {
	    key: "_createFocusBox",
	    value: function _createFocusBox() {
	      this.focusBox = document.createElement('div');
	      this.focusBox.setAttribute('aria-hidden', 'true');
	      this.focusBox.classList.add(this.options.class);
	      Object.assign(this.focusBox.style, {
	        position: 'absolute',
	        zIndex: this.options.zIndex,
	        pointerEvents: 'none'
	      });
	      this.scopedEl.insertAdjacentElement('beforeend', this.focusBox);
	    }
	    /**
	     * Cleanup method that runs whenever variables,
	     * methods, etc. needs to be refreshed.
	     */

	  }, {
	    key: "_cleanup",
	    value: function _cleanup() {
	      // Remove previous target's classes and event listeners
	      if (this.nextTarget != null) {
	        this.previousTarget = this.nextTarget;
	        this.previousTarget.classList.remove(this.options.targetClass);
	        this.previousTarget.removeEventListener(this.transitionEvent, this.moveFocusBox);
	      }
	    }
	    /**
	     * Handler method for the focus event
	     * @param {Event}
	     */

	  }, {
	    key: "onFocusHandler",
	    value: function onFocusHandler(e) {
	      var focusedEl = e.target;

	      this._cleanup(); // If the focused element is a child of the main element


	      if (this.scopedEl.contains(focusedEl)) {
	        // Variable to be added to onBeforeMove event later
	        var currentEl = this.nextTarget;
	        this.inScope = true; // If the focused element has data-focus then assign a new $target

	        if (focusedEl.getAttribute('data-focus') !== null) {
	          var focusSelector = focusedEl.getAttribute('data-focus');
	          this.nextTarget = document.querySelector("[data-focus='".concat(focusSelector, "']")); // If the focused element has data-focus-label then focus the associated label
	        } else if (focusedEl.getAttribute('data-focus-label') !== null) {
	          var associatedEl = document.querySelector("[for='".concat(focusedEl.id, "']")); // If there is no label pointing directly to the focused element, then point to the wrapping label

	          if (associatedEl === null) {
	            associatedEl = focusedEl.closest('label');
	          }

	          this.nextTarget = associatedEl; // If the focused element has data-ignore then stop
	        } else if (focusedEl.getAttribute('data-focus-ignore') !== null) {
	          return; // If none of the above is true then set the target as the currently focused element
	        } else {
	          this.nextTarget = focusedEl;
	        }
	        /**
	         * Clear the timeout of the duration just in case if the
	         * user focuses a new element before the timer runs out.
	         */


	        clearTimeout(this.timeout);
	        /**
	         * If transitionEnd is supported and watchTransitionEnd is enabled
	         * add a check to make the focusBox recalculate its position
	         * if the focused element has a long transition on focus.
	         */

	        if (this.transitionEvent && this.options.watchTransitionEnd) {
	          this.nextTarget.addEventListener(this.transitionEvent, this.moveFocusBox);
	        }

	        this.options.onBeforeMove(currentEl, this.nextTarget, this);
	        this.moveFocusBox(this.nextTarget); // If the focused element is a child of the main element but alwaysActive do nothing
	      } else if (this.options.alwaysActive) {
	        this.inScope = false; // If the element focused is not a child of the main element stop being active
	      } else {
	        this.inScope = false;
	        this.stop();
	      }
	    }
	    /**
	     * Ends the active state of the focusBox
	     */

	  }, {
	    key: "stop",
	    value: function stop() {
	      this.active = false;
	      window.removeEventListener('focusin', this.onFocusHandler, true);

	      this._cleanup();

	      this.focusBox.classList.remove(this.options.activeClass);
	    }
	    /**
	     * Moves the focusBox to a target element
	     * @param {Element|Event} targetEl
	     */

	  }, {
	    key: "moveFocusBox",
	    value: function moveFocusBox(targetEl) {
	      var _this2 = this;

	      // When passed as a handler we'll get the event target
	      if (targetEl instanceof Event) targetEl = document.activeElement; // Marking current element as being targeted

	      targetEl.classList.add(this.options.targetClass);
	      /**
	       * Check to see if what we're targeting is actually still there.
	       * Then check to see if we're targeting a DOM element. There was
	       * an IE issue with the document and window sometimes being targeted
	       * and throwing errors since you can't get the position values of those.
	       */

	      if (document.body.contains(targetEl) && targetEl instanceof Element) {
	        var rect = absolutePosition(targetEl);
	        var width = "".concat(rect.width, "px");
	        var height = "".concat(rect.height, "px");
	        var left = "".concat(rect.left, "px");
	        var top = "".concat(rect.top, "px");
	        this.focusBox.classList.add(this.options.animatingClass);
	        this.focusBox.classList.add(this.options.activeClass);
	        Object.assign(this.focusBox.style, {
	          width: width,
	          height: height,
	          left: left,
	          top: top
	        }); // Remove animating/active class after the duration ends.

	        this.timeout = setTimeout(function () {
	          _this2.focusBox.classList.remove(_this2.options.animatingClass);

	          if (_this2.options.inactiveAfterDuration) {
	            _this2.focusBox.classList.remove(_this2.options.activeClass);
	          }

	          _this2.options.onAfterMove(_this2.previousTarget, targetEl, _this2);
	        }, this.options.duration);
	      } else {
	        this._cleanup();
	      }
	    }
	    /**
	     * The destroy method to free resources used by the plugin:
	     * References, unregister listeners, etc.
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      // Remove focusBox
	      this.focusBox.parentNode.removeChild(this.focusBox); // Remove any extra classes given to other elements if they exist

	      this.previousTarget != null && this.previousTarget.classList.remove(this.options.targetClass);
	      this.nextTarget != null && this.nextTarget.classList.remove(this.options.targetClass); // Remove event listeners

	      window.removeEventListener('focusin', this.onFocusHandler, true);
	      window.removeEventListener('keydown', this.onKeyDownHandler, false);
	      window.removeEventListener('mousedown', this.stop, false);
	      this.options.onDestroy(this);
	    }
	  }]);

	  return FocusOverlay;
	}();

	return FocusOverlay;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXNvdmVybGF5LmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jb3JlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZmFpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1kcC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oaWRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdWlkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZnVuY3Rpb24tdG8tc3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZXhwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faW9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1waWUuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3drcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LmFycmF5LmluY2x1ZGVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXMtcmVnZXhwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWNvbnRleHQuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19mYWlscy1pcy1yZWdleHAuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5zdHJpbmcuaW5jbHVkZXMuanMiLCIuLi9zcmMvcG9seWZpbGxzL2Nsb3Nlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5mdW5jdGlvbi5uYW1lLmpzIiwiLi4vc3JjL3V0aWxzL2V4dGVuZC5qcyIsIi4uL3NyYy91dGlscy9hYnNvbHV0ZVBvc2l0aW9uLmpzIiwiLi4vc3JjL3V0aWxzL3doaWNoVHJhbnNpdGlvbkV2ZW50LmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjYuOScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCJ2YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246IGNvcmUudmVyc2lvbixcbiAgbW9kZTogcmVxdWlyZSgnLi9fbGlicmFyeScpID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTkgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ25hdGl2ZS1mdW5jdGlvbi10by1zdHJpbmcnLCBGdW5jdGlvbi50b1N0cmluZyk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBTUkMgPSByZXF1aXJlKCcuL191aWQnKSgnc3JjJyk7XG52YXIgJHRvU3RyaW5nID0gcmVxdWlyZSgnLi9fZnVuY3Rpb24tdG8tc3RyaW5nJyk7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciBUUEwgPSAoJycgKyAkdG9TdHJpbmcpLnNwbGl0KFRPX1NUUklORyk7XG5cbnJlcXVpcmUoJy4vX2NvcmUnKS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiAkdG9TdHJpbmcuY2FsbChpdCk7XG59O1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWwsIHNhZmUpIHtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCAnbmFtZScpIHx8IGhpZGUodmFsLCAnbmFtZScsIGtleSk7XG4gIGlmIChPW2tleV0gPT09IHZhbCkgcmV0dXJuO1xuICBpZiAoaXNGdW5jdGlvbikgaGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmIChPID09PSBnbG9iYWwpIHtcbiAgICBPW2tleV0gPSB2YWw7XG4gIH0gZWxzZSBpZiAoIXNhZmUpIHtcbiAgICBkZWxldGUgT1trZXldO1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9IGVsc2UgaWYgKE9ba2V5XSkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgfVxuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG59KShGdW5jdGlvbi5wcm90b3R5cGUsIFRPX1NUUklORywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIHRoaXNbU1JDXSB8fCAkdG9TdHJpbmcuY2FsbCh0aGlzKTtcbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gfHwgKGdsb2JhbFtuYW1lXSA9IHt9KSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pO1xuICB2YXIga2V5LCBvd24sIG91dCwgZXhwO1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZiAodGFyZ2V0KSByZWRlZmluZSh0YXJnZXQsIGtleSwgb3V0LCB0eXBlICYgJGV4cG9ydC5VKTtcbiAgICAvLyBleHBvcnRcbiAgICBpZiAoZXhwb3J0c1trZXldICE9IG91dCkgaGlkZShleHBvcnRzLCBrZXksIGV4cCk7XG4gICAgaWYgKElTX1BST1RPICYmIGV4cFByb3RvW2tleV0gIT0gb3V0KSBleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcbiIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG4iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSB7XG4gICAgICBrZXkgPSBrZXlzW2orK107XG4gICAgICBpZiAoIURFU0NSSVBUT1JTIHx8IGlzRW51bS5jYWxsKFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcbiIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCIvLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG52YXIgVU5TQ09QQUJMRVMgPSByZXF1aXJlKCcuL193a3MnKSgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuaWYgKEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZCkgcmVxdWlyZSgnLi9faGlkZScpKEFycmF5UHJvdG8sIFVOU0NPUEFCTEVTLCB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b1tVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyICRpbmNsdWRlcyA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykodHJ1ZSk7XG5cbiRleHBvcnQoJGV4cG9ydC5QLCAnQXJyYXknLCB7XG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhlbCAvKiAsIGZyb21JbmRleCA9IDAgKi8pIHtcbiAgICByZXR1cm4gJGluY2x1ZGVzKHRoaXMsIGVsLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG5yZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKSgnaW5jbHVkZXMnKTtcbiIsIi8vIDcuMi44IElzUmVnRXhwKGFyZ3VtZW50KVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgTUFUQ0ggPSByZXF1aXJlKCcuL193a3MnKSgnbWF0Y2gnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBpc1JlZ0V4cDtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiAoKGlzUmVnRXhwID0gaXRbTUFUQ0hdKSAhPT0gdW5kZWZpbmVkID8gISFpc1JlZ0V4cCA6IGNvZihpdCkgPT0gJ1JlZ0V4cCcpO1xufTtcbiIsIi8vIGhlbHBlciBmb3IgU3RyaW5nI3tzdGFydHNXaXRoLCBlbmRzV2l0aCwgaW5jbHVkZXN9XG52YXIgaXNSZWdFeHAgPSByZXF1aXJlKCcuL19pcy1yZWdleHAnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0aGF0LCBzZWFyY2hTdHJpbmcsIE5BTUUpIHtcbiAgaWYgKGlzUmVnRXhwKHNlYXJjaFN0cmluZykpIHRocm93IFR5cGVFcnJvcignU3RyaW5nIycgKyBOQU1FICsgXCIgZG9lc24ndCBhY2NlcHQgcmVnZXghXCIpO1xuICByZXR1cm4gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xufTtcbiIsInZhciBNQVRDSCA9IHJlcXVpcmUoJy4vX3drcycpKCdtYXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZKSB7XG4gIHZhciByZSA9IC8uLztcbiAgdHJ5IHtcbiAgICAnLy4vJ1tLRVldKHJlKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRyeSB7XG4gICAgICByZVtNQVRDSF0gPSBmYWxzZTtcbiAgICAgIHJldHVybiAhJy8uLydbS0VZXShyZSk7XG4gICAgfSBjYXRjaCAoZikgeyAvKiBlbXB0eSAqLyB9XG4gIH0gcmV0dXJuIHRydWU7XG59O1xuIiwiLy8gMjEuMS4zLjcgU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyhzZWFyY2hTdHJpbmcsIHBvc2l0aW9uID0gMClcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29udGV4dCA9IHJlcXVpcmUoJy4vX3N0cmluZy1jb250ZXh0Jyk7XG52YXIgSU5DTFVERVMgPSAnaW5jbHVkZXMnO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIHJlcXVpcmUoJy4vX2ZhaWxzLWlzLXJlZ2V4cCcpKElOQ0xVREVTKSwgJ1N0cmluZycsIHtcbiAgaW5jbHVkZXM6IGZ1bmN0aW9uIGluY2x1ZGVzKHNlYXJjaFN0cmluZyAvKiAsIHBvc2l0aW9uID0gMCAqLykge1xuICAgIHJldHVybiAhIX5jb250ZXh0KHRoaXMsIHNlYXJjaFN0cmluZywgSU5DTFVERVMpXG4gICAgICAuaW5kZXhPZihzZWFyY2hTdHJpbmcsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCIvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9jbG9zZXN0I1BvbHlmaWxsXHJcbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbigpIHtcclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPVxyXG4gICAgICBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fFxyXG4gICAgICBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XHJcbiAgfVxyXG5cclxuICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcclxuICAgIEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QgPSBmdW5jdGlvbihzKSB7XHJcbiAgICAgIHZhciBlbCA9IHRoaXM7XHJcblxyXG4gICAgICBkbyB7XHJcbiAgICAgICAgaWYgKGVsLm1hdGNoZXMocykpIHJldHVybiBlbDtcclxuICAgICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQgfHwgZWwucGFyZW50Tm9kZTtcclxuICAgICAgfSB3aGlsZSAoZWwgIT09IG51bGwgJiYgZWwubm9kZVR5cGUgPT09IDEpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcbiAgfVxyXG59KSgpO1xyXG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIEZQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBuYW1lUkUgPSAvXlxccypmdW5jdGlvbiAoW14gKF0qKS87XG52YXIgTkFNRSA9ICduYW1lJztcblxuLy8gMTkuMi40LjIgbmFtZVxuTkFNRSBpbiBGUHJvdG8gfHwgcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiBkUChGUHJvdG8sIE5BTUUsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuICgnJyArIHRoaXMpLm1hdGNoKG5hbWVSRSlbMV07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfVxufSk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleHRlbmQoKSB7XHJcbiAgdmFyIG9iaixcclxuICAgIG5hbWUsXHJcbiAgICBjb3B5LFxyXG4gICAgdGFyZ2V0ID0gYXJndW1lbnRzWzBdIHx8IHt9LFxyXG4gICAgaSA9IDEsXHJcbiAgICBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xyXG5cclxuICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoKG9iaiA9IGFyZ3VtZW50c1tpXSkgIT09IG51bGwpIHtcclxuICAgICAgZm9yIChuYW1lIGluIG9iaikge1xyXG4gICAgICAgIGNvcHkgPSBvYmpbbmFtZV07XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQgPT09IGNvcHkpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29weSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBjb3B5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGFyZ2V0O1xyXG59XHJcbiIsIi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zMjYyMzgzMi84ODYyMDA1XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFic29sdXRlUG9zaXRpb24oZWwpIHtcclxuICB2YXIgZm91bmQsXHJcbiAgICBsZWZ0ID0gMCxcclxuICAgIHRvcCA9IDAsXHJcbiAgICB3aWR0aCA9IDAsXHJcbiAgICBoZWlnaHQgPSAwLFxyXG4gICAgb2Zmc2V0QmFzZSA9IGFic29sdXRlUG9zaXRpb24ub2Zmc2V0QmFzZTtcclxuICBpZiAoIW9mZnNldEJhc2UgJiYgZG9jdW1lbnQuYm9keSkge1xyXG4gICAgb2Zmc2V0QmFzZSA9IGFic29sdXRlUG9zaXRpb24ub2Zmc2V0QmFzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgb2Zmc2V0QmFzZS5zdHlsZS5jc3NUZXh0ID0gJ3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MCc7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG9mZnNldEJhc2UpO1xyXG4gIH1cclxuICBpZiAoXHJcbiAgICBlbCAmJlxyXG4gICAgZWwub3duZXJEb2N1bWVudCA9PT0gZG9jdW1lbnQgJiZcclxuICAgICdnZXRCb3VuZGluZ0NsaWVudFJlY3QnIGluIGVsICYmXHJcbiAgICBvZmZzZXRCYXNlXHJcbiAgKSB7XHJcbiAgICB2YXIgYm91bmRpbmdSZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICB2YXIgYmFzZVJlY3QgPSBvZmZzZXRCYXNlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgZm91bmQgPSB0cnVlO1xyXG4gICAgbGVmdCA9IGJvdW5kaW5nUmVjdC5sZWZ0IC0gYmFzZVJlY3QubGVmdDtcclxuICAgIHRvcCA9IGJvdW5kaW5nUmVjdC50b3AgLSBiYXNlUmVjdC50b3A7XHJcbiAgICB3aWR0aCA9IGJvdW5kaW5nUmVjdC5yaWdodCAtIGJvdW5kaW5nUmVjdC5sZWZ0O1xyXG4gICAgaGVpZ2h0ID0gYm91bmRpbmdSZWN0LmJvdHRvbSAtIGJvdW5kaW5nUmVjdC50b3A7XHJcbiAgfVxyXG4gIHJldHVybiB7XHJcbiAgICBmb3VuZDogZm91bmQsXHJcbiAgICBsZWZ0OiBsZWZ0LFxyXG4gICAgdG9wOiB0b3AsXHJcbiAgICB3aWR0aDogd2lkdGgsXHJcbiAgICBoZWlnaHQ6IGhlaWdodCxcclxuICAgIHJpZ2h0OiBsZWZ0ICsgd2lkdGgsXHJcbiAgICBib3R0b206IHRvcCArIGhlaWdodFxyXG4gIH07XHJcbn1cclxuIiwiLyoqXHJcbiAqIENyb3NzIGJyb3dzZXIgdHJhbnNpdGlvbkVuZCBldmVudFxyXG4gKiBodHRwczovL2Rhdmlkd2Fsc2gubmFtZS9jc3MtYW5pbWF0aW9uLWNhbGxiYWNrXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gQnJvd3NlcidzIHN1cHBvcnRlZCB0cmFuc2l0aW9uZW5kIHR5cGVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKTtcclxuICBjb25zdCB0cmFuc2l0aW9ucyA9IHtcclxuICAgIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcclxuICAgIE9UcmFuc2l0aW9uOiAnb1RyYW5zaXRpb25FbmQnLFxyXG4gICAgTW96VHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxyXG4gICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnXHJcbiAgfTtcclxuXHJcbiAgZm9yIChsZXQgdCBpbiB0cmFuc2l0aW9ucykge1xyXG4gICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHRyYW5zaXRpb25zW3RdO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgJy4vc3R5bGVzLmNzcyc7XHJcbmltcG9ydCAnLi9wb2x5ZmlsbHMvY2xvc2VzdCc7XHJcbmltcG9ydCBleHRlbmQgZnJvbSAnLi91dGlscy9leHRlbmQnO1xyXG5pbXBvcnQgYWJzb2x1dGVQb3NpdGlvbiBmcm9tICcuL3V0aWxzL2Fic29sdXRlUG9zaXRpb24nO1xyXG5pbXBvcnQgd2hpY2hUcmFuc2l0aW9uRXZlbnQgZnJvbSAnLi91dGlscy93aGljaFRyYW5zaXRpb25FdmVudCc7XHJcblxyXG4vKipcclxuICogVGhlIHBsdWdpbiBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge0VsZW1lbnR8U3RyaW5nfSBlbGVtZW50IFRoZSBET00gZWxlbWVudCB3aGVyZSBwbHVnaW4gaXMgYXBwbGllZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIHBhc3NlZCB0byB0aGUgY29uc3RydWN0b3JcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvY3VzT3ZlcmxheSB7XHJcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIHRoaXMuc2NvcGVkRWw7XHJcbiAgICB0aGlzLmZvY3VzQm94O1xyXG4gICAgdGhpcy5wcmV2aW91c1RhcmdldDtcclxuICAgIHRoaXMubmV4dFRhcmdldDtcclxuICAgIHRoaXMudGltZW91dCA9IDA7XHJcbiAgICB0aGlzLmluU2NvcGUgPSBmYWxzZTtcclxuICAgIHRoaXMudHJhbnNpdGlvbkV2ZW50ID0gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuICAgIHRoaXMub3B0aW9ucyA9IGV4dGVuZCh7XHJcbiAgICAgICAgLy8gQ2xhc3MgYWRkZWQgdG8gdGhlIGZvY3VzIGJveFxyXG4gICAgICAgIGNsYXNzOiAnZm9jdXMtb3ZlcmxheScsXHJcbiAgICAgICAgLy8gQ2xhc3MgYWRkZWQgd2hpbGUgdGhlIGZvY3VzIGJveCBpcyBhY3RpdmVcclxuICAgICAgICBhY3RpdmVDbGFzczogJ2ZvY3VzLW92ZXJsYXktYWN0aXZlJyxcclxuICAgICAgICAvLyBDbGFzcyBhZGRlZCB3aGlsZSB0aGUgZm9jdXMgYm94IGlzIGFuaW1hdGluZ1xyXG4gICAgICAgIGFuaW1hdGluZ0NsYXNzOiAnZm9jdXMtb3ZlcmxheS1hbmltYXRpbmcnLFxyXG4gICAgICAgIC8vIENsYXNzIGFkZGVkIHRvIHRoZSB0YXJnZXQgZWxlbWVudFxyXG4gICAgICAgIHRhcmdldENsYXNzOiAnZm9jdXMtb3ZlcmxheS10YXJnZXQnLFxyXG4gICAgICAgIC8vIHotaW5kZXggb2YgZm9jdXMgYm94XHJcbiAgICAgICAgekluZGV4OiA5MDAxLFxyXG4gICAgICAgIC8vIER1cmF0aW9uIG9mIHRoZSBhbmltYXRpbmdDbGFzcyAobWlsbGlzZWNvbmRzKVxyXG4gICAgICAgIGR1cmF0aW9uOiA1MDAsXHJcbiAgICAgICAgLy8gUmVtb3ZlcyBhY3RpdmVDbGFzcyBhZnRlciBkdXJhdGlvblxyXG4gICAgICAgIGluYWN0aXZlQWZ0ZXJEdXJhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgLy8gVGFiLCBBcnJvdyBLZXlzLCBFbnRlciwgU3BhY2UsIFNoaWZ0LCBDdHJsLCBBbHQsIEVTQ1xyXG4gICAgICAgIHRyaWdnZXJLZXlzOiBbOSwgMzYsIDM3LCAzOCwgMzksIDQwLCAxMywgMzIsIDE2LCAxNywgMTgsIDI3XSxcclxuICAgICAgICAvLyBNYWtlIGZvY3VzIGJveCBpbmFjdGl2ZSB3aGVuIGEgbm9uIHNwZWNpZmllZCBrZXkgaXMgcHJlc3NlZFxyXG4gICAgICAgIGluYWN0aXZlT25Ob25UcmlnZ2VyS2V5OiB0cnVlLFxyXG4gICAgICAgIC8vIE1ha2UgZm9jdXMgYm94IGluYWN0aXZlIHdoZW4gYSB1c2VyIGNsaWNrc1xyXG4gICAgICAgIGluYWN0aXZlT25DbGljazogdHJ1ZSxcclxuICAgICAgICAvLyBGb3JjZSB0aGUgYm94IHRvIGFsd2F5cyBzdGF5IGFjdGl2ZS4gT3ZlcnJpZGVzIGV2ZXJ5dGhpbmdcclxuICAgICAgICBhbHdheXNBY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgIC8vIFJlcG9zaXRpb24gZm9jdXMgYm94IG9uIHRyYW5zaXRpb25FbmQgZm9yIGZvY3VzZWQgZWxlbWVudHNcclxuICAgICAgICB3YXRjaFRyYW5zaXRpb25FbmQ6IHRydWUsXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6YXRpb24gZXZlbnRcclxuICAgICAgICBvbkluaXQ6IGZ1bmN0aW9uICgpIHt9LFxyXG4gICAgICAgIC8vIEJlZm9yZSBmb2N1cyBib3ggbW92ZVxyXG4gICAgICAgIG9uQmVmb3JlTW92ZTogZnVuY3Rpb24gKCkge30sXHJcbiAgICAgICAgLy8gQWZ0ZXIgZm9jdXMgYm94IG1vdmVcclxuICAgICAgICBvbkFmdGVyTW92ZTogZnVuY3Rpb24gKCkge30sXHJcbiAgICAgICAgLy8gQWZ0ZXIgRm9jdXNPdmVybGF5IGlzIGRlc3Ryb3llZFxyXG4gICAgICAgIG9uRGVzdHJveTogZnVuY3Rpb24gKCkge31cclxuICAgICAgfSxcclxuICAgICAgb3B0aW9ucyB8fCB7fVxyXG4gICAgKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHVwIG1haW4gc2NvcGVkIGVsZW1lbnQuIEZpcnN0IGV4cGVjdCBhIERPTSBlbGVtZW50LCB0aGVuXHJcbiAgICAgKiBmYWxsYmFjayB0byBhIHN0cmluZyBxdWVyeVNlbGVjdG9yLCBhbmQgZmluYWxseSBmYWxsYmFjayB0byA8Ym9keT5cclxuICAgICAqL1xyXG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMuc2NvcGVkRWwgPSBlbGVtZW50O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgfHwgZWxlbWVudCBpbnN0YW5jZW9mIFN0cmluZykge1xyXG4gICAgICB0aGlzLnNjb3BlZEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2NvcGVkRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmluZGluZ1xyXG4gICAgdGhpcy5vbktleURvd25IYW5kbGVyID0gdGhpcy5vbktleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLm9uRm9jdXNIYW5kbGVyID0gdGhpcy5vbkZvY3VzSGFuZGxlci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5tb3ZlRm9jdXNCb3ggPSB0aGlzLm1vdmVGb2N1c0JveC5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5zdG9wID0gdGhpcy5zdG9wLmJpbmQodGhpcyk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZVxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBwbHVnaW4gaW5zdGFuY2UuIEFkZCBldmVudCBsaXN0ZW5lcnNcclxuICAgKiB0byB0aGUgd2luZG93IGRlcGVuZGluZyBvbiB3aGljaCBvcHRpb25zIGFyZSBlbmFibGVkLlxyXG4gICAqL1xyXG4gIGluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmFsd2F5c0FjdGl2ZSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzSGFuZGxlciwgdHJ1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duSGFuZGxlciwgZmFsc2UpO1xyXG5cclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5pbmFjdGl2ZU9uQ2xpY2spIHtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5zdG9wLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jcmVhdGVGb2N1c0JveCgpO1xyXG4gICAgdGhpcy5vcHRpb25zLm9uSW5pdCh0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXIgbWV0aG9kIGZvciB0aGUga2V5ZG93biBldmVudFxyXG4gICAqIEBwYXJhbSB7RXZlbnR9XHJcbiAgICovXHJcbiAgb25LZXlEb3duSGFuZGxlcihlKSB7XHJcbiAgICBjb25zdCBjb2RlID0gZS53aGljaDtcclxuXHJcbiAgICAvLyBDaGVja3MgaWYgdGhlIGtleSBwcmVzc2VkIGlzIGluIHRoZSB0cmlnZ2VyS2V5cyBhcnJheVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy50cmlnZ2VyS2V5cy5pbmNsdWRlcyhjb2RlKSkge1xyXG4gICAgICBpZiAodGhpcy5hY3RpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgdGhpcy5vbkZvY3VzSGFuZGxlciwgdHJ1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBJZnJhbWVzIGRvbid0IHRyaWdnZXIgYSBmb2N1cyBldmVudCBzbyBJIGhhY2tlZCB0aGlzIGNoZWNrIGluIHRoZXJlLlxyXG4gICAgICAgKiBTbGlnaHQgZGVsYXkgb24gdGhlIHNldFRpbWVvdXQgZm9yIGNyb3NzIGJyb3dzZXIgcmVhc29ucy5cclxuICAgICAgICogU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yODkzMjIyMC84ODYyMDA1XHJcbiAgICAgICAqL1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBhY3RpdmVFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoZWNrIGlmIHRoZSBhY3RpdmUgZWxlbWVudCBpcyBhbiBpZnJhbWUsIGlzIHBhcnQgb2ZcclxuICAgICAgICAgKiB0aGUgc2NvcGUsIGFuZCB0aGF0IGZvY3VzT3ZlcmxheSBpcyBjdXJyZW50bHkgYWN0aXZlLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGFjdGl2ZUVsIGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQgJiZcclxuICAgICAgICAgIHRoaXMuc2NvcGVkRWwuY29udGFpbnMoYWN0aXZlRWwpICYmXHJcbiAgICAgICAgICB0aGlzLmFjdGl2ZSA9PT0gdHJ1ZVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgdGhpcy5tb3ZlRm9jdXNCb3goYWN0aXZlRWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSwgNSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5pbmFjdGl2ZU9uTm9uVHJpZ2dlcktleSkge1xyXG4gICAgICB0aGlzLnN0b3AoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgdGhlIGZvY3VzQm94IERJViBlbGVtZW50IGFuZCBhcHBlbmRzIGl0c2VsZiB0byB0aGUgRE9NXHJcbiAgICovXHJcbiAgX2NyZWF0ZUZvY3VzQm94KCkge1xyXG4gICAgdGhpcy5mb2N1c0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5mb2N1c0JveC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgIHRoaXMuZm9jdXNCb3guY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuY2xhc3MpO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5mb2N1c0JveC5zdHlsZSwge1xyXG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgekluZGV4OiB0aGlzLm9wdGlvbnMuekluZGV4LFxyXG4gICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZSdcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2NvcGVkRWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCB0aGlzLmZvY3VzQm94KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFudXAgbWV0aG9kIHRoYXQgcnVucyB3aGVuZXZlciB2YXJpYWJsZXMsXHJcbiAgICogbWV0aG9kcywgZXRjLiBuZWVkcyB0byBiZSByZWZyZXNoZWQuXHJcbiAgICovXHJcbiAgX2NsZWFudXAoKSB7XHJcbiAgICAvLyBSZW1vdmUgcHJldmlvdXMgdGFyZ2V0J3MgY2xhc3NlcyBhbmQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICBpZiAodGhpcy5uZXh0VGFyZ2V0ICE9IG51bGwpIHtcclxuICAgICAgdGhpcy5wcmV2aW91c1RhcmdldCA9IHRoaXMubmV4dFRhcmdldDtcclxuICAgICAgdGhpcy5wcmV2aW91c1RhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMub3B0aW9ucy50YXJnZXRDbGFzcyk7XHJcbiAgICAgIHRoaXMucHJldmlvdXNUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICB0aGlzLnRyYW5zaXRpb25FdmVudCxcclxuICAgICAgICB0aGlzLm1vdmVGb2N1c0JveFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGFuZGxlciBtZXRob2QgZm9yIHRoZSBmb2N1cyBldmVudFxyXG4gICAqIEBwYXJhbSB7RXZlbnR9XHJcbiAgICovXHJcbiAgb25Gb2N1c0hhbmRsZXIoZSkge1xyXG4gICAgY29uc3QgZm9jdXNlZEVsID0gZS50YXJnZXQ7XHJcblxyXG4gICAgdGhpcy5fY2xlYW51cCgpO1xyXG5cclxuICAgIC8vIElmIHRoZSBmb2N1c2VkIGVsZW1lbnQgaXMgYSBjaGlsZCBvZiB0aGUgbWFpbiBlbGVtZW50XHJcbiAgICBpZiAodGhpcy5zY29wZWRFbC5jb250YWlucyhmb2N1c2VkRWwpKSB7XHJcbiAgICAgIC8vIFZhcmlhYmxlIHRvIGJlIGFkZGVkIHRvIG9uQmVmb3JlTW92ZSBldmVudCBsYXRlclxyXG4gICAgICBjb25zdCBjdXJyZW50RWwgPSB0aGlzLm5leHRUYXJnZXQ7XHJcblxyXG4gICAgICB0aGlzLmluU2NvcGUgPSB0cnVlO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIGZvY3VzZWQgZWxlbWVudCBoYXMgZGF0YS1mb2N1cyB0aGVuIGFzc2lnbiBhIG5ldyAkdGFyZ2V0XHJcbiAgICAgIGlmIChmb2N1c2VkRWwuZ2V0QXR0cmlidXRlKCdkYXRhLWZvY3VzJykgIT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCBmb2N1c1NlbGVjdG9yID0gZm9jdXNlZEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb2N1cycpO1xyXG5cclxuICAgICAgICB0aGlzLm5leHRUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgYFtkYXRhLWZvY3VzPScke2ZvY3VzU2VsZWN0b3J9J11gXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGZvY3VzZWQgZWxlbWVudCBoYXMgZGF0YS1mb2N1cy1sYWJlbCB0aGVuIGZvY3VzIHRoZSBhc3NvY2lhdGVkIGxhYmVsXHJcbiAgICAgIH0gZWxzZSBpZiAoZm9jdXNlZEVsLmdldEF0dHJpYnV0ZSgnZGF0YS1mb2N1cy1sYWJlbCcpICE9PSBudWxsKSB7XHJcbiAgICAgICAgbGV0IGFzc29jaWF0ZWRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtmb3I9JyR7Zm9jdXNlZEVsLmlkfSddYCk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIGxhYmVsIHBvaW50aW5nIGRpcmVjdGx5IHRvIHRoZSBmb2N1c2VkIGVsZW1lbnQsIHRoZW4gcG9pbnQgdG8gdGhlIHdyYXBwaW5nIGxhYmVsXHJcbiAgICAgICAgaWYgKGFzc29jaWF0ZWRFbCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgYXNzb2NpYXRlZEVsID0gZm9jdXNlZEVsLmNsb3Nlc3QoJ2xhYmVsJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5leHRUYXJnZXQgPSBhc3NvY2lhdGVkRWw7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBmb2N1c2VkIGVsZW1lbnQgaGFzIGRhdGEtaWdub3JlIHRoZW4gc3RvcFxyXG4gICAgICB9IGVsc2UgaWYgKGZvY3VzZWRFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9jdXMtaWdub3JlJykgIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIElmIG5vbmUgb2YgdGhlIGFib3ZlIGlzIHRydWUgdGhlbiBzZXQgdGhlIHRhcmdldCBhcyB0aGUgY3VycmVudGx5IGZvY3VzZWQgZWxlbWVudFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubmV4dFRhcmdldCA9IGZvY3VzZWRFbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIENsZWFyIHRoZSB0aW1lb3V0IG9mIHRoZSBkdXJhdGlvbiBqdXN0IGluIGNhc2UgaWYgdGhlXHJcbiAgICAgICAqIHVzZXIgZm9jdXNlcyBhIG5ldyBlbGVtZW50IGJlZm9yZSB0aGUgdGltZXIgcnVucyBvdXQuXHJcbiAgICAgICAqL1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBJZiB0cmFuc2l0aW9uRW5kIGlzIHN1cHBvcnRlZCBhbmQgd2F0Y2hUcmFuc2l0aW9uRW5kIGlzIGVuYWJsZWRcclxuICAgICAgICogYWRkIGEgY2hlY2sgdG8gbWFrZSB0aGUgZm9jdXNCb3ggcmVjYWxjdWxhdGUgaXRzIHBvc2l0aW9uXHJcbiAgICAgICAqIGlmIHRoZSBmb2N1c2VkIGVsZW1lbnQgaGFzIGEgbG9uZyB0cmFuc2l0aW9uIG9uIGZvY3VzLlxyXG4gICAgICAgKi9cclxuICAgICAgaWYgKHRoaXMudHJhbnNpdGlvbkV2ZW50ICYmIHRoaXMub3B0aW9ucy53YXRjaFRyYW5zaXRpb25FbmQpIHtcclxuICAgICAgICB0aGlzLm5leHRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkV2ZW50LFxyXG4gICAgICAgICAgdGhpcy5tb3ZlRm9jdXNCb3hcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLm9wdGlvbnMub25CZWZvcmVNb3ZlKGN1cnJlbnRFbCwgdGhpcy5uZXh0VGFyZ2V0LCB0aGlzKTtcclxuICAgICAgdGhpcy5tb3ZlRm9jdXNCb3godGhpcy5uZXh0VGFyZ2V0KTtcclxuXHJcbiAgICAgIC8vIElmIHRoZSBmb2N1c2VkIGVsZW1lbnQgaXMgYSBjaGlsZCBvZiB0aGUgbWFpbiBlbGVtZW50IGJ1dCBhbHdheXNBY3RpdmUgZG8gbm90aGluZ1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuYWx3YXlzQWN0aXZlKSB7XHJcbiAgICAgIHRoaXMuaW5TY29wZSA9IGZhbHNlO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgZm9jdXNlZCBpcyBub3QgYSBjaGlsZCBvZiB0aGUgbWFpbiBlbGVtZW50IHN0b3AgYmVpbmcgYWN0aXZlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluU2NvcGUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbmRzIHRoZSBhY3RpdmUgc3RhdGUgb2YgdGhlIGZvY3VzQm94XHJcbiAgICovXHJcbiAgc3RvcCgpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0hhbmRsZXIsIHRydWUpO1xyXG4gICAgdGhpcy5fY2xlYW51cCgpO1xyXG4gICAgdGhpcy5mb2N1c0JveC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMub3B0aW9ucy5hY3RpdmVDbGFzcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlcyB0aGUgZm9jdXNCb3ggdG8gYSB0YXJnZXQgZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7RWxlbWVudHxFdmVudH0gdGFyZ2V0RWxcclxuICAgKi9cclxuICBtb3ZlRm9jdXNCb3godGFyZ2V0RWwpIHtcclxuICAgIC8vIFdoZW4gcGFzc2VkIGFzIGEgaGFuZGxlciB3ZSdsbCBnZXQgdGhlIGV2ZW50IHRhcmdldFxyXG4gICAgaWYgKHRhcmdldEVsIGluc3RhbmNlb2YgRXZlbnQpIHRhcmdldEVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuXHJcbiAgICAvLyBNYXJraW5nIGN1cnJlbnQgZWxlbWVudCBhcyBiZWluZyB0YXJnZXRlZFxyXG4gICAgdGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMudGFyZ2V0Q2xhc3MpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgdG8gc2VlIGlmIHdoYXQgd2UncmUgdGFyZ2V0aW5nIGlzIGFjdHVhbGx5IHN0aWxsIHRoZXJlLlxyXG4gICAgICogVGhlbiBjaGVjayB0byBzZWUgaWYgd2UncmUgdGFyZ2V0aW5nIGEgRE9NIGVsZW1lbnQuIFRoZXJlIHdhc1xyXG4gICAgICogYW4gSUUgaXNzdWUgd2l0aCB0aGUgZG9jdW1lbnQgYW5kIHdpbmRvdyBzb21ldGltZXMgYmVpbmcgdGFyZ2V0ZWRcclxuICAgICAqIGFuZCB0aHJvd2luZyBlcnJvcnMgc2luY2UgeW91IGNhbid0IGdldCB0aGUgcG9zaXRpb24gdmFsdWVzIG9mIHRob3NlLlxyXG4gICAgICovXHJcbiAgICBpZiAoZG9jdW1lbnQuYm9keS5jb250YWlucyh0YXJnZXRFbCkgJiYgdGFyZ2V0RWwgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICAgIGNvbnN0IHJlY3QgPSBhYnNvbHV0ZVBvc2l0aW9uKHRhcmdldEVsKTtcclxuICAgICAgY29uc3Qgd2lkdGggPSBgJHtyZWN0LndpZHRofXB4YDtcclxuICAgICAgY29uc3QgaGVpZ2h0ID0gYCR7cmVjdC5oZWlnaHR9cHhgO1xyXG4gICAgICBjb25zdCBsZWZ0ID0gYCR7cmVjdC5sZWZ0fXB4YDtcclxuICAgICAgY29uc3QgdG9wID0gYCR7cmVjdC50b3B9cHhgO1xyXG5cclxuICAgICAgdGhpcy5mb2N1c0JveC5jbGFzc0xpc3QuYWRkKHRoaXMub3B0aW9ucy5hbmltYXRpbmdDbGFzcyk7XHJcbiAgICAgIHRoaXMuZm9jdXNCb3guY2xhc3NMaXN0LmFkZCh0aGlzLm9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xyXG5cclxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmZvY3VzQm94LnN0eWxlLCB7XHJcbiAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgIGxlZnQsXHJcbiAgICAgICAgdG9wXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gUmVtb3ZlIGFuaW1hdGluZy9hY3RpdmUgY2xhc3MgYWZ0ZXIgdGhlIGR1cmF0aW9uIGVuZHMuXHJcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZm9jdXNCb3guY2xhc3NMaXN0LnJlbW92ZSh0aGlzLm9wdGlvbnMuYW5pbWF0aW5nQ2xhc3MpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmluYWN0aXZlQWZ0ZXJEdXJhdGlvbikge1xyXG4gICAgICAgICAgdGhpcy5mb2N1c0JveC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMub3B0aW9ucy5hY3RpdmVDbGFzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9wdGlvbnMub25BZnRlck1vdmUodGhpcy5wcmV2aW91c1RhcmdldCwgdGFyZ2V0RWwsIHRoaXMpO1xyXG4gICAgICB9LCB0aGlzLm9wdGlvbnMuZHVyYXRpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fY2xlYW51cCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRlc3Ryb3kgbWV0aG9kIHRvIGZyZWUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIHBsdWdpbjpcclxuICAgKiBSZWZlcmVuY2VzLCB1bnJlZ2lzdGVyIGxpc3RlbmVycywgZXRjLlxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICAvLyBSZW1vdmUgZm9jdXNCb3hcclxuICAgIHRoaXMuZm9jdXNCb3gucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmZvY3VzQm94KTtcclxuXHJcbiAgICAvLyBSZW1vdmUgYW55IGV4dHJhIGNsYXNzZXMgZ2l2ZW4gdG8gb3RoZXIgZWxlbWVudHMgaWYgdGhleSBleGlzdFxyXG4gICAgdGhpcy5wcmV2aW91c1RhcmdldCAhPSBudWxsICYmXHJcbiAgICAgIHRoaXMucHJldmlvdXNUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLm9wdGlvbnMudGFyZ2V0Q2xhc3MpO1xyXG4gICAgdGhpcy5uZXh0VGFyZ2V0ICE9IG51bGwgJiZcclxuICAgICAgdGhpcy5uZXh0VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5vcHRpb25zLnRhcmdldENsYXNzKTtcclxuXHJcbiAgICAvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMub25Gb2N1c0hhbmRsZXIsIHRydWUpO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5RG93bkhhbmRsZXIsIGZhbHNlKTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLnN0b3AsIGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMub25EZXN0cm95KHRoaXMpO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJpc09iamVjdCIsInJlcXVpcmUkJDAiLCJkb2N1bWVudCIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwiYW5PYmplY3QiLCJ0b1ByaW1pdGl2ZSIsIklFOF9ET01fREVGSU5FIiwiZFAiLCJjcmVhdGVEZXNjIiwiZ2xvYmFsIiwiY29yZSIsIiR0b1N0cmluZyIsImhhcyIsImhpZGUiLCJhRnVuY3Rpb24iLCJjdHgiLCJyZWRlZmluZSIsImNvZiIsIklPYmplY3QiLCJkZWZpbmVkIiwidG9JbnRlZ2VyIiwibWluIiwidG9JT2JqZWN0IiwidG9MZW5ndGgiLCJ0b0Fic29sdXRlSW5kZXgiLCJ1aWQiLCIka2V5cyIsImVudW1CdWdLZXlzIiwidG9PYmplY3QiLCJnT1BTIiwicElFIiwiZ2V0S2V5cyIsIkRFU0NSSVBUT1JTIiwiJGV4cG9ydCIsImlzUmVnRXhwIiwiTUFUQ0giLCJjb250ZXh0IiwiRWxlbWVudCIsInByb3RvdHlwZSIsIm1hdGNoZXMiLCJtc01hdGNoZXNTZWxlY3RvciIsIndlYmtpdE1hdGNoZXNTZWxlY3RvciIsImNsb3Nlc3QiLCJzIiwiZWwiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50Tm9kZSIsIm5vZGVUeXBlIiwiZXh0ZW5kIiwib2JqIiwibmFtZSIsImNvcHkiLCJ0YXJnZXQiLCJhcmd1bWVudHMiLCJpIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiYWJzb2x1dGVQb3NpdGlvbiIsImZvdW5kIiwibGVmdCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0QmFzZSIsImJvZHkiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJjc3NUZXh0IiwiYXBwZW5kQ2hpbGQiLCJvd25lckRvY3VtZW50IiwiYm91bmRpbmdSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYmFzZVJlY3QiLCJyaWdodCIsImJvdHRvbSIsInRyYW5zaXRpb25zIiwidHJhbnNpdGlvbiIsIk9UcmFuc2l0aW9uIiwiTW96VHJhbnNpdGlvbiIsIldlYmtpdFRyYW5zaXRpb24iLCJ0IiwiRm9jdXNPdmVybGF5IiwiZWxlbWVudCIsIm9wdGlvbnMiLCJhY3RpdmUiLCJzY29wZWRFbCIsImZvY3VzQm94IiwicHJldmlvdXNUYXJnZXQiLCJuZXh0VGFyZ2V0IiwidGltZW91dCIsImluU2NvcGUiLCJ0cmFuc2l0aW9uRXZlbnQiLCJ3aGljaFRyYW5zaXRpb25FdmVudCIsImNsYXNzIiwiYWN0aXZlQ2xhc3MiLCJhbmltYXRpbmdDbGFzcyIsInRhcmdldENsYXNzIiwiekluZGV4IiwiZHVyYXRpb24iLCJpbmFjdGl2ZUFmdGVyRHVyYXRpb24iLCJ0cmlnZ2VyS2V5cyIsImluYWN0aXZlT25Ob25UcmlnZ2VyS2V5IiwiaW5hY3RpdmVPbkNsaWNrIiwiYWx3YXlzQWN0aXZlIiwid2F0Y2hUcmFuc2l0aW9uRW5kIiwib25Jbml0Iiwib25CZWZvcmVNb3ZlIiwib25BZnRlck1vdmUiLCJvbkRlc3Ryb3kiLCJTdHJpbmciLCJxdWVyeVNlbGVjdG9yIiwib25LZXlEb3duSGFuZGxlciIsImJpbmQiLCJvbkZvY3VzSGFuZGxlciIsIm1vdmVGb2N1c0JveCIsInN0b3AiLCJpbml0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9jcmVhdGVGb2N1c0JveCIsImUiLCJjb2RlIiwid2hpY2giLCJpbmNsdWRlcyIsInNldFRpbWVvdXQiLCJhY3RpdmVFbCIsImFjdGl2ZUVsZW1lbnQiLCJIVE1MSUZyYW1lRWxlbWVudCIsImNvbnRhaW5zIiwic2V0QXR0cmlidXRlIiwiY2xhc3NMaXN0IiwiYWRkIiwiT2JqZWN0IiwiYXNzaWduIiwicG9zaXRpb24iLCJwb2ludGVyRXZlbnRzIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwicmVtb3ZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImZvY3VzZWRFbCIsIl9jbGVhbnVwIiwiY3VycmVudEVsIiwiZ2V0QXR0cmlidXRlIiwiZm9jdXNTZWxlY3RvciIsImFzc29jaWF0ZWRFbCIsImlkIiwiY2xlYXJUaW1lb3V0IiwidGFyZ2V0RWwiLCJFdmVudCIsInJlY3QiLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Q0FBQTtDQUNBLElBQUksTUFBTSxHQUFHLGNBQWMsR0FBRyxPQUFPLE1BQU0sSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJO0tBQzdFLE1BQU0sR0FBRyxPQUFPLElBQUksSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSTs7S0FFL0QsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7Q0FDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxRQUFRLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQzs7OztDQ0x6QyxJQUFJLElBQUksR0FBRyxjQUFjLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7Q0FDakQsSUFBSSxPQUFPLEdBQUcsSUFBSSxRQUFRLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQzs7OztDQ0R2QyxhQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7R0FDN0IsT0FBTyxPQUFPLEVBQUUsS0FBSyxRQUFRLEdBQUcsRUFBRSxLQUFLLElBQUksR0FBRyxPQUFPLEVBQUUsS0FBSyxVQUFVLENBQUM7RUFDeEUsQ0FBQzs7Q0NERixhQUFjLEdBQUcsVUFBVSxFQUFFLEVBQUU7R0FDN0IsSUFBSSxDQUFDQSxTQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxTQUFTLENBQUMsRUFBRSxHQUFHLG9CQUFvQixDQUFDLENBQUM7R0FDOUQsT0FBTyxFQUFFLENBQUM7RUFDWCxDQUFDOztDQ0pGLFVBQWMsR0FBRyxVQUFVLElBQUksRUFBRTtHQUMvQixJQUFJO0tBQ0YsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakIsQ0FBQyxPQUFPLENBQUMsRUFBRTtLQUNWLE9BQU8s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
