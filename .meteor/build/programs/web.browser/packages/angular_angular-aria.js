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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
// packages/angular:angular-aria/angular-aria.js                                                           //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                           //
/**                                                                                                        // 1
 * @license AngularJS v1.4.5                                                                               // 2
 * (c) 2010-2015 Google, Inc. http://angularjs.org                                                         // 3
 * License: MIT                                                                                            // 4
 */                                                                                                        // 5
(function(window, angular, undefined) {'use strict';                                                       // 6
                                                                                                           // 7
/**                                                                                                        // 8
 * @ngdoc module                                                                                           // 9
 * @name ngAria                                                                                            // 10
 * @description                                                                                            // 11
 *                                                                                                         // 12
 * The `ngAria` module provides support for common                                                         // 13
 * [<abbr title="Accessible Rich Internet Applications">ARIA</abbr>](http://www.w3.org/TR/wai-aria/)       // 14
 * attributes that convey state or semantic information about the application for users                    // 15
 * of assistive technologies, such as screen readers.                                                      // 16
 *                                                                                                         // 17
 * <div doc-module-components="ngAria"></div>                                                              // 18
 *                                                                                                         // 19
 * ## Usage                                                                                                // 20
 *                                                                                                         // 21
 * For ngAria to do its magic, simply include the module `ngAria` as a dependency. The following           // 22
 * directives are supported:                                                                               // 23
 * `ngModel`, `ngDisabled`, `ngShow`, `ngHide`, `ngClick`, `ngDblClick`, and `ngMessages`.                 // 24
 *                                                                                                         // 25
 * Below is a more detailed breakdown of the attributes handled by ngAria:                                 // 26
 *                                                                                                         // 27
 * | Directive                                   | Supported Attributes                                                                   |
 * |---------------------------------------------|----------------------------------------------------------------------------------------|
 * | {@link ng.directive:ngDisabled ngDisabled}  | aria-disabled                                                                          |
 * | {@link ng.directive:ngShow ngShow}          | aria-hidden                                                                            |
 * | {@link ng.directive:ngHide ngHide}          | aria-hidden                                                                            |
 * | {@link ng.directive:ngDblclick ngDblclick}  | tabindex                                                                               |
 * | {@link module:ngMessages ngMessages}        | aria-live                                                                              |
 * | {@link ng.directive:ngModel ngModel}        | aria-checked, aria-valuemin, aria-valuemax, aria-valuenow, aria-invalid, aria-required, input roles |
 * | {@link ng.directive:ngClick ngClick}        | tabindex, keypress event, button role                                                               |
 *                                                                                                         // 37
 * Find out more information about each directive by reading the                                           // 38
 * {@link guide/accessibility ngAria Developer Guide}.                                                     // 39
 *                                                                                                         // 40
 * ##Example                                                                                               // 41
 * Using ngDisabled with ngAria:                                                                           // 42
 * ```html                                                                                                 // 43
 * <md-checkbox ng-disabled="disabled">                                                                    // 44
 * ```                                                                                                     // 45
 * Becomes:                                                                                                // 46
 * ```html                                                                                                 // 47
 * <md-checkbox ng-disabled="disabled" aria-disabled="true">                                               // 48
 * ```                                                                                                     // 49
 *                                                                                                         // 50
 * ##Disabling Attributes                                                                                  // 51
 * It's possible to disable individual attributes added by ngAria with the                                 // 52
 * {@link ngAria.$ariaProvider#config config} method. For more details, see the                            // 53
 * {@link guide/accessibility Developer Guide}.                                                            // 54
 */                                                                                                        // 55
 /* global -ngAriaModule */                                                                                // 56
var ngAriaModule = angular.module('ngAria', ['ng']).                                                       // 57
                        provider('$aria', $AriaProvider);                                                  // 58
                                                                                                           // 59
/**                                                                                                        // 60
 * @ngdoc provider                                                                                         // 61
 * @name $ariaProvider                                                                                     // 62
 *                                                                                                         // 63
 * @description                                                                                            // 64
 *                                                                                                         // 65
 * Used for configuring the ARIA attributes injected and managed by ngAria.                                // 66
 *                                                                                                         // 67
 * ```js                                                                                                   // 68
 * angular.module('myApp', ['ngAria'], function config($ariaProvider) {                                    // 69
 *   $ariaProvider.config({                                                                                // 70
 *     ariaValue: true,                                                                                    // 71
 *     tabindex: false                                                                                     // 72
 *   });                                                                                                   // 73
 * });                                                                                                     // 74
 *```                                                                                                      // 75
 *                                                                                                         // 76
 * ## Dependencies                                                                                         // 77
 * Requires the {@link ngAria} module to be installed.                                                     // 78
 *                                                                                                         // 79
 */                                                                                                        // 80
function $AriaProvider() {                                                                                 // 81
  var config = {                                                                                           // 82
    ariaHidden: true,                                                                                      // 83
    ariaChecked: true,                                                                                     // 84
    ariaDisabled: true,                                                                                    // 85
    ariaRequired: true,                                                                                    // 86
    ariaInvalid: true,                                                                                     // 87
    ariaMultiline: true,                                                                                   // 88
    ariaValue: true,                                                                                       // 89
    tabindex: true,                                                                                        // 90
    bindKeypress: true,                                                                                    // 91
    bindRoleForClick: true                                                                                 // 92
  };                                                                                                       // 93
                                                                                                           // 94
  /**                                                                                                      // 95
   * @ngdoc method                                                                                         // 96
   * @name $ariaProvider#config                                                                            // 97
   *                                                                                                       // 98
   * @param {object} config object to enable/disable specific ARIA attributes                              // 99
   *                                                                                                       // 100
   *  - **ariaHidden** – `{boolean}` – Enables/disables aria-hidden tags                                   // 101
   *  - **ariaChecked** – `{boolean}` – Enables/disables aria-checked tags                                 // 102
   *  - **ariaDisabled** – `{boolean}` – Enables/disables aria-disabled tags                               // 103
   *  - **ariaRequired** – `{boolean}` – Enables/disables aria-required tags                               // 104
   *  - **ariaInvalid** – `{boolean}` – Enables/disables aria-invalid tags                                 // 105
   *  - **ariaMultiline** – `{boolean}` – Enables/disables aria-multiline tags                             // 106
   *  - **ariaValue** – `{boolean}` – Enables/disables aria-valuemin, aria-valuemax and aria-valuenow tags // 107
   *  - **tabindex** – `{boolean}` – Enables/disables tabindex tags                                        // 108
   *  - **bindKeypress** – `{boolean}` – Enables/disables keypress event binding on `&lt;div&gt;` and      // 109
   *    `&lt;li&gt;` elements with ng-click                                                                // 110
   *  - **bindRoleForClick** – `{boolean}` – Adds role=button to non-interactive elements like `div`       // 111
   *    using ng-click, making them more accessible to users of assistive technologies                     // 112
   *                                                                                                       // 113
   * @description                                                                                          // 114
   * Enables/disables various ARIA attributes                                                              // 115
   */                                                                                                      // 116
  this.config = function(newConfig) {                                                                      // 117
    config = angular.extend(config, newConfig);                                                            // 118
  };                                                                                                       // 119
                                                                                                           // 120
  function watchExpr(attrName, ariaAttr, negate) {                                                         // 121
    return function(scope, elem, attr) {                                                                   // 122
      var ariaCamelName = attr.$normalize(ariaAttr);                                                       // 123
      if (config[ariaCamelName] && !attr[ariaCamelName]) {                                                 // 124
        scope.$watch(attr[attrName], function(boolVal) {                                                   // 125
          // ensure boolean value                                                                          // 126
          boolVal = negate ? !boolVal : !!boolVal;                                                         // 127
          elem.attr(ariaAttr, boolVal);                                                                    // 128
        });                                                                                                // 129
      }                                                                                                    // 130
    };                                                                                                     // 131
  }                                                                                                        // 132
                                                                                                           // 133
  /**                                                                                                      // 134
   * @ngdoc service                                                                                        // 135
   * @name $aria                                                                                           // 136
   *                                                                                                       // 137
   * @description                                                                                          // 138
   * @priority 200                                                                                         // 139
   *                                                                                                       // 140
   * The $aria service contains helper methods for applying common                                         // 141
   * [ARIA](http://www.w3.org/TR/wai-aria/) attributes to HTML directives.                                 // 142
   *                                                                                                       // 143
   * ngAria injects common accessibility attributes that tell assistive technologies when HTML             // 144
   * elements are enabled, selected, hidden, and more. To see how this is performed with ngAria,           // 145
   * let's review a code snippet from ngAria itself:                                                       // 146
   *                                                                                                       // 147
   *```js                                                                                                  // 148
   * ngAriaModule.directive('ngDisabled', ['$aria', function($aria) {                                      // 149
   *   return $aria.$$watchExpr('ngDisabled', 'aria-disabled');                                            // 150
   * }])                                                                                                   // 151
   *```                                                                                                    // 152
   * Shown above, the ngAria module creates a directive with the same signature as the                     // 153
   * traditional `ng-disabled` directive. But this ngAria version is dedicated to                          // 154
   * solely managing accessibility attributes. The internal `$aria` service is used to watch the           // 155
   * boolean attribute `ngDisabled`. If it has not been explicitly set by the developer,                   // 156
   * `aria-disabled` is injected as an attribute with its value synchronized to the value in               // 157
   * `ngDisabled`.                                                                                         // 158
   *                                                                                                       // 159
   * Because ngAria hooks into the `ng-disabled` directive, developers do not have to do                   // 160
   * anything to enable this feature. The `aria-disabled` attribute is automatically managed               // 161
   * simply as a silent side-effect of using `ng-disabled` with the ngAria module.                         // 162
   *                                                                                                       // 163
   * The full list of directives that interface with ngAria:                                               // 164
   * * **ngModel**                                                                                         // 165
   * * **ngShow**                                                                                          // 166
   * * **ngHide**                                                                                          // 167
   * * **ngClick**                                                                                         // 168
   * * **ngDblclick**                                                                                      // 169
   * * **ngMessages**                                                                                      // 170
   * * **ngDisabled**                                                                                      // 171
   *                                                                                                       // 172
   * Read the {@link guide/accessibility ngAria Developer Guide} for a thorough explanation of each        // 173
   * directive.                                                                                            // 174
   *                                                                                                       // 175
   *                                                                                                       // 176
   * ## Dependencies                                                                                       // 177
   * Requires the {@link ngAria} module to be installed.                                                   // 178
   */                                                                                                      // 179
  this.$get = function() {                                                                                 // 180
    return {                                                                                               // 181
      config: function(key) {                                                                              // 182
        return config[key];                                                                                // 183
      },                                                                                                   // 184
      $$watchExpr: watchExpr                                                                               // 185
    };                                                                                                     // 186
  };                                                                                                       // 187
}                                                                                                          // 188
                                                                                                           // 189
                                                                                                           // 190
ngAriaModule.directive('ngShow', ['$aria', function($aria) {                                               // 191
  return $aria.$$watchExpr('ngShow', 'aria-hidden', true);                                                 // 192
}])                                                                                                        // 193
.directive('ngHide', ['$aria', function($aria) {                                                           // 194
  return $aria.$$watchExpr('ngHide', 'aria-hidden', false);                                                // 195
}])                                                                                                        // 196
.directive('ngModel', ['$aria', function($aria) {                                                          // 197
                                                                                                           // 198
  function shouldAttachAttr(attr, normalizedAttr, elem) {                                                  // 199
    return $aria.config(normalizedAttr) && !elem.attr(attr);                                               // 200
  }                                                                                                        // 201
                                                                                                           // 202
  function shouldAttachRole(role, elem) {                                                                  // 203
    return !elem.attr('role') && (elem.attr('type') === role) && (elem[0].nodeName !== 'INPUT');           // 204
  }                                                                                                        // 205
                                                                                                           // 206
  function getShape(attr, elem) {                                                                          // 207
    var type = attr.type,                                                                                  // 208
        role = attr.role;                                                                                  // 209
                                                                                                           // 210
    return ((type || role) === 'checkbox' || role === 'menuitemcheckbox') ? 'checkbox' :                   // 211
           ((type || role) === 'radio'    || role === 'menuitemradio') ? 'radio' :                         // 212
           (type === 'range'              || role === 'progressbar' || role === 'slider') ? 'range' :      // 213
           (type || role) === 'textbox'   || elem[0].nodeName === 'TEXTAREA' ? 'multiline' : '';           // 214
  }                                                                                                        // 215
                                                                                                           // 216
  return {                                                                                                 // 217
    restrict: 'A',                                                                                         // 218
    require: '?ngModel',                                                                                   // 219
    priority: 200, //Make sure watches are fired after any other directives that affect the ngModel value  // 220
    compile: function(elem, attr) {                                                                        // 221
      var shape = getShape(attr, elem);                                                                    // 222
                                                                                                           // 223
      return {                                                                                             // 224
        pre: function(scope, elem, attr, ngModel) {                                                        // 225
          if (shape === 'checkbox' && attr.type !== 'checkbox') {                                          // 226
            //Use the input[checkbox] $isEmpty implementation for elements with checkbox roles             // 227
            ngModel.$isEmpty = function(value) {                                                           // 228
              return value === false;                                                                      // 229
            };                                                                                             // 230
          }                                                                                                // 231
        },                                                                                                 // 232
        post: function(scope, elem, attr, ngModel) {                                                       // 233
          var needsTabIndex = shouldAttachAttr('tabindex', 'tabindex', elem);                              // 234
                                                                                                           // 235
          function ngAriaWatchModelValue() {                                                               // 236
            return ngModel.$modelValue;                                                                    // 237
          }                                                                                                // 238
                                                                                                           // 239
          function getRadioReaction() {                                                                    // 240
            if (needsTabIndex) {                                                                           // 241
              needsTabIndex = false;                                                                       // 242
              return function ngAriaRadioReaction(newVal) {                                                // 243
                var boolVal = (attr.value == ngModel.$viewValue);                                          // 244
                elem.attr('aria-checked', boolVal);                                                        // 245
                elem.attr('tabindex', 0 - !boolVal);                                                       // 246
              };                                                                                           // 247
            } else {                                                                                       // 248
              return function ngAriaRadioReaction(newVal) {                                                // 249
                elem.attr('aria-checked', (attr.value == ngModel.$viewValue));                             // 250
              };                                                                                           // 251
            }                                                                                              // 252
          }                                                                                                // 253
                                                                                                           // 254
          function ngAriaCheckboxReaction() {                                                              // 255
            elem.attr('aria-checked', !ngModel.$isEmpty(ngModel.$viewValue));                              // 256
          }                                                                                                // 257
                                                                                                           // 258
          switch (shape) {                                                                                 // 259
            case 'radio':                                                                                  // 260
            case 'checkbox':                                                                               // 261
              if (shouldAttachRole(shape, elem)) {                                                         // 262
                elem.attr('role', shape);                                                                  // 263
              }                                                                                            // 264
              if (shouldAttachAttr('aria-checked', 'ariaChecked', elem)) {                                 // 265
                scope.$watch(ngAriaWatchModelValue, shape === 'radio' ?                                    // 266
                    getRadioReaction() : ngAriaCheckboxReaction);                                          // 267
              }                                                                                            // 268
              break;                                                                                       // 269
            case 'range':                                                                                  // 270
              if (shouldAttachRole(shape, elem)) {                                                         // 271
                elem.attr('role', 'slider');                                                               // 272
              }                                                                                            // 273
              if ($aria.config('ariaValue')) {                                                             // 274
                var needsAriaValuemin = !elem.attr('aria-valuemin') &&                                     // 275
                    (attr.hasOwnProperty('min') || attr.hasOwnProperty('ngMin'));                          // 276
                var needsAriaValuemax = !elem.attr('aria-valuemax') &&                                     // 277
                    (attr.hasOwnProperty('max') || attr.hasOwnProperty('ngMax'));                          // 278
                var needsAriaValuenow = !elem.attr('aria-valuenow');                                       // 279
                                                                                                           // 280
                if (needsAriaValuemin) {                                                                   // 281
                  attr.$observe('min', function ngAriaValueMinReaction(newVal) {                           // 282
                    elem.attr('aria-valuemin', newVal);                                                    // 283
                  });                                                                                      // 284
                }                                                                                          // 285
                if (needsAriaValuemax) {                                                                   // 286
                  attr.$observe('max', function ngAriaValueMinReaction(newVal) {                           // 287
                    elem.attr('aria-valuemax', newVal);                                                    // 288
                  });                                                                                      // 289
                }                                                                                          // 290
                if (needsAriaValuenow) {                                                                   // 291
                  scope.$watch(ngAriaWatchModelValue, function ngAriaValueNowReaction(newVal) {            // 292
                    elem.attr('aria-valuenow', newVal);                                                    // 293
                  });                                                                                      // 294
                }                                                                                          // 295
              }                                                                                            // 296
              break;                                                                                       // 297
            case 'multiline':                                                                              // 298
              if (shouldAttachAttr('aria-multiline', 'ariaMultiline', elem)) {                             // 299
                elem.attr('aria-multiline', true);                                                         // 300
              }                                                                                            // 301
              break;                                                                                       // 302
          }                                                                                                // 303
                                                                                                           // 304
          if (needsTabIndex) {                                                                             // 305
            elem.attr('tabindex', 0);                                                                      // 306
          }                                                                                                // 307
                                                                                                           // 308
          if (ngModel.$validators.required && shouldAttachAttr('aria-required', 'ariaRequired', elem)) {   // 309
            scope.$watch(function ngAriaRequiredWatch() {                                                  // 310
              return ngModel.$error.required;                                                              // 311
            }, function ngAriaRequiredReaction(newVal) {                                                   // 312
              elem.attr('aria-required', !!newVal);                                                        // 313
            });                                                                                            // 314
          }                                                                                                // 315
                                                                                                           // 316
          if (shouldAttachAttr('aria-invalid', 'ariaInvalid', elem)) {                                     // 317
            scope.$watch(function ngAriaInvalidWatch() {                                                   // 318
              return ngModel.$invalid;                                                                     // 319
            }, function ngAriaInvalidReaction(newVal) {                                                    // 320
              elem.attr('aria-invalid', !!newVal);                                                         // 321
            });                                                                                            // 322
          }                                                                                                // 323
        }                                                                                                  // 324
      };                                                                                                   // 325
    }                                                                                                      // 326
  };                                                                                                       // 327
}])                                                                                                        // 328
.directive('ngDisabled', ['$aria', function($aria) {                                                       // 329
  return $aria.$$watchExpr('ngDisabled', 'aria-disabled');                                                 // 330
}])                                                                                                        // 331
.directive('ngMessages', function() {                                                                      // 332
  return {                                                                                                 // 333
    restrict: 'A',                                                                                         // 334
    require: '?ngMessages',                                                                                // 335
    link: function(scope, elem, attr, ngMessages) {                                                        // 336
      if (!elem.attr('aria-live')) {                                                                       // 337
        elem.attr('aria-live', 'assertive');                                                               // 338
      }                                                                                                    // 339
    }                                                                                                      // 340
  };                                                                                                       // 341
})                                                                                                         // 342
.directive('ngClick',['$aria', '$parse', function($aria, $parse) {                                         // 343
  return {                                                                                                 // 344
    restrict: 'A',                                                                                         // 345
    compile: function(elem, attr) {                                                                        // 346
      var fn = $parse(attr.ngClick, /* interceptorFn */ null, /* expensiveChecks */ true);                 // 347
      return function(scope, elem, attr) {                                                                 // 348
                                                                                                           // 349
        var nodeBlackList = ['BUTTON', 'A', 'INPUT', 'TEXTAREA'];                                          // 350
                                                                                                           // 351
        function isNodeOneOf(elem, nodeTypeArray) {                                                        // 352
          if (nodeTypeArray.indexOf(elem[0].nodeName) !== -1) {                                            // 353
            return true;                                                                                   // 354
          }                                                                                                // 355
        }                                                                                                  // 356
                                                                                                           // 357
        if ($aria.config('bindRoleForClick')                                                               // 358
            && !elem.attr('role')                                                                          // 359
              && !isNodeOneOf(elem, nodeBlackList)) {                                                      // 360
          elem.attr('role', 'button');                                                                     // 361
        }                                                                                                  // 362
                                                                                                           // 363
        if ($aria.config('tabindex') && !elem.attr('tabindex')) {                                          // 364
          elem.attr('tabindex', 0);                                                                        // 365
        }                                                                                                  // 366
                                                                                                           // 367
        if ($aria.config('bindKeypress') && !attr.ngKeypress && !isNodeOneOf(elem, nodeBlackList)) {       // 368
          elem.on('keypress', function(event) {                                                            // 369
            var keyCode = event.which || event.keyCode;                                                    // 370
            if (keyCode === 32 || keyCode === 13) {                                                        // 371
              scope.$apply(callback);                                                                      // 372
            }                                                                                              // 373
                                                                                                           // 374
            function callback() {                                                                          // 375
              fn(scope, { $event: event });                                                                // 376
            }                                                                                              // 377
          });                                                                                              // 378
        }                                                                                                  // 379
      };                                                                                                   // 380
    }                                                                                                      // 381
  };                                                                                                       // 382
}])                                                                                                        // 383
.directive('ngDblclick', ['$aria', function($aria) {                                                       // 384
  return function(scope, elem, attr) {                                                                     // 385
    if ($aria.config('tabindex') && !elem.attr('tabindex')) {                                              // 386
      elem.attr('tabindex', 0);                                                                            // 387
    }                                                                                                      // 388
  };                                                                                                       // 389
}]);                                                                                                       // 390
                                                                                                           // 391
                                                                                                           // 392
})(window, window.angular);                                                                                // 393
                                                                                                           // 394
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['angular:angular-aria'] = {};

})();
