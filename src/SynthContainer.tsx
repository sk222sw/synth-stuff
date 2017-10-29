import { connect } from 'react-redux'
import { addOscillator } from './actions/actions'
import Synth from './components/Synth'
import { IOscillatorConfig } from './models/Oscillator'

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddOscillator: (config: IOscillatorConfig) => {
      dispatch(addOscillator(config))
    },
  }
}

const SynthContainer = connect(state => state, mapDispatchToProps)(Synth)

export default SynthContainer
