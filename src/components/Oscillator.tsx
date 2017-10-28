import * as React from 'react'
import Knob from 'react-canvas-knob'
import styled from 'styled-components'
import { Row } from './styles/index'
import Waveforms from './Waveforms'

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90px;
  align-items: center;
`

const StyledInput = styled.input`
  text-align: center;
` as any

const Label = styled.span`
  font-size: 10px;
`

const StyledOscillator = styled.div`
  margin: 12px;
  padding: 12px;
  border: solid 1px rgba(0, 0, 0, 0.12);
  width: 250px;
`

interface Props {
  setOscillatorVolume: (value: number) => void
  setOffset: (oscillator: Oscillator) => (value: number) => void
  setSemi: (value: number) => void
  setWaveform: (value: string) => void
  oscillator: {}
  waveforms: string[]
}

const Oscillator = ({
  setOscillatorVolume,
  setOffset,
  setSemi,
  setWaveform,
  oscillator,
  waveforms,
}: Props) => (
  <StyledOscillator>
    <Row>
      <StyledInputContainer>
        <Knob
          value={Number(oscillator.peakVolume.toFixed(2))}
          max={1}
          min={0}
          step={0.001}
          onChange={setOscillatorVolume(oscillator)}
          onChangeEnd={setOscillatorVolume(oscillator)}
          width={28}
          height={28}
          thickness={0.3}
          angleOffset={-125}
          angleArc={250}
        />
        <Label>Volume</Label>
      </StyledInputContainer>
      <Waveforms
        waveforms={waveforms}
        onWaveformChange={setWaveform}
      />
      <StyledInputContainer>
        <StyledInput
          type="number"
          max="50"
          min="-50"
          value={oscillator.offset}
          onChange={(v: HtmlInEve) => setOffset(oscillator)(v.target.value)}
        />
        <Label>
          Cent
        </Label>
      </StyledInputContainer>
      <StyledInputContainer>
        <StyledInput
          type="number"
          max="24"
          min="-24"
          value={oscillator.semi}
          onChange={(event: any) => setSemi(oscillator)(event.target.value)}
        />
        <Label>
          Semi
        </Label>
      </StyledInputContainer>
    </Row>
</StyledOscillator>)

export default Oscillator
