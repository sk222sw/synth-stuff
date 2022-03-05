import * as React from "react";
import styled from "styled-components";
import { getDegree } from "../helpers/math";
import { useMouseDragEvents } from "../hooks/useMouseDragEvents";

const Grip = styled.div`
  position: absolute;
  height: 40%;
  bottom: 2%;
  left: 50%;
  border: solid black 1px;
  transform: translateX(-50%);
`;

const TinyText = styled.p`
  font-size: 8px;
`;

interface StyledKnobProps {
  width?: string;
  height?: string;
}

const StyledKnob = styled.div<StyledKnobProps>`
  transform: rotate(35deg);
  position: relative;
  border: black solid 1px;
  border-radius: 50%;
  width: ${(props) => props.width || "40px"};
  height: ${(props) => props.height || "40px"};
`;

const getStartDegree = (
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number,
  oldValue: number
) => {
  return ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
};

function getDivPointFromRef(ref: React.RefObject<HTMLDivElement>) {
  const div = ref.current;

  if (!div?.getBoundingClientRect) return;
  const divRect = div.getBoundingClientRect();

  return {
    x: divRect.left + divRect.width / 2,
    y: divRect.top + divRect.height / 2,
  };
}

function Knob({ max = 127, maxDegree = 300 }) {
  // TODO: support changing min
  const min = 0;
  const resolution = max - min;
  const knobRef = React.useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  const startAngle = (360 - maxDegree) / 2;
  const endAngle = startAngle + maxDegree;
  const startDegree = Math.floor(
    getStartDegree(min, max, startAngle, endAngle, startAngle)
  );
  const [currentDegree, setCurrentDegree] = React.useState(startDegree);

  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsMouseDown(true);
  };

  const mouseUpHandler = (e: MouseEvent) => {
    e.preventDefault();
    setIsMouseDown(false);
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    e.preventDefault();

    const point = getDivPointFromRef(knobRef);

    if (!point) throw new Error("Failed to get point");

    const degree = getDegree(e.clientX, e.clientY, point, startAngle, endAngle);
    setCurrentDegree(degree);
  };

  useMouseDragEvents(isMouseDown, mouseMoveHandler, mouseUpHandler);

  function getResolutionValue() {
    return Math.round((currentDegree - startAngle) / (maxDegree / resolution));
  }

  const style = {
    transform: `rotate(${currentDegree}deg)`,
  };

  return (
    <div>
      <StyledKnob ref={knobRef} onMouseDown={mouseDownHandler} style={style}>
        <Grip></Grip>
      </StyledKnob>
      <TinyText>{getResolutionValue()}</TinyText>
    </div>
  );
}

export default Knob;
