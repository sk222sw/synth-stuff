import 'web-audio-test-api'
import * as Osc from './Oscillator'

const Oscillator = Osc.default

const context = new AudioContext()

describe('Oscillator()', () => {
  describe('create()', () => {
    it('should create an oscillatornode and a gainnode', () => {
      const osc = Oscillator.create(context)()

      expect(osc).toHaveProperty('oscillator')
      expect(osc.oscillator.constructor.name).toBe('OscillatorNode')
      expect(osc).toHaveProperty('gain')
      expect(osc.gain.constructor.name).toBe('GainNode')
    })
  })
})
