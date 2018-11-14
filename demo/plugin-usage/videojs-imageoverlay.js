/*
 *  Copyright (c) 2013 Funny or Die, Inc.
 *  http://www.funnyordie.com
 *  https://github.com/funnyordie/videojs-imageOverlay/blob/master/LICENSE
 */

(function(vjs) {
  var
  extend = function(obj) {
    var arg, i, k;
    for (i = 1; i < arguments.length; i++) {
      arg = arguments[i];
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          obj[k] = arg[k];
        }
      }
    }
    return obj;
  },

  defaults = {
      image_url: '',
      click_url:     '',
      start_time: null,
      end_time: null,
      opacity: 0.7,
      height: '15%',
      width: '100%'
  },

  imageOverlay = function(options) {
    var player = this,
        settings = extend({}, defaults, options || {}),
        showingImage = false;

    if (settings.start_time === null)
      settings.start_time = 0;

    overlay = {
      checkOverlay: function() {
        if ((player.currentTime() >= settings.start_time) && (player.currentTime() < (settings.end_time || player.duration() ))) {
          overlay.showImage();
        } else {
          overlay.hideImage();
        }
      },
      showImage: function() {
        if (showingImage) {
          return;
        }
        showingImage = true;
        var holderDiv = document.createElement('div');
        holderDiv.id = 'vjs-image-overlay-holder';
        holderDiv.style.height = settings.height;
        holderDiv.style.width = settings.width;

        var overlayImage = document.createElement('img');
        overlayImage.src = settings.image_url;
        overlayImage.onclick = function() {
          player.pause();
          window.open(settings.click_url);
        };
        overlayImage.style.opacity = settings.opacity;

        holderDiv.appendChild(overlayImage);
        player.el().appendChild(holderDiv);
      },
      hideImage: function() {
        if (!showingImage) {
          return;
        }
        showingImage = false;
        player.el().removeChild(document.getElementById('vjs-image-overlay-holder'));
      }
    };

    player.on('timeupdate', overlay.checkOverlay);
  };

  vjs.plugin('imageOverlay', imageOverlay);
}(window.videojs));
