import { shallow } from 'enzyme'
import * as React from 'react'
import 'web-audio-test-api'
import Synth from './Synth'

test('Synth', () => {
  const wrapper = shallow(
    <Synth />,
  )

  expect(wrapper).toMatchSnapshot()
})
