import * as React from 'react'

function computerKeyboard(WrappedComponent) {
  return class extends React.Component {
    componentWillMount() {
      window.addEventListener('keydown', console.log)
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
}

export default computerKeyboard
