// Generated by CoffeeScript 1.6.3
(function() {
  var Person;

  Person = (function() {
    function Person() {}

    Person.prototype.hi = function() {
      return console.log('hi');
    };

    Person.hi = function() {
      return console.log('@hi');
    };

    return Person;

  })();

}).call(this);
