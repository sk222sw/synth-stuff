import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'web-audio-test-api'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
