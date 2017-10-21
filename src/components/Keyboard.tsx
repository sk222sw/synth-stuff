import * as React from 'react'

import styled from 'styled-components'
import Key from './Key'
import { Row } from './styles/index'

const StyledKey = styled.div`
  border: solid rgba(0, 0, 0, 0.3) 1px;
  width: 30px;
  text-align: center;
  height: 16px;
`

const StyledKeyboard = styled(Row)`
  display: flex;
  justify-content: space-around;
`

const Keyboard = ({ keys = [] as any[], currentKeys, onKeyClick }) => (
  <StyledKeyboard>
    {keys.map((key, i) =>
      <StyledKey
        key={i}
        style={{ boxShadow: currentKeys.indexOf(key.keyPress) > -1 ? '' : '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' }}
      >
        <Key
          name={key.name}
          frequency={key.frequency}
          onClick={onKeyClick}
          keyPress={key.keyPress}
        />
      </StyledKey>,
    )}
  </StyledKeyboard>
)

export default Keyboard
