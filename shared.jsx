// shared.jsx — Phone wrapper + reusable bits for all 3 variations

const { useState, useEffect, useRef } = React;

// ─── Minimal phone shell (lighter than IOSDevice for tighter canvas) ──
function Phone({ children, dark = false, bg, w = 360, h = 780 }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 44,
        overflow: 'hidden',
        position: 'relative',
        background: bg || (dark ? '#0A1320' : '#F2F4F7'),
        boxShadow: '0 30px 70px rgba(15,30,50,0.18), 0 0 0 1px rgba(15,30,50,0.10)',
        fontFamily: "'Pretendard Variable', Pretendard, system-ui, sans-serif",
        WebkitFontSmoothing: 'antialiased',
        color: dark ? '#E8F0F7' : '#0D2844',
      }}
    >
      {/* dynamic island */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 110,
          height: 32,
          borderRadius: 22,
          background: '#000',
          zIndex: 50,
        }}
      />
      {/* status bar */}
      <PhoneStatus dark={dark} />
      {/* content area */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          paddingTop: 50,
          paddingBottom: 24,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </div>
      {/* home indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          height: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingBottom: 7,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: 124,
            height: 4,
            borderRadius: 100,
            background: dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,30,55,0.30)',
          }}
        />
      </div>
    </div>
  );
}

function PhoneStatus({ dark }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 28px 0',
        fontFamily: '-apple-system, "SF Pro", system-ui',
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 600, color: c }}>9:41</span>
      <span style={{ display: 'flex', gap: 5, alignItems: 'center', color: c }}>
        <svg width="16" height="10" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c} />
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c} />
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c} />
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c} />
        </svg>
        <svg width="22" height="11" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3" stroke={c} strokeOpacity="0.4" fill="none" />
          <rect x="2" y="2" width="20" height="9" rx="1.5" fill={c} />
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.45" />
        </svg>
      </span>
    </div>
  );
}

// ─── Snow particle field ──
function SnowField({ count = 30, color = 'rgba(125,180,221,0.55)', sizes = [2,3,4] }) {
  const flakes = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const sz = sizes[i % sizes.length];
      return {
        left: Math.random() * 100,
        size: sz,
        dur: 8 + Math.random() * 14,
        delay: -Math.random() * 18,
        dx: (Math.random() - 0.5) * 30,
        op: 0.35 + Math.random() * 0.55,
      };
    });
  }, [count]);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', color }}>
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snow-flake"
          style={{
            left: f.left + '%',
            width: f.size,
            height: f.size,
            '--snow-dur': f.dur + 's',
            '--snow-delay': f.delay + 's',
            '--snow-dx': f.dx + 'px',
            '--snow-op': f.op,
          }}
        />
      ))}
    </div>
  );
}

// ─── Pixel art renderer ──
// pattern: 2D array of strings: ' ' = empty, char = fill color from palette
function PixelArt({ pattern, palette, scale = 4 }) {
  const rows = pattern.length;
  const cols = pattern[0].length;
  return (
    <div
      className="pixel-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, ${scale}px)`,
        gridTemplateRows: `repeat(${rows}, ${scale}px)`,
        width: cols * scale,
        height: rows * scale,
      }}
    >
      {pattern.flatMap((row, y) =>
        [...row].map((ch, x) => (
          <div
            key={`${x},${y}`}
            style={{
              background: ch === ' ' || ch === '.' ? 'transparent' : palette[ch] || 'transparent',
            }}
          />
        ))
      )}
    </div>
  );
}

// Snowball pixel pattern (16x16) — outline + shaded
const SNOWBALL_16 = [
  '.....OOOOOOO....',
  '...OOWWWWWWWOO..',
  '..OWWWWWWWWWWOO.',
  '.OWWWWWWWWWWWWO.',
  '.OWWWWWHHWWWWWO.',
  'OWWWWHWWWWWWWLLO',
  'OWWHWWWWWWWWWLLO',
  'OWWWWWWWWWWWWLLO',
  'OWWWWWWWWWWWWLLO',
  'OWWWWWWWWWWWLLLO',
  'OWWWWWWWWWWLLLLO',
  '.OWWWWWWWWLLLLO.',
  '.OWWWWWWWLLLLLO.',
  '..OWWWWLLLLLLO..',
  '...OOLLLLLLOO...',
  '.....OOOOOOO....',
];

// ─── Bottom-of-frame primary CTA (full width pill) ──
function PrimaryCTA({ children, onClick, theme = 'navy', disabled }) {
  const themes = {
    navy: { bg: '#0D2844', fg: '#fff' },
    ice:  { bg: '#7DB4DD', fg: '#0D2844' },
    dark: { bg: '#88D0FF', fg: '#0A1320' },
    out:  { bg: 'transparent', fg: '#0D2844', border: '1.5px solid rgba(13,40,68,0.18)' },
  };
  const t = themes[theme] || themes.navy;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        height: 54,
        borderRadius: 16,
        background: t.bg,
        color: t.fg,
        border: t.border || 'none',
        fontSize: 16,
        fontWeight: 600,
        fontFamily: "'Pretendard Variable', Pretendard, system-ui",
        letterSpacing: '-0.01em',
        opacity: disabled ? 0.4 : 1,
        transition: 'transform .12s, box-shadow .12s, opacity .2s',
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.985)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {children}
    </button>
  );
}

// ─── Step indicator ──
function StepDots({ n, active, theme = 'navy' }) {
  const palette = {
    navy: { on: '#0D2844', off: 'rgba(13,40,68,0.16)' },
    ice:  { on: '#7DB4DD', off: 'rgba(125,180,221,0.25)' },
    dark: { on: '#88D0FF', off: 'rgba(136,208,255,0.22)' },
  };
  const p = palette[theme] || palette.navy;
  return (
    <div className="dots">
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className="dot"
          style={{
            background: i === active ? p.on : p.off,
            width: i === active ? 18 : 6,
            borderRadius: i === active ? 3 : 999,
          }}
        />
      ))}
    </div>
  );
}

Object.assign(window, {
  Phone,
  SnowField,
  PixelArt,
  PrimaryCTA,
  StepDots,
  SNOWBALL_16,
});
