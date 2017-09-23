const start = (audioContext, oscillator, currentTime, envelope) => {
  if (!oscillator.playing) {
    oscillator.oscillator.connect(oscillator.gain)
    oscillator.gain.connect(audioContext.destination)

    const curr = audioContext.currentTime
    const { oscillator: oscillatorNode } = oscillator

    const { a: attack, d: decay, s: sustain } = envelope

    const attackEnd = curr + secondsToMilliseconds(attack)
    const decayEnd = attackEnd + secondsToMilliseconds(decay)

    oscillatorNode.start()
    oscillator.playing = true

    if (attack && !decay && !sustain) {
      scheduleAttack(oscillator, attackEnd)
    }
    if (!attack && decay && sustain) {
      scheduleDecayAndSustain(oscillator, sustain, attackEnd, decayEnd)
    }
    if (!attack && decay && !sustain) {
      scheduleDecay(oscillator, attackEnd, decayEnd)
    }
    if (attack && decay && !sustain) {
      scheduleAttack(oscillator, attackEnd)
      scheduleDecay(oscillator, attackEnd, decayEnd)
    }
    if (attack && decay && sustain) {
      scheduleAttack(oscillator, attackEnd)
      scheduleDecayAndSustain(oscillator, sustain, attackEnd, decayEnd)
    }
    if (!attack && !decay && sustain) {
      scheduleSustain(oscillator, sustain, curr)
    }
    if (attack && !decay && sustain) {
      scheduleAttack(oscillator, attackEnd)
      scheduleSustain(oscillator, sustain, attackEnd)
    }

  }
}

const scheduleAttack = (oscillator, attackEnd) => {
  oscillator.gain.gain.value = 0
  rampGainAndBeQuite(oscillator.gain, oscillator.volume, attackEnd)
}

const scheduleDecayAndSustain = (oscillator, sustain, attackEnd, decayEnd) => {
  oscillator.gain.gain.setTargetAtTime(oscillator.volume, attackEnd, 0)
  rampGain(oscillator.gain, oscillator.volume * sustain, decayEnd)
}

const scheduleSustain = (oscillator, sustain, curr) => {
  oscillator.gain.gain.setTargetAtTime(oscillator.volume * sustain, curr, 0)
}

const scheduleDecay = (oscillator, attackEnd, decayEnd) => {
  oscillator.gain.gain.setTargetAtTime(oscillator.volume, attackEnd, 0)
  rampGainAndBeQuite(oscillator.gain, 0, decayEnd)
}

const secondsToMilliseconds = x => x / 1000

const stop = (oscillator, release) => {
  oscillator.gain.gain.cancelScheduledValues(0)
  oscillator.playing = false
  oscillator.oscillator.stop(release)
  rampGain(oscillator.gain, 0.0, release)
}

const create = audioContext =>
  ({ frequency = 0, volume = 0, id = 0, offset = 0, waveform = 'sine', keyPress = 'a' } = {}) => {
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

const rampGain = (gainNode, gain, time) => {
  gainNode.gain.linearRampToValueAtTime(gain, time)
}

const rampGainAndBeQuite = (gainNode, gain, time, quiteAt = 0) => {
  gainNode.gain.linearRampToValueAtTime(gain, time)
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
