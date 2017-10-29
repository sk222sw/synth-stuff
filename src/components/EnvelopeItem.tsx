// import Slider from 'rc-slider'
// import 'rc-slider/assets/index.css'
import * as React from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import styled from 'styled-components'

const SliderContainer = styled.div`
  align-items: center;
  justify-content: space-around;
  width: 30px;
  height: 100px;
`

const OverridenSlider = styled(Slider)`
  // overrides
  height: 76px;
  margin: 0;

  .rangeslider__fill{
  }
  .rangeslider__handle {
    //overrides
    width: 16px;
    height: 4px;
    left: -4px;
  }
  .rangeslider__tooltip {
    //overrides
    left: -6px;
    top: -50px;
  }
  .rangeslider__tooltip:after {
    //overrides
    border-bottom: 8px solid transparent;
    border-top: 8px solid rgba(0, 0, 0, 0.8);
    border-left: 8px solid transparent;
    left: 12px;
    top: 100%;

    //new
    border-right: 8px solid transparent;
  }
`

const EnvelopeText = styled.span`
  font-size: 12px;
`

const initialRange = [1, 100]
const initialStep = 1

interface Props {
  value: number
  onChange: (value: number) => void
  name: string
  range: number[]
  step: number
}

const EnvelopeItem = ({
  value,
  onChange,
  name,
  range = initialRange,
  step = initialStep,
}: Props) => (
  <div className="envelope-item">
    <SliderContainer>
      <OverridenSlider
        orientation={'vertical'}
        step={step}
        min={range[0]}
        max={range[1]}
        value={Number(value.toFixed(2) || 0)}
        onChange={onChange}
      />
      <EnvelopeText>
        {name}
      </EnvelopeText>
    </SliderContainer>
  </div>
)

export default EnvelopeItem
