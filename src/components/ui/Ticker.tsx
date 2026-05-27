interface TickerProps {
  items: string[];
  className?: string;
}

export default function Ticker({ items, className = '' }: TickerProps) {
  const half = items.map((t, i) => (
    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
      {t}
      <span className="dot">●</span>
    </span>
  ));
  return (
    <div className={`ticker ${className}`}>
      <div className="ticker-track">
        <span>{half}</span>
        <span>{half}</span>
      </div>
    </div>
  );
}
