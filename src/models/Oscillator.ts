import * as R from 'ramda'
import { Effect } from './Effect'

export interface OscillatorFactory {
  audioContext: AudioContext
  oscillatorNode: OscillatorNode
  gainNode: GainNode
  effects: BiquadFilterNode[],
  start(time?: number): OscillatorFactory
  stop(time?: number): OscillatorFactory
  addEffect(effect: Effect): OscillatorFactory
  setFrequency(frequency: number): void
  setVolume(volume: number): void
  setupConnections(nodes: AudioNode[]): void
}

export const createOscillator =
  (audioContext: AudioContext) => ({
    frequency = 1000,
    volume = 0.5,
    playing = false,
    oscillatorNode = audioContext.createOscillator(),
    gainNode = audioContext.createGain(),
    effects = [] as Effect[],
  }) => ({
    setFrequency(fr) {
      oscillatorNode.frequency.value = fr
    },
    setVolume(value) {
      gainNode.gain.value = value
    },
    setupConnections(nodes: AudioNode[]) {
      const connectedNodes = nodes.reduce((prev, curr) => {
        if (prev.length) {
          R.last(prev).connect(curr)
        }
        return [...prev, curr]
      }, [] as AudioNode[])

      return connectedNodes
    },
    start(time = 0) {
      gainNode.gain.value = volume
      oscillatorNode.frequency.value = frequency

      const toConnect = [oscillatorNode, gainNode] as any

      effects.forEach(x => toConnect.push(x.effectNode))

      const connectedNodes =
        this.setupConnections(toConnect)

      R.last(connectedNodes).connect(audioContext.destination)

      oscillatorNode.start(time)
      return this
    },
    stop(time = 0) {
      oscillatorNode.stop()
      return this
    },
  })
