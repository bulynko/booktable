//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/angular:angular-animate/angular-animate.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**                                                                                                                    // 1
 * @license AngularJS v1.4.5                                                                                           // 2
 * (c) 2010-2015 Google, Inc. http://angularjs.org                                                                     // 3
 * License: MIT                                                                                                        // 4
 */                                                                                                                    // 5
(function(window, angular, undefined) {'use strict';                                                                   // 6
                                                                                                                       // 7
/* jshint ignore:start */                                                                                              // 8
var noop        = angular.noop;                                                                                        // 9
var extend      = angular.extend;                                                                                      // 10
var jqLite      = angular.element;                                                                                     // 11
var forEach     = angular.forEach;                                                                                     // 12
var isArray     = angular.isArray;                                                                                     // 13
var isString    = angular.isString;                                                                                    // 14
var isObject    = angular.isObject;                                                                                    // 15
var isUndefined = angular.isUndefined;                                                                                 // 16
var isDefined   = angular.isDefined;                                                                                   // 17
var isFunction  = angular.isFunction;                                                                                  // 18
var isElement   = angular.isElement;                                                                                   // 19
                                                                                                                       // 20
var ELEMENT_NODE = 1;                                                                                                  // 21
var COMMENT_NODE = 8;                                                                                                  // 22
                                                                                                                       // 23
var ADD_CLASS_SUFFIX = '-add';                                                                                         // 24
var REMOVE_CLASS_SUFFIX = '-remove';                                                                                   // 25
var EVENT_CLASS_PREFIX = 'ng-';                                                                                        // 26
var ACTIVE_CLASS_SUFFIX = '-active';                                                                                   // 27
                                                                                                                       // 28
var NG_ANIMATE_CLASSNAME = 'ng-animate';                                                                               // 29
var NG_ANIMATE_CHILDREN_DATA = '$$ngAnimateChildren';                                                                  // 30
                                                                                                                       // 31
// Detect proper transitionend/animationend event names.                                                               // 32
var CSS_PREFIX = '', TRANSITION_PROP, TRANSITIONEND_EVENT, ANIMATION_PROP, ANIMATIONEND_EVENT;                         // 33
                                                                                                                       // 34
// If unprefixed events are not supported but webkit-prefixed are, use the latter.                                     // 35
// Otherwise, just use W3C names, browsers not supporting them at all will just ignore them.                           // 36
// Note: Chrome implements `window.onwebkitanimationend` and doesn't implement `window.onanimationend`                 // 37
// but at the same time dispatches the `animationend` event and not `webkitAnimationEnd`.                              // 38
// Register both events in case `window.onanimationend` is not supported because of that,                              // 39
// do the same for `transitionend` as Safari is likely to exhibit similar behavior.                                    // 40
// Also, the only modern browser that uses vendor prefixes for transitions/keyframes is webkit                         // 41
// therefore there is no reason to test anymore for other vendor prefixes:                                             // 42
// http://caniuse.com/#search=transition                                                                               // 43
if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {                              // 44
  CSS_PREFIX = '-webkit-';                                                                                             // 45
  TRANSITION_PROP = 'WebkitTransition';                                                                                // 46
  TRANSITIONEND_EVENT = 'webkitTransitionEnd transitionend';                                                           // 47
} else {                                                                                                               // 48
  TRANSITION_PROP = 'transition';                                                                                      // 49
  TRANSITIONEND_EVENT = 'transitionend';                                                                               // 50
}                                                                                                                      // 51
                                                                                                                       // 52
if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {                                // 53
  CSS_PREFIX = '-webkit-';                                                                                             // 54
  ANIMATION_PROP = 'WebkitAnimation';                                                                                  // 55
  ANIMATIONEND_EVENT = 'webkitAnimationEnd animationend';                                                              // 56
} else {                                                                                                               // 57
  ANIMATION_PROP = 'animation';                                                                                        // 58
  ANIMATIONEND_EVENT = 'animationend';                                                                                 // 59
}                                                                                                                      // 60
                                                                                                                       // 61
var DURATION_KEY = 'Duration';                                                                                         // 62
var PROPERTY_KEY = 'Property';                                                                                         // 63
var DELAY_KEY = 'Delay';                                                                                               // 64
var TIMING_KEY = 'TimingFunction';                                                                                     // 65
var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';                                                                  // 66
var ANIMATION_PLAYSTATE_KEY = 'PlayState';                                                                             // 67
var SAFE_FAST_FORWARD_DURATION_VALUE = 9999;                                                                           // 68
                                                                                                                       // 69
var ANIMATION_DELAY_PROP = ANIMATION_PROP + DELAY_KEY;                                                                 // 70
var ANIMATION_DURATION_PROP = ANIMATION_PROP + DURATION_KEY;                                                           // 71
var TRANSITION_DELAY_PROP = TRANSITION_PROP + DELAY_KEY;                                                               // 72
var TRANSITION_DURATION_PROP = TRANSITION_PROP + DURATION_KEY;                                                         // 73
                                                                                                                       // 74
var isPromiseLike = function(p) {                                                                                      // 75
  return p && p.then ? true : false;                                                                                   // 76
};                                                                                                                     // 77
                                                                                                                       // 78
function assertArg(arg, name, reason) {                                                                                // 79
  if (!arg) {                                                                                                          // 80
    throw ngMinErr('areq', "Argument '{0}' is {1}", (name || '?'), (reason || "required"));                            // 81
  }                                                                                                                    // 82
  return arg;                                                                                                          // 83
}                                                                                                                      // 84
                                                                                                                       // 85
function mergeClasses(a,b) {                                                                                           // 86
  if (!a && !b) return '';                                                                                             // 87
  if (!a) return b;                                                                                                    // 88
  if (!b) return a;                                                                                                    // 89
  if (isArray(a)) a = a.join(' ');                                                                                     // 90
  if (isArray(b)) b = b.join(' ');                                                                                     // 91
  return a + ' ' + b;                                                                                                  // 92
}                                                                                                                      // 93
                                                                                                                       // 94
function packageStyles(options) {                                                                                      // 95
  var styles = {};                                                                                                     // 96
  if (options && (options.to || options.from)) {                                                                       // 97
    styles.to = options.to;                                                                                            // 98
    styles.from = options.from;                                                                                        // 99
  }                                                                                                                    // 100
  return styles;                                                                                                       // 101
}                                                                                                                      // 102
                                                                                                                       // 103
function pendClasses(classes, fix, isPrefix) {                                                                         // 104
  var className = '';                                                                                                  // 105
  classes = isArray(classes)                                                                                           // 106
      ? classes                                                                                                        // 107
      : classes && isString(classes) && classes.length                                                                 // 108
          ? classes.split(/\s+/)                                                                                       // 109
          : [];                                                                                                        // 110
  forEach(classes, function(klass, i) {                                                                                // 111
    if (klass && klass.length > 0) {                                                                                   // 112
      className += (i > 0) ? ' ' : '';                                                                                 // 113
      className += isPrefix ? fix + klass                                                                              // 114
                            : klass + fix;                                                                             // 115
    }                                                                                                                  // 116
  });                                                                                                                  // 117
  return className;                                                                                                    // 118
}                                                                                                                      // 119
                                                                                                                       // 120
function removeFromArray(arr, val) {                                                                                   // 121
  var index = arr.indexOf(val);                                                                                        // 122
  if (val >= 0) {                                                                                                      // 123
    arr.splice(index, 1);                                                                                              // 124
  }                                                                                                                    // 125
}                                                                                                                      // 126
                                                                                                                       // 127
function stripCommentsFromElement(element) {                                                                           // 128
  if (element instanceof jqLite) {                                                                                     // 129
    switch (element.length) {                                                                                          // 130
      case 0:                                                                                                          // 131
        return [];                                                                                                     // 132
        break;                                                                                                         // 133
                                                                                                                       // 134
      case 1:                                                                                                          // 135
        // there is no point of stripping anything if the element                                                      // 136
        // is the only element within the jqLite wrapper.                                                              // 137
        // (it's important that we retain the element instance.)                                                       // 138
        if (element[0].nodeType === ELEMENT_NODE) {                                                                    // 139
          return element;                                                                                              // 140
        }                                                                                                              // 141
        break;                                                                                                         // 142
                                                                                                                       // 143
      default:                                                                                                         // 144
        return jqLite(extractElementNode(element));                                                                    // 145
        break;                                                                                                         // 146
    }                                                                                                                  // 147
  }                                                                                                                    // 148
                                                                                                                       // 149
  if (element.nodeType === ELEMENT_NODE) {                                                                             // 150
    return jqLite(element);                                                                                            // 151
  }                                                                                                                    // 152
}                                                                                                                      // 153
                                                                                                                       // 154
function extractElementNode(element) {                                                                                 // 155
  if (!element[0]) return element;                                                                                     // 156
  for (var i = 0; i < element.length; i++) {                                                                           // 157
    var elm = element[i];                                                                                              // 158
    if (elm.nodeType == ELEMENT_NODE) {                                                                                // 159
      return elm;                                                                                                      // 160
    }                                                                                                                  // 161
  }                                                                                                                    // 162
}                                                                                                                      // 163
                                                                                                                       // 164
function $$addClass($$jqLite, element, className) {                                                                    // 165
  forEach(element, function(elm) {                                                                                     // 166
    $$jqLite.addClass(elm, className);                                                                                 // 167
  });                                                                                                                  // 168
}                                                                                                                      // 169
                                                                                                                       // 170
function $$removeClass($$jqLite, element, className) {                                                                 // 171
  forEach(element, function(elm) {                                                                                     // 172
    $$jqLite.removeClass(elm, className);                                                                              // 173
  });                                                                                                                  // 174
}                                                                                                                      // 175
                                                                                                                       // 176
function applyAnimationClassesFactory($$jqLite) {                                                                      // 177
  return function(element, options) {                                                                                  // 178
    if (options.addClass) {                                                                                            // 179
      $$addClass($$jqLite, element, options.addClass);                                                                 // 180
      options.addClass = null;                                                                                         // 181
    }                                                                                                                  // 182
    if (options.removeClass) {                                                                                         // 183
      $$removeClass($$jqLite, element, options.removeClass);                                                           // 184
      options.removeClass = null;                                                                                      // 185
    }                                                                                                                  // 186
  }                                                                                                                    // 187
}                                                                                                                      // 188
                                                                                                                       // 189
function prepareAnimationOptions(options) {                                                                            // 190
  options = options || {};                                                                                             // 191
  if (!options.$$prepared) {                                                                                           // 192
    var domOperation = options.domOperation || noop;                                                                   // 193
    options.domOperation = function() {                                                                                // 194
      options.$$domOperationFired = true;                                                                              // 195
      domOperation();                                                                                                  // 196
      domOperation = noop;                                                                                             // 197
    };                                                                                                                 // 198
    options.$$prepared = true;                                                                                         // 199
  }                                                                                                                    // 200
  return options;                                                                                                      // 201
}                                                                                                                      // 202
                                                                                                                       // 203
function applyAnimationStyles(element, options) {                                                                      // 204
  applyAnimationFromStyles(element, options);                                                                          // 205
  applyAnimationToStyles(element, options);                                                                            // 206
}                                                                                                                      // 207
                                                                                                                       // 208
function applyAnimationFromStyles(element, options) {                                                                  // 209
  if (options.from) {                                                                                                  // 210
    element.css(options.from);                                                                                         // 211
    options.from = null;                                                                                               // 212
  }                                                                                                                    // 213
}                                                                                                                      // 214
                                                                                                                       // 215
function applyAnimationToStyles(element, options) {                                                                    // 216
  if (options.to) {                                                                                                    // 217
    element.css(options.to);                                                                                           // 218
    options.to = null;                                                                                                 // 219
  }                                                                                                                    // 220
}                                                                                                                      // 221
                                                                                                                       // 222
function mergeAnimationOptions(element, target, newOptions) {                                                          // 223
  var toAdd = (target.addClass || '') + ' ' + (newOptions.addClass || '');                                             // 224
  var toRemove = (target.removeClass || '') + ' ' + (newOptions.removeClass || '');                                    // 225
  var classes = resolveElementClasses(element.attr('class'), toAdd, toRemove);                                         // 226
                                                                                                                       // 227
  if (newOptions.preparationClasses) {                                                                                 // 228
    target.preparationClasses = concatWithSpace(newOptions.preparationClasses, target.preparationClasses);             // 229
    delete newOptions.preparationClasses;                                                                              // 230
  }                                                                                                                    // 231
                                                                                                                       // 232
  // noop is basically when there is no callback; otherwise something has been set                                     // 233
  var realDomOperation = target.domOperation !== noop ? target.domOperation : null;                                    // 234
                                                                                                                       // 235
  extend(target, newOptions);                                                                                          // 236
                                                                                                                       // 237
  // TODO(matsko or sreeramu): proper fix is to maintain all animation callback in array and call at last,but now only leave has the callback so no issue with this.
  if (realDomOperation) {                                                                                              // 239
    target.domOperation = realDomOperation;                                                                            // 240
  }                                                                                                                    // 241
                                                                                                                       // 242
  if (classes.addClass) {                                                                                              // 243
    target.addClass = classes.addClass;                                                                                // 244
  } else {                                                                                                             // 245
    target.addClass = null;                                                                                            // 246
  }                                                                                                                    // 247
                                                                                                                       // 248
  if (classes.removeClass) {                                                                                           // 249
    target.removeClass = classes.removeClass;                                                                          // 250
  } else {                                                                                                             // 251
    target.removeClass = null;                                                                                         // 252
  }                                                                                                                    // 253
                                                                                                                       // 254
  return target;                                                                                                       // 255
}                                                                                                                      // 256
                                                                                                                       // 257
function resolveElementClasses(existing, toAdd, toRemove) {                                                            // 258
  var ADD_CLASS = 1;                                                                                                   // 259
  var REMOVE_CLASS = -1;                                                                                               // 260
                                                                                                                       // 261
  var flags = {};                                                                                                      // 262
  existing = splitClassesToLookup(existing);                                                                           // 263
                                                                                                                       // 264
  toAdd = splitClassesToLookup(toAdd);                                                                                 // 265
  forEach(toAdd, function(value, key) {                                                                                // 266
    flags[key] = ADD_CLASS;                                                                                            // 267
  });                                                                                                                  // 268
                                                                                                                       // 269
  toRemove = splitClassesToLookup(toRemove);                                                                           // 270
  forEach(toRemove, function(value, key) {                                                                             // 271
    flags[key] = flags[key] === ADD_CLASS ? null : REMOVE_CLASS;                                                       // 272
  });                                                                                                                  // 273
                                                                                                                       // 274
  var classes = {                                                                                                      // 275
    addClass: '',                                                                                                      // 276
    removeClass: ''                                                                                                    // 277
  };                                                                                                                   // 278
                                                                                                                       // 279
  forEach(flags, function(val, klass) {                                                                                // 280
    var prop, allow;                                                                                                   // 281
    if (val === ADD_CLASS) {                                                                                           // 282
      prop = 'addClass';                                                                                               // 283
      allow = !existing[klass];                                                                                        // 284
    } else if (val === REMOVE_CLASS) {                                                                                 // 285
      prop = 'removeClass';                                                                                            // 286
      allow = existing[klass];                                                                                         // 287
    }                                                                                                                  // 288
    if (allow) {                                                                                                       // 289
      if (classes[prop].length) {                                                                                      // 290
        classes[prop] += ' ';                                                                                          // 291
      }                                                                                                                // 292
      classes[prop] += klass;                                                                                          // 293
    }                                                                                                                  // 294
  });                                                                                                                  // 295
                                                                                                                       // 296
  function splitClassesToLookup(classes) {                                                                             // 297
    if (isString(classes)) {                                                                                           // 298
      classes = classes.split(' ');                                                                                    // 299
    }                                                                                                                  // 300
                                                                                                                       // 301
    var obj = {};                                                                                                      // 302
    forEach(classes, function(klass) {                                                                                 // 303
      // sometimes the split leaves empty string values                                                                // 304
      // incase extra spaces were applied to the options                                                               // 305
      if (klass.length) {                                                                                              // 306
        obj[klass] = true;                                                                                             // 307
      }                                                                                                                // 308
    });                                                                                                                // 309
    return obj;                                                                                                        // 310
  }                                                                                                                    // 311
                                                                                                                       // 312
  return classes;                                                                                                      // 313
}                                                                                                                      // 314
                                                                                                                       // 315
function getDomNode(element) {                                                                                         // 316
  return (element instanceof angular.element) ? element[0] : element;                                                  // 317
}                                                                                                                      // 318
                                                                                                                       // 319
function applyGeneratedPreparationClasses(element, event, options) {                                                   // 320
  var classes = '';                                                                                                    // 321
  if (event) {                                                                                                         // 322
    classes = pendClasses(event, EVENT_CLASS_PREFIX, true);                                                            // 323
  }                                                                                                                    // 324
  if (options.addClass) {                                                                                              // 325
    classes = concatWithSpace(classes, pendClasses(options.addClass, ADD_CLASS_SUFFIX));                               // 326
  }                                                                                                                    // 327
  if (options.removeClass) {                                                                                           // 328
    classes = concatWithSpace(classes, pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX));                         // 329
  }                                                                                                                    // 330
  if (classes.length) {                                                                                                // 331
    options.preparationClasses = classes;                                                                              // 332
    element.addClass(classes);                                                                                         // 333
  }                                                                                                                    // 334
}                                                                                                                      // 335
                                                                                                                       // 336
function clearGeneratedClasses(element, options) {                                                                     // 337
  if (options.preparationClasses) {                                                                                    // 338
    element.removeClass(options.preparationClasses);                                                                   // 339
    options.preparationClasses = null;                                                                                 // 340
  }                                                                                                                    // 341
  if (options.activeClasses) {                                                                                         // 342
    element.removeClass(options.activeClasses);                                                                        // 343
    options.activeClasses = null;                                                                                      // 344
  }                                                                                                                    // 345
}                                                                                                                      // 346
                                                                                                                       // 347
function blockTransitions(node, duration) {                                                                            // 348
  // we use a negative delay value since it performs blocking                                                          // 349
  // yet it doesn't kill any existing transitions running on the                                                       // 350
  // same element which makes this safe for class-based animations                                                     // 351
  var value = duration ? '-' + duration + 's' : '';                                                                    // 352
  applyInlineStyle(node, [TRANSITION_DELAY_PROP, value]);                                                              // 353
  return [TRANSITION_DELAY_PROP, value];                                                                               // 354
}                                                                                                                      // 355
                                                                                                                       // 356
function blockKeyframeAnimations(node, applyBlock) {                                                                   // 357
  var value = applyBlock ? 'paused' : '';                                                                              // 358
  var key = ANIMATION_PROP + ANIMATION_PLAYSTATE_KEY;                                                                  // 359
  applyInlineStyle(node, [key, value]);                                                                                // 360
  return [key, value];                                                                                                 // 361
}                                                                                                                      // 362
                                                                                                                       // 363
function applyInlineStyle(node, styleTuple) {                                                                          // 364
  var prop = styleTuple[0];                                                                                            // 365
  var value = styleTuple[1];                                                                                           // 366
  node.style[prop] = value;                                                                                            // 367
}                                                                                                                      // 368
                                                                                                                       // 369
function concatWithSpace(a,b) {                                                                                        // 370
  if (!a) return b;                                                                                                    // 371
  if (!b) return a;                                                                                                    // 372
  return a + ' ' + b;                                                                                                  // 373
}                                                                                                                      // 374
                                                                                                                       // 375
function $$BodyProvider() {                                                                                            // 376
  this.$get = ['$document', function($document) {                                                                      // 377
    return jqLite($document[0].body);                                                                                  // 378
  }];                                                                                                                  // 379
}                                                                                                                      // 380
                                                                                                                       // 381
var $$rAFSchedulerFactory = ['$$rAF', function($$rAF) {                                                                // 382
  var queue, cancelFn;                                                                                                 // 383
                                                                                                                       // 384
  function scheduler(tasks) {                                                                                          // 385
    // we make a copy since RAFScheduler mutates the state                                                             // 386
    // of the passed in array variable and this would be difficult                                                     // 387
    // to track down on the outside code                                                                               // 388
    queue = queue.concat(tasks);                                                                                       // 389
    nextTick();                                                                                                        // 390
  }                                                                                                                    // 391
                                                                                                                       // 392
  queue = scheduler.queue = [];                                                                                        // 393
                                                                                                                       // 394
  /* waitUntilQuiet does two things:                                                                                   // 395
   * 1. It will run the FINAL `fn` value only when an uncancelled RAF has passed through                               // 396
   * 2. It will delay the next wave of tasks from running until the quiet `fn` has run.                                // 397
   *                                                                                                                   // 398
   * The motivation here is that animation code can request more time from the scheduler                               // 399
   * before the next wave runs. This allows for certain DOM properties such as classes to                              // 400
   * be resolved in time for the next animation to run.                                                                // 401
   */                                                                                                                  // 402
  scheduler.waitUntilQuiet = function(fn) {                                                                            // 403
    if (cancelFn) cancelFn();                                                                                          // 404
                                                                                                                       // 405
    cancelFn = $$rAF(function() {                                                                                      // 406
      cancelFn = null;                                                                                                 // 407
      fn();                                                                                                            // 408
      nextTick();                                                                                                      // 409
    });                                                                                                                // 410
  };                                                                                                                   // 411
                                                                                                                       // 412
  return scheduler;                                                                                                    // 413
                                                                                                                       // 414
  function nextTick() {                                                                                                // 415
    if (!queue.length) return;                                                                                         // 416
                                                                                                                       // 417
    var items = queue.shift();                                                                                         // 418
    for (var i = 0; i < items.length; i++) {                                                                           // 419
      items[i]();                                                                                                      // 420
    }                                                                                                                  // 421
                                                                                                                       // 422
    if (!cancelFn) {                                                                                                   // 423
      $$rAF(function() {                                                                                               // 424
        if (!cancelFn) nextTick();                                                                                     // 425
      });                                                                                                              // 426
    }                                                                                                                  // 427
  }                                                                                                                    // 428
}];                                                                                                                    // 429
                                                                                                                       // 430
var $$AnimateChildrenDirective = [function() {                                                                         // 431
  return function(scope, element, attrs) {                                                                             // 432
    var val = attrs.ngAnimateChildren;                                                                                 // 433
    if (angular.isString(val) && val.length === 0) { //empty attribute                                                 // 434
      element.data(NG_ANIMATE_CHILDREN_DATA, true);                                                                    // 435
    } else {                                                                                                           // 436
      attrs.$observe('ngAnimateChildren', function(value) {                                                            // 437
        value = value === 'on' || value === 'true';                                                                    // 438
        element.data(NG_ANIMATE_CHILDREN_DATA, value);                                                                 // 439
      });                                                                                                              // 440
    }                                                                                                                  // 441
  };                                                                                                                   // 442
}];                                                                                                                    // 443
                                                                                                                       // 444
var ANIMATE_TIMER_KEY = '$$animateCss';                                                                                // 445
                                                                                                                       // 446
/**                                                                                                                    // 447
 * @ngdoc service                                                                                                      // 448
 * @name $animateCss                                                                                                   // 449
 * @kind object                                                                                                        // 450
 *                                                                                                                     // 451
 * @description                                                                                                        // 452
 * The `$animateCss` service is a useful utility to trigger customized CSS-based transitions/keyframes                 // 453
 * from a JavaScript-based animation or directly from a directive. The purpose of `$animateCss` is NOT                 // 454
 * to side-step how `$animate` and ngAnimate work, but the goal is to allow pre-existing animations or                 // 455
 * directives to create more complex animations that can be purely driven using CSS code.                              // 456
 *                                                                                                                     // 457
 * Note that only browsers that support CSS transitions and/or keyframe animations are capable of                      // 458
 * rendering animations triggered via `$animateCss` (bad news for IE9 and lower).                                      // 459
 *                                                                                                                     // 460
 * ## Usage                                                                                                            // 461
 * Once again, `$animateCss` is designed to be used inside of a registered JavaScript animation that                   // 462
 * is powered by ngAnimate. It is possible to use `$animateCss` directly inside of a directive, however,               // 463
 * any automatic control over cancelling animations and/or preventing animations from being run on                     // 464
 * child elements will not be handled by Angular. For this to work as expected, please use `$animate` to               // 465
 * trigger the animation and then setup a JavaScript animation that injects `$animateCss` to trigger                   // 466
 * the CSS animation.                                                                                                  // 467
 *                                                                                                                     // 468
 * The example below shows how we can create a folding animation on an element using `ng-if`:                          // 469
 *                                                                                                                     // 470
 * ```html                                                                                                             // 471
 * <!-- notice the `fold-animation` CSS class -->                                                                      // 472
 * <div ng-if="onOff" class="fold-animation">                                                                          // 473
 *   This element will go BOOM                                                                                         // 474
 * </div>                                                                                                              // 475
 * <button ng-click="onOff=true">Fold In</button>                                                                      // 476
 * ```                                                                                                                 // 477
 *                                                                                                                     // 478
 * Now we create the **JavaScript animation** that will trigger the CSS transition:                                    // 479
 *                                                                                                                     // 480
 * ```js                                                                                                               // 481
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {                                       // 482
 *   return {                                                                                                          // 483
 *     enter: function(element, doneFn) {                                                                              // 484
 *       var height = element[0].offsetHeight;                                                                         // 485
 *       return $animateCss(element, {                                                                                 // 486
 *         from: { height:'0px' },                                                                                     // 487
 *         to: { height:height + 'px' },                                                                               // 488
 *         duration: 1 // one second                                                                                   // 489
 *       });                                                                                                           // 490
 *     }                                                                                                               // 491
 *   }                                                                                                                 // 492
 * }]);                                                                                                                // 493
 * ```                                                                                                                 // 494
 *                                                                                                                     // 495
 * ## More Advanced Uses                                                                                               // 496
 *                                                                                                                     // 497
 * `$animateCss` is the underlying code that ngAnimate uses to power **CSS-based animations** behind the scenes. Therefore CSS hooks
 * like `.ng-EVENT`, `.ng-EVENT-active`, `.ng-EVENT-stagger` are all features that can be triggered using `$animateCss` via JavaScript code.
 *                                                                                                                     // 500
 * This also means that just about any combination of adding classes, removing classes, setting styles, dynamically setting a keyframe animation,
 * applying a hardcoded duration or delay value, changing the animation easing or applying a stagger animation are all options that work with
 * `$animateCss`. The service itself is smart enough to figure out the combination of options and examine the element styling properties in order
 * to provide a working animation that will run in CSS.                                                                // 504
 *                                                                                                                     // 505
 * The example below showcases a more advanced version of the `.fold-animation` from the example above:                // 506
 *                                                                                                                     // 507
 * ```js                                                                                                               // 508
 * ngModule.animation('.fold-animation', ['$animateCss', function($animateCss) {                                       // 509
 *   return {                                                                                                          // 510
 *     enter: function(element, doneFn) {                                                                              // 511
 *       var height = element[0].offsetHeight;                                                                         // 512
 *       return $animateCss(element, {                                                                                 // 513
 *         addClass: 'red large-text pulse-twice',                                                                     // 514
 *         easing: 'ease-out',                                                                                         // 515
 *         from: { height:'0px' },                                                                                     // 516
 *         to: { height:height + 'px' },                                                                               // 517
 *         duration: 1 // one second                                                                                   // 518
 *       });                                                                                                           // 519
 *     }                                                                                                               // 520
 *   }                                                                                                                 // 521
 * }]);                                                                                                                // 522
 * ```                                                                                                                 // 523
 *                                                                                                                     // 524
 * Since we're adding/removing CSS classes then the CSS transition will also pick those up:                            // 525
 *                                                                                                                     // 526
 * ```css                                                                                                              // 527
 * /&#42; since a hardcoded duration value of 1 was provided in the JavaScript animation code,                         // 528
 * the CSS classes below will be transitioned despite them being defined as regular CSS classes &#42;/                 // 529
 * .red { background:red; }                                                                                            // 530
 * .large-text { font-size:20px; }                                                                                     // 531
 *                                                                                                                     // 532
 * /&#42; we can also use a keyframe animation and $animateCss will make it work alongside the transition &#42;/       // 533
 * .pulse-twice {                                                                                                      // 534
 *   animation: 0.5s pulse linear 2;                                                                                   // 535
 *   -webkit-animation: 0.5s pulse linear 2;                                                                           // 536
 * }                                                                                                                   // 537
 *                                                                                                                     // 538
 * @keyframes pulse {                                                                                                  // 539
 *   from { transform: scale(0.5); }                                                                                   // 540
 *   to { transform: scale(1.5); }                                                                                     // 541
 * }                                                                                                                   // 542
 *                                                                                                                     // 543
 * @-webkit-keyframes pulse {                                                                                          // 544
 *   from { -webkit-transform: scale(0.5); }                                                                           // 545
 *   to { -webkit-transform: scale(1.5); }                                                                             // 546
 * }                                                                                                                   // 547
 * ```                                                                                                                 // 548
 *                                                                                                                     // 549
 * Given this complex combination of CSS classes, styles and options, `$animateCss` will figure everything out and make the animation happen.
 *                                                                                                                     // 551
 * ## How the Options are handled                                                                                      // 552
 *                                                                                                                     // 553
 * `$animateCss` is very versatile and intelligent when it comes to figuring out what configurations to apply to the element to ensure the animation
 * works with the options provided. Say for example we were adding a class that contained a keyframe value and we wanted to also animate some inline
 * styles using the `from` and `to` properties.                                                                        // 556
 *                                                                                                                     // 557
 * ```js                                                                                                               // 558
 * var animator = $animateCss(element, {                                                                               // 559
 *   from: { background:'red' },                                                                                       // 560
 *   to: { background:'blue' }                                                                                         // 561
 * });                                                                                                                 // 562
 * animator.start();                                                                                                   // 563
 * ```                                                                                                                 // 564
 *                                                                                                                     // 565
 * ```css                                                                                                              // 566
 * .rotating-animation {                                                                                               // 567
 *   animation:0.5s rotate linear;                                                                                     // 568
 *   -webkit-animation:0.5s rotate linear;                                                                             // 569
 * }                                                                                                                   // 570
 *                                                                                                                     // 571
 * @keyframes rotate {                                                                                                 // 572
 *   from { transform: rotate(0deg); }                                                                                 // 573
 *   to { transform: rotate(360deg); }                                                                                 // 574
 * }                                                                                                                   // 575
 *                                                                                                                     // 576
 * @-webkit-keyframes rotate {                                                                                         // 577
 *   from { -webkit-transform: rotate(0deg); }                                                                         // 578
 *   to { -webkit-transform: rotate(360deg); }                                                                         // 579
 * }                                                                                                                   // 580
 * ```                                                                                                                 // 581
 *                                                                                                                     // 582
 * The missing pieces here are that we do not have a transition set (within the CSS code nor within the `$animateCss` options) and the duration of the animation is
 * going to be detected from what the keyframe styles on the CSS class are. In this event, `$animateCss` will automatically create an inline transition
 * style matching the duration detected from the keyframe style (which is present in the CSS class that is being added) and then prepare both the transition
 * and keyframe animations to run in parallel on the element. Then when the animation is underway the provided `from` and `to` CSS styles will be applied
 * and spread across the transition and keyframe animation.                                                            // 587
 *                                                                                                                     // 588
 * ## What is returned                                                                                                 // 589
 *                                                                                                                     // 590
 * `$animateCss` works in two stages: a preparation phase and an animation phase. Therefore when `$animateCss` is first called it will NOT actually
 * start the animation. All that is going on here is that the element is being prepared for the animation (which means that the generated CSS classes are
 * added and removed on the element). Once `$animateCss` is called it will return an object with the following properties:
 *                                                                                                                     // 594
 * ```js                                                                                                               // 595
 * var animator = $animateCss(element, { ... });                                                                       // 596
 * ```                                                                                                                 // 597
 *                                                                                                                     // 598
 * Now what do the contents of our `animator` variable look like:                                                      // 599
 *                                                                                                                     // 600
 * ```js                                                                                                               // 601
 * {                                                                                                                   // 602
 *   // starts the animation                                                                                           // 603
 *   start: Function,                                                                                                  // 604
 *                                                                                                                     // 605
 *   // ends (aborts) the animation                                                                                    // 606
 *   end: Function                                                                                                     // 607
 * }                                                                                                                   // 608
 * ```                                                                                                                 // 609
 *                                                                                                                     // 610
 * To actually start the animation we need to run `animation.start()` which will then return a promise that we can hook into to detect when the animation ends.
 * If we choose not to run the animation then we MUST run `animation.end()` to perform a cleanup on the element (since some CSS classes and stlyes may have been
 * applied to the element during the preparation phase). Note that all other properties such as duration, delay, transitions and keyframes are just properties
 * and that changing them will not reconfigure the parameters of the animation.                                        // 614
 *                                                                                                                     // 615
 * ### runner.done() vs runner.then()                                                                                  // 616
 * It is documented that `animation.start()` will return a promise object and this is true, however, there is also an additional method available on the
 * runner called `.done(callbackFn)`. The done method works the same as `.finally(callbackFn)`, however, it does **not trigger a digest to occur**.
 * Therefore, for performance reasons, it's always best to use `runner.done(callback)` instead of `runner.then()`, `runner.catch()` or `runner.finally()`
 * unless you really need a digest to kick off afterwards.                                                             // 620
 *                                                                                                                     // 621
 * Keep in mind that, to make this easier, ngAnimate has tweaked the JS animations API to recognize when a runner instance is returned from $animateCss
 * (so there is no need to call `runner.done(doneFn)` inside of your JavaScript animation code).                       // 623
 * Check the {@link ngAnimate.$animateCss#usage animation code above} to see how this works.                           // 624
 *                                                                                                                     // 625
 * @param {DOMElement} element the element that will be animated                                                       // 626
 * @param {object} options the animation-related options that will be applied during the animation                     // 627
 *                                                                                                                     // 628
 * * `event` - The DOM event (e.g. enter, leave, move). When used, a generated CSS class of `ng-EVENT` and `ng-EVENT-active` will be applied
 * to the element during the animation. Multiple events can be provided when spaces are used as a separator. (Note that this will not perform any DOM operation.)
 * * `easing` - The CSS easing value that will be applied to the transition or keyframe animation (or both).           // 631
 * * `transition` - The raw CSS transition style that will be used (e.g. `1s linear all`).                             // 632
 * * `keyframeStyle` - The raw CSS keyframe animation style that will be used (e.g. `1s my_animation linear`).         // 633
 * * `from` - The starting CSS styles (a key/value object) that will be applied at the start of the animation.         // 634
 * * `to` - The ending CSS styles (a key/value object) that will be applied across the animation via a CSS transition. // 635
 * * `addClass` - A space separated list of CSS classes that will be added to the element and spread across the animation.
 * * `removeClass` - A space separated list of CSS classes that will be removed from the element and spread across the animation.
 * * `duration` - A number value representing the total duration of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `0`
 * is provided then the animation will be skipped entirely.                                                            // 639
 * * `delay` - A number value representing the total delay of the transition and/or keyframe (note that a value of 1 is 1000ms). If a value of `true` is
 * used then whatever delay value is detected from the CSS classes will be mirrored on the elements styles (e.g. by setting delay true then the style value
 * of the element will be `transition-delay: DETECTED_VALUE`). Using `true` is useful when you want the CSS classes and inline styles to all share the same
 * CSS delay value.                                                                                                    // 643
 * * `stagger` - A numeric time value representing the delay between successively animated elements                    // 644
 * ({@link ngAnimate#css-staggering-animations Click here to learn how CSS-based staggering works in ngAnimate.})      // 645
 * * `staggerIndex` - The numeric index representing the stagger item (e.g. a value of 5 is equal to the sixth item in the stagger; therefore when a
 * * `stagger` option value of `0.1` is used then there will be a stagger delay of `600ms`)                            // 647
 * * `applyClassesEarly` - Whether or not the classes being added or removed will be used when detecting the animation. This is set by `$animate` when enter/leave/move animations are fired to ensure that the CSS classes are resolved in time. (Note that this will prevent any transitions from occuring on the classes being added and removed.)
 *                                                                                                                     // 649
 * @return {object} an object with start and end methods and details about the animation.                              // 650
 *                                                                                                                     // 651
 * * `start` - The method to start the animation. This will return a `Promise` when called.                            // 652
 * * `end` - This method will cancel the animation and remove all applied CSS classes and styles.                      // 653
 */                                                                                                                    // 654
var ONE_SECOND = 1000;                                                                                                 // 655
var BASE_TEN = 10;                                                                                                     // 656
                                                                                                                       // 657
var ELAPSED_TIME_MAX_DECIMAL_PLACES = 3;                                                                               // 658
var CLOSING_TIME_BUFFER = 1.5;                                                                                         // 659
                                                                                                                       // 660
var DETECT_CSS_PROPERTIES = {                                                                                          // 661
  transitionDuration:      TRANSITION_DURATION_PROP,                                                                   // 662
  transitionDelay:         TRANSITION_DELAY_PROP,                                                                      // 663
  transitionProperty:      TRANSITION_PROP + PROPERTY_KEY,                                                             // 664
  animationDuration:       ANIMATION_DURATION_PROP,                                                                    // 665
  animationDelay:          ANIMATION_DELAY_PROP,                                                                       // 666
  animationIterationCount: ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY                                              // 667
};                                                                                                                     // 668
                                                                                                                       // 669
var DETECT_STAGGER_CSS_PROPERTIES = {                                                                                  // 670
  transitionDuration:      TRANSITION_DURATION_PROP,                                                                   // 671
  transitionDelay:         TRANSITION_DELAY_PROP,                                                                      // 672
  animationDuration:       ANIMATION_DURATION_PROP,                                                                    // 673
  animationDelay:          ANIMATION_DELAY_PROP                                                                        // 674
};                                                                                                                     // 675
                                                                                                                       // 676
function getCssKeyframeDurationStyle(duration) {                                                                       // 677
  return [ANIMATION_DURATION_PROP, duration + 's'];                                                                    // 678
}                                                                                                                      // 679
                                                                                                                       // 680
function getCssDelayStyle(delay, isKeyframeAnimation) {                                                                // 681
  var prop = isKeyframeAnimation ? ANIMATION_DELAY_PROP : TRANSITION_DELAY_PROP;                                       // 682
  return [prop, delay + 's'];                                                                                          // 683
}                                                                                                                      // 684
                                                                                                                       // 685
function computeCssStyles($window, element, properties) {                                                              // 686
  var styles = Object.create(null);                                                                                    // 687
  var detectedStyles = $window.getComputedStyle(element) || {};                                                        // 688
  forEach(properties, function(formalStyleName, actualStyleName) {                                                     // 689
    var val = detectedStyles[formalStyleName];                                                                         // 690
    if (val) {                                                                                                         // 691
      var c = val.charAt(0);                                                                                           // 692
                                                                                                                       // 693
      // only numerical-based values have a negative sign or digit as the first value                                  // 694
      if (c === '-' || c === '+' || c >= 0) {                                                                          // 695
        val = parseMaxTime(val);                                                                                       // 696
      }                                                                                                                // 697
                                                                                                                       // 698
      // by setting this to null in the event that the delay is not set or is set directly as 0                        // 699
      // then we can still allow for zegative values to be used later on and not mistake this                          // 700
      // value for being greater than any other negative value.                                                        // 701
      if (val === 0) {                                                                                                 // 702
        val = null;                                                                                                    // 703
      }                                                                                                                // 704
      styles[actualStyleName] = val;                                                                                   // 705
    }                                                                                                                  // 706
  });                                                                                                                  // 707
                                                                                                                       // 708
  return styles;                                                                                                       // 709
}                                                                                                                      // 710
                                                                                                                       // 711
function parseMaxTime(str) {                                                                                           // 712
  var maxValue = 0;                                                                                                    // 713
  var values = str.split(/\s*,\s*/);                                                                                   // 714
  forEach(values, function(value) {                                                                                    // 715
    // it's always safe to consider only second values and omit `ms` values since                                      // 716
    // getComputedStyle will always handle the conversion for us                                                       // 717
    if (value.charAt(value.length - 1) == 's') {                                                                       // 718
      value = value.substring(0, value.length - 1);                                                                    // 719
    }                                                                                                                  // 720
    value = parseFloat(value) || 0;                                                                                    // 721
    maxValue = maxValue ? Math.max(value, maxValue) : value;                                                           // 722
  });                                                                                                                  // 723
  return maxValue;                                                                                                     // 724
}                                                                                                                      // 725
                                                                                                                       // 726
function truthyTimingValue(val) {                                                                                      // 727
  return val === 0 || val != null;                                                                                     // 728
}                                                                                                                      // 729
                                                                                                                       // 730
function getCssTransitionDurationStyle(duration, applyOnlyDuration) {                                                  // 731
  var style = TRANSITION_PROP;                                                                                         // 732
  var value = duration + 's';                                                                                          // 733
  if (applyOnlyDuration) {                                                                                             // 734
    style += DURATION_KEY;                                                                                             // 735
  } else {                                                                                                             // 736
    value += ' linear all';                                                                                            // 737
  }                                                                                                                    // 738
  return [style, value];                                                                                               // 739
}                                                                                                                      // 740
                                                                                                                       // 741
function createLocalCacheLookup() {                                                                                    // 742
  var cache = Object.create(null);                                                                                     // 743
  return {                                                                                                             // 744
    flush: function() {                                                                                                // 745
      cache = Object.create(null);                                                                                     // 746
    },                                                                                                                 // 747
                                                                                                                       // 748
    count: function(key) {                                                                                             // 749
      var entry = cache[key];                                                                                          // 750
      return entry ? entry.total : 0;                                                                                  // 751
    },                                                                                                                 // 752
                                                                                                                       // 753
    get: function(key) {                                                                                               // 754
      var entry = cache[key];                                                                                          // 755
      return entry && entry.value;                                                                                     // 756
    },                                                                                                                 // 757
                                                                                                                       // 758
    put: function(key, value) {                                                                                        // 759
      if (!cache[key]) {                                                                                               // 760
        cache[key] = { total: 1, value: value };                                                                       // 761
      } else {                                                                                                         // 762
        cache[key].total++;                                                                                            // 763
      }                                                                                                                // 764
    }                                                                                                                  // 765
  };                                                                                                                   // 766
}                                                                                                                      // 767
                                                                                                                       // 768
var $AnimateCssProvider = ['$animateProvider', function($animateProvider) {                                            // 769
  var gcsLookup = createLocalCacheLookup();                                                                            // 770
  var gcsStaggerLookup = createLocalCacheLookup();                                                                     // 771
                                                                                                                       // 772
  this.$get = ['$window', '$$jqLite', '$$AnimateRunner', '$timeout',                                                   // 773
               '$$forceReflow', '$sniffer', '$$rAFScheduler', '$animate',                                              // 774
       function($window,   $$jqLite,   $$AnimateRunner,   $timeout,                                                    // 775
                $$forceReflow,   $sniffer,   $$rAFScheduler, $animate) {                                               // 776
                                                                                                                       // 777
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 778
                                                                                                                       // 779
    var parentCounter = 0;                                                                                             // 780
    function gcsHashFn(node, extraClasses) {                                                                           // 781
      var KEY = "$$ngAnimateParentKey";                                                                                // 782
      var parentNode = node.parentNode;                                                                                // 783
      var parentID = parentNode[KEY] || (parentNode[KEY] = ++parentCounter);                                           // 784
      return parentID + '-' + node.getAttribute('class') + '-' + extraClasses;                                         // 785
    }                                                                                                                  // 786
                                                                                                                       // 787
    function computeCachedCssStyles(node, className, cacheKey, properties) {                                           // 788
      var timings = gcsLookup.get(cacheKey);                                                                           // 789
                                                                                                                       // 790
      if (!timings) {                                                                                                  // 791
        timings = computeCssStyles($window, node, properties);                                                         // 792
        if (timings.animationIterationCount === 'infinite') {                                                          // 793
          timings.animationIterationCount = 1;                                                                         // 794
        }                                                                                                              // 795
      }                                                                                                                // 796
                                                                                                                       // 797
      // we keep putting this in multiple times even though the value and the cacheKey are the same                    // 798
      // because we're keeping an interal tally of how many duplicate animations are detected.                         // 799
      gcsLookup.put(cacheKey, timings);                                                                                // 800
      return timings;                                                                                                  // 801
    }                                                                                                                  // 802
                                                                                                                       // 803
    function computeCachedCssStaggerStyles(node, className, cacheKey, properties) {                                    // 804
      var stagger;                                                                                                     // 805
                                                                                                                       // 806
      // if we have one or more existing matches of matching elements                                                  // 807
      // containing the same parent + CSS styles (which is how cacheKey works)                                         // 808
      // then staggering is possible                                                                                   // 809
      if (gcsLookup.count(cacheKey) > 0) {                                                                             // 810
        stagger = gcsStaggerLookup.get(cacheKey);                                                                      // 811
                                                                                                                       // 812
        if (!stagger) {                                                                                                // 813
          var staggerClassName = pendClasses(className, '-stagger');                                                   // 814
                                                                                                                       // 815
          $$jqLite.addClass(node, staggerClassName);                                                                   // 816
                                                                                                                       // 817
          stagger = computeCssStyles($window, node, properties);                                                       // 818
                                                                                                                       // 819
          // force the conversion of a null value to zero incase not set                                               // 820
          stagger.animationDuration = Math.max(stagger.animationDuration, 0);                                          // 821
          stagger.transitionDuration = Math.max(stagger.transitionDuration, 0);                                        // 822
                                                                                                                       // 823
          $$jqLite.removeClass(node, staggerClassName);                                                                // 824
                                                                                                                       // 825
          gcsStaggerLookup.put(cacheKey, stagger);                                                                     // 826
        }                                                                                                              // 827
      }                                                                                                                // 828
                                                                                                                       // 829
      return stagger || {};                                                                                            // 830
    }                                                                                                                  // 831
                                                                                                                       // 832
    var cancelLastRAFRequest;                                                                                          // 833
    var rafWaitQueue = [];                                                                                             // 834
    function waitUntilQuiet(callback) {                                                                                // 835
      rafWaitQueue.push(callback);                                                                                     // 836
      $$rAFScheduler.waitUntilQuiet(function() {                                                                       // 837
        gcsLookup.flush();                                                                                             // 838
        gcsStaggerLookup.flush();                                                                                      // 839
                                                                                                                       // 840
        // DO NOT REMOVE THIS LINE OR REFACTOR OUT THE `pageWidth` variable.                                           // 841
        // PLEASE EXAMINE THE `$$forceReflow` service to understand why.                                               // 842
        var pageWidth = $$forceReflow();                                                                               // 843
                                                                                                                       // 844
        // we use a for loop to ensure that if the queue is changed                                                    // 845
        // during this looping then it will consider new requests                                                      // 846
        for (var i = 0; i < rafWaitQueue.length; i++) {                                                                // 847
          rafWaitQueue[i](pageWidth);                                                                                  // 848
        }                                                                                                              // 849
        rafWaitQueue.length = 0;                                                                                       // 850
      });                                                                                                              // 851
    }                                                                                                                  // 852
                                                                                                                       // 853
    function computeTimings(node, className, cacheKey) {                                                               // 854
      var timings = computeCachedCssStyles(node, className, cacheKey, DETECT_CSS_PROPERTIES);                          // 855
      var aD = timings.animationDelay;                                                                                 // 856
      var tD = timings.transitionDelay;                                                                                // 857
      timings.maxDelay = aD && tD                                                                                      // 858
          ? Math.max(aD, tD)                                                                                           // 859
          : (aD || tD);                                                                                                // 860
      timings.maxDuration = Math.max(                                                                                  // 861
          timings.animationDuration * timings.animationIterationCount,                                                 // 862
          timings.transitionDuration);                                                                                 // 863
                                                                                                                       // 864
      return timings;                                                                                                  // 865
    }                                                                                                                  // 866
                                                                                                                       // 867
    return function init(element, options) {                                                                           // 868
      var node = getDomNode(element);                                                                                  // 869
      if (!node                                                                                                        // 870
          || !node.parentNode                                                                                          // 871
          || !$animate.enabled()) {                                                                                    // 872
        return closeAndReturnNoopAnimator();                                                                           // 873
      }                                                                                                                // 874
                                                                                                                       // 875
      options = prepareAnimationOptions(options);                                                                      // 876
                                                                                                                       // 877
      var temporaryStyles = [];                                                                                        // 878
      var classes = element.attr('class');                                                                             // 879
      var styles = packageStyles(options);                                                                             // 880
      var animationClosed;                                                                                             // 881
      var animationPaused;                                                                                             // 882
      var animationCompleted;                                                                                          // 883
      var runner;                                                                                                      // 884
      var runnerHost;                                                                                                  // 885
      var maxDelay;                                                                                                    // 886
      var maxDelayTime;                                                                                                // 887
      var maxDuration;                                                                                                 // 888
      var maxDurationTime;                                                                                             // 889
                                                                                                                       // 890
      if (options.duration === 0 || (!$sniffer.animations && !$sniffer.transitions)) {                                 // 891
        return closeAndReturnNoopAnimator();                                                                           // 892
      }                                                                                                                // 893
                                                                                                                       // 894
      var method = options.event && isArray(options.event)                                                             // 895
            ? options.event.join(' ')                                                                                  // 896
            : options.event;                                                                                           // 897
                                                                                                                       // 898
      var isStructural = method && options.structural;                                                                 // 899
      var structuralClassName = '';                                                                                    // 900
      var addRemoveClassName = '';                                                                                     // 901
                                                                                                                       // 902
      if (isStructural) {                                                                                              // 903
        structuralClassName = pendClasses(method, EVENT_CLASS_PREFIX, true);                                           // 904
      } else if (method) {                                                                                             // 905
        structuralClassName = method;                                                                                  // 906
      }                                                                                                                // 907
                                                                                                                       // 908
      if (options.addClass) {                                                                                          // 909
        addRemoveClassName += pendClasses(options.addClass, ADD_CLASS_SUFFIX);                                         // 910
      }                                                                                                                // 911
                                                                                                                       // 912
      if (options.removeClass) {                                                                                       // 913
        if (addRemoveClassName.length) {                                                                               // 914
          addRemoveClassName += ' ';                                                                                   // 915
        }                                                                                                              // 916
        addRemoveClassName += pendClasses(options.removeClass, REMOVE_CLASS_SUFFIX);                                   // 917
      }                                                                                                                // 918
                                                                                                                       // 919
      // there may be a situation where a structural animation is combined together                                    // 920
      // with CSS classes that need to resolve before the animation is computed.                                       // 921
      // However this means that there is no explicit CSS code to block the animation                                  // 922
      // from happening (by setting 0s none in the class name). If this is the case                                    // 923
      // we need to apply the classes before the first rAF so we know to continue if                                   // 924
      // there actually is a detected transition or keyframe animation                                                 // 925
      if (options.applyClassesEarly && addRemoveClassName.length) {                                                    // 926
        applyAnimationClasses(element, options);                                                                       // 927
      }                                                                                                                // 928
                                                                                                                       // 929
      var preparationClasses = [structuralClassName, addRemoveClassName].join(' ').trim();                             // 930
      var fullClassName = classes + ' ' + preparationClasses;                                                          // 931
      var activeClasses = pendClasses(preparationClasses, ACTIVE_CLASS_SUFFIX);                                        // 932
      var hasToStyles = styles.to && Object.keys(styles.to).length > 0;                                                // 933
      var containsKeyframeAnimation = (options.keyframeStyle || '').length > 0;                                        // 934
                                                                                                                       // 935
      // there is no way we can trigger an animation if no styles and                                                  // 936
      // no classes are being applied which would then trigger a transition,                                           // 937
      // unless there a is raw keyframe value that is applied to the element.                                          // 938
      if (!containsKeyframeAnimation                                                                                   // 939
           && !hasToStyles                                                                                             // 940
           && !preparationClasses) {                                                                                   // 941
        return closeAndReturnNoopAnimator();                                                                           // 942
      }                                                                                                                // 943
                                                                                                                       // 944
      var cacheKey, stagger;                                                                                           // 945
      if (options.stagger > 0) {                                                                                       // 946
        var staggerVal = parseFloat(options.stagger);                                                                  // 947
        stagger = {                                                                                                    // 948
          transitionDelay: staggerVal,                                                                                 // 949
          animationDelay: staggerVal,                                                                                  // 950
          transitionDuration: 0,                                                                                       // 951
          animationDuration: 0                                                                                         // 952
        };                                                                                                             // 953
      } else {                                                                                                         // 954
        cacheKey = gcsHashFn(node, fullClassName);                                                                     // 955
        stagger = computeCachedCssStaggerStyles(node, preparationClasses, cacheKey, DETECT_STAGGER_CSS_PROPERTIES);    // 956
      }                                                                                                                // 957
                                                                                                                       // 958
      if (!options.$$skipPreparationClasses) {                                                                         // 959
        $$jqLite.addClass(element, preparationClasses);                                                                // 960
      }                                                                                                                // 961
                                                                                                                       // 962
      var applyOnlyDuration;                                                                                           // 963
                                                                                                                       // 964
      if (options.transitionStyle) {                                                                                   // 965
        var transitionStyle = [TRANSITION_PROP, options.transitionStyle];                                              // 966
        applyInlineStyle(node, transitionStyle);                                                                       // 967
        temporaryStyles.push(transitionStyle);                                                                         // 968
      }                                                                                                                // 969
                                                                                                                       // 970
      if (options.duration >= 0) {                                                                                     // 971
        applyOnlyDuration = node.style[TRANSITION_PROP].length > 0;                                                    // 972
        var durationStyle = getCssTransitionDurationStyle(options.duration, applyOnlyDuration);                        // 973
                                                                                                                       // 974
        // we set the duration so that it will be picked up by getComputedStyle later                                  // 975
        applyInlineStyle(node, durationStyle);                                                                         // 976
        temporaryStyles.push(durationStyle);                                                                           // 977
      }                                                                                                                // 978
                                                                                                                       // 979
      if (options.keyframeStyle) {                                                                                     // 980
        var keyframeStyle = [ANIMATION_PROP, options.keyframeStyle];                                                   // 981
        applyInlineStyle(node, keyframeStyle);                                                                         // 982
        temporaryStyles.push(keyframeStyle);                                                                           // 983
      }                                                                                                                // 984
                                                                                                                       // 985
      var itemIndex = stagger                                                                                          // 986
          ? options.staggerIndex >= 0                                                                                  // 987
              ? options.staggerIndex                                                                                   // 988
              : gcsLookup.count(cacheKey)                                                                              // 989
          : 0;                                                                                                         // 990
                                                                                                                       // 991
      var isFirst = itemIndex === 0;                                                                                   // 992
                                                                                                                       // 993
      // this is a pre-emptive way of forcing the setup classes to be added and applied INSTANTLY                      // 994
      // without causing any combination of transitions to kick in. By adding a negative delay value                   // 995
      // it forces the setup class' transition to end immediately. We later then remove the negative                   // 996
      // transition delay to allow for the transition to naturally do it's thing. The beauty here is                   // 997
      // that if there is no transition defined then nothing will happen and this will also allow                      // 998
      // other transitions to be stacked on top of each other without any chopping them out.                           // 999
      if (isFirst && !options.skipBlocking) {                                                                          // 1000
        blockTransitions(node, SAFE_FAST_FORWARD_DURATION_VALUE);                                                      // 1001
      }                                                                                                                // 1002
                                                                                                                       // 1003
      var timings = computeTimings(node, fullClassName, cacheKey);                                                     // 1004
      var relativeDelay = timings.maxDelay;                                                                            // 1005
      maxDelay = Math.max(relativeDelay, 0);                                                                           // 1006
      maxDuration = timings.maxDuration;                                                                               // 1007
                                                                                                                       // 1008
      var flags = {};                                                                                                  // 1009
      flags.hasTransitions          = timings.transitionDuration > 0;                                                  // 1010
      flags.hasAnimations           = timings.animationDuration > 0;                                                   // 1011
      flags.hasTransitionAll        = flags.hasTransitions && timings.transitionProperty == 'all';                     // 1012
      flags.applyTransitionDuration = hasToStyles && (                                                                 // 1013
                                        (flags.hasTransitions && !flags.hasTransitionAll)                              // 1014
                                         || (flags.hasAnimations && !flags.hasTransitions));                           // 1015
      flags.applyAnimationDuration  = options.duration && flags.hasAnimations;                                         // 1016
      flags.applyTransitionDelay    = truthyTimingValue(options.delay) && (flags.applyTransitionDuration || flags.hasTransitions);
      flags.applyAnimationDelay     = truthyTimingValue(options.delay) && flags.hasAnimations;                         // 1018
      flags.recalculateTimingStyles = addRemoveClassName.length > 0;                                                   // 1019
                                                                                                                       // 1020
      if (flags.applyTransitionDuration || flags.applyAnimationDuration) {                                             // 1021
        maxDuration = options.duration ? parseFloat(options.duration) : maxDuration;                                   // 1022
                                                                                                                       // 1023
        if (flags.applyTransitionDuration) {                                                                           // 1024
          flags.hasTransitions = true;                                                                                 // 1025
          timings.transitionDuration = maxDuration;                                                                    // 1026
          applyOnlyDuration = node.style[TRANSITION_PROP + PROPERTY_KEY].length > 0;                                   // 1027
          temporaryStyles.push(getCssTransitionDurationStyle(maxDuration, applyOnlyDuration));                         // 1028
        }                                                                                                              // 1029
                                                                                                                       // 1030
        if (flags.applyAnimationDuration) {                                                                            // 1031
          flags.hasAnimations = true;                                                                                  // 1032
          timings.animationDuration = maxDuration;                                                                     // 1033
          temporaryStyles.push(getCssKeyframeDurationStyle(maxDuration));                                              // 1034
        }                                                                                                              // 1035
      }                                                                                                                // 1036
                                                                                                                       // 1037
      if (maxDuration === 0 && !flags.recalculateTimingStyles) {                                                       // 1038
        return closeAndReturnNoopAnimator();                                                                           // 1039
      }                                                                                                                // 1040
                                                                                                                       // 1041
      if (options.delay != null) {                                                                                     // 1042
        var delayStyle = parseFloat(options.delay);                                                                    // 1043
                                                                                                                       // 1044
        if (flags.applyTransitionDelay) {                                                                              // 1045
          temporaryStyles.push(getCssDelayStyle(delayStyle));                                                          // 1046
        }                                                                                                              // 1047
                                                                                                                       // 1048
        if (flags.applyAnimationDelay) {                                                                               // 1049
          temporaryStyles.push(getCssDelayStyle(delayStyle, true));                                                    // 1050
        }                                                                                                              // 1051
      }                                                                                                                // 1052
                                                                                                                       // 1053
      // we need to recalculate the delay value since we used a pre-emptive negative                                   // 1054
      // delay value and the delay value is required for the final event checking. This                                // 1055
      // property will ensure that this will happen after the RAF phase has passed.                                    // 1056
      if (options.duration == null && timings.transitionDuration > 0) {                                                // 1057
        flags.recalculateTimingStyles = flags.recalculateTimingStyles || isFirst;                                      // 1058
      }                                                                                                                // 1059
                                                                                                                       // 1060
      maxDelayTime = maxDelay * ONE_SECOND;                                                                            // 1061
      maxDurationTime = maxDuration * ONE_SECOND;                                                                      // 1062
      if (!options.skipBlocking) {                                                                                     // 1063
        flags.blockTransition = timings.transitionDuration > 0;                                                        // 1064
        flags.blockKeyframeAnimation = timings.animationDuration > 0 &&                                                // 1065
                                       stagger.animationDelay > 0 &&                                                   // 1066
                                       stagger.animationDuration === 0;                                                // 1067
      }                                                                                                                // 1068
                                                                                                                       // 1069
      applyAnimationFromStyles(element, options);                                                                      // 1070
                                                                                                                       // 1071
      if (flags.blockTransition || flags.blockKeyframeAnimation) {                                                     // 1072
        applyBlocking(maxDuration);                                                                                    // 1073
      } else if (!options.skipBlocking) {                                                                              // 1074
        blockTransitions(node, false);                                                                                 // 1075
      }                                                                                                                // 1076
                                                                                                                       // 1077
      // TODO(matsko): for 1.5 change this code to have an animator object for better debugging                        // 1078
      return {                                                                                                         // 1079
        $$willAnimate: true,                                                                                           // 1080
        end: endFn,                                                                                                    // 1081
        start: function() {                                                                                            // 1082
          if (animationClosed) return;                                                                                 // 1083
                                                                                                                       // 1084
          runnerHost = {                                                                                               // 1085
            end: endFn,                                                                                                // 1086
            cancel: cancelFn,                                                                                          // 1087
            resume: null, //this will be set during the start() phase                                                  // 1088
            pause: null                                                                                                // 1089
          };                                                                                                           // 1090
                                                                                                                       // 1091
          runner = new $$AnimateRunner(runnerHost);                                                                    // 1092
                                                                                                                       // 1093
          waitUntilQuiet(start);                                                                                       // 1094
                                                                                                                       // 1095
          // we don't have access to pause/resume the animation                                                        // 1096
          // since it hasn't run yet. AnimateRunner will therefore                                                     // 1097
          // set noop functions for resume and pause and they will                                                     // 1098
          // later be overridden once the animation is triggered                                                       // 1099
          return runner;                                                                                               // 1100
        }                                                                                                              // 1101
      };                                                                                                               // 1102
                                                                                                                       // 1103
      function endFn() {                                                                                               // 1104
        close();                                                                                                       // 1105
      }                                                                                                                // 1106
                                                                                                                       // 1107
      function cancelFn() {                                                                                            // 1108
        close(true);                                                                                                   // 1109
      }                                                                                                                // 1110
                                                                                                                       // 1111
      function close(rejected) { // jshint ignore:line                                                                 // 1112
        // if the promise has been called already then we shouldn't close                                              // 1113
        // the animation again                                                                                         // 1114
        if (animationClosed || (animationCompleted && animationPaused)) return;                                        // 1115
        animationClosed = true;                                                                                        // 1116
        animationPaused = false;                                                                                       // 1117
                                                                                                                       // 1118
        if (!options.$$skipPreparationClasses) {                                                                       // 1119
          $$jqLite.removeClass(element, preparationClasses);                                                           // 1120
        }                                                                                                              // 1121
        $$jqLite.removeClass(element, activeClasses);                                                                  // 1122
                                                                                                                       // 1123
        blockKeyframeAnimations(node, false);                                                                          // 1124
        blockTransitions(node, false);                                                                                 // 1125
                                                                                                                       // 1126
        forEach(temporaryStyles, function(entry) {                                                                     // 1127
          // There is only one way to remove inline style properties entirely from elements.                           // 1128
          // By using `removeProperty` this works, but we need to convert camel-cased CSS                              // 1129
          // styles down to hyphenated values.                                                                         // 1130
          node.style[entry[0]] = '';                                                                                   // 1131
        });                                                                                                            // 1132
                                                                                                                       // 1133
        applyAnimationClasses(element, options);                                                                       // 1134
        applyAnimationStyles(element, options);                                                                        // 1135
                                                                                                                       // 1136
        // the reason why we have this option is to allow a synchronous closing callback                               // 1137
        // that is fired as SOON as the animation ends (when the CSS is removed) or if                                 // 1138
        // the animation never takes off at all. A good example is a leave animation since                             // 1139
        // the element must be removed just after the animation is over or else the element                            // 1140
        // will appear on screen for one animation frame causing an overbearing flicker.                               // 1141
        if (options.onDone) {                                                                                          // 1142
          options.onDone();                                                                                            // 1143
        }                                                                                                              // 1144
                                                                                                                       // 1145
        // if the preparation function fails then the promise is not setup                                             // 1146
        if (runner) {                                                                                                  // 1147
          runner.complete(!rejected);                                                                                  // 1148
        }                                                                                                              // 1149
      }                                                                                                                // 1150
                                                                                                                       // 1151
      function applyBlocking(duration) {                                                                               // 1152
        if (flags.blockTransition) {                                                                                   // 1153
          blockTransitions(node, duration);                                                                            // 1154
        }                                                                                                              // 1155
                                                                                                                       // 1156
        if (flags.blockKeyframeAnimation) {                                                                            // 1157
          blockKeyframeAnimations(node, !!duration);                                                                   // 1158
        }                                                                                                              // 1159
      }                                                                                                                // 1160
                                                                                                                       // 1161
      function closeAndReturnNoopAnimator() {                                                                          // 1162
        runner = new $$AnimateRunner({                                                                                 // 1163
          end: endFn,                                                                                                  // 1164
          cancel: cancelFn                                                                                             // 1165
        });                                                                                                            // 1166
                                                                                                                       // 1167
        // should flush the cache animation                                                                            // 1168
        waitUntilQuiet(noop);                                                                                          // 1169
        close();                                                                                                       // 1170
                                                                                                                       // 1171
        return {                                                                                                       // 1172
          $$willAnimate: false,                                                                                        // 1173
          start: function() {                                                                                          // 1174
            return runner;                                                                                             // 1175
          },                                                                                                           // 1176
          end: endFn                                                                                                   // 1177
        };                                                                                                             // 1178
      }                                                                                                                // 1179
                                                                                                                       // 1180
      function start() {                                                                                               // 1181
        if (animationClosed) return;                                                                                   // 1182
        if (!node.parentNode) {                                                                                        // 1183
          close();                                                                                                     // 1184
          return;                                                                                                      // 1185
        }                                                                                                              // 1186
                                                                                                                       // 1187
        var startTime, events = [];                                                                                    // 1188
                                                                                                                       // 1189
        // even though we only pause keyframe animations here the pause flag                                           // 1190
        // will still happen when transitions are used. Only the transition will                                       // 1191
        // not be paused since that is not possible. If the animation ends when                                        // 1192
        // paused then it will not complete until unpaused or cancelled.                                               // 1193
        var playPause = function(playAnimation) {                                                                      // 1194
          if (!animationCompleted) {                                                                                   // 1195
            animationPaused = !playAnimation;                                                                          // 1196
            if (timings.animationDuration) {                                                                           // 1197
              var value = blockKeyframeAnimations(node, animationPaused);                                              // 1198
              animationPaused                                                                                          // 1199
                  ? temporaryStyles.push(value)                                                                        // 1200
                  : removeFromArray(temporaryStyles, value);                                                           // 1201
            }                                                                                                          // 1202
          } else if (animationPaused && playAnimation) {                                                               // 1203
            animationPaused = false;                                                                                   // 1204
            close();                                                                                                   // 1205
          }                                                                                                            // 1206
        };                                                                                                             // 1207
                                                                                                                       // 1208
        // checking the stagger duration prevents an accidently cascade of the CSS delay style                         // 1209
        // being inherited from the parent. If the transition duration is zero then we can safely                      // 1210
        // rely that the delay value is an intential stagger delay style.                                              // 1211
        var maxStagger = itemIndex > 0                                                                                 // 1212
                         && ((timings.transitionDuration && stagger.transitionDuration === 0) ||                       // 1213
                            (timings.animationDuration && stagger.animationDuration === 0))                            // 1214
                         && Math.max(stagger.animationDelay, stagger.transitionDelay);                                 // 1215
        if (maxStagger) {                                                                                              // 1216
          $timeout(triggerAnimationStart,                                                                              // 1217
                   Math.floor(maxStagger * itemIndex * ONE_SECOND),                                                    // 1218
                   false);                                                                                             // 1219
        } else {                                                                                                       // 1220
          triggerAnimationStart();                                                                                     // 1221
        }                                                                                                              // 1222
                                                                                                                       // 1223
        // this will decorate the existing promise runner with pause/resume methods                                    // 1224
        runnerHost.resume = function() {                                                                               // 1225
          playPause(true);                                                                                             // 1226
        };                                                                                                             // 1227
                                                                                                                       // 1228
        runnerHost.pause = function() {                                                                                // 1229
          playPause(false);                                                                                            // 1230
        };                                                                                                             // 1231
                                                                                                                       // 1232
        function triggerAnimationStart() {                                                                             // 1233
          // just incase a stagger animation kicks in when the animation                                               // 1234
          // itself was cancelled entirely                                                                             // 1235
          if (animationClosed) return;                                                                                 // 1236
                                                                                                                       // 1237
          applyBlocking(false);                                                                                        // 1238
                                                                                                                       // 1239
          forEach(temporaryStyles, function(entry) {                                                                   // 1240
            var key = entry[0];                                                                                        // 1241
            var value = entry[1];                                                                                      // 1242
            node.style[key] = value;                                                                                   // 1243
          });                                                                                                          // 1244
                                                                                                                       // 1245
          applyAnimationClasses(element, options);                                                                     // 1246
          $$jqLite.addClass(element, activeClasses);                                                                   // 1247
                                                                                                                       // 1248
          if (flags.recalculateTimingStyles) {                                                                         // 1249
            fullClassName = node.className + ' ' + preparationClasses;                                                 // 1250
            cacheKey = gcsHashFn(node, fullClassName);                                                                 // 1251
                                                                                                                       // 1252
            timings = computeTimings(node, fullClassName, cacheKey);                                                   // 1253
            relativeDelay = timings.maxDelay;                                                                          // 1254
            maxDelay = Math.max(relativeDelay, 0);                                                                     // 1255
            maxDuration = timings.maxDuration;                                                                         // 1256
                                                                                                                       // 1257
            if (maxDuration === 0) {                                                                                   // 1258
              close();                                                                                                 // 1259
              return;                                                                                                  // 1260
            }                                                                                                          // 1261
                                                                                                                       // 1262
            flags.hasTransitions = timings.transitionDuration > 0;                                                     // 1263
            flags.hasAnimations = timings.animationDuration > 0;                                                       // 1264
          }                                                                                                            // 1265
                                                                                                                       // 1266
          if (flags.applyAnimationDelay) {                                                                             // 1267
            relativeDelay = typeof options.delay !== "boolean" && truthyTimingValue(options.delay)                     // 1268
                  ? parseFloat(options.delay)                                                                          // 1269
                  : relativeDelay;                                                                                     // 1270
                                                                                                                       // 1271
            maxDelay = Math.max(relativeDelay, 0);                                                                     // 1272
            timings.animationDelay = relativeDelay;                                                                    // 1273
            delayStyle = getCssDelayStyle(relativeDelay, true);                                                        // 1274
            temporaryStyles.push(delayStyle);                                                                          // 1275
            node.style[delayStyle[0]] = delayStyle[1];                                                                 // 1276
          }                                                                                                            // 1277
                                                                                                                       // 1278
          maxDelayTime = maxDelay * ONE_SECOND;                                                                        // 1279
          maxDurationTime = maxDuration * ONE_SECOND;                                                                  // 1280
                                                                                                                       // 1281
          if (options.easing) {                                                                                        // 1282
            var easeProp, easeVal = options.easing;                                                                    // 1283
            if (flags.hasTransitions) {                                                                                // 1284
              easeProp = TRANSITION_PROP + TIMING_KEY;                                                                 // 1285
              temporaryStyles.push([easeProp, easeVal]);                                                               // 1286
              node.style[easeProp] = easeVal;                                                                          // 1287
            }                                                                                                          // 1288
            if (flags.hasAnimations) {                                                                                 // 1289
              easeProp = ANIMATION_PROP + TIMING_KEY;                                                                  // 1290
              temporaryStyles.push([easeProp, easeVal]);                                                               // 1291
              node.style[easeProp] = easeVal;                                                                          // 1292
            }                                                                                                          // 1293
          }                                                                                                            // 1294
                                                                                                                       // 1295
          if (timings.transitionDuration) {                                                                            // 1296
            events.push(TRANSITIONEND_EVENT);                                                                          // 1297
          }                                                                                                            // 1298
                                                                                                                       // 1299
          if (timings.animationDuration) {                                                                             // 1300
            events.push(ANIMATIONEND_EVENT);                                                                           // 1301
          }                                                                                                            // 1302
                                                                                                                       // 1303
          startTime = Date.now();                                                                                      // 1304
          var timerTime = maxDelayTime + CLOSING_TIME_BUFFER * maxDurationTime;                                        // 1305
          var endTime = startTime + timerTime;                                                                         // 1306
                                                                                                                       // 1307
          var animationsData = element.data(ANIMATE_TIMER_KEY) || [];                                                  // 1308
          var setupFallbackTimer = true;                                                                               // 1309
          if (animationsData.length) {                                                                                 // 1310
            var currentTimerData = animationsData[0];                                                                  // 1311
            setupFallbackTimer = endTime > currentTimerData.expectedEndTime;                                           // 1312
            if (setupFallbackTimer) {                                                                                  // 1313
              $timeout.cancel(currentTimerData.timer);                                                                 // 1314
            } else {                                                                                                   // 1315
              animationsData.push(close);                                                                              // 1316
            }                                                                                                          // 1317
          }                                                                                                            // 1318
                                                                                                                       // 1319
          if (setupFallbackTimer) {                                                                                    // 1320
            var timer = $timeout(onAnimationExpired, timerTime, false);                                                // 1321
            animationsData[0] = {                                                                                      // 1322
              timer: timer,                                                                                            // 1323
              expectedEndTime: endTime                                                                                 // 1324
            };                                                                                                         // 1325
            animationsData.push(close);                                                                                // 1326
            element.data(ANIMATE_TIMER_KEY, animationsData);                                                           // 1327
          }                                                                                                            // 1328
                                                                                                                       // 1329
          element.on(events.join(' '), onAnimationProgress);                                                           // 1330
          applyAnimationToStyles(element, options);                                                                    // 1331
        }                                                                                                              // 1332
                                                                                                                       // 1333
        function onAnimationExpired() {                                                                                // 1334
          var animationsData = element.data(ANIMATE_TIMER_KEY);                                                        // 1335
                                                                                                                       // 1336
          // this will be false in the event that the element was                                                      // 1337
          // removed from the DOM (via a leave animation or something                                                  // 1338
          // similar)                                                                                                  // 1339
          if (animationsData) {                                                                                        // 1340
            for (var i = 1; i < animationsData.length; i++) {                                                          // 1341
              animationsData[i]();                                                                                     // 1342
            }                                                                                                          // 1343
            element.removeData(ANIMATE_TIMER_KEY);                                                                     // 1344
          }                                                                                                            // 1345
        }                                                                                                              // 1346
                                                                                                                       // 1347
        function onAnimationProgress(event) {                                                                          // 1348
          event.stopPropagation();                                                                                     // 1349
          var ev = event.originalEvent || event;                                                                       // 1350
          var timeStamp = ev.$manualTimeStamp || ev.timeStamp || Date.now();                                           // 1351
                                                                                                                       // 1352
          /* Firefox (or possibly just Gecko) likes to not round values up                                             // 1353
           * when a ms measurement is used for the animation */                                                        // 1354
          var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));                       // 1355
                                                                                                                       // 1356
          /* $manualTimeStamp is a mocked timeStamp value which is set                                                 // 1357
           * within browserTrigger(). This is only here so that tests can                                              // 1358
           * mock animations properly. Real events fallback to event.timeStamp,                                        // 1359
           * or, if they don't, then a timeStamp is automatically created for them.                                    // 1360
           * We're checking to see if the timeStamp surpasses the expected delay,                                      // 1361
           * but we're using elapsedTime instead of the timeStamp on the 2nd                                           // 1362
           * pre-condition since animations sometimes close off early */                                               // 1363
          if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {                      // 1364
            // we set this flag to ensure that if the transition is paused then, when resumed,                         // 1365
            // the animation will automatically close itself since transitions cannot be paused.                       // 1366
            animationCompleted = true;                                                                                 // 1367
            close();                                                                                                   // 1368
          }                                                                                                            // 1369
        }                                                                                                              // 1370
      }                                                                                                                // 1371
    };                                                                                                                 // 1372
  }];                                                                                                                  // 1373
}];                                                                                                                    // 1374
                                                                                                                       // 1375
