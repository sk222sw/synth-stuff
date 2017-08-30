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

const play = (synth, envelope) => {
  synth.oscillators.forEach(o => {
    Oscillator.start(ctx, o, ctx.currentTime, envelope)
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

const setVolume = (synth, volume) => {
  synth.oscillators.forEach(o => Oscillator.setVolume(o, volume))
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
  setOscillatorVolume,
}
