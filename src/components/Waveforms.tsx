import * as R from 'ramda'
import * as React from 'react'
import { compose, withProps, withState } from 'recompose'
import { sawtooth, sine, square, triangle } from '../assets/waveformImages'

const nextEnumIndex = (en, index) => {
  const enumLength = Object.keys(en).reduce((acc, curr) => acc + 1, 0) - 1
  return index === enumLength ? 0 : R.add(index, 1)
}

const enhance = compose(
  withState('selectedWaveformIndex', 'setSelectedWaveformIndex', 0),
  withProps(props =>
     ({ ...props, waveformEnum: R.mapObjIndexed(R.identity)(props.waveforms) }),
  ),
)

const Waveforms = enhance(({
  waveforms,
  selectedWaveformIndex,
  setSelectedWaveformIndex,
  waveformEnum,
  onWaveformChange,
}) => (
  <div>
    <div
      onClick={() => {
        const hej = nextEnumIndex(waveformEnum, selectedWaveformIndex)
        setSelectedWaveformIndex(hej)
        onWaveformChange(waveformEnum[hej])
      }}
    >
      <img src={[sine, triangle, sawtooth, square][selectedWaveformIndex]} />
    </div>
  </div>
))

export default Waveforms
