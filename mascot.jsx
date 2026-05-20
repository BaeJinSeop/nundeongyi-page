// mascot.jsx — 눈덩이 마스코트 (앱 아이콘 기반)
// 솜뭉치 모양 + 점 두 개 + 미소.
// size, mood, accent를 props로.

function Mascot({ size = 130, mood = 'happy', shadow = true, palette = 'light', blush = true, id }) {
  const P = {
    light: { body: '#FFFFFF', shade: '#CFE0EE', highlight: '#FFFFFF', face: '#0D2844', blush: '#FFC2D1' },
    cream: { body: '#FAF6EF', shade: '#E5DECE', highlight: '#FFFFFF', face: '#2A2520', blush: '#F5B7B0' },
    ice:   { body: '#E8F2FB', shade: '#9EC3E1', highlight: '#FFFFFF', face: '#0D2844', blush: '#FFBFCE' },
  }[palette];

  // Stable per-instance suffix so SVG defs don't collide when multiple
  // Mascots render at once (otherwise they all share the first instance's
  // gradient).
  const uid = React.useMemo(() => id || 'm' + Math.random().toString(36).slice(2, 8), [id]);

  // Eye geometry — big and round for cuteness, with a highlight dot
  const eyeY = 122;
  const lEyeX = 90;
  const rEyeX = 150;
  const eyeR = 14;

  // Mouth: tiny, soft, slightly higher than before
  const mouth = {
    happy: 'M 108 150 Q 120 160 132 150',
    sleepy: 'M 110 154 Q 120 156 130 154',
    surprised: '',
    smile: 'M 110 152 Q 120 158 130 152',
  }[mood];

  return (
    <svg width={size} height={size} viewBox="0 0 240 240" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`mb-${uid}`} cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor={P.highlight} />
          <stop offset="55%" stopColor={P.body} />
          <stop offset="100%" stopColor={P.shade} />
        </radialGradient>
        <radialGradient id={`blush-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={P.blush} stopOpacity="0.85" />
          <stop offset="70%" stopColor={P.blush} stopOpacity="0.35" />
          <stop offset="100%" stopColor={P.blush} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft shadow under the body */}
      {shadow && (
        <ellipse cx="120" cy="218" rx="58" ry="5.5" fill="#0D2844" opacity="0.10" />
      )}

      {/* Cloud-like body — chunkier, rounder puffs for a plumper look */}
      <g>
        <circle cx="66"  cy="108" r="44" fill={`url(#mb-${uid})`} />
        <circle cx="174" cy="108" r="44" fill={`url(#mb-${uid})`} />
        <circle cx="120" cy="70"  r="46" fill={`url(#mb-${uid})`} />
        <circle cx="54"  cy="150" r="38" fill={`url(#mb-${uid})`} />
        <circle cx="186" cy="148" r="40" fill={`url(#mb-${uid})`} />
        <circle cx="86"  cy="178" r="36" fill={`url(#mb-${uid})`} />
        <circle cx="154" cy="180" r="36" fill={`url(#mb-${uid})`} />
        <circle cx="120" cy="146" r="56" fill={`url(#mb-${uid})`} />
      </g>

      {/* Top rim light — slightly bigger, softer */}
      <ellipse cx="116" cy="50" rx="50" ry="7" fill={P.highlight} opacity="0.6" />

      {/* Blush — rosy cheek dots that read as cuteness */}
      {blush && (
        <>
          <ellipse cx="70" cy="142" rx="14" ry="9" fill={`url(#blush-${uid})`} />
          <ellipse cx="170" cy="142" rx="14" ry="9" fill={`url(#blush-${uid})`} />
        </>
      )}

      {/* Eyes — large, rounder, with a sparkle */}
      {mood === 'sleepy' ? (
        <>
          {/* closed eyes — gentle arcs */}
          <path d={`M ${lEyeX - 10} ${eyeY + 2} Q ${lEyeX} ${eyeY - 8} ${lEyeX + 10} ${eyeY + 2}`}
                stroke={P.face} strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d={`M ${rEyeX - 10} ${eyeY + 2} Q ${rEyeX} ${eyeY - 8} ${rEyeX + 10} ${eyeY + 2}`}
                stroke={P.face} strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx={lEyeX} cy={eyeY} rx={eyeR * 0.85} ry={eyeR} fill={P.face} />
          <ellipse cx={rEyeX} cy={eyeY} rx={eyeR * 0.85} ry={eyeR} fill={P.face} />
          {/* sparkle highlights */}
          <ellipse cx={lEyeX - 3} cy={eyeY - 4} rx="3.2" ry="4" fill="#FFFFFF" />
          <ellipse cx={rEyeX - 3} cy={eyeY - 4} rx="3.2" ry="4" fill="#FFFFFF" />
          {/* tiny secondary glint */}
          <circle cx={lEyeX + 5} cy={eyeY + 5} r="1.4" fill="#FFFFFF" opacity="0.8" />
          <circle cx={rEyeX + 5} cy={eyeY + 5} r="1.4" fill="#FFFFFF" opacity="0.8" />
        </>
      )}

      {/* Mouth — soft, gently smaller */}
      {mood === 'surprised' ? (
        <ellipse cx="120" cy="154" rx="5" ry="7" fill={P.face} />
      ) : (
        <path d={mouth} stroke={P.face} strokeWidth="4.5" strokeLinecap="round" fill="none" />
      )}
    </svg>
  );
}

// ─── A "trail" of mascots that get bigger — for the value screen ──
function MascotTrail({ count = 5, palette = 'light' }) {
  const sizes = [];
  for (let i = 0; i < count; i++) {
    sizes.push(28 + i * 14);
  }
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
      {sizes.map((s, i) => (
        <div key={i} style={{ opacity: 0.4 + (i / (count - 1)) * 0.6 }}>
          <Mascot size={s} shadow={false} palette={palette} mood="happy" />
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Mascot, MascotTrail });
