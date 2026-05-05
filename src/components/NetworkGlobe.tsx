// Abstract global network visual: orbital arcs + nodes + flowing connection seams.
const NetworkGlobe = ({ className = "" }: { className?: string }) => {
  const nodes = [
    { x: 300, y: 90, label: "Insight" },
    { x: 130, y: 200, label: "Experts" },
    { x: 470, y: 200, label: "Assistants" },
    { x: 80, y: 360, label: "Website" },
    { x: 300, y: 410, label: "SEO" },
    { x: 520, y: 360, label: "Growth" },
  ];
  const links: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 5], [1, 4], [2, 4], [3, 4], [4, 5], [0, 4],
  ];

  return (
    <svg
      viewBox="0 0 600 500"
      className={className}
      role="img"
      aria-label="SynSeam global execution network"
    >
      <defs>
        <radialGradient id="ng-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(221 83% 53%)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="hsl(221 83% 53%)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="hsl(221 83% 53%)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ng-line" x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(221 83% 60%)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(188 86% 60%)" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="ng-node">
          <stop offset="0%" stopColor="hsl(188 90% 70%)" />
          <stop offset="100%" stopColor="hsl(221 83% 53%)" />
        </radialGradient>
        <filter id="ng-blur">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* ambient glow */}
      <circle cx="300" cy="250" r="240" fill="url(#ng-glow)" />

      {/* orbital ellipses suggest globe */}
      {[
        { rx: 240, ry: 80 },
        { rx: 240, ry: 140 },
        { rx: 240, ry: 200 },
        { rx: 240, ry: 240 },
      ].map((o, i) => (
        <ellipse
          key={i}
          cx="300" cy="250"
          rx={o.rx} ry={o.ry}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.5"
        />
      ))}
      {/* vertical orbit */}
      <ellipse cx="300" cy="250" rx="80" ry="240" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 6" opacity="0.5" />
      <ellipse cx="300" cy="250" rx="160" ry="240" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />

      {/* connection seams */}
      {links.map(([a, b], i) => {
        const A = nodes[a], B = nodes[b];
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2 - 40;
        return (
          <path
            key={i}
            d={`M${A.x} ${A.y} Q ${mx} ${my} ${B.x} ${B.y}`}
            fill="none"
            stroke="url(#ng-line)"
            strokeWidth="1.25"
            opacity="0.65"
            filter="url(#ng-blur)"
          />
        );
      })}

      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="22" fill="hsl(222 40% 10%)" stroke="hsl(var(--border))" />
          <circle cx={n.x} cy={n.y} r="6" fill="url(#ng-node)" />
          <circle cx={n.x} cy={n.y} r="14" fill="none" stroke="hsl(188 86% 53%)" strokeOpacity="0.25" />
          <text
            x={n.x}
            y={n.y + 44}
            textAnchor="middle"
            className="fill-muted-foreground"
            style={{ font: "500 11px Inter, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default NetworkGlobe;
