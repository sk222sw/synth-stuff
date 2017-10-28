import * as R from 'ramda'
import keys from '../assets/keys.json'
import { KeyType } from '../components/Key'

export const keyExists = (key: KeyType) =>
  R.findIndex(R.propEq('keyPress', key))(keys) > -1

export const keyIsPressed = (pressedKeys: KeyType[], key: KeyType) =>
  pressedKeys.indexOf(key) > -1

export const removeKey = (pressedKeys: KeyType[], key: KeyType) =>
  R.filter(k => k !== key)(pressedKeys)
