import { IEnvelope } from '../components/Envelope'
import Filter, { IFilter } from './Filter'

export interface IOscillatorConfig {
  id: number
  frequency: number
  offset: number
  semi: number
  keyPress?: string
  playing: boolean
  volume: number
  waveform: string
  filter?: IFilter
  peakVolume: number
}

export interface IOscillator extends IOscillatorConfig {
  oscillator: OscillatorNode
  gain: GainNode
}

const start = (audioContext: AudioContext, oscillator: IOscillator, currentTime: number, envelope: IEnvelope) => {
  if (oscillator.playing)
    return oscillator

  if (oscillator.filter) {
    oscillator.oscillator.connect(oscillator.filter.filterNode)
    oscillator.filter.filterNode.connect(oscillator.gain)
  } else {
    oscillator.oscillator.connect(oscillator.gain)
  }
  oscillator.gain.connect(audioContext.destination)

  const curr = audioContext.currentTime
  const { oscillator: oscillatorNode } = oscillator

  const { a: attack, d: decay, s: sustain } = envelope

  const attackEnd = curr + _millisecondToThousandOfASecond(attack)
  const decayEnd = attackEnd + _millisecondToThousandOfASecond(decay)

  oscillatorNode.start()
  oscillator.playing = true

  if (attack && !decay && !sustain) {
    _scheduleAttack(oscillator, attackEnd)
  }
  if (!attack && decay && sustain) {
    _scheduleDecayAndSustain(oscillator, sustain, attackEnd, decayEnd)
  }
  if (!attack && decay && !sustain) {
    _scheduleDecay(oscillator, attackEnd, decayEnd)
  }
  if (attack && decay && !sustain) {
    _scheduleAttack(oscillator, attackEnd)
    _scheduleDecay(oscillator, attackEnd, decayEnd)
  }
  if (attack && decay && sustain) {
    _scheduleAttack(oscillator, attackEnd)
    _scheduleDecayAndSustain(oscillator, sustain, attackEnd, decayEnd)
  }
  if (!attack && !decay && sustain) {
    _scheduleSustain(oscillator, sustain, curr)
  }
  if (attack && !decay && sustain) {
    _scheduleAttack(oscillator, attackEnd)
    _scheduleSustain(oscillator, sustain, attackEnd)
  }

  return oscillator
}

const _scheduleAttack = (oscillator: IOscillator, attackEnd: number) => {
  oscillator.gain.gain.value = 0
  _rampGainAndBeQuite(oscillator.gain, oscillator.volume, attackEnd)
}

const _scheduleDecayAndSustain = (oscillator: IOscillator, sustain: number, attackEnd: number, decayEnd: number) => {
  oscillator.gain.gain.setTargetAtTime(oscillator.volume, attackEnd, 0)
  _rampGain(oscillator.gain, oscillator.volume * sustain, decayEnd)
}

const _scheduleSustain = (oscillator: IOscillator, sustain: number, curr: number) => {
  oscillator.gain.gain.setTargetAtTime(oscillator.volume * sustain, curr, 0)
}

const _scheduleDecay = (oscillator: IOscillator, attackEnd: number, decayEnd: number) => {
  oscillator.gain.gain.setTargetAtTime(oscillator.volume, attackEnd, 0)
  _rampGainAndBeQuite(oscillator.gain, 0, decayEnd)
}

export const _millisecondToThousandOfASecond = (x: number) => x / 1000

const stop = (oscillator: {gain: GainNode, playing: boolean, oscillator: OscillatorNode}, release: number) => {
  oscillator.gain.gain.cancelScheduledValues(0)
  oscillator.playing = false
  oscillator.oscillator.onended = () => {
    oscillator.gain.disconnect()
  }
  oscillator.oscillator.stop(release)
  _rampGain(oscillator.gain, 0.0, release)
}

const create = (audioContext: AudioContext) =>
  (config?: IOscillatorConfig) => {
    const frequency = config && config.frequency || 0
    const volume = config && config.volume || 0
    const offset = config && config.offset || 0
    const semi = config && config.semi || 0
    const waveform = config && config.waveform || 'sine'
    const keyPress = config && config.keyPress || 'a'
    const peakVolume = config && config.peakVolume || 0.5
    const id = config && config.id || 0

    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    const filterNode = config && config.filter ? Filter.createFilter(audioContext, config.filter) : undefined

    oscillator.frequency.value = Number(frequency)
    oscillator.detune.value = Number(semi * 100)
    oscillator.detune.value += Number(offset)

    oscillator.type = waveform as OscillatorType

    gain.gain.value = volume

    return {
      oscillator,
      gain,
      id,
      frequency,
      offset,
      semi,
      keyPress,
      playing: false,
      volume,
      waveform,
      peakVolume,
      filter: filterNode,
    }
  }

const setVolume = (oscillator: IOscillator, volume: number) => {
  oscillator.volume = volume
  oscillator.gain.gain.value = volume
  return oscillator
}

const setFrequency = (oscillator: IOscillator, frequency: number) => {
  oscillator.frequency = frequency
  oscillator.oscillator.frequency.value = Number(oscillator.frequency)
  oscillator.oscillator.detune.value = Number(oscillator.semi * 100)
  oscillator.oscillator.detune.value += Number(oscillator.offset)
  return oscillator
}

const setOffset = (oscillator: IOscillator, offset: number) => {
  oscillator.offset = offset
  setFrequency(oscillator, oscillator.frequency)
  return oscillator
}

const setSemi = (oscillator: IOscillator, semi: number) => {
  oscillator.semi = semi
  setFrequency(oscillator, oscillator.frequency)
  return oscillator
}

const setWaveform = (oscillator: IOscillator, waveform: string) => {
  oscillator.waveform = waveform
  oscillator.oscillator.type = waveform as OscillatorType
  return oscillator
}

export const _rampGain = (gainNode: GainNode, gain: number, time: number) => {
  gainNode.gain.linearRampToValueAtTime(gain, time)
}

export const _rampGainAndBeQuite = (gainNode: GainNode, gain: number, time: number, quiteAt = 0) => {
  gainNode.gain.linearRampToValueAtTime(gain, time)
  gainNode.gain.setTargetAtTime(0, time, quiteAt)
}

export default {
  start,
  stop,
  create,
  setFrequency,
  setVolume,
  setOffset,
  setSemi,
  setWaveform,
}
