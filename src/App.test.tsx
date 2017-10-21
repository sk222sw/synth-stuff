import { shallow } from 'enzyme'
import * as React from 'react'
import App from './App'

import 'web-audio-test-api'

describe('App', () => {
  let wrapper
  let state

  beforeEach(() => {
    wrapper = shallow(
      <App />,
    )
    state = wrapper.instance().state
  })

  it('should setup some state', () => {
    expect(state.synth).toBeDefined()
    expect(state.oscillatorConfigs[0].id).toBe(0)
    expect(state.oscillatorConfigs[1].id).toBe(1)
  })

  it('should update the correct oscillator config', () => {
    const oscillator = state.oscillatorConfigs[0]

    expect(oscillator.offset).toBe(0)

    const updated = wrapper.instance().updateOscillatorConfig(
      0,
      state.oscillatorConfigs[0],
      'offset',
      100,
    )

    expect(updated[0].offset).toBe(100)
    expect(updated[1].offset).toBe(0)
  })

})
