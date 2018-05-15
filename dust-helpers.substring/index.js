(function(dust) {
  'use strict';

  dust.helpers.substring = function(chunk, ctx, bodies, params) {
    var string = dust.helpers.tap(params.string, chunk, ctx);
    var start = dust.helpers.tap(params.start, chunk, ctx);
    var end = dust.helpers.tap(params.end, chunk, ctx);

    if (!string || typeof string !== 'string') {
      return chunk.write('');
    }

    if (typeof start !== 'number' || start < 0) {
      start = 0;
    }

    if (typeof end !== 'number' || end > string.length) {
      end = string.length;
    }

    return chunk.write(string.substring(start, end));
  };
})(typeof exports !== 'undefined' ? (module.exports = require('dustjs-linkedin')) : dust);
