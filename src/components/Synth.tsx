import * as React from 'react'
import keys from '../assets/keys.json'
import hoo from '../models/Synth'

import * as R from 'ramda'
import styled from 'styled-components'
import Envelope from '../components/Envelope'
import Filter from '../components/Filter'
import Keyboard from '../components/Keyboard'
import Oscillator from '../components/Oscillator'
import { CenteredRow, Row } from '../components/styles/index'
import { keyExists, keyIsPressed, removeKey } from '../helpers/KeyHandler'
import ComputerKeyboard from '../hocs/ComputerKeyboard'

const StyledSynth = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 616px;
  background: white;
  padding: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

const findByKeyPress = oscillators => R.compose(
  R.filter(R.__, oscillators),
  R.propEq('keyPress'),
)

class Synth extends React.Component<{}, any> {
  constructor(props) {
    super(props)

    this.state = {
      synth: undefined,
      muted: true,
      frequency: 880.00,
      volume: 0.1,
      waveforms: [
        'sine',
        'triangle',
        'sawtooth',
        'square',

      ],
      envelope: {
        a: 10,
        d: 164,
        s: 0.5,
        r: 50,
      },
      pressedKeys: [],
      keys,
      oscillatorConfigs: [
        {
          offset: 0,
          playing: false,
          semi: 0,
          waveform: 'sine',
          peakVolume: 0.5,
        },
        {
          offset: 0,
          playing: false,
          semi: 0,
          waveform: 'sine',
          peakVolume: 0.5,
        },
      ],
      filter: {
        type: 'lowpass',
        frequency: 1000,
      },
    }
  }

  componentWillMount() {
    const ctx = hoo.setup()
    const synth = hoo.createSynth(ctx)()

    window.addEventListener('mouseup', this.stopPlaying)

    const oscillatorConfigs =
      this.state.oscillatorConfigs.map((o, id) => ({ ...o,id }))

    this.setState({ synth, oscillatorConfigs })
  }

  componentWillUnMount() {
    window.removeEventListener('mouseup', this.stopPlaying)
  }

  setOffset = (oscillator) => (offset) => {
    const { oscillatorConfigs } = this.state
    const index = R.findIndex(R.propEq('id', oscillator.id))(oscillatorConfigs)
    const current = oscillatorConfigs[index]

    if (oscillator.playing)
      hoo.setOffset(this.state.synth.oscillators[index], offset)

    this.updateOscillatorConfig(index, current, 'offset', offset)
  }

  setOscillatorVolume = (oscillator) => (volume) => {
    const { oscillatorConfigs } = this.state
    const index = R.findIndex(R.propEq('id', oscillator.id))(oscillatorConfigs)
    const current = oscillatorConfigs[index]

    if (oscillator.playing)
      hoo.setOscillatorVolume(this.state.synth.oscillators[index], volume)

    this.updateOscillatorConfig(index, current, 'peakVolume', volume)
  }

  setWaveform = oscillator => waveform => {
    const { oscillatorConfigs } = this.state
    const index = this.getOscillatorConfigById(oscillator.id)
    const current = oscillatorConfigs[index]

    if (oscillator.playing)
      hoo.setWaveform(this.state.synth.oscillators[index], waveform)

    this.updateOscillatorConfig(index, current, 'waveform', waveform)
  }

  setFilterFrequency = frequency => {
    hoo.setFilterFrequency(this.state.synth.oscillators, frequency)
    this.setState({ filter: { ...this.state.filter, frequency } })
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
        volume: o.peakVolume,
        offset: o.offset,
        waveform: o.waveform,
        keyPress: key.keyPress,
        semi: o.semi,
        filter: this.state.filter,
      })
    })

    this.setOscillatorsToPlaying()

    hoo.play(this.state.synth, this.state.envelope)
  }

  onKeyClick = key => {
    this.handleKeyDown({ key: key.keyPress })
  }

  handleKeyDown = ({ key }) => {
    if (keyExists(key) && !keyIsPressed(this.state.pressedKeys, key)) {

      const keyData = R.find(R.propEq('keyPress', key), (this.state.keys))

      this.playWithoutPortamento(keyData)

      this.setState({
        pressedKeys: [...this.state.pressedKeys, key],
      })
    }
  }

  stopPlaying = () => {
    this.state.pressedKeys.forEach(key => {
      this.handleKeyUp({ key })
    })
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
      <StyledSynth>
        <ComputerKeyboard
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
        />
        <Row style={{ width: 600 }}>
          {this.state.oscillatorConfigs.map(o =>
            <Oscillator
              key={o.id}
              oscillator={o}
              waveforms={this.state.waveforms}
              setOscillatorVolume={this.setOscillatorVolume}
              setOffset={this.setOffset}
              setSemi={this.setSemi}
              setWaveform={this.setWaveform(o)}
            />,
          )}
        </Row>
        <CenteredRow>
          <Envelope
            envelope={this.state.envelope}
            changeAttack={this.changeEnvelope('a')}
            changeDecay={this.changeEnvelope('d')}
            changeSustain={this.changeEnvelope('s')}
            changeRelease={this.changeEnvelope('r')}
          />
          <Filter
            frequency={this.state.filter.frequency}
            type={this.state.filter.type}
            onFrequencyChange={this.setFilterFrequency}
          />
        </CenteredRow>
        <Keyboard
          keys={this.state.keys}
          currentKeys={this.state.pressedKeys}
          onKeyClick={this.onKeyClick}
        />
      </StyledSynth>
    )
  }
}

export default Synth
