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

const getValue = value => value * 100 || 0

const getOnChangeValue = onChange => value => onChange(value / 100)

const EnvelopeItem = ({
  value,
  onChange,
  name,
}) => (
  <div className="envelope-item">
    <SliderContainer>
      <span>
        {name}
      </span>
      <span>
        {value}
      </span>
      <EnvelopeSlider value={getValue(value)} onChange={getOnChangeValue(onChange)}/>
    </SliderContainer>
  </div>
)

export default EnvelopeItem
