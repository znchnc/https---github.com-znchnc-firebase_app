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
})({"../node_modules/core-js/library/modules/es6.object.to-string.js":[function(require,module,exports) {

},{}],"../node_modules/core-js/library/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"../node_modules/core-js/library/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"../node_modules/core-js/library/modules/_string-at.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js","./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/_library.js":[function(require,module,exports) {
module.exports = true;

},{}],"../node_modules/core-js/library/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/library/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/library/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"../node_modules/core-js/library/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
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

},{"./_a-function":"../node_modules/core-js/library/modules/_a-function.js"}],"../node_modules/core-js/library/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/library/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"../node_modules/core-js/library/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js"}],"../node_modules/core-js/library/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_ie8-dom-define":"../node_modules/core-js/library/modules/_ie8-dom-define.js","./_to-primitive":"../node_modules/core-js/library/modules/_to-primitive.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js/library/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../node_modules/core-js/library/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_has":"../node_modules/core-js/library/modules/_has.js"}],"../node_modules/core-js/library/modules/_redefine.js":[function(require,module,exports) {
module.exports = require('./_hide');

},{"./_hide":"../node_modules/core-js/library/modules/_hide.js"}],"../node_modules/core-js/library/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/library/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js/library/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"../node_modules/core-js/library/modules/_iobject.js","./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js"}],"../node_modules/core-js/library/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js"}],"../node_modules/core-js/library/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
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

},{"./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./_to-absolute-index":"../node_modules/core-js/library/modules/_to-absolute-index.js"}],"../node_modules/core-js/library/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"../node_modules/core-js/library/modules/_core.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_library":"../node_modules/core-js/library/modules/_library.js"}],"../node_modules/core-js/library/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"../node_modules/core-js/library/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"../node_modules/core-js/library/modules/_shared.js","./_uid":"../node_modules/core-js/library/modules/_uid.js"}],"../node_modules/core-js/library/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"../node_modules/core-js/library/modules/_has.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_array-includes":"../node_modules/core-js/library/modules/_array-includes.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js"}],"../node_modules/core-js/library/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"../node_modules/core-js/library/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/library/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/library/modules/_enum-bug-keys.js"}],"../node_modules/core-js/library/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_object-dps":"../node_modules/core-js/library/modules/_object-dps.js","./_enum-bug-keys":"../node_modules/core-js/library/modules/_enum-bug-keys.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js","./_html":"../node_modules/core-js/library/modules/_html.js"}],"../node_modules/core-js/library/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"../node_modules/core-js/library/modules/_shared.js","./_uid":"../node_modules/core-js/library/modules/_uid.js","./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_has":"../node_modules/core-js/library/modules/_has.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"../node_modules/core-js/library/modules/_object-create.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"../node_modules/core-js/library/modules/_has.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js"}],"../node_modules/core-js/library/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"../node_modules/core-js/library/modules/_library.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_redefine":"../node_modules/core-js/library/modules/_redefine.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_iter-create":"../node_modules/core-js/library/modules/_iter-create.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_object-gpo":"../node_modules/core-js/library/modules/_object-gpo.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/es6.string.iterator.js":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"../node_modules/core-js/library/modules/_string-at.js","./_iter-define":"../node_modules/core-js/library/modules/_iter-define.js"}],"../node_modules/core-js/library/modules/_add-to-unscopables.js":[function(require,module,exports) {
module.exports = function () { /* empty */ };

},{}],"../node_modules/core-js/library/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"../node_modules/core-js/library/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"../node_modules/core-js/library/modules/_add-to-unscopables.js","./_iter-step":"../node_modules/core-js/library/modules/_iter-step.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_iter-define":"../node_modules/core-js/library/modules/_iter-define.js"}],"../node_modules/core-js/library/modules/web.dom.iterable.js":[function(require,module,exports) {

require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./es6.array.iterator":"../node_modules/core-js/library/modules/es6.array.iterator.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_classof.js":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"../node_modules/core-js/library/modules/_cof.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"../node_modules/core-js/library/modules/_iter-call.js":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js"}],"../node_modules/core-js/library/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"../node_modules/core-js/library/modules/_classof.js","./_wks":"../node_modules/core-js/library/modules/_wks.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/core-js/library/modules/_for-of.js":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_iter-call":"../node_modules/core-js/library/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/library/modules/_is-array-iter.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./core.get-iterator-method":"../node_modules/core-js/library/modules/core.get-iterator-method.js"}],"../node_modules/core-js/library/modules/_species-constructor.js":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_a-function":"../node_modules/core-js/library/modules/_a-function.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"../node_modules/core-js/library/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_invoke":"../node_modules/core-js/library/modules/_invoke.js","./_html":"../node_modules/core-js/library/modules/_html.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_microtask.js":[function(require,module,exports) {


var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_task":"../node_modules/core-js/library/modules/_task.js","./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_new-promise-capability.js":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"../node_modules/core-js/library/modules/_a-function.js"}],"../node_modules/core-js/library/modules/_perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"../node_modules/core-js/library/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_promise-resolve.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_new-promise-capability":"../node_modules/core-js/library/modules/_new-promise-capability.js"}],"../node_modules/core-js/library/modules/_redefine-all.js":[function(require,module,exports) {
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":"../node_modules/core-js/library/modules/_hide.js"}],"../node_modules/core-js/library/modules/_set-species.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var core = require('./_core');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_iter-detect.js":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/es6.promise.js":[function(require,module,exports) {


'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"../node_modules/core-js/library/modules/_library.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_classof":"../node_modules/core-js/library/modules/_classof.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_a-function":"../node_modules/core-js/library/modules/_a-function.js","./_an-instance":"../node_modules/core-js/library/modules/_an-instance.js","./_for-of":"../node_modules/core-js/library/modules/_for-of.js","./_species-constructor":"../node_modules/core-js/library/modules/_species-constructor.js","./_task":"../node_modules/core-js/library/modules/_task.js","./_microtask":"../node_modules/core-js/library/modules/_microtask.js","./_new-promise-capability":"../node_modules/core-js/library/modules/_new-promise-capability.js","./_perform":"../node_modules/core-js/library/modules/_perform.js","./_user-agent":"../node_modules/core-js/library/modules/_user-agent.js","./_promise-resolve":"../node_modules/core-js/library/modules/_promise-resolve.js","./_wks":"../node_modules/core-js/library/modules/_wks.js","./_redefine-all":"../node_modules/core-js/library/modules/_redefine-all.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_set-species":"../node_modules/core-js/library/modules/_set-species.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_iter-detect":"../node_modules/core-js/library/modules/_iter-detect.js"}],"../node_modules/core-js/library/modules/es7.promise.finally.js":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_species-constructor":"../node_modules/core-js/library/modules/_species-constructor.js","./_promise-resolve":"../node_modules/core-js/library/modules/_promise-resolve.js"}],"../node_modules/core-js/library/modules/es7.promise.try.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_new-promise-capability":"../node_modules/core-js/library/modules/_new-promise-capability.js","./_perform":"../node_modules/core-js/library/modules/_perform.js"}],"../node_modules/core-js/library/fn/promise.js":[function(require,module,exports) {
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/es6.object.to-string":"../node_modules/core-js/library/modules/es6.object.to-string.js","../modules/es6.string.iterator":"../node_modules/core-js/library/modules/es6.string.iterator.js","../modules/web.dom.iterable":"../node_modules/core-js/library/modules/web.dom.iterable.js","../modules/es6.promise":"../node_modules/core-js/library/modules/es6.promise.js","../modules/es7.promise.finally":"../node_modules/core-js/library/modules/es7.promise.finally.js","../modules/es7.promise.try":"../node_modules/core-js/library/modules/es7.promise.try.js","../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/promise.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/promise");
},{"core-js/library/fn/promise":"../node_modules/core-js/library/fn/promise.js"}],"../node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js":[function(require,module,exports) {
var _Promise = require("@babel/runtime-corejs2/core-js/promise");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    _Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new _Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"@babel/runtime-corejs2/core-js/promise":"../node_modules/@babel/runtime-corejs2/core-js/promise.js"}],"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],"../node_modules/@babel/runtime-corejs2/regenerator/index.js":[function(require,module,exports) {
module.exports = require("regenerator-runtime");
},{"regenerator-runtime":"../node_modules/regenerator-runtime/runtime.js"}],"../node_modules/@firebase/util/dist/index.esm2017.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sha1 = exports.RANDOM_FACTOR = exports.MAX_VALUE_MILLIS = exports.FirebaseError = exports.ErrorFactory = exports.Deferred = exports.CONSTANTS = void 0;
exports.areCookiesEnabled = areCookiesEnabled;
exports.assertionError = exports.assert = void 0;
exports.async = async;
exports.base64urlEncodeWithoutPadding = exports.base64Encode = exports.base64Decode = exports.base64 = void 0;
exports.calculateBackoffMillis = calculateBackoffMillis;
exports.contains = contains;
exports.createMockUserToken = createMockUserToken;
exports.createSubscribe = createSubscribe;
exports.decode = void 0;
exports.deepCopy = deepCopy;
exports.deepEqual = deepEqual;
exports.deepExtend = deepExtend;
exports.errorPrefix = errorPrefix;
exports.extractQuerystring = extractQuerystring;
exports.getGlobal = getGlobal;
exports.getModularInstance = getModularInstance;
exports.getUA = getUA;
exports.isAdmin = void 0;
exports.isBrowser = isBrowser;
exports.isBrowserExtension = isBrowserExtension;
exports.isElectron = isElectron;
exports.isEmpty = isEmpty;
exports.isIE = isIE;
exports.isIndexedDBAvailable = isIndexedDBAvailable;
exports.isMobileCordova = isMobileCordova;
exports.isNode = isNode;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.isSafari = isSafari;
exports.isUWP = isUWP;
exports.issuedAtTime = exports.isValidTimestamp = exports.isValidFormat = void 0;
exports.jsonEval = jsonEval;
exports.map = map;
exports.ordinal = ordinal;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.safeGet = safeGet;
exports.stringToByteArray = exports.stringLength = void 0;
exports.stringify = stringify;
exports.validateArgCount = void 0;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateIndexedDBOpenable = validateIndexedDBOpenable;
exports.validateNamespace = validateNamespace;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
const CONSTANTS = {
  /**
   * @define {boolean} Whether this is the client Node.js SDK.
   */
  NODE_CLIENT: false,

  /**
   * @define {boolean} Whether this is the Admin Node.js SDK.
   */
  NODE_ADMIN: false,

  /**
   * Firebase SDK Version
   */
  SDK_VERSION: '${JSCORE_VERSION}'
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Throws an error if the provided assertion is falsy
 */

exports.CONSTANTS = CONSTANTS;

const assert = function (assertion, message) {
  if (!assertion) {
    throw assertionError(message);
  }
};
/**
 * Returns an Error object suitable for throwing.
 */


exports.assert = assert;

const assertionError = function (message) {
  return new Error('Firebase Database (' + CONSTANTS.SDK_VERSION + ') INTERNAL ASSERT FAILED: ' + message);
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.assertionError = assertionError;

const stringToByteArray$1 = function (str) {
  // TODO(user): Use native implementations if/when available
  const out = [];
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);

    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 0xfc00) === 0xd800 && i + 1 < str.length && (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }

  return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param bytes Array of numbers representing characters.
 * @return Stringification of the array.
 */


const byteArrayToString = function (bytes) {
  // TODO(user): Use native implementations if/when available
  const out = [];
  let pos = 0,
      c = 0;

  while (pos < bytes.length) {
    const c1 = bytes[pos++];

    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      const c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      // Surrogate Pair
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      const c4 = bytes[pos++];
      const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
      out[c++] = String.fromCharCode(0xd800 + (u >> 10));
      out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
    } else {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }

  return out.join('');
}; // We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()


const base64 = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,

  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,

  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,

  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,

  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',

  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + '+/=';
  },

  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + '-_.';
  },

  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob === 'function',

  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error('encodeByteArray takes an array as a parameter');
    }

    this.init_();
    const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    const output = [];

    for (let i = 0; i < input.length; i += 3) {
      const byte1 = input[i];
      const haveByte2 = i + 1 < input.length;
      const byte2 = haveByte2 ? input[i + 1] : 0;
      const haveByte3 = i + 2 < input.length;
      const byte3 = haveByte3 ? input[i + 2] : 0;
      const outByte1 = byte1 >> 2;
      const outByte2 = (byte1 & 0x03) << 4 | byte2 >> 4;
      let outByte3 = (byte2 & 0x0f) << 2 | byte3 >> 6;
      let outByte4 = byte3 & 0x3f;

      if (!haveByte3) {
        outByte4 = 64;

        if (!haveByte2) {
          outByte3 = 64;
        }
      }

      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }

    return output.join('');
  },

  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }

    return this.encodeByteArray(stringToByteArray$1(input), webSafe);
  },

  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }

    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },

  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray(input, webSafe) {
    this.init_();
    const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    const output = [];

    for (let i = 0; i < input.length;) {
      const byte1 = charToByteMap[input.charAt(i++)];
      const haveByte2 = i < input.length;
      const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      const haveByte3 = i < input.length;
      const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      const haveByte4 = i < input.length;
      const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;

      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw Error();
      }

      const outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);

      if (byte3 !== 64) {
        const outByte2 = byte2 << 4 & 0xf0 | byte3 >> 2;
        output.push(outByte2);

        if (byte4 !== 64) {
          const outByte3 = byte3 << 6 & 0xc0 | byte4;
          output.push(outByte3);
        }
      }
    }

    return output;
  },

  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {}; // We want quick mappings back and forth, so we precompute two maps.

      for (let i = 0; i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i; // Be forgiving when decoding and correctly decode both encodings.

        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }

};
/**
 * URL-safe base64 encoding
 */

exports.base64 = base64;

const base64Encode = function (str) {
  const utf8Bytes = stringToByteArray$1(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 encoding (without "." padding in the end).
 * e.g. Used in JSON Web Token (JWT) parts.
 */


exports.base64Encode = base64Encode;

const base64urlEncodeWithoutPadding = function (str) {
  // Use base64url encoding and remove padding in the end (dot characters).
  return base64Encode(str).replace(/\./g, '');
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param str To be decoded
 * @return Decoded result, if possible
 */


exports.base64urlEncodeWithoutPadding = base64urlEncodeWithoutPadding;

const base64Decode = function (str) {
  try {
    return base64.decodeString(str, true);
  } catch (e) {
    console.error('base64Decode failed: ', e);
  }

  return null;
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */


exports.base64Decode = base64Decode;

function deepCopy(value) {
  return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 *
 * Note: we don't merge __proto__ to prevent prototype pollution
 */


function deepExtend(target, source) {
  if (!(source instanceof Object)) {
    return source;
  }

  switch (source.constructor) {
    case Date:
      // Treat Dates like scalars; if the target date object had any child
      // properties - they will be lost!
      const dateValue = source;
      return new Date(dateValue.getTime());

    case Object:
      if (target === undefined) {
        target = {};
      }

      break;

    case Array:
      // Always copy the array source and overwrite the target.
      target = [];
      break;

    default:
      // Not a plain Object - treat it as a scalar.
      return source;
  }

  for (const prop in source) {
    // use isValidKey to guard against prototype pollution. See https://snyk.io/vuln/SNYK-JS-LODASH-450202
    if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
      continue;
    }

    target[prop] = deepExtend(target[prop], source[prop]);
  }

  return target;
}

function isValidKey(key) {
  return key !== '__proto__';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class Deferred {
  constructor() {
    this.reject = () => {};

    this.resolve = () => {};

    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  /**
   * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */


  wrapCallback(callback) {
    return (error, value) => {
      if (error) {
        this.reject(error);
      } else {
        this.resolve(value);
      }

      if (typeof callback === 'function') {
        // Attaching noop handler just in case developer wasn't expecting
        // promises
        this.promise.catch(() => {}); // Some of our callbacks don't expect a value and our own tests
        // assert that the parameter length is 1

        if (callback.length === 1) {
          callback(error);
        } else {
          callback(error, value);
        }
      }
    };
  }

}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.Deferred = Deferred;

function createMockUserToken(token, projectId) {
  if (token.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  } // Unsecured JWTs use "none" as the algorithm.


  const header = {
    alg: 'none',
    type: 'JWT'
  };
  const project = projectId || 'demo-project';
  const iat = token.iat || 0;
  const sub = token.sub || token.user_id;

  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }

  const payload = Object.assign({
    // Set all required fields to decent defaults
    iss: `https://securetoken.google.com/${project}`,
    aud: project,
    iat,
    exp: iat + 3600,
    auth_time: iat,
    sub,
    user_id: sub,
    firebase: {
      sign_in_provider: 'custom',
      identities: {}
    }
  }, token); // Unsecured JWTs use the empty string as a signature.

  const signature = '';
  return [base64urlEncodeWithoutPadding(JSON.stringify(header)), base64urlEncodeWithoutPadding(JSON.stringify(payload)), signature].join('.');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */


function getUA() {
  if (typeof navigator !== 'undefined' && typeof navigator['userAgent'] === 'string') {
    return navigator['userAgent'];
  } else {
    return '';
  }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */


function isMobileCordova() {
  return typeof window !== 'undefined' && // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/


function isNode() {
  try {
    return Object.prototype.toString.call(global.process) === '[object process]';
  } catch (e) {
    return false;
  }
}
/**
 * Detect Browser Environment
 */


function isBrowser() {
  return typeof self === 'object' && self.self === self;
}

function isBrowserExtension() {
  const runtime = typeof chrome === 'object' ? chrome.runtime : typeof browser === 'object' ? browser.runtime : undefined;
  return typeof runtime === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */


function isReactNative() {
  return typeof navigator === 'object' && navigator['product'] === 'ReactNative';
}
/** Detects Electron apps. */


function isElectron() {
  return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */


function isIE() {
  const ua = getUA();
  return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */


function isUWP() {
  return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */


function isNodeSdk() {
  return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
/** Returns true if we are running in Safari. */


function isSafari() {
  return !isNode() && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
}
/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */


function isIndexedDBAvailable() {
  return typeof indexedDB === 'object';
}
/**
 * This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
 * if errors occur during the database open operation.
 *
 * @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
 * private browsing)
 */


function validateIndexedDBOpenable() {
  return new Promise((resolve, reject) => {
    try {
      let preExist = true;
      const DB_CHECK_NAME = 'validate-browser-context-for-indexeddb-analytics-module';
      const request = self.indexedDB.open(DB_CHECK_NAME);

      request.onsuccess = () => {
        request.result.close(); // delete database only when it doesn't pre-exist

        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }

        resolve(true);
      };

      request.onupgradeneeded = () => {
        preExist = false;
      };

      request.onerror = () => {
        var _a;

        reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || '');
      };
    } catch (error) {
      reject(error);
    }
  });
}
/**
 *
 * This method checks whether cookie is enabled within current browser
 * @return true if cookie is enabled within current browser
 */


function areCookiesEnabled() {
  if (typeof navigator === 'undefined' || !navigator.cookieEnabled) {
    return false;
  }

  return true;
}
/**
 * Polyfill for `globalThis` object.
 * @returns the `globalThis` object for the given environment.
 */


function getGlobal() {
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error('Unable to locate global object.');
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Standardized Firebase Error.
 *
 * Usage:
 *
 *   // Typescript string literals for type-safe codes
 *   type Err =
 *     'unknown' |
 *     'object-not-found'
 *     ;
 *
 *   // Closure enum for type-safe error codes
 *   // at-enum {string}
 *   var Err = {
 *     UNKNOWN: 'unknown',
 *     OBJECT_NOT_FOUND: 'object-not-found',
 *   }
 *
 *   let errors: Map<Err, string> = {
 *     'generic-error': "Unknown error",
 *     'file-not-found': "Could not find file: {$file}",
 *   };
 *
 *   // Type-safe function - must pass a valid error code as param.
 *   let error = new ErrorFactory<Err>('service', 'Service', errors);
 *
 *   ...
 *   throw error.create(Err.GENERIC);
 *   ...
 *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
 *   ...
 *   // Service: Could not file file: foo.txt (service/file-not-found).
 *
 *   catch (e) {
 *     assert(e.message === "Could not find file: foo.txt.");
 *     if (e.code === 'service/file-not-found') {
 *       console.log("Could not read file: " + e['file']);
 *     }
 *   }
 */


const ERROR_NAME = 'FirebaseError'; // Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types

class FirebaseError extends Error {
  constructor(code, message, customData) {
    super(message);
    this.code = code;
    this.customData = customData;
    this.name = ERROR_NAME; // Fix For ES5
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    Object.setPrototypeOf(this, FirebaseError.prototype); // Maintains proper stack trace for where our error was thrown.
    // Only available on V8.

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorFactory.prototype.create);
    }
  }

}

exports.FirebaseError = FirebaseError;

class ErrorFactory {
  constructor(service, serviceName, errors) {
    this.service = service;
    this.serviceName = serviceName;
    this.errors = errors;
  }

  create(code, ...data) {
    const customData = data[0] || {};
    const fullCode = `${this.service}/${code}`;
    const template = this.errors[code];
    const message = template ? replaceTemplate(template, customData) : 'Error'; // Service Name: Error message (service/code).

    const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
    const error = new FirebaseError(fullCode, fullMessage, customData);
    return error;
  }

}

exports.ErrorFactory = ErrorFactory;

function replaceTemplate(template, data) {
  return template.replace(PATTERN, (_, key) => {
    const value = data[key];
    return value != null ? String(value) : `<${key}?>`;
  });
}

const PATTERN = /\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */

function jsonEval(str) {
  return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data Javascript object to be stringified.
 * @return {string} The JSON contents of the object.
 */


function stringify(data) {
  return JSON.stringify(data);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


const decode = function (token) {
  let header = {},
      claims = {},
      data = {},
      signature = '';

  try {
    const parts = token.split('.');
    header = jsonEval(base64Decode(parts[0]) || '');
    claims = jsonEval(base64Decode(parts[1]) || '');
    signature = parts[2];
    data = claims['d'] || {};
    delete claims['d'];
  } catch (e) {}

  return {
    header,
    claims,
    data,
    signature
  };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.decode = decode;

const isValidTimestamp = function (token) {
  const claims = decode(token).claims;
  const now = Math.floor(new Date().getTime() / 1000);
  let validSince = 0,
      validUntil = 0;

  if (typeof claims === 'object') {
    if (claims.hasOwnProperty('nbf')) {
      validSince = claims['nbf'];
    } else if (claims.hasOwnProperty('iat')) {
      validSince = claims['iat'];
    }

    if (claims.hasOwnProperty('exp')) {
      validUntil = claims['exp'];
    } else {
      // token will expire after 24h by default
      validUntil = validSince + 86400;
    }
  }

  return !!now && !!validSince && !!validUntil && now >= validSince && now <= validUntil;
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.isValidTimestamp = isValidTimestamp;

const issuedAtTime = function (token) {
  const claims = decode(token).claims;

  if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
    return claims['iat'];
  }

  return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.issuedAtTime = issuedAtTime;

const isValidFormat = function (token) {
  const decoded = decode(token),
        claims = decoded.claims;
  return !!claims && typeof claims === 'object' && claims.hasOwnProperty('iat');
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */


exports.isValidFormat = isValidFormat;

const isAdmin = function (token) {
  const claims = decode(token).claims;
  return typeof claims === 'object' && claims['admin'] === true;
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.isAdmin = isAdmin;

function contains(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function safeGet(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  } else {
    return undefined;
  }
}

function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
}

function map(obj, fn, contextObj) {
  const res = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = fn.call(contextObj, obj[key], key, obj);
    }
  }

  return res;
}
/**
 * Deep equal two objects. Support Arrays and Objects.
 */


function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  for (const k of aKeys) {
    if (!bKeys.includes(k)) {
      return false;
    }

    const aProp = a[k];
    const bProp = b[k];

    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }

  for (const k of bKeys) {
    if (!aKeys.includes(k)) {
      return false;
    }
  }

  return true;
}

function isObject(thing) {
  return thing !== null && typeof thing === 'object';
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
 * params object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 */


function querystring(querystringParams) {
  const params = [];

  for (const [key, value] of Object.entries(querystringParams)) {
    if (Array.isArray(value)) {
      value.forEach(arrayVal => {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }

  return params.length ? '&' + params.join('&') : '';
}
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
 * (e.g. {arg: 'val', arg2: 'val2'})
 */


function querystringDecode(querystring) {
  const obj = {};
  const tokens = querystring.replace(/^\?/, '').split('&');
  tokens.forEach(token => {
    if (token) {
      const [key, value] = token.split('=');
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  return obj;
}
/**
 * Extract the query string part of a URL, including the leading question mark (if present).
 */


function extractQuerystring(url) {
  const queryStart = url.indexOf('?');

  if (!queryStart) {
    return '';
  }

  const fragmentStart = url.indexOf('#', queryStart);
  return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : undefined);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */

/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @final
 * @struct
 */


class Sha1 {
  constructor() {
    /**
     * Holds the previous values of accumulated variables a-e in the compress_
     * function.
     * @private
     */
    this.chain_ = [];
    /**
     * A buffer holding the partially computed hash result.
     * @private
     */

    this.buf_ = [];
    /**
     * An array of 80 bytes, each a part of the message to be hashed.  Referred to
     * as the message schedule in the docs.
     * @private
     */

    this.W_ = [];
    /**
     * Contains data needed to pad messages less than 64 bytes.
     * @private
     */

    this.pad_ = [];
    /**
     * @private {number}
     */

    this.inbuf_ = 0;
    /**
     * @private {number}
     */

    this.total_ = 0;
    this.blockSize = 512 / 8;
    this.pad_[0] = 128;

    for (let i = 1; i < this.blockSize; ++i) {
      this.pad_[i] = 0;
    }

    this.reset();
  }

  reset() {
    this.chain_[0] = 0x67452301;
    this.chain_[1] = 0xefcdab89;
    this.chain_[2] = 0x98badcfe;
    this.chain_[3] = 0x10325476;
    this.chain_[4] = 0xc3d2e1f0;
    this.inbuf_ = 0;
    this.total_ = 0;
  }
  /**
   * Internal compress helper function.
   * @param buf Block to compress.
   * @param offset Offset of the block in the buffer.
   * @private
   */


  compress_(buf, offset) {
    if (!offset) {
      offset = 0;
    }

    const W = this.W_; // get 16 big endian words

    if (typeof buf === 'string') {
      for (let i = 0; i < 16; i++) {
        // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
        // have a bug that turns the post-increment ++ operator into pre-increment
        // during JIT compilation.  We have code that depends heavily on SHA-1 for
        // correctness and which is affected by this bug, so I've removed all uses
        // of post-increment ++ in which the result value is used.  We can revert
        // this change once the Safari bug
        // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
        // most clients have been updated.
        W[i] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
        offset += 4;
      }
    } else {
      for (let i = 0; i < 16; i++) {
        W[i] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
        offset += 4;
      }
    } // expand to 80 words


    for (let i = 16; i < 80; i++) {
      const t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
      W[i] = (t << 1 | t >>> 31) & 0xffffffff;
    }

    let a = this.chain_[0];
    let b = this.chain_[1];
    let c = this.chain_[2];
    let d = this.chain_[3];
    let e = this.chain_[4];
    let f, k; // TODO(user): Try to unroll this loop to speed up the computation.

    for (let i = 0; i < 80; i++) {
      if (i < 40) {
        if (i < 20) {
          f = d ^ b & (c ^ d);
          k = 0x5a827999;
        } else {
          f = b ^ c ^ d;
          k = 0x6ed9eba1;
        }
      } else {
        if (i < 60) {
          f = b & c | d & (b | c);
          k = 0x8f1bbcdc;
        } else {
          f = b ^ c ^ d;
          k = 0xca62c1d6;
        }
      }

      const t = (a << 5 | a >>> 27) + f + e + k + W[i] & 0xffffffff;
      e = d;
      d = c;
      c = (b << 30 | b >>> 2) & 0xffffffff;
      b = a;
      a = t;
    }

    this.chain_[0] = this.chain_[0] + a & 0xffffffff;
    this.chain_[1] = this.chain_[1] + b & 0xffffffff;
    this.chain_[2] = this.chain_[2] + c & 0xffffffff;
    this.chain_[3] = this.chain_[3] + d & 0xffffffff;
    this.chain_[4] = this.chain_[4] + e & 0xffffffff;
  }

  update(bytes, length) {
    // TODO(johnlenz): tighten the function signature and remove this check
    if (bytes == null) {
      return;
    }

    if (length === undefined) {
      length = bytes.length;
    }

    const lengthMinusBlock = length - this.blockSize;
    let n = 0; // Using local instead of member variables gives ~5% speedup on Firefox 16.

    const buf = this.buf_;
    let inbuf = this.inbuf_; // The outer while loop should execute at most twice.

    while (n < length) {
      // When we have no data in the block to top up, we can directly process the
      // input buffer (assuming it contains sufficient data). This gives ~25%
      // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
      // the data is provided in large chunks (or in multiples of 64 bytes).
      if (inbuf === 0) {
        while (n <= lengthMinusBlock) {
          this.compress_(bytes, n);
          n += this.blockSize;
        }
      }

      if (typeof bytes === 'string') {
        while (n < length) {
          buf[inbuf] = bytes.charCodeAt(n);
          ++inbuf;
          ++n;

          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0; // Jump to the outer loop so we use the full-block optimization.

            break;
          }
        }
      } else {
        while (n < length) {
          buf[inbuf] = bytes[n];
          ++inbuf;
          ++n;

          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0; // Jump to the outer loop so we use the full-block optimization.

            break;
          }
        }
      }
    }

    this.inbuf_ = inbuf;
    this.total_ += length;
  }
  /** @override */


  digest() {
    const digest = [];
    let totalBits = this.total_ * 8; // Add pad 0x80 0x00*.

    if (this.inbuf_ < 56) {
      this.update(this.pad_, 56 - this.inbuf_);
    } else {
      this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
    } // Add # bits.


    for (let i = this.blockSize - 1; i >= 56; i--) {
      this.buf_[i] = totalBits & 255;
      totalBits /= 256; // Don't use bit-shifting here!
    }

    this.compress_(this.buf_);
    let n = 0;

    for (let i = 0; i < 5; i++) {
      for (let j = 24; j >= 0; j -= 8) {
        digest[n] = this.chain_[i] >> j & 255;
        ++n;
      }
    }

    return digest;
  }

}
/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */


exports.Sha1 = Sha1;

function createSubscribe(executor, onNoObservers) {
  const proxy = new ObserverProxy(executor, onNoObservers);
  return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */


class ObserverProxy {
  /**
   * @param executor Function which can make calls to a single Observer
   *     as a proxy.
   * @param onNoObservers Callback when count of Observers goes to zero.
   */
  constructor(executor, onNoObservers) {
    this.observers = [];
    this.unsubscribes = [];
    this.observerCount = 0; // Micro-task scheduling by calling task.then().

    this.task = Promise.resolve();
    this.finalized = false;
    this.onNoObservers = onNoObservers; // Call the executor asynchronously so subscribers that are called
    // synchronously after the creation of the subscribe function
    // can still receive the very first value generated in the executor.

    this.task.then(() => {
      executor(this);
    }).catch(e => {
      this.error(e);
    });
  }

  next(value) {
    this.forEachObserver(observer => {
      observer.next(value);
    });
  }

  error(error) {
    this.forEachObserver(observer => {
      observer.error(error);
    });
    this.close(error);
  }

  complete() {
    this.forEachObserver(observer => {
      observer.complete();
    });
    this.close();
  }
  /**
   * Subscribe function that can be used to add an Observer to the fan-out list.
   *
   * - We require that no event is sent to a subscriber sychronously to their
   *   call to subscribe().
   */


  subscribe(nextOrObserver, error, complete) {
    let observer;

    if (nextOrObserver === undefined && error === undefined && complete === undefined) {
      throw new Error('Missing Observer.');
    } // Assemble an Observer object when passed as callback functions.


    if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
      observer = nextOrObserver;
    } else {
      observer = {
        next: nextOrObserver,
        error,
        complete
      };
    }

    if (observer.next === undefined) {
      observer.next = noop;
    }

    if (observer.error === undefined) {
      observer.error = noop;
    }

    if (observer.complete === undefined) {
      observer.complete = noop;
    }

    const unsub = this.unsubscribeOne.bind(this, this.observers.length); // Attempt to subscribe to a terminated Observable - we
    // just respond to the Observer with the final error or complete
    // event.

    if (this.finalized) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.task.then(() => {
        try {
          if (this.finalError) {
            observer.error(this.finalError);
          } else {
            observer.complete();
          }
        } catch (e) {// nothing
        }

        return;
      });
    }

    this.observers.push(observer);
    return unsub;
  } // Unsubscribe is synchronous - we guarantee that no events are sent to
  // any unsubscribed Observer.


  unsubscribeOne(i) {
    if (this.observers === undefined || this.observers[i] === undefined) {
      return;
    }

    delete this.observers[i];
    this.observerCount -= 1;

    if (this.observerCount === 0 && this.onNoObservers !== undefined) {
      this.onNoObservers(this);
    }
  }

  forEachObserver(fn) {
    if (this.finalized) {
      // Already closed by previous event....just eat the additional values.
      return;
    } // Since sendOne calls asynchronously - there is no chance that
    // this.observers will become undefined.


    for (let i = 0; i < this.observers.length; i++) {
      this.sendOne(i, fn);
    }
  } // Call the Observer via one of it's callback function. We are careful to
  // confirm that the observe has not been unsubscribed since this asynchronous
  // function had been queued.


  sendOne(i, fn) {
    // Execute the callback asynchronously
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.task.then(() => {
      if (this.observers !== undefined && this.observers[i] !== undefined) {
        try {
          fn(this.observers[i]);
        } catch (e) {
          // Ignore exceptions raised in Observers or missing methods of an
          // Observer.
          // Log error to console. b/31404806
          if (typeof console !== 'undefined' && console.error) {
            console.error(e);
          }
        }
      }
    });
  }

  close(err) {
    if (this.finalized) {
      return;
    }

    this.finalized = true;

    if (err !== undefined) {
      this.finalError = err;
    } // Proxy is no longer needed - garbage collect references
    // eslint-disable-next-line @typescript-eslint/no-floating-promises


    this.task.then(() => {
      this.observers = undefined;
      this.onNoObservers = undefined;
    });
  }

}
/** Turn synchronous function into one called asynchronously. */
// eslint-disable-next-line @typescript-eslint/ban-types


function async(fn, onError) {
  return (...args) => {
    Promise.resolve(true).then(() => {
      fn(...args);
    }).catch(error => {
      if (onError) {
        onError(error);
      }
    });
  };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */


function implementsAnyMethods(obj, methods) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  for (const method of methods) {
    if (method in obj && typeof obj[method] === 'function') {
      return true;
    }
  }

  return false;
}

function noop() {// do nothing
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param fnName The function name
 * @param minCount The minimum number of arguments to allow for the function call
 * @param maxCount The maximum number of argument to allow for the function call
 * @param argCount The actual number of arguments provided.
 */


const validateArgCount = function (fnName, minCount, maxCount, argCount) {
  let argError;

  if (argCount < minCount) {
    argError = 'at least ' + minCount;
  } else if (argCount > maxCount) {
    argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
  }

  if (argError) {
    const error = fnName + ' failed: Was called with ' + argCount + (argCount === 1 ? ' argument.' : ' arguments.') + ' Expects ' + argError + '.';
    throw new Error(error);
  }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param fnName The function name
 * @param argName The name of the argument
 * @return The prefix to add to the error thrown for validation.
 */


exports.validateArgCount = validateArgCount;

function errorPrefix(fnName, argName) {
  return `${fnName} failed: ${argName} argument `;
}
/**
 * @param fnName
 * @param argumentNumber
 * @param namespace
 * @param optional
 */


function validateNamespace(fnName, namespace, optional) {
  if (optional && !namespace) {
    return;
  }

  if (typeof namespace !== 'string') {
    //TODO: I should do more validation here. We only allow certain chars in namespaces.
    throw new Error(errorPrefix(fnName, 'namespace') + 'must be a valid firebase namespace.');
  }
}

function validateCallback(fnName, argumentName, // eslint-disable-next-line @typescript-eslint/ban-types
callback, optional) {
  if (optional && !callback) {
    return;
  }

  if (typeof callback !== 'function') {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid function.');
  }
}

function validateContextObject(fnName, argumentName, context, optional) {
  if (optional && !context) {
    return;
  }

  if (typeof context !== 'object' || context === null) {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid context object.');
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3

/**
 * @param {string} str
 * @return {Array}
 */


const stringToByteArray = function (str) {
  const out = [];
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i); // Is this the lead surrogate in a surrogate pair?

    if (c >= 0xd800 && c <= 0xdbff) {
      const high = c - 0xd800; // the high 10 bits.

      i++;
      assert(i < str.length, 'Surrogate pair missing trail surrogate.');
      const low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.

      c = 0x10000 + (high << 10) + low;
    }

    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if (c < 65536) {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }

  return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */


exports.stringToByteArray = stringToByteArray;

const stringLength = function (str) {
  let p = 0;

  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);

    if (c < 128) {
      p++;
    } else if (c < 2048) {
      p += 2;
    } else if (c >= 0xd800 && c <= 0xdbff) {
      // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
      p += 4;
      i++; // skip trail surrogate.
    } else {
      p += 3;
    }
  }

  return p;
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The amount of milliseconds to exponentially increase.
 */


exports.stringLength = stringLength;
const DEFAULT_INTERVAL_MILLIS = 1000;
/**
 * The factor to backoff by.
 * Should be a number greater than 1.
 */

const DEFAULT_BACKOFF_FACTOR = 2;
/**
 * The maximum milliseconds to increase to.
 *
 * <p>Visible for testing
 */

const MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000; // Four hours, like iOS and Android.

/**
 * The percentage of backoff time to randomize by.
 * See
 * http://go/safe-client-behavior#step-1-determine-the-appropriate-retry-interval-to-handle-spike-traffic
 * for context.
 *
 * <p>Visible for testing
 */

exports.MAX_VALUE_MILLIS = MAX_VALUE_MILLIS;
const RANDOM_FACTOR = 0.5;
/**
 * Based on the backoff method from
 * https://github.com/google/closure-library/blob/master/closure/goog/math/exponentialbackoff.js.
 * Extracted here so we don't need to pass metadata and a stateful ExponentialBackoff object around.
 */

exports.RANDOM_FACTOR = RANDOM_FACTOR;

function calculateBackoffMillis(backoffCount, intervalMillis = DEFAULT_INTERVAL_MILLIS, backoffFactor = DEFAULT_BACKOFF_FACTOR) {
  // Calculates an exponentially increasing value.
  // Deviation: calculates value from count and a constant interval, so we only need to save value
  // and count to restore state.
  const currBaseValue = intervalMillis * Math.pow(backoffFactor, backoffCount); // A random "fuzz" to avoid waves of retries.
  // Deviation: randomFactor is required.

  const randomWait = Math.round( // A fraction of the backoff value to add/subtract.
  // Deviation: changes multiplication order to improve readability.
  RANDOM_FACTOR * currBaseValue * ( // A random float (rounded to int by Math.round above) in the range [-1, 1]. Determines
  // if we add or subtract.
  Math.random() - 0.5) * 2); // Limits backoff to max to avoid effectively permanent backoff.

  return Math.min(MAX_VALUE_MILLIS, currBaseValue + randomWait);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provide English ordinal letters after a number
 */


function ordinal(i) {
  if (!Number.isFinite(i)) {
    return `${i}`;
  }

  return i + indicator(i);
}

function indicator(i) {
  i = Math.abs(i);
  const cent = i % 100;

  if (cent >= 10 && cent <= 20) {
    return 'th';
  }

  const dec = i % 10;

  if (dec === 1) {
    return 'st';
  }

  if (dec === 2) {
    return 'nd';
  }

  if (dec === 3) {
    return 'rd';
  }

  return 'th';
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}
},{}],"../node_modules/@firebase/component/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = exports.ComponentContainer = exports.Component = void 0;

var _util = require("@firebase/util");

/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
class Component {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(name, instanceFactory, type) {
    this.name = name;
    this.instanceFactory = instanceFactory;
    this.type = type;
    this.multipleInstances = false;
    /**
     * Properties to be added to the service namespace
     */

    this.serviceProps = {};
    this.instantiationMode = "LAZY"
    /* LAZY */
    ;
    this.onInstanceCreated = null;
  }

  setInstantiationMode(mode) {
    this.instantiationMode = mode;
    return this;
  }

  setMultipleInstances(multipleInstances) {
    this.multipleInstances = multipleInstances;
    return this;
  }

  setServiceProps(props) {
    this.serviceProps = props;
    return this;
  }

  setInstanceCreatedCallback(callback) {
    this.onInstanceCreated = callback;
    return this;
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.Component = Component;
const DEFAULT_ENTRY_NAME = '[DEFAULT]';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */

class Provider {
  constructor(name, container) {
    this.name = name;
    this.container = container;
    this.component = null;
    this.instances = new Map();
    this.instancesDeferred = new Map();
    this.instancesOptions = new Map();
    this.onInitCallbacks = new Map();
  }
  /**
   * @param identifier A provider can provide mulitple instances of a service
   * if this.component.multipleInstances is true.
   */


  get(identifier) {
    // if multipleInstances is not supported, use the default name
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);

    if (!this.instancesDeferred.has(normalizedIdentifier)) {
      const deferred = new _util.Deferred();
      this.instancesDeferred.set(normalizedIdentifier, deferred);

      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        // initialize the service if it can be auto-initialized
        try {
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });

          if (instance) {
            deferred.resolve(instance);
          }
        } catch (e) {// when the instance factory throws an exception during get(), it should not cause
          // a fatal error. We just return the unresolved promise in this case.
        }
      }
    }

    return this.instancesDeferred.get(normalizedIdentifier).promise;
  }

  getImmediate(options) {
    var _a; // if multipleInstances is not supported, use the default name


    const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
    const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;

    if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
      try {
        return this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
      } catch (e) {
        if (optional) {
          return null;
        } else {
          throw e;
        }
      }
    } else {
      // In case a component is not initialized and should/can not be auto-initialized at the moment, return null if the optional flag is set, or throw
      if (optional) {
        return null;
      } else {
        throw Error(`Service ${this.name} is not available`);
      }
    }
  }

  getComponent() {
    return this.component;
  }

  setComponent(component) {
    if (component.name !== this.name) {
      throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
    }

    if (this.component) {
      throw Error(`Component for ${this.name} has already been provided`);
    }

    this.component = component; // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)

    if (!this.shouldAutoInitialize()) {
      return;
    } // if the service is eager, initialize the default instance


    if (isComponentEager(component)) {
      try {
        this.getOrInitializeService({
          instanceIdentifier: DEFAULT_ENTRY_NAME
        });
      } catch (e) {// when the instance factory for an eager Component throws an exception during the eager
        // initialization, it should not cause a fatal error.
        // TODO: Investigate if we need to make it configurable, because some component may want to cause
        // a fatal error in this case?
      }
    } // Create service instances for the pending promises and resolve them
    // NOTE: if this.multipleInstances is false, only the default instance will be created
    // and all promises with resolve with it regardless of the identifier.


    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);

      try {
        // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
        instanceDeferred.resolve(instance);
      } catch (e) {// when the instance factory throws an exception, it should not cause
        // a fatal error. We just leave the promise unresolved.
      }
    }
  }

  clearInstance(identifier = DEFAULT_ENTRY_NAME) {
    this.instancesDeferred.delete(identifier);
    this.instancesOptions.delete(identifier);
    this.instances.delete(identifier);
  } // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?


  async delete() {
    const services = Array.from(this.instances.values());
    await Promise.all([...services.filter(service => 'INTERNAL' in service) // legacy services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service.INTERNAL.delete()), ...services.filter(service => '_delete' in service) // modularized services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service._delete())]);
  }

  isComponentSet() {
    return this.component != null;
  }

  isInitialized(identifier = DEFAULT_ENTRY_NAME) {
    return this.instances.has(identifier);
  }

  getOptions(identifier = DEFAULT_ENTRY_NAME) {
    return this.instancesOptions.get(identifier) || {};
  }

  initialize(opts = {}) {
    const {
      options = {}
    } = opts;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);

    if (this.isInitialized(normalizedIdentifier)) {
      throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
    }

    if (!this.isComponentSet()) {
      throw Error(`Component ${this.name} has not been registered yet`);
    }

    const instance = this.getOrInitializeService({
      instanceIdentifier: normalizedIdentifier,
      options
    }); // resolve any pending promise waiting for the service instance

    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);

      if (normalizedIdentifier === normalizedDeferredIdentifier) {
        instanceDeferred.resolve(instance);
      }
    }

    return instance;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */


  onInit(callback, identifier) {
    var _a;

    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
    existingCallbacks.add(callback);
    this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
    const existingInstance = this.instances.get(normalizedIdentifier);

    if (existingInstance) {
      callback(existingInstance, normalizedIdentifier);
    }

    return () => {
      existingCallbacks.delete(callback);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */


  invokeOnInitCallbacks(instance, identifier) {
    const callbacks = this.onInitCallbacks.get(identifier);

    if (!callbacks) {
      return;
    }

    for (const callback of callbacks) {
      try {
        callback(instance, identifier);
      } catch (_a) {// ignore errors in the onInit callback
      }
    }
  }

  getOrInitializeService({
    instanceIdentifier,
    options = {}
  }) {
    let instance = this.instances.get(instanceIdentifier);

    if (!instance && this.component) {
      instance = this.component.instanceFactory(this.container, {
        instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
        options
      });
      this.instances.set(instanceIdentifier, instance);
      this.instancesOptions.set(instanceIdentifier, options);
      /**
       * Invoke onInit listeners.
       * Note this.component.onInstanceCreated is different, which is used by the component creator,
       * while onInit listeners are registered by consumers of the provider.
       */

      this.invokeOnInitCallbacks(instance, instanceIdentifier);
      /**
       * Order is important
       * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
       * makes `isInitialized()` return true.
       */

      if (this.component.onInstanceCreated) {
        try {
          this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
        } catch (_a) {// ignore errors in the onInstanceCreatedCallback
        }
      }
    }

    return instance || null;
  }

  normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
    if (this.component) {
      return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
    } else {
      return identifier; // assume multiple instances are supported before the component is provided.
    }
  }

  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT"
    /* EXPLICIT */
    ;
  }

} // undefined should be passed to the service factory for the default instance


exports.Provider = Provider;

function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}

function isComponentEager(component) {
  return component.instantiationMode === "EAGER"
  /* EAGER */
  ;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */


class ComponentContainer {
  constructor(name) {
    this.name = name;
    this.providers = new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */


  addComponent(component) {
    const provider = this.getProvider(component.name);

    if (provider.isComponentSet()) {
      throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
    }

    provider.setComponent(component);
  }

  addOrOverwriteComponent(component) {
    const provider = this.getProvider(component.name);

    if (provider.isComponentSet()) {
      // delete the existing provider from the container, so we can register the new component
      this.providers.delete(component.name);
    }

    this.addComponent(component);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */


  getProvider(name) {
    if (this.providers.has(name)) {
      return this.providers.get(name);
    } // create a Provider for a service that hasn't registered with Firebase


    const provider = new Provider(name, this);
    this.providers.set(name, provider);
    return provider;
  }

  getProviders() {
    return Array.from(this.providers.values());
  }

}

exports.ComponentContainer = ComponentContainer;
},{"@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js"}],"../node_modules/@firebase/logger/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = exports.LogLevel = void 0;
exports.setLogLevel = setLogLevel;
exports.setUserLogHandler = setUserLogHandler;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A container for all of the Logger instances
 */
const instances = [];
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */

var LogLevel;
exports.LogLevel = LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
  LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
  LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (exports.LogLevel = LogLevel = {}));

const levelStringToEnum = {
  'debug': LogLevel.DEBUG,
  'verbose': LogLevel.VERBOSE,
  'info': LogLevel.INFO,
  'warn': LogLevel.WARN,
  'error': LogLevel.ERROR,
  'silent': LogLevel.SILENT
};
/**
 * The default log level
 */

const defaultLogLevel = LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */

const ConsoleMethod = {
  [LogLevel.DEBUG]: 'log',
  [LogLevel.VERBOSE]: 'log',
  [LogLevel.INFO]: 'info',
  [LogLevel.WARN]: 'warn',
  [LogLevel.ERROR]: 'error'
};
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */

const defaultLogHandler = (instance, logType, ...args) => {
  if (logType < instance.logLevel) {
    return;
  }

  const now = new Date().toISOString();
  const method = ConsoleMethod[logType];

  if (method) {
    console[method](`[${now}]  ${instance.name}:`, ...args);
  } else {
    throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
  }
};

class Logger {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(name) {
    this.name = name;
    /**
     * The log level of the given Logger instance.
     */

    this._logLevel = defaultLogLevel;
    /**
     * The main (internal) log handler for the Logger instance.
     * Can be set to a new function in internal package code but not by user.
     */

    this._logHandler = defaultLogHandler;
    /**
     * The optional, additional, user-defined log handler for the Logger instance.
     */

    this._userLogHandler = null;
    /**
     * Capture the current instance for later use
     */

    instances.push(this);
  }

  get logLevel() {
    return this._logLevel;
  }

  set logLevel(val) {
    if (!(val in LogLevel)) {
      throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
    }

    this._logLevel = val;
  } // Workaround for setter/getter having to be the same type.


  setLogLevel(val) {
    this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
  }

  get logHandler() {
    return this._logHandler;
  }

  set logHandler(val) {
    if (typeof val !== 'function') {
      throw new TypeError('Value assigned to `logHandler` must be a function');
    }

    this._logHandler = val;
  }

  get userLogHandler() {
    return this._userLogHandler;
  }

  set userLogHandler(val) {
    this._userLogHandler = val;
  }
  /**
   * The functions below are all based on the `console` interface
   */


  debug(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);

    this._logHandler(this, LogLevel.DEBUG, ...args);
  }

  log(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);

    this._logHandler(this, LogLevel.VERBOSE, ...args);
  }

  info(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);

    this._logHandler(this, LogLevel.INFO, ...args);
  }

  warn(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);

    this._logHandler(this, LogLevel.WARN, ...args);
  }

  error(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);

    this._logHandler(this, LogLevel.ERROR, ...args);
  }

}

exports.Logger = Logger;

function setLogLevel(level) {
  instances.forEach(inst => {
    inst.setLogLevel(level);
  });
}

function setUserLogHandler(logCallback, options) {
  for (const instance of instances) {
    let customLogLevel = null;

    if (options && options.level) {
      customLogLevel = levelStringToEnum[options.level];
    }

    if (logCallback === null) {
      instance.userLogHandler = null;
    } else {
      instance.userLogHandler = (instance, level, ...args) => {
        const message = args.map(arg => {
          if (arg == null) {
            return null;
          } else if (typeof arg === 'string') {
            return arg;
          } else if (typeof arg === 'number' || typeof arg === 'boolean') {
            return arg.toString();
          } else if (arg instanceof Error) {
            return arg.message;
          } else {
            try {
              return JSON.stringify(arg);
            } catch (ignored) {
              return null;
            }
          }
        }).filter(arg => arg).join(' ');

        if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance.logLevel)) {
          logCallback({
            level: LogLevel[level].toLowerCase(),
            message,
            args,
            type: instance.name
          });
        }
      };
    }
  }
}
},{}],"../node_modules/@firebase/app/dist/esm/index.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FirebaseError", {
  enumerable: true,
  get: function () {
    return _util.FirebaseError;
  }
});
exports._DEFAULT_ENTRY_NAME = exports.SDK_VERSION = void 0;
exports._addComponent = _addComponent;
exports._addOrOverwriteComponent = _addOrOverwriteComponent;
exports._apps = void 0;
exports._clearComponents = _clearComponents;
exports._components = void 0;
exports._getProvider = _getProvider;
exports._registerComponent = _registerComponent;
exports._removeServiceInstance = _removeServiceInstance;
exports.deleteApp = deleteApp;
exports.getApp = getApp;
exports.getApps = getApps;
exports.initializeApp = initializeApp;
exports.onLog = onLog;
exports.registerVersion = registerVersion;
exports.setLogLevel = setLogLevel;

var _component = require("@firebase/component");

var _logger = require("@firebase/logger");

var _util = require("@firebase/util");

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PlatformLoggerServiceImpl {
  constructor(container) {
    this.container = container;
  } // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.


  getPlatformInfoString() {
    const providers = this.container.getProviders(); // Loop through providers and get library/version pairs from any that are
    // version components.

    return providers.map(provider => {
      if (isVersionServiceProvider(provider)) {
        const service = provider.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter(logString => logString).join(' ');
  }

}
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */


function isVersionServiceProvider(provider) {
  const component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION"
  /* VERSION */
  ;
}

const name$o = "@firebase/app";
const version$1 = "0.7.11";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const logger = new _logger.Logger('@firebase/app');
const name$n = "@firebase/app-compat";
const name$m = "@firebase/analytics-compat";
const name$l = "@firebase/analytics";
const name$k = "@firebase/app-check-compat";
const name$j = "@firebase/app-check";
const name$i = "@firebase/auth";
const name$h = "@firebase/auth-compat";
const name$g = "@firebase/database";
const name$f = "@firebase/database-compat";
const name$e = "@firebase/functions";
const name$d = "@firebase/functions-compat";
const name$c = "@firebase/installations";
const name$b = "@firebase/installations-compat";
const name$a = "@firebase/messaging";
const name$9 = "@firebase/messaging-compat";
const name$8 = "@firebase/performance";
const name$7 = "@firebase/performance-compat";
const name$6 = "@firebase/remote-config";
const name$5 = "@firebase/remote-config-compat";
const name$4 = "@firebase/storage";
const name$3 = "@firebase/storage-compat";
const name$2 = "@firebase/firestore";
const name$1 = "@firebase/firestore-compat";
const name = "firebase";
const version = "9.6.1";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The default app name
 *
 * @internal
 */

const DEFAULT_ENTRY_NAME = '[DEFAULT]';
exports._DEFAULT_ENTRY_NAME = DEFAULT_ENTRY_NAME;
const PLATFORM_LOG_STRING = {
  [name$o]: 'fire-core',
  [name$n]: 'fire-core-compat',
  [name$l]: 'fire-analytics',
  [name$m]: 'fire-analytics-compat',
  [name$j]: 'fire-app-check',
  [name$k]: 'fire-app-check-compat',
  [name$i]: 'fire-auth',
  [name$h]: 'fire-auth-compat',
  [name$g]: 'fire-rtdb',
  [name$f]: 'fire-rtdb-compat',
  [name$e]: 'fire-fn',
  [name$d]: 'fire-fn-compat',
  [name$c]: 'fire-iid',
  [name$b]: 'fire-iid-compat',
  [name$a]: 'fire-fcm',
  [name$9]: 'fire-fcm-compat',
  [name$8]: 'fire-perf',
  [name$7]: 'fire-perf-compat',
  [name$6]: 'fire-rc',
  [name$5]: 'fire-rc-compat',
  [name$4]: 'fire-gcs',
  [name$3]: 'fire-gcs-compat',
  [name$2]: 'fire-fst',
  [name$1]: 'fire-fst-compat',
  'fire-js': 'fire-js',
  [name]: 'fire-js-all'
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @internal
 */

const _apps = new Map();
/**
 * Registered components.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any


exports._apps = _apps;

const _components = new Map();
/**
 * @param component - the component being added to this app's container
 *
 * @internal
 */


exports._components = _components;

function _addComponent(app, component) {
  try {
    app.container.addComponent(component);
  } catch (e) {
    logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
  }
}
/**
 *
 * @internal
 */


function _addOrOverwriteComponent(app, component) {
  app.container.addOrOverwriteComponent(component);
}
/**
 *
 * @param component - the component to register
 * @returns whether or not the component is registered successfully
 *
 * @internal
 */


function _registerComponent(component) {
  const componentName = component.name;

  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }

  _components.set(componentName, component); // add the component to existing app instances


  for (const app of _apps.values()) {
    _addComponent(app, component);
  }

  return true;
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 *
 * @returns the provider for the service with the matching name
 *
 * @internal
 */


function _getProvider(app, name) {
  return app.container.getProvider(name);
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 * @param instanceIdentifier - service instance identifier in case the service supports multiple instances
 *
 * @internal
 */


function _removeServiceInstance(app, name, instanceIdentifier = DEFAULT_ENTRY_NAME) {
  _getProvider(app, name).clearInstance(instanceIdentifier);
}
/**
 * Test only
 *
 * @internal
 */


function _clearComponents() {
  _components.clear();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const ERRORS = {
  ["no-app"
  /* NO_APP */
  ]: "No Firebase App '{$appName}' has been created - " + 'call Firebase App.initializeApp()',
  ["bad-app-name"
  /* BAD_APP_NAME */
  ]: "Illegal App name: '{$appName}",
  ["duplicate-app"
  /* DUPLICATE_APP */
  ]: "Firebase App named '{$appName}' already exists with different options or config",
  ["app-deleted"
  /* APP_DELETED */
  ]: "Firebase App named '{$appName}' already deleted",
  ["invalid-app-argument"
  /* INVALID_APP_ARGUMENT */
  ]: 'firebase.{$appName}() takes either no argument or a ' + 'Firebase App instance.',
  ["invalid-log-argument"
  /* INVALID_LOG_ARGUMENT */
  ]: 'First argument to `onLog` must be null or a function.'
};
const ERROR_FACTORY = new _util.ErrorFactory('app', 'Firebase', ERRORS);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class FirebaseAppImpl {
  constructor(options, config, container) {
    this._isDeleted = false;
    this._options = Object.assign({}, options);
    this._config = Object.assign({}, config);
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new _component.Component('app', () => this, "PUBLIC"
    /* PUBLIC */
    ));
  }

  get automaticDataCollectionEnabled() {
    this.checkDestroyed();
    return this._automaticDataCollectionEnabled;
  }

  set automaticDataCollectionEnabled(val) {
    this.checkDestroyed();
    this._automaticDataCollectionEnabled = val;
  }

  get name() {
    this.checkDestroyed();
    return this._name;
  }

  get options() {
    this.checkDestroyed();
    return this._options;
  }

  get config() {
    this.checkDestroyed();
    return this._config;
  }

  get container() {
    return this._container;
  }

  get isDeleted() {
    return this._isDeleted;
  }

  set isDeleted(val) {
    this._isDeleted = val;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */


  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("app-deleted"
      /* APP_DELETED */
      , {
        appName: this._name
      });
    }
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The current SDK version.
 *
 * @public
 */


const SDK_VERSION = version;
exports.SDK_VERSION = SDK_VERSION;

function initializeApp(options, rawConfig = {}) {
  if (typeof rawConfig !== 'object') {
    const name = rawConfig;
    rawConfig = {
      name
    };
  }

  const config = Object.assign({
    name: DEFAULT_ENTRY_NAME,
    automaticDataCollectionEnabled: false
  }, rawConfig);
  const name = config.name;

  if (typeof name !== 'string' || !name) {
    throw ERROR_FACTORY.create("bad-app-name"
    /* BAD_APP_NAME */
    , {
      appName: String(name)
    });
  }

  const existingApp = _apps.get(name);

  if (existingApp) {
    // return the existing app if options and config deep equal the ones in the existing app.
    if ((0, _util.deepEqual)(options, existingApp.options) && (0, _util.deepEqual)(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app"
      /* DUPLICATE_APP */
      , {
        appName: name
      });
    }
  }

  const container = new _component.ComponentContainer(name);

  for (const component of _components.values()) {
    container.addComponent(component);
  }

  const newApp = new FirebaseAppImpl(options, config, container);

  _apps.set(name, newApp);

  return newApp;
}
/**
 * Retrieves a {@link @firebase/app#FirebaseApp} instance.
 *
 * When called with no arguments, the default app is returned. When an app name
 * is provided, the app corresponding to that name is returned.
 *
 * An exception is thrown if the app being retrieved has not yet been
 * initialized.
 *
 * @example
 * ```javascript
 * // Return the default app
 * const app = getApp();
 * ```
 *
 * @example
 * ```javascript
 * // Return a named app
 * const otherApp = getApp("otherApp");
 * ```
 *
 * @param name - Optional name of the app to return. If no name is
 *   provided, the default is `"[DEFAULT]"`.
 *
 * @returns The app corresponding to the provided app name.
 *   If no app name is provided, the default app is returned.
 *
 * @public
 */


function getApp(name = DEFAULT_ENTRY_NAME) {
  const app = _apps.get(name);

  if (!app) {
    throw ERROR_FACTORY.create("no-app"
    /* NO_APP */
    , {
      appName: name
    });
  }

  return app;
}
/**
 * A (read-only) array of all initialized apps.
 * @public
 */


function getApps() {
  return Array.from(_apps.values());
}
/**
 * Renders this app unusable and frees the resources of all associated
 * services.
 *
 * @example
 * ```javascript
 * deleteApp(app)
 *   .then(function() {
 *     console.log("App deleted successfully");
 *   })
 *   .catch(function(error) {
 *     console.log("Error deleting app:", error);
 *   });
 * ```
 *
 * @public
 */


async function deleteApp(app) {
  const name = app.name;

  if (_apps.has(name)) {
    _apps.delete(name);

    await Promise.all(app.container.getProviders().map(provider => provider.delete()));
    app.isDeleted = true;
  }
}
/**
 * Registers a library's name and version for platform logging purposes.
 * @param library - Name of 1p or 3p library (e.g. firestore, angularfire)
 * @param version - Current version of that library.
 * @param variant - Bundle variant, e.g., node, rn, etc.
 *
 * @public
 */


function registerVersion(libraryKeyOrName, version, variant) {
  var _a; // TODO: We can use this check to whitelist strings when/if we set up
  // a good whitelist system.


  let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;

  if (variant) {
    library += `-${variant}`;
  }

  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version.match(/\s|\//);

  if (libraryMismatch || versionMismatch) {
    const warning = [`Unable to register library "${library}" with version "${version}":`];

    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }

    if (libraryMismatch && versionMismatch) {
      warning.push('and');
    }

    if (versionMismatch) {
      warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
    }

    logger.warn(warning.join(' '));
    return;
  }

  _registerComponent(new _component.Component(`${library}-version`, () => ({
    library,
    version
  }), "VERSION"
  /* VERSION */
  ));
}
/**
 * Sets log handler for all Firebase SDKs.
 * @param logCallback - An optional custom log handler that executes user code whenever
 * the Firebase SDK makes a logging call.
 *
 * @public
 */


function onLog(logCallback, options) {
  if (logCallback !== null && typeof logCallback !== 'function') {
    throw ERROR_FACTORY.create("invalid-log-argument"
    /* INVALID_LOG_ARGUMENT */
    );
  }

  (0, _logger.setUserLogHandler)(logCallback, options);
}
/**
 * Sets log level for all Firebase SDKs.
 *
 * All of the log types above the current log level are captured (i.e. if
 * you set the log level to `info`, errors are logged, but `debug` and
 * `verbose` logs are not).
 *
 * @public
 */


function setLogLevel(logLevel) {
  (0, _logger.setLogLevel)(logLevel);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function registerCoreComponents(variant) {
  _registerComponent(new _component.Component('platform-logger', container => new PlatformLoggerServiceImpl(container), "PRIVATE"
  /* PRIVATE */
  )); // Register `app` package.


  registerVersion(name$o, version$1, variant); // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation

  registerVersion(name$o, version$1, 'esm2017'); // Register platform SDK identifier (no version).

  registerVersion('fire-js', '');
}
/**
 * Firebase App
 *
 * @remarks This package coordinates the communication between the different Firebase components
 * @packageDocumentation
 */


registerCoreComponents('');
},{"@firebase/component":"../node_modules/@firebase/component/dist/esm/index.esm2017.js","@firebase/logger":"../node_modules/@firebase/logger/dist/esm/index.esm2017.js","@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js"}],"../node_modules/firebase/app/dist/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = require("@firebase/app");

Object.keys(_app).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _app[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _app[key];
    }
  });
});
var name = "firebase";
var version = "9.6.1";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(0, _app.registerVersion)(name, version, 'app');
},{"@firebase/app":"../node_modules/@firebase/app/dist/esm/index.esm2017.js"}],"../node_modules/@firebase/firestore/dist/lite/index.browser.esm2017.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteBatch = exports.Transaction = exports.Timestamp = exports.QuerySnapshot = exports.QueryDocumentSnapshot = exports.QueryConstraint = exports.Query = exports.GeoPoint = exports.FirestoreError = exports.Firestore = exports.FieldValue = exports.FieldPath = exports.DocumentSnapshot = exports.DocumentReference = exports.CollectionReference = exports.Bytes = void 0;
exports.addDoc = Ar;
exports.arrayRemove = Dr;
exports.arrayUnion = Vr;
exports.collection = fe;
exports.collectionGroup = de;
exports.connectFirestoreEmulator = ue;
exports.deleteDoc = Ir;
exports.deleteField = Pr;
exports.doc = we;
exports.documentId = _e;
exports.endAt = dr;
exports.endBefore = fr;
exports.getDoc = br;
exports.getDocs = vr;
exports.getFirestore = oe;
exports.increment = Nr;
exports.initializeFirestore = ie;
exports.limit = or;
exports.limitToLast = ur;
exports.orderBy = sr;
exports.query = tr;
exports.queryEqual = pe;
exports.refEqual = me;
exports.runTransaction = kr;
exports.serverTimestamp = Rr;
exports.setDoc = Er;
exports.setLogLevel = d;
exports.snapshotEqual = Je;
exports.startAfter = hr;
exports.startAt = ar;
exports.terminate = ce;
exports.updateDoc = Tr;
exports.where = er;
exports.writeBatch = Sr;

var _app = require("@firebase/app");

var _component = require("@firebase/component");

var _logger = require("@firebase/logger");

var _util = require("@firebase/util");

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e17) { throw _e17; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e18) { didErr = true; err = _e18; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */
var h = /*#__PURE__*/function () {
  function h(t) {
    _classCallCheck(this, h);

    this.uid = t;
  }

  _createClass(h, [{
    key: "isAuthenticated",
    value: function isAuthenticated() {
      return null != this.uid;
    }
    /**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */

  }, {
    key: "toKey",
    value: function toKey() {
      return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return t.uid === this.uid;
    }
  }]);

  return h;
}();
/** A user with a null UID. */


h.UNAUTHENTICATED = new h(null), // TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
h.GOOGLE_CREDENTIALS = new h("google-credentials-uid"), h.FIRST_PARTY = new h("first-party-uid"), h.MOCK_USER = new h("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var l = "9.6.1";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var f = new _logger.Logger("@firebase/firestore");
/**
 * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
 *
 * @param logLevel - The verbosity you set for activity and error logging. Can
 *   be any of the following values:
 *
 *   <ul>
 *     <li>`debug` for the most verbose logging level, primarily for
 *     debugging.</li>
 *     <li>`error` to log errors only.</li>
 *     <li><code>`silent` to turn off logging.</li>
 *   </ul>
 */

function d(t) {
  f.setLogLevel(t);
}

function w(t) {
  if (f.logLevel <= _logger.LogLevel.DEBUG) {
    for (var _len = arguments.length, n = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      n[_key - 1] = arguments[_key];
    }

    var e = n.map(y);
    f.debug.apply(f, ["Firestore (".concat(l, "): ").concat(t)].concat(_toConsumableArray(e)));
  }
}

function m(t) {
  if (f.logLevel <= _logger.LogLevel.ERROR) {
    for (var _len2 = arguments.length, n = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      n[_key2 - 1] = arguments[_key2];
    }

    var e = n.map(y);
    f.error.apply(f, ["Firestore (".concat(l, "): ").concat(t)].concat(_toConsumableArray(e)));
  }
}
/**
 * @internal
 */


function p(t) {
  if (f.logLevel <= _logger.LogLevel.WARN) {
    for (var _len3 = arguments.length, n = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      n[_key3 - 1] = arguments[_key3];
    }

    var e = n.map(y);
    f.warn.apply(f, ["Firestore (".concat(l, "): ").concat(t)].concat(_toConsumableArray(e)));
  }
}
/**
 * Converts an additional log parameter to a string representation.
 */


function y(t) {
  if ("string" == typeof t) return t;

  try {
    return n = t, JSON.stringify(n);
  } catch (n) {
    // Converting to JSON failed, just log the object directly
    return t;
  }
  /**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

  /** Formats an object as a JSON string, suitable for logging. */


  var n;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Unconditionally fails, throwing an Error with the given message.
 * Messages are stripped in production builds.
 *
 * Returns `never` and can be used in expressions:
 * @example
 * let futureVar = fail('not implemented yet');
 */


function _() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Unexpected state";
  // Log the failure in addition to throw an exception, just in case the
  // exception is swallowed.
  var n = "FIRESTORE (".concat(l, ") INTERNAL ASSERTION FAILED: ") + t; // NOTE: We don't use FirestoreError here because these are internal failures
  // that cannot be handled by the user. (Also it would create a circular
  // dependency between the error and assert modules which doesn't work.)

  throw m(n), new Error(n);
}
/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */


function g(t, n) {
  t || _();
}
/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */


function b(t, // eslint-disable-next-line @typescript-eslint/no-explicit-any
n) {
  return t;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var v = "ok",
    E = "cancelled",
    _T = "unknown",
    I = "invalid-argument",
    A = "deadline-exceeded",
    P = "not-found",
    R = "already-exists",
    V = "permission-denied",
    D = "unauthenticated",
    N = "resource-exhausted",
    $ = "failed-precondition",
    F = "aborted",
    S = "out-of-range",
    q = "unimplemented",
    x = "internal",
    O = "unavailable",
    C = "data-loss";
/** An error returned by a Firestore operation. */

var L = /*#__PURE__*/function (_Error) {
  _inherits(L, _Error);

  var _super = _createSuper(L);

  /** @hideconstructor */
  function L(
  /**
   * The backend error code associated with this error.
   */
  t,
  /**
   * A custom error description.
   */
  n) {
    var _this;

    _classCallCheck(this, L);

    _this = _super.call(this, n), _this.code = t, _this.message = n,
    /** The custom name for all FirestoreErrors. */
    _this.name = "FirebaseError", // HACK: We write a toString property directly because Error is not a real
    // class and so inheritance does not work correctly. We could alternatively
    // do the same "back-door inheritance" trick that FirebaseError does.
    _this.toString = function () {
      return "".concat(_this.name, ": [code=").concat(_this.code, "]: ").concat(_this.message);
    };
    return _this;
  }

  return _createClass(L);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.FirestoreError = L;

var U = /*#__PURE__*/_createClass(function U() {
  var _this2 = this;

  _classCallCheck(this, U);

  this.promise = new Promise(function (t, n) {
    _this2.resolve = t, _this2.reject = n;
  });
});
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var k = /*#__PURE__*/_createClass(function k(t, n) {
  _classCallCheck(this, k);

  this.user = n, this.type = "OAuth", this.headers = new Map(), this.headers.set("Authorization", "Bearer ".concat(t));
});
/**
 * A CredentialsProvider that always yields an empty token.
 * @internal
 */


var j = /*#__PURE__*/function () {
  function j() {
    _classCallCheck(this, j);
  }

  _createClass(j, [{
    key: "getToken",
    value: function getToken() {
      return Promise.resolve(null);
    }
  }, {
    key: "invalidateToken",
    value: function invalidateToken() {}
  }, {
    key: "start",
    value: function start(t, n) {
      // Fire with initial user.
      t.enqueueRetryable(function () {
        return n(h.UNAUTHENTICATED);
      });
    }
  }, {
    key: "shutdown",
    value: function shutdown() {}
  }]);

  return j;
}();
/**
 * A CredentialsProvider that always returns a constant token. Used for
 * emulator token mocking.
 */


var M = /*#__PURE__*/function () {
  function M(t) {
    _classCallCheck(this, M);

    this.token = t,
    /**
     * Stores the listener registered with setChangeListener()
     * This isn't actually necessary since the UID never changes, but we use this
     * to verify the listen contract is adhered to in tests.
     */
    this.changeListener = null;
  }

  _createClass(M, [{
    key: "getToken",
    value: function getToken() {
      return Promise.resolve(this.token);
    }
  }, {
    key: "invalidateToken",
    value: function invalidateToken() {}
  }, {
    key: "start",
    value: function start(t, n) {
      var _this3 = this;

      this.changeListener = n, // Fire with initial user.
      t.enqueueRetryable(function () {
        return n(_this3.token.user);
      });
    }
  }, {
    key: "shutdown",
    value: function shutdown() {
      this.changeListener = null;
    }
  }]);

  return M;
}();
/** Credential provider for the Lite SDK. */


var B = /*#__PURE__*/function () {
  function B(t) {
    var _this4 = this;

    _classCallCheck(this, B);

    this.auth = null, t.onInit(function (t) {
      _this4.auth = t;
    });
  }

  _createClass(B, [{
    key: "getToken",
    value: function getToken() {
      var _this5 = this;

      return this.auth ? this.auth.getToken().then(function (t) {
        return t ? (g("string" == typeof t.accessToken), new k(t.accessToken, new h(_this5.auth.getUid()))) : null;
      }) : Promise.resolve(null);
    }
  }, {
    key: "invalidateToken",
    value: function invalidateToken() {}
  }, {
    key: "start",
    value: function start(t, n) {}
  }, {
    key: "shutdown",
    value: function shutdown() {}
  }]);

  return B;
}();
/*
 * FirstPartyToken provides a fresh token each time its value
 * is requested, because if the token is too old, requests will be rejected.
 * Technically this may no longer be necessary since the SDK should gracefully
 * recover from unauthenticated errors (see b/33147818 for context), but it's
 * safer to keep the implementation as-is.
 */


var z = /*#__PURE__*/_createClass(function z(t, n, e) {
  _classCallCheck(this, z);

  this.type = "FirstParty", this.user = h.FIRST_PARTY, this.headers = new Map(), this.headers.set("X-Goog-AuthUser", n);
  var r = t.auth.getAuthHeaderValueForFirstParty([]);
  r && this.headers.set("Authorization", r), e && this.headers.set("X-Goog-Iam-Authorization-Token", e);
});
/*
 * Provides user credentials required for the Firestore JavaScript SDK
 * to authenticate the user, using technique that is only available
 * to applications hosted by Google.
 */


var G = /*#__PURE__*/function () {
  function G(t, n, e) {
    _classCallCheck(this, G);

    this.t = t, this.i = n, this.o = e;
  }

  _createClass(G, [{
    key: "getToken",
    value: function getToken() {
      return Promise.resolve(new z(this.t, this.i, this.o));
    }
  }, {
    key: "start",
    value: function start(t, n) {
      // Fire with initial uid.
      t.enqueueRetryable(function () {
        return n(h.FIRST_PARTY);
      });
    }
  }, {
    key: "shutdown",
    value: function shutdown() {}
  }, {
    key: "invalidateToken",
    value: function invalidateToken() {}
  }]);

  return G;
}();

var Q = /*#__PURE__*/_createClass(function Q(t) {
  _classCallCheck(this, Q);

  this.value = t, this.type = "AppCheck", this.headers = new Map(), t && t.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
});
/** AppCheck token provider for the Lite SDK. */


var W = /*#__PURE__*/function () {
  function W(t) {
    var _this6 = this;

    _classCallCheck(this, W);

    this.u = t, this.appCheck = null, t.onInit(function (t) {
      _this6.appCheck = t;
    });
  }

  _createClass(W, [{
    key: "getToken",
    value: function getToken() {
      return this.appCheck ? this.appCheck.getToken().then(function (t) {
        return t ? (g("string" == typeof t.token), new Q(t.token)) : null;
      }) : Promise.resolve(null);
    }
  }, {
    key: "invalidateToken",
    value: function invalidateToken() {}
  }, {
    key: "start",
    value: function start(t, n) {}
  }, {
    key: "shutdown",
    value: function shutdown() {}
  }]);

  return W;
}();
/**
 * Builds a CredentialsProvider depending on the type of
 * the credentials passed in.
 */

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var Y = /*#__PURE__*/_createClass(
/**
 * Constructs a DatabaseInfo using the provided host, databaseId and
 * persistenceKey.
 *
 * @param databaseId - The database to use.
 * @param appId - The Firebase App Id.
 * @param persistenceKey - A unique identifier for this Firestore's local
 * storage (used in conjunction with the databaseId).
 * @param host - The Firestore backend host to connect to.
 * @param ssl - Whether to use SSL when connecting.
 * @param forceLongPolling - Whether to use the forceLongPolling option
 * when using WebChannel as the network transport.
 * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
 * option when using WebChannel as the network transport.
 * @param useFetchStreams Whether to use the Fetch API instead of
 * XMLHTTPRequest
 */
function Y(t, n, e, r, s, i, o, u) {
  _classCallCheck(this, Y);

  this.databaseId = t, this.appId = n, this.persistenceKey = e, this.host = r, this.ssl = s, this.forceLongPolling = i, this.autoDetectLongPolling = o, this.useFetchStreams = u;
});
/** The default database name for a project. */

/**
 * Represents the database ID a Firestore client is associated with.
 * @internal
 */


var H = /*#__PURE__*/function () {
  function H(t, n) {
    _classCallCheck(this, H);

    this.projectId = t, this.database = n || "(default)";
  }

  _createClass(H, [{
    key: "isDefaultDatabase",
    get: function get() {
      return "(default)" === this.database;
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return t instanceof H && t.projectId === this.projectId && t.database === this.database;
    }
  }]);

  return H;
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Path represents an ordered sequence of string segments.
 */


var K = /*#__PURE__*/function () {
  function K(t, n, e) {
    _classCallCheck(this, K);

    void 0 === n ? n = 0 : n > t.length && _(), void 0 === e ? e = t.length - n : e > t.length - n && _(), this.segments = t, this.offset = n, this.len = e;
  }

  _createClass(K, [{
    key: "length",
    get: function get() {
      return this.len;
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return 0 === K.comparator(this, t);
    }
  }, {
    key: "child",
    value: function child(t) {
      var n = this.segments.slice(this.offset, this.limit());
      return t instanceof K ? t.forEach(function (t) {
        n.push(t);
      }) : n.push(t), this.construct(n);
    }
    /** The index of one past the last segment of the path. */

  }, {
    key: "limit",
    value: function limit() {
      return this.offset + this.length;
    }
  }, {
    key: "popFirst",
    value: function popFirst(t) {
      return t = void 0 === t ? 1 : t, this.construct(this.segments, this.offset + t, this.length - t);
    }
  }, {
    key: "popLast",
    value: function popLast() {
      return this.construct(this.segments, this.offset, this.length - 1);
    }
  }, {
    key: "firstSegment",
    value: function firstSegment() {
      return this.segments[this.offset];
    }
  }, {
    key: "lastSegment",
    value: function lastSegment() {
      return this.get(this.length - 1);
    }
  }, {
    key: "get",
    value: function get(t) {
      return this.segments[this.offset + t];
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return 0 === this.length;
    }
  }, {
    key: "isPrefixOf",
    value: function isPrefixOf(t) {
      if (t.length < this.length) return !1;

      for (var n = 0; n < this.length; n++) {
        if (this.get(n) !== t.get(n)) return !1;
      }

      return !0;
    }
  }, {
    key: "isImmediateParentOf",
    value: function isImmediateParentOf(t) {
      if (this.length + 1 !== t.length) return !1;

      for (var n = 0; n < this.length; n++) {
        if (this.get(n) !== t.get(n)) return !1;
      }

      return !0;
    }
  }, {
    key: "forEach",
    value: function forEach(t) {
      for (var n = this.offset, e = this.limit(); n < e; n++) {
        t(this.segments[n]);
      }
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return this.segments.slice(this.offset, this.limit());
    }
  }], [{
    key: "comparator",
    value: function comparator(t, n) {
      var e = Math.min(t.length, n.length);

      for (var r = 0; r < e; r++) {
        var _e2 = t.get(r),
            s = n.get(r);

        if (_e2 < s) return -1;
        if (_e2 > s) return 1;
      }

      return t.length < n.length ? -1 : t.length > n.length ? 1 : 0;
    }
  }]);

  return K;
}();
/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 *
 * @internal
 */


var J = /*#__PURE__*/function (_K) {
  _inherits(J, _K);

  var _super2 = _createSuper(J);

  function J() {
    _classCallCheck(this, J);

    return _super2.apply(this, arguments);
  }

  _createClass(J, [{
    key: "construct",
    value: function construct(t, n, e) {
      return new J(t, n, e);
    }
  }, {
    key: "canonicalString",
    value: function canonicalString() {
      // NOTE: The client is ignorant of any path segments containing escape
      // sequences (e.g. __id123__) and just passes them through raw (they exist
      // for legacy reasons and should not be used frequently).
      return this.toArray().join("/");
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.canonicalString();
    }
    /**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */

  }], [{
    key: "fromString",
    value: function fromString() {
      // NOTE: The client is ignorant of any path segments containing escape
      // sequences (e.g. __id123__) and just passes them through raw (they exist
      // for legacy reasons and should not be used frequently).
      var n = [];

      for (var _len4 = arguments.length, t = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        t[_key4] = arguments[_key4];
      }

      for (var _i = 0, _t2 = t; _i < _t2.length; _i++) {
        var e = _t2[_i];
        if (e.indexOf("//") >= 0) throw new L(I, "Invalid segment (".concat(e, "). Paths must not contain // in them.")); // Strip leading and traling slashed.

        n.push.apply(n, _toConsumableArray(e.split("/").filter(function (t) {
          return t.length > 0;
        })));
      }

      return new J(n);
    }
  }, {
    key: "emptyPath",
    value: function emptyPath() {
      return new J([]);
    }
  }]);

  return J;
}(K);

var X = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
/**
 * A dot-separated path for navigating sub-objects within a document.
 * @internal
 */

var Z = /*#__PURE__*/function (_K2) {
  _inherits(Z, _K2);

  var _super3 = _createSuper(Z);

  function Z() {
    _classCallCheck(this, Z);

    return _super3.apply(this, arguments);
  }

  _createClass(Z, [{
    key: "construct",
    value: function construct(t, n, e) {
      return new Z(t, n, e);
    }
    /**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */

  }, {
    key: "canonicalString",
    value: function canonicalString() {
      return this.toArray().map(function (t) {
        return t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), Z.isValidIdentifier(t) || (t = "`" + t + "`"), t;
      }).join(".");
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.canonicalString();
    }
    /**
     * Returns true if this field references the key of a document.
     */

  }, {
    key: "isKeyField",
    value: function isKeyField() {
      return 1 === this.length && "__name__" === this.get(0);
    }
    /**
     * The field designating the key of a document.
     */

  }], [{
    key: "isValidIdentifier",
    value: function isValidIdentifier(t) {
      return X.test(t);
    }
  }, {
    key: "keyField",
    value: function keyField() {
      return new Z(["__name__"]);
    }
    /**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */

  }, {
    key: "fromServerFormat",
    value: function fromServerFormat(t) {
      var n = [];
      var e = "",
          r = 0;

      var s = function s() {
        if (0 === e.length) throw new L(I, "Invalid field path (".concat(t, "). Paths must not be empty, begin with '.', end with '.', or contain '..'"));
        n.push(e), e = "";
      };

      var i = !1;

      for (; r < t.length;) {
        var _n2 = t[r];

        if ("\\" === _n2) {
          if (r + 1 === t.length) throw new L(I, "Path has trailing escape character: " + t);
          var _n3 = t[r + 1];
          if ("\\" !== _n3 && "." !== _n3 && "`" !== _n3) throw new L(I, "Path has invalid escape sequence: " + t);
          e += _n3, r += 2;
        } else "`" === _n2 ? (i = !i, r++) : "." !== _n2 || i ? (e += _n2, r++) : (s(), r++);
      }

      if (s(), i) throw new L(I, "Unterminated ` in path: " + t);
      return new Z(n);
    }
  }, {
    key: "emptyPath",
    value: function emptyPath() {
      return new Z([]);
    }
  }]);

  return Z;
}(K);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @internal
 */


var tt = /*#__PURE__*/function () {
  function tt(t) {
    _classCallCheck(this, tt);

    this.path = t;
  }

  _createClass(tt, [{
    key: "hasCollectionId",
    value:
    /** Returns true if the document is in the specified collectionId. */
    function hasCollectionId(t) {
      return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return null !== t && 0 === J.comparator(this.path, t.path);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.path.toString();
    }
  }], [{
    key: "fromPath",
    value: function fromPath(t) {
      return new tt(J.fromString(t));
    }
  }, {
    key: "fromName",
    value: function fromName(t) {
      return new tt(J.fromString(t).popFirst(5));
    }
  }, {
    key: "comparator",
    value: function comparator(t, n) {
      return J.comparator(t.path, n.path);
    }
  }, {
    key: "isDocumentKey",
    value: function isDocumentKey(t) {
      return t.length % 2 == 0;
    }
    /**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */

  }, {
    key: "fromSegments",
    value: function fromSegments(t) {
      return new tt(new J(t.slice()));
    }
  }]);

  return tt;
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function nt(t, n, e) {
  if (!e) throw new L(I, "Function ".concat(t, "() cannot be called with an empty ").concat(n, "."));
}
/**
 * Validates that two boolean options are not set at the same time.
 * @internal
 */

/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */


function et(t) {
  if (!tt.isDocumentKey(t)) throw new L(I, "Invalid document reference. Document references must have an even number of segments, but ".concat(t, " has ").concat(t.length, "."));
}
/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */


function rt(t) {
  if (tt.isDocumentKey(t)) throw new L(I, "Invalid collection reference. Collection references must have an odd number of segments, but ".concat(t, " has ").concat(t.length, "."));
}
/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */

/** Returns a string describing the type / value of the provided input. */


function st(t) {
  if (void 0 === t) return "undefined";
  if (null === t) return "null";
  if ("string" == typeof t) return t.length > 20 && (t = "".concat(t.substring(0, 20), "...")), JSON.stringify(t);
  if ("number" == typeof t || "boolean" == typeof t) return "" + t;

  if ("object" == _typeof(t)) {
    if (t instanceof Array) return "an array";
    {
      var n =
      /** try to get the constructor name for an object. */
      function (t) {
        if (t.constructor) return t.constructor.name;
        return null;
      }
      /**
      * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
      * underlying instance. Throws if  `obj` is not an instance of `T`.
      *
      * This cast is used in the Lite and Full SDK to verify instance types for
      * arguments passed to the public API.
      * @internal
      */
      (t);

      return n ? "a custom ".concat(n, " object") : "an object";
    }
  }

  return "function" == typeof t ? "a function" : _();
}

function it(t, // eslint-disable-next-line @typescript-eslint/no-explicit-any
n) {
  if ("_delegate" in t && ( // Unwrap Compat types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t = t._delegate), !(t instanceof n)) {
    if (n.name === t.constructor.name) throw new L(I, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
    {
      var e = st(t);
      throw new L(I, "Expected type '".concat(n.name, "', but it was: ").concat(e));
    }
  }

  return t;
}

function ot(t, n) {
  if (n <= 0) throw new L(I, "Function ".concat(t, "() requires a positive number, but it was: ").concat(n, "."));
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns whether a variable is either undefined or null.
 */


function ut(t) {
  return null == t;
}
/** Returns whether the value represents -0. */


function ct(t) {
  // Detect if the value is -0.0. Based on polyfill from
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
  return 0 === t && 1 / t == -1 / 0;
}
/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
 */

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var at = {
  BatchGetDocuments: "batchGet",
  Commit: "commit",
  RunQuery: "runQuery"
};
/**
 * Maps RPC names to the corresponding REST endpoint name.
 *
 * We use array notation to avoid mangling.
 */

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Error Codes describing the different ways GRPC can fail. These are copied
 * directly from GRPC's sources here:
 *
 * https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
 *
 * Important! The names of these identifiers matter because the string forms
 * are used for reverse lookups from the webchannel stream. Do NOT change the
 * names of these identifiers or change this into a const enum.
 */

var ht, lt;
/**
 * Converts an HTTP Status Code to the equivalent error code.
 *
 * @param status - An HTTP Status Code, like 200, 404, 503, etc.
 * @returns The equivalent Code. Unknown status codes are mapped to
 *     Code.UNKNOWN.
 */

function ft(t) {
  if (void 0 === t) return m("RPC_ERROR", "HTTP error has no status"), _T; // The canonical error codes for Google APIs [1] specify mapping onto HTTP
  // status codes but the mapping is not bijective. In each case of ambiguity
  // this function chooses a primary error.
  // [1]
  // https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto

  switch (t) {
    case 200:
      // OK
      return v;

    case 400:
      // Bad Request
      return $;
    // Other possibilities based on the forward mapping
    // return Code.INVALID_ARGUMENT;
    // return Code.OUT_OF_RANGE;

    case 401:
      // Unauthorized
      return D;

    case 403:
      // Forbidden
      return V;

    case 404:
      // Not Found
      return P;

    case 409:
      // Conflict
      return F;
    // Other possibilities:
    // return Code.ALREADY_EXISTS;

    case 416:
      // Range Not Satisfiable
      return S;

    case 429:
      // Too Many Requests
      return N;

    case 499:
      // Client Closed Request
      return E;

    case 500:
      // Internal Server Error
      return _T;
    // Other possibilities:
    // return Code.INTERNAL;
    // return Code.DATA_LOSS;

    case 501:
      // Unimplemented
      return q;

    case 503:
      // Service Unavailable
      return O;

    case 504:
      // Gateway Timeout
      return A;

    default:
      return t >= 200 && t < 300 ? v : t >= 400 && t < 500 ? $ : t >= 500 && t < 600 ? x : _T;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A Rest-based connection that relies on the native HTTP stack
 * (e.g. `fetch` or a polyfill).
 */


(lt = ht || (ht = {}))[lt.OK = 0] = "OK", lt[lt.CANCELLED = 1] = "CANCELLED", lt[lt.UNKNOWN = 2] = "UNKNOWN", lt[lt.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", lt[lt.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", lt[lt.NOT_FOUND = 5] = "NOT_FOUND", lt[lt.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", lt[lt.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", lt[lt.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", lt[lt.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", lt[lt.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", lt[lt.ABORTED = 10] = "ABORTED", lt[lt.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", lt[lt.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", lt[lt.INTERNAL = 13] = "INTERNAL", lt[lt.UNAVAILABLE = 14] = "UNAVAILABLE", lt[lt.DATA_LOSS = 15] = "DATA_LOSS";

var dt = /*#__PURE__*/function (_ref) {
  _inherits(dt, _ref);

  var _super4 = _createSuper(dt);

  /**
   * @param databaseInfo - The connection info.
   * @param fetchImpl - `fetch` or a Polyfill that implements the fetch API.
   */
  function dt(t, n) {
    var _this7;

    _classCallCheck(this, dt);

    _this7 = _super4.call(this, t), _this7.I = n;
    return _this7;
  }

  _createClass(dt, [{
    key: "A",
    value: function A(t, n) {
      throw new Error("Not supported by FetchConnection");
    }
  }, {
    key: "v",
    value: function () {
      var _v = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t, n, e, r) {
        var s, i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                s = JSON.stringify(r);
                _context.prev = 1;
                _context.next = 4;
                return this.I(n, {
                  method: "POST",
                  headers: e,
                  body: s
                });

              case 4:
                i = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                throw new L(ft(_context.t0.status), "Request failed with error: " + _context.t0.statusText);

              case 10:
                if (i.ok) {
                  _context.next = 12;
                  break;
                }

                throw new L(ft(i.status), "Request failed with error: " + i.statusText);

              case 12:
                return _context.abrupt("return", i.json());

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function v(_x, _x2, _x3, _x4) {
        return _v.apply(this, arguments);
      }

      return v;
    }()
  }]);

  return dt;
}(
/*#__PURE__*/

/**
 * Base class for all Rest-based connections to the backend (WebChannel and
 * HTTP).
 */
function () {
  function _class(t) {
    _classCallCheck(this, _class);

    this.databaseInfo = t, this.databaseId = t.databaseId;
    var n = t.ssl ? "https" : "http";
    this.h = n + "://" + t.host, this.l = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
  }

  _createClass(_class, [{
    key: "m",
    value: function m(t, n, e, r, s) {
      var i = this.p(t, n);
      w("RestConnection", "Sending: ", i, e);
      var o = {};
      return this.g(o, r, s), this.v(t, i, o, e).then(function (t) {
        return w("RestConnection", "Received: ", t), t;
      }, function (n) {
        throw p("RestConnection", "".concat(t, " failed with error: "), n, "url: ", i, "request:", e), n;
      });
    }
  }, {
    key: "T",
    value: function T(t, n, e, r, s) {
      // The REST API automatically aggregates all of the streamed results, so we
      // can just use the normal invoke() method.
      return this.m(t, n, e, r, s);
    }
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */

  }, {
    key: "g",
    value:
    /**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */
    function g(t, n, e) {
      t["X-Goog-Api-Client"] = "gl-js/ fire/" + l, // Content-Type: text/plain will avoid preflight requests which might
      // mess with CORS and redirects by proxies. If we add custom headers
      // we will need to change this code to potentially use the $httpOverwrite
      // parameter supported by ESF to avoid triggering preflight requests.
      t["Content-Type"] = "text/plain", this.databaseInfo.appId && (t["X-Firebase-GMPID"] = this.databaseInfo.appId), n && n.headers.forEach(function (n, e) {
        return t[e] = n;
      }), e && e.headers.forEach(function (n, e) {
        return t[e] = n;
      });
    }
  }, {
    key: "p",
    value: function p(t, n) {
      var e = at[t];
      return "".concat(this.h, "/v1/").concat(n, ":").concat(e);
    }
  }]);

  return _class;
}());
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** Initializes the HTTP connection for the REST API. */

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Generates `nBytes` of random bytes.
 *
 * If `nBytes < 0` , an error will be thrown.
 */


function wt(t) {
  // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
  var n = // eslint-disable-next-line @typescript-eslint/no-explicit-any
  "undefined" != typeof self && (self.crypto || self.msCrypto),
      e = new Uint8Array(t);
  if (n && "function" == typeof n.getRandomValues) n.getRandomValues(e);else // Falls back to Math.random
    for (var _n4 = 0; _n4 < t; _n4++) {
      e[_n4] = Math.floor(256 * Math.random());
    }
  return e;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var mt = /*#__PURE__*/function () {
  function mt() {
    _classCallCheck(this, mt);
  }

  _createClass(mt, null, [{
    key: "P",
    value: function P() {
      // Alphanumeric characters
      var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          n = Math.floor(256 / t.length) * t.length; // The largest byte value that is a multiple of `char.length`.

      var e = "";

      for (; e.length < 20;) {
        var r = wt(40);

        for (var s = 0; s < r.length; ++s) {
          // Only accept values that are [0, maxMultiple), this ensures they can
          // be evenly mapped to indices of `chars` via a modulo operation.
          e.length < 20 && r[s] < n && (e += t.charAt(r[s] % t.length));
        }
      }

      return e;
    }
  }]);

  return mt;
}();

function pt(t, n) {
  return t < n ? -1 : t > n ? 1 : 0;
}
/** Helper to compare arrays using isEqual(). */


function yt(t, n, e) {
  return t.length === n.length && t.every(function (t, r) {
    return e(t, n[r]);
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The earliest date supported by Firestore timestamps (0001-01-01T00:00:00Z).

/**
 * A `Timestamp` represents a point in time independent of any time zone or
 * calendar, represented as seconds and fractions of seconds at nanosecond
 * resolution in UTC Epoch time.
 *
 * It is encoded using the Proleptic Gregorian Calendar which extends the
 * Gregorian calendar backwards to year one. It is encoded assuming all minutes
 * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
 * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
 * 9999-12-31T23:59:59.999999999Z.
 *
 * For examples and further specifications, refer to the
 * {@link https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto | Timestamp definition}.
 */


var _t = /*#__PURE__*/function () {
  /**
   * Creates a new timestamp.
   *
   * @param seconds - The number of seconds of UTC time since Unix epoch
   *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   *     9999-12-31T23:59:59Z inclusive.
   * @param nanoseconds - The non-negative fractions of a second at nanosecond
   *     resolution. Negative second values with fractions must still have
   *     non-negative nanoseconds values that count forward in time. Must be
   *     from 0 to 999,999,999 inclusive.
   */
  function _t(
  /**
   * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
   */
  t,
  /**
   * The fractions of a second at nanosecond resolution.*
   */
  n) {
    _classCallCheck(this, _t);

    if (this.seconds = t, this.nanoseconds = n, n < 0) throw new L(I, "Timestamp nanoseconds out of range: " + n);
    if (n >= 1e9) throw new L(I, "Timestamp nanoseconds out of range: " + n);
    if (t < -62135596800) throw new L(I, "Timestamp seconds out of range: " + t); // This will break in the year 10,000.

    if (t >= 253402300800) throw new L(I, "Timestamp seconds out of range: " + t);
  }
  /**
   * Creates a new timestamp with the current date, with millisecond precision.
   *
   * @returns a new timestamp representing the current date.
   */


  _createClass(_t, [{
    key: "toDate",
    value:
    /**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */
    function toDate() {
      return new Date(this.toMillis());
    }
    /**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */

  }, {
    key: "toMillis",
    value: function toMillis() {
      return 1e3 * this.seconds + this.nanoseconds / 1e6;
    }
  }, {
    key: "_compareTo",
    value: function _compareTo(t) {
      return this.seconds === t.seconds ? pt(this.nanoseconds, t.nanoseconds) : pt(this.seconds, t.seconds);
    }
    /**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */

  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
    }
    /** Returns a textual representation of this `Timestamp`. */

  }, {
    key: "toString",
    value: function toString() {
      return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
    }
    /** Returns a JSON-serializable representation of this `Timestamp`. */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        seconds: this.seconds,
        nanoseconds: this.nanoseconds
      };
    }
    /**
     * Converts this object to a primitive string, which allows `Timestamp` objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */

  }, {
    key: "valueOf",
    value: function valueOf() {
      // This method returns a string of the form <seconds>.<nanoseconds> where
      // <seconds> is translated to have a non-negative value and both <seconds>
      // and <nanoseconds> are left-padded with zeroes to be a consistent length.
      // Strings with this format then have a lexiographical ordering that matches
      // the expected ordering. The <seconds> translation is done to avoid having
      // a leading negative sign (i.e. a leading '-' character) in its string
      // representation, which would affect its lexiographical ordering.
      var t = this.seconds - -62135596800; // Note: Up to 12 decimal digits are required to represent all valid
      // 'seconds' values.

      return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
    }
  }], [{
    key: "now",
    value: function now() {
      return _t.fromMillis(Date.now());
    }
    /**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */

  }, {
    key: "fromDate",
    value: function fromDate(t) {
      return _t.fromMillis(t.getTime());
    }
    /**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */

  }, {
    key: "fromMillis",
    value: function fromMillis(t) {
      var n = Math.floor(t / 1e3),
          e = Math.floor(1e6 * (t - 1e3 * n));
      return new _t(n, e);
    }
  }]);

  return _t;
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A version of a document in Firestore. This corresponds to the version
 * timestamp, such as update_time or read_time.
 */


exports.Timestamp = _t;

var gt = /*#__PURE__*/function () {
  function gt(t) {
    _classCallCheck(this, gt);

    this.timestamp = t;
  }

  _createClass(gt, [{
    key: "compareTo",
    value: function compareTo(t) {
      return this.timestamp._compareTo(t.timestamp);
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return this.timestamp.isEqual(t.timestamp);
    }
    /** Returns a number representation of the version for use in spec tests. */

  }, {
    key: "toMicroseconds",
    value: function toMicroseconds() {
      // Convert to microseconds.
      return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "SnapshotVersion(" + this.timestamp.toString() + ")";
    }
  }, {
    key: "toTimestamp",
    value: function toTimestamp() {
      return this.timestamp;
    }
  }], [{
    key: "fromTimestamp",
    value: function fromTimestamp(t) {
      return new gt(t);
    }
  }, {
    key: "min",
    value: function min() {
      return new gt(new _t(0, 0));
    }
  }]);

  return gt;
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function bt(t) {
  var n = 0;

  for (var e in t) {
    Object.prototype.hasOwnProperty.call(t, e) && n++;
  }

  return n;
}

function vt(t, n) {
  for (var e in t) {
    Object.prototype.hasOwnProperty.call(t, e) && n(e, t[e]);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */


var Et = /*#__PURE__*/function () {
  function Et(t) {
    _classCallCheck(this, Et);

    this.fields = t, // TODO(dimond): validation of FieldMask
    // Sort the field mask to support `FieldMask.isEqual()` and assert below.
    t.sort(Z.comparator);
  }
  /**
   * Verifies that `fieldPath` is included by at least one field in this field
   * mask.
   *
   * This is an O(n) operation, where `n` is the size of the field mask.
   */


  _createClass(Et, [{
    key: "covers",
    value: function covers(t) {
      var _iterator = _createForOfIteratorHelper(this.fields),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var n = _step.value;
          if (n.isPrefixOf(t)) return !0;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return !1;
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return yt(this.fields, t.fields, function (t, n) {
        return t.isEqual(n);
      });
    }
  }]);

  return Et;
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** Converts a Base64 encoded string to a binary string. */

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 * @internal
 */


var Tt = /*#__PURE__*/function () {
  function Tt(t) {
    _classCallCheck(this, Tt);

    this.binaryString = t;
  }

  _createClass(Tt, [{
    key: "toBase64",
    value: function toBase64() {
      return t = this.binaryString, btoa(t);
      /** Converts a binary string to a Base64 encoded string. */

      var t;
    }
  }, {
    key: "toUint8Array",
    value: function toUint8Array() {
      return function (t) {
        var n = new Uint8Array(t.length);

        for (var e = 0; e < t.length; e++) {
          n[e] = t.charCodeAt(e);
        }

        return n;
      }
      /**
      * @license
      * Copyright 2020 Google LLC
      *
      * Licensed under the Apache License, Version 2.0 (the "License");
      * you may not use this file except in compliance with the License.
      * You may obtain a copy of the License at
      *
      *   http://www.apache.org/licenses/LICENSE-2.0
      *
      * Unless required by applicable law or agreed to in writing, software
      * distributed under the License is distributed on an "AS IS" BASIS,
      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
      * See the License for the specific language governing permissions and
      * limitations under the License.
      */
      // A RegExp matching ISO 8601 UTC timestamps with optional fraction.
      (this.binaryString);
    }
  }, {
    key: "approximateByteSize",
    value: function approximateByteSize() {
      return 2 * this.binaryString.length;
    }
  }, {
    key: "compareTo",
    value: function compareTo(t) {
      return pt(this.binaryString, t.binaryString);
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return this.binaryString === t.binaryString;
    }
  }], [{
    key: "fromBase64String",
    value: function fromBase64String(t) {
      var n = atob(t);
      return new Tt(n);
    }
  }, {
    key: "fromUint8Array",
    value: function fromUint8Array(t) {
      var n =
      /**
      * Helper function to convert an Uint8array to a binary string.
      */
      function (t) {
        var n = "";

        for (var e = 0; e < t.length; ++e) {
          n += String.fromCharCode(t[e]);
        }

        return n;
      }
      /**
      * Helper function to convert a binary string to an Uint8Array.
      */
      (t);

      return new Tt(n);
    }
  }]);

  return Tt;
}();

Tt.EMPTY_BYTE_STRING = new Tt("");
var It = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */

function At(t) {
  // The json interface (for the browser) will return an iso timestamp string,
  // while the proto js library (for node) will return a
  // google.protobuf.Timestamp instance.
  if (g(!!t), "string" == typeof t) {
    // The date string can have higher precision (nanos) than the Date class
    // (millis), so we do some custom parsing here.
    // Parse the nanos right out of the string.
    var n = 0;
    var e = It.exec(t);

    if (g(!!e), e[1]) {
      // Pad the fraction out to 9 digits (nanos).
      var _t3 = e[1];
      _t3 = (_t3 + "000000000").substr(0, 9), n = Number(_t3);
    } // Parse the date to get the seconds.


    var r = new Date(t);
    return {
      seconds: Math.floor(r.getTime() / 1e3),
      nanos: n
    };
  }

  return {
    seconds: Pt(t.seconds),
    nanos: Pt(t.nanos)
  };
}
/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */


function Pt(t) {
  // TODO(bjornick): Handle int64 greater than 53 bits.
  return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
}
/** Converts the possible Proto types for Blobs into a ByteString. */


function Rt(t) {
  return "string" == typeof t ? Tt.fromBase64String(t) : Tt.fromUint8Array(t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Represents a locally-applied ServerTimestamp.
 *
 * Server Timestamps are backed by MapValues that contain an internal field
 * `__type__` with a value of `server_timestamp`. The previous value and local
 * write time are stored in its `__previous_value__` and `__local_write_time__`
 * fields respectively.
 *
 * Notes:
 * - ServerTimestampValue instances are created as the result of applying a
 *   transform. They can only exist in the local view of a document. Therefore
 *   they do not need to be parsed or serialized.
 * - When evaluated locally (e.g. for snapshot.data()), they by default
 *   evaluate to `null`. This behavior can be configured by passing custom
 *   FieldValueOptions to value().
 * - With respect to other ServerTimestampValues, they sort by their
 *   localWriteTime.
 */


function Vt(t) {
  var n, e;
  return "server_timestamp" === (null === (e = ((null === (n = null == t ? void 0 : t.mapValue) || void 0 === n ? void 0 : n.fields) || {}).__type__) || void 0 === e ? void 0 : e.stringValue);
}
/**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */


function Dt(t) {
  var n = t.mapValue.fields.__previous_value__;
  return Vt(n) ? Dt(n) : n;
}
/**
 * Returns the local time at which this timestamp was first set.
 */


function Nt(t) {
  var n = At(t.mapValue.fields.__local_write_time__.timestampValue);
  return new _t(n.seconds, n.nanos);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** Extracts the backend's type order for the provided value. */


function $t(t) {
  return "nullValue" in t ? 0
  /* NullValue */
  : "booleanValue" in t ? 1
  /* BooleanValue */
  : "integerValue" in t || "doubleValue" in t ? 2
  /* NumberValue */
  : "timestampValue" in t ? 3
  /* TimestampValue */
  : "stringValue" in t ? 5
  /* StringValue */
  : "bytesValue" in t ? 6
  /* BlobValue */
  : "referenceValue" in t ? 7
  /* RefValue */
  : "geoPointValue" in t ? 8
  /* GeoPointValue */
  : "arrayValue" in t ? 9
  /* ArrayValue */
  : "mapValue" in t ? Vt(t) ? 4
  /* ServerTimestampValue */
  : 10
  /* ObjectValue */
  : _();
}
/** Tests `left` and `right` for equality based on the backend semantics. */


function Ft(t, n) {
  var e = $t(t);
  if (e !== $t(n)) return !1;

  switch (e) {
    case 0
    /* NullValue */
    :
      return !0;

    case 1
    /* BooleanValue */
    :
      return t.booleanValue === n.booleanValue;

    case 4
    /* ServerTimestampValue */
    :
      return Nt(t).isEqual(Nt(n));

    case 3
    /* TimestampValue */
    :
      return function (t, n) {
        if ("string" == typeof t.timestampValue && "string" == typeof n.timestampValue && t.timestampValue.length === n.timestampValue.length) // Use string equality for ISO 8601 timestamps
          return t.timestampValue === n.timestampValue;
        var e = At(t.timestampValue),
            r = At(n.timestampValue);
        return e.seconds === r.seconds && e.nanos === r.nanos;
      }(t, n);

    case 5
    /* StringValue */
    :
      return t.stringValue === n.stringValue;

    case 6
    /* BlobValue */
    :
      return function (t, n) {
        return Rt(t.bytesValue).isEqual(Rt(n.bytesValue));
      }(t, n);

    case 7
    /* RefValue */
    :
      return t.referenceValue === n.referenceValue;

    case 8
    /* GeoPointValue */
    :
      return function (t, n) {
        return Pt(t.geoPointValue.latitude) === Pt(n.geoPointValue.latitude) && Pt(t.geoPointValue.longitude) === Pt(n.geoPointValue.longitude);
      }(t, n);

    case 2
    /* NumberValue */
    :
      return function (t, n) {
        if ("integerValue" in t && "integerValue" in n) return Pt(t.integerValue) === Pt(n.integerValue);

        if ("doubleValue" in t && "doubleValue" in n) {
          var _e3 = Pt(t.doubleValue),
              r = Pt(n.doubleValue);

          return _e3 === r ? ct(_e3) === ct(r) : isNaN(_e3) && isNaN(r);
        }

        return !1;
      }(t, n);

    case 9
    /* ArrayValue */
    :
      return yt(t.arrayValue.values || [], n.arrayValue.values || [], Ft);

    case 10
    /* ObjectValue */
    :
      return function (t, n) {
        var e = t.mapValue.fields || {},
            r = n.mapValue.fields || {};
        if (bt(e) !== bt(r)) return !1;

        for (var _t4 in e) {
          if (e.hasOwnProperty(_t4) && (void 0 === r[_t4] || !Ft(e[_t4], r[_t4]))) return !1;
        }

        return !0;
      }
      /** Returns true if the ArrayValue contains the specified element. */
      (t, n);

    default:
      return _();
  }
}

function St(t, n) {
  return void 0 !== (t.values || []).find(function (t) {
    return Ft(t, n);
  });
}

function qt(t, n) {
  var e = $t(t),
      r = $t(n);
  if (e !== r) return pt(e, r);

  switch (e) {
    case 0
    /* NullValue */
    :
      return 0;

    case 1
    /* BooleanValue */
    :
      return pt(t.booleanValue, n.booleanValue);

    case 2
    /* NumberValue */
    :
      return function (t, n) {
        var e = Pt(t.integerValue || t.doubleValue),
            r = Pt(n.integerValue || n.doubleValue);
        return e < r ? -1 : e > r ? 1 : e === r ? 0 : // one or both are NaN.
        isNaN(e) ? isNaN(r) ? 0 : -1 : 1;
      }(t, n);

    case 3
    /* TimestampValue */
    :
      return xt(t.timestampValue, n.timestampValue);

    case 4
    /* ServerTimestampValue */
    :
      return xt(Nt(t), Nt(n));

    case 5
    /* StringValue */
    :
      return pt(t.stringValue, n.stringValue);

    case 6
    /* BlobValue */
    :
      return function (t, n) {
        var e = Rt(t),
            r = Rt(n);
        return e.compareTo(r);
      }(t.bytesValue, n.bytesValue);

    case 7
    /* RefValue */
    :
      return function (t, n) {
        var e = t.split("/"),
            r = n.split("/");

        for (var _t5 = 0; _t5 < e.length && _t5 < r.length; _t5++) {
          var _n5 = pt(e[_t5], r[_t5]);

          if (0 !== _n5) return _n5;
        }

        return pt(e.length, r.length);
      }(t.referenceValue, n.referenceValue);

    case 8
    /* GeoPointValue */
    :
      return function (t, n) {
        var e = pt(Pt(t.latitude), Pt(n.latitude));
        if (0 !== e) return e;
        return pt(Pt(t.longitude), Pt(n.longitude));
      }(t.geoPointValue, n.geoPointValue);

    case 9
    /* ArrayValue */
    :
      return function (t, n) {
        var e = t.values || [],
            r = n.values || [];

        for (var _t6 = 0; _t6 < e.length && _t6 < r.length; ++_t6) {
          var _n6 = qt(e[_t6], r[_t6]);

          if (_n6) return _n6;
        }

        return pt(e.length, r.length);
      }(t.arrayValue, n.arrayValue);

    case 10
    /* ObjectValue */
    :
      return function (t, n) {
        var e = t.fields || {},
            r = Object.keys(e),
            s = n.fields || {},
            i = Object.keys(s); // Even though MapValues are likely sorted correctly based on their insertion
        // order (e.g. when received from the backend), local modifications can bring
        // elements out of order. We need to re-sort the elements to ensure that
        // canonical IDs are independent of insertion order.

        r.sort(), i.sort();

        for (var _t7 = 0; _t7 < r.length && _t7 < i.length; ++_t7) {
          var _n7 = pt(r[_t7], i[_t7]);

          if (0 !== _n7) return _n7;
          var o = qt(e[r[_t7]], s[i[_t7]]);
          if (0 !== o) return o;
        }

        return pt(r.length, i.length);
      }
      /** Returns a reference value for the provided database and key. */
      (t.mapValue, n.mapValue);

    default:
      throw _();
  }
}

function xt(t, n) {
  if ("string" == typeof t && "string" == typeof n && t.length === n.length) return pt(t, n);
  var e = At(t),
      r = At(n),
      s = pt(e.seconds, r.seconds);
  return 0 !== s ? s : pt(e.nanos, r.nanos);
}

function Ot(t, n) {
  return {
    referenceValue: "projects/".concat(t.projectId, "/databases/").concat(t.database, "/documents/").concat(n.path.canonicalString())
  };
}
/** Returns true if `value` is an ArrayValue. */


function Ct(t) {
  return !!t && "arrayValue" in t;
}
/** Returns true if `value` is a NullValue. */


function Lt(t) {
  return !!t && "nullValue" in t;
}
/** Returns true if `value` is NaN. */


function Ut(t) {
  return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
}
/** Returns true if `value` is a MapValue. */


function kt(t) {
  return !!t && "mapValue" in t;
}
/** Creates a deep copy of `source`. */


function jt(t) {
  if (t.geoPointValue) return {
    geoPointValue: Object.assign({}, t.geoPointValue)
  };
  if (t.timestampValue && "object" == _typeof(t.timestampValue)) return {
    timestampValue: Object.assign({}, t.timestampValue)
  };

  if (t.mapValue) {
    var n = {
      mapValue: {
        fields: {}
      }
    };
    return vt(t.mapValue.fields, function (t, e) {
      return n.mapValue.fields[t] = jt(e);
    }), n;
  }

  if (t.arrayValue) {
    var _n8 = {
      arrayValue: {
        values: []
      }
    };

    for (var e = 0; e < (t.arrayValue.values || []).length; ++e) {
      _n8.arrayValue.values[e] = jt(t.arrayValue.values[e]);
    }

    return _n8;
  }

  return Object.assign({}, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An ObjectValue represents a MapValue in the Firestore Proto and offers the
 * ability to add and remove fields (via the ObjectValueBuilder).
 */


var Mt = /*#__PURE__*/function () {
  function Mt(t) {
    _classCallCheck(this, Mt);

    this.value = t;
  }

  _createClass(Mt, [{
    key: "field",
    value:
    /**
     * Returns the value at the given path or null.
     *
     * @param path - the path to search
     * @returns The value at the path or null if the path is not set.
     */
    function field(t) {
      if (t.isEmpty()) return this.value;
      {
        var n = this.value;

        for (var e = 0; e < t.length - 1; ++e) {
          if (n = (n.mapValue.fields || {})[t.get(e)], !kt(n)) return null;
        }

        return n = (n.mapValue.fields || {})[t.lastSegment()], n || null;
      }
    }
    /**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */

  }, {
    key: "set",
    value: function set(t, n) {
      this.getFieldsMap(t.popLast())[t.lastSegment()] = jt(n);
    }
    /**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */

  }, {
    key: "setAll",
    value: function setAll(t) {
      var _this8 = this;

      var n = Z.emptyPath(),
          e = {},
          r = [];
      t.forEach(function (t, s) {
        if (!n.isImmediateParentOf(s)) {
          // Insert the accumulated changes at this parent location
          var _t8 = _this8.getFieldsMap(n);

          _this8.applyChanges(_t8, e, r), e = {}, r = [], n = s.popLast();
        }

        t ? e[s.lastSegment()] = jt(t) : r.push(s.lastSegment());
      });
      var s = this.getFieldsMap(n);
      this.applyChanges(s, e, r);
    }
    /**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path - The field path to remove.
     */

  }, {
    key: "delete",
    value: function _delete(t) {
      var n = this.field(t.popLast());
      kt(n) && n.mapValue.fields && delete n.mapValue.fields[t.lastSegment()];
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return Ft(this.value, t.value);
    }
    /**
     * Returns the map that contains the leaf element of `path`. If the parent
     * entry does not yet exist, or if it is not a map, a new map will be created.
     */

  }, {
    key: "getFieldsMap",
    value: function getFieldsMap(t) {
      var n = this.value;
      n.mapValue.fields || (n.mapValue = {
        fields: {}
      });

      for (var e = 0; e < t.length; ++e) {
        var r = n.mapValue.fields[t.get(e)];
        kt(r) && r.mapValue.fields || (r = {
          mapValue: {
            fields: {}
          }
        }, n.mapValue.fields[t.get(e)] = r), n = r;
      }

      return n.mapValue.fields;
    }
    /**
     * Modifies `fieldsMap` by adding, replacing or deleting the specified
     * entries.
     */

  }, {
    key: "applyChanges",
    value: function applyChanges(t, n, e) {
      vt(n, function (n, e) {
        return t[n] = e;
      });

      var _iterator2 = _createForOfIteratorHelper(e),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _n9 = _step2.value;
          delete t[_n9];
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Mt(jt(this.value));
    }
  }], [{
    key: "empty",
    value: function empty() {
      return new Mt({
        mapValue: {}
      });
    }
  }]);

  return Mt;
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Represents a document in Firestore with a key, version, data and whether it
 * has local mutations applied to it.
 *
 * Documents can transition between states via `convertToFoundDocument()`,
 * `convertToNoDocument()` and `convertToUnknownDocument()`. If a document does
 * not transition to one of these states even after all mutations have been
 * applied, `isValidDocument()` returns false and the document should be removed
 * from all views.
 */


var Bt = /*#__PURE__*/function () {
  function Bt(t, n, e, r, s) {
    _classCallCheck(this, Bt);

    this.key = t, this.documentType = n, this.version = e, this.data = r, this.documentState = s;
  }
  /**
   * Creates a document with no known version or data, but which can serve as
   * base document for mutations.
   */


  _createClass(Bt, [{
    key: "convertToFoundDocument",
    value:
    /**
     * Changes the document type to indicate that it exists and that its version
     * and data are known.
     */
    function convertToFoundDocument(t, n) {
      return this.version = t, this.documentType = 1
      /* FOUND_DOCUMENT */
      , this.data = n, this.documentState = 0
      /* SYNCED */
      , this;
    }
    /**
     * Changes the document type to indicate that it doesn't exist at the given
     * version.
     */

  }, {
    key: "convertToNoDocument",
    value: function convertToNoDocument(t) {
      return this.version = t, this.documentType = 2
      /* NO_DOCUMENT */
      , this.data = Mt.empty(), this.documentState = 0
      /* SYNCED */
      , this;
    }
    /**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */

  }, {
    key: "convertToUnknownDocument",
    value: function convertToUnknownDocument(t) {
      return this.version = t, this.documentType = 3
      /* UNKNOWN_DOCUMENT */
      , this.data = Mt.empty(), this.documentState = 2
      /* HAS_COMMITTED_MUTATIONS */
      , this;
    }
  }, {
    key: "setHasCommittedMutations",
    value: function setHasCommittedMutations() {
      return this.documentState = 2
      /* HAS_COMMITTED_MUTATIONS */
      , this;
    }
  }, {
    key: "setHasLocalMutations",
    value: function setHasLocalMutations() {
      return this.documentState = 1
      /* HAS_LOCAL_MUTATIONS */
      , this;
    }
  }, {
    key: "hasLocalMutations",
    get: function get() {
      return 1
      /* HAS_LOCAL_MUTATIONS */
      === this.documentState;
    }
  }, {
    key: "hasCommittedMutations",
    get: function get() {
      return 2
      /* HAS_COMMITTED_MUTATIONS */
      === this.documentState;
    }
  }, {
    key: "hasPendingWrites",
    get: function get() {
      return this.hasLocalMutations || this.hasCommittedMutations;
    }
  }, {
    key: "isValidDocument",
    value: function isValidDocument() {
      return 0
      /* INVALID */
      !== this.documentType;
    }
  }, {
    key: "isFoundDocument",
    value: function isFoundDocument() {
      return 1
      /* FOUND_DOCUMENT */
      === this.documentType;
    }
  }, {
    key: "isNoDocument",
    value: function isNoDocument() {
      return 2
      /* NO_DOCUMENT */
      === this.documentType;
    }
  }, {
    key: "isUnknownDocument",
    value: function isUnknownDocument() {
      return 3
      /* UNKNOWN_DOCUMENT */
      === this.documentType;
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return t instanceof Bt && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.documentType === t.documentType && this.documentState === t.documentState && this.data.isEqual(t.data);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Bt(this.key, this.documentType, this.version, this.data.clone(), this.documentState);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "Document(".concat(this.key, ", ").concat(this.version, ", ").concat(JSON.stringify(this.data.value), ", {documentType: ").concat(this.documentType, "}), {documentState: ").concat(this.documentState, "})");
    }
  }], [{
    key: "newInvalidDocument",
    value: function newInvalidDocument(t) {
      return new Bt(t, 0
      /* INVALID */
      , gt.min(), Mt.empty(), 0
      /* SYNCED */
      );
    }
    /**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */

  }, {
    key: "newFoundDocument",
    value: function newFoundDocument(t, n, e) {
      return new Bt(t, 1
      /* FOUND_DOCUMENT */
      , n, e, 0
      /* SYNCED */
      );
    }
    /** Creates a new document that is known to not exist at the given version. */

  }, {
    key: "newNoDocument",
    value: function newNoDocument(t, n) {
      return new Bt(t, 2
      /* NO_DOCUMENT */
      , n, Mt.empty(), 0
      /* SYNCED */
      );
    }
    /**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */

  }, {
    key: "newUnknownDocument",
    value: function newUnknownDocument(t, n) {
      return new Bt(t, 3
      /* UNKNOWN_DOCUMENT */
      , n, Mt.empty(), 2
      /* HAS_COMMITTED_MUTATIONS */
      );
    }
  }]);

  return Bt;
}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Visible for testing


var zt = /*#__PURE__*/_createClass(function zt(t) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var i = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var o = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

  _classCallCheck(this, zt);

  this.path = t, this.collectionGroup = n, this.orderBy = e, this.filters = r, this.limit = s, this.startAt = i, this.endAt = o, this.R = null;
});
/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */


function Gt(t) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var i = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var o = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  return new zt(t, n, e, r, s, i, o);
}

var Qt = /*#__PURE__*/function (_ref2) {
  _inherits(Qt, _ref2);

  var _super5 = _createSuper(Qt);

  function Qt(t, n, e) {
    var _this9;

    _classCallCheck(this, Qt);

    _this9 = _super5.call(this), _this9.field = t, _this9.op = n, _this9.value = e;
    return _this9;
  }
  /**
   * Creates a filter based on the provided arguments.
   */


  _createClass(Qt, [{
    key: "matches",
    value: function matches(t) {
      var n = t.data.field(this.field); // Types do not have to match in NOT_EQUAL filters.

      return "!="
      /* NOT_EQUAL */
      === this.op ? null !== n && this.D(qt(n, this.value)) : null !== n && $t(this.value) === $t(n) && this.D(qt(n, this.value)); // Only compare types with matching backend order (such as double and int).
    }
  }, {
    key: "D",
    value: function D(t) {
      switch (this.op) {
        case "<"
        /* LESS_THAN */
        :
          return t < 0;

        case "<="
        /* LESS_THAN_OR_EQUAL */
        :
          return t <= 0;

        case "=="
        /* EQUAL */
        :
          return 0 === t;

        case "!="
        /* NOT_EQUAL */
        :
          return 0 !== t;

        case ">"
        /* GREATER_THAN */
        :
          return t > 0;

        case ">="
        /* GREATER_THAN_OR_EQUAL */
        :
          return t >= 0;

        default:
          return _();
      }
    }
  }, {
    key: "N",
    value: function N() {
      return ["<"
      /* LESS_THAN */
      , "<="
      /* LESS_THAN_OR_EQUAL */
      , ">"
      /* GREATER_THAN */
      , ">="
      /* GREATER_THAN_OR_EQUAL */
      , "!="
      /* NOT_EQUAL */
      , "not-in"
      /* NOT_IN */
      ].indexOf(this.op) >= 0;
    }
  }], [{
    key: "create",
    value: function create(t, n, e) {
      return t.isKeyField() ? "in"
      /* IN */
      === n || "not-in"
      /* NOT_IN */
      === n ? this.V(t, n, e) : new Wt(t, n, e) : "array-contains"
      /* ARRAY_CONTAINS */
      === n ? new Jt(t, e) : "in"
      /* IN */
      === n ? new Xt(t, e) : "not-in"
      /* NOT_IN */
      === n ? new Zt(t, e) : "array-contains-any"
      /* ARRAY_CONTAINS_ANY */
      === n ? new tn(t, e) : new Qt(t, n, e);
    }
  }, {
    key: "V",
    value: function V(t, n, e) {
      return "in"
      /* IN */
      === n ? new Yt(t, e) : new Ht(t, e);
    }
  }]);

  return Qt;
}( /*#__PURE__*/function () {
  function _class2() {
    _classCallCheck(this, _class2);
  }

  return _createClass(_class2);
}());
/** Filter that matches on key fields (i.e. '__name__'). */


var Wt = /*#__PURE__*/function (_Qt) {
  _inherits(Wt, _Qt);

  var _super6 = _createSuper(Wt);

  function Wt(t, n, e) {
    var _this10;

    _classCallCheck(this, Wt);

    _this10 = _super6.call(this, t, n, e), _this10.key = tt.fromName(e.referenceValue);
    return _this10;
  }

  _createClass(Wt, [{
    key: "matches",
    value: function matches(t) {
      var n = tt.comparator(t.key, this.key);
      return this.D(n);
    }
  }]);

  return Wt;
}(Qt);
/** Filter that matches on key fields within an array. */


var Yt = /*#__PURE__*/function (_Qt2) {
  _inherits(Yt, _Qt2);

  var _super7 = _createSuper(Yt);

  function Yt(t, n) {
    var _this11;

    _classCallCheck(this, Yt);

    _this11 = _super7.call(this, t, "in"
    /* IN */
    , n), _this11.keys = Kt("in"
    /* IN */
    , n);
    return _this11;
  }

  _createClass(Yt, [{
    key: "matches",
    value: function matches(t) {
      return this.keys.some(function (n) {
        return n.isEqual(t.key);
      });
    }
  }]);

  return Yt;
}(Qt);
/** Filter that matches on key fields not present within an array. */


var Ht = /*#__PURE__*/function (_Qt3) {
  _inherits(Ht, _Qt3);

  var _super8 = _createSuper(Ht);

  function Ht(t, n) {
    var _this12;

    _classCallCheck(this, Ht);

    _this12 = _super8.call(this, t, "not-in"
    /* NOT_IN */
    , n), _this12.keys = Kt("not-in"
    /* NOT_IN */
    , n);
    return _this12;
  }

  _createClass(Ht, [{
    key: "matches",
    value: function matches(t) {
      return !this.keys.some(function (n) {
        return n.isEqual(t.key);
      });
    }
  }]);

  return Ht;
}(Qt);

function Kt(t, n) {
  var e;
  return ((null === (e = n.arrayValue) || void 0 === e ? void 0 : e.values) || []).map(function (t) {
    return tt.fromName(t.referenceValue);
  });
}
/** A Filter that implements the array-contains operator. */


var Jt = /*#__PURE__*/function (_Qt4) {
  _inherits(Jt, _Qt4);

  var _super9 = _createSuper(Jt);

  function Jt(t, n) {
    _classCallCheck(this, Jt);

    return _super9.call(this, t, "array-contains"
    /* ARRAY_CONTAINS */
    , n);
  }

  _createClass(Jt, [{
    key: "matches",
    value: function matches(t) {
      var n = t.data.field(this.field);
      return Ct(n) && St(n.arrayValue, this.value);
    }
  }]);

  return Jt;
}(Qt);
/** A Filter that implements the IN operator. */


var Xt = /*#__PURE__*/function (_Qt5) {
  _inherits(Xt, _Qt5);

  var _super10 = _createSuper(Xt);

  function Xt(t, n) {
    _classCallCheck(this, Xt);

    return _super10.call(this, t, "in"
    /* IN */
    , n);
  }

  _createClass(Xt, [{
    key: "matches",
    value: function matches(t) {
      var n = t.data.field(this.field);
      return null !== n && St(this.value.arrayValue, n);
    }
  }]);

  return Xt;
}(Qt);
/** A Filter that implements the not-in operator. */


var Zt = /*#__PURE__*/function (_Qt6) {
  _inherits(Zt, _Qt6);

  var _super11 = _createSuper(Zt);

  function Zt(t, n) {
    _classCallCheck(this, Zt);

    return _super11.call(this, t, "not-in"
    /* NOT_IN */
    , n);
  }

  _createClass(Zt, [{
    key: "matches",
    value: function matches(t) {
      if (St(this.value.arrayValue, {
        nullValue: "NULL_VALUE"
      })) return !1;
      var n = t.data.field(this.field);
      return null !== n && !St(this.value.arrayValue, n);
    }
  }]);

  return Zt;
}(Qt);
/** A Filter that implements the array-contains-any operator. */


var tn = /*#__PURE__*/function (_Qt7) {
  _inherits(tn, _Qt7);

  var _super12 = _createSuper(tn);

  function tn(t, n) {
    _classCallCheck(this, tn);

    return _super12.call(this, t, "array-contains-any"
    /* ARRAY_CONTAINS_ANY */
    , n);
  }

  _createClass(tn, [{
    key: "matches",
    value: function matches(t) {
      var _this13 = this;

      var n = t.data.field(this.field);
      return !(!Ct(n) || !n.arrayValue.values) && n.arrayValue.values.some(function (t) {
        return St(_this13.value.arrayValue, t);
      });
    }
  }]);

  return tn;
}(Qt);
/**
 * Represents a bound of a query.
 *
 * The bound is specified with the given components representing a position and
 * whether it's just before or just after the position (relative to whatever the
 * query order is).
 *
 * The position represents a logical index position for a query. It's a prefix
 * of values for the (potentially implicit) order by clauses of a query.
 *
 * Bound provides a function to determine whether a document comes before or
 * after a bound. This is influenced by whether the position is just before or
 * just after the provided values.
 */


var nn = /*#__PURE__*/_createClass(function nn(t, n) {
  _classCallCheck(this, nn);

  this.position = t, this.before = n;
});
/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */


var en = /*#__PURE__*/_createClass(function en(t) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "asc";

  _classCallCheck(this, en);

  this.field = t, this.dir = n;
});

function rn(t, n) {
  return t.dir === n.dir && t.field.isEqual(n.field);
}

function sn(t, n) {
  if (null === t) return null === n;
  if (null === n) return !1;
  if (t.before !== n.before || t.position.length !== n.position.length) return !1;

  for (var e = 0; e < t.position.length; e++) {
    if (!Ft(t.position[e], n.position[e])) return !1;
  }

  return !0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Query encapsulates all the query attributes we support in the SDK. It can
 * be run against the LocalStore, as well as be converted to a `Target` to
 * query the RemoteStore results.
 *
 * Visible for testing.
 */


var on = /*#__PURE__*/_createClass(
/**
 * Initializes a Query with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 */
function on(t) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var i = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "F";
  var o = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
  var u = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

  _classCallCheck(this, on);

  this.path = t, this.collectionGroup = n, this.explicitOrderBy = e, this.filters = r, this.limit = s, this.limitType = i, this.startAt = o, this.endAt = u, this.$ = null, // The corresponding `Target` of this `Query` instance.
  this.F = null, this.startAt, this.endAt;
});
/** Creates a new Query for a query that matches all documents at `path` */


function un(t) {
  return !ut(t.limit) && "L"
  /* Last */
  === t.limitType;
}

function cn(t) {
  return t.explicitOrderBy.length > 0 ? t.explicitOrderBy[0].field : null;
}

function an(t) {
  var _iterator3 = _createForOfIteratorHelper(t.filters),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var n = _step3.value;
      if (n.N()) return n.field;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  return null;
}
/**
 * Checks if any of the provided Operators are included in the query and
 * returns the first one that is, or null if none are.
 */

/**
 * Returns whether the query matches a collection group rather than a specific
 * collection.
 */


function hn(t) {
  return null !== t.collectionGroup;
}
/**
 * Returns the implicit order by constraint that is used to execute the Query,
 * which can be different from the order by constraints the user provided (e.g.
 * the SDK and backend always orders by `__name__`).
 */


function ln(t) {
  var n = b(t);

  if (null === n.$) {
    n.$ = [];

    var _t9 = an(n),
        e = cn(n);

    if (null !== _t9 && null === e) // In order to implicitly add key ordering, we must also add the
      // inequality filter field for it to be a valid query.
      // Note that the default inequality field and key ordering is ascending.
      _t9.isKeyField() || n.$.push(new en(_t9)), n.$.push(new en(Z.keyField(), "asc"
      /* ASCENDING */
      ));else {
      var _t10 = !1;

      var _iterator4 = _createForOfIteratorHelper(n.explicitOrderBy),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _e4 = _step4.value;
          n.$.push(_e4), _e4.field.isKeyField() && (_t10 = !0);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if (!_t10) {
        // The order of the implicit key ordering always matches the last
        // explicit order by
        var _t11 = n.explicitOrderBy.length > 0 ? n.explicitOrderBy[n.explicitOrderBy.length - 1].dir : "asc"
        /* ASCENDING */
        ;

        n.$.push(new en(Z.keyField(), _t11));
      }
    }
  }

  return n.$;
}
/**
 * Converts this `Query` instance to it's corresponding `Target` representation.
 */


function fn(t) {
  var n = b(t);
  if (!n.F) if ("F"
  /* First */
  === n.limitType) n.F = Gt(n.path, n.collectionGroup, ln(n), n.filters, n.limit, n.startAt, n.endAt);else {
    // Flip the orderBy directions since we want the last results
    var _t12 = [];

    var _iterator5 = _createForOfIteratorHelper(ln(n)),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _e5 = _step5.value;

        var _n10 = "desc"
        /* DESCENDING */
        === _e5.dir ? "asc"
        /* ASCENDING */
        : "desc"
        /* DESCENDING */
        ;

        _t12.push(new en(_e5.field, _n10));
      } // We need to swap the cursors to match the now-flipped query ordering.

    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    var e = n.endAt ? new nn(n.endAt.position, !n.endAt.before) : null,
        r = n.startAt ? new nn(n.startAt.position, !n.startAt.before) : null; // Now return as a LimitType.First query.

    n.F = Gt(n.path, n.collectionGroup, _t12, n.filters, n.limit, e, r);
  }
  return n.F;
}

function dn(t, n) {
  return function (t, n) {
    if (t.limit !== n.limit) return !1;
    if (t.orderBy.length !== n.orderBy.length) return !1;

    for (var _e6 = 0; _e6 < t.orderBy.length; _e6++) {
      if (!rn(t.orderBy[_e6], n.orderBy[_e6])) return !1;
    }

    if (t.filters.length !== n.filters.length) return !1;

    for (var s = 0; s < t.filters.length; s++) {
      if (e = t.filters[s], r = n.filters[s], e.op !== r.op || !e.field.isEqual(r.field) || !Ft(e.value, r.value)) return !1;
    }

    var e, r;
    return t.collectionGroup === n.collectionGroup && !!t.path.isEqual(n.path) && !!sn(t.startAt, n.startAt) && sn(t.endAt, n.endAt);
  }(fn(t), fn(n)) && t.limitType === n.limitType;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns an DoubleValue for `value` that is encoded based the serializer's
 * `useProto3Json` setting.
 */

/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */


function wn(t, n) {
  return function (t) {
    return "number" == typeof t && Number.isInteger(t) && !ct(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
  }(n) ?
  /**
  * Returns an IntegerValue for `value`.
  */
  function (t) {
    return {
      integerValue: "" + t
    };
  }(n) : function (t, n) {
    if (t.S) {
      if (isNaN(n)) return {
        doubleValue: "NaN"
      };
      if (n === 1 / 0) return {
        doubleValue: "Infinity"
      };
      if (n === -1 / 0) return {
        doubleValue: "-Infinity"
      };
    }

    return {
      doubleValue: ct(n) ? "-0" : n
    };
  }(t, n);
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** Used to represent a field transform on a mutation. */


var mn = /*#__PURE__*/_createClass(function mn() {
  _classCallCheck(this, mn);

  // Make sure that the structural type of `TransformOperation` is unique.
  // See https://github.com/microsoft/TypeScript/issues/5451
  this._ = void 0;
});
/** Transforms a value into a server-generated timestamp. */


var pn = /*#__PURE__*/function (_mn) {
  _inherits(pn, _mn);

  var _super13 = _createSuper(pn);

  function pn() {
    _classCallCheck(this, pn);

    return _super13.apply(this, arguments);
  }

  return _createClass(pn);
}(mn);
/** Transforms an array value via a union operation. */


var yn = /*#__PURE__*/function (_mn2) {
  _inherits(yn, _mn2);

  var _super14 = _createSuper(yn);

  function yn(t) {
    var _this14;

    _classCallCheck(this, yn);

    _this14 = _super14.call(this), _this14.elements = t;
    return _this14;
  }

  return _createClass(yn);
}(mn);
/** Transforms an array value via a remove operation. */


var _n = /*#__PURE__*/function (_mn3) {
  _inherits(_n, _mn3);

  var _super15 = _createSuper(_n);

  function _n(t) {
    var _this15;

    _classCallCheck(this, _n);

    _this15 = _super15.call(this), _this15.elements = t;
    return _this15;
  }

  return _createClass(_n);
}(mn);
/**
 * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
 * transforms. Converts all field values to integers or doubles, but unlike the
 * backend does not cap integer values at 2^63. Instead, JavaScript number
 * arithmetic is used and precision loss can occur for values greater than 2^53.
 */


var gn = /*#__PURE__*/function (_mn4) {
  _inherits(gn, _mn4);

  var _super16 = _createSuper(gn);

  function gn(t, n) {
    var _this16;

    _classCallCheck(this, gn);

    _this16 = _super16.call(this), _this16.q = t, _this16.O = n;
    return _this16;
  }

  return _createClass(gn);
}(mn);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** A field path and the TransformOperation to perform upon it. */


var bn = /*#__PURE__*/_createClass(function bn(t, n) {
  _classCallCheck(this, bn);

  this.field = t, this.transform = n;
});
/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */


var vn = /*#__PURE__*/function () {
  function vn(t, n) {
    _classCallCheck(this, vn);

    this.updateTime = t, this.exists = n;
  }
  /** Creates a new empty Precondition. */


  _createClass(vn, [{
    key: "isNone",
    get:
    /** Returns whether this Precondition is empty. */
    function get() {
      return void 0 === this.updateTime && void 0 === this.exists;
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
    }
  }], [{
    key: "none",
    value: function none() {
      return new vn();
    }
    /** Creates a new Precondition with an exists flag. */

  }, {
    key: "exists",
    value: function exists(t) {
      return new vn(void 0, t);
    }
    /** Creates a new Precondition based on a version a document exists at. */

  }, {
    key: "updateTime",
    value: function updateTime(t) {
      return new vn(t);
    }
  }]);

  return vn;
}();
/**
 * A mutation describes a self-contained change to a document. Mutations can
 * create, replace, delete, and update subsets of documents.
 *
 * Mutations not only act on the value of the document but also its version.
 *
 * For local mutations (mutations that haven't been committed yet), we preserve
 * the existing version for Set and Patch mutations. For Delete mutations, we
 * reset the version to 0.
 *
 * Here's the expected transition table.
 *
 * MUTATION           APPLIED TO            RESULTS IN
 *
 * SetMutation        Document(v3)          Document(v3)
 * SetMutation        NoDocument(v3)        Document(v0)
 * SetMutation        InvalidDocument(v0)   Document(v0)
 * PatchMutation      Document(v3)          Document(v3)
 * PatchMutation      NoDocument(v3)        NoDocument(v3)
 * PatchMutation      InvalidDocument(v0)   UnknownDocument(v3)
 * DeleteMutation     Document(v3)          NoDocument(v0)
 * DeleteMutation     NoDocument(v3)        NoDocument(v0)
 * DeleteMutation     InvalidDocument(v0)   NoDocument(v0)
 *
 * For acknowledged mutations, we use the updateTime of the WriteResponse as
 * the resulting version for Set and Patch mutations. As deletes have no
 * explicit update time, we use the commitTime of the WriteResponse for
 * Delete mutations.
 *
 * If a mutation is acknowledged by the backend but fails the precondition check
 * locally, we transition to an `UnknownDocument` and rely on Watch to send us
 * the updated version.
 *
 * Field transforms are used only with Patch and Set Mutations. We use the
 * `updateTransforms` message to store transforms, rather than the `transforms`s
 * messages.
 *
 * ## Subclassing Notes
 *
 * Every type of mutation needs to implement its own applyToRemoteDocument() and
 * applyToLocalView() to implement the actual behavior of applying the mutation
 * to some source document (see `setMutationApplyToRemoteDocument()` for an
 * example).
 */


var En = /*#__PURE__*/_createClass(function En() {
  _classCallCheck(this, En);
});
/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */


var Tn = /*#__PURE__*/function (_En) {
  _inherits(Tn, _En);

  var _super17 = _createSuper(Tn);

  function Tn(t, n, e) {
    var _this17;

    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    _classCallCheck(this, Tn);

    _this17 = _super17.call(this), _this17.key = t, _this17.value = n, _this17.precondition = e, _this17.fieldTransforms = r, _this17.type = 0
    /* Set */
    ;
    return _this17;
  }

  return _createClass(Tn);
}(En);
/**
 * A mutation that modifies fields of the document at the given key with the
 * given values. The values are applied through a field mask:
 *
 *  * When a field is in both the mask and the values, the corresponding field
 *    is updated.
 *  * When a field is in neither the mask nor the values, the corresponding
 *    field is unmodified.
 *  * When a field is in the mask but not in the values, the corresponding field
 *    is deleted.
 *  * When a field is not in the mask but is in the values, the values map is
 *    ignored.
 */


var In = /*#__PURE__*/function (_En2) {
  _inherits(In, _En2);

  var _super18 = _createSuper(In);

  function In(t, n, e, r) {
    var _this18;

    var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

    _classCallCheck(this, In);

    _this18 = _super18.call(this), _this18.key = t, _this18.data = n, _this18.fieldMask = e, _this18.precondition = r, _this18.fieldTransforms = s, _this18.type = 1
    /* Patch */
    ;
    return _this18;
  }

  return _createClass(In);
}(En);
/** A mutation that deletes the document at the given key. */


var An = /*#__PURE__*/function (_En3) {
  _inherits(An, _En3);

  var _super19 = _createSuper(An);

  function An(t, n) {
    var _this19;

    _classCallCheck(this, An);

    _this19 = _super19.call(this), _this19.key = t, _this19.precondition = n, _this19.type = 2
    /* Delete */
    , _this19.fieldTransforms = [];
    return _this19;
  }

  return _createClass(An);
}(En);
/**
 * A mutation that verifies the existence of the document at the given key with
 * the provided precondition.
 *
 * The `verify` operation is only used in Transactions, and this class serves
 * primarily to facilitate serialization into protos.
 */


var Pn = /*#__PURE__*/function (_En4) {
  _inherits(Pn, _En4);

  var _super20 = _createSuper(Pn);

  function Pn(t, n) {
    var _this20;

    _classCallCheck(this, Pn);

    _this20 = _super20.call(this), _this20.key = t, _this20.precondition = n, _this20.type = 3
    /* Verify */
    , _this20.fieldTransforms = [];
    return _this20;
  }

  return _createClass(Pn);
}(En);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var Rn = function () {
  var t = {
    asc: "ASCENDING",
    desc: "DESCENDING"
  };
  return t;
}(),
    Vn = function () {
  var t = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "!=": "NOT_EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "not-in": "NOT_IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY"
  };
  return t;
}();
/**
 * This class generates JsonObject values for the Datastore API suitable for
 * sending to either GRPC stub methods or via the JSON/HTTP REST API.
 *
 * The serializer supports both Protobuf.js and Proto3 JSON formats. By
 * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
 * format.
 *
 * For a description of the Proto3 JSON format check
 * https://developers.google.com/protocol-buffers/docs/proto3#json
 *
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */


var Dn = /*#__PURE__*/_createClass(function Dn(t, n) {
  _classCallCheck(this, Dn);

  this.databaseId = t, this.S = n;
});
/**
 * Returns a value for a number (or null) that's appropriate to put into
 * a google.protobuf.Int32Value proto.
 * DO NOT USE THIS FOR ANYTHING ELSE.
 * This method cheats. It's typed as returning "number" because that's what
 * our generated proto interfaces say Int32Value must be. But GRPC actually
 * expects a { value: <number> } struct.
 */

/**
 * Returns a value for a Date that's appropriate to put into a proto.
 */


function Nn(t, n) {
  if (t.S) {
    return "".concat(new Date(1e3 * n.seconds).toISOString().replace(/\.\d*/, "").replace("Z", ""), ".").concat(("000000000" + n.nanoseconds).slice(-9), "Z");
  }

  return {
    seconds: "" + n.seconds,
    nanos: n.nanoseconds
  };
}
/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */


function $n(t, n) {
  return t.S ? n.toBase64() : n.toUint8Array();
}

function Fn(t, n) {
  return Nn(t, n.toTimestamp());
}

function Sn(t) {
  return g(!!t), gt.fromTimestamp(function (t) {
    var n = At(t);
    return new _t(n.seconds, n.nanos);
  }(t));
}

function qn(t, n) {
  return function (t) {
    return new J(["projects", t.projectId, "databases", t.database]);
  }(t).child("documents").child(n).canonicalString();
}

function xn(t, n) {
  return qn(t.databaseId, n.path);
}

function On(t, n) {
  var e = function (t) {
    var n = J.fromString(t);
    return g(Yn(n)), n;
  }(n);

  if (e.get(1) !== t.databaseId.projectId) throw new L(I, "Tried to deserialize key from different project: " + e.get(1) + " vs " + t.databaseId.projectId);
  if (e.get(3) !== t.databaseId.database) throw new L(I, "Tried to deserialize key from different database: " + e.get(3) + " vs " + t.databaseId.database);
  return new tt((g((r = e).length > 4 && "documents" === r.get(4)), r.popFirst(5)));
  var r;
  /** Creates a Document proto from key and fields (but no create/update time) */
}

function Cn(t, n) {
  return qn(t.databaseId, n);
}

function Ln(t) {
  return new J(["projects", t.databaseId.projectId, "databases", t.databaseId.database]).canonicalString();
}

function Un(t, n, e) {
  return {
    name: xn(t, n),
    fields: e.value.mapValue.fields
  };
}

function kn(t, n) {
  return "found" in n ? function (t, n) {
    g(!!n.found), n.found.name, n.found.updateTime;
    var e = On(t, n.found.name),
        r = Sn(n.found.updateTime),
        s = new Mt({
      mapValue: {
        fields: n.found.fields
      }
    });
    return Bt.newFoundDocument(e, r, s);
  }(t, n) : "missing" in n ? function (t, n) {
    g(!!n.missing), g(!!n.readTime);
    var e = On(t, n.missing),
        r = Sn(n.readTime);
    return Bt.newNoDocument(e, r);
  }(t, n) : _();
}

function jn(t, n) {
  var e;
  if (n instanceof Tn) e = {
    update: Un(t, n.key, n.value)
  };else if (n instanceof An) e = {
    delete: xn(t, n.key)
  };else if (n instanceof In) e = {
    update: Un(t, n.key, n.data),
    updateMask: Wn(n.fieldMask)
  };else {
    if (!(n instanceof Pn)) return _();
    e = {
      verify: xn(t, n.key)
    };
  }
  return n.fieldTransforms.length > 0 && (e.updateTransforms = n.fieldTransforms.map(function (t) {
    return function (t, n) {
      var e = n.transform;
      if (e instanceof pn) return {
        fieldPath: n.field.canonicalString(),
        setToServerValue: "REQUEST_TIME"
      };
      if (e instanceof yn) return {
        fieldPath: n.field.canonicalString(),
        appendMissingElements: {
          values: e.elements
        }
      };
      if (e instanceof _n) return {
        fieldPath: n.field.canonicalString(),
        removeAllFromArray: {
          values: e.elements
        }
      };
      if (e instanceof gn) return {
        fieldPath: n.field.canonicalString(),
        increment: e.O
      };
      throw _();
    }(0, t);
  })), n.precondition.isNone || (e.currentDocument = function (t, n) {
    return void 0 !== n.updateTime ? {
      updateTime: Fn(t, n.updateTime)
    } : void 0 !== n.exists ? {
      exists: n.exists
    } : _();
  }(t, n.precondition)), e;
}

function Mn(t, n) {
  // Dissect the path into parent, collectionId, and optional key filter.
  var e = {
    structuredQuery: {}
  },
      r = n.path;
  null !== n.collectionGroup ? (e.parent = Cn(t, r), e.structuredQuery.from = [{
    collectionId: n.collectionGroup,
    allDescendants: !0
  }]) : (e.parent = Cn(t, r.popLast()), e.structuredQuery.from = [{
    collectionId: r.lastSegment()
  }]);

  var s = function (t) {
    if (0 === t.length) return;
    var n = t.map(function (t) {
      return (// visible for testing
        function (t) {
          if ("=="
          /* EQUAL */
          === t.op) {
            if (Ut(t.value)) return {
              unaryFilter: {
                field: Qn(t.field),
                op: "IS_NAN"
              }
            };
            if (Lt(t.value)) return {
              unaryFilter: {
                field: Qn(t.field),
                op: "IS_NULL"
              }
            };
          } else if ("!="
          /* NOT_EQUAL */
          === t.op) {
            if (Ut(t.value)) return {
              unaryFilter: {
                field: Qn(t.field),
                op: "IS_NOT_NAN"
              }
            };
            if (Lt(t.value)) return {
              unaryFilter: {
                field: Qn(t.field),
                op: "IS_NOT_NULL"
              }
            };
          }

          return {
            fieldFilter: {
              field: Qn(t.field),
              op: Gn(t.op),
              value: t.value
            }
          };
        }(t)
      );
    });
    if (1 === n.length) return n[0];
    return {
      compositeFilter: {
        op: "AND",
        filters: n
      }
    };
  }(n.filters);

  s && (e.structuredQuery.where = s);

  var i = function (t) {
    if (0 === t.length) return;
    return t.map(function (t) {
      return (// visible for testing
        function (t) {
          return {
            field: Qn(t.field),
            direction: zn(t.dir)
          };
        }(t)
      );
    });
  }(n.orderBy);

  i && (e.structuredQuery.orderBy = i);

  var o = function (t, n) {
    return t.S || ut(n) ? n : {
      value: n
    };
  }(t, n.limit);

  return null !== o && (e.structuredQuery.limit = o), n.startAt && (e.structuredQuery.startAt = Bn(n.startAt)), n.endAt && (e.structuredQuery.endAt = Bn(n.endAt)), e;
}

function Bn(t) {
  return {
    before: t.before,
    values: t.position
  };
} // visible for testing


function zn(t) {
  return Rn[t];
} // visible for testing


function Gn(t) {
  return Vn[t];
}

function Qn(t) {
  return {
    fieldPath: t.canonicalString()
  };
}

function Wn(t) {
  var n = [];
  return t.fields.forEach(function (t) {
    return n.push(t.canonicalString());
  }), {
    fieldPaths: n
  };
}

function Yn(t) {
  // Resource names have at least 4 components (project ID, database ID)
  return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function Hn(t) {
  return new Dn(t,
  /* useProto3Json= */
  !0);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */


var Kn = /*#__PURE__*/function () {
  function Kn(
  /**
   * The AsyncQueue to run backoff operations on.
   */
  t,
  /**
   * The ID to use when scheduling backoff operations on the AsyncQueue.
   */
  n) {
    var e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e3;
    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1.5;
    var s = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 6e4;

    _classCallCheck(this, Kn);

    this.C = t, this.timerId = n, this.L = e, this.U = r, this.k = s, this.j = 0, this.M = null,
    /** The last backoff attempt, as epoch milliseconds. */
    this.B = Date.now(), this.reset();
  }
  /**
   * Resets the backoff delay.
   *
   * The very next backoffAndWait() will have no delay. If it is called again
   * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
   * subsequent ones will increase according to the backoffFactor.
   */


  _createClass(Kn, [{
    key: "reset",
    value: function reset() {
      this.j = 0;
    }
    /**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */

  }, {
    key: "G",
    value: function G() {
      this.j = this.k;
    }
    /**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */

  }, {
    key: "W",
    value: function W(t) {
      var _this21 = this;

      // Cancel any pending backoff operation.
      this.cancel(); // First schedule using the current base (which may be 0 and should be
      // honored as such).

      var n = Math.floor(this.j + this.Y()),
          e = Math.max(0, Date.now() - this.B),
          r = Math.max(0, n - e); // Guard against lastAttemptTime being in the future due to a clock change.

      r > 0 && w("ExponentialBackoff", "Backing off for ".concat(r, " ms (base delay: ").concat(this.j, " ms, delay with jitter: ").concat(n, " ms, last attempt: ").concat(e, " ms ago)")), this.M = this.C.enqueueAfterDelay(this.timerId, r, function () {
        return _this21.B = Date.now(), t();
      }), // Apply backoff factor to determine next delay and ensure it is within
      // bounds.
      this.j *= this.U, this.j < this.L && (this.j = this.L), this.j > this.k && (this.j = this.k);
    }
  }, {
    key: "H",
    value: function H() {
      null !== this.M && (this.M.skipDelay(), this.M = null);
    }
  }, {
    key: "cancel",
    value: function cancel() {
      null !== this.M && (this.M.cancel(), this.M = null);
    }
    /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */

  }, {
    key: "Y",
    value: function Y() {
      return (Math.random() - .5) * this.j;
    }
  }]);

  return Kn;
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Datastore and its related methods are a wrapper around the external Google
 * Cloud Datastore grpc API, which provides an interface that is more convenient
 * for the rest of the client SDK architecture to consume.
 */

/**
 * An implementation of Datastore that exposes additional state for internal
 * consumption.
 */


var Jn = /*#__PURE__*/function (_ref3) {
  _inherits(Jn, _ref3);

  var _super21 = _createSuper(Jn);

  function Jn(t, n, e, r) {
    var _this22;

    _classCallCheck(this, Jn);

    _this22 = _super21.call(this), _this22.authCredentials = t, _this22.appCheckCredentials = n, _this22.K = e, _this22.q = r, _this22.J = !1;
    return _this22;
  }

  _createClass(Jn, [{
    key: "X",
    value: function X() {
      if (this.J) throw new L($, "The client has already been terminated.");
    }
    /** Invokes the provided RPC with auth and AppCheck tokens. */

  }, {
    key: "m",
    value: function m(t, n, e) {
      var _this23 = this;

      return this.X(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            r = _ref5[0],
            s = _ref5[1];

        return _this23.K.m(t, n, e, r, s);
      }).catch(function (t) {
        throw "FirebaseError" === t.name ? (t.code === D && (_this23.authCredentials.invalidateToken(), _this23.appCheckCredentials.invalidateToken()), t) : new L(_T, t.toString());
      });
    }
    /** Invokes the provided RPC with streamed results with auth and AppCheck tokens. */

  }, {
    key: "T",
    value: function T(t, n, e) {
      var _this24 = this;

      return this.X(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            r = _ref7[0],
            s = _ref7[1];

        return _this24.K.T(t, n, e, r, s);
      }).catch(function (t) {
        throw "FirebaseError" === t.name ? (t.code === D && (_this24.authCredentials.invalidateToken(), _this24.appCheckCredentials.invalidateToken()), t) : new L(_T, t.toString());
      });
    }
  }, {
    key: "terminate",
    value: function terminate() {
      this.J = !0;
    }
  }]);

  return Jn;
}( /*#__PURE__*/function () {
  function _class3() {
    _classCallCheck(this, _class3);
  }

  return _createClass(_class3);
}()); // TODO(firestorexp): Make sure there is only one Datastore instance per
// firestore-exp client.


function Xn(_x5, _x6) {
  return _Xn.apply(this, arguments);
}

function _Xn() {
  _Xn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(t, n) {
    var e, r, s;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            e = b(t), r = Ln(e.q) + "/documents", s = {
              writes: n.map(function (t) {
                return jn(e.q, t);
              })
            };
            _context7.next = 3;
            return e.m("Commit", r, s);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _Xn.apply(this, arguments);
}

function Zn(_x7, _x8) {
  return _Zn.apply(this, arguments);
}

function _Zn() {
  _Zn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(t, n) {
    var e, r, s, i, o, u;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            e = b(t);
            r = Ln(e.q) + "/documents";
            s = {
              documents: n.map(function (t) {
                return xn(e.q, t);
              })
            };
            _context8.next = 5;
            return e.T("BatchGetDocuments", r, s);

          case 5:
            i = _context8.sent;
            o = new Map();
            i.forEach(function (t) {
              var n = kn(e.q, t);
              o.set(n.key.toString(), n);
            });
            u = [];
            return _context8.abrupt("return", (n.forEach(function (t) {
              var n = o.get(t.toString());
              g(!!n), u.push(n);
            }), u));

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _Zn.apply(this, arguments);
}

function te(_x9, _x10) {
  return _te.apply(this, arguments);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function _te() {
  _te = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(t, n) {
    var e, r;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            e = b(t), r = Mn(e.q, fn(n));
            _context9.next = 3;
            return e.T("RunQuery", r.parent, {
              structuredQuery: r.structuredQuery
            });

          case 3:
            return _context9.abrupt("return", _context9.sent.filter(function (t) {
              return !!t.document;
            }).map(function (t) {
              return function (t, n, e) {
                var r = On(t, n.name),
                    s = Sn(n.updateTime),
                    i = new Mt({
                  mapValue: {
                    fields: n.fields
                  }
                }),
                    o = Bt.newFoundDocument(r, s, i);
                return e && o.setHasCommittedMutations(), e ? o.setHasCommittedMutations() : o;
              }(e.q, t.document, void 0);
            }));

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return _te.apply(this, arguments);
}

var ne = new Map();
/**
 * An instance map that ensures only one Datastore exists per Firestore
 * instance.
 */

/**
 * Returns an initialized and started Datastore for the given Firestore
 * instance. Callers must invoke removeComponents() when the Firestore
 * instance is terminated.
 */

function ee(t) {
  if (t._terminated) throw new L($, "The client has already been terminated.");

  if (!ne.has(t)) {
    w("ComponentProvider", "Initializing Datastore");

    var i = function (t) {
      return new dt(t, fetch.bind(null));
    }((n = t._databaseId, e = t.app.options.appId || "", r = t._persistenceKey, s = t._freezeSettings(), new Y(n, e, r, s.host, s.ssl, s.experimentalForceLongPolling, s.experimentalAutoDetectLongPolling, s.useFetchStreams))),
        o = Hn(t._databaseId),
        u = function (t, n, e, r) {
      return new Jn(t, n, e, r);
    }(t._authCredentials, t._appCheckCredentials, i, o);

    ne.set(t, u);
  }

  var n, e, r, s;
  /**
  * @license
  * Copyright 2018 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

  return ne.get(t);
}
/**
 * Removes all components associated with the provided instance. Must be called
 * when the `Firestore` instance is terminated.
 */

/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied `FirestoreSettings` object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */


var re = /*#__PURE__*/function () {
  function re(t) {
    _classCallCheck(this, re);

    var n;

    if (void 0 === t.host) {
      if (void 0 !== t.ssl) throw new L(I, "Can't provide ssl option if host option is not set");
      this.host = "firestore.googleapis.com", this.ssl = true;
    } else this.host = t.host, this.ssl = null === (n = t.ssl) || void 0 === n || n;

    if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040;else {
      if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new L(I, "cacheSizeBytes must be at least 1048576");
      this.cacheSizeBytes = t.cacheSizeBytes;
    }
    this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, this.useFetchStreams = !!t.useFetchStreams, function (t, n, e, r) {
      if (!0 === n && !0 === r) throw new L(I, "".concat(t, " and ").concat(e, " cannot be used together."));
    }("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling);
  }

  _createClass(re, [{
    key: "isEqual",
    value: function isEqual(t) {
      return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties && this.useFetchStreams === t.useFetchStreams;
    }
  }]);

  return re;
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */


var se = /*#__PURE__*/function () {
  /** @hideconstructor */
  function se(t, n, e) {
    _classCallCheck(this, se);

    this._authCredentials = n, this._appCheckCredentials = e,
    /**
     * Whether it's a Firestore or Firestore Lite instance.
     */
    this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new re({}), this._settingsFrozen = !1, t instanceof H ? this._databaseId = t : (this._app = t, this._databaseId = function (t) {
      if (!Object.prototype.hasOwnProperty.apply(t.options, ["projectId"])) throw new L(I, '"projectId" not provided in firebase.initializeApp.');
      return new H(t.options.projectId);
    }
    /**
    * Initializes a new instance of Cloud Firestore with the provided settings.
    * Can only be called before any other functions, including
    * {@link getFirestore}. If the custom settings are empty, this function is
    * equivalent to calling {@link getFirestore}.
    *
    * @param app - The {@link @firebase/app#FirebaseApp} with which the `Firestore` instance will
    * be associated.
    * @param settings - A settings object to configure the `Firestore` instance.
    * @returns A newly initialized `Firestore` instance.
    */
    (t));
  }
  /**
   * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
   * instance.
   */


  _createClass(se, [{
    key: "app",
    get: function get() {
      if (!this._app) throw new L($, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
      return this._app;
    }
  }, {
    key: "_initialized",
    get: function get() {
      return this._settingsFrozen;
    }
  }, {
    key: "_terminated",
    get: function get() {
      return void 0 !== this._terminateTask;
    }
  }, {
    key: "_setSettings",
    value: function _setSettings(t) {
      if (this._settingsFrozen) throw new L($, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
      this._settings = new re(t), void 0 !== t.credentials && (this._authCredentials = function (t) {
        if (!t) return new j();

        switch (t.type) {
          case "gapi":
            var n = t.client; // Make sure this really is a Gapi client.

            return g(!("object" != _typeof(n) || null === n || !n.auth || !n.auth.getAuthHeaderValueForFirstParty)), new G(n, t.sessionIndex || "0", t.iamToken || null);

          case "provider":
            return t.client;

          default:
            throw new L(I, "makeAuthCredentialsProvider failed due to invalid credential type");
        }
      }(t.credentials));
    }
  }, {
    key: "_getSettings",
    value: function _getSettings() {
      return this._settings;
    }
  }, {
    key: "_freezeSettings",
    value: function _freezeSettings() {
      return this._settingsFrozen = !0, this._settings;
    }
  }, {
    key: "_delete",
    value: function _delete() {
      return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
    }
    /** Returns a JSON-serializable representation of this `Firestore` instance. */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        app: this._app,
        databaseId: this._databaseId,
        settings: this._settings
      };
    }
    /**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */

  }, {
    key: "_terminate",
    value: function _terminate() {
      return function (t) {
        var n = ne.get(t);
        n && (w("ComponentProvider", "Removing Datastore"), ne.delete(t), n.terminate());
      }(this), Promise.resolve();
    }
  }]);

  return se;
}();

exports.Firestore = se;

function ie(t, n) {
  var e = (0, _app._getProvider)(t, "firestore/lite");
  if (e.isInitialized()) throw new L($, "Firestore can only be initialized once per app.");
  return e.initialize({
    options: n
  });
}
/**
 * Returns the existing `Firestore` instance that is associated with the
 * provided {@link @firebase/app#FirebaseApp}. If no instance exists, initializes a new
 * instance with default settings.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned `Firestore`
 * instance is associated with.
 * @returns The `Firestore` instance of the provided app.
 */


function oe() {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _app.getApp)();
  return (0, _app._getProvider)(n, "firestore/lite").getImmediate();
}
/**
 * Modify this instance to communicate with the Cloud Firestore emulator.
 *
 * Note: This must be called before this instance has been used to do any
 * operations.
 *
 * @param firestore - The `Firestore` instance to configure to connect to the
 * emulator.
 * @param host - the emulator host (ex: localhost).
 * @param port - the emulator port (ex: 9000).
 * @param options.mockUserToken - the mock auth token to use for unit testing
 * Security Rules.
 */


function ue(t, n, e) {
  var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var s;

  var i = (t = it(t, se))._getSettings();

  if ("firestore.googleapis.com" !== i.host && i.host !== n && p("Host has been set in both settings() and useEmulator(), emulator host will be used"), t._setSettings(Object.assign(Object.assign({}, i), {
    host: "".concat(n, ":").concat(e),
    ssl: !1
  })), r.mockUserToken) {
    var _n11, _e7;

    if ("string" == typeof r.mockUserToken) _n11 = r.mockUserToken, _e7 = h.MOCK_USER;else {
      // Let createMockUserToken validate first (catches common mistakes like
      // invalid field "uid" and missing field "sub" / "user_id".)
      _n11 = (0, _util.createMockUserToken)(r.mockUserToken, null === (s = t._app) || void 0 === s ? void 0 : s.options.projectId);

      var _i2 = r.mockUserToken.sub || r.mockUserToken.user_id;

      if (!_i2) throw new L(I, "mockUserToken must contain 'sub' or 'user_id' field!");
      _e7 = new h(_i2);
    }
    t._authCredentials = new M(new k(_n11, _e7));
  }
}
/**
 * Terminates the provided `Firestore` instance.
 *
 * After calling `terminate()` only the `clearIndexedDbPersistence()` functions
 * may be used. Any other function will throw a `FirestoreError`. Termination
 * does not cancel any pending writes, and any promises that are awaiting a
 * response from the server will not be resolved.
 *
 * To restart after termination, create a new instance of `Firestore` with
 * {@link getFirestore}.
 *
 * Note: Under normal circumstances, calling `terminate()` is not required. This
 * function is useful only when you want to force this instance to release all of
 * its resources or in combination with {@link clearIndexedDbPersistence} to
 * ensure that all local state is destroyed between test runs.
 *
 * @param firestore - The `Firestore` instance to terminate.
 * @returns A `Promise` that is resolved when the instance has been successfully
 * terminated.
 */


function ce(t) {
  return t = it(t, se), (0, _app._removeServiceInstance)(t.app, "firestore/lite"), t._delete();
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist.
 */


var ae = /*#__PURE__*/function () {
  /** @hideconstructor */
  function ae(t,
  /**
   * If provided, the `FirestoreDataConverter` associated with this instance.
   */
  n, e) {
    _classCallCheck(this, ae);

    this.converter = n, this._key = e,
    /** The type of this Firestore reference. */
    this.type = "document", this.firestore = t;
  }

  _createClass(ae, [{
    key: "_path",
    get: function get() {
      return this._key.path;
    }
    /**
     * The document's identifier within its collection.
     */

  }, {
    key: "id",
    get: function get() {
      return this._key.path.lastSegment();
    }
    /**
     * A string representing the path of the referenced document (relative
     * to the root of the database).
     */

  }, {
    key: "path",
    get: function get() {
      return this._key.path.canonicalString();
    }
    /**
     * The collection this `DocumentReference` belongs to.
     */

  }, {
    key: "parent",
    get: function get() {
      return new le(this.firestore, this.converter, this._key.path.popLast());
    }
  }, {
    key: "withConverter",
    value: function withConverter(t) {
      return new ae(this.firestore, t, this._key);
    }
  }]);

  return ae;
}();
/**
 * A `Query` refers to a query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */


exports.DocumentReference = ae;

var he = /*#__PURE__*/function () {
  // This is the lite version of the Query class in the main SDK.

  /** @hideconstructor protected */
  function he(t,
  /**
   * If provided, the `FirestoreDataConverter` associated with this instance.
   */
  n, e) {
    _classCallCheck(this, he);

    this.converter = n, this._query = e,
    /** The type of this Firestore reference. */
    this.type = "query", this.firestore = t;
  }

  _createClass(he, [{
    key: "withConverter",
    value: function withConverter(t) {
      return new he(this.firestore, t, this._query);
    }
  }]);

  return he;
}();
/**
 * A `CollectionReference` object can be used for adding documents, getting
 * document references, and querying for documents (using {@link query}).
 */


exports.Query = he;

var le = /*#__PURE__*/function (_he) {
  _inherits(le, _he);

  var _super22 = _createSuper(le);

  /** @hideconstructor */
  function le(t, n, e) {
    var _this25;

    _classCallCheck(this, le);

    _this25 = _super22.call(this, t, n, new on(e)), _this25._path = e,
    /** The type of this Firestore reference. */
    _this25.type = "collection";
    return _this25;
  }
  /** The collection's identifier. */


  _createClass(le, [{
    key: "id",
    get: function get() {
      return this._query.path.lastSegment();
    }
    /**
     * A string representing the path of the referenced collection (relative
     * to the root of the database).
     */

  }, {
    key: "path",
    get: function get() {
      return this._query.path.canonicalString();
    }
    /**
     * A reference to the containing `DocumentReference` if this is a
     * subcollection. If this isn't a subcollection, the reference is null.
     */

  }, {
    key: "parent",
    get: function get() {
      var t = this._path.popLast();

      return t.isEmpty() ? null : new ae(this.firestore,
      /* converter= */
      null, new tt(t));
    }
  }, {
    key: "withConverter",
    value: function withConverter(t) {
      return new le(this.firestore, t, this._path);
    }
  }]);

  return le;
}(he);

exports.CollectionReference = le;

function fe(t, n) {
  for (var _len5 = arguments.length, e = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
    e[_key5 - 2] = arguments[_key5];
  }

  if (t = (0, _util.getModularInstance)(t), nt("collection", "path", n), t instanceof se) {
    var r = J.fromString.apply(J, [n].concat(e));
    return rt(r), new le(t,
    /* converter= */
    null, r);
  }

  {
    if (!(t instanceof ae || t instanceof le)) throw new L(I, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");

    var _r2 = t._path.child(J.fromString.apply(J, [n].concat(e)));

    return rt(_r2), new le(t.firestore,
    /* converter= */
    null, _r2);
  }
} // TODO(firestorelite): Consider using ErrorFactory -
// https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106

/**
 * Creates and returns a new `Query` instance that includes all documents in the
 * database that are contained in a collection or subcollection with the
 * given `collectionId`.
 *
 * @param firestore - A reference to the root `Firestore` instance.
 * @param collectionId - Identifies the collections to query over. Every
 * collection or subcollection with this ID as the last segment of its path
 * will be included. Cannot contain a slash.
 * @returns The created `Query`.
 */


function de(t, n) {
  if (t = it(t, se), nt("collectionGroup", "collection id", n), n.indexOf("/") >= 0) throw new L(I, "Invalid collection ID '".concat(n, "' passed to function collectionGroup(). Collection IDs must not contain '/'."));
  return new he(t,
  /* converter= */
  null,
  /**
  * Creates a new Query for a collection group query that matches all documents
  * within the provided collection group.
  */
  function (t) {
    return new on(J.emptyPath(), t);
  }(n));
}

function we(t, n) {
  for (var _len6 = arguments.length, e = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
    e[_key6 - 2] = arguments[_key6];
  }

  if (t = (0, _util.getModularInstance)(t), // We allow omission of 'pathString' but explicitly prohibit passing in both
  // 'undefined' and 'null'.
  1 === arguments.length && (n = mt.P()), nt("doc", "path", n), t instanceof se) {
    var r = J.fromString.apply(J, [n].concat(e));
    return et(r), new ae(t,
    /* converter= */
    null, new tt(r));
  }

  {
    if (!(t instanceof ae || t instanceof le)) throw new L(I, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");

    var _r3 = t._path.child(J.fromString.apply(J, [n].concat(e)));

    return et(_r3), new ae(t.firestore, t instanceof le ? t.converter : null, new tt(_r3));
  }
}
/**
 * Returns true if the provided references are equal.
 *
 * @param left - A reference to compare.
 * @param right - A reference to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */


function me(t, n) {
  return t = (0, _util.getModularInstance)(t), n = (0, _util.getModularInstance)(n), (t instanceof ae || t instanceof le) && (n instanceof ae || n instanceof le) && t.firestore === n.firestore && t.path === n.path && t.converter === n.converter;
}
/**
 * Returns true if the provided queries point to the same collection and apply
 * the same constraints.
 *
 * @param left - A `Query` to compare.
 * @param right - A `Query` to compare.
 * @returns true if the references point to the same location in the same
 * Firestore database.
 */


function pe(t, n) {
  return t = (0, _util.getModularInstance)(t), n = (0, _util.getModularInstance)(n), t instanceof he && n instanceof he && t.firestore === n.firestore && dn(t._query, n._query) && t.converter === n.converter;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a
 * list of field names (referring to a nested field in the document).
 *
 * Create a `FieldPath` by providing field names. If more than one field
 * name is provided, the path will point to a nested field in a document.
 */


var ye = /*#__PURE__*/function () {
  /**
   * Creates a `FieldPath` from the provided field names. If more than one field
   * name is provided, the path will point to a nested field in a document.
   *
   * @param fieldNames - A list of field names.
   */
  function ye() {
    _classCallCheck(this, ye);

    for (var _len7 = arguments.length, t = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      t[_key7] = arguments[_key7];
    }

    for (var n = 0; n < t.length; ++n) {
      if (0 === t[n].length) throw new L(I, "Invalid field name at argument $(i + 1). Field names must not be empty.");
    }

    this._internalPath = new Z(t);
  }
  /**
   * Returns true if this `FieldPath` is equal to the provided one.
   *
   * @param other - The `FieldPath` to compare against.
   * @returns true if this `FieldPath` is equal to the provided one.
   */


  _createClass(ye, [{
    key: "isEqual",
    value: function isEqual(t) {
      return this._internalPath.isEqual(t._internalPath);
    }
  }]);

  return ye;
}();
/**
 * Returns a special sentinel `FieldPath` to refer to the ID of a document.
 * It can be used in queries to sort or filter by the document ID.
 */


exports.FieldPath = ye;

function _e() {
  return new ye("__name__");
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An immutable object representing an array of bytes.
 */


var ge = /*#__PURE__*/function () {
  /** @hideconstructor */
  function ge(t) {
    _classCallCheck(this, ge);

    this._byteString = t;
  }
  /**
   * Creates a new `Bytes` object from the given Base64 string, converting it to
   * bytes.
   *
   * @param base64 - The Base64 string used to create the `Bytes` object.
   */


  _createClass(ge, [{
    key: "toBase64",
    value:
    /**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */
    function toBase64() {
      return this._byteString.toBase64();
    }
    /**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */

  }, {
    key: "toUint8Array",
    value: function toUint8Array() {
      return this._byteString.toUint8Array();
    }
    /**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */

  }, {
    key: "toString",
    value: function toString() {
      return "Bytes(base64: " + this.toBase64() + ")";
    }
    /**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */

  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return this._byteString.isEqual(t._byteString);
    }
  }], [{
    key: "fromBase64String",
    value: function fromBase64String(t) {
      try {
        return new ge(Tt.fromBase64String(t));
      } catch (t) {
        throw new L(I, "Failed to construct data from Base64 string: " + t);
      }
    }
    /**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */

  }, {
    key: "fromUint8Array",
    value: function fromUint8Array(t) {
      return new ge(Tt.fromUint8Array(t));
    }
  }]);

  return ge;
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */


exports.Bytes = ge;

var be = /*#__PURE__*/_createClass(
/**
 * @param _methodName - The public API endpoint that returns this class.
 * @hideconstructor
 */
function be(t) {
  _classCallCheck(this, be);

  this._methodName = t;
});
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An immutable object representing a geographic location in Firestore. The
 * location is represented as latitude/longitude pair.
 *
 * Latitude values are in the range of [-90, 90].
 * Longitude values are in the range of [-180, 180].
 */


exports.FieldValue = be;

var ve = /*#__PURE__*/function () {
  /**
   * Creates a new immutable `GeoPoint` object with the provided latitude and
   * longitude values.
   * @param latitude - The latitude as number between -90 and 90.
   * @param longitude - The longitude as number between -180 and 180.
   */
  function ve(t, n) {
    _classCallCheck(this, ve);

    if (!isFinite(t) || t < -90 || t > 90) throw new L(I, "Latitude must be a number between -90 and 90, but was: " + t);
    if (!isFinite(n) || n < -180 || n > 180) throw new L(I, "Longitude must be a number between -180 and 180, but was: " + n);
    this._lat = t, this._long = n;
  }
  /**
   * The latitude of this `GeoPoint` instance.
   */


  _createClass(ve, [{
    key: "latitude",
    get: function get() {
      return this._lat;
    }
    /**
     * The longitude of this `GeoPoint` instance.
     */

  }, {
    key: "longitude",
    get: function get() {
      return this._long;
    }
    /**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */

  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return this._lat === t._lat && this._long === t._long;
    }
    /** Returns a JSON-serializable representation of this GeoPoint. */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        latitude: this._lat,
        longitude: this._long
      };
    }
    /**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */

  }, {
    key: "_compareTo",
    value: function _compareTo(t) {
      return pt(this._lat, t._lat) || pt(this._long, t._long);
    }
  }]);

  return ve;
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.GeoPoint = ve;
var Ee = /^__.*__$/;
/** The result of parsing document data (e.g. for a setData call). */

var Te = /*#__PURE__*/function () {
  function Te(t, n, e) {
    _classCallCheck(this, Te);

    this.data = t, this.fieldMask = n, this.fieldTransforms = e;
  }

  _createClass(Te, [{
    key: "toMutation",
    value: function toMutation(t, n) {
      return null !== this.fieldMask ? new In(t, this.data, this.fieldMask, n, this.fieldTransforms) : new Tn(t, this.data, n, this.fieldTransforms);
    }
  }]);

  return Te;
}();
/** The result of parsing "update" data (i.e. for an updateData call). */


var Ie = /*#__PURE__*/function () {
  function Ie(t, // The fieldMask does not include document transforms.
  n, e) {
    _classCallCheck(this, Ie);

    this.data = t, this.fieldMask = n, this.fieldTransforms = e;
  }

  _createClass(Ie, [{
    key: "toMutation",
    value: function toMutation(t, n) {
      return new In(t, this.data, this.fieldMask, n, this.fieldTransforms);
    }
  }]);

  return Ie;
}();

function Ae(t) {
  switch (t) {
    case 0
    /* Set */
    : // fall through

    case 2
    /* MergeSet */
    : // fall through

    case 1
    /* Update */
    :
      return !0;

    case 3
    /* Argument */
    :
    case 4
    /* ArrayArgument */
    :
      return !1;

    default:
      throw _();
  }
}
/** A "context" object passed around while parsing user data. */


var Pe = /*#__PURE__*/function () {
  /**
   * Initializes a ParseContext with the given source and path.
   *
   * @param settings - The settings for the parser.
   * @param databaseId - The database ID of the Firestore instance.
   * @param serializer - The serializer to use to generate the Value proto.
   * @param ignoreUndefinedProperties - Whether to ignore undefined properties
   * rather than throw.
   * @param fieldTransforms - A mutable list of field transforms encountered
   * while parsing the data.
   * @param fieldMask - A mutable list of field paths encountered while parsing
   * the data.
   *
   * TODO(b/34871131): We don't support array paths right now, so path can be
   * null to indicate the context represents any location within an array (in
   * which case certain features will not work and errors will be somewhat
   * compromised).
   */
  function Pe(t, n, e, r, s, i) {
    _classCallCheck(this, Pe);

    this.settings = t, this.databaseId = n, this.q = e, this.ignoreUndefinedProperties = r, // Minor hack: If fieldTransforms is undefined, we assume this is an
    // external call and we need to validate the entire path.
    void 0 === s && this.Z(), this.fieldTransforms = s || [], this.fieldMask = i || [];
  }

  _createClass(Pe, [{
    key: "path",
    get: function get() {
      return this.settings.path;
    }
  }, {
    key: "tt",
    get: function get() {
      return this.settings.tt;
    }
    /** Returns a new context with the specified settings overwritten. */

  }, {
    key: "nt",
    value: function nt(t) {
      return new Pe(Object.assign(Object.assign({}, this.settings), t), this.databaseId, this.q, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
    }
  }, {
    key: "et",
    value: function et(t) {
      var n;
      var e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t),
          r = this.nt({
        path: e,
        rt: !1
      });
      return r.st(t), r;
    }
  }, {
    key: "it",
    value: function it(t) {
      var n;
      var e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t),
          r = this.nt({
        path: e,
        rt: !1
      });
      return r.Z(), r;
    }
  }, {
    key: "ot",
    value: function ot(t) {
      // TODO(b/34871131): We don't support array paths right now; so make path
      // undefined.
      return this.nt({
        path: void 0,
        rt: !0
      });
    }
  }, {
    key: "ut",
    value: function ut(t) {
      return Qe(t, this.settings.methodName, this.settings.ct || !1, this.path, this.settings.at);
    }
    /** Returns 'true' if 'fieldPath' was traversed when creating this context. */

  }, {
    key: "contains",
    value: function contains(t) {
      return void 0 !== this.fieldMask.find(function (n) {
        return t.isPrefixOf(n);
      }) || void 0 !== this.fieldTransforms.find(function (n) {
        return t.isPrefixOf(n.field);
      });
    }
  }, {
    key: "Z",
    value: function Z() {
      // TODO(b/34871131): Remove null check once we have proper paths for fields
      // within arrays.
      if (this.path) for (var t = 0; t < this.path.length; t++) {
        this.st(this.path.get(t));
      }
    }
  }, {
    key: "st",
    value: function st(t) {
      if (0 === t.length) throw this.ut("Document fields must not be empty");
      if (Ae(this.tt) && Ee.test(t)) throw this.ut('Document fields cannot begin and end with "__"');
    }
  }]);

  return Pe;
}();
/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */


var Re = /*#__PURE__*/function () {
  function Re(t, n, e) {
    _classCallCheck(this, Re);

    this.databaseId = t, this.ignoreUndefinedProperties = n, this.q = e || Hn(t);
  }
  /** Creates a new top-level parse context. */


  _createClass(Re, [{
    key: "ht",
    value: function ht(t, n, e) {
      var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      return new Pe({
        tt: t,
        methodName: n,
        at: e,
        path: Z.emptyPath(),
        rt: !1,
        ct: r
      }, this.databaseId, this.q, this.ignoreUndefinedProperties);
    }
  }]);

  return Re;
}();

function Ve(t) {
  var n = t._freezeSettings(),
      e = Hn(t._databaseId);

  return new Re(t._databaseId, !!n.ignoreUndefinedProperties, e);
}
/** Parse document data from a set() call. */


function De(t, n, e, r, s) {
  var i = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var o = t.ht(i.merge || i.mergeFields ? 2
  /* MergeSet */
  : 0
  /* Set */
  , n, e, s);
  Me("Data must be an object, but it was:", o, r);
  var u = ke(r, o);
  var c, a;
  if (i.merge) c = new Et(o.fieldMask), a = o.fieldTransforms;else if (i.mergeFields) {
    var _t13 = [];

    var _iterator6 = _createForOfIteratorHelper(i.mergeFields),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _r4 = _step6.value;

        var _s2 = Be(n, _r4, e);

        if (!o.contains(_s2)) throw new L(I, "Field '".concat(_s2, "' is specified in your field mask but missing from your input data."));
        We(_t13, _s2) || _t13.push(_s2);
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    c = new Et(_t13), a = o.fieldTransforms.filter(function (t) {
      return c.covers(t.field);
    });
  } else c = null, a = o.fieldTransforms;
  return new Te(new Mt(u), c, a);
}

var Ne = /*#__PURE__*/function (_be) {
  _inherits(Ne, _be);

  var _super23 = _createSuper(Ne);

  function Ne() {
    _classCallCheck(this, Ne);

    return _super23.apply(this, arguments);
  }

  _createClass(Ne, [{
    key: "_toFieldTransform",
    value: function _toFieldTransform(t) {
      if (2
      /* MergeSet */
      !== t.tt) throw 1
      /* Update */
      === t.tt ? t.ut("".concat(this._methodName, "() can only appear at the top level of your update data")) : t.ut("".concat(this._methodName, "() cannot be used with set() unless you pass {merge:true}")); // No transform to add for a delete, but we need to add it to our
      // fieldMask so it gets deleted.

      return t.fieldMask.push(t.path), null;
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return t instanceof Ne;
    }
  }]);

  return Ne;
}(be);
/**
 * Creates a child context for parsing SerializableFieldValues.
 *
 * This is different than calling `ParseContext.contextWith` because it keeps
 * the fieldTransforms and fieldMask separate.
 *
 * The created context has its `dataSource` set to `UserDataSource.Argument`.
 * Although these values are used with writes, any elements in these FieldValues
 * are not considered writes since they cannot contain any FieldValue sentinels,
 * etc.
 *
 * @param fieldValue - The sentinel FieldValue for which to create a child
 *     context.
 * @param context - The parent context.
 * @param arrayElement - Whether or not the FieldValue has an array.
 */


function $e(t, n, e) {
  return new Pe({
    tt: 3
    /* Argument */
    ,
    at: n.settings.at,
    methodName: t._methodName,
    rt: e
  }, n.databaseId, n.q, n.ignoreUndefinedProperties);
}

var Fe = /*#__PURE__*/function (_be2) {
  _inherits(Fe, _be2);

  var _super24 = _createSuper(Fe);

  function Fe() {
    _classCallCheck(this, Fe);

    return _super24.apply(this, arguments);
  }

  _createClass(Fe, [{
    key: "_toFieldTransform",
    value: function _toFieldTransform(t) {
      return new bn(t.path, new pn());
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      return t instanceof Fe;
    }
  }]);

  return Fe;
}(be);

var Se = /*#__PURE__*/function (_be3) {
  _inherits(Se, _be3);

  var _super25 = _createSuper(Se);

  function Se(t, n) {
    var _this26;

    _classCallCheck(this, Se);

    _this26 = _super25.call(this, t), _this26.lt = n;
    return _this26;
  }

  _createClass(Se, [{
    key: "_toFieldTransform",
    value: function _toFieldTransform(t) {
      var n = $e(this, t,
      /*array=*/
      !0),
          e = this.lt.map(function (t) {
        return Ue(t, n);
      }),
          r = new yn(e);
      return new bn(t.path, r);
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      // TODO(mrschmidt): Implement isEquals
      return this === t;
    }
  }]);

  return Se;
}(be);

var qe = /*#__PURE__*/function (_be4) {
  _inherits(qe, _be4);

  var _super26 = _createSuper(qe);

  function qe(t, n) {
    var _this27;

    _classCallCheck(this, qe);

    _this27 = _super26.call(this, t), _this27.lt = n;
    return _this27;
  }

  _createClass(qe, [{
    key: "_toFieldTransform",
    value: function _toFieldTransform(t) {
      var n = $e(this, t,
      /*array=*/
      !0),
          e = this.lt.map(function (t) {
        return Ue(t, n);
      }),
          r = new _n(e);
      return new bn(t.path, r);
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      // TODO(mrschmidt): Implement isEquals
      return this === t;
    }
  }]);

  return qe;
}(be);

var xe = /*#__PURE__*/function (_be5) {
  _inherits(xe, _be5);

  var _super27 = _createSuper(xe);

  function xe(t, n) {
    var _this28;

    _classCallCheck(this, xe);

    _this28 = _super27.call(this, t), _this28.ft = n;
    return _this28;
  }

  _createClass(xe, [{
    key: "_toFieldTransform",
    value: function _toFieldTransform(t) {
      var n = new gn(t.q, wn(t.q, this.ft));
      return new bn(t.path, n);
    }
  }, {
    key: "isEqual",
    value: function isEqual(t) {
      // TODO(mrschmidt): Implement isEquals
      return this === t;
    }
  }]);

  return xe;
}(be);
/** Parse update data from an update() call. */


function Oe(t, n, e, r) {
  var s = t.ht(1
  /* Update */
  , n, e);
  Me("Data must be an object, but it was:", s, r);
  var i = [],
      o = Mt.empty();
  vt(r, function (t, r) {
    var u = Ge(n, t, e); // For Compat types, we have to "extract" the underlying types before
    // performing validation.

    r = (0, _util.getModularInstance)(r);
    var c = s.it(u);
    if (r instanceof Ne) // Add it to the field mask, but don't add anything to updateData.
      i.push(u);else {
      var _t14 = Ue(r, c);

      null != _t14 && (i.push(u), o.set(u, _t14));
    }
  });
  var u = new Et(i);
  return new Ie(o, u, s.fieldTransforms);
}
/** Parse update data from a list of field/value arguments. */


function Ce(t, n, e, r, s, i) {
  var o = t.ht(1
  /* Update */
  , n, e),
      u = [Be(n, r, e)],
      c = [s];
  if (i.length % 2 != 0) throw new L(I, "Function ".concat(n, "() needs to be called with an even number of arguments that alternate between field names and values."));

  for (var _t15 = 0; _t15 < i.length; _t15 += 2) {
    u.push(Be(n, i[_t15])), c.push(i[_t15 + 1]);
  }

  var h = [],
      l = Mt.empty(); // We iterate in reverse order to pick the last value for a field if the
  // user specified the field multiple times.

  for (var _t16 = u.length - 1; _t16 >= 0; --_t16) {
    if (!We(h, u[_t16])) {
      var _n12 = u[_t16];
      var _e8 = c[_t16]; // For Compat types, we have to "extract" the underlying types before
      // performing validation.

      _e8 = (0, _util.getModularInstance)(_e8);

      var _r5 = o.it(_n12);

      if (_e8 instanceof Ne) // Add it to the field mask, but don't add anything to updateData.
        h.push(_n12);else {
        var _t17 = Ue(_e8, _r5);

        null != _t17 && (h.push(_n12), l.set(_n12, _t17));
      }
    }
  }

  var f = new Et(h);
  return new Ie(l, f, o.fieldTransforms);
}
/**
 * Parse a "query value" (e.g. value in a where filter or a value in a cursor
 * bound).
 *
 * @param allowArrays - Whether the query value is an array that may directly
 * contain additional arrays (e.g. the operand of an `in` query).
 */


function Le(t, n, e) {
  var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
  return Ue(e, t.ht(r ? 4
  /* ArrayArgument */
  : 3
  /* Argument */
  , n));
}
/**
 * Parses user data to Protobuf Values.
 *
 * @param input - Data to be parsed.
 * @param context - A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @returns The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */


function Ue(t, n) {
  if (je( // Unwrap the API type from the Compat SDK. This will return the API type
  // from firestore-exp.
  t = (0, _util.getModularInstance)(t))) return Me("Unsupported field value:", n, t), ke(t, n);
  if (t instanceof be) // FieldValues usually parse into transforms (except FieldValue.delete())
    // in which case we do not want to include this field in our parsed data
    // (as doing so will overwrite the field directly prior to the transform
    // trying to transform it). So we don't add this location to
    // context.fieldMask and we return null as our parsing result.

    /**
    * "Parses" the provided FieldValueImpl, adding any necessary transforms to
    * context.fieldTransforms.
    */
    return function (t, n) {
      // Sentinels are only supported with writes, and not within arrays.
      if (!Ae(n.tt)) throw n.ut("".concat(t._methodName, "() can only be used with update() and set()"));
      if (!n.path) throw n.ut("".concat(t._methodName, "() is not currently supported inside arrays"));

      var e = t._toFieldTransform(n);

      e && n.fieldTransforms.push(e);
    }
    /**
    * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
    *
    * @returns The parsed value
    */
    (t, n), null;
  if (void 0 === t && n.ignoreUndefinedProperties) // If the input is undefined it can never participate in the fieldMask, so
    // don't handle this below. If `ignoreUndefinedProperties` is false,
    // `parseScalarValue` will reject an undefined value.
    return null;

  if ( // If context.path is null we are inside an array and we don't support
  // field mask paths more granular than the top-level array.
  n.path && n.fieldMask.push(n.path), t instanceof Array) {
    // TODO(b/34871131): Include the path containing the array in the error
    // message.
    // In the case of IN queries, the parsed data is an array (representing
    // the set of values to be included for the IN query) that may directly
    // contain additional arrays (each representing an individual field
    // value), so we disable this validation.
    if (n.settings.rt && 4
    /* ArrayArgument */
    !== n.tt) throw n.ut("Nested arrays are not supported");
    return function (t, n) {
      var e = [];
      var r = 0;

      var _iterator7 = _createForOfIteratorHelper(t),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var s = _step7.value;

          var _t18 = Ue(s, n.ot(r));

          null == _t18 && ( // Just include nulls in the array for fields being replaced with a
          // sentinel.
          _t18 = {
            nullValue: "NULL_VALUE"
          }), e.push(_t18), r++;
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      return {
        arrayValue: {
          values: e
        }
      };
    }(t, n);
  }

  return function (t, n) {
    if (null === (t = (0, _util.getModularInstance)(t))) return {
      nullValue: "NULL_VALUE"
    };
    if ("number" == typeof t) return wn(n.q, t);
    if ("boolean" == typeof t) return {
      booleanValue: t
    };
    if ("string" == typeof t) return {
      stringValue: t
    };

    if (t instanceof Date) {
      var e = _t.fromDate(t);

      return {
        timestampValue: Nn(n.q, e)
      };
    }

    if (t instanceof _t) {
      // Firestore backend truncates precision down to microseconds. To ensure
      // offline mode works the same with regards to truncation, perform the
      // truncation immediately without waiting for the backend to do that.
      var _e9 = new _t(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));

      return {
        timestampValue: Nn(n.q, _e9)
      };
    }

    if (t instanceof ve) return {
      geoPointValue: {
        latitude: t.latitude,
        longitude: t.longitude
      }
    };
    if (t instanceof ge) return {
      bytesValue: $n(n.q, t._byteString)
    };

    if (t instanceof ae) {
      var _e10 = n.databaseId,
          r = t.firestore._databaseId;
      if (!r.isEqual(_e10)) throw n.ut("Document reference is for database ".concat(r.projectId, "/").concat(r.database, " but should be for database ").concat(_e10.projectId, "/").concat(_e10.database));
      return {
        referenceValue: qn(t.firestore._databaseId || n.databaseId, t._key.path)
      };
    }

    throw n.ut("Unsupported field value: ".concat(st(t)));
  }
  /**
  * Checks whether an object looks like a JSON object that should be converted
  * into a struct. Normal class/prototype instances are considered to look like
  * JSON objects since they should be converted to a struct value. Arrays, Dates,
  * GeoPoints, etc. are not considered to look like JSON objects since they map
  * to specific FieldValue types other than ObjectValue.
  */
  (t, n);
}

function ke(t, n) {
  var e = {};
  return !function (t) {
    for (var _n13 in t) {
      if (Object.prototype.hasOwnProperty.call(t, _n13)) return !1;
    }

    return !0;
  }(t) ? vt(t, function (t, r) {
    var s = Ue(r, n.et(t));
    null != s && (e[t] = s);
  }) : // If we encounter an empty object, we explicitly add it to the update
  // mask to ensure that the server creates a map entry.
  n.path && n.path.length > 0 && n.fieldMask.push(n.path), {
    mapValue: {
      fields: e
    }
  };
}

function je(t) {
  return !("object" != _typeof(t) || null === t || t instanceof Array || t instanceof Date || t instanceof _t || t instanceof ve || t instanceof ge || t instanceof ae || t instanceof be);
}

function Me(t, n, e) {
  if (!je(e) || !function (t) {
    return "object" == _typeof(t) && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
  }(e)) {
    var r = st(e);
    throw "an object" === r ? n.ut(t + " a custom object") : n.ut(t + " " + r);
  }
}
/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */


function Be(t, n, e) {
  if (( // If required, replace the FieldPath Compat class with with the firestore-exp
  // FieldPath.
  n = (0, _util.getModularInstance)(n)) instanceof ye) return n._internalPath;
  if ("string" == typeof n) return Ge(t, n);
  throw Qe("Field path arguments must be of type string or FieldPath.", t,
  /* hasConverter= */
  !1,
  /* path= */
  void 0, e);
}
/**
 * Matches any characters in a field path string that are reserved.
 */


var ze = new RegExp("[~\\*/\\[\\]]");
/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName - The publicly visible method name
 * @param path - The dot-separated string form of a field path which will be
 * split on dots.
 * @param targetDoc - The document against which the field path will be
 * evaluated.
 */

function Ge(t, n, e) {
  if (n.search(ze) >= 0) throw Qe("Invalid field path (".concat(n, "). Paths must not contain '~', '*', '/', '[', or ']'"), t,
  /* hasConverter= */
  !1,
  /* path= */
  void 0, e);

  try {
    return _construct(ye, _toConsumableArray(n.split(".")))._internalPath;
  } catch (r) {
    throw Qe("Invalid field path (".concat(n, "). Paths must not be empty, begin with '.', end with '.', or contain '..'"), t,
    /* hasConverter= */
    !1,
    /* path= */
    void 0, e);
  }
}

function Qe(t, n, e, r, s) {
  var i = r && !r.isEmpty(),
      o = void 0 !== s;
  var u = "Function ".concat(n, "() called with invalid data");
  e && (u += " (via `toFirestore()`)"), u += ". ";
  var c = "";
  return (i || o) && (c += " (found", i && (c += " in field ".concat(r)), o && (c += " in document ".concat(s)), c += ")"), new L(I, u + t + c);
}
/** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */


function We(t, n) {
  return t.some(function (t) {
    return t.isEqual(n);
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */


var Ye = /*#__PURE__*/function () {
  // Note: This class is stripped down version of the DocumentSnapshot in
  // the legacy SDK. The changes are:
  // - No support for SnapshotMetadata.
  // - No support for SnapshotOptions.

  /** @hideconstructor protected */
  function Ye(t, n, e, r, s) {
    _classCallCheck(this, Ye);

    this._firestore = t, this._userDataWriter = n, this._key = e, this._document = r, this._converter = s;
  }
  /** Property of the `DocumentSnapshot` that provides the document's ID. */


  _createClass(Ye, [{
    key: "id",
    get: function get() {
      return this._key.path.lastSegment();
    }
    /**
     * The `DocumentReference` for the document included in the `DocumentSnapshot`.
     */

  }, {
    key: "ref",
    get: function get() {
      return new ae(this._firestore, this._converter, this._key);
    }
    /**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */

  }, {
    key: "exists",
    value: function exists() {
      return null !== this._document;
    }
    /**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */

  }, {
    key: "data",
    value: function data() {
      if (this._document) {
        if (this._converter) {
          // We only want to use the converter and create a new DocumentSnapshot
          // if a converter has been provided.
          var t = new He(this._firestore, this._userDataWriter, this._key, this._document,
          /* converter= */
          null);
          return this._converter.fromFirestore(t);
        }

        return this._userDataWriter.convertValue(this._document.data.value);
      }
    }
    /**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    // We are using `any` here to avoid an explicit cast by our users.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "get",
    value: function get(t) {
      if (this._document) {
        var n = this._document.data.field(Xe("DocumentSnapshot.get", t));

        if (null !== n) return this._userDataWriter.convertValue(n);
      }
    }
  }]);

  return Ye;
}();
/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */


exports.DocumentSnapshot = Ye;

var He = /*#__PURE__*/function (_Ye) {
  _inherits(He, _Ye);

  var _super28 = _createSuper(He);

  function He() {
    _classCallCheck(this, He);

    return _super28.apply(this, arguments);
  }

  _createClass(He, [{
    key: "data",
    value:
    /**
     * Retrieves all fields in the document as an `Object`.
     *
     * @override
     * @returns An `Object` containing all fields in the document.
     */
    function data() {
      return _get(_getPrototypeOf(He.prototype), "data", this).call(this);
    }
  }]);

  return He;
}(Ye);
/**
 * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
 * representing the results of a query. The documents can be accessed as an
 * array via the `docs` property or enumerated using the `forEach` method. The
 * number of documents can be determined via the `empty` and `size`
 * properties.
 */


exports.QueryDocumentSnapshot = He;

var Ke = /*#__PURE__*/function () {
  /** @hideconstructor */
  function Ke(t, n) {
    _classCallCheck(this, Ke);

    this._docs = n, this.query = t;
  }
  /** An array of all the documents in the `QuerySnapshot`. */


  _createClass(Ke, [{
    key: "docs",
    get: function get() {
      return _toConsumableArray(this._docs);
    }
    /** The number of documents in the `QuerySnapshot`. */

  }, {
    key: "size",
    get: function get() {
      return this.docs.length;
    }
    /** True if there are no documents in the `QuerySnapshot`. */

  }, {
    key: "empty",
    get: function get() {
      return 0 === this.docs.length;
    }
    /**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */

  }, {
    key: "forEach",
    value: function forEach(t, n) {
      this._docs.forEach(t, n);
    }
  }]);

  return Ke;
}();
/**
 * Returns true if the provided snapshots are equal.
 *
 * @param left - A snapshot to compare.
 * @param right - A snapshot to compare.
 * @returns true if the snapshots are equal.
 */


exports.QuerySnapshot = Ke;

function Je(t, n) {
  return t = (0, _util.getModularInstance)(t), n = (0, _util.getModularInstance)(n), t instanceof Ye && n instanceof Ye ? t._firestore === n._firestore && t._key.isEqual(n._key) && (null === t._document ? null === n._document : t._document.isEqual(n._document)) && t._converter === n._converter : t instanceof Ke && n instanceof Ke && pe(t.query, n.query) && yt(t.docs, n.docs, Je);
}
/**
 * Helper that calls `fromDotSeparatedString()` but wraps any error thrown.
 */


function Xe(t, n) {
  return "string" == typeof n ? Ge(t, n) : n instanceof ye ? n._internalPath : n._delegate._internalPath;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Firestore query. `QueryConstraint`s are created by invoking {@link where},
 * {@link orderBy}, {@link (startAt:1)}, {@link (startAfter:1)}, {@link
 * endBefore:1}, {@link (endAt:1)}, {@link limit} or {@link limitToLast} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */


var Ze = /*#__PURE__*/_createClass(function Ze() {
  _classCallCheck(this, Ze);
});
/**
 * Creates a new immutable instance of {@link Query} that is extended to also include
 * additional query constraints.
 *
 * @param query - The {@link Query} instance to use as a base for the new constraints.
 * @param queryConstraints - The list of {@link QueryConstraint}s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */


exports.QueryConstraint = Ze;

function tr(t) {
  for (var _len8 = arguments.length, n = new Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
    n[_key8 - 1] = arguments[_key8];
  }

  for (var _i3 = 0, _n14 = n; _i3 < _n14.length; _i3++) {
    var e = _n14[_i3];
    t = e._apply(t);
  }

  return t;
}

var nr = /*#__PURE__*/function (_Ze) {
  _inherits(nr, _Ze);

  var _super29 = _createSuper(nr);

  function nr(t, n, e) {
    var _this29;

    _classCallCheck(this, nr);

    _this29 = _super29.call(this), _this29.dt = t, _this29.wt = n, _this29.yt = e, _this29.type = "where";
    return _this29;
  }

  _createClass(nr, [{
    key: "_apply",
    value: function _apply(t) {
      var n = Ve(t.firestore),
          e = function (t, n, e, r, s, i, o) {
        var u;

        if (s.isKeyField()) {
          if ("array-contains"
          /* ARRAY_CONTAINS */
          === i || "array-contains-any"
          /* ARRAY_CONTAINS_ANY */
          === i) throw new L(I, "Invalid Query. You can't perform '".concat(i, "' queries on FieldPath.documentId()."));

          if ("in"
          /* IN */
          === i || "not-in"
          /* NOT_IN */
          === i) {
            pr(o, i);
            var _n15 = [];

            var _iterator8 = _createForOfIteratorHelper(o),
                _step8;

            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                var _e11 = _step8.value;

                _n15.push(mr(r, t, _e11));
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }

            u = {
              arrayValue: {
                values: _n15
              }
            };
          } else u = mr(r, t, o);
        } else "in"
        /* IN */
        !== i && "not-in"
        /* NOT_IN */
        !== i && "array-contains-any"
        /* ARRAY_CONTAINS_ANY */
        !== i || pr(o, i), u = Le(e, n, o,
        /* allowArrays= */
        "in"
        /* IN */
        === i || "not-in"
        /* NOT_IN */
        === i);

        var c = Qt.create(s, i, u);
        return function (t, n) {
          if (n.N()) {
            var _e12 = an(t);

            if (null !== _e12 && !_e12.isEqual(n.field)) throw new L(I, "Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '".concat(_e12.toString(), "' and '").concat(n.field.toString(), "'"));

            var _r6 = cn(t);

            null !== _r6 && yr(t, n.field, _r6);
          }

          var e = function (t, n) {
            var _iterator9 = _createForOfIteratorHelper(t.filters),
                _step9;

            try {
              for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
                var _e13 = _step9.value;
                if (n.indexOf(_e13.op) >= 0) return _e13.op;
              }
            } catch (err) {
              _iterator9.e(err);
            } finally {
              _iterator9.f();
            }

            return null;
          }(t,
          /**
          * Given an operator, returns the set of operators that cannot be used with it.
          *
          * Operators in a query must adhere to the following set of rules:
          * 1. Only one array operator is allowed.
          * 2. Only one disjunctive operator is allowed.
          * 3. `NOT_EQUAL` cannot be used with another `NOT_EQUAL` operator.
          * 4. `NOT_IN` cannot be used with array, disjunctive, or `NOT_EQUAL` operators.
          *
          * Array operators: `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ANY`
          * Disjunctive operators: `IN`, `ARRAY_CONTAINS_ANY`, `NOT_IN`
          */
          function (t) {
            switch (t) {
              case "!="
              /* NOT_EQUAL */
              :
                return ["!="
                /* NOT_EQUAL */
                , "not-in"
                /* NOT_IN */
                ];

              case "array-contains"
              /* ARRAY_CONTAINS */
              :
                return ["array-contains"
                /* ARRAY_CONTAINS */
                , "array-contains-any"
                /* ARRAY_CONTAINS_ANY */
                , "not-in"
                /* NOT_IN */
                ];

              case "in"
              /* IN */
              :
                return ["array-contains-any"
                /* ARRAY_CONTAINS_ANY */
                , "in"
                /* IN */
                , "not-in"
                /* NOT_IN */
                ];

              case "array-contains-any"
              /* ARRAY_CONTAINS_ANY */
              :
                return ["array-contains"
                /* ARRAY_CONTAINS */
                , "array-contains-any"
                /* ARRAY_CONTAINS_ANY */
                , "in"
                /* IN */
                , "not-in"
                /* NOT_IN */
                ];

              case "not-in"
              /* NOT_IN */
              :
                return ["array-contains"
                /* ARRAY_CONTAINS */
                , "array-contains-any"
                /* ARRAY_CONTAINS_ANY */
                , "in"
                /* IN */
                , "not-in"
                /* NOT_IN */
                , "!="
                /* NOT_EQUAL */
                ];

              default:
                return [];
            }
          }(n.op));

          if (null !== e) // Special case when it's a duplicate op to give a slightly clearer error message.
            throw e === n.op ? new L(I, "Invalid query. You cannot use more than one '".concat(n.op.toString(), "' filter.")) : new L(I, "Invalid query. You cannot use '".concat(n.op.toString(), "' filters with '").concat(e.toString(), "' filters."));
        }(t, c), c;
      }(t._query, "where", n, t.firestore._databaseId, this.dt, this.wt, this.yt);

      return new he(t.firestore, t.converter, function (t, n) {
        var e = t.filters.concat([n]);
        return new on(t.path, t.collectionGroup, t.explicitOrderBy.slice(), e, t.limit, t.limitType, t.startAt, t.endAt);
      }(t._query, e));
    }
  }]);

  return nr;
}(Ze);
/**
 * Creates a {@link QueryConstraint} that enforces that documents must contain the
 * specified field and that the value should satisfy the relation constraint
 * provided.
 *
 * @param fieldPath - The path to compare
 * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
 *   "&lt;=", "!=").
 * @param value - The value for comparison
 * @returns The created {@link Query}.
 */


function er(t, n, e) {
  var r = n,
      s = Xe("where", t);
  return new nr(s, r, e);
}

var rr = /*#__PURE__*/function (_Ze2) {
  _inherits(rr, _Ze2);

  var _super30 = _createSuper(rr);

  function rr(t, n) {
    var _this30;

    _classCallCheck(this, rr);

    _this30 = _super30.call(this), _this30.dt = t, _this30._t = n, _this30.type = "orderBy";
    return _this30;
  }

  _createClass(rr, [{
    key: "_apply",
    value: function _apply(t) {
      var n = function (t, n, e) {
        if (null !== t.startAt) throw new L(I, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
        if (null !== t.endAt) throw new L(I, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
        var r = new en(n, e);
        return function (t, n) {
          if (null === cn(t)) {
            // This is the first order by. It must match any inequality.
            var _e14 = an(t);

            null !== _e14 && yr(t, _e14, n.field);
          }
        }(t, r), r;
      }
      /**
      * Create a `Bound` from a query and a document.
      *
      * Note that the `Bound` will always include the key of the document
      * and so only the provided document will compare equal to the returned
      * position.
      *
      * Will throw if the document does not contain all fields of the order by
      * of the query or if any of the fields in the order by are an uncommitted
      * server timestamp.
      */
      (t._query, this.dt, this._t);

      return new he(t.firestore, t.converter, function (t, n) {
        // TODO(dimond): validate that orderBy does not list the same key twice.
        var e = t.explicitOrderBy.concat([n]);
        return new on(t.path, t.collectionGroup, e, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
      }(t._query, n));
    }
  }]);

  return rr;
}(Ze);
/**
 * Creates a {@link QueryConstraint} that sorts the query result by the
 * specified field, optionally in descending order instead of ascending.
 *
 * @param fieldPath - The field to sort by.
 * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
 * not specified, order will be ascending.
 * @returns The created {@link Query}.
 */


function sr(t) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "asc";
  var e = n,
      r = Xe("orderBy", t);
  return new rr(r, e);
}

var ir = /*#__PURE__*/function (_Ze3) {
  _inherits(ir, _Ze3);

  var _super31 = _createSuper(ir);

  function ir(t, n, e) {
    var _this31;

    _classCallCheck(this, ir);

    _this31 = _super31.call(this), _this31.type = t, _this31.gt = n, _this31.bt = e;
    return _this31;
  }

  _createClass(ir, [{
    key: "_apply",
    value: function _apply(t) {
      return new he(t.firestore, t.converter, function (t, n, e) {
        return new on(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), n, e, t.startAt, t.endAt);
      }(t._query, this.gt, this.bt));
    }
  }]);

  return ir;
}(Ze);
/**
 * Creates a {@link QueryConstraint} that only returns the first matching documents.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */


function or(t) {
  return ot("limit", t), new ir("limit", t, "F"
  /* First */
  );
}
/**
 * Creates a {@link QueryConstraint} that only returns the last matching documents.
 *
 * You must specify at least one `orderBy` clause for `limitToLast` queries,
 * otherwise an exception will be thrown during execution.
 *
 * @param limit - The maximum number of items to return.
 * @returns The created {@link Query}.
 */


function ur(t) {
  return ot("limitToLast", t), new ir("limitToLast", t, "L"
  /* Last */
  );
}

var cr = /*#__PURE__*/function (_Ze4) {
  _inherits(cr, _Ze4);

  var _super32 = _createSuper(cr);

  function cr(t, n, e) {
    var _this32;

    _classCallCheck(this, cr);

    _this32 = _super32.call(this), _this32.type = t, _this32.vt = n, _this32.Et = e;
    return _this32;
  }

  _createClass(cr, [{
    key: "_apply",
    value: function _apply(t) {
      var n = wr(t, this.type, this.vt, this.Et);
      return new he(t.firestore, t.converter, function (t, n) {
        return new on(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, n, t.endAt);
      }(t._query, n));
    }
  }]);

  return cr;
}(Ze);

function ar() {
  for (var _len9 = arguments.length, t = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    t[_key9] = arguments[_key9];
  }

  return new cr("startAt", t,
  /*before=*/
  !0);
}

function hr() {
  for (var _len10 = arguments.length, t = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
    t[_key10] = arguments[_key10];
  }

  return new cr("startAfter", t,
  /*before=*/
  !1);
}

var lr = /*#__PURE__*/function (_Ze5) {
  _inherits(lr, _Ze5);

  var _super33 = _createSuper(lr);

  function lr(t, n, e) {
    var _this33;

    _classCallCheck(this, lr);

    _this33 = _super33.call(this), _this33.type = t, _this33.vt = n, _this33.Et = e;
    return _this33;
  }

  _createClass(lr, [{
    key: "_apply",
    value: function _apply(t) {
      var n = wr(t, this.type, this.vt, this.Et);
      return new he(t.firestore, t.converter, function (t, n) {
        return new on(t.path, t.collectionGroup, t.explicitOrderBy.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, n);
      }(t._query, n));
    }
  }]);

  return lr;
}(Ze);

function fr() {
  for (var _len11 = arguments.length, t = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
    t[_key11] = arguments[_key11];
  }

  return new lr("endBefore", t,
  /*before=*/
  !0);
}

function dr() {
  for (var _len12 = arguments.length, t = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
    t[_key12] = arguments[_key12];
  }

  return new lr("endAt", t,
  /*before=*/
  !1);
}
/** Helper function to create a bound from a document or fields */


function wr(t, n, e, r) {
  if (e[0] = (0, _util.getModularInstance)(e[0]), e[0] instanceof Ye) return function (t, n, e, r, s) {
    if (!r) throw new L(P, "Can't use a DocumentSnapshot that doesn't exist for ".concat(e, "()."));
    var i = []; // Because people expect to continue/end a query at the exact document
    // provided, we need to use the implicit sort order rather than the explicit
    // sort order, because it's guaranteed to contain the document key. That way
    // the position becomes unambiguous and the query continues/ends exactly at
    // the provided document. Without the key (by using the explicit sort
    // orders), multiple documents could match the position, yielding duplicate
    // results.

    var _iterator10 = _createForOfIteratorHelper(ln(t)),
        _step10;

    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var _e15 = _step10.value;
        if (_e15.field.isKeyField()) i.push(Ot(n, r.key));else {
          var _t19 = r.data.field(_e15.field);

          if (Vt(_t19)) throw new L(I, 'Invalid query. You are trying to start or end a query using a document for which the field "' + _e15.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');

          if (null === _t19) {
            var _t20 = _e15.field.canonicalString();

            throw new L(I, "Invalid query. You are trying to start or end a query using a document for which the field '".concat(_t20, "' (used as the orderBy) does not exist."));
          }

          i.push(_t19);
        }
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }

    return new nn(i, s);
  }
  /**
  * Converts a list of field values to a `Bound` for the given query.
  */
  (t._query, t.firestore._databaseId, n, e[0]._document, r);
  {
    var s = Ve(t.firestore);
    return function (t, n, e, r, s, i) {
      // Use explicit order by's because it has to match the query the user made
      var o = t.explicitOrderBy;
      if (s.length > o.length) throw new L(I, "Too many arguments provided to ".concat(r, "(). The number of arguments must be less than or equal to the number of orderBy() clauses"));
      var u = [];

      for (var _i4 = 0; _i4 < s.length; _i4++) {
        var c = s[_i4];

        if (o[_i4].field.isKeyField()) {
          if ("string" != typeof c) throw new L(I, "Invalid query. Expected a string for document ID in ".concat(r, "(), but got a ").concat(_typeof(c)));
          if (!hn(t) && -1 !== c.indexOf("/")) throw new L(I, "Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ".concat(r, "() must be a plain document ID, but '").concat(c, "' contains a slash."));

          var _e16 = t.path.child(J.fromString(c));

          if (!tt.isDocumentKey(_e16)) throw new L(I, "Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ".concat(r, "() must result in a valid document path, but '").concat(_e16, "' is not because it contains an odd number of segments."));

          var _s3 = new tt(_e16);

          u.push(Ot(n, _s3));
        } else {
          var _t21 = Le(e, r, c);

          u.push(_t21);
        }
      }

      return new nn(u, i);
    }
    /**
    * Parses the given `documentIdValue` into a `ReferenceValue`, throwing
    * appropriate errors if the value is anything other than a `DocumentReference`
    * or `string`, or if the string is malformed.
    */
    (t._query, t.firestore._databaseId, s, n, e, r);
  }
}

function mr(t, n, e) {
  if ("string" == typeof (e = (0, _util.getModularInstance)(e))) {
    if ("" === e) throw new L(I, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
    if (!hn(n) && -1 !== e.indexOf("/")) throw new L(I, "Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '".concat(e, "' contains a '/' character."));
    var r = n.path.child(J.fromString(e));
    if (!tt.isDocumentKey(r)) throw new L(I, "Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '".concat(r, "' is not because it has an odd number of segments (").concat(r.length, ")."));
    return Ot(t, new tt(r));
  }

  if (e instanceof ae) return Ot(t, e._key);
  throw new L(I, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: ".concat(st(e), "."));
}
/**
 * Validates that the value passed into a disjunctive filter satisfies all
 * array requirements.
 */


function pr(t, n) {
  if (!Array.isArray(t) || 0 === t.length) throw new L(I, "Invalid Query. A non-empty array is required for '".concat(n.toString(), "' filters."));
  if (t.length > 10) throw new L(I, "Invalid Query. '".concat(n.toString(), "' filters support a maximum of 10 elements in the value array."));
}

function yr(t, n, e) {
  if (!e.isEqual(n)) throw new L(I, "Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '".concat(n.toString(), "' and so you must also use '").concat(n.toString(), "' as your first argument to orderBy(), but your first orderBy() is on field '").concat(e.toString(), "' instead."));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 *
 * @internal
 */

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Converts custom model object of type T into `DocumentData` by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to `DocumentData`
 * because we want to provide the user with a more specific error message if
 * their `set()` or fails due to invalid data originating from a `toFirestore()`
 * call.
 */


function _r(t, n, e) {
  var r; // Cast to `any` in order to satisfy the union type constraint on
  // toFirestore().
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return r = t ? e && (e.merge || e.mergeFields) ? t.toFirestore(n, e) : t.toFirestore(n) : n, r;
}

var gr = /*#__PURE__*/function (_ref8) {
  _inherits(gr, _ref8);

  var _super34 = _createSuper(gr);

  function gr(t) {
    var _this34;

    _classCallCheck(this, gr);

    _this34 = _super34.call(this), _this34.firestore = t;
    return _this34;
  }

  _createClass(gr, [{
    key: "convertBytes",
    value: function convertBytes(t) {
      return new ge(t);
    }
  }, {
    key: "convertReference",
    value: function convertReference(t) {
      var n = this.convertDocumentKey(t, this.firestore._databaseId);
      return new ae(this.firestore,
      /* converter= */
      null, n);
    }
  }]);

  return gr;
}( /*#__PURE__*/function () {
  function _class4() {
    _classCallCheck(this, _class4);
  }

  _createClass(_class4, [{
    key: "convertValue",
    value: function convertValue(t) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "none";

      switch ($t(t)) {
        case 0
        /* NullValue */
        :
          return null;

        case 1
        /* BooleanValue */
        :
          return t.booleanValue;

        case 2
        /* NumberValue */
        :
          return Pt(t.integerValue || t.doubleValue);

        case 3
        /* TimestampValue */
        :
          return this.convertTimestamp(t.timestampValue);

        case 4
        /* ServerTimestampValue */
        :
          return this.convertServerTimestamp(t, n);

        case 5
        /* StringValue */
        :
          return t.stringValue;

        case 6
        /* BlobValue */
        :
          return this.convertBytes(Rt(t.bytesValue));

        case 7
        /* RefValue */
        :
          return this.convertReference(t.referenceValue);

        case 8
        /* GeoPointValue */
        :
          return this.convertGeoPoint(t.geoPointValue);

        case 9
        /* ArrayValue */
        :
          return this.convertArray(t.arrayValue, n);

        case 10
        /* ObjectValue */
        :
          return this.convertObject(t.mapValue, n);

        default:
          throw _();
      }
    }
  }, {
    key: "convertObject",
    value: function convertObject(t, n) {
      var _this35 = this;

      var e = {};
      return vt(t.fields, function (t, r) {
        e[t] = _this35.convertValue(r, n);
      }), e;
    }
  }, {
    key: "convertGeoPoint",
    value: function convertGeoPoint(t) {
      return new ve(Pt(t.latitude), Pt(t.longitude));
    }
  }, {
    key: "convertArray",
    value: function convertArray(t, n) {
      var _this36 = this;

      return (t.values || []).map(function (t) {
        return _this36.convertValue(t, n);
      });
    }
  }, {
    key: "convertServerTimestamp",
    value: function convertServerTimestamp(t, n) {
      switch (n) {
        case "previous":
          var e = Dt(t);
          return null == e ? null : this.convertValue(e, n);

        case "estimate":
          return this.convertTimestamp(Nt(t));

        default:
          return null;
      }
    }
  }, {
    key: "convertTimestamp",
    value: function convertTimestamp(t) {
      var n = At(t);
      return new _t(n.seconds, n.nanos);
    }
  }, {
    key: "convertDocumentKey",
    value: function convertDocumentKey(t, n) {
      var e = J.fromString(t);
      g(Yn(e));
      var r = new H(e.get(1), e.get(3)),
          s = new tt(e.popFirst(5));
      return r.isEqual(n) || // TODO(b/64130202): Somehow support foreign references.
      m("Document ".concat(s, " contains a document reference within a different database (").concat(r.projectId, "/").concat(r.database, ") which is not supported. It will be treated as a reference in the current database (").concat(n.projectId, "/").concat(n.database, ") instead.")), s;
    }
  }]);

  return _class4;
}());
/**
 * Reads the document referred to by the specified document reference.
 *
 * All documents are directly fetched from the server, even if the document was
 * previously read or modified. Recent modifications are only reflected in the
 * retrieved `DocumentSnapshot` if they have already been applied by the
 * backend. If the client is offline, the read fails. If you like to use
 * caching or see local modifications, please use the full Firestore SDK.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A Promise resolved with a `DocumentSnapshot` containing the current
 * document contents.
 */


function br(t) {
  var n = ee((t = it(t, ae)).firestore),
      e = new gr(t.firestore);
  return Zn(n, [t._key]).then(function (n) {
    g(1 === n.length);
    var r = n[0];
    return new Ye(t.firestore, e, t._key, r.isFoundDocument() ? r : null, t.converter);
  });
}
/**
 * Executes the query and returns the results as a {@link QuerySnapshot}.
 *
 * All queries are executed directly by the server, even if the the query was
 * previously executed. Recent modifications are only reflected in the retrieved
 * results if they have already been applied by the backend. If the client is
 * offline, the operation fails. To see previously cached result and local
 * modifications, use the full Firestore SDK.
 *
 * @param query - The `Query` to execute.
 * @returns A Promise that will be resolved with the results of the query.
 */


function vr(t) {
  !function (t) {
    if (un(t) && 0 === t.explicitOrderBy.length) throw new L(q, "limitToLast() queries require specifying at least one orderBy() clause");
  }((t = it(t, he))._query);
  var n = ee(t.firestore),
      e = new gr(t.firestore);
  return te(n, t._query).then(function (n) {
    var r = n.map(function (n) {
      return new He(t.firestore, e, n.key, n, t.converter);
    });
    return un(t._query) && // Limit to last queries reverse the orderBy constraint that was
    // specified by the user. As such, we need to reverse the order of the
    // results to return the documents in the expected order.
    r.reverse(), new Ke(t, r);
  });
}

function Er(t, n, e) {
  var r = _r((t = it(t, ae)).converter, n, e),
      s = De(Ve(t.firestore), "setDoc", t._key, r, null !== t.converter, e);

  return Xn(ee(t.firestore), [s.toMutation(t._key, vn.none())]);
}

function Tr(t, n, e) {
  var s = Ve((t = it(t, ae)).firestore); // For Compat types, we have to "extract" the underlying types before
  // performing validation.

  var i;

  for (var _len13 = arguments.length, r = new Array(_len13 > 3 ? _len13 - 3 : 0), _key13 = 3; _key13 < _len13; _key13++) {
    r[_key13 - 3] = arguments[_key13];
  }

  i = "string" == typeof (n = (0, _util.getModularInstance)(n)) || n instanceof ye ? Ce(s, "updateDoc", t._key, n, e, r) : Oe(s, "updateDoc", t._key, n);
  return Xn(ee(t.firestore), [i.toMutation(t._key, vn.exists(!0))]);
}
/**
 * Deletes the document referred to by the specified `DocumentReference`.
 *
 * The deletion will only be reflected in document reads that occur after the
 * returned promise resolves. If the client is offline, the
 * delete fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the document to delete.
 * @returns A `Promise` resolved once the document has been successfully
 * deleted from the backend.
 */


function Ir(t) {
  return Xn(ee((t = it(t, ae)).firestore), [new An(t._key, vn.none())]);
}
/**
 * Add a new document to specified `CollectionReference` with the given data,
 * assigning it a document ID automatically.
 *
 * The result of this write will only be reflected in document reads that occur
 * after the returned promise resolves. If the client is offline, the
 * write fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @param reference - A reference to the collection to add this document to.
 * @param data - An Object containing the data for the new document.
 * @returns A `Promise` resolved with a `DocumentReference` pointing to the
 * newly created document after it has been written to the backend.
 */


function Ar(t, n) {
  var e = we(t = it(t, le)),
      r = _r(t.converter, n),
      s = De(Ve(t.firestore), "addDoc", e._key, r, null !== e.converter, {});

  return Xn(ee(t.firestore), [s.toMutation(e._key, vn.exists(!1))]).then(function () {
    return e;
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a sentinel for use with {@link @firebase/firestore/lite#(updateDoc:1)} or
 * {@link @firebase/firestore/lite#(setDoc:1)} with `{merge: true}` to mark a field for deletion.
 */


function Pr() {
  return new Ne("deleteField");
}
/**
 * Returns a sentinel used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link @firebase/firestore/lite#(updateDoc:1)} to
 * include a server-generated timestamp in the written data.
 */


function Rr() {
  return new Fe("serverTimestamp");
}
/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to union the given elements with any array
 * value that already exists on the server. Each specified element that doesn't
 * already exist in the array will be added to the end. If the field being
 * modified is not already an array it will be overwritten with an array
 * containing exactly the specified elements.
 *
 * @param elements - The elements to union into the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`.
 */


function Vr() {
  for (var _len14 = arguments.length, t = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
    t[_key14] = arguments[_key14];
  }

  // NOTE: We don't actually parse the data until it's used in set() or
  // update() since we'd need the Firestore instance to do this.
  return new Se("arrayUnion", t);
}
/**
 * Returns a special value that can be used with {@link (setDoc:1)} or {@link
 * updateDoc:1} that tells the server to remove the given elements from any
 * array value that already exists on the server. All instances of each element
 * specified will be removed from the array. If the field being modified is not
 * already an array it will be overwritten with an empty array.
 *
 * @param elements - The elements to remove from the array.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */


function Dr() {
  for (var _len15 = arguments.length, t = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
    t[_key15] = arguments[_key15];
  }

  // NOTE: We don't actually parse the data until it's used in set() or
  // update() since we'd need the Firestore instance to do this.
  return new qe("arrayRemove", t);
}
/**
 * Returns a special value that can be used with {@link @firebase/firestore/lite#(setDoc:1)} or {@link
 * @firebase/firestore/lite#(updateDoc:1)} that tells the server to increment the field's current value by
 * the given value.
 *
 * If either the operand or the current field value uses floating point
 * precision, all arithmetic follows IEEE 754 semantics. If both values are
 * integers, values outside of JavaScript's safe number range
 * (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`) are also subject to
 * precision loss. Furthermore, once processed by the Firestore backend, all
 * integer operations are capped between -2^63 and 2^63-1.
 *
 * If the current field value is not of type `number`, or if the field does not
 * yet exist, the transformation sets the field to the given value.
 *
 * @param n - The value to increment by.
 * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
 * `updateDoc()`
 */


function Nr(t) {
  return new xe("increment", t);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A write batch, used to perform multiple writes as a single atomic unit.
 *
 * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
 * provides methods for adding writes to the write batch. None of the writes
 * will be committed (or visible locally) until {@link WriteBatch.commit} is
 * called.
 */


var $r = /*#__PURE__*/function () {
  /** @hideconstructor */
  function $r(t, n) {
    _classCallCheck(this, $r);

    this._firestore = t, this._commitHandler = n, this._mutations = [], this._committed = !1, this._dataReader = Ve(t);
  }

  _createClass($r, [{
    key: "set",
    value: function set(t, n, e) {
      this._verifyNotCommitted();

      var r = Fr(t, this._firestore),
          s = _r(r.converter, n, e),
          i = De(this._dataReader, "WriteBatch.set", r._key, s, null !== r.converter, e);

      return this._mutations.push(i.toMutation(r._key, vn.none())), this;
    }
  }, {
    key: "update",
    value: function update(t, n, e) {
      this._verifyNotCommitted();

      var s = Fr(t, this._firestore); // For Compat types, we have to "extract" the underlying types before
      // performing validation.

      var i;

      for (var _len16 = arguments.length, r = new Array(_len16 > 3 ? _len16 - 3 : 0), _key16 = 3; _key16 < _len16; _key16++) {
        r[_key16 - 3] = arguments[_key16];
      }

      return i = "string" == typeof (n = (0, _util.getModularInstance)(n)) || n instanceof ye ? Ce(this._dataReader, "WriteBatch.update", s._key, n, e, r) : Oe(this._dataReader, "WriteBatch.update", s._key, n), this._mutations.push(i.toMutation(s._key, vn.exists(!0))), this;
    }
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `WriteBatch` instance. Used for chaining method calls.
     */

  }, {
    key: "delete",
    value: function _delete(t) {
      this._verifyNotCommitted();

      var n = Fr(t, this._firestore);
      return this._mutations = this._mutations.concat(new An(n._key, vn.none())), this;
    }
    /**
     * Commits all of the writes in this write batch as a single atomic unit.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A `Promise` resolved once all of the writes in the batch have been
     * successfully written to the backend as an atomic unit (note that it won't
     * resolve while you're offline).
     */

  }, {
    key: "commit",
    value: function commit() {
      return this._verifyNotCommitted(), this._committed = !0, this._mutations.length > 0 ? this._commitHandler(this._mutations) : Promise.resolve();
    }
  }, {
    key: "_verifyNotCommitted",
    value: function _verifyNotCommitted() {
      if (this._committed) throw new L($, "A write batch can no longer be used after commit() has been called.");
    }
  }]);

  return $r;
}();

exports.WriteBatch = $r;

function Fr(t, n) {
  if ((t = (0, _util.getModularInstance)(t)).firestore !== n) throw new L(I, "Provided document reference is from a different Firestore instance.");
  return t;
}
/**
 * Creates a write batch, used for performing multiple writes as a single
 * atomic operation. The maximum number of writes allowed in a single WriteBatch
 * is 500.
 *
 * The result of these writes will only be reflected in document reads that
 * occur after the returned promise resolves. If the client is offline, the
 * write fails. If you would like to see local modifications or buffer writes
 * until the client is online, use the full Firestore SDK.
 *
 * @returns A `WriteBatch` that can be used to atomically execute multiple
 * writes.
 */


function Sr(t) {
  var n = ee(t = it(t, se));
  return new $r(t, function (t) {
    return Xn(n, t);
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal transaction object responsible for accumulating the mutations to
 * perform and the base versions for any documents read.
 */


var qr = /*#__PURE__*/function () {
  function qr(t) {
    _classCallCheck(this, qr);

    this.datastore = t, // The version of each document that was read during this transaction.
    this.readVersions = new Map(), this.mutations = [], this.committed = !1,
    /**
     * A deferred usage error that occurred previously in this transaction that
     * will cause the transaction to fail once it actually commits.
     */
    this.lastWriteError = null,
    /**
     * Set of documents that have been written in the transaction.
     *
     * When there's more than one write to the same key in a transaction, any
     * writes after the first are handled differently.
     */
    this.writtenDocs = new Set();
  }

  _createClass(qr, [{
    key: "lookup",
    value: function () {
      var _lookup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(t) {
        var _this37 = this;

        var n;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.ensureCommitNotCalled(), this.mutations.length > 0)) {
                  _context2.next = 2;
                  break;
                }

                throw new L(I, "Firestore transactions require all reads to be executed before all writes.");

              case 2:
                _context2.next = 4;
                return Zn(this.datastore, t);

              case 4:
                n = _context2.sent;
                return _context2.abrupt("return", (n.forEach(function (t) {
                  return _this37.recordVersion(t);
                }), n));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function lookup(_x11) {
        return _lookup.apply(this, arguments);
      }

      return lookup;
    }()
  }, {
    key: "set",
    value: function set(t, n) {
      this.write(n.toMutation(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }
  }, {
    key: "update",
    value: function update(t, n) {
      try {
        this.write(n.toMutation(t, this.preconditionForUpdate(t)));
      } catch (t) {
        this.lastWriteError = t;
      }

      this.writtenDocs.add(t.toString());
    }
  }, {
    key: "delete",
    value: function _delete(t) {
      this.write(new An(t, this.precondition(t))), this.writtenDocs.add(t.toString());
    }
  }, {
    key: "commit",
    value: function () {
      var _commit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this38 = this;

        var t;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.ensureCommitNotCalled(), this.lastWriteError)) {
                  _context3.next = 2;
                  break;
                }

                throw this.lastWriteError;

              case 2:
                t = this.readVersions; // For each mutation, note that the doc was written.

                this.mutations.forEach(function (n) {
                  t.delete(n.key.toString());
                });
                // For each document that was read but not written to, we want to perform
                // a `verify` operation.
                t.forEach(function (t, n) {
                  var e = tt.fromPath(n);

                  _this38.mutations.push(new Pn(e, _this38.precondition(e)));
                });
                _context3.next = 7;
                return Xn(this.datastore, this.mutations);

              case 7:
                this.committed = !0;

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function commit() {
        return _commit.apply(this, arguments);
      }

      return commit;
    }()
  }, {
    key: "recordVersion",
    value: function recordVersion(t) {
      var n;
      if (t.isFoundDocument()) n = t.version;else {
        if (!t.isNoDocument()) throw _(); // For deleted docs, we must use baseVersion 0 when we overwrite them.

        n = gt.min();
      }
      var e = this.readVersions.get(t.key.toString());

      if (e) {
        if (!n.isEqual(e)) // This transaction will fail no matter what.
          throw new L(F, "Document version changed between two reads.");
      } else this.readVersions.set(t.key.toString(), n);
    }
    /**
     * Returns the version of this document when it was read in this transaction,
     * as a precondition, or no precondition if it was not read.
     */

  }, {
    key: "precondition",
    value: function precondition(t) {
      var n = this.readVersions.get(t.toString());
      return !this.writtenDocs.has(t.toString()) && n ? vn.updateTime(n) : vn.none();
    }
    /**
     * Returns the precondition for a document if the operation is an update.
     */

  }, {
    key: "preconditionForUpdate",
    value: function preconditionForUpdate(t) {
      var n = this.readVersions.get(t.toString()); // The first time a document is written, we want to take into account the
      // read time and existence

      if (!this.writtenDocs.has(t.toString()) && n) {
        if (n.isEqual(gt.min())) // The document doesn't exist, so fail the transaction.
          // This has to be validated locally because you can't send a
          // precondition that a document does not exist without changing the
          // semantics of the backend write to be an insert. This is the reverse
          // of what we want, since we want to assert that the document doesn't
          // exist but then send the update and have it fail. Since we can't
          // express that to the backend, we have to validate locally.
          // Note: this can change once we can send separate verify writes in the
          // transaction.
          throw new L(I, "Can't update a document that doesn't exist."); // Document exists, base precondition on document update time.

        return vn.updateTime(n);
      } // Document was not read, so we just use the preconditions for a blind
      // update.


      return vn.exists(!0);
    }
  }, {
    key: "write",
    value: function write(t) {
      this.ensureCommitNotCalled(), this.mutations.push(t);
    }
  }, {
    key: "ensureCommitNotCalled",
    value: function ensureCommitNotCalled() {}
  }]);

  return qr;
}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * TransactionRunner encapsulates the logic needed to run and retry transactions
 * with backoff.
 */


var xr = /*#__PURE__*/function () {
  function xr(t, n, e, r) {
    _classCallCheck(this, xr);

    this.asyncQueue = t, this.datastore = n, this.updateFunction = e, this.deferred = r, this.Tt = 5, this.It = new Kn(this.asyncQueue, "transaction_retry"
    /* TransactionRetry */
    );
  }
  /** Runs the transaction and sets the result on deferred. */


  _createClass(xr, [{
    key: "run",
    value: function run() {
      this.Tt -= 1, this.At();
    }
  }, {
    key: "At",
    value: function At() {
      var _this39 = this;

      this.It.W( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var t, n;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                t = new qr(_this39.datastore), n = _this39.Pt(t);
                n && n.then(function (n) {
                  _this39.asyncQueue.enqueueAndForget(function () {
                    return t.commit().then(function () {
                      _this39.deferred.resolve(n);
                    }).catch(function (t) {
                      _this39.Rt(t);
                    });
                  });
                }).catch(function (t) {
                  _this39.Rt(t);
                });

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      })));
    }
  }, {
    key: "Pt",
    value: function Pt(t) {
      try {
        var n = this.updateFunction(t);
        return !ut(n) && n.catch && n.then ? n : (this.deferred.reject(Error("Transaction callback must return a Promise")), null);
      } catch (t) {
        // Do not retry errors thrown by user provided updateFunction.
        return this.deferred.reject(t), null;
      }
    }
  }, {
    key: "Rt",
    value: function Rt(t) {
      var _this40 = this;

      this.Tt > 0 && this.Vt(t) ? (this.Tt -= 1, this.asyncQueue.enqueueAndForget(function () {
        return _this40.At(), Promise.resolve();
      })) : this.deferred.reject(t);
    }
  }, {
    key: "Vt",
    value: function Vt(t) {
      if ("FirebaseError" === t.name) {
        // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
        // non-matching document versions with ABORTED. These errors should be retried.
        var n = t.code;
        return "aborted" === n || "failed-precondition" === n || !
        /**
        * Determines whether an error code represents a permanent error when received
        * in response to a non-write operation.
        *
        * See isPermanentWriteError for classifying write errors.
        */
        function (t) {
          switch (t) {
            default:
              return _();

            case E:
            case _T:
            case A:
            case N:
            case x:
            case O: // Unauthenticated means something went wrong with our token and we need
            // to retry with new credentials which will happen automatically.

            case D:
              return !1;

            case I:
            case P:
            case R:
            case V:
            case $: // Aborted might be retried in some scenarios, but that is dependant on
            // the context and should handled individually by the calling code.
            // See https://cloud.google.com/apis/design/errors.

            case F:
            case S:
            case q:
            case C:
              return !0;
          }
        }(n);
      }

      return !1;
    }
  }]);

  return xr;
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** The Platform's 'document' implementation or null if not available. */


function Or() {
  // `document` is not always available, e.g. in ReactNative and WebWorkers.
  // eslint-disable-next-line no-restricted-globals
  return "undefined" != typeof document ? document : null;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 *
 * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
 * in newer versions of TypeScript defines `finally`, which is not available in
 * IE.
 */


var Cr = /*#__PURE__*/function () {
  function Cr(t, n, e, r, s) {
    _classCallCheck(this, Cr);

    this.asyncQueue = t, this.timerId = n, this.targetTimeMs = e, this.op = r, this.removalCallback = s, this.deferred = new U(), this.then = this.deferred.promise.then.bind(this.deferred.promise), // It's normal for the deferred promise to be canceled (due to cancellation)
    // and so we attach a dummy catch callback to avoid
    // 'UnhandledPromiseRejectionWarning' log spam.
    this.deferred.promise.catch(function (t) {});
  }
  /**
   * Creates and returns a DelayedOperation that has been scheduled to be
   * executed on the provided asyncQueue after the provided delayMs.
   *
   * @param asyncQueue - The queue to schedule the operation on.
   * @param id - A Timer ID identifying the type of operation this is.
   * @param delayMs - The delay (ms) before the operation should be scheduled.
   * @param op - The operation to run.
   * @param removalCallback - A callback to be called synchronously once the
   *   operation is executed or canceled, notifying the AsyncQueue to remove it
   *   from its delayedOperations list.
   *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
   *   the DelayedOperation class public.
   */


  _createClass(Cr, [{
    key: "start",
    value:
    /**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */
    function start(t) {
      var _this41 = this;

      this.timerHandle = setTimeout(function () {
        return _this41.handleDelayElapsed();
      }, t);
    }
    /**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */

  }, {
    key: "skipDelay",
    value: function skipDelay() {
      return this.handleDelayElapsed();
    }
    /**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */

  }, {
    key: "cancel",
    value: function cancel(t) {
      null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new L(E, "Operation cancelled" + (t ? ": " + t : ""))));
    }
  }, {
    key: "handleDelayElapsed",
    value: function handleDelayElapsed() {
      var _this42 = this;

      this.asyncQueue.enqueueAndForget(function () {
        return null !== _this42.timerHandle ? (_this42.clearTimeout(), _this42.op().then(function (t) {
          return _this42.deferred.resolve(t);
        })) : Promise.resolve();
      });
    }
  }, {
    key: "clearTimeout",
    value: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function () {
      null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null);
    })
  }], [{
    key: "createAndSchedule",
    value: function createAndSchedule(t, n, e, r, s) {
      var i = Date.now() + e,
          o = new Cr(t, n, i, r, s);
      return o.start(e), o;
    }
  }]);

  return Cr;
}();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var Lr = /*#__PURE__*/function () {
  function Lr() {
    var _this43 = this;

    _classCallCheck(this, Lr);

    // The last promise in the queue.
    this.Dt = Promise.resolve(), // A list of retryable operations. Retryable operations are run in order and
    // retried with backoff.
    this.Nt = [], // Is this AsyncQueue being shut down? Once it is set to true, it will not
    // be changed again.
    this.$t = !1, // Operations scheduled to be queued in the future. Operations are
    // automatically removed after they are run or canceled.
    this.Ft = [], // visible for testing
    this.St = null, // Flag set while there's an outstanding AsyncQueue operation, used for
    // assertion sanity-checks.
    this.qt = !1, // Enabled during shutdown on Safari to prevent future access to IndexedDB.
    this.xt = !1, // List of TimerIds to fast-forward delays for.
    this.Ot = [], // Backoff timer used to schedule retries for retryable operations
    this.It = new Kn(this, "async_queue_retry"
    /* AsyncQueueRetry */
    ), // Visibility handler that triggers an immediate retry of all retryable
    // operations. Meant to speed up recovery when we regain file system access
    // after page comes into foreground.
    this.Ct = function () {
      var t = Or();
      t && w("AsyncQueue", "Visibility state changed to " + t.visibilityState), _this43.It.H();
    };
    var t = Or();
    t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.Ct);
  }

  _createClass(Lr, [{
    key: "isShuttingDown",
    get: function get() {
      return this.$t;
    }
    /**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */

  }, {
    key: "enqueueAndForget",
    value: function enqueueAndForget(t) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.enqueue(t);
    }
  }, {
    key: "enqueueAndForgetEvenWhileRestricted",
    value: function enqueueAndForgetEvenWhileRestricted(t) {
      this.Lt(), // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.Ut(t);
    }
  }, {
    key: "enterRestrictedMode",
    value: function enterRestrictedMode(t) {
      if (!this.$t) {
        this.$t = !0, this.xt = t || !1;
        var n = Or();
        n && "function" == typeof n.removeEventListener && n.removeEventListener("visibilitychange", this.Ct);
      }
    }
  }, {
    key: "enqueue",
    value: function enqueue(t) {
      var _this44 = this;

      if (this.Lt(), this.$t) // Return a Promise which never resolves.
        return new Promise(function () {}); // Create a deferred Promise that we can return to the callee. This
      // allows us to return a "hanging Promise" only to the callee and still
      // advance the queue even when the operation is not run.

      var n = new U();
      return this.Ut(function () {
        return _this44.$t && _this44.xt ? Promise.resolve() : (t().then(n.resolve, n.reject), n.promise);
      }).then(function () {
        return n.promise;
      });
    }
  }, {
    key: "enqueueRetryable",
    value: function enqueueRetryable(t) {
      var _this45 = this;

      this.enqueueAndForget(function () {
        return _this45.Nt.push(t), _this45.kt();
      });
    }
    /**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */

  }, {
    key: "kt",
    value: function () {
      var _kt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _this46 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(0 !== this.Nt.length)) {
                  _context5.next = 14;
                  break;
                }

                _context5.prev = 1;
                _context5.next = 4;
                return this.Nt[0]();

              case 4:
                this.Nt.shift();
                this.It.reset();
                _context5.next = 13;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](1);

                if (
                /**
                * @license
                * Copyright 2017 Google LLC
                *
                * Licensed under the Apache License, Version 2.0 (the "License");
                * you may not use this file except in compliance with the License.
                * You may obtain a copy of the License at
                *
                *   http://www.apache.org/licenses/LICENSE-2.0
                *
                * Unless required by applicable law or agreed to in writing, software
                * distributed under the License is distributed on an "AS IS" BASIS,
                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                * See the License for the specific language governing permissions and
                * limitations under the License.
                */

                /** Verifies whether `e` is an IndexedDbTransactionError. */
                function (t) {
                  // Use name equality, as instanceof checks on errors don't work with errors
                  // that wrap other errors.
                  return "IndexedDbTransactionError" === t.name;
                }
                /**
                * @license
                * Copyright 2020 Google LLC
                *
                * Licensed under the Apache License, Version 2.0 (the "License");
                * you may not use this file except in compliance with the License.
                * You may obtain a copy of the License at
                *
                *   http://www.apache.org/licenses/LICENSE-2.0
                *
                * Unless required by applicable law or agreed to in writing, software
                * distributed under the License is distributed on an "AS IS" BASIS,
                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                * See the License for the specific language governing permissions and
                * limitations under the License.
                */
                (_context5.t0)) {
                  _context5.next = 12;
                  break;
                }

                throw _context5.t0;

              case 12:
                // Failure will be handled by AsyncQueue
                w("AsyncQueue", "Operation failed with retryable error: " + _context5.t0);

              case 13:
                this.Nt.length > 0 && // If there are additional operations, we re-schedule `retryNextOp()`.
                // This is necessary to run retryable operations that failed during
                // their initial attempt since we don't know whether they are already
                // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
                // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
                // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
                // call scheduled here.
                // Since `backoffAndRun()` cancels an existing backoff and schedules a
                // new backoff on every call, there is only ever a single additional
                // operation in the queue.
                this.It.W(function () {
                  return _this46.kt();
                });

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 8]]);
      }));

      function kt() {
        return _kt.apply(this, arguments);
      }

      return kt;
    }()
  }, {
    key: "Ut",
    value: function Ut(t) {
      var _this47 = this;

      var n = this.Dt.then(function () {
        return _this47.qt = !0, t().catch(function (t) {
          _this47.St = t, _this47.qt = !1;

          var n =
          /**
          * Chrome includes Error.message in Error.stack. Other browsers do not.
          * This returns expected output of message + stack when available.
          * @param error - Error or FirestoreError
          */
          function (t) {
            var n = t.message || "";
            t.stack && (n = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack);
            return n;
          }
          /**
          * @license
          * Copyright 2020 Google LLC
          *
          * Licensed under the Apache License, Version 2.0 (the "License");
          * you may not use this file except in compliance with the License.
          * You may obtain a copy of the License at
          *
          *   http://www.apache.org/licenses/LICENSE-2.0
          *
          * Unless required by applicable law or agreed to in writing, software
          * distributed under the License is distributed on an "AS IS" BASIS,
          * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
          * See the License for the specific language governing permissions and
          * limitations under the License.
          */
          // TODO(mrschmidt) Consider using `BaseTransaction` as the base class in the
          // legacy SDK.

          /**
          * A reference to a transaction.
          *
          * The `Transaction` object passed to a transaction's `updateFunction` provides
          * the methods to read and write data within the transaction context. See
          * {@link runTransaction}.
          */
          (t); // Re-throw the error so that this.tail becomes a rejected Promise and
          // all further attempts to chain (via .then) will just short-circuit
          // and return the rejected Promise.


          throw m("INTERNAL UNHANDLED ERROR: ", n), t;
        }).then(function (t) {
          return _this47.qt = !1, t;
        });
      });
      return this.Dt = n, n;
    }
  }, {
    key: "enqueueAfterDelay",
    value: function enqueueAfterDelay(t, n, e) {
      var _this48 = this;

      this.Lt(), // Fast-forward delays for timerIds that have been overriden.
      this.Ot.indexOf(t) > -1 && (n = 0);
      var r = Cr.createAndSchedule(this, t, n, e, function (t) {
        return _this48.jt(t);
      });
      return this.Ft.push(r), r;
    }
  }, {
    key: "Lt",
    value: function Lt() {
      this.St && _();
    }
  }, {
    key: "verifyOperationInProgress",
    value: function verifyOperationInProgress() {}
    /**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */

  }, {
    key: "Mt",
    value: function () {
      var _Mt = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var t;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                t = this.Dt;
                _context6.next = 3;
                return t;

              case 3:
                if (t !== this.Dt) {
                  _context6.next = 0;
                  break;
                }

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function Mt() {
        return _Mt.apply(this, arguments);
      }

      return Mt;
    }()
    /**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */

  }, {
    key: "Bt",
    value: function Bt(t) {
      var _iterator11 = _createForOfIteratorHelper(this.Ft),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var n = _step11.value;
          if (n.timerId === t) return !0;
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      return !1;
    }
    /**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */

  }, {
    key: "zt",
    value: function zt(t) {
      var _this49 = this;

      // Note that draining may generate more delayed ops, so we do that first.
      return this.Mt().then(function () {
        // Run ops in the same order they'd run if they ran naturally.
        _this49.Ft.sort(function (t, n) {
          return t.targetTimeMs - n.targetTimeMs;
        });

        var _iterator12 = _createForOfIteratorHelper(_this49.Ft),
            _step12;

        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var n = _step12.value;
            if (n.skipDelay(), "all"
            /* All */
            !== t && n.timerId === t) break;
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }

        return _this49.Mt();
      });
    }
    /**
     * For Tests: Skip all subsequent delays for a timer id.
     */

  }, {
    key: "Gt",
    value: function Gt(t) {
      this.Ot.push(t);
    }
    /** Called once a DelayedOperation is run or canceled. */

  }, {
    key: "jt",
    value: function jt(t) {
      // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
      var n = this.Ft.indexOf(t);
      this.Ft.splice(n, 1);
    }
  }]);

  return Lr;
}();

var Ur = /*#__PURE__*/function () {
  /** @hideconstructor */
  function Ur(t, n) {
    _classCallCheck(this, Ur);

    this._firestore = t, this._transaction = n, this._dataReader = Ve(t);
  }
  /**
   * Reads the document referenced by the provided {@link DocumentReference}.
   *
   * @param documentRef - A reference to the document to be read.
   * @returns A `DocumentSnapshot` with the read data.
   */


  _createClass(Ur, [{
    key: "get",
    value: function get(t) {
      var _this50 = this;

      var n = Fr(t, this._firestore),
          e = new gr(this._firestore);
      return this._transaction.lookup([n._key]).then(function (t) {
        if (!t || 1 !== t.length) return _();
        var r = t[0];
        if (r.isFoundDocument()) return new Ye(_this50._firestore, e, r.key, r, n.converter);
        if (r.isNoDocument()) return new Ye(_this50._firestore, e, n._key, null, n.converter);
        throw _();
      });
    }
  }, {
    key: "set",
    value: function set(t, n, e) {
      var r = Fr(t, this._firestore),
          s = _r(r.converter, n, e),
          i = De(this._dataReader, "Transaction.set", r._key, s, null !== r.converter, e);

      return this._transaction.set(r._key, i), this;
    }
  }, {
    key: "update",
    value: function update(t, n, e) {
      var s = Fr(t, this._firestore); // For Compat types, we have to "extract" the underlying types before
      // performing validation.

      var i;

      for (var _len17 = arguments.length, r = new Array(_len17 > 3 ? _len17 - 3 : 0), _key17 = 3; _key17 < _len17; _key17++) {
        r[_key17 - 3] = arguments[_key17];
      }

      return i = "string" == typeof (n = (0, _util.getModularInstance)(n)) || n instanceof ye ? Ce(this._dataReader, "Transaction.update", s._key, n, e, r) : Oe(this._dataReader, "Transaction.update", s._key, n), this._transaction.update(s._key, i), this;
    }
    /**
     * Deletes the document referred to by the provided {@link DocumentReference}.
     *
     * @param documentRef - A reference to the document to be deleted.
     * @returns This `Transaction` instance. Used for chaining method calls.
     */

  }, {
    key: "delete",
    value: function _delete(t) {
      var n = Fr(t, this._firestore);
      return this._transaction.delete(n._key), this;
    }
  }]);

  return Ur;
}();
/**
 * Executes the given `updateFunction` and then attempts to commit the changes
 * applied within the transaction. If any document read within the transaction
 * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
 * commit after 5 attempts, the transaction fails.
 *
 * The maximum number of writes allowed in a single transaction is 500.
 *
 * @param firestore - A reference to the Firestore database to run this
 * transaction against.
 * @param updateFunction - The function to execute within the transaction
 * context.
 * @returns If the transaction completed successfully or was explicitly aborted
 * (the `updateFunction` returned a failed promise), the promise returned by the
 * `updateFunction `is returned here. Otherwise, if the transaction failed, a
 * rejected promise with the corresponding failure error is returned.
 */


exports.Transaction = Ur;

function kr(t, n) {
  var e = ee(t = it(t, se)),
      r = new U();
  return new xr(new Lr(), e, function (e) {
    return n(new Ur(t, e));
  }, r).run(), r.promise;
}
/**
 * Firestore Lite
 *
 * @remarks Firestore Lite is a small online-only SDK that allows read
 * and write access to your Firestore database. All operations connect
 * directly to the backend, and `onSnapshot()` APIs are not supported.
 * @packageDocumentation
 */


!function (t) {
  l = t;
}("".concat(_app.SDK_VERSION, "_lite")), (0, _app._registerComponent)(new _component.Component("firestore/lite", function (t, _ref10) {
  var n = _ref10.options;
  var e = t.getProvider("app").getImmediate(),
      r = new se(e, new B(t.getProvider("auth-internal")), new W(t.getProvider("app-check-internal")));
  return n && r._setSettings(n), r;
}, "PUBLIC")), // RUNTIME_ENV and BUILD_TARGET are replaced by real values during the compilation
(0, _app.registerVersion)("firestore-lite", "3.4.1", ""), (0, _app.registerVersion)("firestore-lite", "3.4.1", "esm2017");
},{"@firebase/app":"../node_modules/@firebase/app/dist/esm/index.esm2017.js","@firebase/component":"../node_modules/@firebase/component/dist/esm/index.esm2017.js","@firebase/logger":"../node_modules/@firebase/logger/dist/esm/index.esm2017.js","@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js"}],"../node_modules/firebase/firestore/lite/dist/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lite = require("@firebase/firestore/lite");

Object.keys(_lite).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _lite[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _lite[key];
    }
  });
});
},{"@firebase/firestore/lite":"../node_modules/@firebase/firestore/dist/lite/index.browser.esm2017.js"}],"../node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__assign = void 0;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncValues = __asyncValues;
exports.__await = __await;
exports.__awaiter = __awaiter;
exports.__classPrivateFieldGet = __classPrivateFieldGet;
exports.__classPrivateFieldSet = __classPrivateFieldSet;
exports.__createBinding = void 0;
exports.__decorate = __decorate;
exports.__exportStar = __exportStar;
exports.__extends = __extends;
exports.__generator = __generator;
exports.__importDefault = __importDefault;
exports.__importStar = __importStar;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__metadata = __metadata;
exports.__param = __param;
exports.__read = __read;
exports.__rest = __rest;
exports.__spread = __spread;
exports.__spreadArray = __spreadArray;
exports.__spreadArrays = __spreadArrays;
exports.__values = __values;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__assign = __assign;

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};

exports.__createBinding = __createBinding;

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
/** @deprecated */


function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
/** @deprecated */


function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

;

var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
},{}],"../node_modules/@firebase/auth/dist/esm2017/index-839de510.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$ = sendPasswordResetEmail;
exports.C = exports.B = exports.A = void 0;
exports.D = initializeAuth;
exports.E = connectAuthEmulator;
exports.V = exports.U = exports.T = exports.S = exports.R = exports.Q = exports.P = exports.O = exports.N = exports.M = exports.L = exports.K = exports.J = exports.I = exports.H = exports.G = exports.F = void 0;
exports.W = signInAnonymously;
exports.X = signInWithCredential;
exports.Y = linkWithCredential;
exports.Z = reauthenticateWithCredential;
exports._ = signInWithCustomToken;
exports.a = void 0;
exports.a0 = confirmPasswordReset;
exports.a1 = applyActionCode;
exports.a2 = checkActionCode;
exports.a3 = verifyPasswordResetCode;
exports.a4 = createUserWithEmailAndPassword;
exports.a5 = signInWithEmailAndPassword;
exports.a6 = sendSignInLinkToEmail;
exports.a7 = isSignInWithEmailLink;
exports.a8 = signInWithEmailLink;
exports.a9 = fetchSignInMethodsForEmail;
exports.aA = _getRedirectResult;
exports.aB = _clearRedirectOutcomes;
exports.aC = _castAuth;
exports.aE = exports.aD = void 0;
exports.aF = _getClientVersion;
exports.aG = _generateEventId;
exports.aJ = exports.aI = exports.aH = void 0;
exports.aa = sendEmailVerification;
exports.ab = verifyBeforeUpdateEmail;
exports.ac = void 0;
exports.ad = parseActionCodeURL;
exports.ae = updateProfile;
exports.af = updateEmail;
exports.ag = updatePassword;
exports.ah = getIdToken;
exports.ai = getIdTokenResult;
exports.aj = unlink;
exports.ak = getAdditionalUserInfo;
exports.al = reload;
exports.am = getMultiFactorResolver;
exports.an = multiFactor;
exports.ao = _isIOS7Or8;
exports.ap = debugAssert;
exports.aq = _isIOS;
exports.ar = _isAndroid;
exports.as = _fail;
exports.at = _getRedirectUrl;
exports.au = _getProjectConfig;
exports.av = _createError;
exports.aw = _assert;
exports.ax = _getInstance;
exports.ay = _persistenceKeyName;
exports.b = exports.az = void 0;
exports.c = signInWithPopup;
exports.d = linkWithPopup;
exports.e = reauthenticateWithPopup;
exports.f = signInWithRedirect;
exports.g = linkWithRedirect;
exports.h = reauthenticateWithRedirect;
exports.i = void 0;
exports.j = getRedirectResult;
exports.k = void 0;
exports.l = linkWithPhoneNumber;
exports.m = void 0;
exports.n = getAuth;
exports.o = void 0;
exports.p = setPersistence;
exports.q = onIdTokenChanged;
exports.r = reauthenticateWithPhoneNumber;
exports.s = signInWithPhoneNumber;
exports.t = onAuthStateChanged;
exports.u = updatePhoneNumber;
exports.v = useDeviceLanguage;
exports.w = updateCurrentUser;
exports.x = signOut;
exports.y = deleteUser;
exports.z = void 0;

var _util = require("@firebase/util");

var _app = require("@firebase/app");

var _tslib = require("tslib");

var _logger = require("@firebase/logger");

var _component = require("@firebase/component");

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An enum of factors that may be used for multifactor authentication.
 *
 * @public
 */
const FactorId = {
  /** Phone as second factor */
  PHONE: 'phone'
};
/**
 * Enumeration of supported providers.
 *
 * @public
 */

exports.F = FactorId;
const ProviderId = {
  /** Facebook provider ID */
  FACEBOOK: 'facebook.com',

  /** GitHub provider ID */
  GITHUB: 'github.com',

  /** Google provider ID */
  GOOGLE: 'google.com',

  /** Password provider */
  PASSWORD: 'password',

  /** Phone provider */
  PHONE: 'phone',

  /** Twitter provider ID */
  TWITTER: 'twitter.com'
};
/**
 * Enumeration of supported sign-in methods.
 *
 * @public
 */

exports.o = ProviderId;
const SignInMethod = {
  /** Email link sign in method */
  EMAIL_LINK: 'emailLink',

  /** Email/password sign in method */
  EMAIL_PASSWORD: 'password',

  /** Facebook sign in method */
  FACEBOOK: 'facebook.com',

  /** GitHub sign in method */
  GITHUB: 'github.com',

  /** Google sign in method */
  GOOGLE: 'google.com',

  /** Phone sign in method */
  PHONE: 'phone',

  /** Twitter sign in method */
  TWITTER: 'twitter.com'
};
/**
 * Enumeration of supported operation types.
 *
 * @public
 */

exports.S = SignInMethod;
const OperationType = {
  /** Operation involving linking an additional provider to an already signed-in user. */
  LINK: 'link',

  /** Operation involving using a provider to reauthenticate an already signed-in user. */
  REAUTHENTICATE: 'reauthenticate',

  /** Operation involving signing in a user. */
  SIGN_IN: 'signIn'
};
/**
 * An enumeration of the possible email action types.
 *
 * @public
 */

exports.O = OperationType;
const ActionCodeOperation = {
  /** The email link sign-in action. */
  EMAIL_SIGNIN: 'EMAIL_SIGNIN',

  /** The password reset action. */
  PASSWORD_RESET: 'PASSWORD_RESET',

  /** The email revocation action. */
  RECOVER_EMAIL: 'RECOVER_EMAIL',

  /** The revert second factor addition email action. */
  REVERT_SECOND_FACTOR_ADDITION: 'REVERT_SECOND_FACTOR_ADDITION',

  /** The revert second factor addition email action. */
  VERIFY_AND_CHANGE_EMAIL: 'VERIFY_AND_CHANGE_EMAIL',

  /** The email verification action. */
  VERIFY_EMAIL: 'VERIFY_EMAIL'
};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.A = ActionCodeOperation;

function _debugErrorMap() {
  return {
    ["admin-restricted-operation"
    /* ADMIN_ONLY_OPERATION */
    ]: 'This operation is restricted to administrators only.',
    ["argument-error"
    /* ARGUMENT_ERROR */
    ]: '',
    ["app-not-authorized"
    /* APP_NOT_AUTHORIZED */
    ]: "This app, identified by the domain where it's hosted, is not " + 'authorized to use Firebase Authentication with the provided API key. ' + 'Review your key configuration in the Google API console.',
    ["app-not-installed"
    /* APP_NOT_INSTALLED */
    ]: 'The requested mobile application corresponding to the identifier (' + 'Android package name or iOS bundle ID) provided is not installed on ' + 'this device.',
    ["captcha-check-failed"
    /* CAPTCHA_CHECK_FAILED */
    ]: 'The reCAPTCHA response token provided is either invalid, expired, ' + 'already used or the domain associated with it does not match the list ' + 'of whitelisted domains.',
    ["code-expired"
    /* CODE_EXPIRED */
    ]: 'The SMS code has expired. Please re-send the verification code to try ' + 'again.',
    ["cordova-not-ready"
    /* CORDOVA_NOT_READY */
    ]: 'Cordova framework is not ready.',
    ["cors-unsupported"
    /* CORS_UNSUPPORTED */
    ]: 'This browser is not supported.',
    ["credential-already-in-use"
    /* CREDENTIAL_ALREADY_IN_USE */
    ]: 'This credential is already associated with a different user account.',
    ["custom-token-mismatch"
    /* CREDENTIAL_MISMATCH */
    ]: 'The custom token corresponds to a different audience.',
    ["requires-recent-login"
    /* CREDENTIAL_TOO_OLD_LOGIN_AGAIN */
    ]: 'This operation is sensitive and requires recent authentication. Log in ' + 'again before retrying this request.',
    ["dependent-sdk-initialized-before-auth"
    /* DEPENDENT_SDK_INIT_BEFORE_AUTH */
    ]: 'Another Firebase SDK was initialized and is trying to use Auth before Auth is ' + 'initialized. Please be sure to call `initializeAuth` or `getAuth` before ' + 'starting any other Firebase SDK.',
    ["dynamic-link-not-activated"
    /* DYNAMIC_LINK_NOT_ACTIVATED */
    ]: 'Please activate Dynamic Links in the Firebase Console and agree to the terms and ' + 'conditions.',
    ["email-change-needs-verification"
    /* EMAIL_CHANGE_NEEDS_VERIFICATION */
    ]: 'Multi-factor users must always have a verified email.',
    ["email-already-in-use"
    /* EMAIL_EXISTS */
    ]: 'The email address is already in use by another account.',
    ["emulator-config-failed"
    /* EMULATOR_CONFIG_FAILED */
    ]: 'Auth instance has already been used to make a network call. Auth can ' + 'no longer be configured to use the emulator. Try calling ' + '"connectAuthEmulator()" sooner.',
    ["expired-action-code"
    /* EXPIRED_OOB_CODE */
    ]: 'The action code has expired.',
    ["cancelled-popup-request"
    /* EXPIRED_POPUP_REQUEST */
    ]: 'This operation has been cancelled due to another conflicting popup being opened.',
    ["internal-error"
    /* INTERNAL_ERROR */
    ]: 'An internal AuthError has occurred.',
    ["invalid-app-credential"
    /* INVALID_APP_CREDENTIAL */
    ]: 'The phone verification request contains an invalid application verifier.' + ' The reCAPTCHA token response is either invalid or expired.',
    ["invalid-app-id"
    /* INVALID_APP_ID */
    ]: 'The mobile app identifier is not registed for the current project.',
    ["invalid-user-token"
    /* INVALID_AUTH */
    ]: "This user's credential isn't valid for this project. This can happen " + "if the user's token has been tampered with, or if the user isn't for " + 'the project associated with this API key.',
    ["invalid-auth-event"
    /* INVALID_AUTH_EVENT */
    ]: 'An internal AuthError has occurred.',
    ["invalid-verification-code"
    /* INVALID_CODE */
    ]: 'The SMS verification code used to create the phone auth credential is ' + 'invalid. Please resend the verification code sms and be sure to use the ' + 'verification code provided by the user.',
    ["invalid-continue-uri"
    /* INVALID_CONTINUE_URI */
    ]: 'The continue URL provided in the request is invalid.',
    ["invalid-cordova-configuration"
    /* INVALID_CORDOVA_CONFIGURATION */
    ]: 'The following Cordova plugins must be installed to enable OAuth sign-in: ' + 'cordova-plugin-buildinfo, cordova-universal-links-plugin, ' + 'cordova-plugin-browsertab, cordova-plugin-inappbrowser and ' + 'cordova-plugin-customurlscheme.',
    ["invalid-custom-token"
    /* INVALID_CUSTOM_TOKEN */
    ]: 'The custom token format is incorrect. Please check the documentation.',
    ["invalid-dynamic-link-domain"
    /* INVALID_DYNAMIC_LINK_DOMAIN */
    ]: 'The provided dynamic link domain is not configured or authorized for the current project.',
    ["invalid-email"
    /* INVALID_EMAIL */
    ]: 'The email address is badly formatted.',
    ["invalid-emulator-scheme"
    /* INVALID_EMULATOR_SCHEME */
    ]: 'Emulator URL must start with a valid scheme (http:// or https://).',
    ["invalid-api-key"
    /* INVALID_API_KEY */
    ]: 'Your API key is invalid, please check you have copied it correctly.',
    ["invalid-cert-hash"
    /* INVALID_CERT_HASH */
    ]: 'The SHA-1 certificate hash provided is invalid.',
    ["invalid-credential"
    /* INVALID_IDP_RESPONSE */
    ]: 'The supplied auth credential is malformed or has expired.',
    ["invalid-message-payload"
    /* INVALID_MESSAGE_PAYLOAD */
    ]: 'The email template corresponding to this action contains invalid characters in its message. ' + 'Please fix by going to the Auth email templates section in the Firebase Console.',
    ["invalid-multi-factor-session"
    /* INVALID_MFA_SESSION */
    ]: 'The request does not contain a valid proof of first factor successful sign-in.',
    ["invalid-oauth-provider"
    /* INVALID_OAUTH_PROVIDER */
    ]: 'EmailAuthProvider is not supported for this operation. This operation ' + 'only supports OAuth providers.',
    ["invalid-oauth-client-id"
    /* INVALID_OAUTH_CLIENT_ID */
    ]: 'The OAuth client ID provided is either invalid or does not match the ' + 'specified API key.',
    ["unauthorized-domain"
    /* INVALID_ORIGIN */
    ]: 'This domain is not authorized for OAuth operations for your Firebase ' + 'project. Edit the list of authorized domains from the Firebase console.',
    ["invalid-action-code"
    /* INVALID_OOB_CODE */
    ]: 'The action code is invalid. This can happen if the code is malformed, ' + 'expired, or has already been used.',
    ["wrong-password"
    /* INVALID_PASSWORD */
    ]: 'The password is invalid or the user does not have a password.',
    ["invalid-persistence-type"
    /* INVALID_PERSISTENCE */
    ]: 'The specified persistence type is invalid. It can only be local, session or none.',
    ["invalid-phone-number"
    /* INVALID_PHONE_NUMBER */
    ]: 'The format of the phone number provided is incorrect. Please enter the ' + 'phone number in a format that can be parsed into E.164 format. E.164 ' + 'phone numbers are written in the format [+][country code][subscriber ' + 'number including area code].',
    ["invalid-provider-id"
    /* INVALID_PROVIDER_ID */
    ]: 'The specified provider ID is invalid.',
    ["invalid-recipient-email"
    /* INVALID_RECIPIENT_EMAIL */
    ]: 'The email corresponding to this action failed to send as the provided ' + 'recipient email address is invalid.',
    ["invalid-sender"
    /* INVALID_SENDER */
    ]: 'The email template corresponding to this action contains an invalid sender email or name. ' + 'Please fix by going to the Auth email templates section in the Firebase Console.',
    ["invalid-verification-id"
    /* INVALID_SESSION_INFO */
    ]: 'The verification ID used to create the phone auth credential is invalid.',
    ["invalid-tenant-id"
    /* INVALID_TENANT_ID */
    ]: "The Auth instance's tenant ID is invalid.",
    ["missing-android-pkg-name"
    /* MISSING_ANDROID_PACKAGE_NAME */
    ]: 'An Android Package Name must be provided if the Android App is required to be installed.',
    ["auth-domain-config-required"
    /* MISSING_AUTH_DOMAIN */
    ]: 'Be sure to include authDomain when calling firebase.initializeApp(), ' + 'by following the instructions in the Firebase console.',
    ["missing-app-credential"
    /* MISSING_APP_CREDENTIAL */
    ]: 'The phone verification request is missing an application verifier ' + 'assertion. A reCAPTCHA response token needs to be provided.',
    ["missing-verification-code"
    /* MISSING_CODE */
    ]: 'The phone auth credential was created with an empty SMS verification code.',
    ["missing-continue-uri"
    /* MISSING_CONTINUE_URI */
    ]: 'A continue URL must be provided in the request.',
    ["missing-iframe-start"
    /* MISSING_IFRAME_START */
    ]: 'An internal AuthError has occurred.',
    ["missing-ios-bundle-id"
    /* MISSING_IOS_BUNDLE_ID */
    ]: 'An iOS Bundle ID must be provided if an App Store ID is provided.',
    ["missing-or-invalid-nonce"
    /* MISSING_OR_INVALID_NONCE */
    ]: 'The request does not contain a valid nonce. This can occur if the ' + 'SHA-256 hash of the provided raw nonce does not match the hashed nonce ' + 'in the ID token payload.',
    ["missing-multi-factor-info"
    /* MISSING_MFA_INFO */
    ]: 'No second factor identifier is provided.',
    ["missing-multi-factor-session"
    /* MISSING_MFA_SESSION */
    ]: 'The request is missing proof of first factor successful sign-in.',
    ["missing-phone-number"
    /* MISSING_PHONE_NUMBER */
    ]: 'To send verification codes, provide a phone number for the recipient.',
    ["missing-verification-id"
    /* MISSING_SESSION_INFO */
    ]: 'The phone auth credential was created with an empty verification ID.',
    ["app-deleted"
    /* MODULE_DESTROYED */
    ]: 'This instance of FirebaseApp has been deleted.',
    ["multi-factor-info-not-found"
    /* MFA_INFO_NOT_FOUND */
    ]: 'The user does not have a second factor matching the identifier provided.',
    ["multi-factor-auth-required"
    /* MFA_REQUIRED */
    ]: 'Proof of ownership of a second factor is required to complete sign-in.',
    ["account-exists-with-different-credential"
    /* NEED_CONFIRMATION */
    ]: 'An account already exists with the same email address but different ' + 'sign-in credentials. Sign in using a provider associated with this ' + 'email address.',
    ["network-request-failed"
    /* NETWORK_REQUEST_FAILED */
    ]: 'A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.',
    ["no-auth-event"
    /* NO_AUTH_EVENT */
    ]: 'An internal AuthError has occurred.',
    ["no-such-provider"
    /* NO_SUCH_PROVIDER */
    ]: 'User was not linked to an account with the given provider.',
    ["null-user"
    /* NULL_USER */
    ]: 'A null user object was provided as the argument for an operation which ' + 'requires a non-null user object.',
    ["operation-not-allowed"
    /* OPERATION_NOT_ALLOWED */
    ]: 'The given sign-in provider is disabled for this Firebase project. ' + 'Enable it in the Firebase console, under the sign-in method tab of the ' + 'Auth section.',
    ["operation-not-supported-in-this-environment"
    /* OPERATION_NOT_SUPPORTED */
    ]: 'This operation is not supported in the environment this application is ' + 'running on. "location.protocol" must be http, https or chrome-extension' + ' and web storage must be enabled.',
    ["popup-blocked"
    /* POPUP_BLOCKED */
    ]: 'Unable to establish a connection with the popup. It may have been blocked by the browser.',
    ["popup-closed-by-user"
    /* POPUP_CLOSED_BY_USER */
    ]: 'The popup has been closed by the user before finalizing the operation.',
    ["provider-already-linked"
    /* PROVIDER_ALREADY_LINKED */
    ]: 'User can only be linked to one identity for the given provider.',
    ["quota-exceeded"
    /* QUOTA_EXCEEDED */
    ]: "The project's quota for this operation has been exceeded.",
    ["redirect-cancelled-by-user"
    /* REDIRECT_CANCELLED_BY_USER */
    ]: 'The redirect operation has been cancelled by the user before finalizing.',
    ["redirect-operation-pending"
    /* REDIRECT_OPERATION_PENDING */
    ]: 'A redirect sign-in operation is already pending.',
    ["rejected-credential"
    /* REJECTED_CREDENTIAL */
    ]: 'The request contains malformed or mismatching credentials.',
    ["second-factor-already-in-use"
    /* SECOND_FACTOR_ALREADY_ENROLLED */
    ]: 'The second factor is already enrolled on this account.',
    ["maximum-second-factor-count-exceeded"
    /* SECOND_FACTOR_LIMIT_EXCEEDED */
    ]: 'The maximum allowed number of second factors on a user has been exceeded.',
    ["tenant-id-mismatch"
    /* TENANT_ID_MISMATCH */
    ]: "The provided tenant ID does not match the Auth instance's tenant ID",
    ["timeout"
    /* TIMEOUT */
    ]: 'The operation has timed out.',
    ["user-token-expired"
    /* TOKEN_EXPIRED */
    ]: "The user's credential is no longer valid. The user must sign in again.",
    ["too-many-requests"
    /* TOO_MANY_ATTEMPTS_TRY_LATER */
    ]: 'We have blocked all requests from this device due to unusual activity. ' + 'Try again later.',
    ["unauthorized-continue-uri"
    /* UNAUTHORIZED_DOMAIN */
    ]: 'The domain of the continue URL is not whitelisted.  Please whitelist ' + 'the domain in the Firebase console.',
    ["unsupported-first-factor"
    /* UNSUPPORTED_FIRST_FACTOR */
    ]: 'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.',
    ["unsupported-persistence-type"
    /* UNSUPPORTED_PERSISTENCE */
    ]: 'The current environment does not support the specified persistence type.',
    ["unsupported-tenant-operation"
    /* UNSUPPORTED_TENANT_OPERATION */
    ]: 'This operation is not supported in a multi-tenant context.',
    ["unverified-email"
    /* UNVERIFIED_EMAIL */
    ]: 'The operation requires a verified email.',
    ["user-cancelled"
    /* USER_CANCELLED */
    ]: 'The user did not grant your application the permissions it requested.',
    ["user-not-found"
    /* USER_DELETED */
    ]: 'There is no user record corresponding to this identifier. The user may ' + 'have been deleted.',
    ["user-disabled"
    /* USER_DISABLED */
    ]: 'The user account has been disabled by an administrator.',
    ["user-mismatch"
    /* USER_MISMATCH */
    ]: 'The supplied credentials do not correspond to the previously signed in user.',
    ["user-signed-out"
    /* USER_SIGNED_OUT */
    ]: '',
    ["weak-password"
    /* WEAK_PASSWORD */
    ]: 'The password must be 6 characters long or more.',
    ["web-storage-unsupported"
    /* WEB_STORAGE_UNSUPPORTED */
    ]: 'This browser is not supported or 3rd party cookies and data may be disabled.',
    ["already-initialized"
    /* ALREADY_INITIALIZED */
    ]: 'initializeAuth() has already been called with ' + 'different options. To avoid this error, call initializeAuth() with the ' + 'same options as when it was originally called, or call getAuth() to return the' + ' already initialized instance.'
  };
}

function _prodErrorMap() {
  // We will include this one message in the prod error map since by the very
  // nature of this error, developers will never be able to see the message
  // using the debugErrorMap (which is installed during auth initialization).
  return {
    ["dependent-sdk-initialized-before-auth"
    /* DEPENDENT_SDK_INIT_BEFORE_AUTH */
    ]: 'Another Firebase SDK was initialized and is trying to use Auth before Auth is ' + 'initialized. Please be sure to call `initializeAuth` or `getAuth` before ' + 'starting any other Firebase SDK.'
  };
}
/**
 * A verbose error map with detailed descriptions for most error codes.
 *
 * See discussion at {@link AuthErrorMap}
 *
 * @public
 */


const debugErrorMap = _debugErrorMap;
/**
 * A minimal error map with all verbose error messages stripped.
 *
 * See discussion at {@link AuthErrorMap}
 *
 * @public
 */

exports.z = debugErrorMap;
const prodErrorMap = _prodErrorMap;
exports.B = prodErrorMap;

const _DEFAULT_AUTH_ERROR_FACTORY = new _util.ErrorFactory('auth', 'Firebase', _prodErrorMap());
/**
 * A map of potential `Auth` error codes, for easier comparison with errors
 * thrown by the SDK.
 *
 * @remarks
 * Note that you can't tree-shake individual keys
 * in the map, so by using the map you might substantially increase your
 * bundle size.
 *
 * @public
 */


const AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY = {
  ADMIN_ONLY_OPERATION: 'auth/admin-restricted-operation',
  ARGUMENT_ERROR: 'auth/argument-error',
  APP_NOT_AUTHORIZED: 'auth/app-not-authorized',
  APP_NOT_INSTALLED: 'auth/app-not-installed',
  CAPTCHA_CHECK_FAILED: 'auth/captcha-check-failed',
  CODE_EXPIRED: 'auth/code-expired',
  CORDOVA_NOT_READY: 'auth/cordova-not-ready',
  CORS_UNSUPPORTED: 'auth/cors-unsupported',
  CREDENTIAL_ALREADY_IN_USE: 'auth/credential-already-in-use',
  CREDENTIAL_MISMATCH: 'auth/custom-token-mismatch',
  CREDENTIAL_TOO_OLD_LOGIN_AGAIN: 'auth/requires-recent-login',
  DEPENDENT_SDK_INIT_BEFORE_AUTH: 'auth/dependent-sdk-initialized-before-auth',
  DYNAMIC_LINK_NOT_ACTIVATED: 'auth/dynamic-link-not-activated',
  EMAIL_CHANGE_NEEDS_VERIFICATION: 'auth/email-change-needs-verification',
  EMAIL_EXISTS: 'auth/email-already-in-use',
  EMULATOR_CONFIG_FAILED: 'auth/emulator-config-failed',
  EXPIRED_OOB_CODE: 'auth/expired-action-code',
  EXPIRED_POPUP_REQUEST: 'auth/cancelled-popup-request',
  INTERNAL_ERROR: 'auth/internal-error',
  INVALID_API_KEY: 'auth/invalid-api-key',
  INVALID_APP_CREDENTIAL: 'auth/invalid-app-credential',
  INVALID_APP_ID: 'auth/invalid-app-id',
  INVALID_AUTH: 'auth/invalid-user-token',
  INVALID_AUTH_EVENT: 'auth/invalid-auth-event',
  INVALID_CERT_HASH: 'auth/invalid-cert-hash',
  INVALID_CODE: 'auth/invalid-verification-code',
  INVALID_CONTINUE_URI: 'auth/invalid-continue-uri',
  INVALID_CORDOVA_CONFIGURATION: 'auth/invalid-cordova-configuration',
  INVALID_CUSTOM_TOKEN: 'auth/invalid-custom-token',
  INVALID_DYNAMIC_LINK_DOMAIN: 'auth/invalid-dynamic-link-domain',
  INVALID_EMAIL: 'auth/invalid-email',
  INVALID_EMULATOR_SCHEME: 'auth/invalid-emulator-scheme',
  INVALID_IDP_RESPONSE: 'auth/invalid-credential',
  INVALID_MESSAGE_PAYLOAD: 'auth/invalid-message-payload',
  INVALID_MFA_SESSION: 'auth/invalid-multi-factor-session',
  INVALID_OAUTH_CLIENT_ID: 'auth/invalid-oauth-client-id',
  INVALID_OAUTH_PROVIDER: 'auth/invalid-oauth-provider',
  INVALID_OOB_CODE: 'auth/invalid-action-code',
  INVALID_ORIGIN: 'auth/unauthorized-domain',
  INVALID_PASSWORD: 'auth/wrong-password',
  INVALID_PERSISTENCE: 'auth/invalid-persistence-type',
  INVALID_PHONE_NUMBER: 'auth/invalid-phone-number',
  INVALID_PROVIDER_ID: 'auth/invalid-provider-id',
  INVALID_RECIPIENT_EMAIL: 'auth/invalid-recipient-email',
  INVALID_SENDER: 'auth/invalid-sender',
  INVALID_SESSION_INFO: 'auth/invalid-verification-id',
  INVALID_TENANT_ID: 'auth/invalid-tenant-id',
  MFA_INFO_NOT_FOUND: 'auth/multi-factor-info-not-found',
  MFA_REQUIRED: 'auth/multi-factor-auth-required',
  MISSING_ANDROID_PACKAGE_NAME: 'auth/missing-android-pkg-name',
  MISSING_APP_CREDENTIAL: 'auth/missing-app-credential',
  MISSING_AUTH_DOMAIN: 'auth/auth-domain-config-required',
  MISSING_CODE: 'auth/missing-verification-code',
  MISSING_CONTINUE_URI: 'auth/missing-continue-uri',
  MISSING_IFRAME_START: 'auth/missing-iframe-start',
  MISSING_IOS_BUNDLE_ID: 'auth/missing-ios-bundle-id',
  MISSING_OR_INVALID_NONCE: 'auth/missing-or-invalid-nonce',
  MISSING_MFA_INFO: 'auth/missing-multi-factor-info',
  MISSING_MFA_SESSION: 'auth/missing-multi-factor-session',
  MISSING_PHONE_NUMBER: 'auth/missing-phone-number',
  MISSING_SESSION_INFO: 'auth/missing-verification-id',
  MODULE_DESTROYED: 'auth/app-deleted',
  NEED_CONFIRMATION: 'auth/account-exists-with-different-credential',
  NETWORK_REQUEST_FAILED: 'auth/network-request-failed',
  NULL_USER: 'auth/null-user',
  NO_AUTH_EVENT: 'auth/no-auth-event',
  NO_SUCH_PROVIDER: 'auth/no-such-provider',
  OPERATION_NOT_ALLOWED: 'auth/operation-not-allowed',
  OPERATION_NOT_SUPPORTED: 'auth/operation-not-supported-in-this-environment',
  POPUP_BLOCKED: 'auth/popup-blocked',
  POPUP_CLOSED_BY_USER: 'auth/popup-closed-by-user',
  PROVIDER_ALREADY_LINKED: 'auth/provider-already-linked',
  QUOTA_EXCEEDED: 'auth/quota-exceeded',
  REDIRECT_CANCELLED_BY_USER: 'auth/redirect-cancelled-by-user',
  REDIRECT_OPERATION_PENDING: 'auth/redirect-operation-pending',
  REJECTED_CREDENTIAL: 'auth/rejected-credential',
  SECOND_FACTOR_ALREADY_ENROLLED: 'auth/second-factor-already-in-use',
  SECOND_FACTOR_LIMIT_EXCEEDED: 'auth/maximum-second-factor-count-exceeded',
  TENANT_ID_MISMATCH: 'auth/tenant-id-mismatch',
  TIMEOUT: 'auth/timeout',
  TOKEN_EXPIRED: 'auth/user-token-expired',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'auth/too-many-requests',
  UNAUTHORIZED_DOMAIN: 'auth/unauthorized-continue-uri',
  UNSUPPORTED_FIRST_FACTOR: 'auth/unsupported-first-factor',
  UNSUPPORTED_PERSISTENCE: 'auth/unsupported-persistence-type',
  UNSUPPORTED_TENANT_OPERATION: 'auth/unsupported-tenant-operation',
  UNVERIFIED_EMAIL: 'auth/unverified-email',
  USER_CANCELLED: 'auth/user-cancelled',
  USER_DELETED: 'auth/user-not-found',
  USER_DISABLED: 'auth/user-disabled',
  USER_MISMATCH: 'auth/user-mismatch',
  USER_SIGNED_OUT: 'auth/user-signed-out',
  WEAK_PASSWORD: 'auth/weak-password',
  WEB_STORAGE_UNSUPPORTED: 'auth/web-storage-unsupported',
  ALREADY_INITIALIZED: 'auth/already-initialized'
};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.C = AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY;
const logClient = new _logger.Logger('@firebase/auth');

function _logError(msg, ...args) {
  if (logClient.logLevel <= _logger.LogLevel.ERROR) {
    logClient.error(`Auth (${_app.SDK_VERSION}): ${msg}`, ...args);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function _fail(authOrCode, ...rest) {
  throw createErrorInternal(authOrCode, ...rest);
}

function _createError(authOrCode, ...rest) {
  return createErrorInternal(authOrCode, ...rest);
}

function _errorWithCustomMessage(auth, code, message) {
  const errorMap = Object.assign(Object.assign({}, prodErrorMap()), {
    [code]: message
  });
  const factory = new _util.ErrorFactory('auth', 'Firebase', errorMap);
  return factory.create(code, {
    appName: auth.name
  });
}

function _assertInstanceOf(auth, object, instance) {
  const constructorInstance = instance;

  if (!(object instanceof constructorInstance)) {
    if (constructorInstance.name !== object.constructor.name) {
      _fail(auth, "argument-error"
      /* ARGUMENT_ERROR */
      );
    }

    throw _errorWithCustomMessage(auth, "argument-error"
    /* ARGUMENT_ERROR */
    , `Type of ${object.constructor.name} does not match expected instance.` + `Did you pass a reference from a different Auth SDK?`);
  }
}

function createErrorInternal(authOrCode, ...rest) {
  if (typeof authOrCode !== 'string') {
    const code = rest[0];
    const fullParams = [...rest.slice(1)];

    if (fullParams[0]) {
      fullParams[0].appName = authOrCode.name;
    }

    return authOrCode._errorFactory.create(code, ...fullParams);
  }

  return _DEFAULT_AUTH_ERROR_FACTORY.create(authOrCode, ...rest);
}

function _assert(assertion, authOrCode, ...rest) {
  if (!assertion) {
    throw createErrorInternal(authOrCode, ...rest);
  }
}
/**
 * Unconditionally fails, throwing an internal error with the given message.
 *
 * @param failure type of failure encountered
 * @throws Error
 */


function debugFail(failure) {
  // Log the failure in addition to throw an exception, just in case the
  // exception is swallowed.
  const message = `INTERNAL ASSERTION FAILED: ` + failure;

  _logError(message); // NOTE: We don't use FirebaseError here because these are internal failures
  // that cannot be handled by the user. (Also it would create a circular
  // dependency between the error and assert modules which doesn't work.)


  throw new Error(message);
}
/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * @param assertion
 * @param message
 */


function debugAssert(assertion, message) {
  if (!assertion) {
    debugFail(message);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const instanceCache = new Map();

function _getInstance(cls) {
  debugAssert(cls instanceof Function, 'Expected a class definition');
  let instance = instanceCache.get(cls);

  if (instance) {
    debugAssert(instance instanceof cls, 'Instance stored in cache mismatched with class');
    return instance;
  }

  instance = new cls();
  instanceCache.set(cls, instance);
  return instance;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Initializes an {@link Auth} instance with fine-grained control over
 * {@link Dependencies}.
 *
 * @remarks
 *
 * This function allows more control over the {@link Auth} instance than
 * {@link getAuth}. `getAuth` uses platform-specific defaults to supply
 * the {@link Dependencies}. In general, `getAuth` is the easiest way to
 * initialize Auth and works for most use cases. Use `initializeAuth` if you
 * need control over which persistence layer is used, or to minimize bundle
 * size if you're not using either `signInWithPopup` or `signInWithRedirect`.
 *
 * For example, if your app only uses anonymous accounts and you only want
 * accounts saved for the current session, initialize `Auth` with:
 *
 * ```js
 * const auth = initializeAuth(app, {
 *   persistence: browserSessionPersistence,
 *   popupRedirectResolver: undefined,
 * });
 * ```
 *
 * @public
 */


function initializeAuth(app, deps) {
  const provider = (0, _app._getProvider)(app, 'auth');

  if (provider.isInitialized()) {
    const auth = provider.getImmediate();
    const initialOptions = provider.getOptions();

    if ((0, _util.deepEqual)(initialOptions, deps !== null && deps !== void 0 ? deps : {})) {
      return auth;
    } else {
      _fail(auth, "already-initialized"
      /* ALREADY_INITIALIZED */
      );
    }
  }

  const auth = provider.initialize({
    options: deps
  });
  return auth;
}

function _initializeAuthInstance(auth, deps) {
  const persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
  const hierarchy = (Array.isArray(persistence) ? persistence : [persistence]).map(_getInstance);

  if (deps === null || deps === void 0 ? void 0 : deps.errorMap) {
    auth._updateErrorMap(deps.errorMap);
  } // This promise is intended to float; auth initialization happens in the
  // background, meanwhile the auth object may be used by the app.
  // eslint-disable-next-line @typescript-eslint/no-floating-promises


  auth._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function _getCurrentUrl() {
  var _a;

  return typeof self !== 'undefined' && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.href) || '';
}

function _isHttpOrHttps() {
  return _getCurrentScheme() === 'http:' || _getCurrentScheme() === 'https:';
}

function _getCurrentScheme() {
  var _a;

  return typeof self !== 'undefined' && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.protocol) || null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Determine whether the browser is working online
 */


function _isOnline() {
  if (typeof navigator !== 'undefined' && navigator && 'onLine' in navigator && typeof navigator.onLine === 'boolean' && ( // Apply only for traditional web apps and Chrome extensions.
  // This is especially true for Cordova apps which have unreliable
  // navigator.onLine behavior unless cordova-plugin-network-information is
  // installed which overwrites the native navigator.onLine value and
  // defines navigator.connection.
  _isHttpOrHttps() || (0, _util.isBrowserExtension)() || 'connection' in navigator)) {
    return navigator.onLine;
  } // If we can't determine the state, assume it is online.


  return true;
}

function _getUserLanguage() {
  if (typeof navigator === 'undefined') {
    return null;
  }

  const navigatorLanguage = navigator;
  return (// Most reliable, but only supported in Chrome/Firefox.
    navigatorLanguage.languages && navigatorLanguage.languages[0] || // Supported in most browsers, but returns the language of the browser
    // UI, not the language set in browser settings.
    navigatorLanguage.language || // Couldn't determine language.
    null
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A structure to help pick between a range of long and short delay durations
 * depending on the current environment. In general, the long delay is used for
 * mobile environments whereas short delays are used for desktop environments.
 */


class Delay {
  constructor(shortDelay, longDelay) {
    this.shortDelay = shortDelay;
    this.longDelay = longDelay; // Internal error when improperly initialized.

    debugAssert(longDelay > shortDelay, 'Short delay should be less than long delay!');
    this.isMobile = (0, _util.isMobileCordova)() || (0, _util.isReactNative)();
  }

  get() {
    if (!_isOnline()) {
      // Pick the shorter timeout.
      return Math.min(5000
      /* OFFLINE */
      , this.shortDelay);
    } // If running in a mobile environment, return the long delay, otherwise
    // return the short delay.
    // This could be improved in the future to dynamically change based on other
    // variables instead of just reading the current environment.


    return this.isMobile ? this.longDelay : this.shortDelay;
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function _emulatorUrl(config, path) {
  debugAssert(config.emulator, 'Emulator should always be set here');
  const {
    url
  } = config.emulator;

  if (!path) {
    return url;
  }

  return `${url}${path.startsWith('/') ? path.slice(1) : path}`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class FetchProvider {
  static initialize(fetchImpl, headersImpl, responseImpl) {
    this.fetchImpl = fetchImpl;

    if (headersImpl) {
      this.headersImpl = headersImpl;
    }

    if (responseImpl) {
      this.responseImpl = responseImpl;
    }
  }

  static fetch() {
    if (this.fetchImpl) {
      return this.fetchImpl;
    }

    if (typeof self !== 'undefined' && 'fetch' in self) {
      return self.fetch;
    }

    debugFail('Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
  }

  static headers() {
    if (this.headersImpl) {
      return this.headersImpl;
    }

    if (typeof self !== 'undefined' && 'Headers' in self) {
      return self.Headers;
    }

    debugFail('Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
  }

  static response() {
    if (this.responseImpl) {
      return this.responseImpl;
    }

    if (typeof self !== 'undefined' && 'Response' in self) {
      return self.Response;
    }

    debugFail('Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill');
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Map from errors returned by the server to errors to developer visible errors
 */


exports.aI = FetchProvider;
const SERVER_ERROR_MAP = {
  // Custom token errors.
  ["CREDENTIAL_MISMATCH"
  /* CREDENTIAL_MISMATCH */
  ]: "custom-token-mismatch"
  /* CREDENTIAL_MISMATCH */
  ,
  // This can only happen if the SDK sends a bad request.
  ["MISSING_CUSTOM_TOKEN"
  /* MISSING_CUSTOM_TOKEN */
  ]: "internal-error"
  /* INTERNAL_ERROR */
  ,
  // Create Auth URI errors.
  ["INVALID_IDENTIFIER"
  /* INVALID_IDENTIFIER */
  ]: "invalid-email"
  /* INVALID_EMAIL */
  ,
  // This can only happen if the SDK sends a bad request.
  ["MISSING_CONTINUE_URI"
  /* MISSING_CONTINUE_URI */
  ]: "internal-error"
  /* INTERNAL_ERROR */
  ,
  // Sign in with email and password errors (some apply to sign up too).
  ["INVALID_PASSWORD"
  /* INVALID_PASSWORD */
  ]: "wrong-password"
  /* INVALID_PASSWORD */
  ,
  // This can only happen if the SDK sends a bad request.
  ["MISSING_PASSWORD"
  /* MISSING_PASSWORD */
  ]: "internal-error"
  /* INTERNAL_ERROR */
  ,
  // Sign up with email and password errors.
  ["EMAIL_EXISTS"
  /* EMAIL_EXISTS */
  ]: "email-already-in-use"
  /* EMAIL_EXISTS */
  ,
  ["PASSWORD_LOGIN_DISABLED"
  /* PASSWORD_LOGIN_DISABLED */
  ]: "operation-not-allowed"
  /* OPERATION_NOT_ALLOWED */
  ,
  // Verify assertion for sign in with credential errors:
  ["INVALID_IDP_RESPONSE"
  /* INVALID_IDP_RESPONSE */
  ]: "invalid-credential"
  /* INVALID_IDP_RESPONSE */
  ,
  ["INVALID_PENDING_TOKEN"
  /* INVALID_PENDING_TOKEN */
  ]: "invalid-credential"
  /* INVALID_IDP_RESPONSE */
  ,
  ["FEDERATED_USER_ID_ALREADY_LINKED"
  /* FEDERATED_USER_ID_ALREADY_LINKED */
  ]: "credential-already-in-use"
  /* CREDENTIAL_ALREADY_IN_USE */
  ,
  // This can only happen if the SDK sends a bad request.
  ["MISSING_REQ_TYPE"
  /* MISSING_REQ_TYPE */
  ]: "internal-error"
  /* INTERNAL_ERROR */
  ,
  // Send Password reset email errors:
  ["EMAIL_NOT_FOUND"
  /* EMAIL_NOT_FOUND */
  ]: "user-not-found"
  /* USER_DELETED */
  ,
  ["RESET_PASSWORD_EXCEED_LIMIT"
  /* RESET_PASSWORD_EXCEED_LIMIT */
  ]: "too-many-requests"
  /* TOO_MANY_ATTEMPTS_TRY_LATER */
  ,
  ["EXPIRED_OOB_CODE"
  /* EXPIRED_OOB_CODE */
  ]: "expired-action-code"
  /* EXPIRED_OOB_CODE */
  ,
  ["INVALID_OOB_CODE"
  /* INVALID_OOB_CODE */
  ]: "invalid-action-code"
  /* INVALID_OOB_CODE */
  ,
  // This can only happen if the SDK sends a bad request.
  ["MISSING_OOB_CODE"
  /* MISSING_OOB_CODE */
  ]: "internal-error"
  /* INTERNAL_ERROR */
  ,
  // Operations that require ID token in request:
  ["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"
  /* CREDENTIAL_TOO_OLD_LOGIN_AGAIN */
  ]: "requires-recent-login"
  /* CREDENTIAL_TOO_OLD_LOGIN_AGAIN */
  ,
  ["INVALID_ID_TOKEN"
  /* INVALID_ID_TOKEN */
  ]: "invalid-user-token"
  /* INVALID_AUTH */
  ,
  ["TOKEN_EXPIRED"
  /* TOKEN_EXPIRED */
  ]: "user-token-expired"
  /* TOKEN_EXPIRED */
  ,
  ["USER_NOT_FOUND"
  /* USER_NOT_FOUND */
  ]: "user-token-expired"
  /* TOKEN_EXPIRED */
  ,
  // Other errors.
  ["TOO_MANY_ATTEMPTS_TRY_LATER"
  /* TOO_MANY_ATTEMPTS_TRY_LATER */
  ]: "too-many-requests"
  /* TOO_MANY_ATTEMPTS_TRY_LATER */
  ,
  // Phone Auth related errors.
  ["INVALID_CODE"
  /* INVALID_CODE */
  ]: "invalid-verification-code"
  /* INVALID_CODE */
  ,
  ["INVALID_SESSION_INFO"
  /* INVALID_SESSION_INFO */
  ]: "invalid-verification-id"
  /* INVALID_SESSION_INFO */
  ,
  ["INVALID_TEMPORARY_PROOF"
  /* INVALID_TEMPORARY_PROOF */
  ]: "invalid-credential"
  /* INVALID_IDP_RESPONSE */
  ,
  ["MISSING_SESSION_INFO"
  /* MISSING_SESSION_INFO */
  ]: "missing-verification-id"
  /* MISSING_SESSION_INFO */
  ,
  ["SESSION_EXPIRED"
  /* SESSION_EXPIRED */
  ]: "code-expired"
  /* CODE_EXPIRED */
  ,
  // Other action code errors when additional settings passed.
  // MISSING_CONTINUE_URI is getting mapped to INTERNAL_ERROR above.
  // This is OK as this error will be caught by client side validation.
  ["MISSING_ANDROID_PACKAGE_NAME"
  /* MISSING_ANDROID_PACKAGE_NAME */
  ]: "missing-android-pkg-name"
  /* MISSING_ANDROID_PACKAGE_NAME */
  ,
  ["UNAUTHORIZED_DOMAIN"
  /* UNAUTHORIZED_DOMAIN */
  ]: "unauthorized-continue-uri"
  /* UNAUTHORIZED_DOMAIN */
  ,
  // getProjectConfig errors when clientId is passed.
  ["INVALID_OAUTH_CLIENT_ID"
  /* INVALID_OAUTH_CLIENT_ID */
  ]: "invalid-oauth-client-id"
  /* INVALID_OAUTH_CLIENT_ID */
  ,
  // User actions (sign-up or deletion) disabled errors.
  ["ADMIN_ONLY_OPERATION"
  /* ADMIN_ONLY_OPERATION */
  ]: "admin-restricted-operation"
  /* ADMIN_ONLY_OPERATION */
  ,
  // Multi factor related errors.
  ["INVALID_MFA_PENDING_CREDENTIAL"
  /* INVALID_MFA_PENDING_CREDENTIAL */
  ]: "invalid-multi-factor-session"
  /* INVALID_MFA_SESSION */
  ,
  ["MFA_ENROLLMENT_NOT_FOUND"
  /* MFA_ENROLLMENT_NOT_FOUND */
  ]: "multi-factor-info-not-found"
  /* MFA_INFO_NOT_FOUND */
  ,
  ["MISSING_MFA_ENROLLMENT_ID"
  /* MISSING_MFA_ENROLLMENT_ID */
  ]: "missing-multi-factor-info"
  /* MISSING_MFA_INFO */
  ,
  ["MISSING_MFA_PENDING_CREDENTIAL"
  /* MISSING_MFA_PENDING_CREDENTIAL */
  ]: "missing-multi-factor-session"
  /* MISSING_MFA_SESSION */
  ,
  ["SECOND_FACTOR_EXISTS"
  /* SECOND_FACTOR_EXISTS */
  ]: "second-factor-already-in-use"
  /* SECOND_FACTOR_ALREADY_ENROLLED */
  ,
  ["SECOND_FACTOR_LIMIT_EXCEEDED"
  /* SECOND_FACTOR_LIMIT_EXCEEDED */
  ]: "maximum-second-factor-count-exceeded"
  /* SECOND_FACTOR_LIMIT_EXCEEDED */
  ,
  // Blocking functions related errors.
  ["BLOCKING_FUNCTION_ERROR_RESPONSE"
  /* BLOCKING_FUNCTION_ERROR_RESPONSE */
  ]: "internal-error"
  /* INTERNAL_ERROR */

};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const DEFAULT_API_TIMEOUT_MS = new Delay(30000, 60000);

function _addTidIfNecessary(auth, request) {
  if (auth.tenantId && !request.tenantId) {
    return Object.assign(Object.assign({}, request), {
      tenantId: auth.tenantId
    });
  }

  return request;
}

async function _performApiRequest(auth, method, path, request, customErrorMap = {}) {
  return _performFetchWithErrorHandling(auth, customErrorMap, async () => {
    let body = {};
    let params = {};

    if (request) {
      if (method === "GET"
      /* GET */
      ) {
        params = request;
      } else {
        body = {
          body: JSON.stringify(request)
        };
      }
    }

    const query = (0, _util.querystring)(Object.assign({
      key: auth.config.apiKey
    }, params)).slice(1);
    const headers = await auth._getAdditionalHeaders();
    headers["Content-Type"
    /* CONTENT_TYPE */
    ] = 'application/json';

    if (auth.languageCode) {
      headers["X-Firebase-Locale"
      /* X_FIREBASE_LOCALE */
      ] = auth.languageCode;
    }

    return FetchProvider.fetch()(_getFinalTarget(auth, auth.config.apiHost, path, query), Object.assign({
      method,
      headers,
      referrerPolicy: 'no-referrer'
    }, body));
  });
}

async function _performFetchWithErrorHandling(auth, customErrorMap, fetchFn) {
  auth._canInitEmulator = false;
  const errorMap = Object.assign(Object.assign({}, SERVER_ERROR_MAP), customErrorMap);

  try {
    const networkTimeout = new NetworkTimeout(auth);
    const response = await Promise.race([fetchFn(), networkTimeout.promise]); // If we've reached this point, the fetch succeeded and the networkTimeout
    // didn't throw; clear the network timeout delay so that Node won't hang

    networkTimeout.clearNetworkTimeout();
    const json = await response.json();

    if ('needConfirmation' in json) {
      throw _makeTaggedError(auth, "account-exists-with-different-credential"
      /* NEED_CONFIRMATION */
      , json);
    }

    if (response.ok && !('errorMessage' in json)) {
      return json;
    } else {
      const errorMessage = response.ok ? json.errorMessage : json.error.message;
      const [serverErrorCode, serverErrorMessage] = errorMessage.split(' : ');

      if (serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED"
      /* FEDERATED_USER_ID_ALREADY_LINKED */
      ) {
        throw _makeTaggedError(auth, "credential-already-in-use"
        /* CREDENTIAL_ALREADY_IN_USE */
        , json);
      } else if (serverErrorCode === "EMAIL_EXISTS"
      /* EMAIL_EXISTS */
      ) {
        throw _makeTaggedError(auth, "email-already-in-use"
        /* EMAIL_EXISTS */
        , json);
      }

      const authError = errorMap[serverErrorCode] || serverErrorCode.toLowerCase().replace(/[_\s]+/g, '-');

      if (serverErrorMessage) {
        throw _errorWithCustomMessage(auth, authError, serverErrorMessage);
      } else {
        _fail(auth, authError);
      }
    }
  } catch (e) {
    if (e instanceof _util.FirebaseError) {
      throw e;
    }

    _fail(auth, "network-request-failed"
    /* NETWORK_REQUEST_FAILED */
    );
  }
}

async function _performSignInRequest(auth, method, path, request, customErrorMap = {}) {
  const serverResponse = await _performApiRequest(auth, method, path, request, customErrorMap);

  if ('mfaPendingCredential' in serverResponse) {
    _fail(auth, "multi-factor-auth-required"
    /* MFA_REQUIRED */
    , {
      _serverResponse: serverResponse
    });
  }

  return serverResponse;
}

function _getFinalTarget(auth, host, path, query) {
  const base = `${host}${path}?${query}`;

  if (!auth.config.emulator) {
    return `${auth.config.apiScheme}://${base}`;
  }

  return _emulatorUrl(auth.config, base);
}

class NetworkTimeout {
  constructor(auth) {
    this.auth = auth; // Node timers and browser timers are fundamentally incompatible, but we
    // don't care about the value here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    this.timer = null;
    this.promise = new Promise((_, reject) => {
      this.timer = setTimeout(() => {
        return reject(_createError(this.auth, "timeout"
        /* TIMEOUT */
        ));
      }, DEFAULT_API_TIMEOUT_MS.get());
    });
  }

  clearNetworkTimeout() {
    clearTimeout(this.timer);
  }

}

function _makeTaggedError(auth, code, response) {
  const errorParams = {
    appName: auth.name
  };

  if (response.email) {
    errorParams.email = response.email;
  }

  if (response.phoneNumber) {
    errorParams.phoneNumber = response.phoneNumber;
  }

  const error = _createError(auth, code, errorParams); // We know customData is defined on error because errorParams is defined


  error.customData._tokenResponse = response;
  return error;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function deleteAccount(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:delete"
  /* DELETE_ACCOUNT */
  , request);
}

async function deleteLinkedAccounts(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:update"
  /* SET_ACCOUNT_INFO */
  , request);
}

async function getAccountInfo(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:lookup"
  /* GET_ACCOUNT_INFO */
  , request);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function utcTimestampToDateString(utcTimestamp) {
  if (!utcTimestamp) {
    return undefined;
  }

  try {
    // Convert to date object.
    const date = new Date(Number(utcTimestamp)); // Test date is valid.

    if (!isNaN(date.getTime())) {
      // Convert to UTC date string.
      return date.toUTCString();
    }
  } catch (e) {// Do nothing. undefined will be returned.
  }

  return undefined;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a JSON Web Token (JWT) used to identify the user to a Firebase service.
 *
 * @remarks
 * Returns the current token if it has not expired or if it will not expire in the next five
 * minutes. Otherwise, this will refresh the token and return a new one.
 *
 * @param user - The user.
 * @param forceRefresh - Force refresh regardless of token expiration.
 *
 * @public
 */


function getIdToken(user, forceRefresh = false) {
  return (0, _util.getModularInstance)(user).getIdToken(forceRefresh);
}
/**
 * Returns a deserialized JSON Web Token (JWT) used to identitfy the user to a Firebase service.
 *
 * @remarks
 * Returns the current token if it has not expired or if it will not expire in the next five
 * minutes. Otherwise, this will refresh the token and return a new one.
 *
 * @param user - The user.
 * @param forceRefresh - Force refresh regardless of token expiration.
 *
 * @public
 */


async function getIdTokenResult(user, forceRefresh = false) {
  const userInternal = (0, _util.getModularInstance)(user);
  const token = await userInternal.getIdToken(forceRefresh);

  const claims = _parseToken(token);

  _assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error"
  /* INTERNAL_ERROR */
  );

  const firebase = typeof claims.firebase === 'object' ? claims.firebase : undefined;
  const signInProvider = firebase === null || firebase === void 0 ? void 0 : firebase['sign_in_provider'];
  return {
    claims,
    token,
    authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
    issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
    expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
    signInProvider: signInProvider || null,
    signInSecondFactor: (firebase === null || firebase === void 0 ? void 0 : firebase['sign_in_second_factor']) || null
  };
}

function secondsStringToMilliseconds(seconds) {
  return Number(seconds) * 1000;
}

function _parseToken(token) {
  const [algorithm, payload, signature] = token.split('.');

  if (algorithm === undefined || payload === undefined || signature === undefined) {
    _logError('JWT malformed, contained fewer than 3 sections');

    return null;
  }

  try {
    const decoded = (0, _util.base64Decode)(payload);

    if (!decoded) {
      _logError('Failed to decode base64 JWT payload');

      return null;
    }

    return JSON.parse(decoded);
  } catch (e) {
    _logError('Caught error parsing JWT payload as JSON', e);

    return null;
  }
}
/**
 * Extract expiresIn TTL from a token by subtracting the expiration from the issuance.
 */


function _tokenExpiresIn(token) {
  const parsedToken = _parseToken(token);

  _assert(parsedToken, "internal-error"
  /* INTERNAL_ERROR */
  );

  _assert(typeof parsedToken.exp !== 'undefined', "internal-error"
  /* INTERNAL_ERROR */
  );

  _assert(typeof parsedToken.iat !== 'undefined', "internal-error"
  /* INTERNAL_ERROR */
  );

  return Number(parsedToken.exp) - Number(parsedToken.iat);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function _logoutIfInvalidated(user, promise, bypassAuthState = false) {
  if (bypassAuthState) {
    return promise;
  }

  try {
    return await promise;
  } catch (e) {
    if (e instanceof _util.FirebaseError && isUserInvalidated(e)) {
      if (user.auth.currentUser === user) {
        await user.auth.signOut();
      }
    }

    throw e;
  }
}

function isUserInvalidated({
  code
}) {
  return code === `auth/${"user-disabled"
  /* USER_DISABLED */
  }` || code === `auth/${"user-token-expired"
  /* TOKEN_EXPIRED */
  }`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class ProactiveRefresh {
  constructor(user) {
    this.user = user;
    this.isRunning = false; // Node timers and browser timers return fundamentally different types.
    // We don't actually care what the value is but TS won't accept unknown and
    // we can't cast properly in both environments.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    this.timerId = null;
    this.errorBackoff = 30000
    /* RETRY_BACKOFF_MIN */
    ;
  }

  _start() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.schedule();
  }

  _stop() {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;

    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }
  }

  getInterval(wasError) {
    var _a;

    if (wasError) {
      const interval = this.errorBackoff;
      this.errorBackoff = Math.min(this.errorBackoff * 2, 960000
      /* RETRY_BACKOFF_MAX */
      );
      return interval;
    } else {
      // Reset the error backoff
      this.errorBackoff = 30000
      /* RETRY_BACKOFF_MIN */
      ;
      const expTime = (_a = this.user.stsTokenManager.expirationTime) !== null && _a !== void 0 ? _a : 0;
      const interval = expTime - Date.now() - 300000
      /* OFFSET */
      ;
      return Math.max(0, interval);
    }
  }

  schedule(wasError = false) {
    if (!this.isRunning) {
      // Just in case...
      return;
    }

    const interval = this.getInterval(wasError);
    this.timerId = setTimeout(async () => {
      await this.iteration();
    }, interval);
  }

  async iteration() {
    try {
      await this.user.getIdToken(true);
    } catch (e) {
      // Only retry on network errors
      if (e.code === `auth/${"network-request-failed"
      /* NETWORK_REQUEST_FAILED */
      }`) {
        this.schedule(
        /* wasError */
        true);
      }

      return;
    }

    this.schedule();
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class UserMetadata {
  constructor(createdAt, lastLoginAt) {
    this.createdAt = createdAt;
    this.lastLoginAt = lastLoginAt;

    this._initializeTime();
  }

  _initializeTime() {
    this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
    this.creationTime = utcTimestampToDateString(this.createdAt);
  }

  _copy(metadata) {
    this.createdAt = metadata.createdAt;
    this.lastLoginAt = metadata.lastLoginAt;

    this._initializeTime();
  }

  toJSON() {
    return {
      createdAt: this.createdAt,
      lastLoginAt: this.lastLoginAt
    };
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function _reloadWithoutSaving(user) {
  var _a;

  const auth = user.auth;
  const idToken = await user.getIdToken();
  const response = await _logoutIfInvalidated(user, getAccountInfo(auth, {
    idToken
  }));

  _assert(response === null || response === void 0 ? void 0 : response.users.length, auth, "internal-error"
  /* INTERNAL_ERROR */
  );

  const coreAccount = response.users[0];

  user._notifyReloadListener(coreAccount);

  const newProviderData = ((_a = coreAccount.providerUserInfo) === null || _a === void 0 ? void 0 : _a.length) ? extractProviderData(coreAccount.providerUserInfo) : [];
  const providerData = mergeProviderData(user.providerData, newProviderData); // Preserves the non-nonymous status of the stored user, even if no more
  // credentials (federated or email/password) are linked to the user. If
  // the user was previously anonymous, then use provider data to update.
  // On the other hand, if it was not anonymous before, it should never be
  // considered anonymous now.

  const oldIsAnonymous = user.isAnonymous;
  const newIsAnonymous = !(user.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
  const isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
  const updates = {
    uid: coreAccount.localId,
    displayName: coreAccount.displayName || null,
    photoURL: coreAccount.photoUrl || null,
    email: coreAccount.email || null,
    emailVerified: coreAccount.emailVerified || false,
    phoneNumber: coreAccount.phoneNumber || null,
    tenantId: coreAccount.tenantId || null,
    providerData,
    metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
    isAnonymous
  };
  Object.assign(user, updates);
}
/**
 * Reloads user account data, if signed in.
 *
 * @param user - The user.
 *
 * @public
 */


async function reload(user) {
  const userInternal = (0, _util.getModularInstance)(user);
  await _reloadWithoutSaving(userInternal); // Even though the current user hasn't changed, update
  // current user will trigger a persistence update w/ the
  // new info.

  await userInternal.auth._persistUserIfCurrent(userInternal);

  userInternal.auth._notifyListenersIfCurrent(userInternal);
}

function mergeProviderData(original, newData) {
  const deduped = original.filter(o => !newData.some(n => n.providerId === o.providerId));
  return [...deduped, ...newData];
}

function extractProviderData(providers) {
  return providers.map(_a => {
    var {
      providerId
    } = _a,
        provider = (0, _tslib.__rest)(_a, ["providerId"]);
    return {
      providerId,
      uid: provider.rawId || '',
      displayName: provider.displayName || null,
      email: provider.email || null,
      phoneNumber: provider.phoneNumber || null,
      photoURL: provider.photoUrl || null
    };
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function requestStsToken(auth, refreshToken) {
  const response = await _performFetchWithErrorHandling(auth, {}, async () => {
    const body = (0, _util.querystring)({
      'grant_type': 'refresh_token',
      'refresh_token': refreshToken
    }).slice(1);
    const {
      tokenApiHost,
      apiKey
    } = auth.config;

    const url = _getFinalTarget(auth, tokenApiHost, "/v1/token"
    /* TOKEN */
    , `key=${apiKey}`);

    const headers = await auth._getAdditionalHeaders();
    headers["Content-Type"
    /* CONTENT_TYPE */
    ] = 'application/x-www-form-urlencoded';
    return FetchProvider.fetch()(url, {
      method: "POST"
      /* POST */
      ,
      headers,
      body
    });
  }); // The response comes back in snake_case. Convert to camel:

  return {
    accessToken: response.access_token,
    expiresIn: response.expires_in,
    refreshToken: response.refresh_token
  };
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * We need to mark this class as internal explicitly to exclude it in the public typings, because
 * it references AuthInternal which has a circular dependency with UserInternal.
 *
 * @internal
 */


class StsTokenManager {
  constructor() {
    this.refreshToken = null;
    this.accessToken = null;
    this.expirationTime = null;
  }

  get isExpired() {
    return !this.expirationTime || Date.now() > this.expirationTime - 30000
    /* TOKEN_REFRESH */
    ;
  }

  updateFromServerResponse(response) {
    _assert(response.idToken, "internal-error"
    /* INTERNAL_ERROR */
    );

    _assert(typeof response.idToken !== 'undefined', "internal-error"
    /* INTERNAL_ERROR */
    );

    _assert(typeof response.refreshToken !== 'undefined', "internal-error"
    /* INTERNAL_ERROR */
    );

    const expiresIn = 'expiresIn' in response && typeof response.expiresIn !== 'undefined' ? Number(response.expiresIn) : _tokenExpiresIn(response.idToken);
    this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
  }

  async getToken(auth, forceRefresh = false) {
    _assert(!this.accessToken || this.refreshToken, auth, "user-token-expired"
    /* TOKEN_EXPIRED */
    );

    if (!forceRefresh && this.accessToken && !this.isExpired) {
      return this.accessToken;
    }

    if (this.refreshToken) {
      await this.refresh(auth, this.refreshToken);
      return this.accessToken;
    }

    return null;
  }

  clearRefreshToken() {
    this.refreshToken = null;
  }

  async refresh(auth, oldToken) {
    const {
      accessToken,
      refreshToken,
      expiresIn
    } = await requestStsToken(auth, oldToken);
    this.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
  }

  updateTokensAndExpiration(accessToken, refreshToken, expiresInSec) {
    this.refreshToken = refreshToken || null;
    this.accessToken = accessToken || null;
    this.expirationTime = Date.now() + expiresInSec * 1000;
  }

  static fromJSON(appName, object) {
    const {
      refreshToken,
      accessToken,
      expirationTime
    } = object;
    const manager = new StsTokenManager();

    if (refreshToken) {
      _assert(typeof refreshToken === 'string', "internal-error"
      /* INTERNAL_ERROR */
      , {
        appName
      });

      manager.refreshToken = refreshToken;
    }

    if (accessToken) {
      _assert(typeof accessToken === 'string', "internal-error"
      /* INTERNAL_ERROR */
      , {
        appName
      });

      manager.accessToken = accessToken;
    }

    if (expirationTime) {
      _assert(typeof expirationTime === 'number', "internal-error"
      /* INTERNAL_ERROR */
      , {
        appName
      });

      manager.expirationTime = expirationTime;
    }

    return manager;
  }

  toJSON() {
    return {
      refreshToken: this.refreshToken,
      accessToken: this.accessToken,
      expirationTime: this.expirationTime
    };
  }

  _assign(stsTokenManager) {
    this.accessToken = stsTokenManager.accessToken;
    this.refreshToken = stsTokenManager.refreshToken;
    this.expirationTime = stsTokenManager.expirationTime;
  }

  _clone() {
    return Object.assign(new StsTokenManager(), this.toJSON());
  }

  _performRefresh() {
    return debugFail('not implemented');
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function assertStringOrUndefined(assertion, appName) {
  _assert(typeof assertion === 'string' || typeof assertion === 'undefined', "internal-error"
  /* INTERNAL_ERROR */
  , {
    appName
  });
}

class UserImpl {
  constructor(_a) {
    var {
      uid,
      auth,
      stsTokenManager
    } = _a,
        opt = (0, _tslib.__rest)(_a, ["uid", "auth", "stsTokenManager"]); // For the user object, provider is always Firebase.

    this.providerId = "firebase"
    /* FIREBASE */
    ;
    this.emailVerified = false;
    this.isAnonymous = false;
    this.tenantId = null;
    this.providerData = [];
    this.proactiveRefresh = new ProactiveRefresh(this);
    this.reloadUserInfo = null;
    this.reloadListener = null;
    this.uid = uid;
    this.auth = auth;
    this.stsTokenManager = stsTokenManager;
    this.accessToken = stsTokenManager.accessToken;
    this.displayName = opt.displayName || null;
    this.email = opt.email || null;
    this.emailVerified = opt.emailVerified || false;
    this.phoneNumber = opt.phoneNumber || null;
    this.photoURL = opt.photoURL || null;
    this.isAnonymous = opt.isAnonymous || false;
    this.tenantId = opt.tenantId || null;
    this.metadata = new UserMetadata(opt.createdAt || undefined, opt.lastLoginAt || undefined);
  }

  async getIdToken(forceRefresh) {
    const accessToken = await _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, forceRefresh));

    _assert(accessToken, this.auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    if (this.accessToken !== accessToken) {
      this.accessToken = accessToken;
      await this.auth._persistUserIfCurrent(this);

      this.auth._notifyListenersIfCurrent(this);
    }

    return accessToken;
  }

  getIdTokenResult(forceRefresh) {
    return getIdTokenResult(this, forceRefresh);
  }

  reload() {
    return reload(this);
  }

  _assign(user) {
    if (this === user) {
      return;
    }

    _assert(this.uid === user.uid, this.auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    this.displayName = user.displayName;
    this.photoURL = user.photoURL;
    this.email = user.email;
    this.emailVerified = user.emailVerified;
    this.phoneNumber = user.phoneNumber;
    this.isAnonymous = user.isAnonymous;
    this.tenantId = user.tenantId;
    this.providerData = user.providerData.map(userInfo => Object.assign({}, userInfo));

    this.metadata._copy(user.metadata);

    this.stsTokenManager._assign(user.stsTokenManager);
  }

  _clone(auth) {
    return new UserImpl(Object.assign(Object.assign({}, this), {
      auth,
      stsTokenManager: this.stsTokenManager._clone()
    }));
  }

  _onReload(callback) {
    // There should only ever be one listener, and that is a single instance of MultiFactorUser
    _assert(!this.reloadListener, this.auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    this.reloadListener = callback;

    if (this.reloadUserInfo) {
      this._notifyReloadListener(this.reloadUserInfo);

      this.reloadUserInfo = null;
    }
  }

  _notifyReloadListener(userInfo) {
    if (this.reloadListener) {
      this.reloadListener(userInfo);
    } else {
      // If no listener is subscribed yet, save the result so it's available when they do subscribe
      this.reloadUserInfo = userInfo;
    }
  }

  _startProactiveRefresh() {
    this.proactiveRefresh._start();
  }

  _stopProactiveRefresh() {
    this.proactiveRefresh._stop();
  }

  async _updateTokensIfNecessary(response, reload = false) {
    let tokensRefreshed = false;

    if (response.idToken && response.idToken !== this.stsTokenManager.accessToken) {
      this.stsTokenManager.updateFromServerResponse(response);
      tokensRefreshed = true;
    }

    if (reload) {
      await _reloadWithoutSaving(this);
    }

    await this.auth._persistUserIfCurrent(this);

    if (tokensRefreshed) {
      this.auth._notifyListenersIfCurrent(this);
    }
  }

  async delete() {
    const idToken = await this.getIdToken();
    await _logoutIfInvalidated(this, deleteAccount(this.auth, {
      idToken
    }));
    this.stsTokenManager.clearRefreshToken(); // TODO: Determine if cancellable-promises are necessary to use in this class so that delete()
    //       cancels pending actions...

    return this.auth.signOut();
  }

  toJSON() {
    return Object.assign(Object.assign({
      uid: this.uid,
      email: this.email || undefined,
      emailVerified: this.emailVerified,
      displayName: this.displayName || undefined,
      isAnonymous: this.isAnonymous,
      photoURL: this.photoURL || undefined,
      phoneNumber: this.phoneNumber || undefined,
      tenantId: this.tenantId || undefined,
      providerData: this.providerData.map(userInfo => Object.assign({}, userInfo)),
      stsTokenManager: this.stsTokenManager.toJSON(),
      // Redirect event ID must be maintained in case there is a pending
      // redirect event.
      _redirectEventId: this._redirectEventId
    }, this.metadata.toJSON()), {
      // Required for compatibility with the legacy SDK (go/firebase-auth-sdk-persistence-parsing):
      apiKey: this.auth.config.apiKey,
      appName: this.auth.name
    });
  }

  get refreshToken() {
    return this.stsTokenManager.refreshToken || '';
  }

  static _fromJSON(auth, object) {
    var _a, _b, _c, _d, _e, _f, _g, _h;

    const displayName = (_a = object.displayName) !== null && _a !== void 0 ? _a : undefined;
    const email = (_b = object.email) !== null && _b !== void 0 ? _b : undefined;
    const phoneNumber = (_c = object.phoneNumber) !== null && _c !== void 0 ? _c : undefined;
    const photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : undefined;
    const tenantId = (_e = object.tenantId) !== null && _e !== void 0 ? _e : undefined;

    const _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : undefined;

    const createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : undefined;
    const lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : undefined;
    const {
      uid,
      emailVerified,
      isAnonymous,
      providerData,
      stsTokenManager: plainObjectTokenManager
    } = object;

    _assert(uid && plainObjectTokenManager, auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    const stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);

    _assert(typeof uid === 'string', auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    assertStringOrUndefined(displayName, auth.name);
    assertStringOrUndefined(email, auth.name);

    _assert(typeof emailVerified === 'boolean', auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    _assert(typeof isAnonymous === 'boolean', auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    assertStringOrUndefined(phoneNumber, auth.name);
    assertStringOrUndefined(photoURL, auth.name);
    assertStringOrUndefined(tenantId, auth.name);
    assertStringOrUndefined(_redirectEventId, auth.name);
    assertStringOrUndefined(createdAt, auth.name);
    assertStringOrUndefined(lastLoginAt, auth.name);
    const user = new UserImpl({
      uid,
      auth,
      email,
      emailVerified,
      displayName,
      isAnonymous,
      photoURL,
      phoneNumber,
      tenantId,
      stsTokenManager,
      createdAt,
      lastLoginAt
    });

    if (providerData && Array.isArray(providerData)) {
      user.providerData = providerData.map(userInfo => Object.assign({}, userInfo));
    }

    if (_redirectEventId) {
      user._redirectEventId = _redirectEventId;
    }

    return user;
  }
  /**
   * Initialize a User from an idToken server response
   * @param auth
   * @param idTokenResponse
   */


  static async _fromIdTokenResponse(auth, idTokenResponse, isAnonymous = false) {
    const stsTokenManager = new StsTokenManager();
    stsTokenManager.updateFromServerResponse(idTokenResponse); // Initialize the Firebase Auth user.

    const user = new UserImpl({
      uid: idTokenResponse.localId,
      auth,
      stsTokenManager,
      isAnonymous
    }); // Updates the user info and data and resolves with a user instance.

    await _reloadWithoutSaving(user);
    return user;
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.aD = UserImpl;

class InMemoryPersistence {
  constructor() {
    this.type = "NONE"
    /* NONE */
    ;
    this.storage = {};
  }

  async _isAvailable() {
    return true;
  }

  async _set(key, value) {
    this.storage[key] = value;
  }

  async _get(key) {
    const value = this.storage[key];
    return value === undefined ? null : value;
  }

  async _remove(key) {
    delete this.storage[key];
  }

  _addListener(_key, _listener) {
    // Listeners are not supported for in-memory storage since it cannot be shared across windows/workers
    return;
  }

  _removeListener(_key, _listener) {
    // Listeners are not supported for in-memory storage since it cannot be shared across windows/workers
    return;
  }

}

InMemoryPersistence.type = 'NONE';
/**
 * An implementation of {@link Persistence} of type 'NONE'.
 *
 * @public
 */

const inMemoryPersistence = InMemoryPersistence;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.K = inMemoryPersistence;

function _persistenceKeyName(key, apiKey, appName) {
  return `${"firebase"
  /* PERSISTENCE */
  }:${key}:${apiKey}:${appName}`;
}

class PersistenceUserManager {
  constructor(persistence, auth, userKey) {
    this.persistence = persistence;
    this.auth = auth;
    this.userKey = userKey;
    const {
      config,
      name
    } = this.auth;
    this.fullUserKey = _persistenceKeyName(this.userKey, config.apiKey, name);
    this.fullPersistenceKey = _persistenceKeyName("persistence"
    /* PERSISTENCE_USER */
    , config.apiKey, name);
    this.boundEventHandler = auth._onStorageEvent.bind(auth);

    this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
  }

  setCurrentUser(user) {
    return this.persistence._set(this.fullUserKey, user.toJSON());
  }

  async getCurrentUser() {
    const blob = await this.persistence._get(this.fullUserKey);
    return blob ? UserImpl._fromJSON(this.auth, blob) : null;
  }

  removeCurrentUser() {
    return this.persistence._remove(this.fullUserKey);
  }

  savePersistenceForRedirect() {
    return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
  }

  async setPersistence(newPersistence) {
    if (this.persistence === newPersistence) {
      return;
    }

    const currentUser = await this.getCurrentUser();
    await this.removeCurrentUser();
    this.persistence = newPersistence;

    if (currentUser) {
      return this.setCurrentUser(currentUser);
    }
  }

  delete() {
    this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
  }

  static async create(auth, persistenceHierarchy, userKey = "authUser"
  /* AUTH_USER */
  ) {
    if (!persistenceHierarchy.length) {
      return new PersistenceUserManager(_getInstance(inMemoryPersistence), auth, userKey);
    } // Eliminate any persistences that are not available


    const availablePersistences = (await Promise.all(persistenceHierarchy.map(async persistence => {
      if (await persistence._isAvailable()) {
        return persistence;
      }

      return undefined;
    }))).filter(persistence => persistence); // Fall back to the first persistence listed, or in memory if none available

    let selectedPersistence = availablePersistences[0] || _getInstance(inMemoryPersistence);

    const key = _persistenceKeyName(userKey, auth.config.apiKey, auth.name); // Pull out the existing user, setting the chosen persistence to that
    // persistence if the user exists.


    let userToMigrate = null; // Note, here we check for a user in _all_ persistences, not just the
    // ones deemed available. If we can migrate a user out of a broken
    // persistence, we will (but only if that persistence supports migration).

    for (const persistence of persistenceHierarchy) {
      try {
        const blob = await persistence._get(key);

        if (blob) {
          const user = UserImpl._fromJSON(auth, blob); // throws for unparsable blob (wrong format)


          if (persistence !== selectedPersistence) {
            userToMigrate = user;
          }

          selectedPersistence = persistence;
          break;
        }
      } catch (_a) {}
    } // If we find the user in a persistence that does support migration, use
    // that migration path (of only persistences that support migration)


    const migrationHierarchy = availablePersistences.filter(p => p._shouldAllowMigration); // If the persistence does _not_ allow migration, just finish off here

    if (!selectedPersistence._shouldAllowMigration || !migrationHierarchy.length) {
      return new PersistenceUserManager(selectedPersistence, auth, userKey);
    }

    selectedPersistence = migrationHierarchy[0];

    if (userToMigrate) {
      // This normally shouldn't throw since chosenPersistence.isAvailable() is true, but if it does
      // we'll just let it bubble to surface the error.
      await selectedPersistence._set(key, userToMigrate.toJSON());
    } // Attempt to clear the key in other persistences but ignore errors. This helps prevent issues
    // such as users getting stuck with a previous account after signing out and refreshing the tab.


    await Promise.all(persistenceHierarchy.map(async persistence => {
      if (persistence !== selectedPersistence) {
        try {
          await persistence._remove(key);
        } catch (_a) {}
      }
    }));
    return new PersistenceUserManager(selectedPersistence, auth, userKey);
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Determine the browser for the purposes of reporting usage to the API
 */


function _getBrowserName(userAgent) {
  const ua = userAgent.toLowerCase();

  if (ua.includes('opera/') || ua.includes('opr/') || ua.includes('opios/')) {
    return "Opera"
    /* OPERA */
    ;
  } else if (_isIEMobile(ua)) {
    // Windows phone IEMobile browser.
    return "IEMobile"
    /* IEMOBILE */
    ;
  } else if (ua.includes('msie') || ua.includes('trident/')) {
    return "IE"
    /* IE */
    ;
  } else if (ua.includes('edge/')) {
    return "Edge"
    /* EDGE */
    ;
  } else if (_isFirefox(ua)) {
    return "Firefox"
    /* FIREFOX */
    ;
  } else if (ua.includes('silk/')) {
    return "Silk"
    /* SILK */
    ;
  } else if (_isBlackBerry(ua)) {
    // Blackberry browser.
    return "Blackberry"
    /* BLACKBERRY */
    ;
  } else if (_isWebOS(ua)) {
    // WebOS default browser.
    return "Webos"
    /* WEBOS */
    ;
  } else if (_isSafari(ua)) {
    return "Safari"
    /* SAFARI */
    ;
  } else if ((ua.includes('chrome/') || _isChromeIOS(ua)) && !ua.includes('edge/')) {
    return "Chrome"
    /* CHROME */
    ;
  } else if (_isAndroid(ua)) {
    // Android stock browser.
    return "Android"
    /* ANDROID */
    ;
  } else {
    // Most modern browsers have name/version at end of user agent string.
    const re = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/;
    const matches = userAgent.match(re);

    if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) {
      return matches[1];
    }
  }

  return "Other"
  /* OTHER */
  ;
}

function _isFirefox(ua = (0, _util.getUA)()) {
  return /firefox\//i.test(ua);
}

function _isSafari(userAgent = (0, _util.getUA)()) {
  const ua = userAgent.toLowerCase();
  return ua.includes('safari/') && !ua.includes('chrome/') && !ua.includes('crios/') && !ua.includes('android');
}

function _isChromeIOS(ua = (0, _util.getUA)()) {
  return /crios\//i.test(ua);
}

function _isIEMobile(ua = (0, _util.getUA)()) {
  return /iemobile/i.test(ua);
}

function _isAndroid(ua = (0, _util.getUA)()) {
  return /android/i.test(ua);
}

function _isBlackBerry(ua = (0, _util.getUA)()) {
  return /blackberry/i.test(ua);
}

function _isWebOS(ua = (0, _util.getUA)()) {
  return /webos/i.test(ua);
}

function _isIOS(ua = (0, _util.getUA)()) {
  return /iphone|ipad|ipod/i.test(ua);
}

function _isIOS7Or8(ua = (0, _util.getUA)()) {
  return /(iPad|iPhone|iPod).*OS 7_\d/i.test(ua) || /(iPad|iPhone|iPod).*OS 8_\d/i.test(ua);
}

function _isIOSStandalone(ua = (0, _util.getUA)()) {
  var _a;

  return _isIOS(ua) && !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone);
}

function _isIE10() {
  return (0, _util.isIE)() && document.documentMode === 10;
}

function _isMobileBrowser(ua = (0, _util.getUA)()) {
  // TODO: implement getBrowserName equivalent for OS.
  return _isIOS(ua) || _isAndroid(ua) || _isWebOS(ua) || _isBlackBerry(ua) || /windows phone/i.test(ua) || _isIEMobile(ua);
}

function _isIframe() {
  try {
    // Check that the current window is not the top window.
    // If so, return true.
    return !!(window && window !== window.top);
  } catch (e) {
    return false;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Determine the SDK version string
 */


function _getClientVersion(clientPlatform, frameworks = []) {
  let reportedPlatform;

  switch (clientPlatform) {
    case "Browser"
    /* BROWSER */
    :
      // In a browser environment, report the browser name.
      reportedPlatform = _getBrowserName((0, _util.getUA)());
      break;

    case "Worker"
    /* WORKER */
    :
      // Technically a worker runs from a browser but we need to differentiate a
      // worker from a browser.
      // For example: Chrome-Worker/JsCore/4.9.1/FirebaseCore-web.
      reportedPlatform = `${_getBrowserName((0, _util.getUA)())}-${clientPlatform}`;
      break;

    default:
      reportedPlatform = clientPlatform;
  }

  const reportedFrameworks = frameworks.length ? frameworks.join(',') : 'FirebaseCore-web';
  /* default value if no other framework is used */

  return `${reportedPlatform}/${"JsCore"
  /* CORE */
  }/${_app.SDK_VERSION}/${reportedFrameworks}`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class AuthImpl {
  constructor(app, config) {
    this.app = app;
    this.config = config;
    this.currentUser = null;
    this.emulatorConfig = null;
    this.operations = Promise.resolve();
    this.authStateSubscription = new Subscription(this);
    this.idTokenSubscription = new Subscription(this);
    this.redirectUser = null;
    this.isProactiveRefreshEnabled = false; // Any network calls will set this to true and prevent subsequent emulator
    // initialization

    this._canInitEmulator = true;
    this._isInitialized = false;
    this._deleted = false;
    this._initializationPromise = null;
    this._popupRedirectResolver = null;
    this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY; // Tracks the last notified UID for state change listeners to prevent
    // repeated calls to the callbacks. Undefined means it's never been
    // called, whereas null means it's been called with a signed out user

    this.lastNotifiedUid = undefined;
    this.languageCode = null;
    this.tenantId = null;
    this.settings = {
      appVerificationDisabledForTesting: false
    };
    this.frameworks = [];
    this.name = app.name;
    this.clientVersion = config.sdkClientVersion;
  }

  _initializeWithPersistence(persistenceHierarchy, popupRedirectResolver) {
    if (popupRedirectResolver) {
      this._popupRedirectResolver = _getInstance(popupRedirectResolver);
    } // Have to check for app deletion throughout initialization (after each
    // promise resolution)


    this._initializationPromise = this.queue(async () => {
      var _a, _b;

      if (this._deleted) {
        return;
      }

      this.persistenceManager = await PersistenceUserManager.create(this, persistenceHierarchy);

      if (this._deleted) {
        return;
      } // Initialize the resolver early if necessary (only applicable to web:
      // this will cause the iframe to load immediately in certain cases)


      if ((_a = this._popupRedirectResolver) === null || _a === void 0 ? void 0 : _a._shouldInitProactively) {
        // If this fails, don't halt auth loading
        try {
          await this._popupRedirectResolver._initialize(this);
        } catch (e) {
          /* Ignore the error */
        }
      }

      await this.initializeCurrentUser(popupRedirectResolver);
      this.lastNotifiedUid = ((_b = this.currentUser) === null || _b === void 0 ? void 0 : _b.uid) || null;

      if (this._deleted) {
        return;
      }

      this._isInitialized = true;
    });
    return this._initializationPromise;
  }
  /**
   * If the persistence is changed in another window, the user manager will let us know
   */


  async _onStorageEvent() {
    if (this._deleted) {
      return;
    }

    const user = await this.assertedPersistence.getCurrentUser();

    if (!this.currentUser && !user) {
      // No change, do nothing (was signed out and remained signed out).
      return;
    } // If the same user is to be synchronized.


    if (this.currentUser && user && this.currentUser.uid === user.uid) {
      // Data update, simply copy data changes.
      this._currentUser._assign(user); // If tokens changed from previous user tokens, this will trigger
      // notifyAuthListeners_.


      await this.currentUser.getIdToken();
      return;
    } // Update current Auth state. Either a new login or logout.


    await this._updateCurrentUser(user);
  }

  async initializeCurrentUser(popupRedirectResolver) {
    var _a; // First check to see if we have a pending redirect event.


    let storedUser = await this.assertedPersistence.getCurrentUser();

    if (popupRedirectResolver && this.config.authDomain) {
      await this.getOrInitRedirectPersistenceManager();
      const redirectUserEventId = (_a = this.redirectUser) === null || _a === void 0 ? void 0 : _a._redirectEventId;
      const storedUserEventId = storedUser === null || storedUser === void 0 ? void 0 : storedUser._redirectEventId;
      const result = await this.tryRedirectSignIn(popupRedirectResolver); // If the stored user (i.e. the old "currentUser") has a redirectId that
      // matches the redirect user, then we want to initially sign in with the
      // new user object from result.
      // TODO(samgho): More thoroughly test all of this

      if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) && (result === null || result === void 0 ? void 0 : result.user)) {
        storedUser = result.user;
      }
    } // If no user in persistence, there is no current user. Set to null.


    if (!storedUser) {
      return this.directlySetCurrentUser(null);
    }

    if (!storedUser._redirectEventId) {
      // This isn't a redirect user, we can reload and bail
      // This will also catch the redirected user, if available, as that method
      // strips the _redirectEventId
      return this.reloadAndSetCurrentUserOrClear(storedUser);
    }

    _assert(this._popupRedirectResolver, this, "argument-error"
    /* ARGUMENT_ERROR */
    );

    await this.getOrInitRedirectPersistenceManager(); // If the redirect user's event ID matches the current user's event ID,
    // DO NOT reload the current user, otherwise they'll be cleared from storage.
    // This is important for the reauthenticateWithRedirect() flow.

    if (this.redirectUser && this.redirectUser._redirectEventId === storedUser._redirectEventId) {
      return this.directlySetCurrentUser(storedUser);
    }

    return this.reloadAndSetCurrentUserOrClear(storedUser);
  }

  async tryRedirectSignIn(redirectResolver) {
    // The redirect user needs to be checked (and signed in if available)
    // during auth initialization. All of the normal sign in and link/reauth
    // flows call back into auth and push things onto the promise queue. We
    // need to await the result of the redirect sign in *inside the promise
    // queue*. This presents a problem: we run into deadlock. See:
    //    ┌> [Initialization] ─────┐
    //    ┌> [<other queue tasks>] │
    //    └─ [getRedirectResult] <─┘
    //    where [] are tasks on the queue and arrows denote awaits
    // Initialization will never complete because it's waiting on something
    // that's waiting for initialization to complete!
    //
    // Instead, this method calls getRedirectResult() (stored in
    // _completeRedirectFn) with an optional parameter that instructs all of
    // the underlying auth operations to skip anything that mutates auth state.
    let result = null;

    try {
      // We know this._popupRedirectResolver is set since redirectResolver
      // is passed in. The _completeRedirectFn expects the unwrapped extern.
      result = await this._popupRedirectResolver._completeRedirectFn(this, redirectResolver, true);
    } catch (e) {
      // Swallow any errors here; the code can retrieve them in
      // getRedirectResult().
      await this._setRedirectUser(null);
    }

    return result;
  }

  async reloadAndSetCurrentUserOrClear(user) {
    try {
      await _reloadWithoutSaving(user);
    } catch (e) {
      if (e.code !== `auth/${"network-request-failed"
      /* NETWORK_REQUEST_FAILED */
      }`) {
        // Something's wrong with the user's token. Log them out and remove
        // them from storage
        return this.directlySetCurrentUser(null);
      }
    }

    return this.directlySetCurrentUser(user);
  }

  useDeviceLanguage() {
    this.languageCode = _getUserLanguage();
  }

  async _delete() {
    this._deleted = true;
  }

  async updateCurrentUser(userExtern) {
    // The public updateCurrentUser method needs to make a copy of the user,
    // and also check that the project matches
    const user = userExtern ? (0, _util.getModularInstance)(userExtern) : null;

    if (user) {
      _assert(user.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token"
      /* INVALID_AUTH */
      );
    }

    return this._updateCurrentUser(user && user._clone(this));
  }

  async _updateCurrentUser(user) {
    if (this._deleted) {
      return;
    }

    if (user) {
      _assert(this.tenantId === user.tenantId, this, "tenant-id-mismatch"
      /* TENANT_ID_MISMATCH */
      );
    }

    return this.queue(async () => {
      await this.directlySetCurrentUser(user);
      this.notifyAuthListeners();
    });
  }

  async signOut() {
    // Clear the redirect user when signOut is called
    if (this.redirectPersistenceManager || this._popupRedirectResolver) {
      await this._setRedirectUser(null);
    }

    return this._updateCurrentUser(null);
  }

  setPersistence(persistence) {
    return this.queue(async () => {
      await this.assertedPersistence.setPersistence(_getInstance(persistence));
    });
  }

  _getPersistence() {
    return this.assertedPersistence.persistence.type;
  }

  _updateErrorMap(errorMap) {
    this._errorFactory = new _util.ErrorFactory('auth', 'Firebase', errorMap());
  }

  onAuthStateChanged(nextOrObserver, error, completed) {
    return this.registerStateListener(this.authStateSubscription, nextOrObserver, error, completed);
  }

  onIdTokenChanged(nextOrObserver, error, completed) {
    return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error, completed);
  }

  toJSON() {
    var _a;

    return {
      apiKey: this.config.apiKey,
      authDomain: this.config.authDomain,
      appName: this.name,
      currentUser: (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.toJSON()
    };
  }

  async _setRedirectUser(user, popupRedirectResolver) {
    const redirectManager = await this.getOrInitRedirectPersistenceManager(popupRedirectResolver);
    return user === null ? redirectManager.removeCurrentUser() : redirectManager.setCurrentUser(user);
  }

  async getOrInitRedirectPersistenceManager(popupRedirectResolver) {
    if (!this.redirectPersistenceManager) {
      const resolver = popupRedirectResolver && _getInstance(popupRedirectResolver) || this._popupRedirectResolver;

      _assert(resolver, this, "argument-error"
      /* ARGUMENT_ERROR */
      );

      this.redirectPersistenceManager = await PersistenceUserManager.create(this, [_getInstance(resolver._redirectPersistence)], "redirectUser"
      /* REDIRECT_USER */
      );
      this.redirectUser = await this.redirectPersistenceManager.getCurrentUser();
    }

    return this.redirectPersistenceManager;
  }

  async _redirectUserForId(id) {
    var _a, _b; // Make sure we've cleared any pending persistence actions if we're not in
    // the initializer


    if (this._isInitialized) {
      await this.queue(async () => {});
    }

    if (((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a._redirectEventId) === id) {
      return this._currentUser;
    }

    if (((_b = this.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id) {
      return this.redirectUser;
    }

    return null;
  }

  async _persistUserIfCurrent(user) {
    if (user === this.currentUser) {
      return this.queue(async () => this.directlySetCurrentUser(user));
    }
  }
  /** Notifies listeners only if the user is current */


  _notifyListenersIfCurrent(user) {
    if (user === this.currentUser) {
      this.notifyAuthListeners();
    }
  }

  _key() {
    return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
  }

  _startProactiveRefresh() {
    this.isProactiveRefreshEnabled = true;

    if (this.currentUser) {
      this._currentUser._startProactiveRefresh();
    }
  }

  _stopProactiveRefresh() {
    this.isProactiveRefreshEnabled = false;

    if (this.currentUser) {
      this._currentUser._stopProactiveRefresh();
    }
  }
  /** Returns the current user cast as the internal type */


  get _currentUser() {
    return this.currentUser;
  }

  notifyAuthListeners() {
    var _a, _b;

    if (!this._isInitialized) {
      return;
    }

    this.idTokenSubscription.next(this.currentUser);
    const currentUid = (_b = (_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : null;

    if (this.lastNotifiedUid !== currentUid) {
      this.lastNotifiedUid = currentUid;
      this.authStateSubscription.next(this.currentUser);
    }
  }

  registerStateListener(subscription, nextOrObserver, error, completed) {
    if (this._deleted) {
      return () => {};
    }

    const cb = typeof nextOrObserver === 'function' ? nextOrObserver : nextOrObserver.next.bind(nextOrObserver);
    const promise = this._isInitialized ? Promise.resolve() : this._initializationPromise;

    _assert(promise, this, "internal-error"
    /* INTERNAL_ERROR */
    ); // The callback needs to be called asynchronously per the spec.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises


    promise.then(() => cb(this.currentUser));

    if (typeof nextOrObserver === 'function') {
      return subscription.addObserver(nextOrObserver, error, completed);
    } else {
      return subscription.addObserver(nextOrObserver);
    }
  }
  /**
   * Unprotected (from race conditions) method to set the current user. This
   * should only be called from within a queued callback. This is necessary
   * because the queue shouldn't rely on another queued callback.
   */


  async directlySetCurrentUser(user) {
    if (this.currentUser && this.currentUser !== user) {
      this._currentUser._stopProactiveRefresh();

      if (user && this.isProactiveRefreshEnabled) {
        user._startProactiveRefresh();
      }
    }

    this.currentUser = user;

    if (user) {
      await this.assertedPersistence.setCurrentUser(user);
    } else {
      await this.assertedPersistence.removeCurrentUser();
    }
  }

  queue(action) {
    // In case something errors, the callback still should be called in order
    // to keep the promise chain alive
    this.operations = this.operations.then(action, action);
    return this.operations;
  }

  get assertedPersistence() {
    _assert(this.persistenceManager, this, "internal-error"
    /* INTERNAL_ERROR */
    );

    return this.persistenceManager;
  }

  _logFramework(framework) {
    if (!framework || this.frameworks.includes(framework)) {
      return;
    }

    this.frameworks.push(framework); // Sort alphabetically so that "FirebaseCore-web,FirebaseUI-web" and
    // "FirebaseUI-web,FirebaseCore-web" aren't viewed as different.

    this.frameworks.sort();
    this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks());
  }

  _getFrameworks() {
    return this.frameworks;
  }

  async _getAdditionalHeaders() {
    // Additional headers on every request
    const headers = {
      ["X-Client-Version"
      /* X_CLIENT_VERSION */
      ]: this.clientVersion
    };

    if (this.app.options.appId) {
      headers["X-Firebase-gmpid"
      /* X_FIREBASE_GMPID */
      ] = this.app.options.appId;
    }

    return headers;
  }

}
/**
 * Method to be used to cast down to our private implmentation of Auth.
 * It will also handle unwrapping from the compat type if necessary
 *
 * @param auth Auth object passed in from developer
 */


exports.aE = AuthImpl;

function _castAuth(auth) {
  return (0, _util.getModularInstance)(auth);
}
/** Helper class to wrap subscriber logic */


class Subscription {
  constructor(auth) {
    this.auth = auth;
    this.observer = null;
    this.addObserver = (0, _util.createSubscribe)(observer => this.observer = observer);
  }

  get next() {
    _assert(this.observer, this.auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    return this.observer.next.bind(this.observer);
  }

}
/**
 * Changes the {@link Auth} instance to communicate with the Firebase Auth Emulator, instead of production
 * Firebase Auth services.
 *
 * @remarks
 * This must be called synchronously immediately following the first call to
 * {@link initializeAuth}.  Do not use with production credentials as emulator
 * traffic is not encrypted.
 *
 *
 * @example
 * ```javascript
 * connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param url - The URL at which the emulator is running (eg, 'http://localhost:9099').
 * @param options - Optional. `options.disableWarnings` defaults to `false`. Set it to
 * `true` to disable the warning banner attached to the DOM.
 *
 * @public
 */


function connectAuthEmulator(auth, url, options) {
  const authInternal = _castAuth(auth);

  _assert(authInternal._canInitEmulator, authInternal, "emulator-config-failed"
  /* EMULATOR_CONFIG_FAILED */
  );

  _assert(/^https?:\/\//.test(url), authInternal, "invalid-emulator-scheme"
  /* INVALID_EMULATOR_SCHEME */
  );

  const disableWarnings = !!(options === null || options === void 0 ? void 0 : options.disableWarnings);
  const protocol = extractProtocol(url);
  const {
    host,
    port
  } = extractHostAndPort(url);
  const portStr = port === null ? '' : `:${port}`; // Always replace path with "/" (even if input url had no path at all, or had a different one).

  authInternal.config.emulator = {
    url: `${protocol}//${host}${portStr}/`
  };
  authInternal.settings.appVerificationDisabledForTesting = true;
  authInternal.emulatorConfig = Object.freeze({
    host,
    port,
    protocol: protocol.replace(':', ''),
    options: Object.freeze({
      disableWarnings
    })
  });

  if (!disableWarnings) {
    emitEmulatorWarning();
  }
}

function extractProtocol(url) {
  const protocolEnd = url.indexOf(':');
  return protocolEnd < 0 ? '' : url.substr(0, protocolEnd + 1);
}

function extractHostAndPort(url) {
  const protocol = extractProtocol(url);
  const authority = /(\/\/)?([^?#/]+)/.exec(url.substr(protocol.length)); // Between // and /, ? or #.

  if (!authority) {
    return {
      host: '',
      port: null
    };
  }

  const hostAndPort = authority[2].split('@').pop() || ''; // Strip out "username:password@".

  const bracketedIPv6 = /^(\[[^\]]+\])(:|$)/.exec(hostAndPort);

  if (bracketedIPv6) {
    const host = bracketedIPv6[1];
    return {
      host,
      port: parsePort(hostAndPort.substr(host.length + 1))
    };
  } else {
    const [host, port] = hostAndPort.split(':');
    return {
      host,
      port: parsePort(port)
    };
  }
}

function parsePort(portStr) {
  if (!portStr) {
    return null;
  }

  const port = Number(portStr);

  if (isNaN(port)) {
    return null;
  }

  return port;
}

function emitEmulatorWarning() {
  function attachBanner() {
    const el = document.createElement('p');
    const sty = el.style;
    el.innerText = 'Running in emulator mode. Do not use with production credentials.';
    sty.position = 'fixed';
    sty.width = '100%';
    sty.backgroundColor = '#ffffff';
    sty.border = '.1em solid #000000';
    sty.color = '#b50000';
    sty.bottom = '0px';
    sty.left = '0px';
    sty.margin = '0px';
    sty.zIndex = '10000';
    sty.textAlign = 'center';
    el.classList.add('firebase-emulator-warning');
    document.body.appendChild(el);
  }

  if (typeof console !== 'undefined' && typeof console.info === 'function') {
    console.info('WARNING: You are using the Auth Emulator,' + ' which is intended for local testing only.  Do not use with' + ' production credentials.');
  }

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', attachBanner);
    } else {
      attachBanner();
    }
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Interface that represents the credentials returned by an {@link AuthProvider}.
 *
 * @remarks
 * Implementations specify the details about each auth provider's credential requirements.
 *
 * @public
 */


class AuthCredential {
  /** @internal */
  constructor(
  /**
   * The authentication provider ID for the credential.
   *
   * @remarks
   * For example, 'facebook.com', or 'google.com'.
   */
  providerId,
  /**
   * The authentication sign in method for the credential.
   *
   * @remarks
   * For example, {@link SignInMethod}.EMAIL_PASSWORD, or
   * {@link SignInMethod}.EMAIL_LINK. This corresponds to the sign-in method
   * identifier as returned in {@link fetchSignInMethodsForEmail}.
   */
  signInMethod) {
    this.providerId = providerId;
    this.signInMethod = signInMethod;
  }
  /**
   * Returns a JSON-serializable representation of this object.
   *
   * @returns a JSON-serializable representation of this object.
   */


  toJSON() {
    return debugFail('not implemented');
  }
  /** @internal */


  _getIdTokenResponse(_auth) {
    return debugFail('not implemented');
  }
  /** @internal */


  _linkToIdToken(_auth, _idToken) {
    return debugFail('not implemented');
  }
  /** @internal */


  _getReauthenticationResolver(_auth) {
    return debugFail('not implemented');
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.G = AuthCredential;

async function resetPassword(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:resetPassword"
  /* RESET_PASSWORD */
  , _addTidIfNecessary(auth, request));
}

async function updateEmailPassword(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:update"
  /* SET_ACCOUNT_INFO */
  , request);
}

async function applyActionCode$1(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:update"
  /* SET_ACCOUNT_INFO */
  , _addTidIfNecessary(auth, request));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function signInWithPassword(auth, request) {
  return _performSignInRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:signInWithPassword"
  /* SIGN_IN_WITH_PASSWORD */
  , _addTidIfNecessary(auth, request));
}

async function sendOobCode(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:sendOobCode"
  /* SEND_OOB_CODE */
  , _addTidIfNecessary(auth, request));
}

async function sendEmailVerification$1(auth, request) {
  return sendOobCode(auth, request);
}

async function sendPasswordResetEmail$1(auth, request) {
  return sendOobCode(auth, request);
}

async function sendSignInLinkToEmail$1(auth, request) {
  return sendOobCode(auth, request);
}

async function verifyAndChangeEmail(auth, request) {
  return sendOobCode(auth, request);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function signInWithEmailLink$1(auth, request) {
  return _performSignInRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:signInWithEmailLink"
  /* SIGN_IN_WITH_EMAIL_LINK */
  , _addTidIfNecessary(auth, request));
}

async function signInWithEmailLinkForLinking(auth, request) {
  return _performSignInRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:signInWithEmailLink"
  /* SIGN_IN_WITH_EMAIL_LINK */
  , _addTidIfNecessary(auth, request));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Interface that represents the credentials returned by {@link EmailAuthProvider} for
 * {@link ProviderId}.PASSWORD
 *
 * @remarks
 * Covers both {@link SignInMethod}.EMAIL_PASSWORD and
 * {@link SignInMethod}.EMAIL_LINK.
 *
 * @public
 */


class EmailAuthCredential extends AuthCredential {
  /** @internal */
  constructor(
  /** @internal */
  _email,
  /** @internal */
  _password, signInMethod,
  /** @internal */
  _tenantId = null) {
    super("password"
    /* PASSWORD */
    , signInMethod);
    this._email = _email;
    this._password = _password;
    this._tenantId = _tenantId;
  }
  /** @internal */


  static _fromEmailAndPassword(email, password) {
    return new EmailAuthCredential(email, password, "password"
    /* EMAIL_PASSWORD */
    );
  }
  /** @internal */


  static _fromEmailAndCode(email, oobCode, tenantId = null) {
    return new EmailAuthCredential(email, oobCode, "emailLink"
    /* EMAIL_LINK */
    , tenantId);
  }
  /** {@inheritdoc AuthCredential.toJSON} */


  toJSON() {
    return {
      email: this._email,
      password: this._password,
      signInMethod: this.signInMethod,
      tenantId: this._tenantId
    };
  }
  /**
   * Static method to deserialize a JSON representation of an object into an {@link  AuthCredential}.
   *
   * @param json - Either `object` or the stringified representation of the object. When string is
   * provided, `JSON.parse` would be called first.
   *
   * @returns If the JSON input does not represent an {@link AuthCredential}, null is returned.
   */


  static fromJSON(json) {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;

    if ((obj === null || obj === void 0 ? void 0 : obj.email) && (obj === null || obj === void 0 ? void 0 : obj.password)) {
      if (obj.signInMethod === "password"
      /* EMAIL_PASSWORD */
      ) {
        return this._fromEmailAndPassword(obj.email, obj.password);
      } else if (obj.signInMethod === "emailLink"
      /* EMAIL_LINK */
      ) {
        return this._fromEmailAndCode(obj.email, obj.password, obj.tenantId);
      }
    }

    return null;
  }
  /** @internal */


  async _getIdTokenResponse(auth) {
    switch (this.signInMethod) {
      case "password"
      /* EMAIL_PASSWORD */
      :
        return signInWithPassword(auth, {
          returnSecureToken: true,
          email: this._email,
          password: this._password
        });

      case "emailLink"
      /* EMAIL_LINK */
      :
        return signInWithEmailLink$1(auth, {
          email: this._email,
          oobCode: this._password
        });

      default:
        _fail(auth, "internal-error"
        /* INTERNAL_ERROR */
        );

    }
  }
  /** @internal */


  async _linkToIdToken(auth, idToken) {
    switch (this.signInMethod) {
      case "password"
      /* EMAIL_PASSWORD */
      :
        return updateEmailPassword(auth, {
          idToken,
          returnSecureToken: true,
          email: this._email,
          password: this._password
        });

      case "emailLink"
      /* EMAIL_LINK */
      :
        return signInWithEmailLinkForLinking(auth, {
          idToken,
          email: this._email,
          oobCode: this._password
        });

      default:
        _fail(auth, "internal-error"
        /* INTERNAL_ERROR */
        );

    }
  }
  /** @internal */


  _getReauthenticationResolver(auth) {
    return this._getIdTokenResponse(auth);
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.H = EmailAuthCredential;

async function signInWithIdp(auth, request) {
  return _performSignInRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:signInWithIdp"
  /* SIGN_IN_WITH_IDP */
  , _addTidIfNecessary(auth, request));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const IDP_REQUEST_URI$1 = 'http://localhost';
/**
 * Represents the OAuth credentials returned by an {@link OAuthProvider}.
 *
 * @remarks
 * Implementations specify the details about each auth provider's credential requirements.
 *
 * @public
 */

class OAuthCredential extends AuthCredential {
  constructor() {
    super(...arguments);
    this.pendingToken = null;
  }
  /** @internal */


  static _fromParams(params) {
    const cred = new OAuthCredential(params.providerId, params.signInMethod);

    if (params.idToken || params.accessToken) {
      // OAuth 2 and either ID token or access token.
      if (params.idToken) {
        cred.idToken = params.idToken;
      }

      if (params.accessToken) {
        cred.accessToken = params.accessToken;
      } // Add nonce if available and no pendingToken is present.


      if (params.nonce && !params.pendingToken) {
        cred.nonce = params.nonce;
      }

      if (params.pendingToken) {
        cred.pendingToken = params.pendingToken;
      }
    } else if (params.oauthToken && params.oauthTokenSecret) {
      // OAuth 1 and OAuth token with token secret
      cred.accessToken = params.oauthToken;
      cred.secret = params.oauthTokenSecret;
    } else {
      _fail("argument-error"
      /* ARGUMENT_ERROR */
      );
    }

    return cred;
  }
  /** {@inheritdoc AuthCredential.toJSON}  */


  toJSON() {
    return {
      idToken: this.idToken,
      accessToken: this.accessToken,
      secret: this.secret,
      nonce: this.nonce,
      pendingToken: this.pendingToken,
      providerId: this.providerId,
      signInMethod: this.signInMethod
    };
  }
  /**
   * Static method to deserialize a JSON representation of an object into an
   * {@link  AuthCredential}.
   *
   * @param json - Input can be either Object or the stringified representation of the object.
   * When string is provided, JSON.parse would be called first.
   *
   * @returns If the JSON input does not represent an {@link  AuthCredential}, null is returned.
   */


  static fromJSON(json) {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;
    const {
      providerId,
      signInMethod
    } = obj,
          rest = (0, _tslib.__rest)(obj, ["providerId", "signInMethod"]);

    if (!providerId || !signInMethod) {
      return null;
    }

    const cred = new OAuthCredential(providerId, signInMethod);
    cred.idToken = rest.idToken || undefined;
    cred.accessToken = rest.accessToken || undefined;
    cred.secret = rest.secret;
    cred.nonce = rest.nonce;
    cred.pendingToken = rest.pendingToken || null;
    return cred;
  }
  /** @internal */


  _getIdTokenResponse(auth) {
    const request = this.buildRequest();
    return signInWithIdp(auth, request);
  }
  /** @internal */


  _linkToIdToken(auth, idToken) {
    const request = this.buildRequest();
    request.idToken = idToken;
    return signInWithIdp(auth, request);
  }
  /** @internal */


  _getReauthenticationResolver(auth) {
    const request = this.buildRequest();
    request.autoCreate = false;
    return signInWithIdp(auth, request);
  }

  buildRequest() {
    const request = {
      requestUri: IDP_REQUEST_URI$1,
      returnSecureToken: true
    };

    if (this.pendingToken) {
      request.pendingToken = this.pendingToken;
    } else {
      const postBody = {};

      if (this.idToken) {
        postBody['id_token'] = this.idToken;
      }

      if (this.accessToken) {
        postBody['access_token'] = this.accessToken;
      }

      if (this.secret) {
        postBody['oauth_token_secret'] = this.secret;
      }

      postBody['providerId'] = this.providerId;

      if (this.nonce && !this.pendingToken) {
        postBody['nonce'] = this.nonce;
      }

      request.postBody = (0, _util.querystring)(postBody);
    }

    return request;
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.I = OAuthCredential;

async function sendPhoneVerificationCode(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:sendVerificationCode"
  /* SEND_VERIFICATION_CODE */
  , _addTidIfNecessary(auth, request));
}

async function signInWithPhoneNumber$1(auth, request) {
  return _performSignInRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:signInWithPhoneNumber"
  /* SIGN_IN_WITH_PHONE_NUMBER */
  , _addTidIfNecessary(auth, request));
}

async function linkWithPhoneNumber$1(auth, request) {
  const response = await _performSignInRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:signInWithPhoneNumber"
  /* SIGN_IN_WITH_PHONE_NUMBER */
  , _addTidIfNecessary(auth, request));

  if (response.temporaryProof) {
    throw _makeTaggedError(auth, "account-exists-with-different-credential"
    /* NEED_CONFIRMATION */
    , response);
  }

  return response;
}

const VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_ = {
  ["USER_NOT_FOUND"
  /* USER_NOT_FOUND */
  ]: "user-not-found"
  /* USER_DELETED */

};

async function verifyPhoneNumberForExisting(auth, request) {
  const apiRequest = Object.assign(Object.assign({}, request), {
    operation: 'REAUTH'
  });
  return _performSignInRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:signInWithPhoneNumber"
  /* SIGN_IN_WITH_PHONE_NUMBER */
  , _addTidIfNecessary(auth, apiRequest), VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Represents the credentials returned by {@link PhoneAuthProvider}.
 *
 * @public
 */


class PhoneAuthCredential extends AuthCredential {
  constructor(params) {
    super("phone"
    /* PHONE */
    , "phone"
    /* PHONE */
    );
    this.params = params;
  }
  /** @internal */


  static _fromVerification(verificationId, verificationCode) {
    return new PhoneAuthCredential({
      verificationId,
      verificationCode
    });
  }
  /** @internal */


  static _fromTokenResponse(phoneNumber, temporaryProof) {
    return new PhoneAuthCredential({
      phoneNumber,
      temporaryProof
    });
  }
  /** @internal */


  _getIdTokenResponse(auth) {
    return signInWithPhoneNumber$1(auth, this._makeVerificationRequest());
  }
  /** @internal */


  _linkToIdToken(auth, idToken) {
    return linkWithPhoneNumber$1(auth, Object.assign({
      idToken
    }, this._makeVerificationRequest()));
  }
  /** @internal */


  _getReauthenticationResolver(auth) {
    return verifyPhoneNumberForExisting(auth, this._makeVerificationRequest());
  }
  /** @internal */


  _makeVerificationRequest() {
    const {
      temporaryProof,
      phoneNumber,
      verificationId,
      verificationCode
    } = this.params;

    if (temporaryProof && phoneNumber) {
      return {
        temporaryProof,
        phoneNumber
      };
    }

    return {
      sessionInfo: verificationId,
      code: verificationCode
    };
  }
  /** {@inheritdoc AuthCredential.toJSON} */


  toJSON() {
    const obj = {
      providerId: this.providerId
    };

    if (this.params.phoneNumber) {
      obj.phoneNumber = this.params.phoneNumber;
    }

    if (this.params.temporaryProof) {
      obj.temporaryProof = this.params.temporaryProof;
    }

    if (this.params.verificationCode) {
      obj.verificationCode = this.params.verificationCode;
    }

    if (this.params.verificationId) {
      obj.verificationId = this.params.verificationId;
    }

    return obj;
  }
  /** Generates a phone credential based on a plain object or a JSON string. */


  static fromJSON(json) {
    if (typeof json === 'string') {
      json = JSON.parse(json);
    }

    const {
      verificationId,
      verificationCode,
      phoneNumber,
      temporaryProof
    } = json;

    if (!verificationCode && !verificationId && !phoneNumber && !temporaryProof) {
      return null;
    }

    return new PhoneAuthCredential({
      verificationId,
      verificationCode,
      phoneNumber,
      temporaryProof
    });
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Maps the mode string in action code URL to Action Code Info operation.
 *
 * @param mode
 */


exports.J = PhoneAuthCredential;

function parseMode(mode) {
  switch (mode) {
    case 'recoverEmail':
      return "RECOVER_EMAIL"
      /* RECOVER_EMAIL */
      ;

    case 'resetPassword':
      return "PASSWORD_RESET"
      /* PASSWORD_RESET */
      ;

    case 'signIn':
      return "EMAIL_SIGNIN"
      /* EMAIL_SIGNIN */
      ;

    case 'verifyEmail':
      return "VERIFY_EMAIL"
      /* VERIFY_EMAIL */
      ;

    case 'verifyAndChangeEmail':
      return "VERIFY_AND_CHANGE_EMAIL"
      /* VERIFY_AND_CHANGE_EMAIL */
      ;

    case 'revertSecondFactorAddition':
      return "REVERT_SECOND_FACTOR_ADDITION"
      /* REVERT_SECOND_FACTOR_ADDITION */
      ;

    default:
      return null;
  }
}
/**
 * Helper to parse FDL links
 *
 * @param url
 */


function parseDeepLink(url) {
  const link = (0, _util.querystringDecode)((0, _util.extractQuerystring)(url))['link']; // Double link case (automatic redirect).

  const doubleDeepLink = link ? (0, _util.querystringDecode)((0, _util.extractQuerystring)(link))['deep_link_id'] : null; // iOS custom scheme links.

  const iOSDeepLink = (0, _util.querystringDecode)((0, _util.extractQuerystring)(url))['deep_link_id'];
  const iOSDoubleDeepLink = iOSDeepLink ? (0, _util.querystringDecode)((0, _util.extractQuerystring)(iOSDeepLink))['link'] : null;
  return iOSDoubleDeepLink || iOSDeepLink || doubleDeepLink || link || url;
}
/**
 * A utility class to parse email action URLs such as password reset, email verification,
 * email link sign in, etc.
 *
 * @public
 */


class ActionCodeURL {
  /**
   * @param actionLink - The link from which to extract the URL.
   * @returns The {@link ActionCodeURL} object, or null if the link is invalid.
   *
   * @internal
   */
  constructor(actionLink) {
    var _a, _b, _c, _d, _e, _f;

    const searchParams = (0, _util.querystringDecode)((0, _util.extractQuerystring)(actionLink));
    const apiKey = (_a = searchParams["apiKey"
    /* API_KEY */
    ]) !== null && _a !== void 0 ? _a : null;
    const code = (_b = searchParams["oobCode"
    /* CODE */
    ]) !== null && _b !== void 0 ? _b : null;
    const operation = parseMode((_c = searchParams["mode"
    /* MODE */
    ]) !== null && _c !== void 0 ? _c : null); // Validate API key, code and mode.

    _assert(apiKey && code && operation, "argument-error"
    /* ARGUMENT_ERROR */
    );

    this.apiKey = apiKey;
    this.operation = operation;
    this.code = code;
    this.continueUrl = (_d = searchParams["continueUrl"
    /* CONTINUE_URL */
    ]) !== null && _d !== void 0 ? _d : null;
    this.languageCode = (_e = searchParams["languageCode"
    /* LANGUAGE_CODE */
    ]) !== null && _e !== void 0 ? _e : null;
    this.tenantId = (_f = searchParams["tenantId"
    /* TENANT_ID */
    ]) !== null && _f !== void 0 ? _f : null;
  }
  /**
   * Parses the email action link string and returns an {@link ActionCodeURL} if the link is valid,
   * otherwise returns null.
   *
   * @param link  - The email action link string.
   * @returns The {@link ActionCodeURL} object, or null if the link is invalid.
   *
   * @public
   */


  static parseLink(link) {
    const actionLink = parseDeepLink(link);

    try {
      return new ActionCodeURL(actionLink);
    } catch (_a) {
      return null;
    }
  }

}
/**
 * Parses the email action link string and returns an {@link ActionCodeURL} if
 * the link is valid, otherwise returns null.
 *
 * @public
 */


exports.ac = ActionCodeURL;

function parseActionCodeURL(link) {
  return ActionCodeURL.parseLink(link);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provider for generating {@link EmailAuthCredential}.
 *
 * @public
 */


class EmailAuthProvider {
  constructor() {
    /**
     * Always set to {@link ProviderId}.PASSWORD, even for email link.
     */
    this.providerId = EmailAuthProvider.PROVIDER_ID;
  }
  /**
   * Initialize an {@link AuthCredential} using an email and password.
   *
   * @example
   * ```javascript
   * const authCredential = EmailAuthProvider.credential(email, password);
   * const userCredential = await signInWithCredential(auth, authCredential);
   * ```
   *
   * @example
   * ```javascript
   * const userCredential = await signInWithEmailAndPassword(auth, email, password);
   * ```
   *
   * @param email - Email address.
   * @param password - User account password.
   * @returns The auth provider credential.
   */


  static credential(email, password) {
    return EmailAuthCredential._fromEmailAndPassword(email, password);
  }
  /**
   * Initialize an {@link AuthCredential} using an email and an email link after a sign in with
   * email link operation.
   *
   * @example
   * ```javascript
   * const authCredential = EmailAuthProvider.credentialWithLink(auth, email, emailLink);
   * const userCredential = await signInWithCredential(auth, authCredential);
   * ```
   *
   * @example
   * ```javascript
   * await sendSignInLinkToEmail(auth, email);
   * // Obtain emailLink from user.
   * const userCredential = await signInWithEmailLink(auth, email, emailLink);
   * ```
   *
   * @param auth - The {@link Auth} instance used to verify the link.
   * @param email - Email address.
   * @param emailLink - Sign-in email link.
   * @returns - The auth provider credential.
   */


  static credentialWithLink(email, emailLink) {
    const actionCodeUrl = ActionCodeURL.parseLink(emailLink);

    _assert(actionCodeUrl, "argument-error"
    /* ARGUMENT_ERROR */
    );

    return EmailAuthCredential._fromEmailAndCode(email, actionCodeUrl.code, actionCodeUrl.tenantId);
  }

}
/**
 * Always set to {@link ProviderId}.PASSWORD, even for email link.
 */


exports.L = EmailAuthProvider;
EmailAuthProvider.PROVIDER_ID = "password"
/* PASSWORD */
;
/**
 * Always set to {@link SignInMethod}.EMAIL_PASSWORD.
 */

EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password"
/* EMAIL_PASSWORD */
;
/**
 * Always set to {@link SignInMethod}.EMAIL_LINK.
 */

EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink"
/* EMAIL_LINK */
;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The base class for all Federated providers (OAuth (including OIDC), SAML).
 *
 * This class is not meant to be instantiated directly.
 *
 * @public
 */

class FederatedAuthProvider {
  /**
   * Constructor for generic OAuth providers.
   *
   * @param providerId - Provider for which credentials should be generated.
   */
  constructor(providerId) {
    this.providerId = providerId;
    /** @internal */

    this.defaultLanguageCode = null;
    /** @internal */

    this.customParameters = {};
  }
  /**
   * Set the language gode.
   *
   * @param languageCode - language code
   */


  setDefaultLanguage(languageCode) {
    this.defaultLanguageCode = languageCode;
  }
  /**
   * Sets the OAuth custom parameters to pass in an OAuth request for popup and redirect sign-in
   * operations.
   *
   * @remarks
   * For a detailed list, check the reserved required OAuth 2.0 parameters such as `client_id`,
   * `redirect_uri`, `scope`, `response_type`, and `state` are not allowed and will be ignored.
   *
   * @param customOAuthParameters - The custom OAuth parameters to pass in the OAuth request.
   */


  setCustomParameters(customOAuthParameters) {
    this.customParameters = customOAuthParameters;
    return this;
  }
  /**
   * Retrieve the current list of {@link CustomParameters}.
   */


  getCustomParameters() {
    return this.customParameters;
  }

}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Common code to all OAuth providers. This is separate from the
 * {@link OAuthProvider} so that child providers (like
 * {@link GoogleAuthProvider}) don't inherit the `credential` instance method.
 * Instead, they rely on a static `credential` method.
 */


class BaseOAuthProvider extends FederatedAuthProvider {
  constructor() {
    super(...arguments);
    /** @internal */

    this.scopes = [];
  }
  /**
   * Add an OAuth scope to the credential.
   *
   * @param scope - Provider OAuth scope to add.
   */


  addScope(scope) {
    // If not already added, add scope to list.
    if (!this.scopes.includes(scope)) {
      this.scopes.push(scope);
    }

    return this;
  }
  /**
   * Retrieve the current list of OAuth scopes.
   */


  getScopes() {
    return [...this.scopes];
  }

}
/**
 * Provider for generating generic {@link OAuthCredential}.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new OAuthProvider('google.com');
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('profile');
 * provider.addScope('email');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a OAuth Access Token for the provider.
 *   const credential = provider.credentialFromResult(auth, result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new OAuthProvider('google.com');
 * provider.addScope('profile');
 * provider.addScope('email');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a OAuth Access Token for the provider.
 * const credential = provider.credentialFromResult(auth, result);
 * const token = credential.accessToken;
 * ```
 * @public
 */


class OAuthProvider extends BaseOAuthProvider {
  /**
   * Creates an {@link OAuthCredential} from a JSON string or a plain object.
   * @param json - A plain object or a JSON string
   */
  static credentialFromJSON(json) {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;

    _assert('providerId' in obj && 'signInMethod' in obj, "argument-error"
    /* ARGUMENT_ERROR */
    );

    return OAuthCredential._fromParams(obj);
  }
  /**
   * Creates a {@link OAuthCredential} from a generic OAuth provider's access token or ID token.
   *
   * @remarks
   * The raw nonce is required when an ID token with a nonce field is provided. The SHA-256 hash of
   * the raw nonce must match the nonce field in the ID token.
   *
   * @example
   * ```javascript
   * // `googleUser` from the onsuccess Google Sign In callback.
   * // Initialize a generate OAuth provider with a `google.com` providerId.
   * const provider = new OAuthProvider('google.com');
   * const credential = provider.credential({
   *   idToken: googleUser.getAuthResponse().id_token,
   * });
   * const result = await signInWithCredential(credential);
   * ```
   *
   * @param params - Either the options object containing the ID token, access token and raw nonce
   * or the ID token string.
   */


  credential(params) {
    return this._credential(Object.assign(Object.assign({}, params), {
      nonce: params.rawNonce
    }));
  }
  /** An internal credential method that accepts more permissive options */


  _credential(params) {
    _assert(params.idToken || params.accessToken, "argument-error"
    /* ARGUMENT_ERROR */
    ); // For OAuthCredential, sign in method is same as providerId.


    return OAuthCredential._fromParams(Object.assign(Object.assign({}, params), {
      providerId: this.providerId,
      signInMethod: this.providerId
    }));
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
   *
   * @param userCredential - The user credential.
   */


  static credentialFromResult(userCredential) {
    return OAuthProvider.oauthCredentialFromTaggedObject(userCredential);
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */


  static credentialFromError(error) {
    return OAuthProvider.oauthCredentialFromTaggedObject(error.customData || {});
  }

  static oauthCredentialFromTaggedObject({
    _tokenResponse: tokenResponse
  }) {
    if (!tokenResponse) {
      return null;
    }

    const {
      oauthIdToken,
      oauthAccessToken,
      oauthTokenSecret,
      pendingToken,
      nonce,
      providerId
    } = tokenResponse;

    if (!oauthAccessToken && !oauthTokenSecret && !oauthIdToken && !pendingToken) {
      return null;
    }

    if (!providerId) {
      return null;
    }

    try {
      return new OAuthProvider(providerId)._credential({
        idToken: oauthIdToken,
        accessToken: oauthAccessToken,
        nonce,
        pendingToken
      });
    } catch (e) {
      return null;
    }
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.FACEBOOK.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new FacebookAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('user_birthday');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Facebook Access Token.
 *   const credential = FacebookAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new FacebookAuthProvider();
 * provider.addScope('user_birthday');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Facebook Access Token.
 * const credential = FacebookAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * ```
 *
 * @public
 */


exports.T = OAuthProvider;

class FacebookAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("facebook.com"
    /* FACEBOOK */
    );
  }
  /**
   * Creates a credential for Facebook.
   *
   * @example
   * ```javascript
   * // `event` from the Facebook auth.authResponseChange callback.
   * const credential = FacebookAuthProvider.credential(event.authResponse.accessToken);
   * const result = await signInWithCredential(credential);
   * ```
   *
   * @param accessToken - Facebook access token.
   */


  static credential(accessToken) {
    return OAuthCredential._fromParams({
      providerId: FacebookAuthProvider.PROVIDER_ID,
      signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
      accessToken
    });
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
   *
   * @param userCredential - The user credential.
   */


  static credentialFromResult(userCredential) {
    return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */


  static credentialFromError(error) {
    return FacebookAuthProvider.credentialFromTaggedObject(error.customData || {});
  }

  static credentialFromTaggedObject({
    _tokenResponse: tokenResponse
  }) {
    if (!tokenResponse || !('oauthAccessToken' in tokenResponse)) {
      return null;
    }

    if (!tokenResponse.oauthAccessToken) {
      return null;
    }

    try {
      return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
    } catch (_a) {
      return null;
    }
  }

}
/** Always set to {@link SignInMethod}.FACEBOOK. */


exports.M = FacebookAuthProvider;
FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com"
/* FACEBOOK */
;
/** Always set to {@link ProviderId}.FACEBOOK. */

FacebookAuthProvider.PROVIDER_ID = "facebook.com"
/* FACEBOOK */
;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provider for generating an an {@link OAuthCredential} for {@link ProviderId}.GOOGLE.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new GoogleAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('profile');
 * provider.addScope('email');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Google Access Token.
 *   const credential = GoogleAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new GoogleAuthProvider();
 * provider.addScope('profile');
 * provider.addScope('email');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Google Access Token.
 * const credential = GoogleAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * ```
 *
 * @public
 */

class GoogleAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("google.com"
    /* GOOGLE */
    );
    this.addScope('profile');
  }
  /**
   * Creates a credential for Google. At least one of ID token and access token is required.
   *
   * @example
   * ```javascript
   * // \`googleUser\` from the onsuccess Google Sign In callback.
   * const credential = GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
   * const result = await signInWithCredential(credential);
   * ```
   *
   * @param idToken - Google ID token.
   * @param accessToken - Google access token.
   */


  static credential(idToken, accessToken) {
    return OAuthCredential._fromParams({
      providerId: GoogleAuthProvider.PROVIDER_ID,
      signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
      idToken,
      accessToken
    });
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
   *
   * @param userCredential - The user credential.
   */


  static credentialFromResult(userCredential) {
    return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */


  static credentialFromError(error) {
    return GoogleAuthProvider.credentialFromTaggedObject(error.customData || {});
  }

  static credentialFromTaggedObject({
    _tokenResponse: tokenResponse
  }) {
    if (!tokenResponse) {
      return null;
    }

    const {
      oauthIdToken,
      oauthAccessToken
    } = tokenResponse;

    if (!oauthIdToken && !oauthAccessToken) {
      // This could be an oauth 1 credential or a phone credential
      return null;
    }

    try {
      return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
    } catch (_a) {
      return null;
    }
  }

}
/** Always set to {@link SignInMethod}.GOOGLE. */


exports.N = GoogleAuthProvider;
GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com"
/* GOOGLE */
;
/** Always set to {@link ProviderId}.GOOGLE. */

GoogleAuthProvider.PROVIDER_ID = "google.com"
/* GOOGLE */
;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.GITHUB.
 *
 * @remarks
 * GitHub requires an OAuth 2.0 redirect, so you can either handle the redirect directly, or use
 * the {@link signInWithPopup} handler:
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new GithubAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * provider.addScope('repo');
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Github Access Token.
 *   const credential = GithubAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new GithubAuthProvider();
 * provider.addScope('repo');
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Github Access Token.
 * const credential = GithubAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * ```
 * @public
 */

class GithubAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("github.com"
    /* GITHUB */
    );
  }
  /**
   * Creates a credential for Github.
   *
   * @param accessToken - Github access token.
   */


  static credential(accessToken) {
    return OAuthCredential._fromParams({
      providerId: GithubAuthProvider.PROVIDER_ID,
      signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
      accessToken
    });
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
   *
   * @param userCredential - The user credential.
   */


  static credentialFromResult(userCredential) {
    return GithubAuthProvider.credentialFromTaggedObject(userCredential);
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */


  static credentialFromError(error) {
    return GithubAuthProvider.credentialFromTaggedObject(error.customData || {});
  }

  static credentialFromTaggedObject({
    _tokenResponse: tokenResponse
  }) {
    if (!tokenResponse || !('oauthAccessToken' in tokenResponse)) {
      return null;
    }

    if (!tokenResponse.oauthAccessToken) {
      return null;
    }

    try {
      return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
    } catch (_a) {
      return null;
    }
  }

}
/** Always set to {@link SignInMethod}.GITHUB. */


exports.Q = GithubAuthProvider;
GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com"
/* GITHUB */
;
/** Always set to {@link ProviderId}.GITHUB. */

GithubAuthProvider.PROVIDER_ID = "github.com"
/* GITHUB */
;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const IDP_REQUEST_URI = 'http://localhost';
/**
 * @public
 */

class SAMLAuthCredential extends AuthCredential {
  /** @internal */
  constructor(providerId, pendingToken) {
    super(providerId, providerId);
    this.pendingToken = pendingToken;
  }
  /** @internal */


  _getIdTokenResponse(auth) {
    const request = this.buildRequest();
    return signInWithIdp(auth, request);
  }
  /** @internal */


  _linkToIdToken(auth, idToken) {
    const request = this.buildRequest();
    request.idToken = idToken;
    return signInWithIdp(auth, request);
  }
  /** @internal */


  _getReauthenticationResolver(auth) {
    const request = this.buildRequest();
    request.autoCreate = false;
    return signInWithIdp(auth, request);
  }
  /** {@inheritdoc AuthCredential.toJSON}  */


  toJSON() {
    return {
      signInMethod: this.signInMethod,
      providerId: this.providerId,
      pendingToken: this.pendingToken
    };
  }
  /**
   * Static method to deserialize a JSON representation of an object into an
   * {@link  AuthCredential}.
   *
   * @param json - Input can be either Object or the stringified representation of the object.
   * When string is provided, JSON.parse would be called first.
   *
   * @returns If the JSON input does not represent an {@link  AuthCredential}, null is returned.
   */


  static fromJSON(json) {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;
    const {
      providerId,
      signInMethod,
      pendingToken
    } = obj;

    if (!providerId || !signInMethod || !pendingToken || providerId !== signInMethod) {
      return null;
    }

    return new SAMLAuthCredential(providerId, pendingToken);
  }
  /**
   * Helper static method to avoid exposing the constructor to end users.
   *
   * @internal
   */


  static _create(providerId, pendingToken) {
    return new SAMLAuthCredential(providerId, pendingToken);
  }

  buildRequest() {
    return {
      requestUri: IDP_REQUEST_URI,
      returnSecureToken: true,
      pendingToken: this.pendingToken
    };
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.aJ = SAMLAuthCredential;
const SAML_PROVIDER_PREFIX = 'saml.';
/**
 * An {@link AuthProvider} for SAML.
 *
 * @public
 */

class SAMLAuthProvider extends FederatedAuthProvider {
  /**
   * Constructor. The providerId must start with "saml."
   * @param providerId - SAML provider ID.
   */
  constructor(providerId) {
    _assert(providerId.startsWith(SAML_PROVIDER_PREFIX), "argument-error"
    /* ARGUMENT_ERROR */
    );

    super(providerId);
  }
  /**
   * Generates an {@link AuthCredential} from a {@link UserCredential} after a
   * successful SAML flow completes.
   *
   * @remarks
   *
   * For example, to get an {@link AuthCredential}, you could write the
   * following code:
   *
   * ```js
   * const userCredential = await signInWithPopup(auth, samlProvider);
   * const credential = SAMLAuthProvider.credentialFromResult(userCredential);
   * ```
   *
   * @param userCredential - The user credential.
   */


  static credentialFromResult(userCredential) {
    return SAMLAuthProvider.samlCredentialFromTaggedObject(userCredential);
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */


  static credentialFromError(error) {
    return SAMLAuthProvider.samlCredentialFromTaggedObject(error.customData || {});
  }
  /**
   * Creates an {@link AuthCredential} from a JSON string or a plain object.
   * @param json - A plain object or a JSON string
   */


  static credentialFromJSON(json) {
    const credential = SAMLAuthCredential.fromJSON(json);

    _assert(credential, "argument-error"
    /* ARGUMENT_ERROR */
    );

    return credential;
  }

  static samlCredentialFromTaggedObject({
    _tokenResponse: tokenResponse
  }) {
    if (!tokenResponse) {
      return null;
    }

    const {
      pendingToken,
      providerId
    } = tokenResponse;

    if (!pendingToken || !providerId) {
      return null;
    }

    try {
      return SAMLAuthCredential._create(providerId, pendingToken);
    } catch (e) {
      return null;
    }
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provider for generating an {@link OAuthCredential} for {@link ProviderId}.TWITTER.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new TwitterAuthProvider();
 * // Start a sign in process for an unauthenticated user.
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Twitter Access Token and Secret.
 *   const credential = TwitterAuthProvider.credentialFromResult(result);
 *   const token = credential.accessToken;
 *   const secret = credential.secret;
 * }
 * ```
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new TwitterAuthProvider();
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Twitter Access Token and Secret.
 * const credential = TwitterAuthProvider.credentialFromResult(result);
 * const token = credential.accessToken;
 * const secret = credential.secret;
 * ```
 *
 * @public
 */


exports.U = SAMLAuthProvider;

class TwitterAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("twitter.com"
    /* TWITTER */
    );
  }
  /**
   * Creates a credential for Twitter.
   *
   * @param token - Twitter access token.
   * @param secret - Twitter secret.
   */


  static credential(token, secret) {
    return OAuthCredential._fromParams({
      providerId: TwitterAuthProvider.PROVIDER_ID,
      signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
      oauthToken: token,
      oauthTokenSecret: secret
    });
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
   *
   * @param userCredential - The user credential.
   */


  static credentialFromResult(userCredential) {
    return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
  }
  /**
   * Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
   * thrown during a sign-in, link, or reauthenticate operation.
   *
   * @param userCredential - The user credential.
   */


  static credentialFromError(error) {
    return TwitterAuthProvider.credentialFromTaggedObject(error.customData || {});
  }

  static credentialFromTaggedObject({
    _tokenResponse: tokenResponse
  }) {
    if (!tokenResponse) {
      return null;
    }

    const {
      oauthAccessToken,
      oauthTokenSecret
    } = tokenResponse;

    if (!oauthAccessToken || !oauthTokenSecret) {
      return null;
    }

    try {
      return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
    } catch (_a) {
      return null;
    }
  }

}
/** Always set to {@link SignInMethod}.TWITTER. */


exports.V = TwitterAuthProvider;
TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com"
/* TWITTER */
;
/** Always set to {@link ProviderId}.TWITTER. */

TwitterAuthProvider.PROVIDER_ID = "twitter.com"
/* TWITTER */
;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

async function signUp(auth, request) {
  return _performSignInRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:signUp"
  /* SIGN_UP */
  , _addTidIfNecessary(auth, request));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class UserCredentialImpl {
  constructor(params) {
    this.user = params.user;
    this.providerId = params.providerId;
    this._tokenResponse = params._tokenResponse;
    this.operationType = params.operationType;
  }

  static async _fromIdTokenResponse(auth, operationType, idTokenResponse, isAnonymous = false) {
    const user = await UserImpl._fromIdTokenResponse(auth, idTokenResponse, isAnonymous);
    const providerId = providerIdForResponse(idTokenResponse);
    const userCred = new UserCredentialImpl({
      user,
      providerId,
      _tokenResponse: idTokenResponse,
      operationType
    });
    return userCred;
  }

  static async _forOperation(user, operationType, response) {
    await user._updateTokensIfNecessary(response,
    /* reload */
    true);
    const providerId = providerIdForResponse(response);
    return new UserCredentialImpl({
      user,
      providerId,
      _tokenResponse: response,
      operationType
    });
  }

}

function providerIdForResponse(response) {
  if (response.providerId) {
    return response.providerId;
  }

  if ('phoneNumber' in response) {
    return "phone"
    /* PHONE */
    ;
  }

  return null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Asynchronously signs in as an anonymous user.
 *
 * @remarks
 * If there is already an anonymous user signed in, that user will be returned; otherwise, a
 * new anonymous user identity will be created and returned.
 *
 * @param auth - The {@link Auth} instance.
 *
 * @public
 */


async function signInAnonymously(auth) {
  var _a;

  const authInternal = _castAuth(auth);

  await authInternal._initializationPromise;

  if ((_a = authInternal.currentUser) === null || _a === void 0 ? void 0 : _a.isAnonymous) {
    // If an anonymous user is already signed in, no need to sign them in again.
    return new UserCredentialImpl({
      user: authInternal.currentUser,
      providerId: null,
      operationType: "signIn"
      /* SIGN_IN */

    });
  }

  const response = await signUp(authInternal, {
    returnSecureToken: true
  });
  const userCredential = await UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn"
  /* SIGN_IN */
  , response, true);
  await authInternal._updateCurrentUser(userCredential.user);
  return userCredential;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class MultiFactorError extends _util.FirebaseError {
  constructor(auth, error, operationType, user) {
    var _a;

    super(error.code, error.message);
    this.operationType = operationType;
    this.user = user; // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    Object.setPrototypeOf(this, MultiFactorError.prototype);
    this.customData = {
      appName: auth.name,
      tenantId: (_a = auth.tenantId) !== null && _a !== void 0 ? _a : undefined,
      _serverResponse: error.customData._serverResponse,
      operationType
    };
  }

  static _fromErrorAndOperation(auth, error, operationType, user) {
    return new MultiFactorError(auth, error, operationType, user);
  }

}

function _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user) {
  const idTokenProvider = operationType === "reauthenticate"
  /* REAUTHENTICATE */
  ? credential._getReauthenticationResolver(auth) : credential._getIdTokenResponse(auth);
  return idTokenProvider.catch(error => {
    if (error.code === `auth/${"multi-factor-auth-required"
    /* MFA_REQUIRED */
    }`) {
      throw MultiFactorError._fromErrorAndOperation(auth, error, operationType, user);
    }

    throw error;
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Takes a set of UserInfo provider data and converts it to a set of names
 */


function providerDataAsNames(providerData) {
  return new Set(providerData.map(({
    providerId
  }) => providerId).filter(pid => !!pid));
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Unlinks a provider from a user account.
 *
 * @param user - The user.
 * @param providerId - The provider to unlink.
 *
 * @public
 */


async function unlink(user, providerId) {
  const userInternal = (0, _util.getModularInstance)(user);
  await _assertLinkedStatus(true, userInternal, providerId);
  const {
    providerUserInfo
  } = await deleteLinkedAccounts(userInternal.auth, {
    idToken: await userInternal.getIdToken(),
    deleteProvider: [providerId]
  });
  const providersLeft = providerDataAsNames(providerUserInfo || []);
  userInternal.providerData = userInternal.providerData.filter(pd => providersLeft.has(pd.providerId));

  if (!providersLeft.has("phone"
  /* PHONE */
  )) {
    userInternal.phoneNumber = null;
  }

  await userInternal.auth._persistUserIfCurrent(userInternal);
  return userInternal;
}

async function _link$1(user, credential, bypassAuthState = false) {
  const response = await _logoutIfInvalidated(user, credential._linkToIdToken(user.auth, await user.getIdToken()), bypassAuthState);
  return UserCredentialImpl._forOperation(user, "link"
  /* LINK */
  , response);
}

async function _assertLinkedStatus(expected, user, provider) {
  await _reloadWithoutSaving(user);
  const providerIds = providerDataAsNames(user.providerData);
  const code = expected === false ? "provider-already-linked"
  /* PROVIDER_ALREADY_LINKED */
  : "no-such-provider"
  /* NO_SUCH_PROVIDER */
  ;

  _assert(providerIds.has(provider) === expected, user.auth, code);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function _reauthenticate(user, credential, bypassAuthState = false) {
  const {
    auth
  } = user;
  const operationType = "reauthenticate"
  /* REAUTHENTICATE */
  ;

  try {
    const response = await _logoutIfInvalidated(user, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user), bypassAuthState);

    _assert(response.idToken, auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    const parsed = _parseToken(response.idToken);

    _assert(parsed, auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    const {
      sub: localId
    } = parsed;

    _assert(user.uid === localId, auth, "user-mismatch"
    /* USER_MISMATCH */
    );

    return UserCredentialImpl._forOperation(user, operationType, response);
  } catch (e) {
    // Convert user deleted error into user mismatch
    if ((e === null || e === void 0 ? void 0 : e.code) === `auth/${"user-not-found"
    /* USER_DELETED */
    }`) {
      _fail(auth, "user-mismatch"
      /* USER_MISMATCH */
      );
    }

    throw e;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function _signInWithCredential(auth, credential, bypassAuthState = false) {
  const operationType = "signIn"
  /* SIGN_IN */
  ;
  const response = await _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential);
  const userCredential = await UserCredentialImpl._fromIdTokenResponse(auth, operationType, response);

  if (!bypassAuthState) {
    await auth._updateCurrentUser(userCredential.user);
  }

  return userCredential;
}
/**
 * Asynchronously signs in with the given credentials.
 *
 * @remarks
 * An {@link AuthProvider} can be used to generate the credential.
 *
 * @param auth - The {@link Auth} instance.
 * @param credential - The auth credential.
 *
 * @public
 */


async function signInWithCredential(auth, credential) {
  return _signInWithCredential(_castAuth(auth), credential);
}
/**
 * Links the user account with the given credentials.
 *
 * @remarks
 * An {@link AuthProvider} can be used to generate the credential.
 *
 * @param user - The user.
 * @param credential - The auth credential.
 *
 * @public
 */


async function linkWithCredential(user, credential) {
  const userInternal = (0, _util.getModularInstance)(user);
  await _assertLinkedStatus(false, userInternal, credential.providerId);
  return _link$1(userInternal, credential);
}
/**
 * Re-authenticates a user using a fresh credential.
 *
 * @remarks
 * Use before operations such as {@link updatePassword} that require tokens from recent sign-in
 * attempts. This method can be used to recover from a `CREDENTIAL_TOO_OLD_LOGIN_AGAIN` error.
 *
 * @param user - The user.
 * @param credential - The auth credential.
 *
 * @public
 */


async function reauthenticateWithCredential(user, credential) {
  return _reauthenticate((0, _util.getModularInstance)(user), credential);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function signInWithCustomToken$1(auth, request) {
  return _performSignInRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:signInWithCustomToken"
  /* SIGN_IN_WITH_CUSTOM_TOKEN */
  , _addTidIfNecessary(auth, request));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Asynchronously signs in using a custom token.
 *
 * @remarks
 * Custom tokens are used to integrate Firebase Auth with existing auth systems, and must
 * be generated by an auth backend using the
 * {@link https://firebase.google.com/docs/reference/admin/node/admin.auth.Auth#createcustomtoken | createCustomToken}
 * method in the {@link https://firebase.google.com/docs/auth/admin | Admin SDK} .
 *
 * Fails with an error if the token is invalid, expired, or not accepted by the Firebase Auth service.
 *
 * @param auth - The {@link Auth} instance.
 * @param customToken - The custom token to sign in with.
 *
 * @public
 */


async function signInWithCustomToken(auth, customToken) {
  const authInternal = _castAuth(auth);

  const response = await signInWithCustomToken$1(authInternal, {
    token: customToken,
    returnSecureToken: true
  });
  const cred = await UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn"
  /* SIGN_IN */
  , response);
  await authInternal._updateCurrentUser(cred.user);
  return cred;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class MultiFactorInfoImpl {
  constructor(factorId, response) {
    this.factorId = factorId;
    this.uid = response.mfaEnrollmentId;
    this.enrollmentTime = new Date(response.enrolledAt).toUTCString();
    this.displayName = response.displayName;
  }

  static _fromServerResponse(auth, enrollment) {
    if ('phoneInfo' in enrollment) {
      return PhoneMultiFactorInfo._fromServerResponse(auth, enrollment);
    }

    return _fail(auth, "internal-error"
    /* INTERNAL_ERROR */
    );
  }

}

class PhoneMultiFactorInfo extends MultiFactorInfoImpl {
  constructor(response) {
    super("phone"
    /* PHONE */
    , response);
    this.phoneNumber = response.phoneInfo;
  }

  static _fromServerResponse(_auth, enrollment) {
    return new PhoneMultiFactorInfo(enrollment);
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function _setActionCodeSettingsOnRequest(auth, request, actionCodeSettings) {
  var _a;

  _assert(((_a = actionCodeSettings.url) === null || _a === void 0 ? void 0 : _a.length) > 0, auth, "invalid-continue-uri"
  /* INVALID_CONTINUE_URI */
  );

  _assert(typeof actionCodeSettings.dynamicLinkDomain === 'undefined' || actionCodeSettings.dynamicLinkDomain.length > 0, auth, "invalid-dynamic-link-domain"
  /* INVALID_DYNAMIC_LINK_DOMAIN */
  );

  request.continueUrl = actionCodeSettings.url;
  request.dynamicLinkDomain = actionCodeSettings.dynamicLinkDomain;
  request.canHandleCodeInApp = actionCodeSettings.handleCodeInApp;

  if (actionCodeSettings.iOS) {
    _assert(actionCodeSettings.iOS.bundleId.length > 0, auth, "missing-ios-bundle-id"
    /* MISSING_IOS_BUNDLE_ID */
    );

    request.iOSBundleId = actionCodeSettings.iOS.bundleId;
  }

  if (actionCodeSettings.android) {
    _assert(actionCodeSettings.android.packageName.length > 0, auth, "missing-android-pkg-name"
    /* MISSING_ANDROID_PACKAGE_NAME */
    );

    request.androidInstallApp = actionCodeSettings.android.installApp;
    request.androidMinimumVersionCode = actionCodeSettings.android.minimumVersion;
    request.androidPackageName = actionCodeSettings.android.packageName;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sends a password reset email to the given email address.
 *
 * @remarks
 * To complete the password reset, call {@link confirmPasswordReset} with the code supplied in
 * the email sent to the user, along with the new password specified by the user.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendPasswordResetEmail(auth, 'user@example.com', actionCodeSettings);
 * // Obtain code from user.
 * await confirmPasswordReset('user@example.com', code);
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */


async function sendPasswordResetEmail(auth, email, actionCodeSettings) {
  const authModular = (0, _util.getModularInstance)(auth);
  const request = {
    requestType: "PASSWORD_RESET"
    /* PASSWORD_RESET */
    ,
    email
  };

  if (actionCodeSettings) {
    _setActionCodeSettingsOnRequest(authModular, request, actionCodeSettings);
  }

  await sendPasswordResetEmail$1(authModular, request);
}
/**
 * Completes the password reset process, given a confirmation code and new password.
 *
 * @param auth - The {@link Auth} instance.
 * @param oobCode - A confirmation code sent to the user.
 * @param newPassword - The new password.
 *
 * @public
 */


async function confirmPasswordReset(auth, oobCode, newPassword) {
  await resetPassword((0, _util.getModularInstance)(auth), {
    oobCode,
    newPassword
  }); // Do not return the email.
}
/**
 * Applies a verification code sent to the user by email or other out-of-band mechanism.
 *
 * @param auth - The {@link Auth} instance.
 * @param oobCode - A verification code sent to the user.
 *
 * @public
 */


async function applyActionCode(auth, oobCode) {
  await applyActionCode$1((0, _util.getModularInstance)(auth), {
    oobCode
  });
}
/**
 * Checks a verification code sent to the user by email or other out-of-band mechanism.
 *
 * @returns metadata about the code.
 *
 * @param auth - The {@link Auth} instance.
 * @param oobCode - A verification code sent to the user.
 *
 * @public
 */


async function checkActionCode(auth, oobCode) {
  const authModular = (0, _util.getModularInstance)(auth);
  const response = await resetPassword(authModular, {
    oobCode
  }); // Email could be empty only if the request type is EMAIL_SIGNIN or
  // VERIFY_AND_CHANGE_EMAIL.
  // New email should not be empty if the request type is
  // VERIFY_AND_CHANGE_EMAIL.
  // Multi-factor info could not be empty if the request type is
  // REVERT_SECOND_FACTOR_ADDITION.

  const operation = response.requestType;

  _assert(operation, authModular, "internal-error"
  /* INTERNAL_ERROR */
  );

  switch (operation) {
    case "EMAIL_SIGNIN"
    /* EMAIL_SIGNIN */
    :
      break;

    case "VERIFY_AND_CHANGE_EMAIL"
    /* VERIFY_AND_CHANGE_EMAIL */
    :
      _assert(response.newEmail, authModular, "internal-error"
      /* INTERNAL_ERROR */
      );

      break;

    case "REVERT_SECOND_FACTOR_ADDITION"
    /* REVERT_SECOND_FACTOR_ADDITION */
    :
      _assert(response.mfaInfo, authModular, "internal-error"
      /* INTERNAL_ERROR */
      );

    // fall through

    default:
      _assert(response.email, authModular, "internal-error"
      /* INTERNAL_ERROR */
      );

  } // The multi-factor info for revert second factor addition


  let multiFactorInfo = null;

  if (response.mfaInfo) {
    multiFactorInfo = MultiFactorInfoImpl._fromServerResponse(_castAuth(authModular), response.mfaInfo);
  }

  return {
    data: {
      email: (response.requestType === "VERIFY_AND_CHANGE_EMAIL"
      /* VERIFY_AND_CHANGE_EMAIL */
      ? response.newEmail : response.email) || null,
      previousEmail: (response.requestType === "VERIFY_AND_CHANGE_EMAIL"
      /* VERIFY_AND_CHANGE_EMAIL */
      ? response.email : response.newEmail) || null,
      multiFactorInfo
    },
    operation
  };
}
/**
 * Checks a password reset code sent to the user by email or other out-of-band mechanism.
 *
 * @returns the user's email address if valid.
 *
 * @param auth - The {@link Auth} instance.
 * @param code - A verification code sent to the user.
 *
 * @public
 */


async function verifyPasswordResetCode(auth, code) {
  const {
    data
  } = await checkActionCode((0, _util.getModularInstance)(auth), code); // Email should always be present since a code was sent to it

  return data.email;
}
/**
 * Creates a new user account associated with the specified email address and password.
 *
 * @remarks
 * On successful creation of the user account, this user will also be signed in to your application.
 *
 * User account creation can fail if the account already exists or the password is invalid.
 *
 * Note: The email address acts as a unique identifier for the user and enables an email-based
 * password reset. This function will create a new user account and set the initial user password.
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param password - The user's chosen password.
 *
 * @public
 */


async function createUserWithEmailAndPassword(auth, email, password) {
  const authInternal = _castAuth(auth);

  const response = await signUp(authInternal, {
    returnSecureToken: true,
    email,
    password
  });
  const userCredential = await UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn"
  /* SIGN_IN */
  , response);
  await authInternal._updateCurrentUser(userCredential.user);
  return userCredential;
}
/**
 * Asynchronously signs in using an email and password.
 *
 * @remarks
 * Fails with an error if the email address and password do not match.
 *
 * Note: The user's password is NOT the password used to access the user's email account. The
 * email address serves as a unique identifier for the user, and the password is used to access
 * the user's account in your Firebase project. See also: {@link createUserWithEmailAndPassword}.
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The users email address.
 * @param password - The users password.
 *
 * @public
 */


function signInWithEmailAndPassword(auth, email, password) {
  return signInWithCredential((0, _util.getModularInstance)(auth), EmailAuthProvider.credential(email, password));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sends a sign-in email link to the user with the specified email.
 *
 * @remarks
 * The sign-in operation has to always be completed in the app unlike other out of band email
 * actions (password reset and email verifications). This is because, at the end of the flow,
 * the user is expected to be signed in and their Auth state persisted within the app.
 *
 * To complete sign in with the email link, call {@link signInWithEmailLink} with the email
 * address and the email link supplied in the email sent to the user.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
 * // Obtain emailLink from the user.
 * if(isSignInWithEmailLink(auth, emailLink)) {
 *   await signInWithEmailLink('user@example.com', 'user@example.com', emailLink);
 * }
 * ```
 *
 * @param authInternal - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */


async function sendSignInLinkToEmail(auth, email, actionCodeSettings) {
  const authModular = (0, _util.getModularInstance)(auth);
  const request = {
    requestType: "EMAIL_SIGNIN"
    /* EMAIL_SIGNIN */
    ,
    email
  };

  _assert(actionCodeSettings.handleCodeInApp, authModular, "argument-error"
  /* ARGUMENT_ERROR */
  );

  if (actionCodeSettings) {
    _setActionCodeSettingsOnRequest(authModular, request, actionCodeSettings);
  }

  await sendSignInLinkToEmail$1(authModular, request);
}
/**
 * Checks if an incoming link is a sign-in with email link suitable for {@link signInWithEmailLink}.
 *
 * @param auth - The {@link Auth} instance.
 * @param emailLink - The link sent to the user's email address.
 *
 * @public
 */


function isSignInWithEmailLink(auth, emailLink) {
  const actionCodeUrl = ActionCodeURL.parseLink(emailLink);
  return (actionCodeUrl === null || actionCodeUrl === void 0 ? void 0 : actionCodeUrl.operation) === "EMAIL_SIGNIN"
  /* EMAIL_SIGNIN */
  ;
}
/**
 * Asynchronously signs in using an email and sign-in email link.
 *
 * @remarks
 * If no link is passed, the link is inferred from the current URL.
 *
 * Fails with an error if the email address is invalid or OTP in email link expires.
 *
 * Note: Confirm the link is a sign-in email link before calling this method firebase.auth.Auth.isSignInWithEmailLink.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendSignInLinkToEmail(auth, 'user@example.com', actionCodeSettings);
 * // Obtain emailLink from the user.
 * if(isSignInWithEmailLink(auth, emailLink)) {
 *   await signInWithEmailLink('user@example.com', 'user@example.com', emailLink);
 * }
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 * @param emailLink - The link sent to the user's email address.
 *
 * @public
 */


async function signInWithEmailLink(auth, email, emailLink) {
  const authModular = (0, _util.getModularInstance)(auth);
  const credential = EmailAuthProvider.credentialWithLink(email, emailLink || _getCurrentUrl()); // Check if the tenant ID in the email link matches the tenant ID on Auth
  // instance.

  _assert(credential._tenantId === (authModular.tenantId || null), authModular, "tenant-id-mismatch"
  /* TENANT_ID_MISMATCH */
  );

  return signInWithCredential(authModular, credential);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function createAuthUri(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:createAuthUri"
  /* CREATE_AUTH_URI */
  , _addTidIfNecessary(auth, request));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Gets the list of possible sign in methods for the given email address.
 *
 * @remarks
 * This is useful to differentiate methods of sign-in for the same provider, eg.
 * {@link EmailAuthProvider} which has 2 methods of sign-in,
 * {@link SignInMethod}.EMAIL_PASSWORD and
 * {@link SignInMethod}.EMAIL_LINK.
 *
 * @param auth - The {@link Auth} instance.
 * @param email - The user's email address.
 *
 * @public
 */


async function fetchSignInMethodsForEmail(auth, email) {
  // createAuthUri returns an error if continue URI is not http or https.
  // For environments like Cordova, Chrome extensions, native frameworks, file
  // systems, etc, use http://localhost as continue URL.
  const continueUri = _isHttpOrHttps() ? _getCurrentUrl() : 'http://localhost';
  const request = {
    identifier: email,
    continueUri
  };
  const {
    signinMethods
  } = await createAuthUri((0, _util.getModularInstance)(auth), request);
  return signinMethods || [];
}
/**
 * Sends a verification email to a user.
 *
 * @remarks
 * The verification process is completed by calling {@link applyActionCode}.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await sendEmailVerification(user, actionCodeSettings);
 * // Obtain code from the user.
 * await applyActionCode(auth, code);
 * ```
 *
 * @param user - The user.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */


async function sendEmailVerification(user, actionCodeSettings) {
  const userInternal = (0, _util.getModularInstance)(user);
  const idToken = await user.getIdToken();
  const request = {
    requestType: "VERIFY_EMAIL"
    /* VERIFY_EMAIL */
    ,
    idToken
  };

  if (actionCodeSettings) {
    _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
  }

  const {
    email
  } = await sendEmailVerification$1(userInternal.auth, request);

  if (email !== user.email) {
    await user.reload();
  }
}
/**
 * Sends a verification email to a new email address.
 *
 * @remarks
 * The user's email will be updated to the new one after being verified.
 *
 * If you have a custom email action handler, you can complete the verification process by calling
 * {@link applyActionCode}.
 *
 * @example
 * ```javascript
 * const actionCodeSettings = {
 *   url: 'https://www.example.com/?email=user@example.com',
 *   iOS: {
 *      bundleId: 'com.example.ios'
 *   },
 *   android: {
 *     packageName: 'com.example.android',
 *     installApp: true,
 *     minimumVersion: '12'
 *   },
 *   handleCodeInApp: true
 * };
 * await verifyBeforeUpdateEmail(user, 'newemail@example.com', actionCodeSettings);
 * // Obtain code from the user.
 * await applyActionCode(auth, code);
 * ```
 *
 * @param user - The user.
 * @param newEmail - The new email address to be verified before update.
 * @param actionCodeSettings - The {@link ActionCodeSettings}.
 *
 * @public
 */


async function verifyBeforeUpdateEmail(user, newEmail, actionCodeSettings) {
  const userInternal = (0, _util.getModularInstance)(user);
  const idToken = await user.getIdToken();
  const request = {
    requestType: "VERIFY_AND_CHANGE_EMAIL"
    /* VERIFY_AND_CHANGE_EMAIL */
    ,
    idToken,
    newEmail
  };

  if (actionCodeSettings) {
    _setActionCodeSettingsOnRequest(userInternal.auth, request, actionCodeSettings);
  }

  const {
    email
  } = await verifyAndChangeEmail(userInternal.auth, request);

  if (email !== user.email) {
    // If the local copy of the email on user is outdated, reload the
    // user.
    await user.reload();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function updateProfile$1(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v1/accounts:update"
  /* SET_ACCOUNT_INFO */
  , request);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Updates a user's profile data.
 *
 * @param user - The user.
 * @param profile - The profile's `displayName` and `photoURL` to update.
 *
 * @public
 */


async function updateProfile(user, {
  displayName,
  photoURL: photoUrl
}) {
  if (displayName === undefined && photoUrl === undefined) {
    return;
  }

  const userInternal = (0, _util.getModularInstance)(user);
  const idToken = await userInternal.getIdToken();
  const profileRequest = {
    idToken,
    displayName,
    photoUrl,
    returnSecureToken: true
  };
  const response = await _logoutIfInvalidated(userInternal, updateProfile$1(userInternal.auth, profileRequest));
  userInternal.displayName = response.displayName || null;
  userInternal.photoURL = response.photoUrl || null; // Update the password provider as well

  const passwordProvider = userInternal.providerData.find(({
    providerId
  }) => providerId === "password"
  /* PASSWORD */
  );

  if (passwordProvider) {
    passwordProvider.displayName = userInternal.displayName;
    passwordProvider.photoURL = userInternal.photoURL;
  }

  await userInternal._updateTokensIfNecessary(response);
}
/**
 * Updates the user's email address.
 *
 * @remarks
 * An email will be sent to the original email address (if it was set) that allows to revoke the
 * email address change, in order to protect them from account hijacking.
 *
 * Important: this is a security sensitive operation that requires the user to have recently signed
 * in. If this requirement isn't met, ask the user to authenticate again and then call
 * {@link reauthenticateWithCredential}.
 *
 * @param user - The user.
 * @param newEmail - The new email address.
 *
 * @public
 */


function updateEmail(user, newEmail) {
  return updateEmailOrPassword((0, _util.getModularInstance)(user), newEmail, null);
}
/**
 * Updates the user's password.
 *
 * @remarks
 * Important: this is a security sensitive operation that requires the user to have recently signed
 * in. If this requirement isn't met, ask the user to authenticate again and then call
 * {@link reauthenticateWithCredential}.
 *
 * @param user - The user.
 * @param newPassword - The new password.
 *
 * @public
 */


function updatePassword(user, newPassword) {
  return updateEmailOrPassword((0, _util.getModularInstance)(user), null, newPassword);
}

async function updateEmailOrPassword(user, email, password) {
  const {
    auth
  } = user;
  const idToken = await user.getIdToken();
  const request = {
    idToken,
    returnSecureToken: true
  };

  if (email) {
    request.email = email;
  }

  if (password) {
    request.password = password;
  }

  const response = await _logoutIfInvalidated(user, updateEmailPassword(auth, request));
  await user._updateTokensIfNecessary(response,
  /* reload */
  true);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Parse the `AdditionalUserInfo` from the ID token response.
 *
 */


function _fromIdTokenResponse(idTokenResponse) {
  var _a, _b;

  if (!idTokenResponse) {
    return null;
  }

  const {
    providerId
  } = idTokenResponse;
  const profile = idTokenResponse.rawUserInfo ? JSON.parse(idTokenResponse.rawUserInfo) : {};
  const isNewUser = idTokenResponse.isNewUser || idTokenResponse.kind === "identitytoolkit#SignupNewUserResponse"
  /* SignupNewUser */
  ;

  if (!providerId && (idTokenResponse === null || idTokenResponse === void 0 ? void 0 : idTokenResponse.idToken)) {
    const signInProvider = (_b = (_a = _parseToken(idTokenResponse.idToken)) === null || _a === void 0 ? void 0 : _a.firebase) === null || _b === void 0 ? void 0 : _b['sign_in_provider'];

    if (signInProvider) {
      const filteredProviderId = signInProvider !== "anonymous"
      /* ANONYMOUS */
      && signInProvider !== "custom"
      /* CUSTOM */
      ? signInProvider : null; // Uses generic class in accordance with the legacy SDK.

      return new GenericAdditionalUserInfo(isNewUser, filteredProviderId);
    }
  }

  if (!providerId) {
    return null;
  }

  switch (providerId) {
    case "facebook.com"
    /* FACEBOOK */
    :
      return new FacebookAdditionalUserInfo(isNewUser, profile);

    case "github.com"
    /* GITHUB */
    :
      return new GithubAdditionalUserInfo(isNewUser, profile);

    case "google.com"
    /* GOOGLE */
    :
      return new GoogleAdditionalUserInfo(isNewUser, profile);

    case "twitter.com"
    /* TWITTER */
    :
      return new TwitterAdditionalUserInfo(isNewUser, profile, idTokenResponse.screenName || null);

    case "custom"
    /* CUSTOM */
    :
    case "anonymous"
    /* ANONYMOUS */
    :
      return new GenericAdditionalUserInfo(isNewUser, null);

    default:
      return new GenericAdditionalUserInfo(isNewUser, providerId, profile);
  }
}

class GenericAdditionalUserInfo {
  constructor(isNewUser, providerId, profile = {}) {
    this.isNewUser = isNewUser;
    this.providerId = providerId;
    this.profile = profile;
  }

}

class FederatedAdditionalUserInfoWithUsername extends GenericAdditionalUserInfo {
  constructor(isNewUser, providerId, profile, username) {
    super(isNewUser, providerId, profile);
    this.username = username;
  }

}

class FacebookAdditionalUserInfo extends GenericAdditionalUserInfo {
  constructor(isNewUser, profile) {
    super(isNewUser, "facebook.com"
    /* FACEBOOK */
    , profile);
  }

}

class GithubAdditionalUserInfo extends FederatedAdditionalUserInfoWithUsername {
  constructor(isNewUser, profile) {
    super(isNewUser, "github.com"
    /* GITHUB */
    , profile, typeof (profile === null || profile === void 0 ? void 0 : profile.login) === 'string' ? profile === null || profile === void 0 ? void 0 : profile.login : null);
  }

}

class GoogleAdditionalUserInfo extends GenericAdditionalUserInfo {
  constructor(isNewUser, profile) {
    super(isNewUser, "google.com"
    /* GOOGLE */
    , profile);
  }

}

class TwitterAdditionalUserInfo extends FederatedAdditionalUserInfoWithUsername {
  constructor(isNewUser, profile, screenName) {
    super(isNewUser, "twitter.com"
    /* TWITTER */
    , profile, screenName);
  }

}
/**
 * Extracts provider specific {@link AdditionalUserInfo} for the given credential.
 *
 * @param userCredential - The user credential.
 *
 * @public
 */


function getAdditionalUserInfo(userCredential) {
  const {
    user,
    _tokenResponse
  } = userCredential;

  if (user.isAnonymous && !_tokenResponse) {
    // Handle the special case where signInAnonymously() gets called twice.
    // No network call is made so there's nothing to actually fill this in
    return {
      providerId: null,
      isNewUser: false,
      profile: null
    };
  }

  return _fromIdTokenResponse(_tokenResponse);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Non-optional auth methods.

/**
 * Changes the type of persistence on the {@link Auth} instance for the currently saved
 * `Auth` session and applies this type of persistence for future sign-in requests, including
 * sign-in with redirect requests.
 *
 * @remarks
 * This makes it easy for a user signing in to specify whether their session should be
 * remembered or not. It also makes it easier to never persist the `Auth` state for applications
 * that are shared by other users or have sensitive data.
 *
 * @example
 * ```javascript
 * setPersistence(auth, browserSessionPersistence);
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param persistence - The {@link Persistence} to use.
 * @returns A `Promise` that resolves once the persistence change has completed
 *
 * @public
 */


function setPersistence(auth, persistence) {
  return (0, _util.getModularInstance)(auth).setPersistence(persistence);
}
/**
 * Adds an observer for changes to the signed-in user's ID token, which includes sign-in,
 * sign-out, and token refresh events.
 *
 * @param auth - The {@link Auth} instance.
 * @param nextOrObserver - callback triggered on change.
 * @param error - callback triggered on error.
 * @param completed - callback triggered when observer is removed.
 *
 * @public
 */


function onIdTokenChanged(auth, nextOrObserver, error, completed) {
  return (0, _util.getModularInstance)(auth).onIdTokenChanged(nextOrObserver, error, completed);
}
/**
 * Adds an observer for changes to the user's sign-in state.
 *
 * @remarks
 * To keep the old behavior, see {@link onIdTokenChanged}.
 *
 * @param auth - The {@link Auth} instance.
 * @param nextOrObserver - callback triggered on change.
 * @param error - callback triggered on error.
 * @param completed - callback triggered when observer is removed.
 *
 * @public
 */


function onAuthStateChanged(auth, nextOrObserver, error, completed) {
  return (0, _util.getModularInstance)(auth).onAuthStateChanged(nextOrObserver, error, completed);
}
/**
 * Sets the current language to the default device/browser preference.
 *
 * @param auth - The {@link Auth} instance.
 *
 * @public
 */


function useDeviceLanguage(auth) {
  (0, _util.getModularInstance)(auth).useDeviceLanguage();
}
/**
 * Asynchronously sets the provided user as {@link Auth.currentUser} on the
 * {@link Auth} instance.
 *
 * @remarks
 * A new instance copy of the user provided will be made and set as currentUser.
 *
 * This will trigger {@link onAuthStateChanged} and {@link onIdTokenChanged} listeners
 * like other sign in methods.
 *
 * The operation fails with an error if the user to be updated belongs to a different Firebase
 * project.
 *
 * @param auth - The {@link Auth} instance.
 * @param user - The new {@link User}.
 *
 * @public
 */


function updateCurrentUser(auth, user) {
  return (0, _util.getModularInstance)(auth).updateCurrentUser(user);
}
/**
 * Signs out the current user.
 *
 * @param auth - The {@link Auth} instance.
 *
 * @public
 */


function signOut(auth) {
  return (0, _util.getModularInstance)(auth).signOut();
}
/**
 * Deletes and signs out the user.
 *
 * @remarks
 * Important: this is a security-sensitive operation that requires the user to have recently
 * signed in. If this requirement isn't met, ask the user to authenticate again and then call
 * {@link reauthenticateWithCredential}.
 *
 * @param user - The user.
 *
 * @public
 */


async function deleteUser(user) {
  return (0, _util.getModularInstance)(user).delete();
}

class MultiFactorSessionImpl {
  constructor(type, credential) {
    this.type = type;
    this.credential = credential;
  }

  static _fromIdtoken(idToken) {
    return new MultiFactorSessionImpl("enroll"
    /* ENROLL */
    , idToken);
  }

  static _fromMfaPendingCredential(mfaPendingCredential) {
    return new MultiFactorSessionImpl("signin"
    /* SIGN_IN */
    , mfaPendingCredential);
  }

  toJSON() {
    const key = this.type === "enroll"
    /* ENROLL */
    ? 'idToken' : 'pendingCredential';
    return {
      multiFactorSession: {
        [key]: this.credential
      }
    };
  }

  static fromJSON(obj) {
    var _a, _b;

    if (obj === null || obj === void 0 ? void 0 : obj.multiFactorSession) {
      if ((_a = obj.multiFactorSession) === null || _a === void 0 ? void 0 : _a.pendingCredential) {
        return MultiFactorSessionImpl._fromMfaPendingCredential(obj.multiFactorSession.pendingCredential);
      } else if ((_b = obj.multiFactorSession) === null || _b === void 0 ? void 0 : _b.idToken) {
        return MultiFactorSessionImpl._fromIdtoken(obj.multiFactorSession.idToken);
      }
    }

    return null;
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class MultiFactorResolverImpl {
  constructor(session, hints, signInResolver) {
    this.session = session;
    this.hints = hints;
    this.signInResolver = signInResolver;
  }
  /** @internal */


  static _fromError(authExtern, error) {
    const auth = _castAuth(authExtern);

    const serverResponse = error.customData._serverResponse;
    const hints = (serverResponse.mfaInfo || []).map(enrollment => MultiFactorInfoImpl._fromServerResponse(auth, enrollment));

    _assert(serverResponse.mfaPendingCredential, auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    const session = MultiFactorSessionImpl._fromMfaPendingCredential(serverResponse.mfaPendingCredential);

    return new MultiFactorResolverImpl(session, hints, async assertion => {
      const mfaResponse = await assertion._process(auth, session); // Clear out the unneeded fields from the old login response

      delete serverResponse.mfaInfo;
      delete serverResponse.mfaPendingCredential; // Use in the new token & refresh token in the old response

      const idTokenResponse = Object.assign(Object.assign({}, serverResponse), {
        idToken: mfaResponse.idToken,
        refreshToken: mfaResponse.refreshToken
      }); // TODO: we should collapse this switch statement into UserCredentialImpl._forOperation and have it support the SIGN_IN case

      switch (error.operationType) {
        case "signIn"
        /* SIGN_IN */
        :
          const userCredential = await UserCredentialImpl._fromIdTokenResponse(auth, error.operationType, idTokenResponse);
          await auth._updateCurrentUser(userCredential.user);
          return userCredential;

        case "reauthenticate"
        /* REAUTHENTICATE */
        :
          _assert(error.user, auth, "internal-error"
          /* INTERNAL_ERROR */
          );

          return UserCredentialImpl._forOperation(error.user, error.operationType, idTokenResponse);

        default:
          _fail(auth, "internal-error"
          /* INTERNAL_ERROR */
          );

      }
    });
  }

  async resolveSignIn(assertionExtern) {
    const assertion = assertionExtern;
    return this.signInResolver(assertion);
  }

}
/**
 * Provides a {@link MultiFactorResolver} suitable for completion of a
 * multi-factor flow.
 *
 * @param auth - The {@link Auth} instance.
 * @param error - The {@link MultiFactorError} raised during a sign-in, or
 * reauthentication operation.
 *
 * @public
 */


function getMultiFactorResolver(auth, error) {
  var _a;

  const authModular = (0, _util.getModularInstance)(auth);
  const errorInternal = error;

  _assert(error.customData.operationType, authModular, "argument-error"
  /* ARGUMENT_ERROR */
  );

  _assert((_a = errorInternal.customData._serverResponse) === null || _a === void 0 ? void 0 : _a.mfaPendingCredential, authModular, "argument-error"
  /* ARGUMENT_ERROR */
  );

  return MultiFactorResolverImpl._fromError(authModular, errorInternal);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function startEnrollPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v2/accounts/mfaEnrollment:start"
  /* START_PHONE_MFA_ENROLLMENT */
  , _addTidIfNecessary(auth, request));
}

function finalizeEnrollPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v2/accounts/mfaEnrollment:finalize"
  /* FINALIZE_PHONE_MFA_ENROLLMENT */
  , _addTidIfNecessary(auth, request));
}

function withdrawMfa(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v2/accounts/mfaEnrollment:withdraw"
  /* WITHDRAW_MFA */
  , _addTidIfNecessary(auth, request));
}

class MultiFactorUserImpl {
  constructor(user) {
    this.user = user;
    this.enrolledFactors = [];

    user._onReload(userInfo => {
      if (userInfo.mfaInfo) {
        this.enrolledFactors = userInfo.mfaInfo.map(enrollment => MultiFactorInfoImpl._fromServerResponse(user.auth, enrollment));
      }
    });
  }

  static _fromUser(user) {
    return new MultiFactorUserImpl(user);
  }

  async getSession() {
    return MultiFactorSessionImpl._fromIdtoken(await this.user.getIdToken());
  }

  async enroll(assertionExtern, displayName) {
    const assertion = assertionExtern;
    const session = await this.getSession();
    const finalizeMfaResponse = await _logoutIfInvalidated(this.user, assertion._process(this.user.auth, session, displayName)); // New tokens will be issued after enrollment of the new second factors.
    // They need to be updated on the user.

    await this.user._updateTokensIfNecessary(finalizeMfaResponse); // The user needs to be reloaded to get the new multi-factor information
    // from server. USER_RELOADED event will be triggered and `enrolledFactors`
    // will be updated.

    return this.user.reload();
  }

  async unenroll(infoOrUid) {
    const mfaEnrollmentId = typeof infoOrUid === 'string' ? infoOrUid : infoOrUid.uid;
    const idToken = await this.user.getIdToken();
    const idTokenResponse = await _logoutIfInvalidated(this.user, withdrawMfa(this.user.auth, {
      idToken,
      mfaEnrollmentId
    })); // Remove the second factor from the user's list.

    this.enrolledFactors = this.enrolledFactors.filter(({
      uid
    }) => uid !== mfaEnrollmentId); // Depending on whether the backend decided to revoke the user's session,
    // the tokenResponse may be empty. If the tokens were not updated (and they
    // are now invalid), reloading the user will discover this and invalidate
    // the user's state accordingly.

    await this.user._updateTokensIfNecessary(idTokenResponse);

    try {
      await this.user.reload();
    } catch (e) {
      if (e.code !== `auth/${"user-token-expired"
      /* TOKEN_EXPIRED */
      }`) {
        throw e;
      }
    }
  }

}

const multiFactorUserCache = new WeakMap();
/**
 * The {@link MultiFactorUser} corresponding to the user.
 *
 * @remarks
 * This is used to access all multi-factor properties and operations related to the user.
 *
 * @param user - The user.
 *
 * @public
 */

function multiFactor(user) {
  const userModular = (0, _util.getModularInstance)(user);

  if (!multiFactorUserCache.has(userModular)) {
    multiFactorUserCache.set(userModular, MultiFactorUserImpl._fromUser(userModular));
  }

  return multiFactorUserCache.get(userModular);
}

const STORAGE_AVAILABLE_KEY = '__sak';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// There are two different browser persistence types: local and session.
// Both have the same implementation but use a different underlying storage
// object.

class BrowserPersistenceClass {
  constructor(storageRetriever, type) {
    this.storageRetriever = storageRetriever;
    this.type = type;
  }

  _isAvailable() {
    try {
      if (!this.storage) {
        return Promise.resolve(false);
      }

      this.storage.setItem(STORAGE_AVAILABLE_KEY, '1');
      this.storage.removeItem(STORAGE_AVAILABLE_KEY);
      return Promise.resolve(true);
    } catch (_a) {
      return Promise.resolve(false);
    }
  }

  _set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
    return Promise.resolve();
  }

  _get(key) {
    const json = this.storage.getItem(key);
    return Promise.resolve(json ? JSON.parse(json) : null);
  }

  _remove(key) {
    this.storage.removeItem(key);
    return Promise.resolve();
  }

  get storage() {
    return this.storageRetriever();
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function _iframeCannotSyncWebStorage() {
  const ua = (0, _util.getUA)();
  return _isSafari(ua) || _isIOS(ua);
} // The polling period in case events are not supported


const _POLLING_INTERVAL_MS$1 = 1000; // The IE 10 localStorage cross tab synchronization delay in milliseconds

const IE10_LOCAL_STORAGE_SYNC_DELAY = 10;

class BrowserLocalPersistence extends BrowserPersistenceClass {
  constructor() {
    super(() => window.localStorage, "LOCAL"
    /* LOCAL */
    );

    this.boundEventHandler = (event, poll) => this.onStorageEvent(event, poll);

    this.listeners = {};
    this.localCache = {}; // setTimeout return value is platform specific
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    this.pollTimer = null; // Safari or iOS browser and embedded in an iframe.

    this.safariLocalStorageNotSynced = _iframeCannotSyncWebStorage() && _isIframe(); // Whether to use polling instead of depending on window events

    this.fallbackToPolling = _isMobileBrowser();
    this._shouldAllowMigration = true;
  }

  forAllChangedKeys(cb) {
    // Check all keys with listeners on them.
    for (const key of Object.keys(this.listeners)) {
      // Get value from localStorage.
      const newValue = this.storage.getItem(key);
      const oldValue = this.localCache[key]; // If local map value does not match, trigger listener with storage event.
      // Differentiate this simulated event from the real storage event.

      if (newValue !== oldValue) {
        cb(key, oldValue, newValue);
      }
    }
  }

  onStorageEvent(event, poll = false) {
    // Key would be null in some situations, like when localStorage is cleared
    if (!event.key) {
      this.forAllChangedKeys((key, _oldValue, newValue) => {
        this.notifyListeners(key, newValue);
      });
      return;
    }

    const key = event.key; // Check the mechanism how this event was detected.
    // The first event will dictate the mechanism to be used.

    if (poll) {
      // Environment detects storage changes via polling.
      // Remove storage event listener to prevent possible event duplication.
      this.detachListener();
    } else {
      // Environment detects storage changes via storage event listener.
      // Remove polling listener to prevent possible event duplication.
      this.stopPolling();
    } // Safari embedded iframe. Storage event will trigger with the delta
    // changes but no changes will be applied to the iframe localStorage.


    if (this.safariLocalStorageNotSynced) {
      // Get current iframe page value.
      const storedValue = this.storage.getItem(key); // Value not synchronized, synchronize manually.

      if (event.newValue !== storedValue) {
        if (event.newValue !== null) {
          // Value changed from current value.
          this.storage.setItem(key, event.newValue);
        } else {
          // Current value deleted.
          this.storage.removeItem(key);
        }
      } else if (this.localCache[key] === event.newValue && !poll) {
        // Already detected and processed, do not trigger listeners again.
        return;
      }
    }

    const triggerListeners = () => {
      // Keep local map up to date in case storage event is triggered before
      // poll.
      const storedValue = this.storage.getItem(key);

      if (!poll && this.localCache[key] === storedValue) {
        // Real storage event which has already been detected, do nothing.
        // This seems to trigger in some IE browsers for some reason.
        return;
      }

      this.notifyListeners(key, storedValue);
    };

    const storedValue = this.storage.getItem(key);

    if (_isIE10() && storedValue !== event.newValue && event.newValue !== event.oldValue) {
      // IE 10 has this weird bug where a storage event would trigger with the
      // correct key, oldValue and newValue but localStorage.getItem(key) does
      // not yield the updated value until a few milliseconds. This ensures
      // this recovers from that situation.
      setTimeout(triggerListeners, IE10_LOCAL_STORAGE_SYNC_DELAY);
    } else {
      triggerListeners();
    }
  }

  notifyListeners(key, value) {
    this.localCache[key] = value;
    const listeners = this.listeners[key];

    if (listeners) {
      for (const listener of Array.from(listeners)) {
        listener(value ? JSON.parse(value) : value);
      }
    }
  }

  startPolling() {
    this.stopPolling();
    this.pollTimer = setInterval(() => {
      this.forAllChangedKeys((key, oldValue, newValue) => {
        this.onStorageEvent(new StorageEvent('storage', {
          key,
          oldValue,
          newValue
        }),
        /* poll */
        true);
      });
    }, _POLLING_INTERVAL_MS$1);
  }

  stopPolling() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  attachListener() {
    window.addEventListener('storage', this.boundEventHandler);
  }

  detachListener() {
    window.removeEventListener('storage', this.boundEventHandler);
  }

  _addListener(key, listener) {
    if (Object.keys(this.listeners).length === 0) {
      // Whether browser can detect storage event when it had already been pushed to the background.
      // This may happen in some mobile browsers. A localStorage change in the foreground window
      // will not be detected in the background window via the storage event.
      // This was detected in iOS 7.x mobile browsers
      if (this.fallbackToPolling) {
        this.startPolling();
      } else {
        this.attachListener();
      }
    }

    if (!this.listeners[key]) {
      this.listeners[key] = new Set(); // Populate the cache to avoid spuriously triggering on first poll.

      this.localCache[key] = this.storage.getItem(key);
    }

    this.listeners[key].add(listener);
  }

  _removeListener(key, listener) {
    if (this.listeners[key]) {
      this.listeners[key].delete(listener);

      if (this.listeners[key].size === 0) {
        delete this.listeners[key];
      }
    }

    if (Object.keys(this.listeners).length === 0) {
      this.detachListener();
      this.stopPolling();
    }
  } // Update local cache on base operations:


  async _set(key, value) {
    await super._set(key, value);
    this.localCache[key] = JSON.stringify(value);
  }

  async _get(key) {
    const value = await super._get(key);
    this.localCache[key] = JSON.stringify(value);
    return value;
  }

  async _remove(key) {
    await super._remove(key);
    delete this.localCache[key];
  }

}

BrowserLocalPersistence.type = 'LOCAL';
/**
 * An implementation of {@link Persistence} of type `LOCAL` using `localStorage`
 * for the underlying storage.
 *
 * @public
 */

const browserLocalPersistence = BrowserLocalPersistence;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.b = browserLocalPersistence;

class BrowserSessionPersistence extends BrowserPersistenceClass {
  constructor() {
    super(() => window.sessionStorage, "SESSION"
    /* SESSION */
    );
  }

  _addListener(_key, _listener) {
    // Listeners are not supported for session storage since it cannot be shared across windows
    return;
  }

  _removeListener(_key, _listener) {
    // Listeners are not supported for session storage since it cannot be shared across windows
    return;
  }

}

BrowserSessionPersistence.type = 'SESSION';
/**
 * An implementation of {@link Persistence} of `SESSION` using `sessionStorage`
 * for the underlying storage.
 *
 * @public
 */

const browserSessionPersistence = BrowserSessionPersistence;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Shim for Promise.allSettled, note the slightly different format of `fulfilled` vs `status`.
 *
 * @param promises - Array of promises to wait on.
 */

exports.a = browserSessionPersistence;

function _allSettled(promises) {
  return Promise.all(promises.map(async promise => {
    try {
      const value = await promise;
      return {
        fulfilled: true,
        value
      };
    } catch (reason) {
      return {
        fulfilled: false,
        reason
      };
    }
  }));
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Interface class for receiving messages.
 *
 */


class Receiver {
  constructor(eventTarget) {
    this.eventTarget = eventTarget;
    this.handlersMap = {};
    this.boundEventHandler = this.handleEvent.bind(this);
  }
  /**
   * Obtain an instance of a Receiver for a given event target, if none exists it will be created.
   *
   * @param eventTarget - An event target (such as window or self) through which the underlying
   * messages will be received.
   */


  static _getInstance(eventTarget) {
    // The results are stored in an array since objects can't be keys for other
    // objects. In addition, setting a unique property on an event target as a
    // hash map key may not be allowed due to CORS restrictions.
    const existingInstance = this.receivers.find(receiver => receiver.isListeningto(eventTarget));

    if (existingInstance) {
      return existingInstance;
    }

    const newInstance = new Receiver(eventTarget);
    this.receivers.push(newInstance);
    return newInstance;
  }

  isListeningto(eventTarget) {
    return this.eventTarget === eventTarget;
  }
  /**
   * Fans out a MessageEvent to the appropriate listeners.
   *
   * @remarks
   * Sends an {@link Status.ACK} upon receipt and a {@link Status.DONE} once all handlers have
   * finished processing.
   *
   * @param event - The MessageEvent.
   *
   */


  async handleEvent(event) {
    const messageEvent = event;
    const {
      eventId,
      eventType,
      data
    } = messageEvent.data;
    const handlers = this.handlersMap[eventType];

    if (!(handlers === null || handlers === void 0 ? void 0 : handlers.size)) {
      return;
    }

    messageEvent.ports[0].postMessage({
      status: "ack"
      /* ACK */
      ,
      eventId,
      eventType
    });
    const promises = Array.from(handlers).map(async handler => handler(messageEvent.origin, data));
    const response = await _allSettled(promises);
    messageEvent.ports[0].postMessage({
      status: "done"
      /* DONE */
      ,
      eventId,
      eventType,
      response
    });
  }
  /**
   * Subscribe an event handler for a particular event.
   *
   * @param eventType - Event name to subscribe to.
   * @param eventHandler - The event handler which should receive the events.
   *
   */


  _subscribe(eventType, eventHandler) {
    if (Object.keys(this.handlersMap).length === 0) {
      this.eventTarget.addEventListener('message', this.boundEventHandler);
    }

    if (!this.handlersMap[eventType]) {
      this.handlersMap[eventType] = new Set();
    }

    this.handlersMap[eventType].add(eventHandler);
  }
  /**
   * Unsubscribe an event handler from a particular event.
   *
   * @param eventType - Event name to unsubscribe from.
   * @param eventHandler - Optinoal event handler, if none provided, unsubscribe all handlers on this event.
   *
   */


  _unsubscribe(eventType, eventHandler) {
    if (this.handlersMap[eventType] && eventHandler) {
      this.handlersMap[eventType].delete(eventHandler);
    }

    if (!eventHandler || this.handlersMap[eventType].size === 0) {
      delete this.handlersMap[eventType];
    }

    if (Object.keys(this.handlersMap).length === 0) {
      this.eventTarget.removeEventListener('message', this.boundEventHandler);
    }
  }

}

Receiver.receivers = [];
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function _generateEventId(prefix = '', digits = 10) {
  let random = '';

  for (let i = 0; i < digits; i++) {
    random += Math.floor(Math.random() * 10);
  }

  return prefix + random;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Interface for sending messages and waiting for a completion response.
 *
 */


class Sender {
  constructor(target) {
    this.target = target;
    this.handlers = new Set();
  }
  /**
   * Unsubscribe the handler and remove it from our tracking Set.
   *
   * @param handler - The handler to unsubscribe.
   */


  removeMessageHandler(handler) {
    if (handler.messageChannel) {
      handler.messageChannel.port1.removeEventListener('message', handler.onMessage);
      handler.messageChannel.port1.close();
    }

    this.handlers.delete(handler);
  }
  /**
   * Send a message to the Receiver located at {@link target}.
   *
   * @remarks
   * We'll first wait a bit for an ACK , if we get one we will wait significantly longer until the
   * receiver has had a chance to fully process the event.
   *
   * @param eventType - Type of event to send.
   * @param data - The payload of the event.
   * @param timeout - Timeout for waiting on an ACK from the receiver.
   *
   * @returns An array of settled promises from all the handlers that were listening on the receiver.
   */


  async _send(eventType, data, timeout = 50
  /* ACK */
  ) {
    const messageChannel = typeof MessageChannel !== 'undefined' ? new MessageChannel() : null;

    if (!messageChannel) {
      throw new Error("connection_unavailable"
      /* CONNECTION_UNAVAILABLE */
      );
    } // Node timers and browser timers return fundamentally different types.
    // We don't actually care what the value is but TS won't accept unknown and
    // we can't cast properly in both environments.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any


    let completionTimer;
    let handler;
    return new Promise((resolve, reject) => {
      const eventId = _generateEventId('', 20);

      messageChannel.port1.start();
      const ackTimer = setTimeout(() => {
        reject(new Error("unsupported_event"
        /* UNSUPPORTED_EVENT */
        ));
      }, timeout);
      handler = {
        messageChannel,

        onMessage(event) {
          const messageEvent = event;

          if (messageEvent.data.eventId !== eventId) {
            return;
          }

          switch (messageEvent.data.status) {
            case "ack"
            /* ACK */
            :
              // The receiver should ACK first.
              clearTimeout(ackTimer);
              completionTimer = setTimeout(() => {
                reject(new Error("timeout"
                /* TIMEOUT */
                ));
              }, 3000
              /* COMPLETION */
              );
              break;

            case "done"
            /* DONE */
            :
              // Once the receiver's handlers are finished we will get the results.
              clearTimeout(completionTimer);
              resolve(messageEvent.data.response);
              break;

            default:
              clearTimeout(ackTimer);
              clearTimeout(completionTimer);
              reject(new Error("invalid_response"
              /* INVALID_RESPONSE */
              ));
              break;
          }
        }

      };
      this.handlers.add(handler);
      messageChannel.port1.addEventListener('message', handler.onMessage);
      this.target.postMessage({
        eventType,
        eventId,
        data
      }, [messageChannel.port2]);
    }).finally(() => {
      if (handler) {
        this.removeMessageHandler(handler);
      }
    });
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Lazy accessor for window, since the compat layer won't tree shake this out,
 * we need to make sure not to mess with window unless we have to
 */


function _window() {
  return window;
}

function _setWindowLocation(url) {
  _window().location.href = url;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function _isWorker() {
  return typeof _window()['WorkerGlobalScope'] !== 'undefined' && typeof _window()['importScripts'] === 'function';
}

async function _getActiveServiceWorker() {
  if (!(navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    return registration.active;
  } catch (_a) {
    return null;
  }
}

function _getServiceWorkerController() {
  var _a;

  return ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) || null;
}

function _getWorkerGlobalScope() {
  return _isWorker() ? self : null;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const DB_NAME = 'firebaseLocalStorageDb';
const DB_VERSION = 1;
const DB_OBJECTSTORE_NAME = 'firebaseLocalStorage';
const DB_DATA_KEYPATH = 'fbase_key';
/**
 * Promise wrapper for IDBRequest
 *
 * Unfortunately we can't cleanly extend Promise<T> since promises are not callable in ES6
 *
 */

class DBPromise {
  constructor(request) {
    this.request = request;
  }

  toPromise() {
    return new Promise((resolve, reject) => {
      this.request.addEventListener('success', () => {
        resolve(this.request.result);
      });
      this.request.addEventListener('error', () => {
        reject(this.request.error);
      });
    });
  }

}

function getObjectStore(db, isReadWrite) {
  return db.transaction([DB_OBJECTSTORE_NAME], isReadWrite ? 'readwrite' : 'readonly').objectStore(DB_OBJECTSTORE_NAME);
}

function _deleteDatabase() {
  const request = indexedDB.deleteDatabase(DB_NAME);
  return new DBPromise(request).toPromise();
}

function _openDatabase() {
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  return new Promise((resolve, reject) => {
    request.addEventListener('error', () => {
      reject(request.error);
    });
    request.addEventListener('upgradeneeded', () => {
      const db = request.result;

      try {
        db.createObjectStore(DB_OBJECTSTORE_NAME, {
          keyPath: DB_DATA_KEYPATH
        });
      } catch (e) {
        reject(e);
      }
    });
    request.addEventListener('success', async () => {
      const db = request.result; // Strange bug that occurs in Firefox when multiple tabs are opened at the
      // same time. The only way to recover seems to be deleting the database
      // and re-initializing it.
      // https://github.com/firebase/firebase-js-sdk/issues/634

      if (!db.objectStoreNames.contains(DB_OBJECTSTORE_NAME)) {
        // Need to close the database or else you get a `blocked` event
        db.close();
        await _deleteDatabase();
        resolve(await _openDatabase());
      } else {
        resolve(db);
      }
    });
  });
}

async function _putObject(db, key, value) {
  const request = getObjectStore(db, true).put({
    [DB_DATA_KEYPATH]: key,
    value
  });
  return new DBPromise(request).toPromise();
}

async function getObject(db, key) {
  const request = getObjectStore(db, false).get(key);
  const data = await new DBPromise(request).toPromise();
  return data === undefined ? null : data.value;
}

function _deleteObject(db, key) {
  const request = getObjectStore(db, true).delete(key);
  return new DBPromise(request).toPromise();
}

const _POLLING_INTERVAL_MS = 800;
const _TRANSACTION_RETRY_COUNT = 3;

class IndexedDBLocalPersistence {
  constructor() {
    this.type = "LOCAL"
    /* LOCAL */
    ;
    this._shouldAllowMigration = true;
    this.listeners = {};
    this.localCache = {}; // setTimeout return value is platform specific
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    this.pollTimer = null;
    this.pendingWrites = 0;
    this.receiver = null;
    this.sender = null;
    this.serviceWorkerReceiverAvailable = false;
    this.activeServiceWorker = null; // Fire & forget the service worker registration as it may never resolve

    this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {}, () => {});
  }

  async _openDb() {
    if (this.db) {
      return this.db;
    }

    this.db = await _openDatabase();
    return this.db;
  }

  async _withRetries(op) {
    let numAttempts = 0;

    while (true) {
      try {
        const db = await this._openDb();
        return await op(db);
      } catch (e) {
        if (numAttempts++ > _TRANSACTION_RETRY_COUNT) {
          throw e;
        }

        if (this.db) {
          this.db.close();
          this.db = undefined;
        } // TODO: consider adding exponential backoff

      }
    }
  }
  /**
   * IndexedDB events do not propagate from the main window to the worker context.  We rely on a
   * postMessage interface to send these events to the worker ourselves.
   */


  async initializeServiceWorkerMessaging() {
    return _isWorker() ? this.initializeReceiver() : this.initializeSender();
  }
  /**
   * As the worker we should listen to events from the main window.
   */


  async initializeReceiver() {
    this.receiver = Receiver._getInstance(_getWorkerGlobalScope()); // Refresh from persistence if we receive a KeyChanged message.

    this.receiver._subscribe("keyChanged"
    /* KEY_CHANGED */
    , async (_origin, data) => {
      const keys = await this._poll();
      return {
        keyProcessed: keys.includes(data.key)
      };
    }); // Let the sender know that we are listening so they give us more timeout.


    this.receiver._subscribe("ping"
    /* PING */
    , async (_origin, _data) => {
      return ["keyChanged"
      /* KEY_CHANGED */
      ];
    });
  }
  /**
   * As the main window, we should let the worker know when keys change (set and remove).
   *
   * @remarks
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready | ServiceWorkerContainer.ready}
   * may not resolve.
   */


  async initializeSender() {
    var _a, _b; // Check to see if there's an active service worker.


    this.activeServiceWorker = await _getActiveServiceWorker();

    if (!this.activeServiceWorker) {
      return;
    }

    this.sender = new Sender(this.activeServiceWorker); // Ping the service worker to check what events they can handle.

    const results = await this.sender._send("ping"
    /* PING */
    , {}, 800
    /* LONG_ACK */
    );

    if (!results) {
      return;
    }

    if (((_a = results[0]) === null || _a === void 0 ? void 0 : _a.fulfilled) && ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.value.includes("keyChanged"
    /* KEY_CHANGED */
    ))) {
      this.serviceWorkerReceiverAvailable = true;
    }
  }
  /**
   * Let the worker know about a changed key, the exact key doesn't technically matter since the
   * worker will just trigger a full sync anyway.
   *
   * @remarks
   * For now, we only support one service worker per page.
   *
   * @param key - Storage key which changed.
   */


  async notifyServiceWorker(key) {
    if (!this.sender || !this.activeServiceWorker || _getServiceWorkerController() !== this.activeServiceWorker) {
      return;
    }

    try {
      await this.sender._send("keyChanged"
      /* KEY_CHANGED */
      , {
        key
      }, // Use long timeout if receiver has previously responded to a ping from us.
      this.serviceWorkerReceiverAvailable ? 800
      /* LONG_ACK */
      : 50
      /* ACK */
      );
    } catch (_a) {// This is a best effort approach. Ignore errors.
    }
  }

  async _isAvailable() {
    try {
      if (!indexedDB) {
        return false;
      }

      const db = await _openDatabase();
      await _putObject(db, STORAGE_AVAILABLE_KEY, '1');
      await _deleteObject(db, STORAGE_AVAILABLE_KEY);
      return true;
    } catch (_a) {}

    return false;
  }

  async _withPendingWrite(write) {
    this.pendingWrites++;

    try {
      await write();
    } finally {
      this.pendingWrites--;
    }
  }

  async _set(key, value) {
    return this._withPendingWrite(async () => {
      await this._withRetries(db => _putObject(db, key, value));
      this.localCache[key] = value;
      return this.notifyServiceWorker(key);
    });
  }

  async _get(key) {
    const obj = await this._withRetries(db => getObject(db, key));
    this.localCache[key] = obj;
    return obj;
  }

  async _remove(key) {
    return this._withPendingWrite(async () => {
      await this._withRetries(db => _deleteObject(db, key));
      delete this.localCache[key];
      return this.notifyServiceWorker(key);
    });
  }

  async _poll() {
    // TODO: check if we need to fallback if getAll is not supported
    const result = await this._withRetries(db => {
      const getAllRequest = getObjectStore(db, false).getAll();
      return new DBPromise(getAllRequest).toPromise();
    });

    if (!result) {
      return [];
    } // If we have pending writes in progress abort, we'll get picked up on the next poll


    if (this.pendingWrites !== 0) {
      return [];
    }

    const keys = [];
    const keysInResult = new Set();

    for (const {
      fbase_key: key,
      value
    } of result) {
      keysInResult.add(key);

      if (JSON.stringify(this.localCache[key]) !== JSON.stringify(value)) {
        this.notifyListeners(key, value);
        keys.push(key);
      }
    }

    for (const localKey of Object.keys(this.localCache)) {
      if (this.localCache[localKey] && !keysInResult.has(localKey)) {
        // Deleted
        this.notifyListeners(localKey, null);
        keys.push(localKey);
      }
    }

    return keys;
  }

  notifyListeners(key, newValue) {
    this.localCache[key] = newValue;
    const listeners = this.listeners[key];

    if (listeners) {
      for (const listener of Array.from(listeners)) {
        listener(newValue);
      }
    }
  }

  startPolling() {
    this.stopPolling();
    this.pollTimer = setInterval(async () => this._poll(), _POLLING_INTERVAL_MS);
  }

  stopPolling() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  _addListener(key, listener) {
    if (Object.keys(this.listeners).length === 0) {
      this.startPolling();
    }

    if (!this.listeners[key]) {
      this.listeners[key] = new Set(); // Populate the cache to avoid spuriously triggering on first poll.

      void this._get(key); // This can happen in the background async and we can return immediately.
    }

    this.listeners[key].add(listener);
  }

  _removeListener(key, listener) {
    if (this.listeners[key]) {
      this.listeners[key].delete(listener);

      if (this.listeners[key].size === 0) {
        delete this.listeners[key];
      }
    }

    if (Object.keys(this.listeners).length === 0) {
      this.stopPolling();
    }
  }

}

IndexedDBLocalPersistence.type = 'LOCAL';
/**
 * An implementation of {@link Persistence} of type `LOCAL` using `indexedDB`
 * for the underlying storage.
 *
 * @public
 */

const indexedDBLocalPersistence = IndexedDBLocalPersistence;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.i = indexedDBLocalPersistence;

function startSignInPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v2/accounts/mfaSignIn:start"
  /* START_PHONE_MFA_SIGN_IN */
  , _addTidIfNecessary(auth, request));
}

function finalizeSignInPhoneMfa(auth, request) {
  return _performApiRequest(auth, "POST"
  /* POST */
  , "/v2/accounts/mfaSignIn:finalize"
  /* FINALIZE_PHONE_MFA_SIGN_IN */
  , _addTidIfNecessary(auth, request));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function getRecaptchaParams(auth) {
  return (await _performApiRequest(auth, "GET"
  /* GET */
  , "/v1/recaptchaParams"
  /* GET_RECAPTCHA_PARAM */
  )).recaptchaSiteKey || '';
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function getScriptParentElement() {
  var _a, _b;

  return (_b = (_a = document.getElementsByTagName('head')) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : document;
}

function _loadJS(url) {
  // TODO: consider adding timeout support & cancellation
  return new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.setAttribute('src', url);
    el.onload = resolve;

    el.onerror = e => {
      const error = _createError("internal-error"
      /* INTERNAL_ERROR */
      );

      error.customData = e;
      reject(error);
    };

    el.type = 'text/javascript';
    el.charset = 'UTF-8';
    getScriptParentElement().appendChild(el);
  });
}

function _generateCallbackName(prefix) {
  return `__${prefix}${Math.floor(Math.random() * 1000000)}`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const _SOLVE_TIME_MS = 500;
const _EXPIRATION_TIME_MS = 60000;
const _WIDGET_ID_START = 1000000000000;

class MockReCaptcha {
  constructor(auth) {
    this.auth = auth;
    this.counter = _WIDGET_ID_START;
    this._widgets = new Map();
  }

  render(container, parameters) {
    const id = this.counter;

    this._widgets.set(id, new MockWidget(container, this.auth.name, parameters || {}));

    this.counter++;
    return id;
  }

  reset(optWidgetId) {
    var _a;

    const id = optWidgetId || _WIDGET_ID_START;
    void ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.delete());

    this._widgets.delete(id);
  }

  getResponse(optWidgetId) {
    var _a;

    const id = optWidgetId || _WIDGET_ID_START;
    return ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.getResponse()) || '';
  }

  async execute(optWidgetId) {
    var _a;

    const id = optWidgetId || _WIDGET_ID_START;
    void ((_a = this._widgets.get(id)) === null || _a === void 0 ? void 0 : _a.execute());
    return '';
  }

}

class MockWidget {
  constructor(containerOrId, appName, params) {
    this.params = params;
    this.timerId = null;
    this.deleted = false;
    this.responseToken = null;

    this.clickHandler = () => {
      this.execute();
    };

    const container = typeof containerOrId === 'string' ? document.getElementById(containerOrId) : containerOrId;

    _assert(container, "argument-error"
    /* ARGUMENT_ERROR */
    , {
      appName
    });

    this.container = container;
    this.isVisible = this.params.size !== 'invisible';

    if (this.isVisible) {
      this.execute();
    } else {
      this.container.addEventListener('click', this.clickHandler);
    }
  }

  getResponse() {
    this.checkIfDeleted();
    return this.responseToken;
  }

  delete() {
    this.checkIfDeleted();
    this.deleted = true;

    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    this.container.removeEventListener('click', this.clickHandler);
  }

  execute() {
    this.checkIfDeleted();

    if (this.timerId) {
      return;
    }

    this.timerId = window.setTimeout(() => {
      this.responseToken = generateRandomAlphaNumericString(50);
      const {
        callback,
        'expired-callback': expiredCallback
      } = this.params;

      if (callback) {
        try {
          callback(this.responseToken);
        } catch (e) {}
      }

      this.timerId = window.setTimeout(() => {
        this.timerId = null;
        this.responseToken = null;

        if (expiredCallback) {
          try {
            expiredCallback();
          } catch (e) {}
        }

        if (this.isVisible) {
          this.execute();
        }
      }, _EXPIRATION_TIME_MS);
    }, _SOLVE_TIME_MS);
  }

  checkIfDeleted() {
    if (this.deleted) {
      throw new Error('reCAPTCHA mock was already deleted!');
    }
  }

}

function generateRandomAlphaNumericString(len) {
  const chars = [];
  const allowedChars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < len; i++) {
    chars.push(allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)));
  }

  return chars.join('');
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// ReCaptcha will load using the same callback, so the callback function needs
// to be kept around


const _JSLOAD_CALLBACK = _generateCallbackName('rcb');

const NETWORK_TIMEOUT_DELAY = new Delay(30000, 60000);
const RECAPTCHA_BASE = 'https://www.google.com/recaptcha/api.js?';
/**
 * Loader for the GReCaptcha library. There should only ever be one of this.
 */

class ReCaptchaLoaderImpl {
  constructor() {
    this.hostLanguage = '';
    this.counter = 0;
    this.librarySeparatelyLoaded = !!_window().grecaptcha;
  }

  load(auth, hl = '') {
    _assert(isHostLanguageValid(hl), auth, "argument-error"
    /* ARGUMENT_ERROR */
    );

    if (this.shouldResolveImmediately(hl)) {
      return Promise.resolve(_window().grecaptcha);
    }

    return new Promise((resolve, reject) => {
      const networkTimeout = _window().setTimeout(() => {
        reject(_createError(auth, "network-request-failed"
        /* NETWORK_REQUEST_FAILED */
        ));
      }, NETWORK_TIMEOUT_DELAY.get());

      _window()[_JSLOAD_CALLBACK] = () => {
        _window().clearTimeout(networkTimeout);

        delete _window()[_JSLOAD_CALLBACK];

        const recaptcha = _window().grecaptcha;

        if (!recaptcha) {
          reject(_createError(auth, "internal-error"
          /* INTERNAL_ERROR */
          ));
          return;
        } // Wrap the greptcha render function so that we know if the developer has
        // called it separately


        const render = recaptcha.render;

        recaptcha.render = (container, params) => {
          const widgetId = render(container, params);
          this.counter++;
          return widgetId;
        };

        this.hostLanguage = hl;
        resolve(recaptcha);
      };

      const url = `${RECAPTCHA_BASE}?${(0, _util.querystring)({
        onload: _JSLOAD_CALLBACK,
        render: 'explicit',
        hl
      })}`;

      _loadJS(url).catch(() => {
        clearTimeout(networkTimeout);
        reject(_createError(auth, "internal-error"
        /* INTERNAL_ERROR */
        ));
      });
    });
  }

  clearedOneInstance() {
    this.counter--;
  }

  shouldResolveImmediately(hl) {
    // We can resolve immediately if:
    //   • grecaptcha is already defined AND (
    //     1. the requested language codes are the same OR
    //     2. there exists already a ReCaptcha on the page
    //     3. the library was already loaded by the app
    // In cases (2) and (3), we _can't_ reload as it would break the recaptchas
    // that are already in the page
    return !!_window().grecaptcha && (hl === this.hostLanguage || this.counter > 0 || this.librarySeparatelyLoaded);
  }

}

function isHostLanguageValid(hl) {
  return hl.length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(hl);
}

class MockReCaptchaLoaderImpl {
  async load(auth) {
    return new MockReCaptcha(auth);
  }

  clearedOneInstance() {}

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const RECAPTCHA_VERIFIER_TYPE = 'recaptcha';
const DEFAULT_PARAMS = {
  theme: 'light',
  type: 'image'
};
/**
 * An {@link https://www.google.com/recaptcha/ | reCAPTCHA}-based application verifier.
 *
 * @public
 */

class RecaptchaVerifier {
  /**
   *
   * @param containerOrId - The reCAPTCHA container parameter.
   *
   * @remarks
   * This has different meaning depending on whether the reCAPTCHA is hidden or visible. For a
   * visible reCAPTCHA the container must be empty. If a string is used, it has to correspond to
   * an element ID. The corresponding element must also must be in the DOM at the time of
   * initialization.
   *
   * @param parameters - The optional reCAPTCHA parameters.
   *
   * @remarks
   * Check the reCAPTCHA docs for a comprehensive list. All parameters are accepted except for
   * the sitekey. Firebase Auth backend provisions a reCAPTCHA for each project and will
   * configure this upon rendering. For an invisible reCAPTCHA, a size key must have the value
   * 'invisible'.
   *
   * @param authExtern - The corresponding Firebase {@link Auth} instance.
   *
   * @remarks
   * If none is provided, the default Firebase {@link Auth} instance is used. A Firebase {@link Auth} instance
   * must be initialized with an API key, otherwise an error will be thrown.
   */
  constructor(containerOrId, parameters = Object.assign({}, DEFAULT_PARAMS), authExtern) {
    this.parameters = parameters;
    /**
     * The application verifier type.
     *
     * @remarks
     * For a reCAPTCHA verifier, this is 'recaptcha'.
     */

    this.type = RECAPTCHA_VERIFIER_TYPE;
    this.destroyed = false;
    this.widgetId = null;
    this.tokenChangeListeners = new Set();
    this.renderPromise = null;
    this.recaptcha = null;
    this.auth = _castAuth(authExtern);
    this.isInvisible = this.parameters.size === 'invisible';

    _assert(typeof document !== 'undefined', this.auth, "operation-not-supported-in-this-environment"
    /* OPERATION_NOT_SUPPORTED */
    );

    const container = typeof containerOrId === 'string' ? document.getElementById(containerOrId) : containerOrId;

    _assert(container, this.auth, "argument-error"
    /* ARGUMENT_ERROR */
    );

    this.container = container;
    this.parameters.callback = this.makeTokenCallback(this.parameters.callback);
    this._recaptchaLoader = this.auth.settings.appVerificationDisabledForTesting ? new MockReCaptchaLoaderImpl() : new ReCaptchaLoaderImpl();
    this.validateStartingState(); // TODO: Figure out if sdk version is needed
  }
  /**
   * Waits for the user to solve the reCAPTCHA and resolves with the reCAPTCHA token.
   *
   * @returns A Promise for the reCAPTCHA token.
   */


  async verify() {
    this.assertNotDestroyed();
    const id = await this.render();
    const recaptcha = this.getAssertedRecaptcha();
    const response = recaptcha.getResponse(id);

    if (response) {
      return response;
    }

    return new Promise(resolve => {
      const tokenChange = token => {
        if (!token) {
          return; // Ignore token expirations.
        }

        this.tokenChangeListeners.delete(tokenChange);
        resolve(token);
      };

      this.tokenChangeListeners.add(tokenChange);

      if (this.isInvisible) {
        recaptcha.execute(id);
      }
    });
  }
  /**
   * Renders the reCAPTCHA widget on the page.
   *
   * @returns A Promise that resolves with the reCAPTCHA widget ID.
   */


  render() {
    try {
      this.assertNotDestroyed();
    } catch (e) {
      // This method returns a promise. Since it's not async (we want to return the
      // _same_ promise if rendering is still occurring), the API surface should
      // reject with the error rather than just throw
      return Promise.reject(e);
    }

    if (this.renderPromise) {
      return this.renderPromise;
    }

    this.renderPromise = this.makeRenderPromise().catch(e => {
      this.renderPromise = null;
      throw e;
    });
    return this.renderPromise;
  }
  /** @internal */


  _reset() {
    this.assertNotDestroyed();

    if (this.widgetId !== null) {
      this.getAssertedRecaptcha().reset(this.widgetId);
    }
  }
  /**
   * Clears the reCAPTCHA widget from the page and destroys the instance.
   */


  clear() {
    this.assertNotDestroyed();
    this.destroyed = true;

    this._recaptchaLoader.clearedOneInstance();

    if (!this.isInvisible) {
      this.container.childNodes.forEach(node => {
        this.container.removeChild(node);
      });
    }
  }

  validateStartingState() {
    _assert(!this.parameters.sitekey, this.auth, "argument-error"
    /* ARGUMENT_ERROR */
    );

    _assert(this.isInvisible || !this.container.hasChildNodes(), this.auth, "argument-error"
    /* ARGUMENT_ERROR */
    );

    _assert(typeof document !== 'undefined', this.auth, "operation-not-supported-in-this-environment"
    /* OPERATION_NOT_SUPPORTED */
    );
  }

  makeTokenCallback(existing) {
    return token => {
      this.tokenChangeListeners.forEach(listener => listener(token));

      if (typeof existing === 'function') {
        existing(token);
      } else if (typeof existing === 'string') {
        const globalFunc = _window()[existing];

        if (typeof globalFunc === 'function') {
          globalFunc(token);
        }
      }
    };
  }

  assertNotDestroyed() {
    _assert(!this.destroyed, this.auth, "internal-error"
    /* INTERNAL_ERROR */
    );
  }

  async makeRenderPromise() {
    await this.init();

    if (!this.widgetId) {
      let container = this.container;

      if (!this.isInvisible) {
        const guaranteedEmpty = document.createElement('div');
        container.appendChild(guaranteedEmpty);
        container = guaranteedEmpty;
      }

      this.widgetId = this.getAssertedRecaptcha().render(container, this.parameters);
    }

    return this.widgetId;
  }

  async init() {
    _assert(_isHttpOrHttps() && !_isWorker(), this.auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    await domReady();
    this.recaptcha = await this._recaptchaLoader.load(this.auth, this.auth.languageCode || undefined);
    const siteKey = await getRecaptchaParams(this.auth);

    _assert(siteKey, this.auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    this.parameters.sitekey = siteKey;
  }

  getAssertedRecaptcha() {
    _assert(this.recaptcha, this.auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    return this.recaptcha;
  }

}

exports.R = RecaptchaVerifier;

function domReady() {
  let resolver = null;
  return new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve();
      return;
    } // Document not ready, wait for load before resolving.
    // Save resolver, so we can remove listener in case it was externally
    // cancelled.


    resolver = () => resolve();

    window.addEventListener('load', resolver);
  }).catch(e => {
    if (resolver) {
      window.removeEventListener('load', resolver);
    }

    throw e;
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class ConfirmationResultImpl {
  constructor(verificationId, onConfirmation) {
    this.verificationId = verificationId;
    this.onConfirmation = onConfirmation;
  }

  confirm(verificationCode) {
    const authCredential = PhoneAuthCredential._fromVerification(this.verificationId, verificationCode);

    return this.onConfirmation(authCredential);
  }

}
/**
 * Asynchronously signs in using a phone number.
 *
 * @remarks
 * This method sends a code via SMS to the given
 * phone number, and returns a {@link ConfirmationResult}. After the user
 * provides the code sent to their phone, call {@link ConfirmationResult.confirm}
 * with the code to sign the user in.
 *
 * For abuse prevention, this method also requires a {@link ApplicationVerifier}.
 * This SDK includes a reCAPTCHA-based implementation, {@link RecaptchaVerifier}.
 * This function can work on other platforms that do not support the
 * {@link RecaptchaVerifier} (like React Native), but you need to use a
 * third-party {@link ApplicationVerifier} implementation.
 *
 * @example
 * ```javascript
 * // 'recaptcha-container' is the ID of an element in the DOM.
 * const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
 * const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
 * // Obtain a verificationCode from the user.
 * const credential = await confirmationResult.confirm(verificationCode);
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
 * @param appVerifier - The {@link ApplicationVerifier}.
 *
 * @public
 */


async function signInWithPhoneNumber(auth, phoneNumber, appVerifier) {
  const authInternal = _castAuth(auth);

  const verificationId = await _verifyPhoneNumber(authInternal, phoneNumber, (0, _util.getModularInstance)(appVerifier));
  return new ConfirmationResultImpl(verificationId, cred => signInWithCredential(authInternal, cred));
}
/**
 * Links the user account with the given phone number.
 *
 * @param user - The user.
 * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
 * @param appVerifier - The {@link ApplicationVerifier}.
 *
 * @public
 */


async function linkWithPhoneNumber(user, phoneNumber, appVerifier) {
  const userInternal = (0, _util.getModularInstance)(user);
  await _assertLinkedStatus(false, userInternal, "phone"
  /* PHONE */
  );
  const verificationId = await _verifyPhoneNumber(userInternal.auth, phoneNumber, (0, _util.getModularInstance)(appVerifier));
  return new ConfirmationResultImpl(verificationId, cred => linkWithCredential(userInternal, cred));
}
/**
 * Re-authenticates a user using a fresh phone credential.
 *
 * @remarks Use before operations such as {@link updatePassword} that require tokens from recent sign-in attempts.
 *
 * @param user - The user.
 * @param phoneNumber - The user's phone number in E.164 format (e.g. +16505550101).
 * @param appVerifier - The {@link ApplicationVerifier}.
 *
 * @public
 */


async function reauthenticateWithPhoneNumber(user, phoneNumber, appVerifier) {
  const userInternal = (0, _util.getModularInstance)(user);
  const verificationId = await _verifyPhoneNumber(userInternal.auth, phoneNumber, (0, _util.getModularInstance)(appVerifier));
  return new ConfirmationResultImpl(verificationId, cred => reauthenticateWithCredential(userInternal, cred));
}
/**
 * Returns a verification ID to be used in conjunction with the SMS code that is sent.
 *
 */


async function _verifyPhoneNumber(auth, options, verifier) {
  var _a;

  const recaptchaToken = await verifier.verify();

  try {
    _assert(typeof recaptchaToken === 'string', auth, "argument-error"
    /* ARGUMENT_ERROR */
    );

    _assert(verifier.type === RECAPTCHA_VERIFIER_TYPE, auth, "argument-error"
    /* ARGUMENT_ERROR */
    );

    let phoneInfoOptions;

    if (typeof options === 'string') {
      phoneInfoOptions = {
        phoneNumber: options
      };
    } else {
      phoneInfoOptions = options;
    }

    if ('session' in phoneInfoOptions) {
      const session = phoneInfoOptions.session;

      if ('phoneNumber' in phoneInfoOptions) {
        _assert(session.type === "enroll"
        /* ENROLL */
        , auth, "internal-error"
        /* INTERNAL_ERROR */
        );

        const response = await startEnrollPhoneMfa(auth, {
          idToken: session.credential,
          phoneEnrollmentInfo: {
            phoneNumber: phoneInfoOptions.phoneNumber,
            recaptchaToken
          }
        });
        return response.phoneSessionInfo.sessionInfo;
      } else {
        _assert(session.type === "signin"
        /* SIGN_IN */
        , auth, "internal-error"
        /* INTERNAL_ERROR */
        );

        const mfaEnrollmentId = ((_a = phoneInfoOptions.multiFactorHint) === null || _a === void 0 ? void 0 : _a.uid) || phoneInfoOptions.multiFactorUid;

        _assert(mfaEnrollmentId, auth, "missing-multi-factor-info"
        /* MISSING_MFA_INFO */
        );

        const response = await startSignInPhoneMfa(auth, {
          mfaPendingCredential: session.credential,
          mfaEnrollmentId,
          phoneSignInInfo: {
            recaptchaToken
          }
        });
        return response.phoneResponseInfo.sessionInfo;
      }
    } else {
      const {
        sessionInfo
      } = await sendPhoneVerificationCode(auth, {
        phoneNumber: phoneInfoOptions.phoneNumber,
        recaptchaToken
      });
      return sessionInfo;
    }
  } finally {
    verifier._reset();
  }
}
/**
 * Updates the user's phone number.
 *
 * @example
 * ```
 * // 'recaptcha-container' is the ID of an element in the DOM.
 * const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
 * const provider = new PhoneAuthProvider(auth);
 * const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
 * // Obtain the verificationCode from the user.
 * const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
 * await updatePhoneNumber(user, phoneCredential);
 * ```
 *
 * @param user - The user.
 * @param credential - A credential authenticating the new phone number.
 *
 * @public
 */


async function updatePhoneNumber(user, credential) {
  await _link$1((0, _util.getModularInstance)(user), credential);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provider for generating an {@link PhoneAuthCredential}.
 *
 * @example
 * ```javascript
 * // 'recaptcha-container' is the ID of an element in the DOM.
 * const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
 * const provider = new PhoneAuthProvider(auth);
 * const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
 * // Obtain the verificationCode from the user.
 * const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
 * const userCredential = await signInWithCredential(auth, phoneCredential);
 * ```
 *
 * @public
 */


class PhoneAuthProvider {
  /**
   * @param auth - The Firebase {@link Auth} instance in which sign-ins should occur.
   *
   */
  constructor(auth) {
    /** Always set to {@link ProviderId}.PHONE. */
    this.providerId = PhoneAuthProvider.PROVIDER_ID;
    this.auth = _castAuth(auth);
  }
  /**
   *
   * Starts a phone number authentication flow by sending a verification code to the given phone
   * number.
   *
   * @example
   * ```javascript
   * const provider = new PhoneAuthProvider(auth);
   * const verificationId = await provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
   * // Obtain verificationCode from the user.
   * const authCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
   * const userCredential = await signInWithCredential(auth, authCredential);
   * ```
   *
   * @example
   * An alternative flow is provided using the `signInWithPhoneNumber` method.
   * ```javascript
   * const confirmationResult = signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
   * // Obtain verificationCode from the user.
   * const userCredential = confirmationResult.confirm(verificationCode);
   * ```
   *
   * @param phoneInfoOptions - The user's {@link PhoneInfoOptions}. The phone number should be in
   * E.164 format (e.g. +16505550101).
   * @param applicationVerifier - For abuse prevention, this method also requires a
   * {@link ApplicationVerifier}. This SDK includes a reCAPTCHA-based implementation,
   * {@link RecaptchaVerifier}.
   *
   * @returns A Promise for a verification ID that can be passed to
   * {@link PhoneAuthProvider.credential} to identify this flow..
   */


  verifyPhoneNumber(phoneOptions, applicationVerifier) {
    return _verifyPhoneNumber(this.auth, phoneOptions, (0, _util.getModularInstance)(applicationVerifier));
  }
  /**
   * Creates a phone auth credential, given the verification ID from
   * {@link PhoneAuthProvider.verifyPhoneNumber} and the code that was sent to the user's
   * mobile device.
   *
   * @example
   * ```javascript
   * const provider = new PhoneAuthProvider(auth);
   * const verificationId = provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
   * // Obtain verificationCode from the user.
   * const authCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
   * const userCredential = signInWithCredential(auth, authCredential);
   * ```
   *
   * @example
   * An alternative flow is provided using the `signInWithPhoneNumber` method.
   * ```javascript
   * const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
   * // Obtain verificationCode from the user.
   * const userCredential = await confirmationResult.confirm(verificationCode);
   * ```
   *
   * @param verificationId - The verification ID returned from {@link PhoneAuthProvider.verifyPhoneNumber}.
   * @param verificationCode - The verification code sent to the user's mobile device.
   *
   * @returns The auth provider credential.
   */


  static credential(verificationId, verificationCode) {
    return PhoneAuthCredential._fromVerification(verificationId, verificationCode);
  }
  /**
   * Generates an {@link AuthCredential} from a {@link UserCredential}.
   * @param userCredential - The user credential.
   */


  static credentialFromResult(userCredential) {
    const credential = userCredential;
    return PhoneAuthProvider.credentialFromTaggedObject(credential);
  }
  /**
   * Returns an {@link AuthCredential} when passed an error.
   *
   * @remarks
   *
   * This method works for errors like
   * `auth/account-exists-with-different-credentials`. This is useful for
   * recovering when attempting to set a user's phone number but the number
   * in question is already tied to another account. For example, the following
   * code tries to update the current user's phone number, and if that
   * fails, links the user with the account associated with that number:
   *
   * ```js
   * const provider = new PhoneAuthProvider(auth);
   * const verificationId = await provider.verifyPhoneNumber(number, verifier);
   * try {
   *   const code = ''; // Prompt the user for the verification code
   *   await updatePhoneNumber(
   *       auth.currentUser,
   *       PhoneAuthProvider.credential(verificationId, code));
   * } catch (e) {
   *   if (e.code === 'auth/account-exists-with-different-credential') {
   *     const cred = PhoneAuthProvider.credentialFromError(e);
   *     await linkWithCredential(auth.currentUser, cred);
   *   }
   * }
   *
   * // At this point, auth.currentUser.phoneNumber === number.
   * ```
   *
   * @param error - The error to generate a credential from.
   */


  static credentialFromError(error) {
    return PhoneAuthProvider.credentialFromTaggedObject(error.customData || {});
  }

  static credentialFromTaggedObject({
    _tokenResponse: tokenResponse
  }) {
    if (!tokenResponse) {
      return null;
    }

    const {
      phoneNumber,
      temporaryProof
    } = tokenResponse;

    if (phoneNumber && temporaryProof) {
      return PhoneAuthCredential._fromTokenResponse(phoneNumber, temporaryProof);
    }

    return null;
  }

}
/** Always set to {@link ProviderId}.PHONE. */


exports.P = PhoneAuthProvider;
PhoneAuthProvider.PROVIDER_ID = "phone"
/* PHONE */
;
/** Always set to {@link SignInMethod}.PHONE. */

PhoneAuthProvider.PHONE_SIGN_IN_METHOD = "phone"
/* PHONE */
;
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Chooses a popup/redirect resolver to use. This prefers the override (which
 * is directly passed in), and falls back to the property set on the auth
 * object. If neither are available, this function errors w/ an argument error.
 */

function _withDefaultResolver(auth, resolverOverride) {
  if (resolverOverride) {
    return _getInstance(resolverOverride);
  }

  _assert(auth._popupRedirectResolver, auth, "argument-error"
  /* ARGUMENT_ERROR */
  );

  return auth._popupRedirectResolver;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


class IdpCredential extends AuthCredential {
  constructor(params) {
    super("custom"
    /* CUSTOM */
    , "custom"
    /* CUSTOM */
    );
    this.params = params;
  }

  _getIdTokenResponse(auth) {
    return signInWithIdp(auth, this._buildIdpRequest());
  }

  _linkToIdToken(auth, idToken) {
    return signInWithIdp(auth, this._buildIdpRequest(idToken));
  }

  _getReauthenticationResolver(auth) {
    return signInWithIdp(auth, this._buildIdpRequest());
  }

  _buildIdpRequest(idToken) {
    const request = {
      requestUri: this.params.requestUri,
      sessionId: this.params.sessionId,
      postBody: this.params.postBody,
      tenantId: this.params.tenantId,
      pendingToken: this.params.pendingToken,
      returnSecureToken: true,
      returnIdpCredential: true
    };

    if (idToken) {
      request.idToken = idToken;
    }

    return request;
  }

}

function _signIn(params) {
  return _signInWithCredential(params.auth, new IdpCredential(params), params.bypassAuthState);
}

function _reauth(params) {
  const {
    auth,
    user
  } = params;

  _assert(user, auth, "internal-error"
  /* INTERNAL_ERROR */
  );

  return _reauthenticate(user, new IdpCredential(params), params.bypassAuthState);
}

async function _link(params) {
  const {
    auth,
    user
  } = params;

  _assert(user, auth, "internal-error"
  /* INTERNAL_ERROR */
  );

  return _link$1(user, new IdpCredential(params), params.bypassAuthState);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Popup event manager. Handles the popup's entire lifecycle; listens to auth
 * events
 */


class AbstractPopupRedirectOperation {
  constructor(auth, filter, resolver, user, bypassAuthState = false) {
    this.auth = auth;
    this.resolver = resolver;
    this.user = user;
    this.bypassAuthState = bypassAuthState;
    this.pendingPromise = null;
    this.eventManager = null;
    this.filter = Array.isArray(filter) ? filter : [filter];
  }

  execute() {
    return new Promise(async (resolve, reject) => {
      this.pendingPromise = {
        resolve,
        reject
      };

      try {
        this.eventManager = await this.resolver._initialize(this.auth);
        await this.onExecution();
        this.eventManager.registerConsumer(this);
      } catch (e) {
        this.reject(e);
      }
    });
  }

  async onAuthEvent(event) {
    const {
      urlResponse,
      sessionId,
      postBody,
      tenantId,
      error,
      type
    } = event;

    if (error) {
      this.reject(error);
      return;
    }

    const params = {
      auth: this.auth,
      requestUri: urlResponse,
      sessionId: sessionId,
      tenantId: tenantId || undefined,
      postBody: postBody || undefined,
      user: this.user,
      bypassAuthState: this.bypassAuthState
    };

    try {
      this.resolve(await this.getIdpTask(type)(params));
    } catch (e) {
      this.reject(e);
    }
  }

  onError(error) {
    this.reject(error);
  }

  getIdpTask(type) {
    switch (type) {
      case "signInViaPopup"
      /* SIGN_IN_VIA_POPUP */
      :
      case "signInViaRedirect"
      /* SIGN_IN_VIA_REDIRECT */
      :
        return _signIn;

      case "linkViaPopup"
      /* LINK_VIA_POPUP */
      :
      case "linkViaRedirect"
      /* LINK_VIA_REDIRECT */
      :
        return _link;

      case "reauthViaPopup"
      /* REAUTH_VIA_POPUP */
      :
      case "reauthViaRedirect"
      /* REAUTH_VIA_REDIRECT */
      :
        return _reauth;

      default:
        _fail(this.auth, "internal-error"
        /* INTERNAL_ERROR */
        );

    }
  }

  resolve(cred) {
    debugAssert(this.pendingPromise, 'Pending promise was never set');
    this.pendingPromise.resolve(cred);
    this.unregisterAndCleanUp();
  }

  reject(error) {
    debugAssert(this.pendingPromise, 'Pending promise was never set');
    this.pendingPromise.reject(error);
    this.unregisterAndCleanUp();
  }

  unregisterAndCleanUp() {
    if (this.eventManager) {
      this.eventManager.unregisterConsumer(this);
    }

    this.pendingPromise = null;
    this.cleanUp();
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const _POLL_WINDOW_CLOSE_TIMEOUT = new Delay(2000, 10000);
/**
 * Authenticates a Firebase client using a popup-based OAuth authentication flow.
 *
 * @remarks
 * If succeeds, returns the signed in user along with the provider's credential. If sign in was
 * unsuccessful, returns an error object containing additional information about the error.
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new FacebookAuthProvider();
 * const result = await signInWithPopup(auth, provider);
 *
 * // The signed-in user info.
 * const user = result.user;
 * // This gives you a Facebook Access Token.
 * const credential = provider.credentialFromResult(auth, result);
 * const token = credential.accessToken;
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 *
 * @public
 */


async function signInWithPopup(auth, provider, resolver) {
  const authInternal = _castAuth(auth);

  _assertInstanceOf(auth, provider, FederatedAuthProvider);

  const resolverInternal = _withDefaultResolver(authInternal, resolver);

  const action = new PopupOperation(authInternal, "signInViaPopup"
  /* SIGN_IN_VIA_POPUP */
  , provider, resolverInternal);
  return action.executeNotNull();
}
/**
 * Reauthenticates the current user with the specified {@link OAuthProvider} using a pop-up based
 * OAuth flow.
 *
 * @remarks
 * If the reauthentication is successful, the returned result will contain the user and the
 * provider's credential.
 *
 * @example
 * ```javascript
 * // Sign in using a popup.
 * const provider = new FacebookAuthProvider();
 * const result = await signInWithPopup(auth, provider);
 * // Reauthenticate using a popup.
 * await reauthenticateWithPopup(result.user, provider);
 * ```
 *
 * @param user - The user.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */


async function reauthenticateWithPopup(user, provider, resolver) {
  const userInternal = (0, _util.getModularInstance)(user);

  _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);

  const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);

  const action = new PopupOperation(userInternal.auth, "reauthViaPopup"
  /* REAUTH_VIA_POPUP */
  , provider, resolverInternal, userInternal);
  return action.executeNotNull();
}
/**
 * Links the authenticated provider to the user account using a pop-up based OAuth flow.
 *
 * @remarks
 * If the linking is successful, the returned result will contain the user and the provider's credential.
 *
 *
 * @example
 * ```javascript
 * // Sign in using some other provider.
 * const result = await signInWithEmailAndPassword(auth, email, password);
 * // Link using a popup.
 * const provider = new FacebookAuthProvider();
 * await linkWithPopup(result.user, provider);
 * ```
 *
 * @param user - The user.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */


async function linkWithPopup(user, provider, resolver) {
  const userInternal = (0, _util.getModularInstance)(user);

  _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider);

  const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);

  const action = new PopupOperation(userInternal.auth, "linkViaPopup"
  /* LINK_VIA_POPUP */
  , provider, resolverInternal, userInternal);
  return action.executeNotNull();
}
/**
 * Popup event manager. Handles the popup's entire lifecycle; listens to auth
 * events
 *
 */


class PopupOperation extends AbstractPopupRedirectOperation {
  constructor(auth, filter, provider, resolver, user) {
    super(auth, filter, resolver, user);
    this.provider = provider;
    this.authWindow = null;
    this.pollId = null;

    if (PopupOperation.currentPopupAction) {
      PopupOperation.currentPopupAction.cancel();
    }

    PopupOperation.currentPopupAction = this;
  }

  async executeNotNull() {
    const result = await this.execute();

    _assert(result, this.auth, "internal-error"
    /* INTERNAL_ERROR */
    );

    return result;
  }

  async onExecution() {
    debugAssert(this.filter.length === 1, 'Popup operations only handle one event');

    const eventId = _generateEventId();

    this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], // There's always one, see constructor
    eventId);
    this.authWindow.associatedEvent = eventId; // Check for web storage support and origin validation _after_ the popup is
    // loaded. These operations are slow (~1 second or so) Rather than
    // waiting on them before opening the window, optimistically open the popup
    // and check for storage support at the same time. If storage support is
    // not available, this will cause the whole thing to reject properly. It
    // will also close the popup, but since the promise has already rejected,
    // the popup closed by user poll will reject into the void.

    this.resolver._originValidation(this.auth).catch(e => {
      this.reject(e);
    });

    this.resolver._isIframeWebStorageSupported(this.auth, isSupported => {
      if (!isSupported) {
        this.reject(_createError(this.auth, "web-storage-unsupported"
        /* WEB_STORAGE_UNSUPPORTED */
        ));
      }
    }); // Handle user closure. Notice this does *not* use await


    this.pollUserCancellation();
  }

  get eventId() {
    var _a;

    return ((_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.associatedEvent) || null;
  }

  cancel() {
    this.reject(_createError(this.auth, "cancelled-popup-request"
    /* EXPIRED_POPUP_REQUEST */
    ));
  }

  cleanUp() {
    if (this.authWindow) {
      this.authWindow.close();
    }

    if (this.pollId) {
      window.clearTimeout(this.pollId);
    }

    this.authWindow = null;
    this.pollId = null;
    PopupOperation.currentPopupAction = null;
  }

  pollUserCancellation() {
    const poll = () => {
      var _a, _b;

      if ((_b = (_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.closed) {
        // Make sure that there is sufficient time for whatever action to
        // complete. The window could have closed but the sign in network
        // call could still be in flight.
        this.pollId = window.setTimeout(() => {
          this.pollId = null;
          this.reject(_createError(this.auth, "popup-closed-by-user"
          /* POPUP_CLOSED_BY_USER */
          ));
        }, 2000
        /* AUTH_EVENT */
        );
        return;
      }

      this.pollId = window.setTimeout(poll, _POLL_WINDOW_CLOSE_TIMEOUT.get());
    };

    poll();
  }

} // Only one popup is ever shown at once. The lifecycle of the current popup
// can be managed / cancelled by the constructor.


PopupOperation.currentPopupAction = null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const PENDING_REDIRECT_KEY = 'pendingRedirect'; // We only get one redirect outcome for any one auth, so just store it
// in here.

const redirectOutcomeMap = new Map();

class RedirectAction extends AbstractPopupRedirectOperation {
  constructor(auth, resolver, bypassAuthState = false) {
    super(auth, ["signInViaRedirect"
    /* SIGN_IN_VIA_REDIRECT */
    , "linkViaRedirect"
    /* LINK_VIA_REDIRECT */
    , "reauthViaRedirect"
    /* REAUTH_VIA_REDIRECT */
    , "unknown"
    /* UNKNOWN */
    ], resolver, undefined, bypassAuthState);
    this.eventId = null;
  }
  /**
   * Override the execute function; if we already have a redirect result, then
   * just return it.
   */


  async execute() {
    let readyOutcome = redirectOutcomeMap.get(this.auth._key());

    if (!readyOutcome) {
      try {
        const hasPendingRedirect = await _getAndClearPendingRedirectStatus(this.resolver, this.auth);
        const result = hasPendingRedirect ? await super.execute() : null;

        readyOutcome = () => Promise.resolve(result);
      } catch (e) {
        readyOutcome = () => Promise.reject(e);
      }

      redirectOutcomeMap.set(this.auth._key(), readyOutcome);
    } // If we're not bypassing auth state, the ready outcome should be set to
    // null.


    if (!this.bypassAuthState) {
      redirectOutcomeMap.set(this.auth._key(), () => Promise.resolve(null));
    }

    return readyOutcome();
  }

  async onAuthEvent(event) {
    if (event.type === "signInViaRedirect"
    /* SIGN_IN_VIA_REDIRECT */
    ) {
      return super.onAuthEvent(event);
    } else if (event.type === "unknown"
    /* UNKNOWN */
    ) {
      // This is a sentinel value indicating there's no pending redirect
      this.resolve(null);
      return;
    }

    if (event.eventId) {
      const user = await this.auth._redirectUserForId(event.eventId);

      if (user) {
        this.user = user;
        return super.onAuthEvent(event);
      } else {
        this.resolve(null);
      }
    }
  }

  async onExecution() {}

  cleanUp() {}

}

async function _getAndClearPendingRedirectStatus(resolver, auth) {
  const key = pendingRedirectKey(auth);
  const persistence = resolverPersistence(resolver);

  if (!(await persistence._isAvailable())) {
    return false;
  }

  const hasPendingRedirect = (await persistence._get(key)) === 'true';
  await persistence._remove(key);
  return hasPendingRedirect;
}

async function _setPendingRedirectStatus(resolver, auth) {
  return resolverPersistence(resolver)._set(pendingRedirectKey(auth), 'true');
}

function _clearRedirectOutcomes() {
  redirectOutcomeMap.clear();
}

function resolverPersistence(resolver) {
  return _getInstance(resolver._redirectPersistence);
}

function pendingRedirectKey(auth) {
  return _persistenceKeyName(PENDING_REDIRECT_KEY, auth.config.apiKey, auth.name);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Authenticates a Firebase client using a full-page redirect flow.
 *
 * @remarks
 * To handle the results and errors for this operation, refer to {@link getRedirectResult}.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new FacebookAuthProvider();
 * // You can add additional scopes to the provider:
 * provider.addScope('user_birthday');
 * // Start a sign in process for an unauthenticated user.
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Facebook Access Token.
 *   const credential = provider.credentialFromResult(auth, result);
 *   const token = credential.accessToken;
 * }
 * // As this API can be used for sign-in, linking and reauthentication,
 * // check the operationType to determine what triggered this redirect
 * // operation.
 * const operationType = result.operationType;
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */


function signInWithRedirect(auth, provider, resolver) {
  return _signInWithRedirect(auth, provider, resolver);
}

async function _signInWithRedirect(auth, provider, resolver) {
  const authInternal = _castAuth(auth);

  _assertInstanceOf(auth, provider, FederatedAuthProvider);

  const resolverInternal = _withDefaultResolver(authInternal, resolver);

  await _setPendingRedirectStatus(resolverInternal, authInternal);
  return resolverInternal._openRedirect(authInternal, provider, "signInViaRedirect"
  /* SIGN_IN_VIA_REDIRECT */
  );
}
/**
 * Reauthenticates the current user with the specified {@link OAuthProvider} using a full-page redirect flow.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new FacebookAuthProvider();
 * const result = await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * // Link using a redirect.
 * await linkWithRedirect(result.user, provider);
 * // This will again trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * ```
 *
 * @param user - The user.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */


function reauthenticateWithRedirect(user, provider, resolver) {
  return _reauthenticateWithRedirect(user, provider, resolver);
}

async function _reauthenticateWithRedirect(user, provider, resolver) {
  const userInternal = (0, _util.getModularInstance)(user);

  _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider); // Allow the resolver to error before persisting the redirect user


  const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);

  await _setPendingRedirectStatus(resolverInternal, userInternal.auth);
  const eventId = await prepareUserForRedirect(userInternal);
  return resolverInternal._openRedirect(userInternal.auth, provider, "reauthViaRedirect"
  /* REAUTH_VIA_REDIRECT */
  , eventId);
}
/**
 * Links the {@link OAuthProvider} to the user account using a full-page redirect flow.
 *
 * @example
 * ```javascript
 * // Sign in using some other provider.
 * const result = await signInWithEmailAndPassword(auth, email, password);
 * // Link using a redirect.
 * const provider = new FacebookAuthProvider();
 * await linkWithRedirect(result.user, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * ```
 *
 * @param user - The user.
 * @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
 * Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 *
 * @public
 */


function linkWithRedirect(user, provider, resolver) {
  return _linkWithRedirect(user, provider, resolver);
}

async function _linkWithRedirect(user, provider, resolver) {
  const userInternal = (0, _util.getModularInstance)(user);

  _assertInstanceOf(userInternal.auth, provider, FederatedAuthProvider); // Allow the resolver to error before persisting the redirect user


  const resolverInternal = _withDefaultResolver(userInternal.auth, resolver);

  await _assertLinkedStatus(false, userInternal, provider.providerId);
  await _setPendingRedirectStatus(resolverInternal, userInternal.auth);
  const eventId = await prepareUserForRedirect(userInternal);
  return resolverInternal._openRedirect(userInternal.auth, provider, "linkViaRedirect"
  /* LINK_VIA_REDIRECT */
  , eventId);
}
/**
 * Returns a {@link UserCredential} from the redirect-based sign-in flow.
 *
 * @remarks
 * If sign-in succeeded, returns the signed in user. If sign-in was unsuccessful, fails with an
 * error. If no redirect operation was called, returns a {@link UserCredential}
 * with a null `user`.
 *
 * @example
 * ```javascript
 * // Sign in using a redirect.
 * const provider = new FacebookAuthProvider();
 * // You can add additional scopes to the provider:
 * provider.addScope('user_birthday');
 * // Start a sign in process for an unauthenticated user.
 * await signInWithRedirect(auth, provider);
 * // This will trigger a full page redirect away from your app
 *
 * // After returning from the redirect when your app initializes you can obtain the result
 * const result = await getRedirectResult(auth);
 * if (result) {
 *   // This is the signed-in user
 *   const user = result.user;
 *   // This gives you a Facebook Access Token.
 *   const credential = provider.credentialFromResult(auth, result);
 *   const token = credential.accessToken;
 * }
 * // As this API can be used for sign-in, linking and reauthentication,
 * // check the operationType to determine what triggered this redirect
 * // operation.
 * const operationType = result.operationType;
 * ```
 *
 * @param auth - The {@link Auth} instance.
 * @param resolver - An instance of {@link PopupRedirectResolver}, optional
 * if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
 *
 * @public
 */


async function getRedirectResult(auth, resolver) {
  await _castAuth(auth)._initializationPromise;
  return _getRedirectResult(auth, resolver, false);
}

async function _getRedirectResult(auth, resolverExtern, bypassAuthState = false) {
  const authInternal = _castAuth(auth);

  const resolver = _withDefaultResolver(authInternal, resolverExtern);

  const action = new RedirectAction(authInternal, resolver, bypassAuthState);
  const result = await action.execute();

  if (result && !bypassAuthState) {
    delete result.user._redirectEventId;
    await authInternal._persistUserIfCurrent(result.user);
    await authInternal._setRedirectUser(null, resolverExtern);
  }

  return result;
}

async function prepareUserForRedirect(user) {
  const eventId = _generateEventId(`${user.uid}:::`);

  user._redirectEventId = eventId;
  await user.auth._setRedirectUser(user);
  await user.auth._persistUserIfCurrent(user);
  return eventId;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// The amount of time to store the UIDs of seen events; this is
// set to 10 min by default


const EVENT_DUPLICATION_CACHE_DURATION_MS = 10 * 60 * 1000;

class AuthEventManager {
  constructor(auth) {
    this.auth = auth;
    this.cachedEventUids = new Set();
    this.consumers = new Set();
    this.queuedRedirectEvent = null;
    this.hasHandledPotentialRedirect = false;
    this.lastProcessedEventTime = Date.now();
  }

  registerConsumer(authEventConsumer) {
    this.consumers.add(authEventConsumer);

    if (this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, authEventConsumer)) {
      this.sendToConsumer(this.queuedRedirectEvent, authEventConsumer);
      this.saveEventToCache(this.queuedRedirectEvent);
      this.queuedRedirectEvent = null;
    }
  }

  unregisterConsumer(authEventConsumer) {
    this.consumers.delete(authEventConsumer);
  }

  onEvent(event) {
    // Check if the event has already been handled
    if (this.hasEventBeenHandled(event)) {
      return false;
    }

    let handled = false;
    this.consumers.forEach(consumer => {
      if (this.isEventForConsumer(event, consumer)) {
        handled = true;
        this.sendToConsumer(event, consumer);
        this.saveEventToCache(event);
      }
    });

    if (this.hasHandledPotentialRedirect || !isRedirectEvent(event)) {
      // If we've already seen a redirect before, or this is a popup event,
      // bail now
      return handled;
    }

    this.hasHandledPotentialRedirect = true; // If the redirect wasn't handled, hang on to it

    if (!handled) {
      this.queuedRedirectEvent = event;
      handled = true;
    }

    return handled;
  }

  sendToConsumer(event, consumer) {
    var _a;

    if (event.error && !isNullRedirectEvent(event)) {
      const code = ((_a = event.error.code) === null || _a === void 0 ? void 0 : _a.split('auth/')[1]) || "internal-error"
      /* INTERNAL_ERROR */
      ;
      consumer.onError(_createError(this.auth, code));
    } else {
      consumer.onAuthEvent(event);
    }
  }

  isEventForConsumer(event, consumer) {
    const eventIdMatches = consumer.eventId === null || !!event.eventId && event.eventId === consumer.eventId;
    return consumer.filter.includes(event.type) && eventIdMatches;
  }

  hasEventBeenHandled(event) {
    if (Date.now() - this.lastProcessedEventTime >= EVENT_DUPLICATION_CACHE_DURATION_MS) {
      this.cachedEventUids.clear();
    }

    return this.cachedEventUids.has(eventUid(event));
  }

  saveEventToCache(event) {
    this.cachedEventUids.add(eventUid(event));
    this.lastProcessedEventTime = Date.now();
  }

}

exports.az = AuthEventManager;

function eventUid(e) {
  return [e.type, e.eventId, e.sessionId, e.tenantId].filter(v => v).join('-');
}

function isNullRedirectEvent({
  type,
  error
}) {
  return type === "unknown"
  /* UNKNOWN */
  && (error === null || error === void 0 ? void 0 : error.code) === `auth/${"no-auth-event"
  /* NO_AUTH_EVENT */
  }`;
}

function isRedirectEvent(event) {
  switch (event.type) {
    case "signInViaRedirect"
    /* SIGN_IN_VIA_REDIRECT */
    :
    case "linkViaRedirect"
    /* LINK_VIA_REDIRECT */
    :
    case "reauthViaRedirect"
    /* REAUTH_VIA_REDIRECT */
    :
      return true;

    case "unknown"
    /* UNKNOWN */
    :
      return isNullRedirectEvent(event);

    default:
      return false;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


async function _getProjectConfig(auth, request = {}) {
  return _performApiRequest(auth, "GET"
  /* GET */
  , "/v1/projects"
  /* GET_PROJECT_CONFIG */
  , request);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const IP_ADDRESS_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
const HTTP_REGEX = /^https?/;

async function _validateOrigin(auth) {
  // Skip origin validation if we are in an emulated environment
  if (auth.config.emulator) {
    return;
  }

  const {
    authorizedDomains
  } = await _getProjectConfig(auth);

  for (const domain of authorizedDomains) {
    try {
      if (matchDomain(domain)) {
        return;
      }
    } catch (_a) {// Do nothing if there's a URL error; just continue searching
    }
  } // In the old SDK, this error also provides helpful messages.


  _fail(auth, "unauthorized-domain"
  /* INVALID_ORIGIN */
  );
}

function matchDomain(expected) {
  const currentUrl = _getCurrentUrl();

  const {
    protocol,
    hostname
  } = new URL(currentUrl);

  if (expected.startsWith('chrome-extension://')) {
    const ceUrl = new URL(expected);

    if (ceUrl.hostname === '' && hostname === '') {
      // For some reason we're not parsing chrome URLs properly
      return protocol === 'chrome-extension:' && expected.replace('chrome-extension://', '') === currentUrl.replace('chrome-extension://', '');
    }

    return protocol === 'chrome-extension:' && ceUrl.hostname === hostname;
  }

  if (!HTTP_REGEX.test(protocol)) {
    return false;
  }

  if (IP_ADDRESS_REGEX.test(expected)) {
    // The domain has to be exactly equal to the pattern, as an IP domain will
    // only contain the IP, no extra character.
    return hostname === expected;
  } // Dots in pattern should be escaped.


  const escapedDomainPattern = expected.replace(/\./g, '\\.'); // Non ip address domains.
  // domain.com = *.domain.com OR domain.com

  const re = new RegExp('^(.+\\.' + escapedDomainPattern + '|' + escapedDomainPattern + ')$', 'i');
  return re.test(hostname);
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const NETWORK_TIMEOUT = new Delay(30000, 60000);
/**
 * Reset unlaoded GApi modules. If gapi.load fails due to a network error,
 * it will stop working after a retrial. This is a hack to fix this issue.
 */

function resetUnloadedGapiModules() {
  // Clear last failed gapi.load state to force next gapi.load to first
  // load the failed gapi.iframes module.
  // Get gapix.beacon context.
  const beacon = _window().___jsl; // Get current hint.


  if (beacon === null || beacon === void 0 ? void 0 : beacon.H) {
    // Get gapi hint.
    for (const hint of Object.keys(beacon.H)) {
      // Requested modules.
      beacon.H[hint].r = beacon.H[hint].r || []; // Loaded modules.

      beacon.H[hint].L = beacon.H[hint].L || []; // Set requested modules to a copy of the loaded modules.

      beacon.H[hint].r = [...beacon.H[hint].L]; // Clear pending callbacks.

      if (beacon.CP) {
        for (let i = 0; i < beacon.CP.length; i++) {
          // Remove all failed pending callbacks.
          beacon.CP[i] = null;
        }
      }
    }
  }
}

function loadGapi(auth) {
  return new Promise((resolve, reject) => {
    var _a, _b, _c; // Function to run when gapi.load is ready.


    function loadGapiIframe() {
      // The developer may have tried to previously run gapi.load and failed.
      // Run this to fix that.
      resetUnloadedGapiModules();
      gapi.load('gapi.iframes', {
        callback: () => {
          resolve(gapi.iframes.getContext());
        },
        ontimeout: () => {
          // The above reset may be sufficient, but having this reset after
          // failure ensures that if the developer calls gapi.load after the
          // connection is re-established and before another attempt to embed
          // the iframe, it would work and would not be broken because of our
          // failed attempt.
          // Timeout when gapi.iframes.Iframe not loaded.
          resetUnloadedGapiModules();
          reject(_createError(auth, "network-request-failed"
          /* NETWORK_REQUEST_FAILED */
          ));
        },
        timeout: NETWORK_TIMEOUT.get()
      });
    }

    if ((_b = (_a = _window().gapi) === null || _a === void 0 ? void 0 : _a.iframes) === null || _b === void 0 ? void 0 : _b.Iframe) {
      // If gapi.iframes.Iframe available, resolve.
      resolve(gapi.iframes.getContext());
    } else if (!!((_c = _window().gapi) === null || _c === void 0 ? void 0 : _c.load)) {
      // Gapi loader ready, load gapi.iframes.
      loadGapiIframe();
    } else {
      // Create a new iframe callback when this is called so as not to overwrite
      // any previous defined callback. This happens if this method is called
      // multiple times in parallel and could result in the later callback
      // overwriting the previous one. This would end up with a iframe
      // timeout.
      const cbName = _generateCallbackName('iframefcb'); // GApi loader not available, dynamically load platform.js.


      _window()[cbName] = () => {
        // GApi loader should be ready.
        if (!!gapi.load) {
          loadGapiIframe();
        } else {
          // Gapi loader failed, throw error.
          reject(_createError(auth, "network-request-failed"
          /* NETWORK_REQUEST_FAILED */
          ));
        }
      }; // Load GApi loader.


      return _loadJS(`https://apis.google.com/js/api.js?onload=${cbName}`).catch(e => reject(e));
    }
  }).catch(error => {
    // Reset cached promise to allow for retrial.
    cachedGApiLoader = null;
    throw error;
  });
}

let cachedGApiLoader = null;

function _loadGapi(auth) {
  cachedGApiLoader = cachedGApiLoader || loadGapi(auth);
  return cachedGApiLoader;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const PING_TIMEOUT = new Delay(5000, 15000);
const IFRAME_PATH = '__/auth/iframe';
const EMULATED_IFRAME_PATH = 'emulator/auth/iframe';
const IFRAME_ATTRIBUTES = {
  style: {
    position: 'absolute',
    top: '-100px',
    width: '1px',
    height: '1px'
  },
  'aria-hidden': 'true',
  tabindex: '-1'
}; // Map from apiHost to endpoint ID for passing into iframe. In current SDK, apiHost can be set to
// anything (not from a list of endpoints with IDs as in legacy), so this is the closest we can get.

const EID_FROM_APIHOST = new Map([["identitytoolkit.googleapis.com"
/* API_HOST */
, 'p'], ['staging-identitytoolkit.sandbox.googleapis.com', 's'], ['test-identitytoolkit.sandbox.googleapis.com', 't'] // test
]);

function getIframeUrl(auth) {
  const config = auth.config;

  _assert(config.authDomain, auth, "auth-domain-config-required"
  /* MISSING_AUTH_DOMAIN */
  );

  const url = config.emulator ? _emulatorUrl(config, EMULATED_IFRAME_PATH) : `https://${auth.config.authDomain}/${IFRAME_PATH}`;
  const params = {
    apiKey: config.apiKey,
    appName: auth.name,
    v: _app.SDK_VERSION
  };
  const eid = EID_FROM_APIHOST.get(auth.config.apiHost);

  if (eid) {
    params.eid = eid;
  }

  const frameworks = auth._getFrameworks();

  if (frameworks.length) {
    params.fw = frameworks.join(',');
  }

  return `${url}?${(0, _util.querystring)(params).slice(1)}`;
}

async function _openIframe(auth) {
  const context = await _loadGapi(auth);

  const gapi = _window().gapi;

  _assert(gapi, auth, "internal-error"
  /* INTERNAL_ERROR */
  );

  return context.open({
    where: document.body,
    url: getIframeUrl(auth),
    messageHandlersFilter: gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
    attributes: IFRAME_ATTRIBUTES,
    dontclear: true
  }, iframe => new Promise(async (resolve, reject) => {
    await iframe.restyle({
      // Prevent iframe from closing on mouse out.
      setHideOnLeave: false
    });

    const networkError = _createError(auth, "network-request-failed"
    /* NETWORK_REQUEST_FAILED */
    ); // Confirm iframe is correctly loaded.
    // To fallback on failure, set a timeout.


    const networkErrorTimer = _window().setTimeout(() => {
      reject(networkError);
    }, PING_TIMEOUT.get()); // Clear timer and resolve pending iframe ready promise.


    function clearTimerAndResolve() {
      _window().clearTimeout(networkErrorTimer);

      resolve(iframe);
    } // This returns an IThenable. However the reject part does not call
    // when the iframe is not loaded.


    iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve, () => {
      reject(networkError);
    });
  }));
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const BASE_POPUP_OPTIONS = {
  location: 'yes',
  resizable: 'yes',
  statusbar: 'yes',
  toolbar: 'no'
};
const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 600;
const TARGET_BLANK = '_blank';
const FIREFOX_EMPTY_URL = 'http://localhost';

class AuthPopup {
  constructor(window) {
    this.window = window;
    this.associatedEvent = null;
  }

  close() {
    if (this.window) {
      try {
        this.window.close();
      } catch (e) {}
    }
  }

}

exports.aH = AuthPopup;

function _open(auth, url, name, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
  const top = Math.max((window.screen.availHeight - height) / 2, 0).toString();
  const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
  let target = '';
  const options = Object.assign(Object.assign({}, BASE_POPUP_OPTIONS), {
    width: width.toString(),
    height: height.toString(),
    top,
    left
  }); // Chrome iOS 7 and 8 is returning an undefined popup win when target is
  // specified, even though the popup is not necessarily blocked.

  const ua = (0, _util.getUA)().toLowerCase();

  if (name) {
    target = _isChromeIOS(ua) ? TARGET_BLANK : name;
  }

  if (_isFirefox(ua)) {
    // Firefox complains when invalid URLs are popped out. Hacky way to bypass.
    url = url || FIREFOX_EMPTY_URL; // Firefox disables by default scrolling on popup windows, which can create
    // issues when the user has many Google accounts, for instance.

    options.scrollbars = 'yes';
  }

  const optionsString = Object.entries(options).reduce((accum, [key, value]) => `${accum}${key}=${value},`, '');

  if (_isIOSStandalone(ua) && target !== '_self') {
    openAsNewWindowIOS(url || '', target);
    return new AuthPopup(null);
  } // about:blank getting sanitized causing browsers like IE/Edge to display
  // brief error message before redirecting to handler.


  const newWin = window.open(url || '', target, optionsString);

  _assert(newWin, auth, "popup-blocked"
  /* POPUP_BLOCKED */
  ); // Flaky on IE edge, encapsulate with a try and catch.


  try {
    newWin.focus();
  } catch (e) {}

  return new AuthPopup(newWin);
}

function openAsNewWindowIOS(url, target) {
  const el = document.createElement('a');
  el.href = url;
  el.target = target;
  const click = document.createEvent('MouseEvent');
  click.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
  el.dispatchEvent(click);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * URL for Authentication widget which will initiate the OAuth handshake
 *
 * @internal
 */


const WIDGET_PATH = '__/auth/handler';
/**
 * URL for emulated environment
 *
 * @internal
 */

const EMULATOR_WIDGET_PATH = 'emulator/auth/handler';

function _getRedirectUrl(auth, provider, authType, redirectUrl, eventId, additionalParams) {
  _assert(auth.config.authDomain, auth, "auth-domain-config-required"
  /* MISSING_AUTH_DOMAIN */
  );

  _assert(auth.config.apiKey, auth, "invalid-api-key"
  /* INVALID_API_KEY */
  );

  const params = {
    apiKey: auth.config.apiKey,
    appName: auth.name,
    authType,
    redirectUrl,
    v: _app.SDK_VERSION,
    eventId
  };

  if (provider instanceof FederatedAuthProvider) {
    provider.setDefaultLanguage(auth.languageCode);
    params.providerId = provider.providerId || '';

    if (!(0, _util.isEmpty)(provider.getCustomParameters())) {
      params.customParameters = JSON.stringify(provider.getCustomParameters());
    } // TODO set additionalParams from the provider as well?


    for (const [key, value] of Object.entries(additionalParams || {})) {
      params[key] = value;
    }
  }

  if (provider instanceof BaseOAuthProvider) {
    const scopes = provider.getScopes().filter(scope => scope !== '');

    if (scopes.length > 0) {
      params.scopes = scopes.join(',');
    }
  }

  if (auth.tenantId) {
    params.tid = auth.tenantId;
  } // TODO: maybe set eid as endipointId
  // TODO: maybe set fw as Frameworks.join(",")


  const paramsDict = params;

  for (const key of Object.keys(paramsDict)) {
    if (paramsDict[key] === undefined) {
      delete paramsDict[key];
    }
  }

  return `${getHandlerBase(auth)}?${(0, _util.querystring)(paramsDict).slice(1)}`;
}

function getHandlerBase({
  config
}) {
  if (!config.emulator) {
    return `https://${config.authDomain}/${WIDGET_PATH}`;
  }

  return _emulatorUrl(config, EMULATOR_WIDGET_PATH);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The special web storage event
 *
 */


const WEB_STORAGE_SUPPORT_KEY = 'webStorageSupport';

class BrowserPopupRedirectResolver {
  constructor() {
    this.eventManagers = {};
    this.iframes = {};
    this.originValidationPromises = {};
    this._redirectPersistence = browserSessionPersistence;
    this._completeRedirectFn = _getRedirectResult;
  } // Wrapping in async even though we don't await anywhere in order
  // to make sure errors are raised as promise rejections


  async _openPopup(auth, provider, authType, eventId) {
    var _a;

    debugAssert((_a = this.eventManagers[auth._key()]) === null || _a === void 0 ? void 0 : _a.manager, '_initialize() not called before _openPopup()');

    const url = _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId);

    return _open(auth, url, _generateEventId());
  }

  async _openRedirect(auth, provider, authType, eventId) {
    await this._originValidation(auth);

    _setWindowLocation(_getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId));

    return new Promise(() => {});
  }

  _initialize(auth) {
    const key = auth._key();

    if (this.eventManagers[key]) {
      const {
        manager,
        promise
      } = this.eventManagers[key];

      if (manager) {
        return Promise.resolve(manager);
      } else {
        debugAssert(promise, 'If manager is not set, promise should be');
        return promise;
      }
    }

    const promise = this.initAndGetManager(auth);
    this.eventManagers[key] = {
      promise
    }; // If the promise is rejected, the key should be removed so that the
    // operation can be retried later.

    promise.catch(() => {
      delete this.eventManagers[key];
    });
    return promise;
  }

  async initAndGetManager(auth) {
    const iframe = await _openIframe(auth);
    const manager = new AuthEventManager(auth);
    iframe.register('authEvent', iframeEvent => {
      _assert(iframeEvent === null || iframeEvent === void 0 ? void 0 : iframeEvent.authEvent, auth, "invalid-auth-event"
      /* INVALID_AUTH_EVENT */
      ); // TODO: Consider splitting redirect and popup events earlier on


      const handled = manager.onEvent(iframeEvent.authEvent);
      return {
        status: handled ? "ACK"
        /* ACK */
        : "ERROR"
        /* ERROR */

      };
    }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
    this.eventManagers[auth._key()] = {
      manager
    };
    this.iframes[auth._key()] = iframe;
    return manager;
  }

  _isIframeWebStorageSupported(auth, cb) {
    const iframe = this.iframes[auth._key()];

    iframe.send(WEB_STORAGE_SUPPORT_KEY, {
      type: WEB_STORAGE_SUPPORT_KEY
    }, result => {
      var _a;

      const isSupported = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a[WEB_STORAGE_SUPPORT_KEY];

      if (isSupported !== undefined) {
        cb(!!isSupported);
      }

      _fail(auth, "internal-error"
      /* INTERNAL_ERROR */
      );
    }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
  }

  _originValidation(auth) {
    const key = auth._key();

    if (!this.originValidationPromises[key]) {
      this.originValidationPromises[key] = _validateOrigin(auth);
    }

    return this.originValidationPromises[key];
  }

  get _shouldInitProactively() {
    // Mobile browsers and Safari need to optimistically initialize
    return _isMobileBrowser() || _isSafari() || _isIOS();
  }

}
/**
 * An implementation of {@link PopupRedirectResolver} suitable for browser
 * based applications.
 *
 * @public
 */


const browserPopupRedirectResolver = BrowserPopupRedirectResolver;
exports.k = browserPopupRedirectResolver;

class MultiFactorAssertionImpl {
  constructor(factorId) {
    this.factorId = factorId;
  }

  _process(auth, session, displayName) {
    switch (session.type) {
      case "enroll"
      /* ENROLL */
      :
        return this._finalizeEnroll(auth, session.credential, displayName);

      case "signin"
      /* SIGN_IN */
      :
        return this._finalizeSignIn(auth, session.credential);

      default:
        return debugFail('unexpected MultiFactorSessionType');
    }
  }

}
/**
 * {@inheritdoc PhoneMultiFactorAssertion}
 *
 * @public
 */


class PhoneMultiFactorAssertionImpl extends MultiFactorAssertionImpl {
  constructor(credential) {
    super("phone"
    /* PHONE */
    );
    this.credential = credential;
  }
  /** @internal */


  static _fromCredential(credential) {
    return new PhoneMultiFactorAssertionImpl(credential);
  }
  /** @internal */


  _finalizeEnroll(auth, idToken, displayName) {
    return finalizeEnrollPhoneMfa(auth, {
      idToken,
      displayName,
      phoneVerificationInfo: this.credential._makeVerificationRequest()
    });
  }
  /** @internal */


  _finalizeSignIn(auth, mfaPendingCredential) {
    return finalizeSignInPhoneMfa(auth, {
      mfaPendingCredential,
      phoneVerificationInfo: this.credential._makeVerificationRequest()
    });
  }

}
/**
 * Provider for generating a {@link PhoneMultiFactorAssertion}.
 *
 * @public
 */


class PhoneMultiFactorGenerator {
  constructor() {}
  /**
   * Provides a {@link PhoneMultiFactorAssertion} to confirm ownership of the phone second factor.
   *
   * @param phoneAuthCredential - A credential provided by {@link PhoneAuthProvider.credential}.
   * @returns A {@link PhoneMultiFactorAssertion} which can be used with
   * {@link MultiFactorResolver.resolveSignIn}
   */


  static assertion(credential) {
    return PhoneMultiFactorAssertionImpl._fromCredential(credential);
  }

}
/**
 * The identifier of the phone second factor: `phone`.
 */


exports.m = PhoneMultiFactorGenerator;
PhoneMultiFactorGenerator.FACTOR_ID = 'phone';
var name = "@firebase/auth";
var version = "0.19.4";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class AuthInterop {
  constructor(auth) {
    this.auth = auth;
    this.internalListeners = new Map();
  }

  getUid() {
    var _a;

    this.assertAuthConfigured();
    return ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || null;
  }

  async getToken(forceRefresh) {
    this.assertAuthConfigured();
    await this.auth._initializationPromise;

    if (!this.auth.currentUser) {
      return null;
    }

    const accessToken = await this.auth.currentUser.getIdToken(forceRefresh);
    return {
      accessToken
    };
  }

  addAuthTokenListener(listener) {
    this.assertAuthConfigured();

    if (this.internalListeners.has(listener)) {
      return;
    }

    const unsubscribe = this.auth.onIdTokenChanged(user => {
      var _a;

      listener(((_a = user) === null || _a === void 0 ? void 0 : _a.stsTokenManager.accessToken) || null);
    });
    this.internalListeners.set(listener, unsubscribe);
    this.updateProactiveRefresh();
  }

  removeAuthTokenListener(listener) {
    this.assertAuthConfigured();
    const unsubscribe = this.internalListeners.get(listener);

    if (!unsubscribe) {
      return;
    }

    this.internalListeners.delete(listener);
    unsubscribe();
    this.updateProactiveRefresh();
  }

  assertAuthConfigured() {
    _assert(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth"
    /* DEPENDENT_SDK_INIT_BEFORE_AUTH */
    );
  }

  updateProactiveRefresh() {
    if (this.internalListeners.size > 0) {
      this.auth._startProactiveRefresh();
    } else {
      this.auth._stopProactiveRefresh();
    }
  }

}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function getVersionForPlatform(clientPlatform) {
  switch (clientPlatform) {
    case "Node"
    /* NODE */
    :
      return 'node';

    case "ReactNative"
    /* REACT_NATIVE */
    :
      return 'rn';

    case "Worker"
    /* WORKER */
    :
      return 'webworker';

    case "Cordova"
    /* CORDOVA */
    :
      return 'cordova';

    default:
      return undefined;
  }
}
/** @internal */


function registerAuth(clientPlatform) {
  (0, _app._registerComponent)(new _component.Component("auth"
  /* AUTH */
  , (container, {
    options: deps
  }) => {
    const app = container.getProvider('app').getImmediate();
    const {
      apiKey,
      authDomain
    } = app.options;
    return (app => {
      _assert(apiKey && !apiKey.includes(':'), "invalid-api-key"
      /* INVALID_API_KEY */
      , {
        appName: app.name
      }); // Auth domain is optional if IdP sign in isn't being used


      _assert(!(authDomain === null || authDomain === void 0 ? void 0 : authDomain.includes(':')), "argument-error"
      /* ARGUMENT_ERROR */
      , {
        appName: app.name
      });

      const config = {
        apiKey,
        authDomain,
        clientPlatform,
        apiHost: "identitytoolkit.googleapis.com"
        /* API_HOST */
        ,
        tokenApiHost: "securetoken.googleapis.com"
        /* TOKEN_API_HOST */
        ,
        apiScheme: "https"
        /* API_SCHEME */
        ,
        sdkClientVersion: _getClientVersion(clientPlatform)
      };
      const authInstance = new AuthImpl(app, config);

      _initializeAuthInstance(authInstance, deps);

      return authInstance;
    })(app);
  }, "PUBLIC"
  /* PUBLIC */
  )
  /**
   * Auth can only be initialized by explicitly calling getAuth() or initializeAuth()
   * For why we do this, See go/firebase-next-auth-init
   */
  .setInstantiationMode("EXPLICIT"
  /* EXPLICIT */
  )
  /**
   * Because all firebase products that depend on auth depend on auth-internal directly,
   * we need to initialize auth-internal after auth is initialized to make it available to other firebase products.
   */
  .setInstanceCreatedCallback((container, _instanceIdentifier, _instance) => {
    const authInternalProvider = container.getProvider("auth-internal"
    /* AUTH_INTERNAL */
    );
    authInternalProvider.initialize();
  }));
  (0, _app._registerComponent)(new _component.Component("auth-internal"
  /* AUTH_INTERNAL */
  , container => {
    const auth = _castAuth(container.getProvider("auth"
    /* AUTH */
    ).getImmediate());

    return (auth => new AuthInterop(auth))(auth);
  }, "PRIVATE"
  /* PRIVATE */
  ).setInstantiationMode("EXPLICIT"
  /* EXPLICIT */
  ));
  (0, _app.registerVersion)(name, version, getVersionForPlatform(clientPlatform)); // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation

  (0, _app.registerVersion)(name, version, 'esm2017');
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns the Auth instance associated with the provided {@link @firebase/app#FirebaseApp}.
 * If no instance exists, initializes an Auth instance with platform-specific default dependencies.
 *
 * @param app - The Firebase App.
 *
 * @public
 */


function getAuth(app = (0, _app.getApp)()) {
  const provider = (0, _app._getProvider)(app, 'auth');

  if (provider.isInitialized()) {
    return provider.getImmediate();
  }

  return initializeAuth(app, {
    popupRedirectResolver: browserPopupRedirectResolver,
    persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence]
  });
}

registerAuth("Browser"
/* BROWSER */
);
},{"@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js","@firebase/app":"../node_modules/@firebase/app/dist/esm/index.esm2017.js","tslib":"../node_modules/tslib/tslib.es6.js","@firebase/logger":"../node_modules/@firebase/logger/dist/esm/index.esm2017.js","@firebase/component":"../node_modules/@firebase/component/dist/esm/index.esm2017.js"}],"../node_modules/@firebase/auth/dist/esm2017/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ActionCodeOperation", {
  enumerable: true,
  get: function () {
    return _index839de.A;
  }
});
Object.defineProperty(exports, "ActionCodeURL", {
  enumerable: true,
  get: function () {
    return _index839de.ac;
  }
});
Object.defineProperty(exports, "AuthCredential", {
  enumerable: true,
  get: function () {
    return _index839de.G;
  }
});
Object.defineProperty(exports, "AuthErrorCodes", {
  enumerable: true,
  get: function () {
    return _index839de.C;
  }
});
Object.defineProperty(exports, "EmailAuthCredential", {
  enumerable: true,
  get: function () {
    return _index839de.H;
  }
});
Object.defineProperty(exports, "EmailAuthProvider", {
  enumerable: true,
  get: function () {
    return _index839de.L;
  }
});
Object.defineProperty(exports, "FacebookAuthProvider", {
  enumerable: true,
  get: function () {
    return _index839de.M;
  }
});
Object.defineProperty(exports, "FactorId", {
  enumerable: true,
  get: function () {
    return _index839de.F;
  }
});
Object.defineProperty(exports, "GithubAuthProvider", {
  enumerable: true,
  get: function () {
    return _index839de.Q;
  }
});
Object.defineProperty(exports, "GoogleAuthProvider", {
  enumerable: true,
  get: function () {
    return _index839de.N;
  }
});
Object.defineProperty(exports, "OAuthCredential", {
  enumerable: true,
  get: function () {
    return _index839de.I;
  }
});
Object.defineProperty(exports, "OAuthProvider", {
  enumerable: true,
  get: function () {
    return _index839de.T;
  }
});
Object.defineProperty(exports, "OperationType", {
  enumerable: true,
  get: function () {
    return _index839de.O;
  }
});
Object.defineProperty(exports, "PhoneAuthCredential", {
  enumerable: true,
  get: function () {
    return _index839de.J;
  }
});
Object.defineProperty(exports, "PhoneAuthProvider", {
  enumerable: true,
  get: function () {
    return _index839de.P;
  }
});
Object.defineProperty(exports, "PhoneMultiFactorGenerator", {
  enumerable: true,
  get: function () {
    return _index839de.m;
  }
});
Object.defineProperty(exports, "ProviderId", {
  enumerable: true,
  get: function () {
    return _index839de.o;
  }
});
Object.defineProperty(exports, "RecaptchaVerifier", {
  enumerable: true,
  get: function () {
    return _index839de.R;
  }
});
Object.defineProperty(exports, "SAMLAuthProvider", {
  enumerable: true,
  get: function () {
    return _index839de.U;
  }
});
Object.defineProperty(exports, "SignInMethod", {
  enumerable: true,
  get: function () {
    return _index839de.S;
  }
});
Object.defineProperty(exports, "TwitterAuthProvider", {
  enumerable: true,
  get: function () {
    return _index839de.V;
  }
});
Object.defineProperty(exports, "applyActionCode", {
  enumerable: true,
  get: function () {
    return _index839de.a1;
  }
});
Object.defineProperty(exports, "browserLocalPersistence", {
  enumerable: true,
  get: function () {
    return _index839de.b;
  }
});
Object.defineProperty(exports, "browserPopupRedirectResolver", {
  enumerable: true,
  get: function () {
    return _index839de.k;
  }
});
Object.defineProperty(exports, "browserSessionPersistence", {
  enumerable: true,
  get: function () {
    return _index839de.a;
  }
});
Object.defineProperty(exports, "checkActionCode", {
  enumerable: true,
  get: function () {
    return _index839de.a2;
  }
});
Object.defineProperty(exports, "confirmPasswordReset", {
  enumerable: true,
  get: function () {
    return _index839de.a0;
  }
});
Object.defineProperty(exports, "connectAuthEmulator", {
  enumerable: true,
  get: function () {
    return _index839de.E;
  }
});
Object.defineProperty(exports, "createUserWithEmailAndPassword", {
  enumerable: true,
  get: function () {
    return _index839de.a4;
  }
});
Object.defineProperty(exports, "debugErrorMap", {
  enumerable: true,
  get: function () {
    return _index839de.z;
  }
});
Object.defineProperty(exports, "deleteUser", {
  enumerable: true,
  get: function () {
    return _index839de.y;
  }
});
Object.defineProperty(exports, "fetchSignInMethodsForEmail", {
  enumerable: true,
  get: function () {
    return _index839de.a9;
  }
});
Object.defineProperty(exports, "getAdditionalUserInfo", {
  enumerable: true,
  get: function () {
    return _index839de.ak;
  }
});
Object.defineProperty(exports, "getAuth", {
  enumerable: true,
  get: function () {
    return _index839de.n;
  }
});
Object.defineProperty(exports, "getIdToken", {
  enumerable: true,
  get: function () {
    return _index839de.ah;
  }
});
Object.defineProperty(exports, "getIdTokenResult", {
  enumerable: true,
  get: function () {
    return _index839de.ai;
  }
});
Object.defineProperty(exports, "getMultiFactorResolver", {
  enumerable: true,
  get: function () {
    return _index839de.am;
  }
});
Object.defineProperty(exports, "getRedirectResult", {
  enumerable: true,
  get: function () {
    return _index839de.j;
  }
});
Object.defineProperty(exports, "inMemoryPersistence", {
  enumerable: true,
  get: function () {
    return _index839de.K;
  }
});
Object.defineProperty(exports, "indexedDBLocalPersistence", {
  enumerable: true,
  get: function () {
    return _index839de.i;
  }
});
Object.defineProperty(exports, "initializeAuth", {
  enumerable: true,
  get: function () {
    return _index839de.D;
  }
});
Object.defineProperty(exports, "isSignInWithEmailLink", {
  enumerable: true,
  get: function () {
    return _index839de.a7;
  }
});
Object.defineProperty(exports, "linkWithCredential", {
  enumerable: true,
  get: function () {
    return _index839de.Y;
  }
});
Object.defineProperty(exports, "linkWithPhoneNumber", {
  enumerable: true,
  get: function () {
    return _index839de.l;
  }
});
Object.defineProperty(exports, "linkWithPopup", {
  enumerable: true,
  get: function () {
    return _index839de.d;
  }
});
Object.defineProperty(exports, "linkWithRedirect", {
  enumerable: true,
  get: function () {
    return _index839de.g;
  }
});
Object.defineProperty(exports, "multiFactor", {
  enumerable: true,
  get: function () {
    return _index839de.an;
  }
});
Object.defineProperty(exports, "onAuthStateChanged", {
  enumerable: true,
  get: function () {
    return _index839de.t;
  }
});
Object.defineProperty(exports, "onIdTokenChanged", {
  enumerable: true,
  get: function () {
    return _index839de.q;
  }
});
Object.defineProperty(exports, "parseActionCodeURL", {
  enumerable: true,
  get: function () {
    return _index839de.ad;
  }
});
Object.defineProperty(exports, "prodErrorMap", {
  enumerable: true,
  get: function () {
    return _index839de.B;
  }
});
Object.defineProperty(exports, "reauthenticateWithCredential", {
  enumerable: true,
  get: function () {
    return _index839de.Z;
  }
});
Object.defineProperty(exports, "reauthenticateWithPhoneNumber", {
  enumerable: true,
  get: function () {
    return _index839de.r;
  }
});
Object.defineProperty(exports, "reauthenticateWithPopup", {
  enumerable: true,
  get: function () {
    return _index839de.e;
  }
});
Object.defineProperty(exports, "reauthenticateWithRedirect", {
  enumerable: true,
  get: function () {
    return _index839de.h;
  }
});
Object.defineProperty(exports, "reload", {
  enumerable: true,
  get: function () {
    return _index839de.al;
  }
});
Object.defineProperty(exports, "sendEmailVerification", {
  enumerable: true,
  get: function () {
    return _index839de.aa;
  }
});
Object.defineProperty(exports, "sendPasswordResetEmail", {
  enumerable: true,
  get: function () {
    return _index839de.$;
  }
});
Object.defineProperty(exports, "sendSignInLinkToEmail", {
  enumerable: true,
  get: function () {
    return _index839de.a6;
  }
});
Object.defineProperty(exports, "setPersistence", {
  enumerable: true,
  get: function () {
    return _index839de.p;
  }
});
Object.defineProperty(exports, "signInAnonymously", {
  enumerable: true,
  get: function () {
    return _index839de.W;
  }
});
Object.defineProperty(exports, "signInWithCredential", {
  enumerable: true,
  get: function () {
    return _index839de.X;
  }
});
Object.defineProperty(exports, "signInWithCustomToken", {
  enumerable: true,
  get: function () {
    return _index839de._;
  }
});
Object.defineProperty(exports, "signInWithEmailAndPassword", {
  enumerable: true,
  get: function () {
    return _index839de.a5;
  }
});
Object.defineProperty(exports, "signInWithEmailLink", {
  enumerable: true,
  get: function () {
    return _index839de.a8;
  }
});
Object.defineProperty(exports, "signInWithPhoneNumber", {
  enumerable: true,
  get: function () {
    return _index839de.s;
  }
});
Object.defineProperty(exports, "signInWithPopup", {
  enumerable: true,
  get: function () {
    return _index839de.c;
  }
});
Object.defineProperty(exports, "signInWithRedirect", {
  enumerable: true,
  get: function () {
    return _index839de.f;
  }
});
Object.defineProperty(exports, "signOut", {
  enumerable: true,
  get: function () {
    return _index839de.x;
  }
});
Object.defineProperty(exports, "unlink", {
  enumerable: true,
  get: function () {
    return _index839de.aj;
  }
});
Object.defineProperty(exports, "updateCurrentUser", {
  enumerable: true,
  get: function () {
    return _index839de.w;
  }
});
Object.defineProperty(exports, "updateEmail", {
  enumerable: true,
  get: function () {
    return _index839de.af;
  }
});
Object.defineProperty(exports, "updatePassword", {
  enumerable: true,
  get: function () {
    return _index839de.ag;
  }
});
Object.defineProperty(exports, "updatePhoneNumber", {
  enumerable: true,
  get: function () {
    return _index839de.u;
  }
});
Object.defineProperty(exports, "updateProfile", {
  enumerable: true,
  get: function () {
    return _index839de.ae;
  }
});
Object.defineProperty(exports, "useDeviceLanguage", {
  enumerable: true,
  get: function () {
    return _index839de.v;
  }
});
Object.defineProperty(exports, "verifyBeforeUpdateEmail", {
  enumerable: true,
  get: function () {
    return _index839de.ab;
  }
});
Object.defineProperty(exports, "verifyPasswordResetCode", {
  enumerable: true,
  get: function () {
    return _index839de.a3;
  }
});

var _index839de = require("./index-839de510.js");

require("@firebase/util");

require("@firebase/app");

require("tslib");

require("@firebase/logger");

require("@firebase/component");
},{"./index-839de510.js":"../node_modules/@firebase/auth/dist/esm2017/index-839de510.js","@firebase/util":"../node_modules/@firebase/util/dist/index.esm2017.js","@firebase/app":"../node_modules/@firebase/app/dist/esm/index.esm2017.js","tslib":"../node_modules/tslib/tslib.es6.js","@firebase/logger":"../node_modules/@firebase/logger/dist/esm/index.esm2017.js","@firebase/component":"../node_modules/@firebase/component/dist/esm/index.esm2017.js"}],"../node_modules/firebase/auth/dist/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require("@firebase/auth");

Object.keys(_auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _auth[key];
    }
  });
});
},{"@firebase/auth":"../node_modules/@firebase/auth/dist/esm2017/index.js"}],"../src/app.js":[function(require,module,exports) {
"use strict";

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _app = require("firebase/app");

var _lite = require("firebase/firestore/lite");

var _auth = require("firebase/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import firebase from 'firebase'
// require('firebase/auth')
var firebaseConfig = {
  apiKey: "AIzaSyAqpypVh75V_xqIsYGZAo6owJQbadrZCvw",
  authDomain: "fckng-prj.firebaseapp.com",
  projectId: "fckng-prj",
  storageBucket: "fckng-prj.appspot.com",
  messagingSenderId: "847037279857",
  appId: "1:847037279857:web:6cb74946cf33030928f5d0"
};
var app = (0, _app.initializeApp)(firebaseConfig);
var db = (0, _lite.getFirestore)(app);
getUsers(db); // const defaultAuth =  firebase.firestore().auth();
//

var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var buttonConfirm = document.getElementById('btn_1');
var user = {
  email: "",
  password: ""
};
emailInput.addEventListener('input', function (event) {
  if (event.target.value.match(/[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)) {
    user.email = event.target.value;
  } else {
    console.log("net");
  }
});
passwordInput.addEventListener('input', function (event) {
  if (event.target.value.match(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)) {
    user.password = event.target.value;
    console.log(user);
  } else {
    console.log('Password should contain at least 8 symbols,2 big letters and numbers!');
  }
});
buttonConfirm.addEventListener('click', function (event) {
  if (user.email && user.password) {
    console.log(user);
    createUser(user);
  } else {
    console.log('no');
  }
});

function getUsers(_x) {
  return _getUsers.apply(this, arguments);
}

function _getUsers() {
  _getUsers = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(db) {
    var usersCol, usersSnapshot, usersList;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            usersCol = (0, _lite.collection)(db, 'users');
            _context.next = 3;
            return (0, _lite.getDocs)(usersCol);

          case 3:
            usersSnapshot = _context.sent;
            usersList = usersSnapshot.docs.map(function (doc) {
              return doc.data();
            });
            console.log(usersList);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getUsers.apply(this, arguments);
}

var createUser = function createUser(user) {
  var auth = (0, _auth.getAuth)(app);
  (0, _auth.createUserWithEmailAndPassword)(auth, user.email, user.password).then(function (userCredential) {
    // Signed in 
    console.log(userCredential); // console.log(user)
    // ...
  }).catch(function (error) {
    console.log(error);
    var errorCode = error.code;
    var errorMessage = error.message; // ..
  });
};
},{"@babel/runtime-corejs2/helpers/asyncToGenerator":"../node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js","@babel/runtime-corejs2/regenerator":"../node_modules/@babel/runtime-corejs2/regenerator/index.js","firebase/app":"../node_modules/firebase/app/dist/index.esm.js","firebase/firestore/lite":"../node_modules/firebase/firestore/lite/dist/index.esm.js","firebase/auth":"../node_modules/firebase/auth/dist/index.esm.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52535" + '/');

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
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/app.js"], null)
//# sourceMappingURL=/app.581aa3f0.js.map