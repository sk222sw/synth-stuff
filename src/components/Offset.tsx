import * as React from 'react'
import Knob from 'react-canvas-knob'

interface Props {
  setOffset: (value: number) => {}
  offset: number
}

const Offset = ({ setOffset, offset }: Props) => (
  <div>
    Cent
    <div>
    <Knob
      value={offset}
      max={50}
      min={-50}
      step={1}
      onChange={setOffset}
      onChangeEnd={setOffset}
      width={50}
      height={50}
      thickness={0.3}
      angleOffset={-125}
      angleArc={250}
    />
    </div>
  </div>
)

export default Offset
