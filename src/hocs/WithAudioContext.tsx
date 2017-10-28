import * as React from 'react'

function withAudioContext(WrappedComponent: any) {
  return class extends React.Component<{}, {audioContext: AudioContext}> {
    constructor(props: any) {
      super(props)
      const audioContext = new window.AudioContext()
      this.state = { audioContext }
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
}

export default withAudioContext
