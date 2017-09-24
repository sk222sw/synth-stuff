import 'web-audio-test-api'
import * as Osc from './Oscillator'

const Oscillator = Osc.default

const context = new AudioContext()

describe('Oscillator()', () => {
  describe('create()', () => {
    const setup = (settings = {}) => Oscillator.create(context)(settings)

    it('should create an oscillatornode and a gainnode', () => {
      const osc = setup()

      expect(osc).toHaveProperty('oscillator')
      expect(osc.oscillator.constructor.name).toBe('OscillatorNode')
      expect(osc).toHaveProperty('gain')
      expect(osc.gain.constructor.name).toBe('GainNode')
    })

    it('should set frequency value', () => {
      const osc = setup({ frequency: 200 })
      const oscWithDefaultFrequency = setup()
      expect(osc.oscillator.frequency.value).toBe(200)
      expect(oscWithDefaultFrequency.oscillator.frequency.value).toBe(0)
    })

    it('should set volume', () => {
      const osc = setup({ volume: 200 })
      const oscWithDefault = setup()
      expect(osc.gain.gain.value).toBe(200)
      expect(oscWithDefault.gain.gain.value).toBe(0)
    })

    it('should set a waveform', () => {
      const osc = setup({ waveform: 'triangle' })
      const oscWithDefault = setup()
      expect(osc.oscillator.type).toBe('triangle')
      expect(oscWithDefault.oscillator.type).toBe('sine')
    })

    it('should set offset using detune', () => {
      const osc = setup({ offset: 29 })
      expect(osc.oscillator.detune.value).toBe(29)
      expect(osc.oscillator.frequency.value).toBe(0)
    })

    it('should set semi using detune', () => {
      const osc = Oscillator.create(context)({ semi: 1 })
      expect(osc.oscillator.detune.value).toBe(100)
      expect(osc.oscillator.frequency.value).toBe(0)
    })

    it('should set correct semi and offset', () => {
      const osc = Oscillator.create(context)({ semi: 1, offset: 2 })
      const osc2 = Oscillator.create(context)({ semi: -1, offset: 2 })
      const osc3 = Oscillator.create(context)({ semi: 1, offset: -2 })
      const osc4 = Oscillator.create(context)({ semi: -1, offset: -2 })

      expect(osc.oscillator.detune.value).toBe(102)
      expect(osc2.oscillator.detune.value).toBe(-98)
      expect(osc3.oscillator.detune.value).toBe(98)
      expect(osc4.oscillator.detune.value).toBe(-102)
    })

  })
})