var $$AnimateCssDriverProvider = ['$$animationProvider', function($$animationProvider) {                               // 1376
  $$animationProvider.drivers.push('$$animateCssDriver');                                                              // 1377
                                                                                                                       // 1378
  var NG_ANIMATE_SHIM_CLASS_NAME = 'ng-animate-shim';                                                                  // 1379
  var NG_ANIMATE_ANCHOR_CLASS_NAME = 'ng-anchor';                                                                      // 1380
                                                                                                                       // 1381
  var NG_OUT_ANCHOR_CLASS_NAME = 'ng-anchor-out';                                                                      // 1382
  var NG_IN_ANCHOR_CLASS_NAME = 'ng-anchor-in';                                                                        // 1383
                                                                                                                       // 1384
  this.$get = ['$animateCss', '$rootScope', '$$AnimateRunner', '$rootElement', '$$body', '$sniffer', '$$jqLite',       // 1385
       function($animateCss,   $rootScope,   $$AnimateRunner,   $rootElement,   $$body,   $sniffer,   $$jqLite) {      // 1386
                                                                                                                       // 1387
    // only browsers that support these properties can render animations                                               // 1388
    if (!$sniffer.animations && !$sniffer.transitions) return noop;                                                    // 1389
                                                                                                                       // 1390
    var bodyNode = getDomNode($$body);                                                                                 // 1391
    var rootNode = getDomNode($rootElement);                                                                           // 1392
                                                                                                                       // 1393
    var rootBodyElement = jqLite(bodyNode.parentNode === rootNode ? bodyNode : rootNode);                              // 1394
                                                                                                                       // 1395
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 1396
                                                                                                                       // 1397
    return function initDriverFn(animationDetails) {                                                                   // 1398
      return animationDetails.from && animationDetails.to                                                              // 1399
          ? prepareFromToAnchorAnimation(animationDetails.from,                                                        // 1400
                                         animationDetails.to,                                                          // 1401
                                         animationDetails.classes,                                                     // 1402
                                         animationDetails.anchors)                                                     // 1403
          : prepareRegularAnimation(animationDetails);                                                                 // 1404
    };                                                                                                                 // 1405
                                                                                                                       // 1406
    function filterCssClasses(classes) {                                                                               // 1407
      //remove all the `ng-` stuff                                                                                     // 1408
      return classes.replace(/\bng-\S+\b/g, '');                                                                       // 1409
    }                                                                                                                  // 1410
                                                                                                                       // 1411
    function getUniqueValues(a, b) {                                                                                   // 1412
      if (isString(a)) a = a.split(' ');                                                                               // 1413
      if (isString(b)) b = b.split(' ');                                                                               // 1414
      return a.filter(function(val) {                                                                                  // 1415
        return b.indexOf(val) === -1;                                                                                  // 1416
      }).join(' ');                                                                                                    // 1417
    }                                                                                                                  // 1418
                                                                                                                       // 1419
    function prepareAnchoredAnimation(classes, outAnchor, inAnchor) {                                                  // 1420
      var clone = jqLite(getDomNode(outAnchor).cloneNode(true));                                                       // 1421
      var startingClasses = filterCssClasses(getClassVal(clone));                                                      // 1422
                                                                                                                       // 1423
      outAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                                  // 1424
      inAnchor.addClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                                   // 1425
                                                                                                                       // 1426
      clone.addClass(NG_ANIMATE_ANCHOR_CLASS_NAME);                                                                    // 1427
                                                                                                                       // 1428
      rootBodyElement.append(clone);                                                                                   // 1429
                                                                                                                       // 1430
      var animatorIn, animatorOut = prepareOutAnimation();                                                             // 1431
                                                                                                                       // 1432
      // the user may not end up using the `out` animation and                                                         // 1433
      // only making use of the `in` animation or vice-versa.                                                          // 1434
      // In either case we should allow this and not assume the                                                        // 1435
      // animation is over unless both animations are not used.                                                        // 1436
      if (!animatorOut) {                                                                                              // 1437
        animatorIn = prepareInAnimation();                                                                             // 1438
        if (!animatorIn) {                                                                                             // 1439
          return end();                                                                                                // 1440
        }                                                                                                              // 1441
      }                                                                                                                // 1442
                                                                                                                       // 1443
      var startingAnimator = animatorOut || animatorIn;                                                                // 1444
                                                                                                                       // 1445
      return {                                                                                                         // 1446
        start: function() {                                                                                            // 1447
          var runner;                                                                                                  // 1448
                                                                                                                       // 1449
          var currentAnimation = startingAnimator.start();                                                             // 1450
          currentAnimation.done(function() {                                                                           // 1451
            currentAnimation = null;                                                                                   // 1452
            if (!animatorIn) {                                                                                         // 1453
              animatorIn = prepareInAnimation();                                                                       // 1454
              if (animatorIn) {                                                                                        // 1455
                currentAnimation = animatorIn.start();                                                                 // 1456
                currentAnimation.done(function() {                                                                     // 1457
                  currentAnimation = null;                                                                             // 1458
                  end();                                                                                               // 1459
                  runner.complete();                                                                                   // 1460
                });                                                                                                    // 1461
                return currentAnimation;                                                                               // 1462
              }                                                                                                        // 1463
            }                                                                                                          // 1464
            // in the event that there is no `in` animation                                                            // 1465
            end();                                                                                                     // 1466
            runner.complete();                                                                                         // 1467
          });                                                                                                          // 1468
                                                                                                                       // 1469
          runner = new $$AnimateRunner({                                                                               // 1470
            end: endFn,                                                                                                // 1471
            cancel: endFn                                                                                              // 1472
          });                                                                                                          // 1473
                                                                                                                       // 1474
          return runner;                                                                                               // 1475
                                                                                                                       // 1476
          function endFn() {                                                                                           // 1477
            if (currentAnimation) {                                                                                    // 1478
              currentAnimation.end();                                                                                  // 1479
            }                                                                                                          // 1480
          }                                                                                                            // 1481
        }                                                                                                              // 1482
      };                                                                                                               // 1483
                                                                                                                       // 1484
      function calculateAnchorStyles(anchor) {                                                                         // 1485
        var styles = {};                                                                                               // 1486
                                                                                                                       // 1487
        var coords = getDomNode(anchor).getBoundingClientRect();                                                       // 1488
                                                                                                                       // 1489
        // we iterate directly since safari messes up and doesn't return                                               // 1490
        // all the keys for the coods object when iterated                                                             // 1491
        forEach(['width','height','top','left'], function(key) {                                                       // 1492
          var value = coords[key];                                                                                     // 1493
          switch (key) {                                                                                               // 1494
            case 'top':                                                                                                // 1495
              value += bodyNode.scrollTop;                                                                             // 1496
              break;                                                                                                   // 1497
            case 'left':                                                                                               // 1498
              value += bodyNode.scrollLeft;                                                                            // 1499
              break;                                                                                                   // 1500
          }                                                                                                            // 1501
          styles[key] = Math.floor(value) + 'px';                                                                      // 1502
        });                                                                                                            // 1503
        return styles;                                                                                                 // 1504
      }                                                                                                                // 1505
                                                                                                                       // 1506
      function prepareOutAnimation() {                                                                                 // 1507
        var animator = $animateCss(clone, {                                                                            // 1508
          addClass: NG_OUT_ANCHOR_CLASS_NAME,                                                                          // 1509
          delay: true,                                                                                                 // 1510
          from: calculateAnchorStyles(outAnchor)                                                                       // 1511
        });                                                                                                            // 1512
                                                                                                                       // 1513
        // read the comment within `prepareRegularAnimation` to understand                                             // 1514
        // why this check is necessary                                                                                 // 1515
        return animator.$$willAnimate ? animator : null;                                                               // 1516
      }                                                                                                                // 1517
                                                                                                                       // 1518
      function getClassVal(element) {                                                                                  // 1519
        return element.attr('class') || '';                                                                            // 1520
      }                                                                                                                // 1521
                                                                                                                       // 1522
      function prepareInAnimation() {                                                                                  // 1523
        var endingClasses = filterCssClasses(getClassVal(inAnchor));                                                   // 1524
        var toAdd = getUniqueValues(endingClasses, startingClasses);                                                   // 1525
        var toRemove = getUniqueValues(startingClasses, endingClasses);                                                // 1526
                                                                                                                       // 1527
        var animator = $animateCss(clone, {                                                                            // 1528
          to: calculateAnchorStyles(inAnchor),                                                                         // 1529
          addClass: NG_IN_ANCHOR_CLASS_NAME + ' ' + toAdd,                                                             // 1530
          removeClass: NG_OUT_ANCHOR_CLASS_NAME + ' ' + toRemove,                                                      // 1531
          delay: true                                                                                                  // 1532
        });                                                                                                            // 1533
                                                                                                                       // 1534
        // read the comment within `prepareRegularAnimation` to understand                                             // 1535
        // why this check is necessary                                                                                 // 1536
        return animator.$$willAnimate ? animator : null;                                                               // 1537
      }                                                                                                                // 1538
                                                                                                                       // 1539
      function end() {                                                                                                 // 1540
        clone.remove();                                                                                                // 1541
        outAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                             // 1542
        inAnchor.removeClass(NG_ANIMATE_SHIM_CLASS_NAME);                                                              // 1543
      }                                                                                                                // 1544
    }                                                                                                                  // 1545
                                                                                                                       // 1546
    function prepareFromToAnchorAnimation(from, to, classes, anchors) {                                                // 1547
      var fromAnimation = prepareRegularAnimation(from, noop);                                                         // 1548
      var toAnimation = prepareRegularAnimation(to, noop);                                                             // 1549
                                                                                                                       // 1550
      var anchorAnimations = [];                                                                                       // 1551
      forEach(anchors, function(anchor) {                                                                              // 1552
        var outElement = anchor['out'];                                                                                // 1553
        var inElement = anchor['in'];                                                                                  // 1554
        var animator = prepareAnchoredAnimation(classes, outElement, inElement);                                       // 1555
        if (animator) {                                                                                                // 1556
          anchorAnimations.push(animator);                                                                             // 1557
        }                                                                                                              // 1558
      });                                                                                                              // 1559
                                                                                                                       // 1560
      // no point in doing anything when there are no elements to animate                                              // 1561
      if (!fromAnimation && !toAnimation && anchorAnimations.length === 0) return;                                     // 1562
                                                                                                                       // 1563
      return {                                                                                                         // 1564
        start: function() {                                                                                            // 1565
          var animationRunners = [];                                                                                   // 1566
                                                                                                                       // 1567
          if (fromAnimation) {                                                                                         // 1568
            animationRunners.push(fromAnimation.start());                                                              // 1569
          }                                                                                                            // 1570
                                                                                                                       // 1571
          if (toAnimation) {                                                                                           // 1572
            animationRunners.push(toAnimation.start());                                                                // 1573
          }                                                                                                            // 1574
                                                                                                                       // 1575
          forEach(anchorAnimations, function(animation) {                                                              // 1576
            animationRunners.push(animation.start());                                                                  // 1577
          });                                                                                                          // 1578
                                                                                                                       // 1579
          var runner = new $$AnimateRunner({                                                                           // 1580
            end: endFn,                                                                                                // 1581
            cancel: endFn // CSS-driven animations cannot be cancelled, only ended                                     // 1582
          });                                                                                                          // 1583
                                                                                                                       // 1584
          $$AnimateRunner.all(animationRunners, function(status) {                                                     // 1585
            runner.complete(status);                                                                                   // 1586
          });                                                                                                          // 1587
                                                                                                                       // 1588
          return runner;                                                                                               // 1589
                                                                                                                       // 1590
          function endFn() {                                                                                           // 1591
            forEach(animationRunners, function(runner) {                                                               // 1592
              runner.end();                                                                                            // 1593
            });                                                                                                        // 1594
          }                                                                                                            // 1595
        }                                                                                                              // 1596
      };                                                                                                               // 1597
    }                                                                                                                  // 1598
                                                                                                                       // 1599
    function prepareRegularAnimation(animationDetails) {                                                               // 1600
      var element = animationDetails.element;                                                                          // 1601
      var options = animationDetails.options || {};                                                                    // 1602
                                                                                                                       // 1603
      if (animationDetails.structural) {                                                                               // 1604
        options.event = animationDetails.event;                                                                        // 1605
        options.structural = true;                                                                                     // 1606
        options.applyClassesEarly = true;                                                                              // 1607
                                                                                                                       // 1608
        // we special case the leave animation since we want to ensure that                                            // 1609
        // the element is removed as soon as the animation is over. Otherwise                                          // 1610
        // a flicker might appear or the element may not be removed at all                                             // 1611
        if (animationDetails.event === 'leave') {                                                                      // 1612
          options.onDone = options.domOperation;                                                                       // 1613
        }                                                                                                              // 1614
      }                                                                                                                // 1615
                                                                                                                       // 1616
      // We assign the preparationClasses as the actual animation event since                                          // 1617
      // the internals of $animateCss will just suffix the event token values                                          // 1618
      // with `-active` to trigger the animation.                                                                      // 1619
      if (options.preparationClasses) {                                                                                // 1620
        options.event = concatWithSpace(options.event, options.preparationClasses);                                    // 1621
      }                                                                                                                // 1622
                                                                                                                       // 1623
      var animator = $animateCss(element, options);                                                                    // 1624
                                                                                                                       // 1625
      // the driver lookup code inside of $$animation attempts to spawn a                                              // 1626
      // driver one by one until a driver returns a.$$willAnimate animator object.                                     // 1627
      // $animateCss will always return an object, however, it will pass in                                            // 1628
      // a flag as a hint as to whether an animation was detected or not                                               // 1629
      return animator.$$willAnimate ? animator : null;                                                                 // 1630
    }                                                                                                                  // 1631
  }];                                                                                                                  // 1632
}];                                                                                                                    // 1633
                                                                                                                       // 1634
