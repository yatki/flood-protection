'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var now = function now() {
  return Math.floor(Date.now() / 1000);
};

var FloodProtection = function () {
  function FloodProtection() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, FloodProtection);

    var defaultOptions = {
      rate: 5, // unit: messages
      per: 8 // unit: seconds
    };

    this.options = Object.assign({}, defaultOptions, options);

    if (this.options.rate < 1.0) {
      throw new Error('Rate must be >= 1.0');
    }

    this.allowance = this.options.rate;
    this.lastCheck = now();
  }

  _createClass(FloodProtection, [{
    key: 'check',
    value: function check() {
      var _options = this.options,
          rate = _options.rate,
          per = _options.per;


      var current = now();
      var timePassed = current - this.lastCheck;
      this.lastCheck = current;
      this.allowance += timePassed * (rate / per);

      if (this.allowance > rate) {
        this.allowance = rate; // throttle
      }

      var allowed = this.allowance >= 1.0;

      if (allowed) {
        this.allowance -= 1.0;
      }

      return allowed;
    }
  }]);

  return FloodProtection;
}();

exports.default = FloodProtection;