import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'

import 'web-audio-test-api'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
