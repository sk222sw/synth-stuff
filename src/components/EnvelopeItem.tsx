import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import * as React from 'react'
import styled from 'styled-components'

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 300px;
  margin: 8px;
`

const EnvelopeSlider = styled(Slider)`
  max-width: 75%;
` as Slider

const initialRange = [1, 100]
const initialStep = 1
const initialPrefix = ''

const EnvelopeItem = ({
  value,
  onChange,
  name,
  range = initialRange,
  step = initialStep,
  prefix = initialPrefix,
}) => (
  <div className="envelope-item">
    <SliderContainer>
      <span>
        {name}
      </span>
      <span>
        {value} {prefix}
      </span>
      <EnvelopeSlider
        step={step}
        min={range[0]}
        max={range[1]}
        value={value || 0}
        onChange={onChange}
      />
    </SliderContainer>
  </div>
)

export default EnvelopeItem
