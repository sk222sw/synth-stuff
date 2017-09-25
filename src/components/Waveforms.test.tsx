import { mount } from 'enzyme'
import * as React from 'react'
import Waveforms from './Waveforms'

describe('Waveforms', () => {
  it('should work', () => {
    const spy = jest.fn()

    const wrapper = mount(
      <Waveforms
        waveforms={['sine', 'triangle', 'sawtooth', 'square']}
        onWaveformChange={spy}
      />,
    )

    const spy2 = jest.spyOn(wrapper.instance(), 'onWaveformClick')

    wrapper.instance().onWaveformClick()

    expect(wrapper.prop('waveforms')).toEqual(['sine', 'triangle', 'sawtooth', 'square'])

    expect(wrapper.state().selectedWaveformIndex).toBe(1)

    wrapper.find('.waveform-container').simulate('click')
    expect(spy).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()

    expect(wrapper.state().selectedWaveformIndex).toBe(2)
  })
})
