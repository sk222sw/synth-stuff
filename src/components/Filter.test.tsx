import { shallow } from 'enzyme'
import * as React from 'react'
import Filter from './Filter'

test('Filter', () => {
  const spy = jest.fn()

  const wrapper = shallow(
    <Filter
      frequency={200}
      onFrequencyChange={spy}
      type={'lowpass'}
    />,
  )

  expect(wrapper).toMatchSnapshot()
})