// TODO(matsko): use caching here to speed things up for detection                                                     // 1635
// TODO(matsko): add documentation                                                                                     // 1636
//  by the time...                                                                                                     // 1637
                                                                                                                       // 1638
var $$AnimateJsProvider = ['$animateProvider', function($animateProvider) {                                            // 1639
  this.$get = ['$injector', '$$AnimateRunner', '$$jqLite',                                                             // 1640
       function($injector,   $$AnimateRunner,   $$jqLite) {                                                            // 1641
                                                                                                                       // 1642
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 1643
         // $animateJs(element, 'enter');                                                                              // 1644
    return function(element, event, classes, options) {                                                                // 1645
      // the `classes` argument is optional and if it is not used                                                      // 1646
      // then the classes will be resolved from the element's className                                                // 1647
      // property as well as options.addClass/options.removeClass.                                                     // 1648
      if (arguments.length === 3 && isObject(classes)) {                                                               // 1649
        options = classes;                                                                                             // 1650
        classes = null;                                                                                                // 1651
      }                                                                                                                // 1652
                                                                                                                       // 1653
      options = prepareAnimationOptions(options);                                                                      // 1654
      if (!classes) {                                                                                                  // 1655
        classes = element.attr('class') || '';                                                                         // 1656
        if (options.addClass) {                                                                                        // 1657
          classes += ' ' + options.addClass;                                                                           // 1658
        }                                                                                                              // 1659
        if (options.removeClass) {                                                                                     // 1660
          classes += ' ' + options.removeClass;                                                                        // 1661
        }                                                                                                              // 1662
      }                                                                                                                // 1663
                                                                                                                       // 1664
      var classesToAdd = options.addClass;                                                                             // 1665
      var classesToRemove = options.removeClass;                                                                       // 1666
                                                                                                                       // 1667
      // the lookupAnimations function returns a series of animation objects that are                                  // 1668
      // matched up with one or more of the CSS classes. These animation objects are                                   // 1669
      // defined via the module.animation factory function. If nothing is detected then                                // 1670
      // we don't return anything which then makes $animation query the next driver.                                   // 1671
      var animations = lookupAnimations(classes);                                                                      // 1672
      var before, after;                                                                                               // 1673
      if (animations.length) {                                                                                         // 1674
        var afterFn, beforeFn;                                                                                         // 1675
        if (event == 'leave') {                                                                                        // 1676
          beforeFn = 'leave';                                                                                          // 1677
          afterFn = 'afterLeave'; // TODO(matsko): get rid of this                                                     // 1678
        } else {                                                                                                       // 1679
          beforeFn = 'before' + event.charAt(0).toUpperCase() + event.substr(1);                                       // 1680
          afterFn = event;                                                                                             // 1681
        }                                                                                                              // 1682
                                                                                                                       // 1683
        if (event !== 'enter' && event !== 'move') {                                                                   // 1684
          before = packageAnimations(element, event, options, animations, beforeFn);                                   // 1685
        }                                                                                                              // 1686
        after  = packageAnimations(element, event, options, animations, afterFn);                                      // 1687
      }                                                                                                                // 1688
                                                                                                                       // 1689
      // no matching animations                                                                                        // 1690
      if (!before && !after) return;                                                                                   // 1691
                                                                                                                       // 1692
      function applyOptions() {                                                                                        // 1693
        options.domOperation();                                                                                        // 1694
        applyAnimationClasses(element, options);                                                                       // 1695
      }                                                                                                                // 1696
                                                                                                                       // 1697
      return {                                                                                                         // 1698
        start: function() {                                                                                            // 1699
          var closeActiveAnimations;                                                                                   // 1700
          var chain = [];                                                                                              // 1701
                                                                                                                       // 1702
          if (before) {                                                                                                // 1703
            chain.push(function(fn) {                                                                                  // 1704
              closeActiveAnimations = before(fn);                                                                      // 1705
            });                                                                                                        // 1706
          }                                                                                                            // 1707
                                                                                                                       // 1708
          if (chain.length) {                                                                                          // 1709
            chain.push(function(fn) {                                                                                  // 1710
              applyOptions();                                                                                          // 1711
              fn(true);                                                                                                // 1712
            });                                                                                                        // 1713
          } else {                                                                                                     // 1714
            applyOptions();                                                                                            // 1715
          }                                                                                                            // 1716
                                                                                                                       // 1717
          if (after) {                                                                                                 // 1718
            chain.push(function(fn) {                                                                                  // 1719
              closeActiveAnimations = after(fn);                                                                       // 1720
            });                                                                                                        // 1721
          }                                                                                                            // 1722
                                                                                                                       // 1723
          var animationClosed = false;                                                                                 // 1724
          var runner = new $$AnimateRunner({                                                                           // 1725
            end: function() {                                                                                          // 1726
              endAnimations();                                                                                         // 1727
            },                                                                                                         // 1728
            cancel: function() {                                                                                       // 1729
              endAnimations(true);                                                                                     // 1730
            }                                                                                                          // 1731
          });                                                                                                          // 1732
                                                                                                                       // 1733
          $$AnimateRunner.chain(chain, onComplete);                                                                    // 1734
          return runner;                                                                                               // 1735
                                                                                                                       // 1736
          function onComplete(success) {                                                                               // 1737
            animationClosed = true;                                                                                    // 1738
            applyOptions();                                                                                            // 1739
            applyAnimationStyles(element, options);                                                                    // 1740
            runner.complete(success);                                                                                  // 1741
          }                                                                                                            // 1742
                                                                                                                       // 1743
          function endAnimations(cancelled) {                                                                          // 1744
            if (!animationClosed) {                                                                                    // 1745
              (closeActiveAnimations || noop)(cancelled);                                                              // 1746
              onComplete(cancelled);                                                                                   // 1747
            }                                                                                                          // 1748
          }                                                                                                            // 1749
        }                                                                                                              // 1750
      };                                                                                                               // 1751
                                                                                                                       // 1752
      function executeAnimationFn(fn, element, event, options, onDone) {                                               // 1753
        var args;                                                                                                      // 1754
        switch (event) {                                                                                               // 1755
          case 'animate':                                                                                              // 1756
            args = [element, options.from, options.to, onDone];                                                        // 1757
            break;                                                                                                     // 1758
                                                                                                                       // 1759
          case 'setClass':                                                                                             // 1760
            args = [element, classesToAdd, classesToRemove, onDone];                                                   // 1761
            break;                                                                                                     // 1762
                                                                                                                       // 1763
          case 'addClass':                                                                                             // 1764
            args = [element, classesToAdd, onDone];                                                                    // 1765
            break;                                                                                                     // 1766
                                                                                                                       // 1767
          case 'removeClass':                                                                                          // 1768
            args = [element, classesToRemove, onDone];                                                                 // 1769
            break;                                                                                                     // 1770
                                                                                                                       // 1771
          default:                                                                                                     // 1772
            args = [element, onDone];                                                                                  // 1773
            break;                                                                                                     // 1774
        }                                                                                                              // 1775
                                                                                                                       // 1776
        args.push(options);                                                                                            // 1777
                                                                                                                       // 1778
        var value = fn.apply(fn, args);                                                                                // 1779
        if (value) {                                                                                                   // 1780
          if (isFunction(value.start)) {                                                                               // 1781
            value = value.start();                                                                                     // 1782
          }                                                                                                            // 1783
                                                                                                                       // 1784
          if (value instanceof $$AnimateRunner) {                                                                      // 1785
            value.done(onDone);                                                                                        // 1786
          } else if (isFunction(value)) {                                                                              // 1787
            // optional onEnd / onCancel callback                                                                      // 1788
            return value;                                                                                              // 1789
          }                                                                                                            // 1790
        }                                                                                                              // 1791
                                                                                                                       // 1792
        return noop;                                                                                                   // 1793
      }                                                                                                                // 1794
                                                                                                                       // 1795
      function groupEventedAnimations(element, event, options, animations, fnName) {                                   // 1796
        var operations = [];                                                                                           // 1797
        forEach(animations, function(ani) {                                                                            // 1798
          var animation = ani[fnName];                                                                                 // 1799
          if (!animation) return;                                                                                      // 1800
                                                                                                                       // 1801
          // note that all of these animations will run in parallel                                                    // 1802
          operations.push(function() {                                                                                 // 1803
            var runner;                                                                                                // 1804
            var endProgressCb;                                                                                         // 1805
                                                                                                                       // 1806
            var resolved = false;                                                                                      // 1807
            var onAnimationComplete = function(rejected) {                                                             // 1808
              if (!resolved) {                                                                                         // 1809
                resolved = true;                                                                                       // 1810
                (endProgressCb || noop)(rejected);                                                                     // 1811
                runner.complete(!rejected);                                                                            // 1812
              }                                                                                                        // 1813
            };                                                                                                         // 1814
                                                                                                                       // 1815
            runner = new $$AnimateRunner({                                                                             // 1816
              end: function() {                                                                                        // 1817
                onAnimationComplete();                                                                                 // 1818
              },                                                                                                       // 1819
              cancel: function() {                                                                                     // 1820
                onAnimationComplete(true);                                                                             // 1821
              }                                                                                                        // 1822
            });                                                                                                        // 1823
                                                                                                                       // 1824
            endProgressCb = executeAnimationFn(animation, element, event, options, function(result) {                  // 1825
              var cancelled = result === false;                                                                        // 1826
              onAnimationComplete(cancelled);                                                                          // 1827
            });                                                                                                        // 1828
                                                                                                                       // 1829
            return runner;                                                                                             // 1830
          });                                                                                                          // 1831
        });                                                                                                            // 1832
                                                                                                                       // 1833
        return operations;                                                                                             // 1834
      }                                                                                                                // 1835
                                                                                                                       // 1836
      function packageAnimations(element, event, options, animations, fnName) {                                        // 1837
        var operations = groupEventedAnimations(element, event, options, animations, fnName);                          // 1838
        if (operations.length === 0) {                                                                                 // 1839
          var a,b;                                                                                                     // 1840
          if (fnName === 'beforeSetClass') {                                                                           // 1841
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'beforeRemoveClass');              // 1842
            b = groupEventedAnimations(element, 'addClass', options, animations, 'beforeAddClass');                    // 1843
          } else if (fnName === 'setClass') {                                                                          // 1844
            a = groupEventedAnimations(element, 'removeClass', options, animations, 'removeClass');                    // 1845
            b = groupEventedAnimations(element, 'addClass', options, animations, 'addClass');                          // 1846
          }                                                                                                            // 1847
                                                                                                                       // 1848
          if (a) {                                                                                                     // 1849
            operations = operations.concat(a);                                                                         // 1850
          }                                                                                                            // 1851
          if (b) {                                                                                                     // 1852
            operations = operations.concat(b);                                                                         // 1853
          }                                                                                                            // 1854
        }                                                                                                              // 1855
                                                                                                                       // 1856
        if (operations.length === 0) return;                                                                           // 1857
                                                                                                                       // 1858
        // TODO(matsko): add documentation                                                                             // 1859
        return function startAnimation(callback) {                                                                     // 1860
          var runners = [];                                                                                            // 1861
          if (operations.length) {                                                                                     // 1862
            forEach(operations, function(animateFn) {                                                                  // 1863
              runners.push(animateFn());                                                                               // 1864
            });                                                                                                        // 1865
          }                                                                                                            // 1866
                                                                                                                       // 1867
          runners.length ? $$AnimateRunner.all(runners, callback) : callback();                                        // 1868
                                                                                                                       // 1869
          return function endFn(reject) {                                                                              // 1870
            forEach(runners, function(runner) {                                                                        // 1871
              reject ? runner.cancel() : runner.end();                                                                 // 1872
            });                                                                                                        // 1873
          };                                                                                                           // 1874
        };                                                                                                             // 1875
      }                                                                                                                // 1876
    };                                                                                                                 // 1877
                                                                                                                       // 1878
    function lookupAnimations(classes) {                                                                               // 1879
      classes = isArray(classes) ? classes : classes.split(' ');                                                       // 1880
      var matches = [], flagMap = {};                                                                                  // 1881
      for (var i=0; i < classes.length; i++) {                                                                         // 1882
        var klass = classes[i],                                                                                        // 1883
            animationFactory = $animateProvider.$$registeredAnimations[klass];                                         // 1884
        if (animationFactory && !flagMap[klass]) {                                                                     // 1885
          matches.push($injector.get(animationFactory));                                                               // 1886
          flagMap[klass] = true;                                                                                       // 1887
        }                                                                                                              // 1888
      }                                                                                                                // 1889
      return matches;                                                                                                  // 1890
    }                                                                                                                  // 1891
  }];                                                                                                                  // 1892
}];                                                                                                                    // 1893
                                                                                                                       // 1894
