import * as React from 'react'

interface Props {
  onKeyDown: (event: Event) => void
  onKeyUp: (event: Event) => void
}

class ComputerKeyboard extends React.Component<Props, {}> {
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
