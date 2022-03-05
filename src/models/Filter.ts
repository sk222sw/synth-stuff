export interface IFilterConfig {
  frequency: number
  type: BiquadFilterType
}

export interface IFilter extends IFilterConfig {
  filterNode?: BiquadFilterNode,
}

const createFilter = (audioContext: AudioContext, { frequency = 7000, type = 'lowpass' } = {}): IFilter => {
  const filterNode = audioContext.createBiquadFilter()
  const _type = type as BiquadFilterType;
  filterNode.type = _type 
  ;filterNode.frequency.value = frequency

  return {
    frequency,
    type: _type,
    filterNode,
  }
}

const setFilterType = (filter: IFilter, type: string) => {
  if (!filter.filterNode) throw new Error('No filter node')
  const _type = type as BiquadFilterType;
  filter.filterNode.type = _type 
  filter.type = _type

  return filter
}

const setFrequency = (filter: IFilter, frequency: number) => {
  if (!filter.filterNode) throw new Error('No filter node')
  filter.filterNode.frequency.value = frequency
  filter.frequency = frequency

  return filter
}

const Filter = {
  createFilter,
  setFilterType,
  setFrequency,
}

export default Filter