var $$AnimateJsDriverProvider = ['$$animationProvider', function($$animationProvider) {                                // 1895
  $$animationProvider.drivers.push('$$animateJsDriver');                                                               // 1896
  this.$get = ['$$animateJs', '$$AnimateRunner', function($$animateJs, $$AnimateRunner) {                              // 1897
    return function initDriverFn(animationDetails) {                                                                   // 1898
      if (animationDetails.from && animationDetails.to) {                                                              // 1899
        var fromAnimation = prepareAnimation(animationDetails.from);                                                   // 1900
        var toAnimation = prepareAnimation(animationDetails.to);                                                       // 1901
        if (!fromAnimation && !toAnimation) return;                                                                    // 1902
                                                                                                                       // 1903
        return {                                                                                                       // 1904
          start: function() {                                                                                          // 1905
            var animationRunners = [];                                                                                 // 1906
                                                                                                                       // 1907
            if (fromAnimation) {                                                                                       // 1908
              animationRunners.push(fromAnimation.start());                                                            // 1909
            }                                                                                                          // 1910
                                                                                                                       // 1911
            if (toAnimation) {                                                                                         // 1912
              animationRunners.push(toAnimation.start());                                                              // 1913
            }                                                                                                          // 1914
                                                                                                                       // 1915
            $$AnimateRunner.all(animationRunners, done);                                                               // 1916
                                                                                                                       // 1917
            var runner = new $$AnimateRunner({                                                                         // 1918
              end: endFnFactory(),                                                                                     // 1919
              cancel: endFnFactory()                                                                                   // 1920
            });                                                                                                        // 1921
                                                                                                                       // 1922
            return runner;                                                                                             // 1923
                                                                                                                       // 1924
            function endFnFactory() {                                                                                  // 1925
              return function() {                                                                                      // 1926
                forEach(animationRunners, function(runner) {                                                           // 1927
                  // at this point we cannot cancel animations for groups just yet. 1.5+                               // 1928
                  runner.end();                                                                                        // 1929
                });                                                                                                    // 1930
              };                                                                                                       // 1931
            }                                                                                                          // 1932
                                                                                                                       // 1933
            function done(status) {                                                                                    // 1934
              runner.complete(status);                                                                                 // 1935
            }                                                                                                          // 1936
          }                                                                                                            // 1937
        };                                                                                                             // 1938
      } else {                                                                                                         // 1939
        return prepareAnimation(animationDetails);                                                                     // 1940
      }                                                                                                                // 1941
    };                                                                                                                 // 1942
                                                                                                                       // 1943
    function prepareAnimation(animationDetails) {                                                                      // 1944
      // TODO(matsko): make sure to check for grouped animations and delegate down to normal animations                // 1945
      var element = animationDetails.element;                                                                          // 1946
      var event = animationDetails.event;                                                                              // 1947
      var options = animationDetails.options;                                                                          // 1948
      var classes = animationDetails.classes;                                                                          // 1949
      return $$animateJs(element, event, classes, options);                                                            // 1950
    }                                                                                                                  // 1951
  }];                                                                                                                  // 1952
}];                                                                                                                    // 1953
                                                                                                                       // 1954
