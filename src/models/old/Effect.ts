export enum EffectType {
  Filter,
}

export interface Effect {
  bypassed: boolean
  effectNode: AudioNode
  filter(): void
}

export const effect = (audioContext: AudioContext) => ({
  bypassed = false,
  effectNode = audioContext.createBiquadFilter(),
}): Effect => ({
  bypassed,
  effectNode,
  filter() {
    effectNode = audioContext.createBiquadFilter()
  },
})
