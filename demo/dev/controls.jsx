class ControlsComponent extends React.Component {
  constructor() {
    super()

    this.bindingInput = this.bindingInput.bind(this)
  }

  bindingInput(event) {
    if (event.target.name === 'events') {
      this.props.output({
        events: {
          [event.target.value]: event.target.checked
        }
      })
    } else if (event.target.name === 'deps') {
      this.props.output({
        deps: event.target.value
      })
    } else {
      this.props.output({
        [event.target.name]: event.target.value
      })
    }
  }

  render() {
    const types = StraaS.Player.Type

    return (
      <div>
        <div>
          <h2>Initialize</h2>
          <label> ID：
            <input type='text' name='id'
              value={this.props.input.id}
              onChange={this.bindingInput} /> </label>

          <label> ACCOUNT_ID：
            <input type='text' name='accountId'
              value={this.props.input.accountId}
              onChange={this.bindingInput} /> </label>

          <label> TYPE：
            <select name='type'
              value={this.props.input.type}
              onChange={this.bindingInput}>
              <option value={types.VIDEO}>VIDEO</option>
              <option value={types.PLAYLIST}>PLAYLIST</option>
              <option value={types.LIVE}>LIVE</option>
            </select>
          </label>

          <label> TOKEN：
            <input type='text' name='token'
              value={this.props.input.token}
              onChange={this.bindingInput} /> </label>
        </div>

        <div>
          <h2>Events</h2>
          <label> <input type='checkbox' name='events' value='onVideoChange' onChange={this.bindingInput} /> onVideoChange </label>
          <label> <input type='checkbox' name='events' value='onError' onChange={this.bindingInput} /> onError </label>
          <label> <input type='checkbox' name='events' value='abort' onChange={this.bindingInput} /> abort </label>
          <label> <input type='checkbox' name='events' value='canplay' onChange={this.bindingInput} /> canplay </label>
          <label> <input type='checkbox' name='events' value='canplaythrough' onChange={this.bindingInput} /> canplaythrough </label>
          <label> <input type='checkbox' name='events' value='durationchange' onChange={this.bindingInput} /> durationchange </label>
          <label> <input type='checkbox' name='events' value='emptied' onChange={this.bindingInput} /> emptied </label>
          <label> <input type='checkbox' name='events' value='encrypted' onChange={this.bindingInput} /> encrypted </label>
          <label> <input type='checkbox' name='events' value='ended' onChange={this.bindingInput} /> ended </label>
          <label> <input type='checkbox' name='events' value='loadeddata' onChange={this.bindingInput} /> loadeddata </label>
          <label> <input type='checkbox' name='events' value='loadedmetadata' onChange={this.bindingInput} /> loadedmetadata </label>
          <label> <input type='checkbox' name='events' value='loadstart' onChange={this.bindingInput} /> loadstart </label>
          <label> <input type='checkbox' name='events' value='pause' onChange={this.bindingInput} /> pause </label>
          <label> <input type='checkbox' name='events' value='play' onChange={this.bindingInput} /> play </label>
          <label> <input type='checkbox' name='events' value='playing' onChange={this.bindingInput} /> playing </label>
          <label> <input type='checkbox' name='events' value='progress' onChange={this.bindingInput} /> progress </label>
          <label> <input type='checkbox' name='events' value='ratechange' onChange={this.bindingInput} /> ratechange </label>
          <label> <input type='checkbox' name='events' value='seeked' onChange={this.bindingInput} /> seeked </label>
          <label> <input type='checkbox' name='events' value='seeking' onChange={this.bindingInput} /> seeking </label>
          <label> <input type='checkbox' name='events' value='stalled' onChange={this.bindingInput} /> stalled </label>
          <label> <input type='checkbox' name='events' value='timeupdate' onChange={this.bindingInput} /> timeupdate </label>
          <label> <input type='checkbox' name='events' value='volumechange' onChange={this.bindingInput} /> volumechange </label>
          <label> <input type='checkbox' name='events' value='waiting' onChange={this.bindingInput} /> waiting </label>
        </div>

        <div>
          <h2>Deps</h2>
          <textarea name='deps' rows='10'
            style={{width: '100%'}}
            placeholder={
              'http://127.0.0.1:8765/demo/create-plugin/videojs.foo.css' +
              '\r\n' +
              'http://127.0.0.1:8765/demo/create-plugin/videojs.foo.js'
            }
            value={this.props.input.deps}
            onChange={this.bindingInput}/>
        </div>
      </div>
    )
  }
}

window['ControlsComponent'] = ControlsComponent
