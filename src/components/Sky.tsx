// Sunset backdrop: gradient + star specks + drifting cloud wisps.
// The horizon tint comes from the --horizon CSS variable, which animates.

const STARS = [
  { left: '8%', top: '6%', size: 3 },
  { left: '22%', top: '14%', size: 2 },
  { left: '41%', top: '4%', size: 2 },
  { left: '57%', top: '11%', size: 3 },
  { left: '73%', top: '5%', size: 2 },
  { left: '88%', top: '13%', size: 3 },
  { left: '94%', top: '3%', size: 2 },
];

export function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: `${i * 0.7}s` }}
        />
      ))}
      <span className="cloud cloud-a" />
      <span className="cloud cloud-b" />
      <span className="cloud cloud-c" />
      <span className="glow" />
    </div>
  );
}
