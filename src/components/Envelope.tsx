import * as React from 'react'
import styled from 'styled-components'
import EnvelopeItem from './EnvelopeItem'
import { Row } from './styles/index'

const StyledEnvelope = styled(Row)`
  margin-left: 24px;
`

export interface IEnvelope {
  a: number
  d: number
  s: number
  r: number
}

interface Props {
  envelope: IEnvelope
  changeAttack: (value: number) => void
  changeDecay: (value: number) => void
  changeSustain: (value: number) => void
  changeRelease: (value: number) => void
}

const Envelope = ({
  envelope,
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
}: Props) => (
  <StyledEnvelope>
    <EnvelopeItem
      name={'A'}
      onChange={changeAttack}
      value={envelope.a}
      step={1}
      range={[0, 999]}
      prefix={'ms'}
    />
    <EnvelopeItem
      name={'D'}
      onChange={changeDecay}
      value={envelope.d}
      step={1}
      range={[0, 999]}
      prefix={'ms'}
    />
    <EnvelopeItem
      name={'S'}
      onChange={changeSustain}
      value={envelope.s}
      step={0.01}
      range={[0.00, 1]}
    />
    <EnvelopeItem
      name={'R'}
      onChange={changeRelease}
      value={envelope.r}
      step={1}
      range={[0,999]}
      prefix={'ms'}
    />
  </StyledEnvelope>
)

export default Envelope
