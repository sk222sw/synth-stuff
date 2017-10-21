import Filter from './Filter'
import Oscillator from './Oscillator'

let ctx

// perhaps remove this and make the user provide a context when creating a new synth?
const setup = (context = new AudioContext()) => {
  return ctx = context
}

// for testing purposes
export const _deleteContext = () => ctx = null

const createSynth = (context = ctx) => ({ oscillators = [], filter = Filter.createFilter(context) } = {}) => ({
  oscillators,
  context,
  filter,
})

const addOscillator = (synth, config = {}) => {
  synth.oscillators.push(Oscillator.create(ctx)(config))
  return synth
}

const play = (synth, envelope) => {
  synth.oscillators.forEach(o => {
    Oscillator.start(ctx, o, ctx.currentTime, envelope, synth.filter)
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
  console.log(synth.filter, frequency)
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
