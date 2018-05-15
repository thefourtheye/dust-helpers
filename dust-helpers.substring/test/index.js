'use strict';

require('dustjs-linkedin');
require('dustjs-helpers');
var dust = require('../index');
var assert = require('assert');

function tester(err, actual, expected, done) {
  if (err) {
    return done(err);
  }
  try {
    assert.deepStrictEqual(actual, expected);
    done();
  } catch (ex) {
    done(ex);
  }
}

describe('dust-helpers', function() {
  describe('substring', function() {
    it('should return empty when the input string is not present', function(done) {
      dust.renderSource('{@substring /}', {}, function(err, out) {
        tester(err, out, '', done);
      });
    });

    it('should return empty when the input string is not a string', function(done) {
      dust.renderSource('{@substring string=1 /}', {}, function(err, out) {
        tester(err, out, '', done);
      });
    });

    it('should return empty when the input string is an empty string', function(done) {
      dust.renderSource('{@substring string="" /}', {}, function(err, out) {
        tester(err, out, '', done);
      });
    });

    it('should start from beginning if start is not a number', function(done) {
      dust.renderSource('{@substring string="abcd" start="2" end=4 /}', {}, function(err, out) {
        tester(err, out, 'abcd', done);
      });
    });

    it('should start from beginning if start is not present', function(done) {
      dust.renderSource('{@substring string="abcd" end=4 /}', {}, function(err, out) {
        tester(err, out, 'abcd', done);
      });
    });

    it('should start from beginning if start is lesser than zero', function(done) {
      dust.renderSource('{@substring string="abcd" start=-1 end=4 /}', {}, function(err, out) {
        tester(err, out, 'abcd', done);
      });
    });

    it('should return till the end if end is not a number', function(done) {
      dust.renderSource('{@substring string="abcd" end="4" /}', {}, function(err, out) {
        tester(err, out, 'abcd', done);
      });
    });

    it('should return till the end if end is not present', function(done) {
      dust.renderSource('{@substring string="abcd" start=2 /}', {}, function(err, out) {
        tester(err, out, 'cd', done);
      });
    });

    it('should return till the end if end is greater than the length of the string', function(done) {
      dust.renderSource('{@substring string="abcd" start=2 end=10 /}', {}, function(err, out) {
        tester(err, out, 'cd', done);
      });
    });
  });
});
