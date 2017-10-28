import * as React from 'react'
import Knob from 'react-canvas-knob'

interface Props {
  type: string
  frequency: number,
  onFrequencyChange: (value: number) => void
}

const Filter = ({ type, frequency, onFrequencyChange }: Props) => (
  <div>
    <div>
      {type}
    </div>
    <Knob
      value={Number(frequency.toFixed(2))}
      max={20000}
      min={0}
      step={1}
      onChange={onFrequencyChange}
      onChangeEnd={onFrequencyChange}
      width={50}
      thickness={0.3}
      angleOffset={-125}
      angleArc={250}
    />
  </div>)

export default Filter
