import 'web-audio-test-api'
import { default as Synth } from './Synth'

const context = new AudioContext()
let synthModule: any
let synth

describe('Synth', () => {
  beforeEach(() => {
    synthModule = Synth
  })

  describe('setup()', () => {
    it('should create an audio context', () => {
      const audioContext = synthModule.setup()
      expect(audioContext instanceof AudioContext).toBeTruthy()
    })

    it('should take an audiocontext', () => {
      expect(synthModule.setup(context) instanceof AudioContext).toBeTruthy()
    })
  })

  describe('createSynth()', () => {
    it('should create a Synth object', () => {
      synthModule.setup()
      synth = synthModule.createSynth(context)

      expect(synth.oscillators.length).toBe(0)
      expect(synth.context instanceof AudioContext).toBeTruthy()
    })
  })

  describe('addOscillator()', () => {
    it('should add an oscillator the provided synth', () => {
      synthModule.setup()
      synth = synthModule.createSynth(context)

      synthModule.addOscillator(synth)
      expect(synth.oscillators.length).toBe(1)
      synthModule.addOscillator(synth, { frequency: 2900 })
      expect(synth.oscillators.length).toBe(2)
    })
  })

  describe('stop', () => {
    it('should empty the oscillators array', () => {
      synthModule.setup()
      synth = synthModule.createSynth(context)

      synthModule.addOscillator(synth)
      synthModule.addOscillator(synth, { frequency: 2900 })

      synthModule.play(synth, { a: 0, d: 0, s: 0, r: 0 })

      synthModule.stop(synth, 0)
      expect(synth.oscillators.length).toBe(0)
    })
  })

})