var NG_ANIMATE_ATTR_NAME = 'data-ng-animate';                                                                          // 1955
var NG_ANIMATE_PIN_DATA = '$ngAnimatePin';                                                                             // 1956
var $$AnimateQueueProvider = ['$animateProvider', function($animateProvider) {                                         // 1957
  var PRE_DIGEST_STATE = 1;                                                                                            // 1958
  var RUNNING_STATE = 2;                                                                                               // 1959
                                                                                                                       // 1960
  var rules = this.rules = {                                                                                           // 1961
    skip: [],                                                                                                          // 1962
    cancel: [],                                                                                                        // 1963
    join: []                                                                                                           // 1964
  };                                                                                                                   // 1965
                                                                                                                       // 1966
  function isAllowed(ruleType, element, currentAnimation, previousAnimation) {                                         // 1967
    return rules[ruleType].some(function(fn) {                                                                         // 1968
      return fn(element, currentAnimation, previousAnimation);                                                         // 1969
    });                                                                                                                // 1970
  }                                                                                                                    // 1971
                                                                                                                       // 1972
  function hasAnimationClasses(options, and) {                                                                         // 1973
    options = options || {};                                                                                           // 1974
    var a = (options.addClass || '').length > 0;                                                                       // 1975
    var b = (options.removeClass || '').length > 0;                                                                    // 1976
    return and ? a && b : a || b;                                                                                      // 1977
  }                                                                                                                    // 1978
                                                                                                                       // 1979
  rules.join.push(function(element, newAnimation, currentAnimation) {                                                  // 1980
    // if the new animation is class-based then we can just tack that on                                               // 1981
    return !newAnimation.structural && hasAnimationClasses(newAnimation.options);                                      // 1982
  });                                                                                                                  // 1983
                                                                                                                       // 1984
  rules.skip.push(function(element, newAnimation, currentAnimation) {                                                  // 1985
    // there is no need to animate anything if no classes are being added and                                          // 1986
    // there is no structural animation that will be triggered                                                         // 1987
    return !newAnimation.structural && !hasAnimationClasses(newAnimation.options);                                     // 1988
  });                                                                                                                  // 1989
                                                                                                                       // 1990
  rules.skip.push(function(element, newAnimation, currentAnimation) {                                                  // 1991
    // why should we trigger a new structural animation if the element will                                            // 1992
    // be removed from the DOM anyway?                                                                                 // 1993
    return currentAnimation.event == 'leave' && newAnimation.structural;                                               // 1994
  });                                                                                                                  // 1995
                                                                                                                       // 1996
  rules.skip.push(function(element, newAnimation, currentAnimation) {                                                  // 1997
    // if there is an ongoing current animation then don't even bother running the class-based animation               // 1998
    return currentAnimation.structural && currentAnimation.state === RUNNING_STATE && !newAnimation.structural;        // 1999
  });                                                                                                                  // 2000
                                                                                                                       // 2001
  rules.cancel.push(function(element, newAnimation, currentAnimation) {                                                // 2002
    // there can never be two structural animations running at the same time                                           // 2003
    return currentAnimation.structural && newAnimation.structural;                                                     // 2004
  });                                                                                                                  // 2005
                                                                                                                       // 2006
  rules.cancel.push(function(element, newAnimation, currentAnimation) {                                                // 2007
    // if the previous animation is already running, but the new animation will                                        // 2008
    // be triggered, but the new animation is structural                                                               // 2009
    return currentAnimation.state === RUNNING_STATE && newAnimation.structural;                                        // 2010
  });                                                                                                                  // 2011
                                                                                                                       // 2012
  rules.cancel.push(function(element, newAnimation, currentAnimation) {                                                // 2013
    var nO = newAnimation.options;                                                                                     // 2014
    var cO = currentAnimation.options;                                                                                 // 2015
                                                                                                                       // 2016
    // if the exact same CSS class is added/removed then it's safe to cancel it                                        // 2017
    return (nO.addClass && nO.addClass === cO.removeClass) || (nO.removeClass && nO.removeClass === cO.addClass);      // 2018
  });                                                                                                                  // 2019
                                                                                                                       // 2020
  this.$get = ['$$rAF', '$rootScope', '$rootElement', '$document', '$$body', '$$HashMap',                              // 2021
               '$$animation', '$$AnimateRunner', '$templateRequest', '$$jqLite', '$$forceReflow',                      // 2022
       function($$rAF,   $rootScope,   $rootElement,   $document,   $$body,   $$HashMap,                               // 2023
                $$animation,   $$AnimateRunner,   $templateRequest,   $$jqLite,   $$forceReflow) {                     // 2024
                                                                                                                       // 2025
    var activeAnimationsLookup = new $$HashMap();                                                                      // 2026
    var disabledElementsLookup = new $$HashMap();                                                                      // 2027
    var animationsEnabled = null;                                                                                      // 2028
                                                                                                                       // 2029
    // Wait until all directive and route-related templates are downloaded and                                         // 2030
    // compiled. The $templateRequest.totalPendingRequests variable keeps track of                                     // 2031
    // all of the remote templates being currently downloaded. If there are no                                         // 2032
    // templates currently downloading then the watcher will still fire anyway.                                        // 2033
    var deregisterWatch = $rootScope.$watch(                                                                           // 2034
      function() { return $templateRequest.totalPendingRequests === 0; },                                              // 2035
      function(isEmpty) {                                                                                              // 2036
        if (!isEmpty) return;                                                                                          // 2037
        deregisterWatch();                                                                                             // 2038
                                                                                                                       // 2039
        // Now that all templates have been downloaded, $animate will wait until                                       // 2040
        // the post digest queue is empty before enabling animations. By having two                                    // 2041
        // calls to $postDigest calls we can ensure that the flag is enabled at the                                    // 2042
        // very end of the post digest queue. Since all of the animations in $animate                                  // 2043
        // use $postDigest, it's important that the code below executes at the end.                                    // 2044
        // This basically means that the page is fully downloaded and compiled before                                  // 2045
        // any animations are triggered.                                                                               // 2046
        $rootScope.$$postDigest(function() {                                                                           // 2047
          $rootScope.$$postDigest(function() {                                                                         // 2048
            // we check for null directly in the event that the application already called                             // 2049
            // .enabled() with whatever arguments that it provided it with                                             // 2050
            if (animationsEnabled === null) {                                                                          // 2051
              animationsEnabled = true;                                                                                // 2052
            }                                                                                                          // 2053
          });                                                                                                          // 2054
        });                                                                                                            // 2055
      }                                                                                                                // 2056
    );                                                                                                                 // 2057
                                                                                                                       // 2058
    var callbackRegistry = {};                                                                                         // 2059
                                                                                                                       // 2060
    // remember that the classNameFilter is set during the provider/config                                             // 2061
    // stage therefore we can optimize here and setup a helper function                                                // 2062
    var classNameFilter = $animateProvider.classNameFilter();                                                          // 2063
    var isAnimatableClassName = !classNameFilter                                                                       // 2064
              ? function() { return true; }                                                                            // 2065
              : function(className) {                                                                                  // 2066
                return classNameFilter.test(className);                                                                // 2067
              };                                                                                                       // 2068
                                                                                                                       // 2069
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 2070
                                                                                                                       // 2071
    function normalizeAnimationOptions(element, options) {                                                             // 2072
      return mergeAnimationOptions(element, options, {});                                                              // 2073
    }                                                                                                                  // 2074
                                                                                                                       // 2075
    function findCallbacks(element, event) {                                                                           // 2076
      var targetNode = getDomNode(element);                                                                            // 2077
                                                                                                                       // 2078
      var matches = [];                                                                                                // 2079
      var entries = callbackRegistry[event];                                                                           // 2080
      if (entries) {                                                                                                   // 2081
        forEach(entries, function(entry) {                                                                             // 2082
          if (entry.node.contains(targetNode)) {                                                                       // 2083
            matches.push(entry.callback);                                                                              // 2084
          }                                                                                                            // 2085
        });                                                                                                            // 2086
      }                                                                                                                // 2087
                                                                                                                       // 2088
      return matches;                                                                                                  // 2089
    }                                                                                                                  // 2090
                                                                                                                       // 2091
    function triggerCallback(event, element, phase, data) {                                                            // 2092
      $$rAF(function() {                                                                                               // 2093
        forEach(findCallbacks(element, event), function(callback) {                                                    // 2094
          callback(element, phase, data);                                                                              // 2095
        });                                                                                                            // 2096
      });                                                                                                              // 2097
    }                                                                                                                  // 2098
                                                                                                                       // 2099
    return {                                                                                                           // 2100
      on: function(event, container, callback) {                                                                       // 2101
        var node = extractElementNode(container);                                                                      // 2102
        callbackRegistry[event] = callbackRegistry[event] || [];                                                       // 2103
        callbackRegistry[event].push({                                                                                 // 2104
          node: node,                                                                                                  // 2105
          callback: callback                                                                                           // 2106
        });                                                                                                            // 2107
      },                                                                                                               // 2108
                                                                                                                       // 2109
      off: function(event, container, callback) {                                                                      // 2110
        var entries = callbackRegistry[event];                                                                         // 2111
        if (!entries) return;                                                                                          // 2112
                                                                                                                       // 2113
        callbackRegistry[event] = arguments.length === 1                                                               // 2114
            ? null                                                                                                     // 2115
            : filterFromRegistry(entries, container, callback);                                                        // 2116
                                                                                                                       // 2117
        function filterFromRegistry(list, matchContainer, matchCallback) {                                             // 2118
          var containerNode = extractElementNode(matchContainer);                                                      // 2119
          return list.filter(function(entry) {                                                                         // 2120
            var isMatch = entry.node === containerNode &&                                                              // 2121
                            (!matchCallback || entry.callback === matchCallback);                                      // 2122
            return !isMatch;                                                                                           // 2123
          });                                                                                                          // 2124
        }                                                                                                              // 2125
      },                                                                                                               // 2126
                                                                                                                       // 2127
      pin: function(element, parentElement) {                                                                          // 2128
        assertArg(isElement(element), 'element', 'not an element');                                                    // 2129
        assertArg(isElement(parentElement), 'parentElement', 'not an element');                                        // 2130
        element.data(NG_ANIMATE_PIN_DATA, parentElement);                                                              // 2131
      },                                                                                                               // 2132
                                                                                                                       // 2133
      push: function(element, event, options, domOperation) {                                                          // 2134
        options = options || {};                                                                                       // 2135
        options.domOperation = domOperation;                                                                           // 2136
        return queueAnimation(element, event, options);                                                                // 2137
      },                                                                                                               // 2138
                                                                                                                       // 2139
      // this method has four signatures:                                                                              // 2140
      //  () - global getter                                                                                           // 2141
      //  (bool) - global setter                                                                                       // 2142
      //  (element) - element getter                                                                                   // 2143
      //  (element, bool) - element setter<F37>                                                                        // 2144
      enabled: function(element, bool) {                                                                               // 2145
        var argCount = arguments.length;                                                                               // 2146
                                                                                                                       // 2147
        if (argCount === 0) {                                                                                          // 2148
          // () - Global getter                                                                                        // 2149
          bool = !!animationsEnabled;                                                                                  // 2150
        } else {                                                                                                       // 2151
          var hasElement = isElement(element);                                                                         // 2152
                                                                                                                       // 2153
          if (!hasElement) {                                                                                           // 2154
            // (bool) - Global setter                                                                                  // 2155
            bool = animationsEnabled = !!element;                                                                      // 2156
          } else {                                                                                                     // 2157
            var node = getDomNode(element);                                                                            // 2158
            var recordExists = disabledElementsLookup.get(node);                                                       // 2159
                                                                                                                       // 2160
            if (argCount === 1) {                                                                                      // 2161
              // (element) - Element getter                                                                            // 2162
              bool = !recordExists;                                                                                    // 2163
            } else {                                                                                                   // 2164
              // (element, bool) - Element setter                                                                      // 2165
              bool = !!bool;                                                                                           // 2166
              if (!bool) {                                                                                             // 2167
                disabledElementsLookup.put(node, true);                                                                // 2168
              } else if (recordExists) {                                                                               // 2169
                disabledElementsLookup.remove(node);                                                                   // 2170
              }                                                                                                        // 2171
            }                                                                                                          // 2172
          }                                                                                                            // 2173
        }                                                                                                              // 2174
                                                                                                                       // 2175
        return bool;                                                                                                   // 2176
      }                                                                                                                // 2177
    };                                                                                                                 // 2178
                                                                                                                       // 2179
    function queueAnimation(element, event, options) {                                                                 // 2180
      var node, parent;                                                                                                // 2181
      element = stripCommentsFromElement(element);                                                                     // 2182
      if (element) {                                                                                                   // 2183
        node = getDomNode(element);                                                                                    // 2184
        parent = element.parent();                                                                                     // 2185
      }                                                                                                                // 2186
                                                                                                                       // 2187
      options = prepareAnimationOptions(options);                                                                      // 2188
                                                                                                                       // 2189
      // we create a fake runner with a working promise.                                                               // 2190
      // These methods will become available after the digest has passed                                               // 2191
      var runner = new $$AnimateRunner();                                                                              // 2192
                                                                                                                       // 2193
      if (isArray(options.addClass)) {                                                                                 // 2194
        options.addClass = options.addClass.join(' ');                                                                 // 2195
      }                                                                                                                // 2196
                                                                                                                       // 2197
      if (options.addClass && !isString(options.addClass)) {                                                           // 2198
        options.addClass = null;                                                                                       // 2199
      }                                                                                                                // 2200
                                                                                                                       // 2201
      if (isArray(options.removeClass)) {                                                                              // 2202
        options.removeClass = options.removeClass.join(' ');                                                           // 2203
      }                                                                                                                // 2204
                                                                                                                       // 2205
      if (options.removeClass && !isString(options.removeClass)) {                                                     // 2206
        options.removeClass = null;                                                                                    // 2207
      }                                                                                                                // 2208
                                                                                                                       // 2209
      if (options.from && !isObject(options.from)) {                                                                   // 2210
        options.from = null;                                                                                           // 2211
      }                                                                                                                // 2212
                                                                                                                       // 2213
      if (options.to && !isObject(options.to)) {                                                                       // 2214
        options.to = null;                                                                                             // 2215
      }                                                                                                                // 2216
                                                                                                                       // 2217
      // there are situations where a directive issues an animation for                                                // 2218
      // a jqLite wrapper that contains only comment nodes... If this                                                  // 2219
      // happens then there is no way we can perform an animation                                                      // 2220
      if (!node) {                                                                                                     // 2221
        close();                                                                                                       // 2222
        return runner;                                                                                                 // 2223
      }                                                                                                                // 2224
                                                                                                                       // 2225
      var className = [node.className, options.addClass, options.removeClass].join(' ');                               // 2226
      if (!isAnimatableClassName(className)) {                                                                         // 2227
        close();                                                                                                       // 2228
        return runner;                                                                                                 // 2229
      }                                                                                                                // 2230
                                                                                                                       // 2231
      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;                                               // 2232
                                                                                                                       // 2233
      // this is a hard disable of all animations for the application or on                                            // 2234
      // the element itself, therefore  there is no need to continue further                                           // 2235
      // past this point if not enabled                                                                                // 2236
      var skipAnimations = !animationsEnabled || disabledElementsLookup.get(node);                                     // 2237
      var existingAnimation = (!skipAnimations && activeAnimationsLookup.get(node)) || {};                             // 2238
      var hasExistingAnimation = !!existingAnimation.state;                                                            // 2239
                                                                                                                       // 2240
      // there is no point in traversing the same collection of parent ancestors if a followup                         // 2241
      // animation will be run on the same element that already did all that checking work                             // 2242
      if (!skipAnimations && (!hasExistingAnimation || existingAnimation.state != PRE_DIGEST_STATE)) {                 // 2243
        skipAnimations = !areAnimationsAllowed(element, parent, event);                                                // 2244
      }                                                                                                                // 2245
                                                                                                                       // 2246
      if (skipAnimations) {                                                                                            // 2247
        close();                                                                                                       // 2248
        return runner;                                                                                                 // 2249
      }                                                                                                                // 2250
                                                                                                                       // 2251
      if (isStructural) {                                                                                              // 2252
        closeChildAnimations(element);                                                                                 // 2253
      }                                                                                                                // 2254
                                                                                                                       // 2255
      var newAnimation = {                                                                                             // 2256
        structural: isStructural,                                                                                      // 2257
        element: element,                                                                                              // 2258
        event: event,                                                                                                  // 2259
        close: close,                                                                                                  // 2260
        options: options,                                                                                              // 2261
        runner: runner                                                                                                 // 2262
      };                                                                                                               // 2263
                                                                                                                       // 2264
      if (hasExistingAnimation) {                                                                                      // 2265
        var skipAnimationFlag = isAllowed('skip', element, newAnimation, existingAnimation);                           // 2266
        if (skipAnimationFlag) {                                                                                       // 2267
          if (existingAnimation.state === RUNNING_STATE) {                                                             // 2268
            close();                                                                                                   // 2269
            return runner;                                                                                             // 2270
          } else {                                                                                                     // 2271
            mergeAnimationOptions(element, existingAnimation.options, options);                                        // 2272
            return existingAnimation.runner;                                                                           // 2273
          }                                                                                                            // 2274
        }                                                                                                              // 2275
                                                                                                                       // 2276
        var cancelAnimationFlag = isAllowed('cancel', element, newAnimation, existingAnimation);                       // 2277
        if (cancelAnimationFlag) {                                                                                     // 2278
          if (existingAnimation.state === RUNNING_STATE) {                                                             // 2279
            // this will end the animation right away and it is safe                                                   // 2280
            // to do so since the animation is already running and the                                                 // 2281
            // runner callback code will run in async                                                                  // 2282
            existingAnimation.runner.end();                                                                            // 2283
          } else if (existingAnimation.structural) {                                                                   // 2284
            // this means that the animation is queued into a digest, but                                              // 2285
            // hasn't started yet. Therefore it is safe to run the close                                               // 2286
            // method which will call the runner methods in async.                                                     // 2287
            existingAnimation.close();                                                                                 // 2288
          } else {                                                                                                     // 2289
            // this will merge the new animation options into existing animation options                               // 2290
            mergeAnimationOptions(element, existingAnimation.options, newAnimation.options);                           // 2291
            return existingAnimation.runner;                                                                           // 2292
          }                                                                                                            // 2293
        } else {                                                                                                       // 2294
          // a joined animation means that this animation will take over the existing one                              // 2295
          // so an example would involve a leave animation taking over an enter. Then when                             // 2296
          // the postDigest kicks in the enter will be ignored.                                                        // 2297
          var joinAnimationFlag = isAllowed('join', element, newAnimation, existingAnimation);                         // 2298
          if (joinAnimationFlag) {                                                                                     // 2299
            if (existingAnimation.state === RUNNING_STATE) {                                                           // 2300
              normalizeAnimationOptions(element, options);                                                             // 2301
            } else {                                                                                                   // 2302
              applyGeneratedPreparationClasses(element, isStructural ? event : null, options);                         // 2303
                                                                                                                       // 2304
              event = newAnimation.event = existingAnimation.event;                                                    // 2305
              options = mergeAnimationOptions(element, existingAnimation.options, newAnimation.options);               // 2306
                                                                                                                       // 2307
              //we return the same runner since only the option values of this animation will                          // 2308
              //be fed into the `existingAnimation`.                                                                   // 2309
              return existingAnimation.runner;                                                                         // 2310
            }                                                                                                          // 2311
          }                                                                                                            // 2312
        }                                                                                                              // 2313
      } else {                                                                                                         // 2314
        // normalization in this case means that it removes redundant CSS classes that                                 // 2315
        // already exist (addClass) or do not exist (removeClass) on the element                                       // 2316
        normalizeAnimationOptions(element, options);                                                                   // 2317
      }                                                                                                                // 2318
                                                                                                                       // 2319
      // when the options are merged and cleaned up we may end up not having to do                                     // 2320
      // an animation at all, therefore we should check this before issuing a post                                     // 2321
      // digest callback. Structural animations will always run no matter what.                                        // 2322
      var isValidAnimation = newAnimation.structural;                                                                  // 2323
      if (!isValidAnimation) {                                                                                         // 2324
        // animate (from/to) can be quickly checked first, otherwise we check if any classes are present               // 2325
        isValidAnimation = (newAnimation.event === 'animate' && Object.keys(newAnimation.options.to || {}).length > 0) // 2326
                            || hasAnimationClasses(newAnimation.options);                                              // 2327
      }                                                                                                                // 2328
                                                                                                                       // 2329
      if (!isValidAnimation) {                                                                                         // 2330
        close();                                                                                                       // 2331
        clearElementAnimationState(element);                                                                           // 2332
        return runner;                                                                                                 // 2333
      }                                                                                                                // 2334
                                                                                                                       // 2335
      // the counter keeps track of cancelled animations                                                               // 2336
      var counter = (existingAnimation.counter || 0) + 1;                                                              // 2337
      newAnimation.counter = counter;                                                                                  // 2338
                                                                                                                       // 2339
      markElementAnimationState(element, PRE_DIGEST_STATE, newAnimation);                                              // 2340
                                                                                                                       // 2341
      $rootScope.$$postDigest(function() {                                                                             // 2342
        var animationDetails = activeAnimationsLookup.get(node);                                                       // 2343
        var animationCancelled = !animationDetails;                                                                    // 2344
        animationDetails = animationDetails || {};                                                                     // 2345
                                                                                                                       // 2346
        // if addClass/removeClass is called before something like enter then the                                      // 2347
        // registered parent element may not be present. The code below will ensure                                    // 2348
        // that a final value for parent element is obtained                                                           // 2349
        var parentElement = element.parent() || [];                                                                    // 2350
                                                                                                                       // 2351
        // animate/structural/class-based animations all have requirements. Otherwise there                            // 2352
        // is no point in performing an animation. The parent node must also be set.                                   // 2353
        var isValidAnimation = parentElement.length > 0                                                                // 2354
                                && (animationDetails.event === 'animate'                                               // 2355
                                    || animationDetails.structural                                                     // 2356
                                    || hasAnimationClasses(animationDetails.options));                                 // 2357
                                                                                                                       // 2358
        // this means that the previous animation was cancelled                                                        // 2359
        // even if the follow-up animation is the same event                                                           // 2360
        if (animationCancelled || animationDetails.counter !== counter || !isValidAnimation) {                         // 2361
          // if another animation did not take over then we need                                                       // 2362
          // to make sure that the domOperation and options are                                                        // 2363
          // handled accordingly                                                                                       // 2364
          if (animationCancelled) {                                                                                    // 2365
            applyAnimationClasses(element, options);                                                                   // 2366
            applyAnimationStyles(element, options);                                                                    // 2367
          }                                                                                                            // 2368
                                                                                                                       // 2369
          // if the event changed from something like enter to leave then we do                                        // 2370
          // it, otherwise if it's the same then the end result will be the same too                                   // 2371
          if (animationCancelled || (isStructural && animationDetails.event !== event)) {                              // 2372
            options.domOperation();                                                                                    // 2373
            runner.end();                                                                                              // 2374
          }                                                                                                            // 2375
                                                                                                                       // 2376
          // in the event that the element animation was not cancelled or a follow-up animation                        // 2377
          // isn't allowed to animate from here then we need to clear the state of the element                         // 2378
          // so that any future animations won't read the expired animation data.                                      // 2379
          if (!isValidAnimation) {                                                                                     // 2380
            clearElementAnimationState(element);                                                                       // 2381
          }                                                                                                            // 2382
                                                                                                                       // 2383
          return;                                                                                                      // 2384
        }                                                                                                              // 2385
                                                                                                                       // 2386
        // this combined multiple class to addClass / removeClass into a setClass event                                // 2387
        // so long as a structural event did not take over the animation                                               // 2388
        event = !animationDetails.structural && hasAnimationClasses(animationDetails.options, true)                    // 2389
            ? 'setClass'                                                                                               // 2390
            : animationDetails.event;                                                                                  // 2391
                                                                                                                       // 2392
        markElementAnimationState(element, RUNNING_STATE);                                                             // 2393
        var realRunner = $$animation(element, event, animationDetails.options);                                        // 2394
                                                                                                                       // 2395
        realRunner.done(function(status) {                                                                             // 2396
          close(!status);                                                                                              // 2397
          var animationDetails = activeAnimationsLookup.get(node);                                                     // 2398
          if (animationDetails && animationDetails.counter === counter) {                                              // 2399
            clearElementAnimationState(getDomNode(element));                                                           // 2400
          }                                                                                                            // 2401
          notifyProgress(runner, event, 'close', {});                                                                  // 2402
        });                                                                                                            // 2403
                                                                                                                       // 2404
        // this will update the runner's flow-control events based on                                                  // 2405
        // the `realRunner` object.                                                                                    // 2406
        runner.setHost(realRunner);                                                                                    // 2407
        notifyProgress(runner, event, 'start', {});                                                                    // 2408
      });                                                                                                              // 2409
                                                                                                                       // 2410
      return runner;                                                                                                   // 2411
                                                                                                                       // 2412
      function notifyProgress(runner, event, phase, data) {                                                            // 2413
        triggerCallback(event, element, phase, data);                                                                  // 2414
        runner.progress(event, phase, data);                                                                           // 2415
      }                                                                                                                // 2416
                                                                                                                       // 2417
      function close(reject) { // jshint ignore:line                                                                   // 2418
        clearGeneratedClasses(element, options);                                                                       // 2419
        applyAnimationClasses(element, options);                                                                       // 2420
        applyAnimationStyles(element, options);                                                                        // 2421
        options.domOperation();                                                                                        // 2422
        runner.complete(!reject);                                                                                      // 2423
      }                                                                                                                // 2424
    }                                                                                                                  // 2425
                                                                                                                       // 2426
    function closeChildAnimations(element) {                                                                           // 2427
      var node = getDomNode(element);                                                                                  // 2428
      var children = node.querySelectorAll('[' + NG_ANIMATE_ATTR_NAME + ']');                                          // 2429
      forEach(children, function(child) {                                                                              // 2430
        var state = parseInt(child.getAttribute(NG_ANIMATE_ATTR_NAME));                                                // 2431
        var animationDetails = activeAnimationsLookup.get(child);                                                      // 2432
        switch (state) {                                                                                               // 2433
          case RUNNING_STATE:                                                                                          // 2434
            animationDetails.runner.end();                                                                             // 2435
            /* falls through */                                                                                        // 2436
          case PRE_DIGEST_STATE:                                                                                       // 2437
            if (animationDetails) {                                                                                    // 2438
              activeAnimationsLookup.remove(child);                                                                    // 2439
            }                                                                                                          // 2440
            break;                                                                                                     // 2441
        }                                                                                                              // 2442
      });                                                                                                              // 2443
    }                                                                                                                  // 2444
                                                                                                                       // 2445
    function clearElementAnimationState(element) {                                                                     // 2446
      var node = getDomNode(element);                                                                                  // 2447
      node.removeAttribute(NG_ANIMATE_ATTR_NAME);                                                                      // 2448
      activeAnimationsLookup.remove(node);                                                                             // 2449
    }                                                                                                                  // 2450
                                                                                                                       // 2451
    function isMatchingElement(nodeOrElmA, nodeOrElmB) {                                                               // 2452
      return getDomNode(nodeOrElmA) === getDomNode(nodeOrElmB);                                                        // 2453
    }                                                                                                                  // 2454
                                                                                                                       // 2455
    function areAnimationsAllowed(element, parentElement, event) {                                                     // 2456
      var bodyElementDetected = isMatchingElement(element, $$body) || element[0].nodeName === 'HTML';                  // 2457
      var rootElementDetected = isMatchingElement(element, $rootElement);                                              // 2458
      var parentAnimationDetected = false;                                                                             // 2459
      var animateChildren;                                                                                             // 2460
                                                                                                                       // 2461
      var parentHost = element.data(NG_ANIMATE_PIN_DATA);                                                              // 2462
      if (parentHost) {                                                                                                // 2463
        parentElement = parentHost;                                                                                    // 2464
      }                                                                                                                // 2465
                                                                                                                       // 2466
      while (parentElement && parentElement.length) {                                                                  // 2467
        if (!rootElementDetected) {                                                                                    // 2468
          // angular doesn't want to attempt to animate elements outside of the application                            // 2469
          // therefore we need to ensure that the rootElement is an ancestor of the current element                    // 2470
          rootElementDetected = isMatchingElement(parentElement, $rootElement);                                        // 2471
        }                                                                                                              // 2472
                                                                                                                       // 2473
        var parentNode = parentElement[0];                                                                             // 2474
        if (parentNode.nodeType !== ELEMENT_NODE) {                                                                    // 2475
          // no point in inspecting the #document element                                                              // 2476
          break;                                                                                                       // 2477
        }                                                                                                              // 2478
                                                                                                                       // 2479
        var details = activeAnimationsLookup.get(parentNode) || {};                                                    // 2480
        // either an enter, leave or move animation will commence                                                      // 2481
        // therefore we can't allow any animations to take place                                                       // 2482
        // but if a parent animation is class-based then that's ok                                                     // 2483
        if (!parentAnimationDetected) {                                                                                // 2484
          parentAnimationDetected = details.structural || disabledElementsLookup.get(parentNode);                      // 2485
        }                                                                                                              // 2486
                                                                                                                       // 2487
        if (isUndefined(animateChildren) || animateChildren === true) {                                                // 2488
          var value = parentElement.data(NG_ANIMATE_CHILDREN_DATA);                                                    // 2489
          if (isDefined(value)) {                                                                                      // 2490
            animateChildren = value;                                                                                   // 2491
          }                                                                                                            // 2492
        }                                                                                                              // 2493
                                                                                                                       // 2494
        // there is no need to continue traversing at this point                                                       // 2495
        if (parentAnimationDetected && animateChildren === false) break;                                               // 2496
                                                                                                                       // 2497
        if (!rootElementDetected) {                                                                                    // 2498
          // angular doesn't want to attempt to animate elements outside of the application                            // 2499
          // therefore we need to ensure that the rootElement is an ancestor of the current element                    // 2500
          rootElementDetected = isMatchingElement(parentElement, $rootElement);                                        // 2501
          if (!rootElementDetected) {                                                                                  // 2502
            parentHost = parentElement.data(NG_ANIMATE_PIN_DATA);                                                      // 2503
            if (parentHost) {                                                                                          // 2504
              parentElement = parentHost;                                                                              // 2505
            }                                                                                                          // 2506
          }                                                                                                            // 2507
        }                                                                                                              // 2508
                                                                                                                       // 2509
        if (!bodyElementDetected) {                                                                                    // 2510
          // we also need to ensure that the element is or will be apart of the body element                           // 2511
          // otherwise it is pointless to even issue an animation to be rendered                                       // 2512
          bodyElementDetected = isMatchingElement(parentElement, $$body);                                              // 2513
        }                                                                                                              // 2514
                                                                                                                       // 2515
        parentElement = parentElement.parent();                                                                        // 2516
      }                                                                                                                // 2517
                                                                                                                       // 2518
      var allowAnimation = !parentAnimationDetected || animateChildren;                                                // 2519
      return allowAnimation && rootElementDetected && bodyElementDetected;                                             // 2520
    }                                                                                                                  // 2521
                                                                                                                       // 2522
    function markElementAnimationState(element, state, details) {                                                      // 2523
      details = details || {};                                                                                         // 2524
      details.state = state;                                                                                           // 2525
                                                                                                                       // 2526
      var node = getDomNode(element);                                                                                  // 2527
      node.setAttribute(NG_ANIMATE_ATTR_NAME, state);                                                                  // 2528
                                                                                                                       // 2529
      var oldValue = activeAnimationsLookup.get(node);                                                                 // 2530
      var newValue = oldValue                                                                                          // 2531
          ? extend(oldValue, details)                                                                                  // 2532
          : details;                                                                                                   // 2533
      activeAnimationsLookup.put(node, newValue);                                                                      // 2534
    }                                                                                                                  // 2535
  }];                                                                                                                  // 2536
}];                                                                                                                    // 2537
                                                                                                                       // 2538
