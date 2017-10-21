const start = (audioContext, oscillator, currentTime, envelope, filter?) => {
  if (oscillator.playing)
    return oscillator

  if (filter) {
    oscillator.oscillator.connect(filter.filterNode)
    filter.filterNode.connect(oscillator.gain)
  } else {
    oscillator.oscillator.connect(oscillator.gain)
  }
  oscillator.gain.connect(audioContext.destination)

  const curr = audioContext.currentTime
  const { oscillator: oscillatorNode } = oscillator

  const { a: attack, d: decay, s: sustain } = envelope

  const attackEnd = curr + _millisecondToThousandOfASecond(attack)
  const decayEnd = attackEnd + _millisecondToThousandOfASecond(decay)

  oscillatorNode.start()
  oscillator.playing = true

  if (attack && !decay && !sustain) {
    _scheduleAttack(oscillator, attackEnd)
  }
  if (!attack && decay && sustain) {
    _scheduleDecayAndSustain(oscillator, sustain, attackEnd, decayEnd)
  }
  if (!attack && decay && !sustain) {
    _scheduleDecay(oscillator, attackEnd, decayEnd)
  }
  if (attack && decay && !sustain) {
    _scheduleAttack(oscillator, attackEnd)
    _scheduleDecay(oscillator, attackEnd, decayEnd)
  }
  if (attack && decay && sustain) {
    _scheduleAttack(oscillator, attackEnd)
    _scheduleDecayAndSustain(oscillator, sustain, attackEnd, decayEnd)
  }
  if (!attack && !decay && sustain) {
    _scheduleSustain(oscillator, sustain, curr)
  }
  if (attack && !decay && sustain) {
    _scheduleAttack(oscillator, attackEnd)
    _scheduleSustain(oscillator, sustain, attackEnd)
  }

  return oscillator
}

const _scheduleAttack = (oscillator, attackEnd) => {
  oscillator.gain.gain.value = 0
  _rampGainAndBeQuite(oscillator.gain, oscillator.volume, attackEnd)
}

const _scheduleDecayAndSustain = (oscillator, sustain, attackEnd, decayEnd) => {
  oscillator.gain.gain.setTargetAtTime(oscillator.volume, attackEnd, 0)
  _rampGain(oscillator.gain, oscillator.volume * sustain, decayEnd)
}

const _scheduleSustain = (oscillator, sustain, curr) => {
  oscillator.gain.gain.setTargetAtTime(oscillator.volume * sustain, curr, 0)
}

const _scheduleDecay = (oscillator, attackEnd, decayEnd) => {
  oscillator.gain.gain.setTargetAtTime(oscillator.volume, attackEnd, 0)
  _rampGainAndBeQuite(oscillator.gain, 0, decayEnd)
}

export const _millisecondToThousandOfASecond = x => x / 1000

const stop = (oscillator: {gain: GainNode, playing: boolean, oscillator: OscillatorNode}, release) => {
  oscillator.gain.gain.cancelScheduledValues(0)
  oscillator.playing = false
  oscillator.oscillator.onended = () => {
    oscillator.gain.disconnect()
  }
  oscillator.oscillator.stop(release)
  _rampGain(oscillator.gain, 0.0, release)
}

const create = audioContext =>
  ({ frequency = 0, volume = 0, id = 0, offset = 0, waveform = 'sine', keyPress = 'a', semi = 0 } = {}) => {
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()

    oscillator.frequency.value = Number(frequency)
    oscillator.detune.value = Number(semi * 100)
    oscillator.detune.value += Number(offset)

    oscillator.type = waveform

    gain.gain.value = volume

    return {
      oscillator,
      gain,
      id,
      frequency,
      offset,
      semi,
      keyPress,
      playing: false,
      volume,
      waveform,
    }
  }

const setVolume = (oscillator, volume) => {
  oscillator.volume = volume
  oscillator.gain.gain.value = volume
  return oscillator
}

const setFrequency = (oscillator, frequency) => {
  oscillator.frequency = frequency
  oscillator.oscillator.frequency.value = Number(oscillator.frequency)
  oscillator.oscillator.detune.value = Number(oscillator.semi * 100)
  oscillator.oscillator.detune.value += Number(oscillator.offset)
  return oscillator
}

const setOffset = (oscillator, offset) => {
  oscillator.offset = offset
  setFrequency(oscillator, oscillator.frequency)
  return oscillator
}

const setSemi = (oscillator, semi) => {
  oscillator.semi = semi
  setFrequency(oscillator, oscillator.frequency)
  return oscillator
}

const setWaveform = (oscillator, waveform) => {
  oscillator.waveform = waveform
  oscillator.oscillator.type = waveform
  return oscillator
}

export const _rampGain = (gainNode, gain, time) => {
  gainNode.gain.linearRampToValueAtTime(gain, time)
}

export const _rampGainAndBeQuite = (gainNode, gain, time, quiteAt = 0) => {
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
