var Player
var playerInstance

var ACCOUNT_ID = 'demo.straas.io-test'
var VIDEO_ID = 'iqFDrEw7'

async function initPlayer() {
  const response = await window.fetch('https://demo.straas.net/api/apptoken')

  if (!response.ok) {
    throw new Error('failed to get app token', e.message)
  }

  const data = await response.json()
  window['StraaSOnInit'] = function StraaSOnInit() {
    Player = window.StraaS.Player

    playerInstance = new Player('#player', {
      id: VIDEO_ID,
      accountId: ACCOUNT_ID,
      type: Player.Type.VIDEO,
      enableJsDeps: true,
      deps: [
        // for example we use the videojs plugin:
        // https://github.com/funnyordie/videojs-imageOverlay
        'https://straas.github.io/StraaS-web-player-sdk/demo/plugin-usage/videojs-imageoverlay.js',
        'https://straas.github.io/StraaS-web-player-sdk/demo/plugin-usage/videojs-imageoverlay.css',
      ],
      appToken: data.token,
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


}

initPlayer()
