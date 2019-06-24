var Player
var playerInstance

var ACCOUNT_ID = 'demo.straas.io-test'
var VIDEO_ID = 'PKLQhfZh'

async function initPlayer() {
  const response = await window.fetch('https://demo.straas.net/api/apptoken')

  if (response.ok) {
    const data = await response.json()
    window['StraaSOnInit'] = function () {
      const StraaS = window.StraaS
      const Player = StraaS.Player
      const playerInstance = new Player('#player', {
        type: Player.Type.VIDEO,
        id: VIDEO_ID,
        accountId: ACCOUNT_ID,
        appToken: data.token,
        enableJsDeps: true,
        deps: [
          'https://straas.github.io/StraaS-web-player-sdk/demo/create-plugin/videojs.foo.js',
          'https://straas.github.io/StraaS-web-player-sdk/demo/create-plugin/videojs.foo.css',
        ],
        plugins: [
          {
            name: 'foo',
            options: {
              exampleOption: 'foo',
              exampleOption2: 'foo2',
            }
          }
        ]
      })
    }
  }

}

initPlayer()
