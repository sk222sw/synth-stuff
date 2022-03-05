import * as React from "react";
// import Knob from 'react-canvas-knob'
import styled from "styled-components";
import { IOscillatorConfig } from "../models/Oscillator";
import Knob from "./Knob";
import { Row } from "./styles/index";
import Waveforms from "./Waveforms";

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 90px;
  align-items: center;
`;

const StyledInput = styled.input`
  text-align: center;
` as any;

const Label = styled.span`
  font-size: 10px;
`;

const StyledOscillator = styled.div`
  margin: 12px;
  padding: 12px;
  border: solid 1px rgba(0, 0, 0, 0.12);
  width: 250px;
`;

interface Props {
  setOscillatorVolume: (oscillator: IOscillatorConfig, value: number) => void;
  setOffset: (oscillator: IOscillatorConfig, value: number) => void;
  setSemi: (oscillator: IOscillatorConfig, value: number) => void;
  setWaveform: (oscillator: IOscillatorConfig, value: string) => void;
  oscillator: IOscillatorConfig;
  waveforms: string[];
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
          max={100}
          onChange={(val: any) => setOscillatorVolume(oscillator, val / 100)}
        ></Knob>
        <Label>Volume</Label>
      </StyledInputContainer>
      <Waveforms
        waveforms={waveforms}
        onWaveformChange={(waveform: string) =>
          setWaveform(oscillator, waveform)
        }
      />
      <StyledInputContainer>
        <StyledInput
          type="number"
          max="50"
          min="-50"
          value={oscillator.offset}
          onChange={(v: any) => setOffset(oscillator, v.target.value)}
        />
        <Label>Cent</Label>
      </StyledInputContainer>
      <StyledInputContainer>
        <StyledInput
          type="number"
          max="24"
          min="-48"
          value={oscillator.semi}
          onChange={(event: any) => setSemi(oscillator, event.target.value)}
        />
        <Label>Semi</Label>
      </StyledInputContainer>
    </Row>
  </StyledOscillator>
);

export default Oscillator;
