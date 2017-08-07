
class Osc {
  context: AudioContext
  oscillator: OscillatorNode

  constructor(audioContext) {
    this.context = audioContext
    this.oscillator = this.context.createOscillator()
  }

  start(time = 0) {
    return new Promise((resolve) => {
      const gainNode = this.context.createGain()
      this.oscillator.connect(gainNode)
      gainNode.connect(this.context.destination)
      this.oscillator.start(time)
      resolve(this)
    })
  }

  stop(time = 0) {
    this.oscillator.stop(time)
  }
}

export default Osc
