import { connect } from 'react-redux'
import { addOscillator, addPressedKey, removeAllKeys, removePressedKey } from './actions/actions'
import Synth from './components/Synth'
import { IOscillatorConfig } from './models/Oscillator'

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddOscillator: (config: IOscillatorConfig) => {
      dispatch(addOscillator(config))
    },
    addPressedKey: (key: string) => {
      dispatch(addPressedKey(key))
    },
    removePressedKey: (key: string) => {
      dispatch(removePressedKey(key))
    },
    removeAllKeys: () => {
      dispatch(removeAllKeys())
    },
  }
}

const SynthContainer = connect(state => state.synthReducer, mapDispatchToProps)(Synth)

export default SynthContainer
