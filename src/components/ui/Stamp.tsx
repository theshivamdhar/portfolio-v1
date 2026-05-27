interface StampProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  angle?: number;
  color?: string;
}

export default function Stamp({ children, size = 'md', angle = -6, color }: StampProps) {
  const cls = size === 'lg' ? 'stamp stamp-lg' : size === 'sm' ? 'stamp stamp-sm' : 'stamp';
  return (
    <span
      className={cls}
      style={{
        transform: `rotate(${angle}deg)`,
        color: color || undefined,
        borderColor: color || undefined,
      }}
    >
      <span>{children}</span>
    </span>
  );
}
