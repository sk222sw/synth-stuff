const start = (audioContext, oscillator, currentTime, envelope) => {
  if (!oscillator.playing) {
    oscillator.oscillator.connect(oscillator.gain)
    oscillator.gain.connect(audioContext.destination)

    const curr = audioContext.currentTime
    const { oscillator: oscillatorNode } = oscillator

    const { a, d, s } = envelope

    const attackEnd = curr + toMs(a)
    const decayEnd = attackEnd + toMs(d)

    oscillatorNode.start()
    oscillator.playing = true

    if (a && !d && !s) {
      oscillator.gain.gain.value = 0
      rampGainAndBeQuite(oscillator.gain, oscillator.volume, attackEnd)
    }
    if (!a && d && s) {
      oscillator.gain.gain.setTargetAtTime(oscillator.volume, attackEnd, 0)
      rampGain(oscillator.gain, oscillator.volume * s, decayEnd)
    }
    if (!a && d && !s) {
      oscillator.gain.gain.setTargetAtTime(oscillator.volume, attackEnd, 0)
      rampGainAndBeQuite(oscillator.gain, 0, decayEnd)
    }
    if (!a && d && s) {
      oscillator.gain.gain.setTargetAtTime(oscillator.volume, attackEnd, 0)
      rampGain(oscillator.gain, oscillator.volume * s, decayEnd)
    }
    if (a && d && !s) {
      oscillator.gain.gain.value = 0
      rampGainAndBeQuite(oscillator.gain, oscillator.volume, attackEnd)
      oscillator.gain.gain.setTargetAtTime(oscillator.volume, attackEnd, 0)
      rampGainAndBeQuite(oscillator.gain, 0, decayEnd)
    }
    if (a && d && s) {
      oscillator.gain.gain.value = 0
      rampGainAndBeQuite(oscillator.gain, oscillator.volume, attackEnd)
      oscillator.gain.gain.setTargetAtTime(oscillator.volume, attackEnd, 0)
      rampGain(oscillator.gain, oscillator.volume * s, decayEnd)
    }
    if (!a && !d && s) {
      oscillator.gain.gain.setTargetAtTime(oscillator.volume * s, curr, 0)
    }
    if (a && !d && s) {
      oscillator.gain.gain.value = 0
      rampGainAndBeQuite(oscillator.gain, oscillator.volume, attackEnd)
      oscillator.gain.gain.setTargetAtTime(oscillator.volume * s, attackEnd, 0)
    }

  }
}

const toMs = x => x / 1000

const stop = (o, release) => {
  o.playing = false
  o.oscillator.stop(release)
  rampGain(o.gain, 0.0, release)
}

const create = audioContext =>
  ({ frequency, volume, id, offset, waveform, keyPress }) => {
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()

    const value = Number(frequency) + Number(offset)
    oscillator.frequency.value = value
    oscillator.type = waveform

    gain.gain.value = 0

    return {
      oscillator,
      gain,
      id,
      frequency,
      offset: 0,
      semi: 0,
      keyPress,
      playing: false,
      volume,
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

// const rampGainPromise = (gainNode, gain, time) => {
//   return new Promise(resolve => {

//   })
// }

const rampGain = (gainNode, gain, time) => {
  gainNode.gain.linearRampToValueAtTime(gain, time)
}

const rampGainAndBeQuite = (gainNode, gain, time, quiteAt = 0) => {
  gainNode.gain.linearRampToValueAtTime(gain, time)
  console.log('///////////////////////')
  console.log(quiteAt)
  console.log('///////////////////////')
  gainNode.gain.setTargetAtTime(0, time, quiteAt)
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
