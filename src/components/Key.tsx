import * as React from 'react'

export interface KeyType {
  name: string
  frequency: number
  keyPress: string
}

interface Props {
  name: string,
  frequency: number,
  keyPress: string,
  onClick: (key: KeyType) => void,
}

const Key = ({ name, frequency, onClick, keyPress }: Props) => (
  <div
    onMouseDown={() => onClick({ name, frequency, keyPress })}
  >
    {name}
  </div>
)
export default Key
