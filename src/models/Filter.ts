export interface IFilterConfig {
  frequency: number
  type: string
}

export interface IFilter extends IFilterConfig {
  filterNode: BiquadFilterNode
}

const createFilter = (audioContext: AudioContext, { frequency = 7000, type = 'lowpass' } = {}): IFilter => {
  const filterNode = audioContext.createBiquadFilter()
  filterNode.type = type as BiquadFilterType
  ;filterNode.frequency.value = frequency

  return {
    frequency,
    type,
    filterNode,
  }
}

const setFilterType = (filter: IFilter, type: string) => {
  filter.filterNode.type = type as BiquadFilterType
  filter.type = type

  return filter
}

const setFrequency = (filter: IFilter, frequency: number) => {
  filter.filterNode.frequency.value = frequency
  filter.frequency = frequency

  return filter
}

export default {
  createFilter,
  setFilterType,
  setFrequency,
}
