import { IEnvelope } from '../components/Envelope'
import Filter from './Filter'
import Oscillator, { IOscillator, IOscillatorConfig } from './Oscillator'

let ctx: AudioContext

// perhaps remove this and make the user provide a context when creating a new synth?
const setup = (context = new AudioContext()) => {
  return ctx = context
}

export interface ISynth {
  oscillators: IOscillator[]
  context: AudioContext
}

const createSynth = (context = ctx) => ({
  oscillators: [],
  context,
})

const addOscillator = (synth: ISynth, config: IOscillatorConfig) => {
  synth.oscillators.push(Oscillator.create(ctx)(config))
  return synth
}

const play = (synth: ISynth, envelope: IEnvelope) => {
  synth.oscillators.forEach(o => {
    Oscillator.start(ctx, o, ctx.currentTime, envelope)
  })
}

const stop = (synth: ISynth, time: number) => {
  synth.oscillators.forEach(o => Oscillator.stop(o, time))
  synth.oscillators = []
}

const setFrequency = (synth: ISynth, frequency: number) => {
  synth.oscillators.forEach(o => Oscillator.setFrequency(o, frequency))
}

const setOffset = (oscillator: IOscillator, offset: number) => {
  if (oscillator)
    Oscillator.setOffset(oscillator, offset)
}

const setOscillatorVolume = (oscillator: IOscillator, volume: number) => {
  if (oscillator)
    Oscillator.setVolume(oscillator, volume)
}

const setSemi = (oscillator: IOscillator, semi: number) => {
  if (oscillator)
    Oscillator.setSemi(oscillator, semi)
}

const setWaveform = (oscillator: IOscillator, waveform: string) => {
  if (oscillator)
    Oscillator.setWaveform(oscillator, waveform)
}

const stopOscillators = (synth: ISynth, oscillators: IOscillator[], release: number) => {
  oscillators.forEach(oscillator => {
    Oscillator.stop(oscillator, ctx.currentTime + release / 1000)
  })
}

const setFilterFrequency = (oscillators: IOscillator[], frequency: number) => {
  oscillators.forEach(o => {
    if (o.filter)
      Filter.setFrequency(o.filter, frequency)
  })
}

const Synth = 
{
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
export default Synth