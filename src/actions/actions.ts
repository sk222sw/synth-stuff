import { IOscillatorConfig } from '../models/Oscillator'
import { OtherTypeKeys, SynthTypeKeys } from './constants'

export interface AddOscillatorAction {
  type: SynthTypeKeys.ADD_OSCILLATOR,
  payload: IOscillatorConfig,
}

export interface RemoveOscillatorAction {
  type: SynthTypeKeys.REMOVE_OSCILLATOR,
  payload: number,
}

export interface OtherAction {
  type: OtherTypeKeys.OTHER_ACTION
}

export type ActionTypes =
  | AddOscillatorAction
  | OtherAction

export const addOscillator = (config: IOscillatorConfig): AddOscillatorAction => ({
  type: SynthTypeKeys.ADD_OSCILLATOR,
  payload: config,
})

export const removeOscillator = (id: number): RemoveOscillatorAction => ({
  type: SynthTypeKeys.REMOVE_OSCILLATOR,
  payload: id,
})
