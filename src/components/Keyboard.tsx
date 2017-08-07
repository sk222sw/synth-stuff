import * as React from 'react'

import Key from './Key'

const Keyboard = ({ keys, currentKey, onKeyClick }) => (
  <div className="keyboard-container">
    <h1>
      {currentKey.name}
    </h1>
    {keys.map((key, i) =>
      <Key
        key={i}
        name={key.name}
        frequency={key.frequency}
        onClick={onKeyClick}
      />,
    )}
  </div>
)

export default Keyboard
