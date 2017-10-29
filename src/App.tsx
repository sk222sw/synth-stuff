import * as React from 'react'
import './App.css'

import styled from 'styled-components'
import SynthContainer from './SynthContainer'

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 80px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`

const App = ({ props }: any) => (
  <StyledApp>
    <SynthContainer {...props} />
  </StyledApp>
)

export default App
