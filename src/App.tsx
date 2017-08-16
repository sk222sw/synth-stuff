import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import * as React from 'react'
import './App.css'
import keys from './assets/keys.json'
import hoo from './models/Synth2'

import * as R from 'ramda'
import Keyboard from './components/Keyboard'

class App extends React.Component<{}, any> {
  constructor(props) {
    super(props)

    this.state = {
      synth: undefined,
      muted: true,
      frequency: 880.00,
      volume: 0.1,
      waveforms: [
        'triangle', 'sawtooth', 'sine', 'square',
      ],
      keys,
      oscillatorConfigs: [
        {
          offset: 0,
          playing: false,
          semi: 0,
          waveform: 'triangle',
        },
        {
          offset: 20,
          playing: false,
          semi: 0,
          waveform: 'sine',
        },
      ],
    }
  }

  componentWillMount() {
    const ctx = hoo.setup()
    const synth = hoo.createSynth(ctx)({})

    const oscillatorConfigs =
      this.state.oscillatorConfigs.map((o, id) => ({ ...o,id }))

    this.setState({ synth, oscillatorConfigs })
  }

  stop = () => {
    hoo.stop(this.state.synth)
  }

  setOffset = (oscillator) => (offset) => {
    const { oscillatorConfigs } = this.state
    const index = R.findIndex(R.propEq('id', oscillator.id))(oscillatorConfigs)
    const current = oscillatorConfigs[index]

    if (oscillator.playing)
      hoo.setOffset(this.state.synth.oscillators[index], offset)

    this.updateOscillatorConfig(index, current, 'offset', offset)
  }

  setWaveform = (oscillator, waveform) => {
    const { oscillatorConfigs } = this.state
    const index = this.getOscillatorConfigById(oscillator.id)
    const current = oscillatorConfigs[index]

    if (oscillator.playing)
      hoo.setWaveform(this.state.synth.oscillators[index], waveform)

    this.updateOscillatorConfig(index, current, 'waveform', waveform)
  }

  setSemi = oscillator => value => {
    const semi = Number(value)
    const { oscillatorConfigs } = this.state
    const index = this.getOscillatorConfigById(oscillator.id)
    const current = oscillatorConfigs[index]

    if (oscillator.playing)
      hoo.setSemi(this.state.synth.oscillators[index], semi)

    this.updateOscillatorConfig(index, current, 'semi', semi)
  }

  setFrequency = (frequency) => {
    hoo.setFrequency(this.state.synth, frequency)
    this.setState({ frequency })
  }

  setVolume = volume => {
    hoo.setVolume(this.state.synth, volume)
    this.setState({ volume })
  }

  updateOscillatorConfig = (index, oscillator, field, value) => {
    const updated = R.update(
      index,
      { ...oscillator, [field]: value },
      this.state.oscillatorConfigs,
    )

    this.setState({ oscillatorConfigs: updated })
    return updated
  }

  getOscillatorConfigById = id => {
    return R.findIndex(R.propEq('id', id))(this.state.oscillatorConfigs)
  }

  setOscillatorsToPlaying = () => {
    const oscillators = this.state.oscillatorConfigs.map(o => {
      o.playing = true
    })

    this.setState({ oscillators })
  }

  playWithoutPortamento = key => {
    hoo.stop(this.state.synth)
    this.state.oscillatorConfigs.forEach(o => {
      hoo.addOscillator(this.state.synth, {
        id: o.id,
        frequency: key.frequency,
        volume: this.state.volume,
        offset: o.offset,
        waveform: o.waveform,
      })
    })

    this.setOscillatorsToPlaying()

    hoo.play(this.state.synth)
  }

  onKeyClick = key => {
    this.playWithoutPortamento(key)
  }

  render() {

    return (
      <div className="App">
        {this.state.oscillatorConfigs.map(o =>
          <div key={o.id} style={{ width: 300, marginLeft: 250 }}>
            {o.playing ? '>' : '.'}
            Offset
            <Slider
              value={o.offset}
              onChange={this.setOffset(o)}
              min={-50}
              max={50}
            />
            {o.offset}
            <div>
              semi
              <input
                type="number"
                max="24"
                min="-24"
                value={o.semi}
                onChange={v => this.setSemi(o)(v.target.value)}
              />
              {o.semi}
            </div>
            <div>
              {this.state.waveforms.map(w =>
                <button
                  key={w}
                  onClick={_ => this.setWaveform(o, w)}
                  style={{ borderColor: o.waveform === w ? 'red' : '' }}
                >
                  {w}
                </button>)
              }
            </div>
          </div>,
        )}
        <div style={{ width: 300, marginLeft: 250 }}>
          Volume
          <Slider
            value={this.state.volume}
            onChange={this.setVolume}
            min={0}
            max={1}
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
