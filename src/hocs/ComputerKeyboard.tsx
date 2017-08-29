import * as React from 'react'

class ComputerKeyboard extends React.Component<any, any> {
  componentWillMount() {
    window.addEventListener('keydown', this.props.onKeyDown, false)
    window.addEventListener('keyup', this.props.onKeyUp, false)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onKeyDown, false)
    window.removeEventListener('keyup', this.props.onKeyUp, false)
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export default ComputerKeyboard
