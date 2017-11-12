import { Dispatch } from 'react-redux'
import { shouldAddKey } from '../helpers/KeyHandler'
import { IOscillatorConfig } from '../models/Oscillator'
import { OtherTypeKeys, SynthTypeKeys } from './constants'

export interface AddOscillatorAction {
  type: SynthTypeKeys.ADD_OSCILLATOR
  payload: IOscillatorConfig
}

export interface RemoveOscillatorAction {
  type: SynthTypeKeys.REMOVE_OSCILLATOR
  payload: number
}

export interface AddPressedKeyAction {
  type: SynthTypeKeys.ADD_PRESSED_KEY
  payload: string
}

export interface RemovePressedKeyAction {
  type: SynthTypeKeys.REMOVE_PRESSED_KEY
  payload: string
}

export interface RemoveAllKeysAction {
  type: SynthTypeKeys.REMOVE_ALL_KEYS
}

export interface OtherAction {
  type: OtherTypeKeys.OTHER_ACTION
}

export type ActionTypes =
  | AddOscillatorAction
  | AddPressedKeyAction
  | RemovePressedKeyAction
  | RemoveAllKeysAction
  | OtherAction

export const addOscillator = (config: IOscillatorConfig): AddOscillatorAction => ({
  type: SynthTypeKeys.ADD_OSCILLATOR,
  payload: config,
})

export const removeOscillator = (id: number): RemoveOscillatorAction => ({
  type: SynthTypeKeys.REMOVE_OSCILLATOR,
  payload: id,
})

export const addPressedKey = (payload: string) =>
  (dispatch: Dispatch<AddOscillatorAction>, getState: any) => {
    if (shouldAddKey(getState().synthReducer.pressedKeys, payload))
      dispatch({
        type: SynthTypeKeys.ADD_PRESSED_KEY,
        payload,
      })
  }

export const removePressedKey = (payload: string): RemovePressedKeyAction => ({
  type: SynthTypeKeys.REMOVE_PRESSED_KEY,
  payload,
})

export const removeAllKeys = (): RemoveAllKeysAction => ({
  type: SynthTypeKeys.REMOVE_ALL_KEYS,
})
