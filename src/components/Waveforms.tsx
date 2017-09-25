import * as R from 'ramda'
import * as React from 'react'
import { sawtooth, sine, square, triangle } from '../assets/waveformImages'

export const nextEnumIndex = (en, index) => {
  const enumLength = Object.keys(en).reduce((acc, curr) => acc + 1, 0) - 1
  return index === enumLength ? 0 : R.add(index, 1)
}

export default class Waveforms extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      selectedWaveformIndex: 0,
      images: [sine, triangle, sawtooth, square],
    }
  }

  readonly waveformEnum = R.mapObjIndexed(R.identity)(this.props.waveforms)

  imageUrl = () => {
    return this.state.images[this.state.selectedWaveformIndex]
  }

  onWaveformClick = () => {
    const index = nextEnumIndex(this.waveformEnum, this.state.selectedWaveformIndex)
    this.setState({ selectedWaveformIndex: index })
    this.props.onWaveformChange(this.waveformEnum[index])
  }

  render() {
    return (
      <div>
        <div className="waveform-container" onClick={this.onWaveformClick}>
          <img src={this.imageUrl()} />
        </div>
      </div>
    )
  }
}
