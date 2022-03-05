
export function getDegree(
    clientX: number,
    clientY: number,
    pts: { x: number; y: number },
    startAngle: number,
    endAngle: number
  ) {
    const x = clientX - pts.x;
    const y = clientY - pts.y;
    let deg = (Math.atan(y / x) * 180) / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
    return finalDeg;
  }