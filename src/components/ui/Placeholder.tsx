interface PlaceholderProps {
  label: string;
  tone?: 'default' | 'warm' | 'crimson';
  style?: React.CSSProperties;
}

export default function Placeholder({ label, tone = 'default', style }: PlaceholderProps) {
  const cls = tone === 'warm' ? 'placeholder warm' : tone === 'crimson' ? 'placeholder crimson' : 'placeholder';
  return (
    <div className={cls} style={style}>
      <span className="ph-label">{label}</span>
    </div>
  );
}
