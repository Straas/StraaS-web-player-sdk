var Player
var playerInstance

var ACCOUNT_ID = 'demo.straas.io-test'
var VIDEO_ID = 'PKLQhfZh'

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
      playerVars: {
        autoplay: Player.Autoplay.YES,
        showViewsCount: 300000
      },
    })
  }
}

initPlayer()
