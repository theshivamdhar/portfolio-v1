interface TornEdgeProps {
  direction: 'cream-to-dark' | 'dark-to-cream';
  className?: string;
}

export default function TornEdge({ direction, className = '' }: TornEdgeProps) {
  if (direction === 'cream-to-dark') {
    return (
      <div
        className={`torn-edge-transition ${className}`}
        style={{ position: 'relative', height: 60, lineHeight: 0, overflow: 'hidden', background: 'var(--dark-bg)' }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <path
            d="M0,0 L1440,0 L1440,38 L1410,24 L1380,42 L1350,20 L1318,44 L1286,22 L1254,46 L1222,28 L1190,50 L1158,22 L1126,48 L1094,30 L1062,52 L1030,18 L998,44 L966,26 L934,52 L902,22 L870,48 L838,30 L806,54 L774,20 L742,46 L710,28 L678,52 L646,22 L614,48 L582,30 L550,54 L518,20 L486,46 L454,28 L422,52 L390,20 L358,44 L326,26 L294,50 L262,22 L230,48 L198,30 L166,52 L134,20 L102,46 L70,28 L38,50 L6,24 L0,30 Z"
            fill="var(--paper)"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`torn-edge-transition ${className}`}
      style={{ position: 'relative', height: 60, lineHeight: 0, overflow: 'hidden', background: 'var(--paper)' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <path
          d="M0,0 L1440,0 L1440,38 L1410,24 L1380,42 L1350,20 L1318,44 L1286,22 L1254,46 L1222,28 L1190,50 L1158,22 L1126,48 L1094,30 L1062,52 L1030,18 L998,44 L966,26 L934,52 L902,22 L870,48 L838,30 L806,54 L774,20 L742,46 L710,28 L678,52 L646,22 L614,48 L582,30 L550,54 L518,20 L486,46 L454,28 L422,52 L390,20 L358,44 L326,26 L294,50 L262,22 L230,48 L198,30 L166,52 L134,20 L102,46 L70,28 L38,50 L6,24 L0,30 Z"
          fill="var(--dark-bg)"
        />
      </svg>
    </div>
  );
}
