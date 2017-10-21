const createFilter = (audioContext: AudioContext, { frequency = 7000, filterType = 'lowpass' } = {}) => {
  const filterNode = audioContext.createBiquadFilter()
  filterNode.type = filterType as BiquadFilterType
  filterNode.frequency.value = frequency

  return {
    frequency,
    filterType,
    filterNode,
  }
}

const setFilterType = (filter, type) => {
  filter.filterNode.type = type
  filter.filterType = type

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
