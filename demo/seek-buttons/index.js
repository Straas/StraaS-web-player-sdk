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
      appToken: data.token,
      deps: [
        "https://cdn.jsdelivr.net/npm/videojs-seek-buttons@1.3.0/dist/videojs-seek-buttons.js",
        "https://cdn.jsdelivr.net/npm/videojs-seek-buttons@1.3.0/dist/videojs-seek-buttons.css",
        "https://cdn.sc.gl/videojs-hotkeys/latest/videojs.hotkeys.min.js",
        "https://storage.googleapis.com/straasio-player-sdk-production-as/demo/seek-buttons-ui/straas-seek-buttons.css"
      ],
      enableJsDeps: true,
      plugins: [
        {
          name: 'seekButtons',
          options: {
            forward: 10,
            back: 10
          }
        },
        {
          name: 'hotkeys',
          options: {
            volumeStep: 0.1,
            seekStep: 10,
            alwaysCaptureHotkeys: true
          }
        }
      ]
    })
  }


}

initPlayer()
