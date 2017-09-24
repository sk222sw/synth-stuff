import 'web-audio-test-api'
import * as Osc from './Oscillator'

const Oscillator = Osc.default

const context = new AudioContext()

describe('Oscillator()', () => {
  const setup = (settings = {}) => Oscillator.create(context)(settings)

  describe('create()', () => {
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

  describe('_secondsToMilliseconds()', () => {
    it('should return the provided argument divided by 1000', () => {
      const ms = Osc._millisecondToThousandOfASecond(644)
      expect(ms).toBe(0.644)
      expect(Osc._millisecondToThousandOfASecond(0)).toBe(0)
    })
  })

  describe('_rampGainAndBeQuite()', () => {
    it('should change gain value', () => {
      const osc = setup()

      expect(osc.gain.gain.value).toBe(0)
      Osc._rampGainAndBeQuite(osc.gain, 1.5, context.currentTime)
      expect(osc.gain.gain.value).toBe(1.5)
    })
  })

  describe('_rampGain()', () => {
    it('should change gain value', () => {
      const osc = setup()

      expect(osc.gain.gain.value).toBe(0)
      Osc._rampGain(osc.gain, 1.5, context.currentTime)
      expect(osc.gain.gain.value).toBe(1.5)
    })
  })

  describe('setWaveform()', () => {
    it('should set the waveform', () => {
      const osc = Oscillator.setWaveform(setup(), 'triangle')
      expect(osc.oscillator.type).toBe('triangle')
      expect(osc.waveform).toBe('triangle')
    })
  })

  describe('setFrequency()', () => {
    it('should set the correct frequency and detune', () => {
      const osc = Oscillator.setFrequency(setup({ semi: 1, offset: 2 }), 200)
      expect(osc.frequency).toBe(200)
      expect(osc.oscillator.detune.value).toBe(102)
    })
  })

  describe('setSemi()', () => {
    const osc = Oscillator.setSemi(setup(), 2)
    expect(osc.oscillator.detune.value).toBe(200)
    expect(osc.semi).toBe(2)
  })

  describe('setOffset()', () => {
    const osc = Oscillator.setOffset(setup(), 2)
    expect(osc.oscillator.detune.value).toBe(2)
    expect(osc.offset).toBe(2)
  })

  describe('setVolume()', () => {
    const osc = Oscillator.setVolume(setup(), 2)
    expect(osc.volume).toBe(2)
    expect(osc.gain.gain.value).toBe(2)
  })

  describe('stop()', () => {
    const osc = setup({ volume: 2 })
    Oscillator.start(context, osc, context.currentTime, { a: 0, d: 0, s: 0, r: 0 })

    expect(osc.playing).toBeTruthy()
    expect(osc.gain.gain.value).toBe(2)

    Oscillator.stop(osc, 0)

    expect(osc.gain.gain.value).toBe(0)
    expect(osc.playing).toBeFalsy()
  })

  describe('start()', () => {
    const env = { a: 0, d: 0, s: 0, r: 0 }
    const osc = Oscillator.start(context, setup(), context.currentTime, env)

    expect(osc.playing).toBeTruthy()
    // Todo more tests here
  })
})
