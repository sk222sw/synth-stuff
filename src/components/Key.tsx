import * as React from 'react'

const Key = ({ name, frequency, onClick }) => (
  <button
    type="button"
    onClick={() => onClick({ name, frequency })}
  >
    {name}
  </button>
)
export default Key
