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
  addPressedKey: (key: string) => {}
  removePressedKey: (key: string) => {}
  removeAllKeys: () => {}
  stopPlaying: any
  startPlaying: any
  pressedKeys: string[]
}

class Synth extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.props.removeAllKeys)
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.props.removeAllKeys)
  }

  handleKeyDown = (key: KeyboardEvent) =>
    this.props.addPressedKey(key.key)

  handleKeyUp = (key: KeyboardEvent) =>
    this.props.removePressedKey(key.key)

  onKeyClick = (key: any) =>
    this.props.addPressedKey(key.name)

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
          onKeyClick={this.onKeyClick}
        />

        {this.props.pressedKeys.map((k, key) => <div key={key}>{k}</div>)}

      </StyledSynth>
    )
  }
}

export default Synth
