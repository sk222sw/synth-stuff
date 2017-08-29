const start = (audioContext, oscillator) => {
  if (!oscillator.playing) {
    oscillator.oscillator.connect(oscillator.gain)
    oscillator.gain.connect(audioContext.destination)
    oscillator.oscillator.start()
    oscillator.playing = true
  }
}

const stop = (o, release) => {
  o.playing = false
  o.oscillator.stop(release)
  rampGain(o.gain, 0, release)
}

const create = audioContext =>
  ({ frequency, volume, id, offset, waveform, keyPress }) => {
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()

    const value = Number(frequency) + Number(offset)
    oscillator.frequency.value = value
    oscillator.type = waveform

    gain.gain.value = volume

    return {
      oscillator,
      gain,
      id,
      frequency,
      offset: 0,
      semi: 0,
      keyPress,
      playing: false,
    }
  }

const setVolume = (oscillator, volume) => {
  oscillator.gain.gain.value = volume
}

const setFrequency = (oscillator, frequency) => {
  oscillator.frequency = frequency
  oscillator.oscillator.frequency.value = Number(oscillator.frequency)
  oscillator.oscillator.detune.value = Number(oscillator.semi * 100)
  oscillator.oscillator.detune.value += Number(oscillator.offset)
}

const setOffset = (oscillator, offset) => {
  oscillator.offset = offset
  setFrequency(oscillator, oscillator.frequency)
}

const setSemi = (oscillator, semi) => {
  oscillator.semi = semi
  setFrequency(oscillator, oscillator.frequency)
}

const setWaveform = (oscillator, waveform) => {
  oscillator.waveform = waveform
  oscillator.oscillator.type = waveform
}

const rampGain = (gainNode, gain, time) => {
  gainNode.gain.linearRampToValueAtTime(gain, time)
}

export default {
  start,
  stop,
  create,
  setFrequency,
  setVolume,
  setOffset,
  setSemi,
  setWaveform,
}
