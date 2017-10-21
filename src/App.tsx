import * as React from 'react'
import './App.css'

import styled from 'styled-components'
import Synth from './components/Synth'

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 80px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`

class App extends React.Component<{}, any> {
  render() {
    return (
      <StyledApp>
        <Synth />
      </StyledApp>
    )
  }
}

export default App
