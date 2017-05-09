const ControlsComponent = window['ControlsComponent']
const PlayerComponent = window['PlayerComponent']

class MainComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      playerKey: 0,
      controls: {
        id: 'tnrcYBHV',
        accountId: 'cw.com.tw',
        type: StraaS.Player.Type.VIDEO,
        token: '',
        events: {},
        deps: [],
      },
      updateControls: (state) => {
        this.setState({
          controls: _.defaultsDeep(state, this.state.controls)
        })
      }
    }
  }

  initializePlayer() {
    this.setState({
      playerKey: this.state.playerKey + 1
    })
  }

  render() {
    return (
      <div>
        <h1>http://your.own.domain/</h1>

        <ControlsComponent
          input={this.state.controls}
          output={this.state.updateControls.bind(this)} />

        <button style={{width: '100%', height: '40px'}}
          onClick={this.initializePlayer.bind(this)}>Initialize</button>

        <hr/>

        <PlayerComponent
          key={this.state.playerKey}
          css={{width: '100%', height: '620px'}}
          setup={this.state.controls} />
      </div>
    )
  }
}

window['StraaSOnInit'] = () => {
  ReactDOM.render(
    <MainComponent/>,
    document.getElementById('demo')
  )
}
