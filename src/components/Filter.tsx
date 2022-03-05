import * as React from "react";
import Knob from "./Knob";

interface Props {
  type: string;
  frequency: number;
  onFrequencyChange: (value: number) => void;
}

const Filter = ({ type, frequency, onFrequencyChange }: Props) => (
  <div>
    <div>{type}</div>
    <Knob max={20000} onChange={onFrequencyChange}></Knob>
  </div>
);

export default Filter;
