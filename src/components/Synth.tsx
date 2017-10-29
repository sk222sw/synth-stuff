import * as React from 'react'
import styled from 'styled-components'
import Keyboard from '../components/Keyboard'
import ComputerKeyboard from '../hocs/ComputerKeyboard'
import { IOscillatorConfig } from '../models/Oscillator'

const StyledSynth = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 616px;
  background: white;
  padding: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

interface Props {
  keys: any[],
  onAddOscillator: (config: IOscillatorConfig) => {}
  stopPlaying: any
  startPlaying: any
}

class Synth extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)

  }

  handleKeyDown = () => {
    return
  }
  handleKeyUp = () => {
    return
  }

  render() {
    return (
      <StyledSynth>
        <ComputerKeyboard // lift
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
        />
        <Keyboard
          keys={this.props.keys}
          currentKeys={this.props.pressedKeys}
          onKeyClick={() => ({})}
        />
      </StyledSynth>
    )
  }
}

export default Synth
