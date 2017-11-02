let player

/**
 * There are some changelogs, please follow the link below:
 * https://github.com/StraaS/StraaS-web-player-sdk/releases
 */
window.StraaSOnInit = function StraaSOnInit() {
  const Player = window.StraaS.Player

  const initialOptions = {
    id: '3mukexPF', // required
    accountId: 'cw.com.tw', // required
    type: Player.Type.VIDEO,
    playerVars: {
      autoplay: Player.Autoplay.NO,
      loop: Player.Loop.YES,
      muted: Player.Muted.NO,
      playlistMenu: Player.PlaylistMenu.YES,
    },
  }

  player = new Player('#player', Object.assign({}, initialOptions, {}))
}
