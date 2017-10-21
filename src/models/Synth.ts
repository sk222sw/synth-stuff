import Filter from './Filter'
import Oscillator from './Oscillator'

let ctx

// perhaps remove this and make the user provide a context when creating a new synth?
const setup = (context = new AudioContext()) => {
  return ctx = context
}

// for testing purposes
export const _deleteContext = () =>
  ctx = null

const createSynth = (context = ctx) => ({ oscillators = [] } = {}) => ({
  oscillators,
  context,
})

const addOscillator = (synth, config = {}) => {
  synth.oscillators.push(Oscillator.create(ctx)(config))
  return synth
}

const play = (synth, envelope, filter?) => {
  synth.oscillators.forEach(o => {
    const filterNode = filter
      ? Filter.createFilter(ctx, filter)
      : undefined

    Oscillator.start(ctx, o, ctx.currentTime, envelope, filterNode)
  })
}

const stop = (synth, time) => {
  synth.oscillators.forEach(o => Oscillator.stop(o, time))
  synth.oscillators = []
}

const setFrequency = (synth, frequency) => {
  synth.oscillators.forEach(o => Oscillator.setFrequency(o, frequency))
}

const setOffset = (oscillator, offset) => {
  if (oscillator)
    Oscillator.setOffset(oscillator, offset)
}

const setOscillatorVolume = (oscillator, volume) => {
  if (oscillator)
    Oscillator.setVolume(oscillator, volume)
}

const setSemi = (oscillator, semi) => {
  if (oscillator)
    Oscillator.setSemi(oscillator, semi)
}

const setWaveform = (oscillator, waveform) => {
  if (oscillator)
    Oscillator.setWaveform(oscillator, waveform)
}

const stopOscillators = (synth, oscillators, release) => {
  oscillators.forEach(oscillator => {
    Oscillator.stop(oscillator, ctx.currentTime + release / 1000)
  })
}

const setFilterFrequency = (synth, frequency) => {
  Filter.setFrequency(synth.filter, frequency)
}

export default {
  setup,
  createSynth,
  addOscillator,
  play,
  stop,
  setFrequency,
  setOffset,
  setSemi,
  setWaveform,
  stopOscillators,
  setOscillatorVolume,
  setFilterFrequency,
}
