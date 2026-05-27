interface NavbarProps {
  active: string;
  onJump: (id: string) => void;
}

const SECTIONS = [
  { id: 'hero',       num: '01', label: 'Cover' },
  { id: 'philosophy', num: '02', label: 'Philosophy' },
  { id: 'projects',   num: '03', label: 'Work' },
  { id: 'experience', num: '04', label: 'CV' },
  { id: 'life',       num: '05', label: 'Life' },
  { id: 'contact',    num: '06', label: 'Contact' },
];

export { SECTIONS };

export default function Navbar({ active, onJump }: NavbarProps) {
  return (
    <nav className="navpill" aria-label="primary">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          className={active === s.id ? 'active' : ''}
          onClick={() => onJump(s.id)}
        >
          <span className="nav-num">{s.num}</span>
          {s.label}
        </button>
      ))}
    </nav>
  );
}
