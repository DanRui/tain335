// Generated by CoffeeScript 1.6.3
(function() {
  module.exports = (function() {
    var expect, expects, inspect, statistics;
    expects = [];
    statistics = function(increment, start) {
      var exp, _i, _len, _results;
      totalFinished += increment;
      _results = [];
      for (_i = 0, _len = expects.length; _i < _len; _i++) {
        exp = expects[_i];
        if (totalFinished >= exp) {
          _results.push(console.timeEnd('Test'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    expect = function(exp) {
      return expects.push(exp);
    };
    inspect = function() {
      return console.log('inspect objects');
    };
    return {
      expect: expect,
      statistics: statistics
    };
  })();

}).call(this);
