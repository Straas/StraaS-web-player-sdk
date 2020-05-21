  async function initPlayer() {
    const response = await window.fetch('https://demo.straas.net/api/apptoken')

    if (response.ok) {
      const data = await response.json()
      window['StraaSOnInit'] = function () {
        const StraaS = window.StraaS
        const Player = StraaS.Player
        const playerInstance = new Player('#player', {
          type: Player.Type.VIDEO,
          id: 'PKLQhfZh',
          accountId: 'demo.straas.io-test',
          appToken: data.token
        })
      }
    }

  }

  initPlayer()
