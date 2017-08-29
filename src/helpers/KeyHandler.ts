import * as R from 'ramda'
import keys from '../assets/keys.json'

export const keyExists = key =>
  R.findIndex(R.propEq('keyPress', key))(keys) > -1

export const keyIsPressed = (pressedKeys, key) =>
  pressedKeys.indexOf(key) > -1

export const removeKey = (pressedKeys, key) =>
  R.filter(k => k !== key)(pressedKeys)
