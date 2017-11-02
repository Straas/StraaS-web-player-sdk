class PlayerComponent extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="player" style={this.props.css}>Loading...</div>
    )
  }

  componentDidMount() {
    const Player = StraaS.Player

    const setup = this.props.setup

    setup.deps = (typeof setup.deps === 'string') ?
      setup.deps
        .split('\n')
        .filter(item => item.startsWith('http'))
        .map(item => item.trim())
     : []

    setup.events && Object.keys(setup.events).forEach(item => {
      const eventEnable = setup.events[item]

      if (eventEnable === true) {
        setup.events[item] = (event) => {
          console.group(`Handle Event ${item}: (event) => {}`)
          console.info(event)
          console.groupEnd()
        }
      }
    })

    try {
      new Player('#player', {
        ...setup,
      })
    } catch (error) {
      document.getElementById('player').innerHTML = error
    }
  }
}

window['PlayerComponent'] = PlayerComponent
