import { shallow } from 'enzyme'
import * as React from 'react'
import Oscillator from './Oscillator'

test('Oscillator', () => {
  const wrapper = shallow(
    <Oscillator
      oscillator={{
        offset: 0,
        playing: false,
        semi: 0,
        waveform: 'sine',
        peakVolume: 0.5,
      }}
      waveforms={[]}
      setOscillatorVolume={() => () => null}
      setOffset={() => () => null}
      setSemi={() => () => null}
      setWaveform={() => () => null}
    />,
  )

  expect(wrapper).toMatchSnapshot()
})