var $$AnimateAsyncRunFactory = ['$$rAF', function($$rAF) {                                                             // 2539
  var waitQueue = [];                                                                                                  // 2540
                                                                                                                       // 2541
  function waitForTick(fn) {                                                                                           // 2542
    waitQueue.push(fn);                                                                                                // 2543
    if (waitQueue.length > 1) return;                                                                                  // 2544
    $$rAF(function() {                                                                                                 // 2545
      for (var i = 0; i < waitQueue.length; i++) {                                                                     // 2546
        waitQueue[i]();                                                                                                // 2547
      }                                                                                                                // 2548
      waitQueue = [];                                                                                                  // 2549
    });                                                                                                                // 2550
  }                                                                                                                    // 2551
                                                                                                                       // 2552
  return function() {                                                                                                  // 2553
    var passed = false;                                                                                                // 2554
    waitForTick(function() {                                                                                           // 2555
      passed = true;                                                                                                   // 2556
    });                                                                                                                // 2557
    return function(callback) {                                                                                        // 2558
      passed ? callback() : waitForTick(callback);                                                                     // 2559
    };                                                                                                                 // 2560
  };                                                                                                                   // 2561
}];                                                                                                                    // 2562
                                                                                                                       // 2563
var $$AnimateRunnerFactory = ['$q', '$sniffer', '$$animateAsyncRun',                                                   // 2564
                      function($q,   $sniffer,   $$animateAsyncRun) {                                                  // 2565
                                                                                                                       // 2566
  var INITIAL_STATE = 0;                                                                                               // 2567
  var DONE_PENDING_STATE = 1;                                                                                          // 2568
  var DONE_COMPLETE_STATE = 2;                                                                                         // 2569
                                                                                                                       // 2570
  AnimateRunner.chain = function(chain, callback) {                                                                    // 2571
    var index = 0;                                                                                                     // 2572
                                                                                                                       // 2573
    next();                                                                                                            // 2574
    function next() {                                                                                                  // 2575
      if (index === chain.length) {                                                                                    // 2576
        callback(true);                                                                                                // 2577
        return;                                                                                                        // 2578
      }                                                                                                                // 2579
                                                                                                                       // 2580
      chain[index](function(response) {                                                                                // 2581
        if (response === false) {                                                                                      // 2582
          callback(false);                                                                                             // 2583
          return;                                                                                                      // 2584
        }                                                                                                              // 2585
        index++;                                                                                                       // 2586
        next();                                                                                                        // 2587
      });                                                                                                              // 2588
    }                                                                                                                  // 2589
  };                                                                                                                   // 2590
                                                                                                                       // 2591
  AnimateRunner.all = function(runners, callback) {                                                                    // 2592
    var count = 0;                                                                                                     // 2593
    var status = true;                                                                                                 // 2594
    forEach(runners, function(runner) {                                                                                // 2595
      runner.done(onProgress);                                                                                         // 2596
    });                                                                                                                // 2597
                                                                                                                       // 2598
    function onProgress(response) {                                                                                    // 2599
      status = status && response;                                                                                     // 2600
      if (++count === runners.length) {                                                                                // 2601
        callback(status);                                                                                              // 2602
      }                                                                                                                // 2603
    }                                                                                                                  // 2604
  };                                                                                                                   // 2605
                                                                                                                       // 2606
  function AnimateRunner(host) {                                                                                       // 2607
    this.setHost(host);                                                                                                // 2608
                                                                                                                       // 2609
    this._doneCallbacks = [];                                                                                          // 2610
    this._runInAnimationFrame = $$animateAsyncRun();                                                                   // 2611
    this._state = 0;                                                                                                   // 2612
  }                                                                                                                    // 2613
                                                                                                                       // 2614
  AnimateRunner.prototype = {                                                                                          // 2615
    setHost: function(host) {                                                                                          // 2616
      this.host = host || {};                                                                                          // 2617
    },                                                                                                                 // 2618
                                                                                                                       // 2619
    done: function(fn) {                                                                                               // 2620
      if (this._state === DONE_COMPLETE_STATE) {                                                                       // 2621
        fn();                                                                                                          // 2622
      } else {                                                                                                         // 2623
        this._doneCallbacks.push(fn);                                                                                  // 2624
      }                                                                                                                // 2625
    },                                                                                                                 // 2626
                                                                                                                       // 2627
    progress: noop,                                                                                                    // 2628
                                                                                                                       // 2629
    getPromise: function() {                                                                                           // 2630
      if (!this.promise) {                                                                                             // 2631
        var self = this;                                                                                               // 2632
        this.promise = $q(function(resolve, reject) {                                                                  // 2633
          self.done(function(status) {                                                                                 // 2634
            status === false ? reject() : resolve();                                                                   // 2635
          });                                                                                                          // 2636
        });                                                                                                            // 2637
      }                                                                                                                // 2638
      return this.promise;                                                                                             // 2639
    },                                                                                                                 // 2640
                                                                                                                       // 2641
    then: function(resolveHandler, rejectHandler) {                                                                    // 2642
      return this.getPromise().then(resolveHandler, rejectHandler);                                                    // 2643
    },                                                                                                                 // 2644
                                                                                                                       // 2645
    'catch': function(handler) {                                                                                       // 2646
      return this.getPromise()['catch'](handler);                                                                      // 2647
    },                                                                                                                 // 2648
                                                                                                                       // 2649
    'finally': function(handler) {                                                                                     // 2650
      return this.getPromise()['finally'](handler);                                                                    // 2651
    },                                                                                                                 // 2652
                                                                                                                       // 2653
    pause: function() {                                                                                                // 2654
      if (this.host.pause) {                                                                                           // 2655
        this.host.pause();                                                                                             // 2656
      }                                                                                                                // 2657
    },                                                                                                                 // 2658
                                                                                                                       // 2659
    resume: function() {                                                                                               // 2660
      if (this.host.resume) {                                                                                          // 2661
        this.host.resume();                                                                                            // 2662
      }                                                                                                                // 2663
    },                                                                                                                 // 2664
                                                                                                                       // 2665
    end: function() {                                                                                                  // 2666
      if (this.host.end) {                                                                                             // 2667
        this.host.end();                                                                                               // 2668
      }                                                                                                                // 2669
      this._resolve(true);                                                                                             // 2670
    },                                                                                                                 // 2671
                                                                                                                       // 2672
    cancel: function() {                                                                                               // 2673
      if (this.host.cancel) {                                                                                          // 2674
        this.host.cancel();                                                                                            // 2675
      }                                                                                                                // 2676
      this._resolve(false);                                                                                            // 2677
    },                                                                                                                 // 2678
                                                                                                                       // 2679
    complete: function(response) {                                                                                     // 2680
      var self = this;                                                                                                 // 2681
      if (self._state === INITIAL_STATE) {                                                                             // 2682
        self._state = DONE_PENDING_STATE;                                                                              // 2683
        self._runInAnimationFrame(function() {                                                                         // 2684
          self._resolve(response);                                                                                     // 2685
        });                                                                                                            // 2686
      }                                                                                                                // 2687
    },                                                                                                                 // 2688
                                                                                                                       // 2689
    _resolve: function(response) {                                                                                     // 2690
      if (this._state !== DONE_COMPLETE_STATE) {                                                                       // 2691
        forEach(this._doneCallbacks, function(fn) {                                                                    // 2692
          fn(response);                                                                                                // 2693
        });                                                                                                            // 2694
        this._doneCallbacks.length = 0;                                                                                // 2695
        this._state = DONE_COMPLETE_STATE;                                                                             // 2696
      }                                                                                                                // 2697
    }                                                                                                                  // 2698
  };                                                                                                                   // 2699
                                                                                                                       // 2700
  return AnimateRunner;                                                                                                // 2701
}];                                                                                                                    // 2702
                                                                                                                       // 2703
var $$AnimationProvider = ['$animateProvider', function($animateProvider) {                                            // 2704
  var NG_ANIMATE_REF_ATTR = 'ng-animate-ref';                                                                          // 2705
                                                                                                                       // 2706
  var drivers = this.drivers = [];                                                                                     // 2707
                                                                                                                       // 2708
  var RUNNER_STORAGE_KEY = '$$animationRunner';                                                                        // 2709
                                                                                                                       // 2710
  function setRunner(element, runner) {                                                                                // 2711
    element.data(RUNNER_STORAGE_KEY, runner);                                                                          // 2712
  }                                                                                                                    // 2713
                                                                                                                       // 2714
  function removeRunner(element) {                                                                                     // 2715
    element.removeData(RUNNER_STORAGE_KEY);                                                                            // 2716
  }                                                                                                                    // 2717
                                                                                                                       // 2718
  function getRunner(element) {                                                                                        // 2719
    return element.data(RUNNER_STORAGE_KEY);                                                                           // 2720
  }                                                                                                                    // 2721
                                                                                                                       // 2722
  this.$get = ['$$jqLite', '$rootScope', '$injector', '$$AnimateRunner', '$$HashMap', '$$rAFScheduler',                // 2723
       function($$jqLite,   $rootScope,   $injector,   $$AnimateRunner,   $$HashMap,   $$rAFScheduler) {               // 2724
                                                                                                                       // 2725
    var animationQueue = [];                                                                                           // 2726
    var applyAnimationClasses = applyAnimationClassesFactory($$jqLite);                                                // 2727
                                                                                                                       // 2728
    function sortAnimations(animations) {                                                                              // 2729
      var tree = { children: [] };                                                                                     // 2730
      var i, lookup = new $$HashMap();                                                                                 // 2731
                                                                                                                       // 2732
      // this is done first beforehand so that the hashmap                                                             // 2733
      // is filled with a list of the elements that will be animated                                                   // 2734
      for (i = 0; i < animations.length; i++) {                                                                        // 2735
        var animation = animations[i];                                                                                 // 2736
        lookup.put(animation.domNode, animations[i] = {                                                                // 2737
          domNode: animation.domNode,                                                                                  // 2738
          fn: animation.fn,                                                                                            // 2739
          children: []                                                                                                 // 2740
        });                                                                                                            // 2741
      }                                                                                                                // 2742
                                                                                                                       // 2743
      for (i = 0; i < animations.length; i++) {                                                                        // 2744
        processNode(animations[i]);                                                                                    // 2745
      }                                                                                                                // 2746
                                                                                                                       // 2747
      return flatten(tree);                                                                                            // 2748
                                                                                                                       // 2749
      function processNode(entry) {                                                                                    // 2750
        if (entry.processed) return entry;                                                                             // 2751
        entry.processed = true;                                                                                        // 2752
                                                                                                                       // 2753
        var elementNode = entry.domNode;                                                                               // 2754
        var parentNode = elementNode.parentNode;                                                                       // 2755
        lookup.put(elementNode, entry);                                                                                // 2756
                                                                                                                       // 2757
        var parentEntry;                                                                                               // 2758
        while (parentNode) {                                                                                           // 2759
          parentEntry = lookup.get(parentNode);                                                                        // 2760
          if (parentEntry) {                                                                                           // 2761
            if (!parentEntry.processed) {                                                                              // 2762
              parentEntry = processNode(parentEntry);                                                                  // 2763
            }                                                                                                          // 2764
            break;                                                                                                     // 2765
          }                                                                                                            // 2766
          parentNode = parentNode.parentNode;                                                                          // 2767
        }                                                                                                              // 2768
                                                                                                                       // 2769
        (parentEntry || tree).children.push(entry);                                                                    // 2770
        return entry;                                                                                                  // 2771
      }                                                                                                                // 2772
                                                                                                                       // 2773
      function flatten(tree) {                                                                                         // 2774
        var result = [];                                                                                               // 2775
        var queue = [];                                                                                                // 2776
        var i;                                                                                                         // 2777
                                                                                                                       // 2778
        for (i = 0; i < tree.children.length; i++) {                                                                   // 2779
          queue.push(tree.children[i]);                                                                                // 2780
        }                                                                                                              // 2781
                                                                                                                       // 2782
        var remainingLevelEntries = queue.length;                                                                      // 2783
        var nextLevelEntries = 0;                                                                                      // 2784
        var row = [];                                                                                                  // 2785
                                                                                                                       // 2786
        for (i = 0; i < queue.length; i++) {                                                                           // 2787
          var entry = queue[i];                                                                                        // 2788
          if (remainingLevelEntries <= 0) {                                                                            // 2789
            remainingLevelEntries = nextLevelEntries;                                                                  // 2790
            nextLevelEntries = 0;                                                                                      // 2791
            result.push(row);                                                                                          // 2792
            row = [];                                                                                                  // 2793
          }                                                                                                            // 2794
          row.push(entry.fn);                                                                                          // 2795
          entry.children.forEach(function(childEntry) {                                                                // 2796
            nextLevelEntries++;                                                                                        // 2797
            queue.push(childEntry);                                                                                    // 2798
          });                                                                                                          // 2799
          remainingLevelEntries--;                                                                                     // 2800
        }                                                                                                              // 2801
                                                                                                                       // 2802
        if (row.length) {                                                                                              // 2803
          result.push(row);                                                                                            // 2804
        }                                                                                                              // 2805
                                                                                                                       // 2806
        return result;                                                                                                 // 2807
      }                                                                                                                // 2808
    }                                                                                                                  // 2809
                                                                                                                       // 2810
    // TODO(matsko): document the signature in a better way                                                            // 2811
    return function(element, event, options) {                                                                         // 2812
      options = prepareAnimationOptions(options);                                                                      // 2813
      var isStructural = ['enter', 'move', 'leave'].indexOf(event) >= 0;                                               // 2814
                                                                                                                       // 2815
      // there is no animation at the current moment, however                                                          // 2816
      // these runner methods will get later updated with the                                                          // 2817
      // methods leading into the driver's end/cancel methods                                                          // 2818
      // for now they just stop the animation from starting                                                            // 2819
      var runner = new $$AnimateRunner({                                                                               // 2820
        end: function() { close(); },                                                                                  // 2821
        cancel: function() { close(true); }                                                                            // 2822
      });                                                                                                              // 2823
                                                                                                                       // 2824
      if (!drivers.length) {                                                                                           // 2825
        close();                                                                                                       // 2826
        return runner;                                                                                                 // 2827
      }                                                                                                                // 2828
                                                                                                                       // 2829
      setRunner(element, runner);                                                                                      // 2830
                                                                                                                       // 2831
      var classes = mergeClasses(element.attr('class'), mergeClasses(options.addClass, options.removeClass));          // 2832
      var tempClasses = options.tempClasses;                                                                           // 2833
      if (tempClasses) {                                                                                               // 2834
        classes += ' ' + tempClasses;                                                                                  // 2835
        options.tempClasses = null;                                                                                    // 2836
      }                                                                                                                // 2837
                                                                                                                       // 2838
      animationQueue.push({                                                                                            // 2839
        // this data is used by the postDigest code and passed into                                                    // 2840
        // the driver step function                                                                                    // 2841
        element: element,                                                                                              // 2842
        classes: classes,                                                                                              // 2843
        event: event,                                                                                                  // 2844
        structural: isStructural,                                                                                      // 2845
        options: options,                                                                                              // 2846
        beforeStart: beforeStart,                                                                                      // 2847
        close: close                                                                                                   // 2848
      });                                                                                                              // 2849
                                                                                                                       // 2850
      element.on('$destroy', handleDestroyedElement);                                                                  // 2851
                                                                                                                       // 2852
      // we only want there to be one function called within the post digest                                           // 2853
      // block. This way we can group animations for all the animations that                                           // 2854
      // were apart of the same postDigest flush call.                                                                 // 2855
      if (animationQueue.length > 1) return runner;                                                                    // 2856
                                                                                                                       // 2857
      $rootScope.$$postDigest(function() {                                                                             // 2858
        var animations = [];                                                                                           // 2859
        forEach(animationQueue, function(entry) {                                                                      // 2860
          // the element was destroyed early on which removed the runner                                               // 2861
          // form its storage. This means we can't animate this element                                                // 2862
          // at all and it already has been closed due to destruction.                                                 // 2863
          if (getRunner(entry.element)) {                                                                              // 2864
            animations.push(entry);                                                                                    // 2865
          } else {                                                                                                     // 2866
            entry.close();                                                                                             // 2867
          }                                                                                                            // 2868
        });                                                                                                            // 2869
                                                                                                                       // 2870
        // now any future animations will be in another postDigest                                                     // 2871
        animationQueue.length = 0;                                                                                     // 2872
                                                                                                                       // 2873
        var groupedAnimations = groupAnimations(animations);                                                           // 2874
        var toBeSortedAnimations = [];                                                                                 // 2875
                                                                                                                       // 2876
        forEach(groupedAnimations, function(animationEntry) {                                                          // 2877
          toBeSortedAnimations.push({                                                                                  // 2878
            domNode: getDomNode(animationEntry.from ? animationEntry.from.element : animationEntry.element),           // 2879
            fn: function triggerAnimationStart() {                                                                     // 2880
              // it's important that we apply the `ng-animate` CSS class and the                                       // 2881
              // temporary classes before we do any driver invoking since these                                        // 2882
              // CSS classes may be required for proper CSS detection.                                                 // 2883
              animationEntry.beforeStart();                                                                            // 2884
                                                                                                                       // 2885
              var startAnimationFn, closeFn = animationEntry.close;                                                    // 2886
                                                                                                                       // 2887
              // in the event that the element was removed before the digest runs or                                   // 2888
              // during the RAF sequencing then we should not trigger the animation.                                   // 2889
              var targetElement = animationEntry.anchors                                                               // 2890
                  ? (animationEntry.from.element || animationEntry.to.element)                                         // 2891
                  : animationEntry.element;                                                                            // 2892
                                                                                                                       // 2893
              if (getRunner(targetElement)) {                                                                          // 2894
                var operation = invokeFirstDriver(animationEntry);                                                     // 2895
                if (operation) {                                                                                       // 2896
                  startAnimationFn = operation.start;                                                                  // 2897
                }                                                                                                      // 2898
              }                                                                                                        // 2899
                                                                                                                       // 2900
              if (!startAnimationFn) {                                                                                 // 2901
                closeFn();                                                                                             // 2902
              } else {                                                                                                 // 2903
                var animationRunner = startAnimationFn();                                                              // 2904
                animationRunner.done(function(status) {                                                                // 2905
                  closeFn(!status);                                                                                    // 2906
                });                                                                                                    // 2907
                updateAnimationRunners(animationEntry, animationRunner);                                               // 2908
              }                                                                                                        // 2909
            }                                                                                                          // 2910
          });                                                                                                          // 2911
        });                                                                                                            // 2912
                                                                                                                       // 2913
        // we need to sort each of the animations in order of parent to child                                          // 2914
        // relationships. This ensures that the child classes are applied at the                                       // 2915
        // right time.                                                                                                 // 2916
        $$rAFScheduler(sortAnimations(toBeSortedAnimations));                                                          // 2917
      });                                                                                                              // 2918
                                                                                                                       // 2919
      return runner;                                                                                                   // 2920
                                                                                                                       // 2921
      // TODO(matsko): change to reference nodes                                                                       // 2922
      function getAnchorNodes(node) {                                                                                  // 2923
        var SELECTOR = '[' + NG_ANIMATE_REF_ATTR + ']';                                                                // 2924
        var items = node.hasAttribute(NG_ANIMATE_REF_ATTR)                                                             // 2925
              ? [node]                                                                                                 // 2926
              : node.querySelectorAll(SELECTOR);                                                                       // 2927
        var anchors = [];                                                                                              // 2928
        forEach(items, function(node) {                                                                                // 2929
          var attr = node.getAttribute(NG_ANIMATE_REF_ATTR);                                                           // 2930
          if (attr && attr.length) {                                                                                   // 2931
            anchors.push(node);                                                                                        // 2932
          }                                                                                                            // 2933
        });                                                                                                            // 2934
        return anchors;                                                                                                // 2935
      }                                                                                                                // 2936
                                                                                                                       // 2937
      function groupAnimations(animations) {                                                                           // 2938
        var preparedAnimations = [];                                                                                   // 2939
        var refLookup = {};                                                                                            // 2940
        forEach(animations, function(animation, index) {                                                               // 2941
          var element = animation.element;                                                                             // 2942
          var node = getDomNode(element);                                                                              // 2943
          var event = animation.event;                                                                                 // 2944
          var enterOrMove = ['enter', 'move'].indexOf(event) >= 0;                                                     // 2945
          var anchorNodes = animation.structural ? getAnchorNodes(node) : [];                                          // 2946
                                                                                                                       // 2947
          if (anchorNodes.length) {                                                                                    // 2948
            var direction = enterOrMove ? 'to' : 'from';                                                               // 2949
                                                                                                                       // 2950
            forEach(anchorNodes, function(anchor) {                                                                    // 2951
              var key = anchor.getAttribute(NG_ANIMATE_REF_ATTR);                                                      // 2952
              refLookup[key] = refLookup[key] || {};                                                                   // 2953
              refLookup[key][direction] = {                                                                            // 2954
                animationID: index,                                                                                    // 2955
                element: jqLite(anchor)                                                                                // 2956
              };                                                                                                       // 2957
            });                                                                                                        // 2958
          } else {                                                                                                     // 2959
            preparedAnimations.push(animation);                                                                        // 2960
          }                                                                                                            // 2961
        });                                                                                                            // 2962
                                                                                                                       // 2963
        var usedIndicesLookup = {};                                                                                    // 2964
        var anchorGroups = {};                                                                                         // 2965
        forEach(refLookup, function(operations, key) {                                                                 // 2966
          var from = operations.from;                                                                                  // 2967
          var to = operations.to;                                                                                      // 2968
                                                                                                                       // 2969
          if (!from || !to) {                                                                                          // 2970
            // only one of these is set therefore we can't have an                                                     // 2971
            // anchor animation since all three pieces are required                                                    // 2972
            var index = from ? from.animationID : to.animationID;                                                      // 2973
            var indexKey = index.toString();                                                                           // 2974
            if (!usedIndicesLookup[indexKey]) {                                                                        // 2975
              usedIndicesLookup[indexKey] = true;                                                                      // 2976
              preparedAnimations.push(animations[index]);                                                              // 2977
            }                                                                                                          // 2978
            return;                                                                                                    // 2979
          }                                                                                                            // 2980
                                                                                                                       // 2981
          var fromAnimation = animations[from.animationID];                                                            // 2982
          var toAnimation = animations[to.animationID];                                                                // 2983
          var lookupKey = from.animationID.toString();                                                                 // 2984
          if (!anchorGroups[lookupKey]) {                                                                              // 2985
            var group = anchorGroups[lookupKey] = {                                                                    // 2986
              structural: true,                                                                                        // 2987
              beforeStart: function() {                                                                                // 2988
                fromAnimation.beforeStart();                                                                           // 2989
                toAnimation.beforeStart();                                                                             // 2990
              },                                                                                                       // 2991
              close: function() {                                                                                      // 2992
                fromAnimation.close();                                                                                 // 2993
                toAnimation.close();                                                                                   // 2994
              },                                                                                                       // 2995
              classes: cssClassesIntersection(fromAnimation.classes, toAnimation.classes),                             // 2996
              from: fromAnimation,                                                                                     // 2997
              to: toAnimation,                                                                                         // 2998
              anchors: [] // TODO(matsko): change to reference nodes                                                   // 2999
            };                                                                                                         // 3000
                                                                                                                       // 3001
            // the anchor animations require that the from and to elements both have at least                          // 3002
            // one shared CSS class which effictively marries the two elements together to use                         // 3003
            // the same animation driver and to properly sequence the anchor animation.                                // 3004
            if (group.classes.length) {                                                                                // 3005
              preparedAnimations.push(group);                                                                          // 3006
            } else {                                                                                                   // 3007
              preparedAnimations.push(fromAnimation);                                                                  // 3008
              preparedAnimations.push(toAnimation);                                                                    // 3009
            }                                                                                                          // 3010
          }                                                                                                            // 3011
                                                                                                                       // 3012
          anchorGroups[lookupKey].anchors.push({                                                                       // 3013
            'out': from.element, 'in': to.element                                                                      // 3014
          });                                                                                                          // 3015
        });                                                                                                            // 3016
                                                                                                                       // 3017
        return preparedAnimations;                                                                                     // 3018
      }                                                                                                                // 3019
                                                                                                                       // 3020
      function cssClassesIntersection(a,b) {                                                                           // 3021
        a = a.split(' ');                                                                                              // 3022
        b = b.split(' ');                                                                                              // 3023
        var matches = [];                                                                                              // 3024
                                                                                                                       // 3025
        for (var i = 0; i < a.length; i++) {                                                                           // 3026
          var aa = a[i];                                                                                               // 3027
          if (aa.substring(0,3) === 'ng-') continue;                                                                   // 3028
                                                                                                                       // 3029
          for (var j = 0; j < b.length; j++) {                                                                         // 3030
            if (aa === b[j]) {                                                                                         // 3031
              matches.push(aa);                                                                                        // 3032
              break;                                                                                                   // 3033
            }                                                                                                          // 3034
          }                                                                                                            // 3035
        }                                                                                                              // 3036
                                                                                                                       // 3037
        return matches.join(' ');                                                                                      // 3038
      }                                                                                                                // 3039
                                                                                                                       // 3040
      function invokeFirstDriver(animationDetails) {                                                                   // 3041
        // we loop in reverse order since the more general drivers (like CSS and JS)                                   // 3042
        // may attempt more elements, but custom drivers are more particular                                           // 3043
        for (var i = drivers.length - 1; i >= 0; i--) {                                                                // 3044
          var driverName = drivers[i];                                                                                 // 3045
          if (!$injector.has(driverName)) continue; // TODO(matsko): remove this check                                 // 3046
                                                                                                                       // 3047
          var factory = $injector.get(driverName);                                                                     // 3048
          var driver = factory(animationDetails);                                                                      // 3049
          if (driver) {                                                                                                // 3050
            return driver;                                                                                             // 3051
          }                                                                                                            // 3052
        }                                                                                                              // 3053
      }                                                                                                                // 3054
                                                                                                                       // 3055
      function beforeStart() {                                                                                         // 3056
        element.addClass(NG_ANIMATE_CLASSNAME);                                                                        // 3057
        if (tempClasses) {                                                                                             // 3058
          $$jqLite.addClass(element, tempClasses);                                                                     // 3059
        }                                                                                                              // 3060
      }                                                                                                                // 3061
                                                                                                                       // 3062
      function updateAnimationRunners(animation, newRunner) {                                                          // 3063
        if (animation.from && animation.to) {                                                                          // 3064
          update(animation.from.element);                                                                              // 3065
          update(animation.to.element);                                                                                // 3066
        } else {                                                                                                       // 3067
          update(animation.element);                                                                                   // 3068
        }                                                                                                              // 3069
                                                                                                                       // 3070
        function update(element) {                                                                                     // 3071
          getRunner(element).setHost(newRunner);                                                                       // 3072
        }                                                                                                              // 3073
      }                                                                                                                // 3074
                                                                                                                       // 3075
      function handleDestroyedElement() {                                                                              // 3076
        var runner = getRunner(element);                                                                               // 3077
        if (runner && (event !== 'leave' || !options.$$domOperationFired)) {                                           // 3078
          runner.end();                                                                                                // 3079
        }                                                                                                              // 3080
      }                                                                                                                // 3081
                                                                                                                       // 3082
      function close(rejected) { // jshint ignore:line                                                                 // 3083
        element.off('$destroy', handleDestroyedElement);                                                               // 3084
        removeRunner(element);                                                                                         // 3085
                                                                                                                       // 3086
        applyAnimationClasses(element, options);                                                                       // 3087
        applyAnimationStyles(element, options);                                                                        // 3088
        options.domOperation();                                                                                        // 3089
                                                                                                                       // 3090
        if (tempClasses) {                                                                                             // 3091
          $$jqLite.removeClass(element, tempClasses);                                                                  // 3092
        }                                                                                                              // 3093
                                                                                                                       // 3094
        element.removeClass(NG_ANIMATE_CLASSNAME);                                                                     // 3095
        runner.complete(!rejected);                                                                                    // 3096
      }                                                                                                                // 3097
    };                                                                                                                 // 3098
  }];                                                                                                                  // 3099
}];                                                                                                                    // 3100
                                                                                                                       // 3101
