import * as React from 'react'
import EnvelopeItem from './EnvelopeItem'

const Envelope = ({
  envelope,
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
}) => (
  <div className="envelope">
    <EnvelopeItem name={'A'} onChange={changeAttack}  value={envelope.a} />
    <EnvelopeItem name={'D'} onChange={changeDecay}   value={envelope.d} />
    <EnvelopeItem name={'S'} onChange={changeSustain} value={envelope.s} />
    <EnvelopeItem name={'R'} onChange={changeRelease} value={envelope.r} />
  </div>
)

export default Envelope
