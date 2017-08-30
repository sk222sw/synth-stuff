import * as React from 'react'
import EnvelopeItem from './EnvelopeItem'

const Envelope = ({
  envelope,
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
}) => (
  <div>
    <EnvelopeItem
      name={'A'}
      onChange={changeAttack}
      value={envelope.a}
      step={1}
      range={[1, 999]}
      prefix={'ms'}
    />
    <EnvelopeItem
      name={'D'}
      onChange={changeDecay}
      value={envelope.d}
      step={1}
      range={[1, 999]}
      prefix={'ms'}
    />
    <EnvelopeItem
      name={'S'}
      onChange={changeSustain}
      value={envelope.s}
      step={0.01}
      range={[0.01, 1]}
    />
    <EnvelopeItem
      name={'R'}
      onChange={changeRelease}
      value={envelope.r}
      step={1}
      range={[1,999]}
      prefix={'ms'}
    />
  </div>
)

export default Envelope
