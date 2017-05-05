var Player
var playerInstance

var ACCOUNT_ID = 'demo.straas.io-test'
var VIDEO_ID = 'iqFDrEw7'

window['StraaSOnInit'] = function StraaSOnInit() {
  Player = window.StraaS.Player

  playerInstance = new Player('#player', {
    id: VIDEO_ID,
    accountId: ACCOUNT_ID,
    type: Player.Type.VIDEO,
    // see https://github.com/StraaS/StraaS-web-document/wiki/SDK-Player#initialize-player
    options: {
      inactivityTimeout: 7000
    }
  })
}
