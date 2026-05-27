interface ScrollIndicatorProps {
  progress: number;
  activeIdx: number;
  sections: { num: string; label: string }[];
}

export default function ScrollIndicator({ progress, activeIdx, sections }: ScrollIndicatorProps) {
  const railH = 200;
  return (
    <div className="scroll-ind" aria-hidden="true">
      <div className="si-num">{sections[activeIdx].num}</div>
      <div>/ {String(sections.length).padStart(2, '0')}</div>
      <div className="si-rail">
        <div className="si-prog" style={{ height: `${Math.max(6, progress * railH)}px` }} />
      </div>
      <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.3em' }}>
        {sections[activeIdx].label}
      </div>
    </div>
  );
}
