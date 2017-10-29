import * as R from 'ramda'
import keys from '../assets/keys.json'

export const keyExists = (key: string) =>
  R.findIndex(R.propEq('keyPress', key))(keys) > -1

export const keyIsPressed = (pressedKeys: string[], key: string) =>
  pressedKeys.indexOf(key) > -1

export const removeKey = (pressedKeys: string[], key: string) =>
  pressedKeys.filter(k => k !== key)
