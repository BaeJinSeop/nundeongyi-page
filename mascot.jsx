// mascot.jsx — 눈덩이 마스코트 (앱 mascot_widget.dart와 동기화)
// 구름형 6-circle 바디, 큰 타원 눈, 볼터치, 그림자.

function Mascot({ size = 130, mood = 'happy', shadow = true, palette = 'light', blush = true, id }) {
  const P = {
    light: { body: '#FFFFFF', shade: '#CFE0EE', highlight: '#FFFFFF', face: '#0D2844', blush: '#FFC2D1' },
    cream: { body: '#FAF6EF', shade: '#E5DECE', highlight: '#FFFFFF', face: '#2A2520', blush: '#F5B7B0' },
    ice:   { body: '#E8F2FB', shade: '#9EC3E1', highlight: '#FFFFFF', face: '#0D2844', blush: '#FFBFCE' },
  }[palette];

  const uid = React.useMemo(() => id || 'm' + Math.random().toString(36).slice(2, 8), [id]);

  // Eye geometry
  const eyeY = 118;
  const lEyeX = 92;
  const rEyeX = 148;

  // Mouth paths
  const mouth = {
    happy:     'M 107 150 Q 120 161 133 150',
    sleepy:    'M 110 152 Q 120 154 130 152',
    surprised: '',
    smile:     'M 110 150 Q 120 157 130 150',
  }[mood];

  return (
    <svg width={size} height={size} viewBox="0 0 240 240" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`mb-${uid}`} cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor={P.highlight} />
          <stop offset="58%" stopColor={P.body} />
          <stop offset="100%" stopColor={P.shade} />
        </radialGradient>
        <radialGradient id={`blush-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={P.blush} stopOpacity="0.90" />
          <stop offset="70%" stopColor={P.blush} stopOpacity="0.35" />
          <stop offset="100%" stopColor={P.blush} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      {shadow && (
        <ellipse cx="120" cy="214" rx="58" ry="5.5" fill="#0D2844" opacity="0.10" />
      )}

      {/* Cloud body — 6 circles */}
      <g>
        <circle cx="74"  cy="112" r="48" fill={`url(#mb-${uid})`} />
        <circle cx="166" cy="112" r="48" fill={`url(#mb-${uid})`} />
        <circle cx="120" cy="74"  r="50" fill={`url(#mb-${uid})`} />
        <circle cx="86"  cy="166" r="42" fill={`url(#mb-${uid})`} />
        <circle cx="154" cy="166" r="42" fill={`url(#mb-${uid})`} />
        <circle cx="120" cy="132" r="60" fill={`url(#mb-${uid})`} />
      </g>

      {/* Blush */}
      {blush && (
        <>
          <ellipse cx="70"  cy="138" rx="15" ry="10" fill={`url(#blush-${uid})`} />
          <ellipse cx="170" cy="138" rx="15" ry="10" fill={`url(#blush-${uid})`} />
        </>
      )}

      {/* Eyes */}
      {mood === 'sleepy' ? (
        <>
          <path d={`M ${lEyeX - 10} ${eyeY + 2} Q ${lEyeX} ${eyeY - 8} ${lEyeX + 10} ${eyeY + 2}`}
                stroke={P.face} strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d={`M ${rEyeX - 10} ${eyeY + 2} Q ${rEyeX} ${eyeY - 8} ${rEyeX + 10} ${eyeY + 2}`}
                stroke={P.face} strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx={lEyeX} cy={eyeY} rx="12.5" ry="15" fill={P.face} />
          <ellipse cx={rEyeX} cy={eyeY} rx="12.5" ry="15" fill={P.face} />
          {/* sparkle highlights */}
          <ellipse cx={lEyeX - 3.5} cy={eyeY - 5} rx="3.6" ry="4.6" fill="#FFFFFF" />
          <ellipse cx={rEyeX - 3.5} cy={eyeY - 5} rx="3.6" ry="4.6" fill="#FFFFFF" />
        </>
      )}

      {/* Mouth */}
      {mood === 'surprised' ? (
        <ellipse cx="120" cy="152" rx="5" ry="7" fill={P.face} />
      ) : (
        <path d={mouth} stroke={P.face} strokeWidth="4.5" strokeLinecap="round" fill="none" />
      )}
    </svg>
  );
}

// A "trail" of mascots that get bigger — for the value screen
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
