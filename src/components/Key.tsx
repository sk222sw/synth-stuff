import * as React from 'react'

const Key = ({ name, frequency, onClick, keyPress }) => (
  <div
    onMouseDown={() => onClick({ name, frequency, keyPress })}
  >
    {name}
  </div>
)
export default Key
