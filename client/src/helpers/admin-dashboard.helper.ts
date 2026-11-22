export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export const describeDonutSlice = (
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startAngle: number,
  endAngle: number,
) => {
  const adjustedEndAngle =
    endAngle - startAngle >= 360 ? startAngle + 359.99 : endAngle;
  const p1 = polarToCartesian(cx, cy, rOuter, adjustedEndAngle);
  const p2 = polarToCartesian(cx, cy, rOuter, startAngle);
  const p3 = polarToCartesian(cx, cy, rInner, startAngle);
  const p4 = polarToCartesian(cx, cy, rInner, adjustedEndAngle);

  const largeArcFlag = adjustedEndAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${p2.x} ${p2.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${p1.x} ${p1.y}`,
    `L ${p4.x} ${p4.y}`,
    `A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${p3.x} ${p3.y}`,
    "Z",
  ].join(" ");
};
