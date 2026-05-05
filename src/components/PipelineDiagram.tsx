const PipelineDiagram = () => {
  const nodes = [
    { x: 60, y: 90, label: "Insight" },
    { x: 230, y: 50, label: "Experts" },
    { x: 230, y: 130, label: "Assistants" },
    { x: 400, y: 90, label: "Execution" },
    { x: 570, y: 90, label: "Website + SEO" },
    { x: 720, y: 90, label: "Growth" },
  ];
  return (
    <svg viewBox="0 0 780 180" className="w-full h-auto" role="img" aria-label="SynSeam pipeline">
      <defs>
        <linearGradient id="line" x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(221 83% 53%)" />
          <stop offset="100%" stopColor="hsl(188 86% 53%)" />
        </linearGradient>
        <radialGradient id="dot">
          <stop offset="0%" stopColor="hsl(188 86% 53%)" />
          <stop offset="100%" stopColor="hsl(221 83% 53%)" />
        </radialGradient>
      </defs>
      {[
        ["60,90", "230,50"],
        ["60,90", "230,130"],
        ["230,50", "400,90"],
        ["230,130", "400,90"],
        ["400,90", "570,90"],
        ["570,90", "720,90"],
      ].map(([a, b], i) => {
        const [x1, y1] = a.split(",").map(Number);
        const [x2, y2] = b.split(",").map(Number);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#line)"
            strokeWidth="1.5"
            strokeOpacity="0.55"
            className="animate-pulse-line"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="14" fill="hsl(222 40% 10%)" stroke="hsl(var(--border))" />
          <circle cx={n.x} cy={n.y} r="5" fill="url(#dot)" />
          <text
            x={n.x}
            y={n.y + 38}
            textAnchor="middle"
            className="fill-muted-foreground"
            style={{ font: "500 11px Inter, sans-serif", letterSpacing: "0.04em" }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default PipelineDiagram;
