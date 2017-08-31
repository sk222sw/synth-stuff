import * as React from 'react'

const Key = ({ name, frequency, onClick }) => (
  <div
    onClick={() => onClick({ name, frequency })}
  >
    {name}
  </div>
)
export default Key
