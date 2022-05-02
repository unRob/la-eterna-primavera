(function(f){typeof define==='function'&&define.amd?define(f):f();}((function(){'use strict';function _classCallCheck(instance, Constructor) {
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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_throttle = throttle;var NamedPoints={mexico:{type:"terrain",position:{lat:18.9274448,lng:-99.230172},zoom:8},cuernabalas:{type:"terrain",position:{lat:18.9274448,lng:-99.230172},zoom:15},"unused-traffic":{type:"streetview",position:{lat:18.98128262019749,lng:-99.22995530390648},id:"cpKlDkpEOdXJpgiC4HSTeQ",heading:244.60474928752524,pitch:4.804543791009053,zoom:1.7056271786714177},"cuernabalas-1":{type:"satellite",position:{lat:18.923233024430342,lng:-99.23521455294798},zoom:13},"cuernabalas-2":{type:"satellite",position:{lat:18.975081529038764,lng:-99.25041747078363},zoom:13},"vista-hermosa":{type:"satellite",position:{lat:18.93391632882604,lng:-99.22181865302582},zoom:20},"vista-hermosa-enjuagando":{type:"slideshow",frames:["section-2/06.jpg"]},"vista-hermosa-antes":{type:"slideshow",frames:["section-2/07.jpg"]},"vista-hermosa-showcase":{type:"slideshow",frames:["section-2/08-1.jpg","section-2/08-2.jpg","section-2/08-3.jpg","section-2/08-4.jpg"]},"vista-hermosa-angles":{type:"slideshow",frames:["section-2/09-1.jpg","section-2/09-2.jpg","section-2/09-3.jpg","section-2/09-4.jpg"]},paloma:{type:"hybrid",position:{lat:18.968301728999766,lng:-99.24102416244749},zoom:18},"paloma-basura":{type:"slideshow",frames:["section-3/11-1.jpg"]},"paloma-protesta":{type:"slideshow",frames:["section-3/12-1.jpg","section-3/12-2.jpg","section-3/12-3.jpg","section-3/12-4.jpg","section-3/12-5.jpg","section-3/12-6.jpg","section-3/12-7.jpg","section-3/12-8.jpg"]},"paloma-contexto":{type:"slideshow",frames:["section-3/13-1.jpg","section-3/13-2.jpg","section-3/13-3.jpg"]},"paloma-cambio":{type:"slideshow",frames:["section-3/15-1.jpg","section-3/15-2.jpg"]},"paloma-43":{type:"slideshow",frames:["section-3/16-1.jpg","section-3/16-2.jpg","section-3/16-3.jpg"]},zapata:{type:"hybrid",position:{lat:18.9652004,lng:-99.2482006},zoom:17.32},"zapata-context":{type:"slideshow",frames:["section-4/17.jpg"]},"zapata-polis":{type:"slideshow",frames:["section-4/18.jpg"]},"zapata-construccion":{type:"slideshow",frames:["section-4/19-1.jpg","section-4/19-2.jpg","section-4/20.jpg"]},"zapata-limpieza":{type:"slideshow",frames:["section-4/21.jpg"]},"zapata-cortar":{type:"slideshow",frames:["section-4/22.jpg","section-4/23.jpg"]},"zapata-cerrado":{type:"slideshow",frames:["section-4/24.jpg","section-4/25.jpg"]}};var Config = {key:"AIzaSyDwdsww0s3ZNUHIxZIqX4udjFYANjgwWaM",scrollOffset:300,scrollDelay:350};var _Helpers={slideshow:{wait:3e3,enter:function enter(a){var b=window._Canvas.images,c=b.querySelector(".shown");return c&&(c.addEventListener("transitionend",function(){return setTimeout(function(){a.log("found initial"),c.remove();},750)}),c.classList.remove("shown")),b.querySelectorAll(".image:not(.shown)").forEach(function(a){return a.remove()}),a.point.frames.forEach(function(a){var c=document.createElement("div");c.style.backgroundImage="url(screenshots/".concat(a,")"),c.classList.add("image"),b.appendChild(c);}),b.querySelector(".image:not(.shown)").classList.add("shown"),window._Canvas.display.slideshow(),Promise.resolve({})},animate:function animate(a){var b=window._Canvas.images.querySelector(".shown"),c=b.nextElementSibling;!c&&(c=window._Canvas.images.firstElementChild,c==b)||(c.addEventListener("transitionend",a()),c.classList.add("shown"),b.classList.remove("shown"));}},streetview:{wait:1e3,enter:function enter(a){var b=a.point,c=window._Canvas.map,d=b.frames?b.frames[0]:b,e=d.position,f=d.heading,g=d.pitch,h=d.zoom,i=c.getStreetView();return i.setPosition(e),i.setPov({heading:f,pitch:g,zoom:h}),b.id&&i.setPano(b.id),i.setVisible(!0),new Promise(function(a){return google.maps.event.addListenerOnce(i,"pano_changed",function(){c.setStreetView(i),window._Canvas.display.map(),a({frames:b.frames,pano:i,index:0});})})},animate:function animate(a,b){var c=b.frames,d=b.index,e=b.pano,f=d+1,g=c[f];if(!(f>=c.length&&(f=0,g=c[0],!1==g.loop))){b.index=enteringIdx,entering["continue"]||google.maps.event.addListenerOnce(e,"pano_changed",a(b));var h=entering,i=h.position,j=h.heading,k=h.pitch,l=h.zoom;e.setPosition(i),e.setPov({heading:j,pitch:k,zoom:l||0});}}},map:{wait:360,enter:function enter(a){var b=window._Canvas.map,c=a.point,d=c.position,e=c.zoom;return b.getStreetView().setVisible(!1),b.setMapTypeId(a.type),b.panTo(d),new Promise(function(c){var d=b.getZoom();google.maps.event.addListenerOnce(b,"bounds_changed",function(){var b=Math.round;window._Canvas.display.map(),a.needsAnimation=b(e)!=d,c({target:b(e),current:d});});})},animate:function animate(a,b){var c=b.target,d=b.current,e=window._Canvas.map;c!=d&&(d=c>d?d+1:d-1,google.maps.event.addListenerOnce(e,"zoom_changed",a({target:c,current:d})),e.setZoom(d));}}},ControlPoint=function(){function a(b){_classCallCheck(this,a);var c=b.dataset.point,d=NamedPoints[c];if(!d)throw Error("point not found \"".concat(c,"\""));var e=b.getBoundingClientRect(),f=e.y;this.node=b,this.name=c,this.point=d,this.bounds=[window.scrollY+f-Config.scrollOffset],this.shown=!1,this.needsAnimation=d.frames&&1<d.frames.length,this.type=d.type,this.helpers="slideshow"==d.type?_Helpers.slideshow:_Helpers["streetview"==d.type?"streetview":"map"];}return _createClass(a,[{key:"render",value:function render(){var a=this;clearTimeout(window.AnimationTimeout),this.log("point:render:start"),this.helpers.enter(this).then(function(b){a.log("point:render:done"),a.shown=!0,a.needsAnimation&&a.scheduleNext(b)();});}},{key:"scheduleNext",value:function scheduleNext(a){var b=this;return this.log("point:animation:schedule",a),function(){clearTimeout(window.AnimationTimeout),window.AnimationTimeout=setTimeout(function(){b.log("point:animate:run",a),b.helpers.animate(b.scheduleNext.bind(b),a);},b.helpers.wait);}}},{key:"log",value:function log(a,b){}},{key:"shouldRender",value:function shouldRender(a){return !this.shown&&a>=this.bounds[0]&&a<this.bounds[1]}}]),a}();window.AnimationTimeout=null,window._Canvas={display:{slideshow:function slideshow(){return _Canvas.mapDiv.classList.add("hidden")},map:function map(){return _Canvas.mapDiv.classList.remove("hidden")}},images:document.querySelector("#screenshots"),map:null,mapDiv:document.getElementById("map")};var ControlPoints=[];function Render(){var a,b=window.scrollY,c=_createForOfIteratorHelper(ControlPoints);try{for(c.s();!(a=c.n()).done;){var d=a.value;if(d.shouldRender(b))return clearTimeout(AnimationTimeout),ControlPoints.forEach(function(a){return a.shown=!1}),d.render()}}catch(a){c.e(a);}finally{c.f();}}window.initMap=function(){var a=NamedPoints.mexico,b=a.position,c=a.zoom,d=a.type;_Canvas.map=new google.maps.Map(_Canvas.mapDiv,{center:b,zoom:c,streetViewControl:!0}),_Canvas.map.setMapTypeId(d),document.querySelectorAll(".control-map").forEach(function(a){var b=ControlPoints[ControlPoints.length-1],c=new ControlPoint(a);ControlPoints.push(c),b&&b.bounds.push(c.bounds[0]);});var e=ControlPoints[ControlPoints.length-1],f=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);e.bounds.push(document.body.scrollHeight),window.addEventListener("scroll",lodash_throttle(Render,Config.scrollDelay,{leading:!1})),Render();},window.addEventListener("load",function(){var a=document.createElement("script");a.async=!0,a.defer=!0,a.src="https://maps.googleapis.com/maps/api/js?key=".concat(Config.key,"&callback=initMap"),document.body.appendChild(a);});})));//# sourceMappingURL=bundle.js.map
