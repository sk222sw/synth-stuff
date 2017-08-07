const start = (audioContext, { oscillator, gain }) => {
  oscillator.connect(gain)
  gain.connect(audioContext.destination)
  oscillator.start()
}

const stop = (o) => o.oscillator.stop()

const create = audioContext =>
  ({ frequency, volume, id, offset }) => {
    const osc = audioContext.createOscillator()
    const gain = audioContext.createGain()

    osc.frequency.value = frequency + offset

    gain.gain.value = volume

    return {
      oscillator: osc,
      gain,
      id,
    }
  }

const setVolume = (oscillator, volume) => {
  oscillator.gain.gain.value = volume
}

const setFrequency = (oscillator, frequency) => {
  oscillator.oscillator.frequency.value = frequency + (oscillator.offset)
}

const setOffset = (oscillator, offset) => {
  console.log(oscillator)
  oscillator.offset = offset
  setFrequency(oscillator, oscillator.oscillator.frequency.value)
}

export default {
  start,
  stop,
  create,
  setFrequency,
  setVolume,
  setOffset,
}
