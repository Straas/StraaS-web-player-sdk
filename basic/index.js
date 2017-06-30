var Player
var playerInstance

var ACCOUNT_ID = 'demo.straas.io-test'
var VIDEO_ID = 'iqFDrEw7'

/**
 * There are some changelogs, please follow the link below:
 * https://github.com/StraaS/StraaS-web-player-sdk/releases
 */
window['StraaSOnInit'] = function StraaSOnInit() {
  Player = window.StraaS.Player

  playerInstance = new Player('#player', {
    id: VIDEO_ID,
    accountId: ACCOUNT_ID,
    type: Player.Type.VIDEO,
    playerVars: {
      autoplay: Player.Autoplay.NO,
      loop: Player.Loop.NO,
      muted: Player.Muted.NO,
      playlistMenu: Player.PlaylistMenu.YES,
    },
    events: {
      canplay: function(event) {
        console.log('initial define event for canplay', event)
      },
      timeupdate: function (event) {
        console.log('[recorded video time(ms)]', event.target.currentLiveDateTime)
      }
    },
  })
}
