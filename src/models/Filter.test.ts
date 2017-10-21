import 'web-audio-test-api'
import Filter from './Filter'

const context = new AudioContext()

describe('Filter', () => {
  let filter

  const setup = (options = {}) => Filter.createFilter(context, options)

  describe('createFilter()', () => {
    it('should create a Filter object', () => {
      filter = setup()
      expect(filter).toHaveProperty('frequency')
      expect(filter).toHaveProperty('type')
      expect(filter).toHaveProperty('filterNode')
      expect(filter.filterNode instanceof BiquadFilterNode)
      expect(filter.frequency).toBe(7000)
      expect(filter.type).toBe('lowpass')
      expect(filter.filterNode.type).toBe('lowpass')
    })

    it('should take a filter options object', () => {
      filter = setup({ frequency: 200, type: 'highpass' })

      expect(filter.frequency).toBe(200)
      expect(filter.type).toBe('highpass')
    })
  })

  describe('setFilterType', () => {
    it('should set the correct filter type', () => {
      const obj = Filter.setFilterType(setup(), 'highpass')
      console.log(obj.type)
      expect(obj.type).toBe('highpass')
      expect(obj.filterNode.type).toBe('highpass')
    })
  })

  describe('setFrequency', () => {
    it('should set the correct filter type', () => {
      const f = Filter.setFrequency(setup(), 200)
      expect(f.frequency).toBe(200)
      expect(f.filterNode.frequency.value).toBe(200)
    })
  })

})