/* global angularAnimateModule: true,                                                                                  // 3102
                                                                                                                       // 3103
   $$BodyProvider,                                                                                                     // 3104
   $$AnimateAsyncRunFactory,                                                                                           // 3105
   $$rAFSchedulerFactory,                                                                                              // 3106
   $$AnimateChildrenDirective,                                                                                         // 3107
   $$AnimateRunnerFactory,                                                                                             // 3108
   $$AnimateQueueProvider,                                                                                             // 3109
   $$AnimationProvider,                                                                                                // 3110
   $AnimateCssProvider,                                                                                                // 3111
   $$AnimateCssDriverProvider,                                                                                         // 3112
   $$AnimateJsProvider,                                                                                                // 3113
   $$AnimateJsDriverProvider,                                                                                          // 3114
*/                                                                                                                     // 3115
                                                                                                                       // 3116
/**                                                                                                                    // 3117
 * @ngdoc module                                                                                                       // 3118
 * @name ngAnimate                                                                                                     // 3119
 * @description                                                                                                        // 3120
 *                                                                                                                     // 3121
 * The `ngAnimate` module provides support for CSS-based animations (keyframes and transitions) as well as JavaScript-based animations via
 * callback hooks. Animations are not enabled by default, however, by including `ngAnimate` the animation hooks are enabled for an Angular app.
 *                                                                                                                     // 3124
 * <div doc-module-components="ngAnimate"></div>                                                                       // 3125
 *                                                                                                                     // 3126
 * # Usage                                                                                                             // 3127
 * Simply put, there are two ways to make use of animations when ngAnimate is used: by using **CSS** and **JavaScript**. The former works purely based
 * using CSS (by using matching CSS selectors/styles) and the latter triggers animations that are registered via `module.animation()`. For
 * both CSS and JS animations the sole requirement is to have a matching `CSS class` that exists both in the registered animation and within
 * the HTML element that the animation will be triggered on.                                                           // 3131
 *                                                                                                                     // 3132
 * ## Directive Support                                                                                                // 3133
 * The following directives are "animation aware":                                                                     // 3134
 *                                                                                                                     // 3135
 * | Directive                                                                                                | Supported Animations                                                     |
 * |----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------|
 * | {@link ng.directive:ngRepeat#animations ngRepeat}                                                        | enter, leave and move                                                    |
 * | {@link ngRoute.directive:ngView#animations ngView}                                                       | enter and leave                                                          |
 * | {@link ng.directive:ngInclude#animations ngInclude}                                                      | enter and leave                                                          |
 * | {@link ng.directive:ngSwitch#animations ngSwitch}                                                        | enter and leave                                                          |
 * | {@link ng.directive:ngIf#animations ngIf}                                                                | enter and leave                                                          |
 * | {@link ng.directive:ngClass#animations ngClass}                                                          | add and remove (the CSS class(es) present)                               |
 * | {@link ng.directive:ngShow#animations ngShow} & {@link ng.directive:ngHide#animations ngHide}            | add and remove (the ng-hide class value)                                 |
 * | {@link ng.directive:form#animation-hooks form} & {@link ng.directive:ngModel#animation-hooks ngModel}    | add and remove (dirty, pristine, valid, invalid & all other validations) |
 * | {@link module:ngMessages#animations ngMessages}                                                          | add and remove (ng-active & ng-inactive)                                 |
 * | {@link module:ngMessages#animations ngMessage}                                                           | enter and leave                                                          |
 *                                                                                                                     // 3148
 * (More information can be found by visiting each the documentation associated with each directive.)                  // 3149
 *                                                                                                                     // 3150
 * ## CSS-based Animations                                                                                             // 3151
 *                                                                                                                     // 3152
 * CSS-based animations with ngAnimate are unique since they require no JavaScript code at all. By using a CSS class that we reference between our HTML
 * and CSS code we can create an animation that will be picked up by Angular when an the underlying directive performs an operation.
 *                                                                                                                     // 3155
 * The example below shows how an `enter` animation can be made possible on an element using `ng-if`:                  // 3156
 *                                                                                                                     // 3157
 * ```html                                                                                                             // 3158
 * <div ng-if="bool" class="fade">                                                                                     // 3159
 *    Fade me in out                                                                                                   // 3160
 * </div>                                                                                                              // 3161
 * <button ng-click="bool=true">Fade In!</button>                                                                      // 3162
 * <button ng-click="bool=false">Fade Out!</button>                                                                    // 3163
 * ```                                                                                                                 // 3164
 *                                                                                                                     // 3165
 * Notice the CSS class **fade**? We can now create the CSS transition code that references this class:                // 3166
 *                                                                                                                     // 3167
 * ```css                                                                                                              // 3168
 * /&#42; The starting CSS styles for the enter animation &#42;/                                                       // 3169
 * .fade.ng-enter {                                                                                                    // 3170
 *   transition:0.5s linear all;                                                                                       // 3171
 *   opacity:0;                                                                                                        // 3172
 * }                                                                                                                   // 3173
 *                                                                                                                     // 3174
 * /&#42; The finishing CSS styles for the enter animation &#42;/                                                      // 3175
 * .fade.ng-enter.ng-enter-active {                                                                                    // 3176
 *   opacity:1;                                                                                                        // 3177
 * }                                                                                                                   // 3178
 * ```                                                                                                                 // 3179
 *                                                                                                                     // 3180
 * The key thing to remember here is that, depending on the animation event (which each of the directives above trigger depending on what's going on) two
 * generated CSS classes will be applied to the element; in the example above we have `.ng-enter` and `.ng-enter-active`. For CSS transitions, the transition
 * code **must** be defined within the starting CSS class (in this case `.ng-enter`). The destination class is what the transition will animate towards.
 *                                                                                                                     // 3184
 * If for example we wanted to create animations for `leave` and `move` (ngRepeat triggers move) then we can do so using the same CSS naming conventions:
 *                                                                                                                     // 3186
 * ```css                                                                                                              // 3187
 * /&#42; now the element will fade out before it is removed from the DOM &#42;/                                       // 3188
 * .fade.ng-leave {                                                                                                    // 3189
 *   transition:0.5s linear all;                                                                                       // 3190
 *   opacity:1;                                                                                                        // 3191
 * }                                                                                                                   // 3192
 * .fade.ng-leave.ng-leave-active {                                                                                    // 3193
 *   opacity:0;                                                                                                        // 3194
 * }                                                                                                                   // 3195
 * ```                                                                                                                 // 3196
 *                                                                                                                     // 3197
 * We can also make use of **CSS Keyframes** by referencing the keyframe animation within the starting CSS class:      // 3198
 *                                                                                                                     // 3199
 * ```css                                                                                                              // 3200
 * /&#42; there is no need to define anything inside of the destination                                                // 3201
 * CSS class since the keyframe will take charge of the animation &#42;/                                               // 3202
 * .fade.ng-leave {                                                                                                    // 3203
 *   animation: my_fade_animation 0.5s linear;                                                                         // 3204
 *   -webkit-animation: my_fade_animation 0.5s linear;                                                                 // 3205
 * }                                                                                                                   // 3206
 *                                                                                                                     // 3207
 * @keyframes my_fade_animation {                                                                                      // 3208
 *   from { opacity:1; }                                                                                               // 3209
 *   to { opacity:0; }                                                                                                 // 3210
 * }                                                                                                                   // 3211
 *                                                                                                                     // 3212
 * @-webkit-keyframes my_fade_animation {                                                                              // 3213
 *   from { opacity:1; }                                                                                               // 3214
 *   to { opacity:0; }                                                                                                 // 3215
 * }                                                                                                                   // 3216
 * ```                                                                                                                 // 3217
 *                                                                                                                     // 3218
 * Feel free also mix transitions and keyframes together as well as any other CSS classes on the same element.         // 3219
 *                                                                                                                     // 3220
 * ### CSS Class-based Animations                                                                                      // 3221
 *                                                                                                                     // 3222
 * Class-based animations (animations that are triggered via `ngClass`, `ngShow`, `ngHide` and some other directives) have a slightly different
 * naming convention. Class-based animations are basic enough that a standard transition or keyframe can be referenced on the class being added
 * and removed.                                                                                                        // 3225
 *                                                                                                                     // 3226
 * For example if we wanted to do a CSS animation for `ngHide` then we place an animation on the `.ng-hide` CSS class: // 3227
 *                                                                                                                     // 3228
 * ```html                                                                                                             // 3229
 * <div ng-show="bool" class="fade">                                                                                   // 3230
 *   Show and hide me                                                                                                  // 3231
 * </div>                                                                                                              // 3232
 * <button ng-click="bool=true">Toggle</button>                                                                        // 3233
 *                                                                                                                     // 3234
 * <style>                                                                                                             // 3235
 * .fade.ng-hide {                                                                                                     // 3236
 *   transition:0.5s linear all;                                                                                       // 3237
 *   opacity:0;                                                                                                        // 3238
 * }                                                                                                                   // 3239
 * </style>                                                                                                            // 3240
 * ```                                                                                                                 // 3241
 *                                                                                                                     // 3242
 * All that is going on here with ngShow/ngHide behind the scenes is the `.ng-hide` class is added/removed (when the hidden state is valid). Since
 * ngShow and ngHide are animation aware then we can match up a transition and ngAnimate handles the rest.             // 3244
 *                                                                                                                     // 3245
 * In addition the addition and removal of the CSS class, ngAnimate also provides two helper methods that we can use to further decorate the animation
 * with CSS styles.                                                                                                    // 3247
 *                                                                                                                     // 3248
 * ```html                                                                                                             // 3249
 * <div ng-class="{on:onOff}" class="highlight">                                                                       // 3250
 *   Highlight this box                                                                                                // 3251
 * </div>                                                                                                              // 3252
 * <button ng-click="onOff=!onOff">Toggle</button>                                                                     // 3253
 *                                                                                                                     // 3254
 * <style>                                                                                                             // 3255
 * .highlight {                                                                                                        // 3256
 *   transition:0.5s linear all;                                                                                       // 3257
 * }                                                                                                                   // 3258
 * .highlight.on-add {                                                                                                 // 3259
 *   background:white;                                                                                                 // 3260
 * }                                                                                                                   // 3261
 * .highlight.on {                                                                                                     // 3262
 *   background:yellow;                                                                                                // 3263
 * }                                                                                                                   // 3264
 * .highlight.on-remove {                                                                                              // 3265
 *   background:black;                                                                                                 // 3266
 * }                                                                                                                   // 3267
 * </style>                                                                                                            // 3268
 * ```                                                                                                                 // 3269
 *                                                                                                                     // 3270
 * We can also make use of CSS keyframes by placing them within the CSS classes.                                       // 3271
 *                                                                                                                     // 3272
 *                                                                                                                     // 3273
 * ### CSS Staggering Animations                                                                                       // 3274
 * A Staggering animation is a collection of animations that are issued with a slight delay in between each successive operation resulting in a
 * curtain-like effect. The ngAnimate module (versions >=1.2) supports staggering animations and the stagger effect can be
 * performed by creating a **ng-EVENT-stagger** CSS class and attaching that class to the base CSS class used for      // 3277
 * the animation. The style property expected within the stagger class can either be a **transition-delay** or an      // 3278
 * **animation-delay** property (or both if your animation contains both transitions and keyframe animations).         // 3279
 *                                                                                                                     // 3280
 * ```css                                                                                                              // 3281
 * .my-animation.ng-enter {                                                                                            // 3282
 *   /&#42; standard transition code &#42;/                                                                            // 3283
 *   transition: 1s linear all;                                                                                        // 3284
 *   opacity:0;                                                                                                        // 3285
 * }                                                                                                                   // 3286
 * .my-animation.ng-enter-stagger {                                                                                    // 3287
 *   /&#42; this will have a 100ms delay between each successive leave animation &#42;/                                // 3288
 *   transition-delay: 0.1s;                                                                                           // 3289
 *                                                                                                                     // 3290
 *   /&#42; As of 1.4.4, this must always be set: it signals ngAnimate                                                 // 3291
 *     to not accidentally inherit a delay property from another CSS class &#42;/                                      // 3292
 *   transition-duration: 0s;                                                                                          // 3293
 * }                                                                                                                   // 3294
 * .my-animation.ng-enter.ng-enter-active {                                                                            // 3295
 *   /&#42; standard transition styles &#42;/                                                                          // 3296
 *   opacity:1;                                                                                                        // 3297
 * }                                                                                                                   // 3298
 * ```                                                                                                                 // 3299
 *                                                                                                                     // 3300
 * Staggering animations work by default in ngRepeat (so long as the CSS class is defined). Outside of ngRepeat, to use staggering animations
 * on your own, they can be triggered by firing multiple calls to the same event on $animate. However, the restrictions surrounding this
 * are that each of the elements must have the same CSS className value as well as the same parent element. A stagger operation
 * will also be reset if one or more animation frames have passed since the multiple calls to `$animate` were fired.   // 3304
 *                                                                                                                     // 3305
 * The following code will issue the **ng-leave-stagger** event on the element provided:                               // 3306
 *                                                                                                                     // 3307
 * ```js                                                                                                               // 3308
 * var kids = parent.children();                                                                                       // 3309
 *                                                                                                                     // 3310
 * $animate.leave(kids[0]); //stagger index=0                                                                          // 3311
 * $animate.leave(kids[1]); //stagger index=1                                                                          // 3312
 * $animate.leave(kids[2]); //stagger index=2                                                                          // 3313
 * $animate.leave(kids[3]); //stagger index=3                                                                          // 3314
 * $animate.leave(kids[4]); //stagger index=4                                                                          // 3315
 *                                                                                                                     // 3316
 * window.requestAnimationFrame(function() {                                                                           // 3317
 *   //stagger has reset itself                                                                                        // 3318
 *   $animate.leave(kids[5]); //stagger index=0                                                                        // 3319
 *   $animate.leave(kids[6]); //stagger index=1                                                                        // 3320
 *                                                                                                                     // 3321
 *   $scope.$digest();                                                                                                 // 3322
 * });                                                                                                                 // 3323
 * ```                                                                                                                 // 3324
 *                                                                                                                     // 3325
 * Stagger animations are currently only supported within CSS-defined animations.                                      // 3326
 *                                                                                                                     // 3327
 * ### The `ng-animate` CSS class                                                                                      // 3328
 *                                                                                                                     // 3329
 * When ngAnimate is animating an element it will apply the `ng-animate` CSS class to the element for the duration of the animation.
 * This is a temporary CSS class and it will be removed once the animation is over (for both JavaScript and CSS-based animations).
 *                                                                                                                     // 3332
 * Therefore, animations can be applied to an element using this temporary class directly via CSS.                     // 3333
 *                                                                                                                     // 3334
 * ```css                                                                                                              // 3335
 * .zipper.ng-animate {                                                                                                // 3336
 *   transition:0.5s linear all;                                                                                       // 3337
 * }                                                                                                                   // 3338
 * .zipper.ng-enter {                                                                                                  // 3339
 *   opacity:0;                                                                                                        // 3340
 * }                                                                                                                   // 3341
 * .zipper.ng-enter.ng-enter-active {                                                                                  // 3342
 *   opacity:1;                                                                                                        // 3343
 * }                                                                                                                   // 3344
 * .zipper.ng-leave {                                                                                                  // 3345
 *   opacity:1;                                                                                                        // 3346
 * }                                                                                                                   // 3347
 * .zipper.ng-leave.ng-leave-active {                                                                                  // 3348
 *   opacity:0;                                                                                                        // 3349
 * }                                                                                                                   // 3350
 * ```                                                                                                                 // 3351
 *                                                                                                                     // 3352
 * (Note that the `ng-animate` CSS class is reserved and it cannot be applied on an element directly since ngAnimate will always remove
 * the CSS class once an animation has completed.)                                                                     // 3354
 *                                                                                                                     // 3355
 *                                                                                                                     // 3356
 * ## JavaScript-based Animations                                                                                      // 3357
 *                                                                                                                     // 3358
 * ngAnimate also allows for animations to be consumed by JavaScript code. The approach is similar to CSS-based animations (where there is a shared
 * CSS class that is referenced in our HTML code) but in addition we need to register the JavaScript animation on the module. By making use of the
 * `module.animation()` module function we can register the ainmation.                                                 // 3361
 *                                                                                                                     // 3362
 * Let's see an example of a enter/leave animation using `ngRepeat`:                                                   // 3363
 *                                                                                                                     // 3364
 * ```html                                                                                                             // 3365
 * <div ng-repeat="item in items" class="slide">                                                                       // 3366
 *   {{ item }}                                                                                                        // 3367
 * </div>                                                                                                              // 3368
 * ```                                                                                                                 // 3369
 *                                                                                                                     // 3370
 * See the **slide** CSS class? Let's use that class to define an animation that we'll structure in our module code by using `module.animation`:
 *                                                                                                                     // 3372
 * ```js                                                                                                               // 3373
 * myModule.animation('.slide', [function() {                                                                          // 3374
 *   return {                                                                                                          // 3375
 *     // make note that other events (like addClass/removeClass)                                                      // 3376
 *     // have different function input parameters                                                                     // 3377
 *     enter: function(element, doneFn) {                                                                              // 3378
 *       jQuery(element).fadeIn(1000, doneFn);                                                                         // 3379
 *                                                                                                                     // 3380
 *       // remember to call doneFn so that angular                                                                    // 3381
 *       // knows that the animation has concluded                                                                     // 3382
 *     },                                                                                                              // 3383
 *                                                                                                                     // 3384
 *     move: function(element, doneFn) {                                                                               // 3385
 *       jQuery(element).fadeIn(1000, doneFn);                                                                         // 3386
 *     },                                                                                                              // 3387
 *                                                                                                                     // 3388
 *     leave: function(element, doneFn) {                                                                              // 3389
 *       jQuery(element).fadeOut(1000, doneFn);                                                                        // 3390
 *     }                                                                                                               // 3391
 *   }                                                                                                                 // 3392
 * }]                                                                                                                  // 3393
 * ```                                                                                                                 // 3394
 *                                                                                                                     // 3395
 * The nice thing about JS-based animations is that we can inject other services and make use of advanced animation libraries such as
 * greensock.js and velocity.js.                                                                                       // 3397
 *                                                                                                                     // 3398
 * If our animation code class-based (meaning that something like `ngClass`, `ngHide` and `ngShow` triggers it) then we can still define
 * our animations inside of the same registered animation, however, the function input arguments are a bit different:  // 3400
 *                                                                                                                     // 3401
 * ```html                                                                                                             // 3402
 * <div ng-class="color" class="colorful">                                                                             // 3403
 *   this box is moody                                                                                                 // 3404
 * </div>                                                                                                              // 3405
 * <button ng-click="color='red'">Change to red</button>                                                               // 3406
 * <button ng-click="color='blue'">Change to blue</button>                                                             // 3407
 * <button ng-click="color='green'">Change to green</button>                                                           // 3408
 * ```                                                                                                                 // 3409
 *                                                                                                                     // 3410
 * ```js                                                                                                               // 3411
 * myModule.animation('.colorful', [function() {                                                                       // 3412
 *   return {                                                                                                          // 3413
 *     addClass: function(element, className, doneFn) {                                                                // 3414
 *       // do some cool animation and call the doneFn                                                                 // 3415
 *     },                                                                                                              // 3416
 *     removeClass: function(element, className, doneFn) {                                                             // 3417
 *       // do some cool animation and call the doneFn                                                                 // 3418
 *     },                                                                                                              // 3419
 *     setClass: function(element, addedClass, removedClass, doneFn) {                                                 // 3420
 *       // do some cool animation and call the doneFn                                                                 // 3421
 *     }                                                                                                               // 3422
 *   }                                                                                                                 // 3423
 * }]                                                                                                                  // 3424
 * ```                                                                                                                 // 3425
 *                                                                                                                     // 3426
 * ## CSS + JS Animations Together                                                                                     // 3427
 *                                                                                                                     // 3428
 * AngularJS 1.4 and higher has taken steps to make the amalgamation of CSS and JS animations more flexible. However, unlike earlier versions of Angular,
 * defining CSS and JS animations to work off of the same CSS class will not work anymore. Therefore the example below will only result in **JS animations taking
 * charge of the animation**:                                                                                          // 3431
 *                                                                                                                     // 3432
 * ```html                                                                                                             // 3433
 * <div ng-if="bool" class="slide">                                                                                    // 3434
 *   Slide in and out                                                                                                  // 3435
 * </div>                                                                                                              // 3436
 * ```                                                                                                                 // 3437
 *                                                                                                                     // 3438
 * ```js                                                                                                               // 3439
 * myModule.animation('.slide', [function() {                                                                          // 3440
 *   return {                                                                                                          // 3441
 *     enter: function(element, doneFn) {                                                                              // 3442
 *       jQuery(element).slideIn(1000, doneFn);                                                                        // 3443
 *     }                                                                                                               // 3444
 *   }                                                                                                                 // 3445
 * }]                                                                                                                  // 3446
 * ```                                                                                                                 // 3447
 *                                                                                                                     // 3448
 * ```css                                                                                                              // 3449
 * .slide.ng-enter {                                                                                                   // 3450
 *   transition:0.5s linear all;                                                                                       // 3451
 *   transform:translateY(-100px);                                                                                     // 3452
 * }                                                                                                                   // 3453
 * .slide.ng-enter.ng-enter-active {                                                                                   // 3454
 *   transform:translateY(0);                                                                                          // 3455
 * }                                                                                                                   // 3456
 * ```                                                                                                                 // 3457
 *                                                                                                                     // 3458
 * Does this mean that CSS and JS animations cannot be used together? Do JS-based animations always have higher priority? We can make up for the
 * lack of CSS animations by using the `$animateCss` service to trigger our own tweaked-out, CSS-based animations directly from
 * our own JS-based animation code:                                                                                    // 3461
 *                                                                                                                     // 3462
 * ```js                                                                                                               // 3463
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {                                                // 3464
 *   return {                                                                                                          // 3465
 *     enter: function(element, doneFn) {                                                                              // 3466
*        // this will trigger `.slide.ng-enter` and `.slide.ng-enter-active`.                                          // 3467
 *       var runner = $animateCss(element, {                                                                           // 3468
 *         event: 'enter',                                                                                             // 3469
 *         structural: true                                                                                            // 3470
 *       }).start();                                                                                                   // 3471
*        runner.done(doneFn);                                                                                          // 3472
 *     }                                                                                                               // 3473
 *   }                                                                                                                 // 3474
 * }]                                                                                                                  // 3475
 * ```                                                                                                                 // 3476
 *                                                                                                                     // 3477
 * The nice thing here is that we can save bandwidth by sticking to our CSS-based animation code and we don't need to rely on a 3rd-party animation framework.
 *                                                                                                                     // 3479
 * The `$animateCss` service is very powerful since we can feed in all kinds of extra properties that will be evaluated and fed into a CSS transition or
 * keyframe animation. For example if we wanted to animate the height of an element while adding and removing classes then we can do so by providing that
 * data into `$animateCss` directly:                                                                                   // 3482
 *                                                                                                                     // 3483
 * ```js                                                                                                               // 3484
 * myModule.animation('.slide', ['$animateCss', function($animateCss) {                                                // 3485
 *   return {                                                                                                          // 3486
 *     enter: function(element, doneFn) {                                                                              // 3487
 *       var runner = $animateCss(element, {                                                                           // 3488
 *         event: 'enter',                                                                                             // 3489
 *         structural: true,                                                                                           // 3490
 *         addClass: 'maroon-setting',                                                                                 // 3491
 *         from: { height:0 },                                                                                         // 3492
 *         to: { height: 200 }                                                                                         // 3493
 *       }).start();                                                                                                   // 3494
 *                                                                                                                     // 3495
 *       runner.done(doneFn);                                                                                          // 3496
 *     }                                                                                                               // 3497
 *   }                                                                                                                 // 3498
 * }]                                                                                                                  // 3499
 * ```                                                                                                                 // 3500
 *                                                                                                                     // 3501
 * Now we can fill in the rest via our transition CSS code:                                                            // 3502
 *                                                                                                                     // 3503
 * ```css                                                                                                              // 3504
 * /&#42; the transition tells ngAnimate to make the animation happen &#42;/                                           // 3505
 * .slide.ng-enter { transition:0.5s linear all; }                                                                     // 3506
 *                                                                                                                     // 3507
 * /&#42; this extra CSS class will be absorbed into the transition                                                    // 3508
 * since the $animateCss code is adding the class &#42;/                                                               // 3509
 * .maroon-setting { background:red; }                                                                                 // 3510
 * ```                                                                                                                 // 3511
 *                                                                                                                     // 3512
 * And `$animateCss` will figure out the rest. Just make sure to have the `done()` callback fire the `doneFn` function to signal when the animation is over.
 *                                                                                                                     // 3514
 * To learn more about what's possible be sure to visit the {@link ngAnimate.$animateCss $animateCss service}.         // 3515
 *                                                                                                                     // 3516
 * ## Animation Anchoring (via `ng-animate-ref`)                                                                       // 3517
 *                                                                                                                     // 3518
 * ngAnimate in AngularJS 1.4 comes packed with the ability to cross-animate elements between                          // 3519
 * structural areas of an application (like views) by pairing up elements using an attribute                           // 3520
 * called `ng-animate-ref`.                                                                                            // 3521
 *                                                                                                                     // 3522
 * Let's say for example we have two views that are managed by `ng-view` and we want to show                           // 3523
 * that there is a relationship between two components situated in within these views. By using the                    // 3524
 * `ng-animate-ref` attribute we can identify that the two components are paired together and we                       // 3525
 * can then attach an animation, which is triggered when the view changes.                                             // 3526
 *                                                                                                                     // 3527
 * Say for example we have the following template code:                                                                // 3528
 *                                                                                                                     // 3529
 * ```html                                                                                                             // 3530
 * <!-- index.html -->                                                                                                 // 3531
 * <div ng-view class="view-animation">                                                                                // 3532
 * </div>                                                                                                              // 3533
 *                                                                                                                     // 3534
 * <!-- home.html -->                                                                                                  // 3535
 * <a href="#/banner-page">                                                                                            // 3536
 *   <img src="./banner.jpg" class="banner" ng-animate-ref="banner">                                                   // 3537
 * </a>                                                                                                                // 3538
 *                                                                                                                     // 3539
 * <!-- banner-page.html -->                                                                                           // 3540
 * <img src="./banner.jpg" class="banner" ng-animate-ref="banner">                                                     // 3541
 * ```                                                                                                                 // 3542
 *                                                                                                                     // 3543
 * Now, when the view changes (once the link is clicked), ngAnimate will examine the                                   // 3544
 * HTML contents to see if there is a match reference between any components in the view                               // 3545
 * that is leaving and the view that is entering. It will scan both the view which is being                            // 3546
 * removed (leave) and inserted (enter) to see if there are any paired DOM elements that                               // 3547
 * contain a matching ref value.                                                                                       // 3548
 *                                                                                                                     // 3549
 * The two images match since they share the same ref value. ngAnimate will now create a                               // 3550
 * transport element (which is a clone of the first image element) and it will then attempt                            // 3551
 * to animate to the position of the second image element in the next view. For the animation to                       // 3552
 * work a special CSS class called `ng-anchor` will be added to the transported element.                               // 3553
 *                                                                                                                     // 3554
 * We can now attach a transition onto the `.banner.ng-anchor` CSS class and then                                      // 3555
 * ngAnimate will handle the entire transition for us as well as the addition and removal of                           // 3556
 * any changes of CSS classes between the elements:                                                                    // 3557
 *                                                                                                                     // 3558
 * ```css                                                                                                              // 3559
 * .banner.ng-anchor {                                                                                                 // 3560
 *   /&#42; this animation will last for 1 second since there are                                                      // 3561
 *          two phases to the animation (an `in` and an `out` phase) &#42;/                                            // 3562
 *   transition:0.5s linear all;                                                                                       // 3563
 * }                                                                                                                   // 3564
 * ```                                                                                                                 // 3565
 *                                                                                                                     // 3566
 * We also **must** include animations for the views that are being entered and removed                                // 3567
 * (otherwise anchoring wouldn't be possible since the new view would be inserted right away).                         // 3568
 *                                                                                                                     // 3569
 * ```css                                                                                                              // 3570
 * .view-animation.ng-enter, .view-animation.ng-leave {                                                                // 3571
 *   transition:0.5s linear all;                                                                                       // 3572
 *   position:fixed;                                                                                                   // 3573
 *   left:0;                                                                                                           // 3574
 *   top:0;                                                                                                            // 3575
 *   width:100%;                                                                                                       // 3576
 * }                                                                                                                   // 3577
 * .view-animation.ng-enter {                                                                                          // 3578
 *   transform:translateX(100%);                                                                                       // 3579
 * }                                                                                                                   // 3580
 * .view-animation.ng-leave,                                                                                           // 3581
 * .view-animation.ng-enter.ng-enter-active {                                                                          // 3582
 *   transform:translateX(0%);                                                                                         // 3583
 * }                                                                                                                   // 3584
 * .view-animation.ng-leave.ng-leave-active {                                                                          // 3585
 *   transform:translateX(-100%);                                                                                      // 3586
 * }                                                                                                                   // 3587
 * ```                                                                                                                 // 3588
 *                                                                                                                     // 3589
 * Now we can jump back to the anchor animation. When the animation happens, there are two stages that occur:          // 3590
 * an `out` and an `in` stage. The `out` stage happens first and that is when the element is animated away             // 3591
 * from its origin. Once that animation is over then the `in` stage occurs which animates the                          // 3592
 * element to its destination. The reason why there are two animations is to give enough time                          // 3593
 * for the enter animation on the new element to be ready.                                                             // 3594
 *                                                                                                                     // 3595
 * The example above sets up a transition for both the in and out phases, but we can also target the out or            // 3596
 * in phases directly via `ng-anchor-out` and `ng-anchor-in`.                                                          // 3597
 *                                                                                                                     // 3598
 * ```css                                                                                                              // 3599
 * .banner.ng-anchor-out {                                                                                             // 3600
 *   transition: 0.5s linear all;                                                                                      // 3601
 *                                                                                                                     // 3602
 *   /&#42; the scale will be applied during the out animation,                                                        // 3603
 *          but will be animated away when the in animation runs &#42;/                                                // 3604
 *   transform: scale(1.2);                                                                                            // 3605
 * }                                                                                                                   // 3606
 *                                                                                                                     // 3607
 * .banner.ng-anchor-in {                                                                                              // 3608
 *   transition: 1s linear all;                                                                                        // 3609
 * }                                                                                                                   // 3610
 * ```                                                                                                                 // 3611
 *                                                                                                                     // 3612
 *                                                                                                                     // 3613
 *                                                                                                                     // 3614
 *                                                                                                                     // 3615
 * ### Anchoring Demo                                                                                                  // 3616
 *                                                                                                                     // 3617
  <example module="anchoringExample"                                                                                   // 3618
           name="anchoringExample"                                                                                     // 3619
           id="anchoringExample"                                                                                       // 3620
           deps="angular-animate.js;angular-route.js"                                                                  // 3621
           animations="true">                                                                                          // 3622
    <file name="index.html">                                                                                           // 3623
      <a href="#/">Home</a>                                                                                            // 3624
      <hr />                                                                                                           // 3625
      <div class="view-container">                                                                                     // 3626
        <div ng-view class="view"></div>                                                                               // 3627
      </div>                                                                                                           // 3628
    </file>                                                                                                            // 3629
    <file name="script.js">                                                                                            // 3630
      angular.module('anchoringExample', ['ngAnimate', 'ngRoute'])                                                     // 3631
        .config(['$routeProvider', function($routeProvider) {                                                          // 3632
          $routeProvider.when('/', {                                                                                   // 3633
            templateUrl: 'home.html',                                                                                  // 3634
            controller: 'HomeController as home'                                                                       // 3635
          });                                                                                                          // 3636
          $routeProvider.when('/profile/:id', {                                                                        // 3637
            templateUrl: 'profile.html',                                                                               // 3638
            controller: 'ProfileController as profile'                                                                 // 3639
          });                                                                                                          // 3640
        }])                                                                                                            // 3641
        .run(['$rootScope', function($rootScope) {                                                                     // 3642
          $rootScope.records = [                                                                                       // 3643
            { id:1, title: "Miss Beulah Roob" },                                                                       // 3644
            { id:2, title: "Trent Morissette" },                                                                       // 3645
            { id:3, title: "Miss Ava Pouros" },                                                                        // 3646
            { id:4, title: "Rod Pouros" },                                                                             // 3647
            { id:5, title: "Abdul Rice" },                                                                             // 3648
            { id:6, title: "Laurie Rutherford Sr." },                                                                  // 3649
            { id:7, title: "Nakia McLaughlin" },                                                                       // 3650
            { id:8, title: "Jordon Blanda DVM" },                                                                      // 3651
            { id:9, title: "Rhoda Hand" },                                                                             // 3652
            { id:10, title: "Alexandrea Sauer" }                                                                       // 3653
          ];                                                                                                           // 3654
        }])                                                                                                            // 3655
        .controller('HomeController', [function() {                                                                    // 3656
          //empty                                                                                                      // 3657
        }])                                                                                                            // 3658
        .controller('ProfileController', ['$rootScope', '$routeParams', function($rootScope, $routeParams) {           // 3659
          var index = parseInt($routeParams.id, 10);                                                                   // 3660
          var record = $rootScope.records[index - 1];                                                                  // 3661
                                                                                                                       // 3662
          this.title = record.title;                                                                                   // 3663
          this.id = record.id;                                                                                         // 3664
        }]);                                                                                                           // 3665
    </file>                                                                                                            // 3666
    <file name="home.html">                                                                                            // 3667
      <h2>Welcome to the home page</h1>                                                                                // 3668
      <p>Please click on an element</p>                                                                                // 3669
      <a class="record"                                                                                                // 3670
         ng-href="#/profile/{{ record.id }}"                                                                           // 3671
         ng-animate-ref="{{ record.id }}"                                                                              // 3672
         ng-repeat="record in records">                                                                                // 3673
        {{ record.title }}                                                                                             // 3674
      </a>                                                                                                             // 3675
    </file>                                                                                                            // 3676
    <file name="profile.html">                                                                                         // 3677
      <div class="profile record" ng-animate-ref="{{ profile.id }}">                                                   // 3678
        {{ profile.title }}                                                                                            // 3679
      </div>                                                                                                           // 3680
    </file>                                                                                                            // 3681
    <file name="animations.css">                                                                                       // 3682
      .record {                                                                                                        // 3683
        display:block;                                                                                                 // 3684
        font-size:20px;                                                                                                // 3685
      }                                                                                                                // 3686
      .profile {                                                                                                       // 3687
        background:black;                                                                                              // 3688
        color:white;                                                                                                   // 3689
        font-size:100px;                                                                                               // 3690
      }                                                                                                                // 3691
      .view-container {                                                                                                // 3692
        position:relative;                                                                                             // 3693
      }                                                                                                                // 3694
      .view-container > .view.ng-animate {                                                                             // 3695
        position:absolute;                                                                                             // 3696
        top:0;                                                                                                         // 3697
        left:0;                                                                                                        // 3698
        width:100%;                                                                                                    // 3699
        min-height:500px;                                                                                              // 3700
      }                                                                                                                // 3701
      .view.ng-enter, .view.ng-leave,                                                                                  // 3702
      .record.ng-anchor {                                                                                              // 3703
        transition:0.5s linear all;                                                                                    // 3704
      }                                                                                                                // 3705
      .view.ng-enter {                                                                                                 // 3706
        transform:translateX(100%);                                                                                    // 3707
      }                                                                                                                // 3708
      .view.ng-enter.ng-enter-active, .view.ng-leave {                                                                 // 3709
        transform:translateX(0%);                                                                                      // 3710
      }                                                                                                                // 3711
      .view.ng-leave.ng-leave-active {                                                                                 // 3712
        transform:translateX(-100%);                                                                                   // 3713
      }                                                                                                                // 3714
      .record.ng-anchor-out {                                                                                          // 3715
        background:red;                                                                                                // 3716
      }                                                                                                                // 3717
    </file>                                                                                                            // 3718
  </example>                                                                                                           // 3719
 *                                                                                                                     // 3720
 * ### How is the element transported?                                                                                 // 3721
 *                                                                                                                     // 3722
 * When an anchor animation occurs, ngAnimate will clone the starting element and position it exactly where the starting
 * element is located on screen via absolute positioning. The cloned element will be placed inside of the root element // 3724
 * of the application (where ng-app was defined) and all of the CSS classes of the starting element will be applied. The
 * element will then animate into the `out` and `in` animations and will eventually reach the coordinates and match    // 3726
 * the dimensions of the destination element. During the entire animation a CSS class of `.ng-animate-shim` will be applied
 * to both the starting and destination elements in order to hide them from being visible (the CSS styling for the class
 * is: `visibility:hidden`). Once the anchor reaches its destination then it will be removed and the destination element
 * will become visible since the shim class will be removed.                                                           // 3730
 *                                                                                                                     // 3731
 * ### How is the morphing handled?                                                                                    // 3732
 *                                                                                                                     // 3733
 * CSS Anchoring relies on transitions and keyframes and the internal code is intelligent enough to figure out         // 3734
 * what CSS classes differ between the starting element and the destination element. These different CSS classes       // 3735
 * will be added/removed on the anchor element and a transition will be applied (the transition that is provided       // 3736
 * in the anchor class). Long story short, ngAnimate will figure out what classes to add and remove which will         // 3737
 * make the transition of the element as smooth and automatic as possible. Be sure to use simple CSS classes that      // 3738
 * do not rely on DOM nesting structure so that the anchor element appears the same as the starting element (since     // 3739
 * the cloned element is placed inside of root element which is likely close to the body element).                     // 3740
 *                                                                                                                     // 3741
 * Note that if the root element is on the `<html>` element then the cloned node will be placed inside of body.        // 3742
 *                                                                                                                     // 3743
 *                                                                                                                     // 3744
 * ## Using $animate in your directive code                                                                            // 3745
 *                                                                                                                     // 3746
 * So far we've explored how to feed in animations into an Angular application, but how do we trigger animations within our own directives in our application?
 * By injecting the `$animate` service into our directive code, we can trigger structural and class-based hooks which can then be consumed by animations. Let's
 * imagine we have a greeting box that shows and hides itself when the data changes                                    // 3749
 *                                                                                                                     // 3750
 * ```html                                                                                                             // 3751
 * <greeting-box active="onOrOff">Hi there</greeting-box>                                                              // 3752
 * ```                                                                                                                 // 3753
 *                                                                                                                     // 3754
 * ```js                                                                                                               // 3755
 * ngModule.directive('greetingBox', ['$animate', function($animate) {                                                 // 3756
 *   return function(scope, element, attrs) {                                                                          // 3757
 *     attrs.$observe('active', function(value) {                                                                      // 3758
 *       value ? $animate.addClass(element, 'on') : $animate.removeClass(element, 'on');                               // 3759
 *     });                                                                                                             // 3760
 *   });                                                                                                               // 3761
 * }]);                                                                                                                // 3762
 * ```                                                                                                                 // 3763
 *                                                                                                                     // 3764
 * Now the `on` CSS class is added and removed on the greeting box component. Now if we add a CSS class on top of the greeting box element
 * in our HTML code then we can trigger a CSS or JS animation to happen.                                               // 3766
 *                                                                                                                     // 3767
 * ```css                                                                                                              // 3768
 * /&#42; normally we would create a CSS class to reference on the element &#42;/                                      // 3769
 * greeting-box.on { transition:0.5s linear all; background:green; color:white; }                                      // 3770
 * ```                                                                                                                 // 3771
 *                                                                                                                     // 3772
 * The `$animate` service contains a variety of other methods like `enter`, `leave`, `animate` and `setClass`. To learn more about what's
 * possible be sure to visit the {@link ng.$animate $animate service API page}.                                        // 3774
 *                                                                                                                     // 3775
 *                                                                                                                     // 3776
 * ### Preventing Collisions With Third Party Libraries                                                                // 3777
 *                                                                                                                     // 3778
 * Some third-party frameworks place animation duration defaults across many element or className                      // 3779
 * selectors in order to make their code small and reuseable. This can lead to issues with ngAnimate, which            // 3780
 * is expecting actual animations on these elements and has to wait for their completion.                              // 3781
 *                                                                                                                     // 3782
 * You can prevent this unwanted behavior by using a prefix on all your animation classes:                             // 3783
 *                                                                                                                     // 3784
 * ```css                                                                                                              // 3785
 * /&#42; prefixed with animate- &#42;/                                                                                // 3786
 * .animate-fade-add.animate-fade-add-active {                                                                         // 3787
 *   transition:1s linear all;                                                                                         // 3788
 *   opacity:0;                                                                                                        // 3789
 * }                                                                                                                   // 3790
 * ```                                                                                                                 // 3791
 *                                                                                                                     // 3792
 * You then configure `$animate` to enforce this prefix:                                                               // 3793
 *                                                                                                                     // 3794
 * ```js                                                                                                               // 3795
 * $animateProvider.classNameFilter(/animate-/);                                                                       // 3796
 * ```                                                                                                                 // 3797
 *                                                                                                                     // 3798
 * This also may provide your application with a speed boost since only specific elements containing CSS class prefix  // 3799
 * will be evaluated for animation when any DOM changes occur in the application.                                      // 3800
 *                                                                                                                     // 3801
 * ## Callbacks and Promises                                                                                           // 3802
 *                                                                                                                     // 3803
 * When `$animate` is called it returns a promise that can be used to capture when the animation has ended. Therefore if we were to trigger
 * an animation (within our directive code) then we can continue performing directive and scope related activities after the animation has
 * ended by chaining onto the returned promise that animation method returns.                                          // 3806
 *                                                                                                                     // 3807
 * ```js                                                                                                               // 3808
 * // somewhere within the depths of the directive                                                                     // 3809
 * $animate.enter(element, parent).then(function() {                                                                   // 3810
 *   //the animation has completed                                                                                     // 3811
 * });                                                                                                                 // 3812
 * ```                                                                                                                 // 3813
 *                                                                                                                     // 3814
 * (Note that earlier versions of Angular prior to v1.4 required the promise code to be wrapped using `$scope.$apply(...)`. This is not the case
 * anymore.)                                                                                                           // 3816
 *                                                                                                                     // 3817
 * In addition to the animation promise, we can also make use of animation-related callbacks within our directives and controller code by registering
 * an event listener using the `$animate` service. Let's say for example that an animation was triggered on our view   // 3819
 * routing controller to hook into that:                                                                               // 3820
 *                                                                                                                     // 3821
 * ```js                                                                                                               // 3822
 * ngModule.controller('HomePageController', ['$animate', function($animate) {                                         // 3823
 *   $animate.on('enter', ngViewElement, function(element) {                                                           // 3824
 *     // the animation for this route has completed                                                                   // 3825
 *   }]);                                                                                                              // 3826
 * }])                                                                                                                 // 3827
 * ```                                                                                                                 // 3828
 *                                                                                                                     // 3829
 * (Note that you will need to trigger a digest within the callback to get angular to notice any scope-related changes.)
 */                                                                                                                    // 3831
                                                                                                                       // 3832
