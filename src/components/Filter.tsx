import * as React from 'react'
import Knob from 'react-canvas-knob'

export default class Filter extends React.Component<any, any> {
  render() {
    return (
      <div>
        <div>
          {this.props.type}
        </div>
        <Knob
          value={Number(this.props.frequency.toFixed(2))}
          max={20000}
          min={0}
          step={1}
          onChange={this.props.onFrequencyChange}
          onChangeEnd={this.props.onFrequencyChange}
          width={50}
          thickness={0.3}
          angleOffset={-125}
          angleArc={250}
        />
      </div>
    )
  }
}
