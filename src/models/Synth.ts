import { createOscillator, OscillatorFactory } from './Oscillator'

interface Synth {
  playing: boolean
  audioContext: AudioContext
  oscillators: OscillatorFactory[]
  oscillatorCount: number
  effects: any[]
  frequency: number
  volume: number
  play(): Synth
  stop(): Synth
  setFrequency(frequency: number): void
  setVolume(volume: number): void
  addFilter(): void
  removeFilter(): void
  configure({ frequency, volume }: {frequency?: number, volume?: number}): Synth
}

export enum SynthType {
  Mono,
  Poly,
}

export const createSynth = (audioContext: AudioContext): Synth => ({
  audioContext,
  playing: false,
  oscillators: [],
  oscillatorCount: 1,
  effects: [],
  frequency: 1000,
  volume: 1,
  configure({ frequency = 1000, volume = 1 }) {
    this.frequency = frequency
    this.volume = volume
    return this
  },
  play() {
    for (let index = 0; index < this.oscillatorCount; index++) {
      const osc = createOscillator(audioContext)({
        frequency: this.frequency,
        volume: this.volume,
        effects: this.effects,
      })
      osc.start()
      this.oscillators.push(osc as any)
    }
    return this
  },
  stop() {
    this.oscillators.forEach(o => o.stop())
    return this
  },
  setFrequency(frequency) {
    this.oscillators.forEach(o => o.setFrequency(frequency))
    return this
  },
  setVolume(volume) {
    this.oscillators.forEach(o => o.setVolume(volume))
    return this
  },
  addFilter() {
    // const filter = effect(audioContext)({ effects: this.effects }).filter()
    // this.effects.push(filter)
  },
  removeFilter() {
    if (this.effects.length) {
      this.effects = this.effects.filter(f => f.constructor.name !== 'BiquadFilterNode')
    }
  },
})
