import * as R from 'ramda'
import * as React from 'react'

declare interface Props {
  playing: boolean
  audioContext: AudioContext
  notes: string[]
  pan: number
  delayTime?: number
  numberOfDelays?: number
  onStopPlaying(): void
}

declare interface State {
  gainNode: GainNode
  oscillator: OscillatorNode
  panNode: StereoPannerNode
}

class Oscillator extends React.Component<Props, State> {
  componentDidMount() {
    this.play()
  }

  componentWillReceiveProps(nextState) {
    if (nextState.playing) {
      this.play()
    }
  }

  play = () => {
    if (this.props.playing) {
      this.props.notes.forEach(frequency => {
        this.playWithDelay(this.props.numberOfDelays || 1, this.props.delayTime || 0, frequency)
      })
    }
  }

  setupConnections(nodes: AudioNode[]) {
    const connectedNodes = nodes.reduce((prev, curr) => {
      if (prev.length)
        R.last(prev).connect(curr)
      return [...prev, curr]
    }, [] as AudioNode[])

    return connectedNodes
  }

  playWithDelay = (numberOfPlays, delayTime, frequency) => {
    for (let index = 0; index < numberOfPlays; index++) {
      this.startPlaying(1, index * delayTime, frequency)
    }
  }

  startPlaying = (volume = 1, delay = 0, frequency = 440) => {
    const context = this.props.audioContext
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()
    const panNode = context.createStereoPanner()
    const filterNode = context.createBiquadFilter()

    const release = 0.4

    panNode.pan.value  = this.props.pan
    gainNode.gain.value = volume
    oscillator.detune.value = +frequency

    filterNode.type = 'lowpass'
    filterNode.frequency.value = 500

    const connectedNodes = this.setupConnections(
      [
        oscillator,
        gainNode,
        panNode,
        filterNode,
      ],
    )

    R.last(connectedNodes).connect(context.destination)

    const startTime = this.props.audioContext.currentTime + delay

    oscillator.start(startTime)

    this.stopPlaying(oscillator, gainNode, release + delay)

  }

  stopPlaying = (oscillator, gainNode, time = 0) => {
    const stopTime = this.props.audioContext.currentTime + time
    gainNode.gain.linearRampToValueAtTime(0, stopTime)
    oscillator.stop(stopTime)
    this.props.onStopPlaying()
  }

  render() {
    return <div />
  }
}

export default Oscillator
