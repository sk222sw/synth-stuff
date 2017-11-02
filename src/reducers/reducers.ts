import { combineReducers } from 'redux'

import { ActionTypes } from '../actions/actions'
import { SynthTypeKeys } from '../actions/constants'
import keys from '../assets/keys.json'
import { IEnvelope } from '../components/Envelope'
import { IOscillatorConfig } from '../models/Oscillator'
import hoo, { ISynth } from '../models/Synth'

interface InitialState {
  synth: ISynth,
  muted: boolean,
  frequency: number,
  volume: number,
  waveforms: string[],
  envelope: IEnvelope,
  pressedKeys: string[],
  keys: any,
  oscillatorConfigs: IOscillatorConfig[],
}

const ctx = hoo.setup()

const initialOscillatorConfig: IOscillatorConfig = {
  id: 0,
  frequency: 880,
  offset: 0,
  semi: 0,
  playing: false,
  volume: 0.5,
  waveform: 'sine',
  peakVolume: 0.5,
}

const initialState: InitialState = {
  synth: hoo.createSynth(ctx),
  muted: true,
  frequency: 880.00,
  volume: 0.1,
  waveforms: [
    'sine',
    'triangle',
    'sawtooth',
    'square',

  ],
  envelope: {
    a: 10,
    d: 164,
    s: 0.5,
    r: 50,
  },
  pressedKeys: [],
  keys,
  oscillatorConfigs: [
    initialOscillatorConfig,
  ],
}

function synthReducer(state = initialState, action: ActionTypes) {
  switch (action.type) {
    case SynthTypeKeys.ADD_OSCILLATOR:
      return { ...state, oscillatorConfigs: state.oscillatorConfigs.push(action.payload) }
    case SynthTypeKeys.ADD_PRESSED_KEY:
      return { ...state, pressedKeys: [...state.pressedKeys, action.payload] }
    case SynthTypeKeys.REMOVE_PRESSED_KEY:
      return { ...state, pressedKeys: state.pressedKeys.filter(x => x !== action.payload) }
    case SynthTypeKeys.REMOVE_ALL_KEYS:
      return { ...state, pressedKeys: [] }
    default:
      return state
  }
}

const SynthApp = combineReducers({
  synthReducer,
})

export default SynthApp
