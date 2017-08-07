import * as R from 'ramda'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import * as React from 'react'
import './App.css'
import keys from './assets/keys.json'
import hoo from './models/Synth2'

import Keyboard from './components/Keyboard'

class App extends React.Component<{}, any> {
  constructor(props) {
    super(props)

    this.state = {
      synth: undefined,
      muted: true,
      frequency: 1005,
      volume: 0.1,
      keys,
      oscillatorConfigs: [
        {
          id: 0,
          offset: 0,
        },
        // {
        //   id: 1,
        //   offset: 20,
        // },
      ],
    }
  }

  componentWillMount() {
    const ctx = hoo.setup()
    const synth = hoo.createSynth(ctx)({})

    this.setState({ synth })
  }

  play = () => {
    this.state.oscillatorConfigs.forEach(o => {
      hoo.addOscillator(this.state.synth, {
        id: o.id,
        frequency: this.state.frequency,
        volume: this.state.volume,
        offset: o.offset,
      })
    })

    hoo.play(this.state.synth)
  }

  stop = () => {
    hoo.stop(this.state.synth)
  }

  toggleMuted = () => {
    this.state.muted ? this.play() : this.stop()
    this.setState({ muted: !this.state.muted })
  }

  setOffset = (oscillator) => (offset) => {
    hoo.setOffset(this.state.synth, oscillator.id, offset)
    const { oscillatorConfigs } = this.state
    const index = R.findIndex(R.propEq('id', oscillator.id))(oscillatorConfigs)
    const current = oscillatorConfigs[index]



    const updated = R.update(
      index,
      { ...current, offset },
      oscillatorConfigs,
    )

    this.setState({ oscillatorConfigs: updated })

  }

  setFrequency = (frequency) => {
    hoo.setFrequency(this.state.synth, frequency)
    this.setState({ frequency })
  }

  setVolume = volume => {
    hoo.setVolume(this.state.synth, volume)
    this.setState({ volume })
  }

  onKeyClick = key => {
    this.setFrequency(key.frequency)
  }

  render() {

    return (
      <div className="App">
        <div>
          <button onClick={this.toggleMuted}>
            {this.state.muted ? '>' : '||'}
          </button>
        </div>
        {this.state.oscillatorConfigs.map(o =>
          <div key={o.id} style={{ width: 300, marginLeft: 250 }}>
            Offset
            <Slider
              value={o.offset}
              onChange={this.setOffset(o)}
              min={0}
              max={50}
            />
            {o.offset}
          </div>,
        )}
        <div style={{ width: 300, marginLeft: 250 }}>
          Volume
          <Slider
            value={this.state.volume}
            onChange={this.setVolume}
            min={0}
            max={50}
            step={0.0001}
          />
          {this.state.volume}
        </div>
        <Keyboard
          keys={this.state.keys}
          currentKey="A"
          onKeyClick={this.onKeyClick}
        />
      </div>
    )
  }
}

export default App
