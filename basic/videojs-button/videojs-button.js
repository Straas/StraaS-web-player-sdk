'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Use babel to transpile this file into es5 syntax
(function (videojs) {
  var BigPlayButton = videojs.getComponent('BigPlayButton');

  var CustomButton = function (_BigPlayButton) {
    _inherits(CustomButton, _BigPlayButton);

    function CustomButton(options) {
      _classCallCheck(this, CustomButton);

      var _this = _possibleConstructorReturn(this, (CustomButton.__proto__ || Object.getPrototypeOf(CustomButton)).call(this, options));

      _this.player_.on('play', function () {
        _this.el().classList.add('vjs-my-button-pause');
      });
      _this.player_.on('pause', function () {
        _this.el().classList.remove('vjs-my-button-pause');
      });
      return _this;
    }

    _createClass(CustomButton, [{
      key: 'handleClick',
      value: function handleClick() {
        if (this.player_.paused()) {
          this.player_.play();
        } else {
          this.player_.pause();
        }
      }
    }, {
      key: 'buildCSSClass',
      value: function buildCSSClass() {
        return 'vjs-my-button';
      }
    }]);

    return CustomButton;
  }(BigPlayButton);

  videojs.registerComponent('CustomButton', CustomButton);

  videojs.plugin('customButton', function customButton() {
    var player = this;

    player.one('ready', function ready() {
      player.CustomButton = player.addChild(new CustomButton(player));
    });
  });
})(window.videojs);