/**                                                                                                                    // 3833
 * @ngdoc service                                                                                                      // 3834
 * @name $animate                                                                                                      // 3835
 * @kind object                                                                                                        // 3836
 *                                                                                                                     // 3837
 * @description                                                                                                        // 3838
 * The ngAnimate `$animate` service documentation is the same for the core `$animate` service.                         // 3839
 *                                                                                                                     // 3840
 * Click here {@link ng.$animate to learn more about animations with `$animate`}.                                      // 3841
 */                                                                                                                    // 3842
angular.module('ngAnimate', [])                                                                                        // 3843
  .provider('$$body', $$BodyProvider)                                                                                  // 3844
                                                                                                                       // 3845
  .directive('ngAnimateChildren', $$AnimateChildrenDirective)                                                          // 3846
  .factory('$$rAFScheduler', $$rAFSchedulerFactory)                                                                    // 3847
                                                                                                                       // 3848
  .factory('$$AnimateRunner', $$AnimateRunnerFactory)                                                                  // 3849
  .factory('$$animateAsyncRun', $$AnimateAsyncRunFactory)                                                              // 3850
                                                                                                                       // 3851
  .provider('$$animateQueue', $$AnimateQueueProvider)                                                                  // 3852
  .provider('$$animation', $$AnimationProvider)                                                                        // 3853
                                                                                                                       // 3854
  .provider('$animateCss', $AnimateCssProvider)                                                                        // 3855
  .provider('$$animateCssDriver', $$AnimateCssDriverProvider)                                                          // 3856
                                                                                                                       // 3857
  .provider('$$animateJs', $$AnimateJsProvider)                                                                        // 3858
  .provider('$$animateJsDriver', $$AnimateJsDriverProvider);                                                           // 3859
                                                                                                                       // 3860
                                                                                                                       // 3861
})(window, window.angular);                                                                                            // 3862
                                                                                                                       // 3863
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular:angular-animate'] = {};

})();
