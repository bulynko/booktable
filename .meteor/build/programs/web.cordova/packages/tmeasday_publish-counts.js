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
var Mongo = Package.mongo.Mongo;

/* Package-scope variables */
var Counts, publishCount;

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/tmeasday:publish-counts/publish-counts.js                                                               //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var noWarnings = false;                                                                                             // 1
                                                                                                                    // 2
if (Meteor.isServer) {                                                                                              // 3
  Counts = {};                                                                                                      // 4
  Counts.publish = function(self, name, cursor, options) {                                                          // 5
    var initializing = true;                                                                                        // 6
    var handle;                                                                                                     // 7
    options = options || {};                                                                                        // 8
                                                                                                                    // 9
    var extraField, countFn;                                                                                        // 10
                                                                                                                    // 11
    if (options.countFromField) {                                                                                   // 12
      extraField = options.countFromField;                                                                          // 13
      if ('function' === typeof extraField) {                                                                       // 14
        countFn = Counts._safeAccessorFunction(extraField);                                                         // 15
      } else {                                                                                                      // 16
        countFn = function(doc) {                                                                                   // 17
          return doc[extraField] || 0;    // return 0 instead of undefined.                                         // 18
        }                                                                                                           // 19
      }                                                                                                             // 20
    } else if (options.countFromFieldLength) {                                                                      // 21
      extraField = options.countFromFieldLength;                                                                    // 22
      if ('function' === typeof extraField) {                                                                       // 23
        countFn = Counts._safeAccessorFunction(function (doc) {                                                     // 24
          return extraField(doc).length;                                                                            // 25
        });                                                                                                         // 26
      } else {                                                                                                      // 27
        countFn = function(doc) {                                                                                   // 28
          if (doc[extraField]) {                                                                                    // 29
            return doc[extraField].length;                                                                          // 30
          } else {                                                                                                  // 31
            return 0;                                                                                               // 32
          }                                                                                                         // 33
        }                                                                                                           // 34
      }                                                                                                             // 35
    }                                                                                                               // 36
                                                                                                                    // 37
                                                                                                                    // 38
    if (countFn && options.nonReactive)                                                                             // 39
      throw new Error("options.nonReactive is not yet supported with options.countFromFieldLength or options.countFromFieldSum");
                                                                                                                    // 41
    if (cursor && cursor._cursorDescription) {                                                                      // 42
      cursor._cursorDescription.options.fields =                                                                    // 43
        Counts._optimizeQueryFields(cursor._cursorDescription.options.fields, extraField, options.noWarnings);      // 44
    }                                                                                                               // 45
                                                                                                                    // 46
    var count = 0;                                                                                                  // 47
    var observers = {                                                                                               // 48
      added: function(doc) {                                                                                        // 49
        if (countFn) {                                                                                              // 50
          count += countFn(doc);                                                                                    // 51
        } else {                                                                                                    // 52
          count += 1;                                                                                               // 53
        }                                                                                                           // 54
                                                                                                                    // 55
        if (!initializing)                                                                                          // 56
          self.changed('counts', name, {count: count});                                                             // 57
      },                                                                                                            // 58
      removed: function(doc) {                                                                                      // 59
        if (countFn) {                                                                                              // 60
          count -= countFn(doc);                                                                                    // 61
        } else {                                                                                                    // 62
          count -= 1;                                                                                               // 63
        }                                                                                                           // 64
        self.changed('counts', name, {count: count});                                                               // 65
      }                                                                                                             // 66
    };                                                                                                              // 67
                                                                                                                    // 68
    if (countFn) {                                                                                                  // 69
      observers.changed = function(newDoc, oldDoc) {                                                                // 70
        if (countFn) {                                                                                              // 71
          count += countFn(newDoc) - countFn(oldDoc);                                                               // 72
        }                                                                                                           // 73
                                                                                                                    // 74
        self.changed('counts', name, {count: count});                                                               // 75
      };                                                                                                            // 76
    }                                                                                                               // 77
                                                                                                                    // 78
    if (!countFn) {                                                                                                 // 79
      self.added('counts', name, {count: cursor.count()});                                                          // 80
      if (!options.noReady)                                                                                         // 81
        self.ready();                                                                                               // 82
    }                                                                                                               // 83
                                                                                                                    // 84
    if (!options.nonReactive)                                                                                       // 85
      handle = cursor.observe(observers);                                                                           // 86
                                                                                                                    // 87
    if (countFn)                                                                                                    // 88
      self.added('counts', name, {count: count});                                                                   // 89
                                                                                                                    // 90
    if (!options.noReady)                                                                                           // 91
      self.ready();                                                                                                 // 92
                                                                                                                    // 93
    initializing = false;                                                                                           // 94
                                                                                                                    // 95
    self.onStop(function() {                                                                                        // 96
      if (handle)                                                                                                   // 97
        handle.stop();                                                                                              // 98
    });                                                                                                             // 99
                                                                                                                    // 100
    return {                                                                                                        // 101
      stop: function() {                                                                                            // 102
        if (handle) {                                                                                               // 103
          handle.stop();                                                                                            // 104
          handle = undefined;                                                                                       // 105
        }                                                                                                           // 106
      }                                                                                                             // 107
    };                                                                                                              // 108
  };                                                                                                                // 109
  // back compatibility                                                                                             // 110
  publishCount = Counts.publish;                                                                                    // 111
                                                                                                                    // 112
  Counts.noWarnings = function (noWarn) {                                                                           // 113
    // suppress warnings if no arguments, or first argument is truthy                                               // 114
    noWarnings = (0 == arguments.length || !!noWarn);                                                               // 115
  }                                                                                                                 // 116
                                                                                                                    // 117
  Counts._safeAccessorFunction = function safeAccessorFunction (fn) {                                               // 118
    // ensure that missing fields don't corrupt the count.  If the count field                                      // 119
    // doesn't exist, then it has a zero count.                                                                     // 120
    return function (doc) {                                                                                         // 121
      try {                                                                                                         // 122
        return fn(doc) || 0;    // return 0 instead of undefined                                                    // 123
      }                                                                                                             // 124
      catch (err) {                                                                                                 // 125
        if (err instanceof TypeError) {   // attempted to access property of undefined (i.e. deep access).          // 126
          return 0;                                                                                                 // 127
        } else {                                                                                                    // 128
          throw err;                                                                                                // 129
        }                                                                                                           // 130
      }                                                                                                             // 131
    };                                                                                                              // 132
  }                                                                                                                 // 133
                                                                                                                    // 134
  Counts._optimizeQueryFields = function optimizeQueryFields (fields, extraField, noWarn) {                         // 135
    switch (typeof extraField) {                                                                                    // 136
      case 'function':      // accessor function used.                                                              // 137
        if (undefined === fields) {                                                                                 // 138
          // user did not place restrictions on cursor fields.                                                      // 139
          Counts._warn(noWarn,                                                                                      // 140
                       'publish-counts: Collection cursor has no field limits and will fetch entire documents.  ' + // 141
                       'consider specifying only required fields.');                                                // 142
          // if cursor field limits are empty to begin with, leave them empty.  it is the                           // 143
          // user's responsibility to specify field limits when using accessor functions.                           // 144
        }                                                                                                           // 145
        // else user specified restrictions on cursor fields.  Meteor will ensure _id is one of them.               // 146
        // WARNING: unable to verify user included appropriate field for accessor function to work.  we can't hold their hand ;_;
                                                                                                                    // 148
        return fields;                                                                                              // 149
                                                                                                                    // 150
      case 'string':        // countFromField or countFromFieldLength has property name.                            // 151
        // extra field is a property                                                                                // 152
                                                                                                                    // 153
        // automatically set limits if none specified.  keep existing limits since user                             // 154
        // may use a cursor transform and specify a dynamic field to count, but require other                       // 155
        // fields in the transform process  (e.g. https://github.com/percolatestudio/publish-counts/issues/47).     // 156
        fields = fields || {};                                                                                      // 157
        // _id and extraField are required                                                                          // 158
        fields._id = true;                                                                                          // 159
        fields[extraField] = true;                                                                                  // 160
                                                                                                                    // 161
        if (2 < _.keys(fields).length)                                                                              // 162
          Counts._warn(noWarn,                                                                                      // 163
                       'publish-counts: unused fields detected in cursor fields option',                            // 164
                       _.omit(fields, ['_id', extraField]));                                                        // 165
                                                                                                                    // 166
        // use modified field limits.  automatically defaults to _id and extraField if none specified by user.      // 167
        return fields;                                                                                              // 168
                                                                                                                    // 169
      case 'undefined':     // basic count                                                                          // 170
        if (fields && 0 < _.keys(_.omit(fields, ['_id'])).length)                                                   // 171
          Counts._warn(noWarn,                                                                                      // 172
                       'publish-counts: unused fields removed from cursor fields option.',                          // 173
                       _.omit(fields, ['_id']));                                                                    // 174
                                                                                                                    // 175
        // dispose of user field limits, only _id is required                                                       // 176
        fields = { _id:  true };                                                                                    // 177
                                                                                                                    // 178
        // use modified field limits.  automatically defaults to _id if none specified by user.                     // 179
        return fields;                                                                                              // 180
                                                                                                                    // 181
      default:                                                                                                      // 182
        throw new Error("unknown invocation of Count.publish() detected.");                                         // 183
    }                                                                                                               // 184
  }                                                                                                                 // 185
                                                                                                                    // 186
  Counts._warn = function warn (noWarn) {                                                                           // 187
    if (noWarnings || noWarn || 'production' == process.env.NODE_ENV)                                               // 188
      return;                                                                                                       // 189
                                                                                                                    // 190
    var args = Array.prototype.slice.call(arguments, 1);                                                            // 191
    console.warn.apply(console, args);                                                                              // 192
  }                                                                                                                 // 193
}                                                                                                                   // 194
                                                                                                                    // 195
if (Meteor.isClient) {                                                                                              // 196
  Counts = new Mongo.Collection('counts');                                                                          // 197
                                                                                                                    // 198
  Counts.get = function countsGet (name) {                                                                          // 199
    var count = this.findOne(name);                                                                                 // 200
    return count && count.count || 0;                                                                               // 201
  };                                                                                                                // 202
                                                                                                                    // 203
  Counts.has = function countsHas (name) {                                                                          // 204
    return !!this.findOne(name);                                                                                    // 205
  }                                                                                                                 // 206
                                                                                                                    // 207
  if (Package.templating) {                                                                                         // 208
    Package.templating.Template.registerHelper('getPublishedCount', function(name) {                                // 209
      return Counts.get(name);                                                                                      // 210
    });                                                                                                             // 211
  }                                                                                                                 // 212
}                                                                                                                   // 213
                                                                                                                    // 214
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['tmeasday:publish-counts'] = {
  Counts: Counts
};

})();
