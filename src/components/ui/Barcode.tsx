interface BarcodeProps {
  sku?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Barcode({ sku = 'SKU-SHIVAMDHAR-2005', width = 220, height = 38, className = '' }: BarcodeProps) {
  const seed = sku.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  let rng = seed;
  const rand = () => { rng = (rng * 9301 + 49297) % 233280; return rng / 233280; };
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  while (x < width - 2) {
    const w = 1 + Math.floor(rand() * 3);
    const isBar = rand() > 0.32;
    if (isBar) bars.push({ x, w });
    x += w + 1;
  }
  return (
    <div className={`barcode ${className}`}>
      <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y={0} width={b.w} height={height} fill="#1a1a1a" />
        ))}
      </svg>
      <span className="sku">{sku}</span>
    </div>
  );
}
