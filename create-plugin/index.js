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
      'https://straas.github.io/StraaS-web-sdk-sample/create-plugin/videojs.foo.js',
      'https://straas.github.io/StraaS-web-sdk-sample/create-plugin/videojs.foo.css',
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
