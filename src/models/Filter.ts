const createFilter = (audioContext: AudioContext, { frequency = 7000, type = 'lowpass' } = {}) => {
  const filterNode = audioContext.createBiquadFilter()
  filterNode.type = type as BiquadFilterType
  filterNode.frequency.value = frequency
  return {
    frequency,
    type,
    filterNode,
  }
}

const setFilterType = (filter, type) => {
  filter.filterNode.type = type
  filter.type = type

  return filter
}

const setFrequency = (filter, frequency) => {
  filter.filterNode.frequency.value = frequency
  filter.frequency = frequency

  return filter
}

export default {
  createFilter,
  setFilterType,
  setFrequency,
}
