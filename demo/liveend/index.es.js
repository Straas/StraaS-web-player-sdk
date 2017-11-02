window.StraaSOnInit = () => {
  const Player = window.StraaS.Player

  const myPlayer = new Player('#player', {
    ...{
      development: { id: 'ashdcvAT', accountId: 'cw.com.tw' },
      staging: {},
      production: { id: 'djWSF9t8', accountId: 'trial.straas.io-test' },
    }[window.config.env],
    type: Player.Type.LIVE,
    events: {
      liveended: () => window.testOk('liveended'),
    },
  })
}
