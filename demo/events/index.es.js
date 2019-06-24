/**
 * There are some changelogs, please follow the link below:
 * https://github.com/StraaS/StraaS-web-player-sdk/releases
 */
window.StraaSOnInit = () => {
  const Player = window.StraaS.Player

  const playerOptions = {
    ...{
      development: { id: 'j8v6BHRD', accountId: 'cw.com.tw' },
      staging: { id: 'cEUxoDrz', accountId: 'cw.com.tw' },
      production: { id: 'PKLQhfZh', accountId: 'demo.straas.io-test' }
    }[window.config.env],
    type: Player.Type.VIDEO,
    playerVars: {
      autoplay: Player.Autoplay.YES,
      loop: Player.Loop.YES,
      muted: Player.Muted.NO,
      playlistMenu: Player.PlaylistMenu.YES,
      objectFit: Player.ObjectFit.COVER,
    },
    events: {
      canplay: () => window.testOk('canplay'),
      loadeddata: () => window.testOk('loadeddata'),
      loadedmetadata: () => window.testOk('loadedmetadata'),
      loadstart: () => window.testOk('loadstart'),
      play: () => window.testOk('play'),
      playing: () => window.testOk('playing'),
      pause: () => window.testOk('pause'),
    },
  }

  const myPlayer = new Player('#player', playerOptions)
}
