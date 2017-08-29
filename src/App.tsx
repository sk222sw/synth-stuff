import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import * as React from 'react'
import './App.css'
import keys from './assets/keys.json'
import hoo from './models/Synth2'

import * as R from 'ramda'
import Envelope from './components/Envelope'
import Keyboard from './components/Keyboard'
import { keyExists, keyIsPressed, removeKey } from './helpers/KeyHandler'
import ComputerKeyboard from './hocs/ComputerKeyboard'

const findByKeyPress = oscillators => R.compose(
  R.filter(R.__, oscillators),
  R.propEq('keyPress'),
)

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
      envelope: {
        a: 0.25,
        d: 0.25,
        s: 0.25,
        r: 0.25,
      },
      pressedKeys: [],
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

  // stop = () => hoo.stop(this.state.synth)

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
    this.state.oscillatorConfigs.forEach(o => {
      hoo.addOscillator(this.state.synth, {
        id: o.id,
        frequency: key.frequency,
        volume: this.state.volume,
        offset: o.offset,
        waveform: o.waveform,
        keyPress: key.keyPress,
      })
    })

    this.setOscillatorsToPlaying()

    hoo.play(this.state.synth, this.state.envelope.a)
  }

  onKeyClick = key => this.playWithoutPortamento(key)

  handleKeyDown = ({ key }) => {
    if (keyExists(key) && !keyIsPressed(this.state.pressedKeys, key)) {

      const keyData = R.find(R.propEq('keyPress', key), (this.state.keys))

      this.playWithoutPortamento(keyData)

      this.setState({
        pressedKeys: [...this.state.pressedKeys, key],
      })
    }
  }

  handleKeyUp = ({ key }) => {
    if (keyExists(key)) {
      this.setState({
        pressedKeys: removeKey(this.state.pressedKeys, key),
      })
      const oscillators = findByKeyPress(this.state.synth.oscillators)(key)
      hoo.stopOscillators(this.state.synth, oscillators, this.state.envelope.r)

      this.setState({
        synth: {
          ...this.state.synth,
          oscillators: this.state.synth.oscillators
          .filter(o => o.keyPress !== key),
        },
      })
    }
  }

  changeEnvelope = type => value => {
    const envelope = {
      ...this.state.envelope,
      [type]: value,
    }

    this.setState({ envelope })
  }

  render() {

    return (
      <div className="App">
        <ComputerKeyboard
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
        >
          {this.state.oscillatorConfigs.map(o =>
            <div key={o.id} style={{ width: 300, marginLeft: 250 }}>
              {o.playing ? '>' : ''}
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
          <div>
            {this.state.pressedKeys.map(key => <span key={key}>{key}</span>)}
          </div>
        </ComputerKeyboard>
        <Envelope
          envelope={this.state.envelope}
          changeAttack={this.changeEnvelope('a')}
          changeDecay={this.changeEnvelope('d')}
          changeSustain={this.changeEnvelope('s')}
          changeRelease={this.changeEnvelope('r')}
        />
      </div>
    )
  }
}

export default App
