import Oscillator from './Oscillator2'

let ctx

const setup = (context = new AudioContext()) => ctx = context

const createSynth = (audioContext = ctx) => ({
  oscillators = [],
}) => ({
  oscillators,
  context: ctx,
})

const addOscillator = (synth, config) => {
  synth.oscillators.push(Oscillator.create(ctx)(config))
}

const play = (synth) => {
  synth.oscillators.forEach(o => {
    Oscillator.start(ctx, o)
  })
}

const stop = synth => {
  synth.oscillators.forEach(o => Oscillator.stop(o))
  synth.oscillators = []
}

const setFrequency = (synth, frequency) => {
  synth.oscillators.forEach(o => Oscillator.setFrequency(o, frequency))
}

const setOffset = (oscillator, offset) => {
  Oscillator.setOffset(oscillator, offset)
}

const setSemi = (oscillator, semi) => {
  Oscillator.setSemi(oscillator, semi)
}

const setVolume = (synth, volume) => {
  synth.oscillators.forEach(o => Oscillator.setVolume(o, volume))
}

const setWaveform = (oscillator, waveform) => {
  Oscillator.setWaveform(oscillator, waveform)
}

const stopOscillators = (synth, oscillators) => {
  oscillators.forEach(oscillator => {
    Oscillator.stop(oscillator)
  })
}

export default {
  setup,
  createSynth,
  addOscillator,
  play,
  stop,
  setFrequency,
  setVolume,
  setOffset,
  setSemi,
  setWaveform,
  stopOscillators,
}
