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
    deps: [
      // for example we use the videojs plugin:
      // https://github.com/funnyordie/videojs-imageOverlay
      'https://cdn.rawgit.com/funnyordie/videojs-imageOverlay/master/videojs.imageOverlay.js',
      'https://cdn.rawgit.com/funnyordie/videojs-imageOverlay/master/videojs.imageOverlay.css',
    ],
    plugins: [
      {
        // follow the plugin usage, find the name, in this case `imageOverlay`
        name: 'imageOverlay',
        // then put plugin options here:
        options: {
          image_url: 'http://assets0.ordienetworks.com/misc/JimCarreyEyebrow.jpg',
          click_url: 'https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewAlbum?id=624854547',
          opacity: 1,
          start_time: 5,
          height: '20%',
        }
      }
    ]
  })
}
