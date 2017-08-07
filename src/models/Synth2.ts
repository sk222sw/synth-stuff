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

const setOffset = (synth, id, offset) => {
  const oscillator = synth.oscillators.filter(o => o.id !== id)
  Oscillator.setOffset(oscillator[0], offset)
}

const setVolume = (synth, volume) => {
  synth.oscillators.forEach(o => Oscillator.setVolume(o, volume))
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
}
