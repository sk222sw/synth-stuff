import * as R from 'ramda'
import * as React from 'react'
import styled from 'styled-components'

const width = 32
const rotationWidth = 30

const Container = styled.div`
  transform-style: preserve-3d;
  perspective: 1000px;
  height: ${width};
  width: ${width};
`

const Front = styled.div`
background-size: cover;
background-position: center;
transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
backface-visibility: hidden;
text-align: center;
min-height: ${width};
background: grey;
transform: rotateY(0deg);
transform-style: preserve-3d;

&:after {
    position: absolute;
top: 0;
left: 0;
width: ${width};
height: ${width};
display: block;
backface-visibility: hidden;
}
`

const Back = styled.div`
background-size: cover;
background-position: center;
transition: transform .7s cubic-bezier(0.4, 0.2, 0.2, 1);
backface-visibility: hidden;
text-align: center;
min-height: ${width};
background: grey;
  position: absolute;
  top: 0;
  left: 0;
  width: ${width};
  transform: rotateY(180deg);
  transform-style: preserve-3d;
`

const Inner = styled.div`
transform: translateY(-50%) translateZ(${rotationWidth}) scale(0.94);
top: 50%;
position: absolute;
left: 0;
width: $width;
box-sizing: border-box;
outline: 1px solid transparent;
perspective: inherit;
z-index: 2;
}
`

class CoolSpinner extends React.Component<any, any> {
  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      frontDeg: 0,
      backDeg: 180,
    }
  }

  handleOnClick = () => {
    this.setState({
      index: this.state.index === this.props.items.length - 1 ? 0 : R.add(this.state.index, 1),
      frontDeg: this.state.frontDeg - 180,
      backDeg: this.state.backDeg - 180,
    })
  }

  render() {
    return (
      <Container onClick={this.handleOnClick}>
        NOT WORKING
        <Front style={{
          transform: `rotateY(${this.state.frontDeg}deg`,
          transformStyle: 'preserve-3d',
        }}>
          <Inner>
            <img src={this.props.items[this.state.index]} />
          </Inner>
        </Front>
        <Back style={{
          transform: `rotateY(${this.state.backDeg}deg`,
          transformStyle: 'preserve-3d',
        }}>
          <Inner>
            <img src={this.props.items[this.state.index === 0 ? this.props.items.length - 1 : this.state.index - 1]}/>
          </Inner>
        </Back>
      </Container>
    )
  }
}

export default CoolSpinner
