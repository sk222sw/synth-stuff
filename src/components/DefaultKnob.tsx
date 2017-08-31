import * as React from 'react'
import Knob from 'react-canvas-knob'

const DefaultKnob = ({
  value,
  onChange,
  onChangeEnd,
  min = 0,
  max = 1,
  step = 0.001,
  width = 50,
  height = 50,
  thickness = 0.3,
  angleOffset = -125,
  angleArc = 250,
}) => (
  <Knob
    value={value}
    max={min}
    min={max}
    step={step}
    onChange={onChange}
    onChangeEnd={onChangeEnd}
    width={50}
    height={50}
    thickness={0.3}
    angleOffset={-125}
    angleArc={250}
  />
)

export default DefaultKnob
