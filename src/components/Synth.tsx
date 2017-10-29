import * as React from 'react'
import keys from '../assets/keys.json'
import hoo, { ISynth } from '../models/Synth'

import * as R from 'ramda'
import styled from 'styled-components'
import Envelope, { IEnvelope } from '../components/Envelope'
import Filter from '../components/Filter'
import Keyboard from '../components/Keyboard'
import Oscillator from '../components/Oscillator'
import { CenteredRow, Row } from '../components/styles/index'
import { keyExists, keyIsPressed, removeKey } from '../helpers/KeyHandler'
import ComputerKeyboard from '../hocs/ComputerKeyboard'
import { IFilterConfig } from '../models/Filter'
import { IOscillatorConfig } from '../models/Oscillator'
import { KeyType } from './Key'

const StyledSynth = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 616px;
  background: white;
  padding: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

interface State {
  synth: ISynth,
  muted: boolean,
  frequency: number,
  volume: number,
  waveforms: string[],
  envelope: IEnvelope,
  pressedKeys: string[],
  keys: any,
  oscillatorConfigs: IOscillatorConfig[],
  filter: IFilterConfig,
}

class Synth extends React.Component<{}, State> {
  constructor() {
    super()

    const ctx = hoo.setup()

    const oscillatorConfig: IOscillatorConfig = {
      id: 0,
      frequency: 880,
      offset: 0,
      semi: 0,
      playing: false,
      volume: 0.5,
      waveform: 'sine',
      peakVolume: 0.5,
    }

    this.state = {
      synth: hoo.createSynth(ctx)({} as any),
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
        oscillatorConfig,
      ],
      filter: {
        type: 'lowpass',
        frequency: 1000,
      },
    }
  }

  componentWillMount() {
    window.addEventListener('mouseup', this.stopPlaying)

    const oscillatorConfigs =
      this.state.oscillatorConfigs.map((o, id) => ({ ...o,id }))

    this.setState({ oscillatorConfigs })
  }

  componentWillUnMount() {
    window.removeEventListener('mouseup', this.stopPlaying)
  }

  setOffset = (oscillator: IOscillatorConfig, offset: number) => {
    const { oscillatorConfigs } = this.state
    const index = R.findIndex(R.propEq('id', oscillator.id))(oscillatorConfigs)
    const current = oscillatorConfigs[index]

    if (oscillator.playing)
      hoo.setOffset(this.state.synth.oscillators[index], offset)

    this.updateOscillatorConfig(index, current, 'offset', offset)
  }

  setOscillatorVolume = (oscillator: IOscillatorConfig, volume: number) => {
    const { oscillatorConfigs } = this.state
    const index = R.findIndex(R.propEq('id', oscillator.id))(oscillatorConfigs)
    const current = oscillatorConfigs[index]

    if (oscillator.playing)
      hoo.setOscillatorVolume(this.state.synth.oscillators[index], volume)

    this.updateOscillatorConfig(index, current, 'peakVolume', volume)
  }

  setWaveform = (oscillator: IOscillatorConfig, waveform: string) => {
    const { oscillatorConfigs } = this.state
    const index = this.getOscillatorConfigById(oscillator.id)
    const current = oscillatorConfigs[index]

    if (oscillator.playing)
      hoo.setWaveform(this.state.synth.oscillators[index], waveform)

    this.updateOscillatorConfig(index, current, 'waveform', waveform)
  }

  setFilterFrequency = (frequency: number) => {
    hoo.setFilterFrequency(this.state.synth.oscillators, frequency)
    this.setState({ filter: { ...this.state.filter, frequency } })
  }

  setSemi = (oscillator: IOscillatorConfig, value: number) => {
    const semi = Number(value)
    const { oscillatorConfigs } = this.state
    const index = this.getOscillatorConfigById(oscillator.id)
    const current = oscillatorConfigs[index]

    if (oscillator.playing)
      hoo.setSemi(this.state.synth.oscillators[index], semi)

    this.updateOscillatorConfig(index, current, 'semi', semi)
  }

  setFrequency = (frequency: number) => {
    hoo.setFrequency(this.state.synth, frequency)
    this.setState({ frequency })
  }

  updateOscillatorConfig = (index: number, oscillator: IOscillatorConfig, field: string, value: number | string) => {
    const updated = R.update(
      index,
      { ...oscillator, [field]: value },
      this.state.oscillatorConfigs,
    )

    this.setState({ oscillatorConfigs: updated })
    return updated
  }

  getOscillatorConfigById = (id: number) => {
    return R.findIndex(R.propEq('id', id))(this.state.oscillatorConfigs)
  }

  setOscillatorsToPlaying = () => {
    const oscillatorConfigs = this.state.oscillatorConfigs.map(o => ({
      ...o, playing: true,
    }))

    this.setState({ oscillatorConfigs })
  }

  playWithoutPortamento = (key: KeyType) => {
    this.state.oscillatorConfigs.forEach(o => {
      hoo.addOscillator(this.state.synth, {
        id: o.id,
        frequency: key.frequency,
        volume: o.peakVolume,
        offset: o.offset,
        waveform: o.waveform,
        keyPress: key.keyPress,
        semi: o.semi,
        playing: false,
        peakVolume: o.peakVolume,
        filter: o.filter,
      })
    })

    this.setOscillatorsToPlaying()

    hoo.play(this.state.synth, this.state.envelope)
  }

  playNote = (key: KeyType) => {
    if (keyExists(key.keyPress) && !keyIsPressed(this.state.pressedKeys, key.keyPress)) {
      this.playWithoutPortamento(key)
      this.setState({
        pressedKeys: [...this.state.pressedKeys, key.keyPress],
      })
    }
  }

  handleKeyDown = (key: KeyboardEvent) => {
    const keyName = key.key
    const keyData = R.find(R.propEq('keyPress', keyName), this.state.keys)

    keyData.frequency = Number(keyData.frequency)

    this.playNote(keyData)
  }

  stopPlaying = () => {
    this.state.pressedKeys.forEach(key => {
      this.stopNote(key)
    })
  }

  stopNote = (keyPress: string) => {
    if (keyExists(keyPress)) {
      const oscillators = this.state.synth.oscillators.filter(o => o.keyPress === keyPress)

      hoo.stopOscillators(this.state.synth, oscillators, this.state.envelope.r)

      this.setState({
        pressedKeys: removeKey(this.state.pressedKeys, keyPress),
        synth: {
          ...this.state.synth,
          oscillators: this.state.synth.oscillators
            .filter(o => o.keyPress !== keyPress),
        },
      })
    }
  }

  handleKeyUp = (key: KeyboardEvent) => {
    this.stopNote(key.key)
  }

  changeEnvelope = (type: string) => (value: number) => {
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
              setOscillatorVolume={(oscillator, volume) => this.setOscillatorVolume(oscillator, volume)}
              setOffset={(oscillator, offset) => this.setOffset(oscillator, offset)}
              setSemi={(oscillator, semi) => this.setSemi(oscillator, semi)}
              setWaveform={(oscillator, waveform) => this.setWaveform(oscillator, waveform)}
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
          onKeyClick={this.playNote}
        />
      </StyledSynth>
    )
  }
}

export default Synth
