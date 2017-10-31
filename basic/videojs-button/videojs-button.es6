// Use babel to transpile this file into es5 syntax
(function(videojs) {
  var BigPlayButton = videojs.getComponent('BigPlayButton')

  class CustomButton extends BigPlayButton {
    constructor(options) {
      super(options)
      this.player_.on('play', () => {
        this.el().classList.add('vjs-my-button-pause')
      })
      this.player_.on('pause', () => {
        this.el().classList.remove('vjs-my-button-pause')
      })
    }

    handleClick() {
      if(this.player_.paused()) {
        this.player_.play()
      }
      else {
        this.player_.pause()
      }
    }

    buildCSSClass() {
      return 'vjs-my-button'
    }
  }

  videojs.registerComponent('CustomButton', CustomButton)

  videojs.plugin('customButton', function customButton() {
    var player = this

    player.one('ready', function ready() {
      player.CustomButton = player.addChild(new CustomButton(player))
    })
  })
})(window.videojs)
