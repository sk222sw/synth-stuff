import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import * as React from 'react'
import { compose } from 'recompose'
import * as keys from '../assets/keys.json'
import withAudioContext from '../hocs/WithAudioContext'
import { createSynth } from '../models/Synth'

class SynthContainer extends React.Component<
  {audioContext: AudioContext},
  any> {
  constructor(props) {
    super(props)
    this.state = {
      muted: true,
      filter: false,
      keys: keys[0],
      frequency: 1000,
      volume: 1,
    }
  }

  componentWillMount() {
    const synth = createSynth(this.props.audioContext)
    synth.addFilter()
    this.setState({ synth })
  }

  mute = () => {
    if (this.state.muted) {
      this.state.synth.configure({
        frequency: this.state.frequency,
      })
      .play()
    } else {
      this.state.synth.stop()
    }
    this.setState({ muted: !this.state.muted })
  }

  setFrequency = frequency => {
    this.state.synth.setFrequency(frequency)
    this.setState({ frequency })
  }

  setVolume = volume => {
    this.state.synth.setVolume(volume)
    this.setState({ volume })
  }

  toggleFilter = () => {
    if (this.state.filterOn) {
      this.state.synth.removeFilter()
    } else {
      this.state.synth.addFilter()
    }
    this.setState({ filterOn: !this.state.filterOn })
  }

  render() {
    return (
      <div>
        <button style={{ height: 200, width: 200 }} onClick={this.mute}>
          {this.state.muted ? '>' : '||'}
        </button>
        <div style={{ width: 300, marginLeft: 250 }}>
          Frequency
          <Slider
            onChange={this.setFrequency}
            min={1000}
            max={2000}
          />
          {this.state.frequency}
        </div>
        <div style={{ width: 300, marginLeft: 250 }}>
          Volume
          <Slider
            value={this.state.volume}
            onChange={this.setVolume}
            min={0}
            max={1}
            step={0.001}
          />
          {this.state.volume}
        </div>
        <div>
          <p>filter</p>
          <button style={{ height: 200, width: 200 }} onClick={this.toggleFilter}>
            {this.state.filterOn ? '>' : '||'}
          </button>
        </div>
      </div>
    )
  }
}

        // <Synth
        //   audioContext={this.props.audioContext}
        //   playing={!this.state.muted}
        //   notes={[
        //     this.state.keys[0].frequency,
        //     this.state.keys[4].frequency,
        //     this.state.keys[7].frequency,
        //   ]}
        //   pan={0}
        //   onStopPlaying={this.mute}
        //   delayTime={0}
        //   numberOfDelays={1}
        // />

const enhance = compose(
  withAudioContext,
)

export default enhance(SynthContainer)
