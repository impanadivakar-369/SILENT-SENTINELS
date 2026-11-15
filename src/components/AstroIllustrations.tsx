import React from 'react';

/**
 * High-fidelity vintage ink & retro-futuristic space illustrations
 * inspired by the VOYAGER artwork (woodcut/engraved space style).
 */

interface IllustrationProps {
  className?: string;
}

// 1. FLOATING ASTRONAUT (Detailed retro spacesuit in zero-gravity)
export const FloatingAstronautSvg: React.FC<IllustrationProps> = ({ className = 'w-48 h-48' }) => (
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none drop-shadow-[4px_6px_0px_rgba(10,13,20,0.15)]`}
    aria-label="Floating retro astronaut"
  >
    {/* Life support backpack */}
    <rect
      x="54"
      y="62"
      width="44"
      height="66"
      rx="10"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="3"
    />
    <line x1="62" y1="74" x2="90" y2="74" stroke="#0A0D14" strokeWidth="2.5" />
    <line x1="62" y1="84" x2="90" y2="84" stroke="#0A0D14" strokeWidth="2" strokeDasharray="3 3" />
    <line x1="62" y1="94" x2="80" y2="94" stroke="#0A0D14" strokeWidth="2" />
    {/* Thruster nozzles */}
    <rect x="62" y="128" width="10" height="12" rx="3" fill="#0A0D14" />
    <rect x="80" y="128" width="10" height="12" rx="3" fill="#0A0D14" />

    {/* Umbilical hose coiled */}
    <path
      d="M54 90 C34 98, 28 126, 42 144 C52 156, 44 176, 26 184"
      stroke="#0A0D14"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="5 3"
      fill="none"
    />

    {/* Torso & Suit */}
    <path
      d="M84 76 C94 72, 134 72, 146 80 C156 88, 158 126, 150 146 C144 160, 106 162, 92 154 C82 146, 78 116, 84 76 Z"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="3.5"
    />

    {/* Chest control unit */}
    <rect
      x="100"
      y="90"
      width="34"
      height="38"
      rx="6"
      fill="#F4F4F6"
      stroke="#0A0D14"
      strokeWidth="2.5"
    />
    <circle cx="110" cy="102" r="4" fill="#0A0D14" />
    <circle cx="124" cy="102" r="3.5" fill="#FFFFFF" stroke="#0A0D14" strokeWidth="2" />
    <line x1="106" y1="116" x2="128" y2="116" stroke="#0A0D14" strokeWidth="2.5" />
    <line x1="106" y1="122" x2="122" y2="122" stroke="#0A0D14" strokeWidth="2" />

    {/* Accordion joint lines on torso */}
    <path d="M96 142 Q118 152 138 144" stroke="#0A0D14" strokeWidth="2" fill="none" />
    <path d="M98 148 Q118 158 134 150" stroke="#0A0D14" strokeWidth="2" fill="none" />

    {/* Helmet & Visor */}
    <circle cx="128" cy="54" r="28" fill="#FFFFFF" stroke="#0A0D14" strokeWidth="3.5" />
    {/* Visor shield */}
    <path
      d="M116 38 C136 34, 150 42, 152 56 C154 70, 138 74, 120 72 C110 70, 106 58, 110 46 C112 42, 114 40, 116 38 Z"
      fill="#0A0D14"
    />
    {/* Visor reflection glint */}
    <path
      d="M120 42 C134 38, 144 44, 146 52"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="145" cy="56" r="2" fill="#FFFFFF" />

    {/* Left Arm & Glove (Reaching outward in greeting/floating) */}
    <path
      d="M144 84 C164 80, 186 92, 196 110 C200 118, 194 128, 186 126 C178 124, 168 114, 154 108"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="3"
    />
    {/* Glove cuff & fingers */}
    <rect
      x="192"
      y="110"
      width="16"
      height="18"
      rx="5"
      transform="rotate(25 192 110)"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="2.5"
    />
    <path
      d="M204 116 C214 118, 218 124, 212 130 C208 134, 202 130, 200 126"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="2"
    />

    {/* Right Arm (Tucked near chest) */}
    <path
      d="M84 86 C74 96, 68 112, 74 126 C76 132, 86 134, 88 128 C90 122, 90 110, 96 102"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="3"
    />
    <circle cx="78" cy="132" r="7" fill="#FFFFFF" stroke="#0A0D14" strokeWidth="2.5" />

    {/* Left Leg & Boot */}
    <path
      d="M136 156 C152 170, 168 190, 178 206 C182 214, 172 224, 162 220 C152 216, 140 196, 126 178"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="3"
    />
    {/* Boot */}
    <path
      d="M166 214 L184 218 C192 220, 192 230, 184 230 L160 228 C154 228, 154 220, 160 216 Z"
      fill="#0A0D14"
    />

    {/* Right Leg & Boot */}
    <path
      d="M102 160 C100 178, 104 200, 110 216 C112 222, 102 228, 96 224 C90 220, 88 198, 90 174"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="3"
    />
    <path
      d="M100 220 L116 224 C122 226, 122 234, 114 234 L92 232 C88 232, 88 224, 94 220 Z"
      fill="#0A0D14"
    />

    {/* Hatching / Engraving line accents on legs and body */}
    <line x1="144" y1="172" x2="152" y2="168" stroke="#0A0D14" strokeWidth="1.5" />
    <line x1="148" y1="180" x2="158" y2="176" stroke="#0A0D14" strokeWidth="1.5" />
    <line x1="154" y1="190" x2="164" y2="186" stroke="#0A0D14" strokeWidth="1.5" />
    <line x1="102" y1="182" x2="108" y2="180" stroke="#0A0D14" strokeWidth="1.5" />
    <line x1="103" y1="192" x2="110" y2="190" stroke="#0A0D14" strokeWidth="1.5" />
  </svg>
);

// 2. RINGED SATURN WITH COSMIC APERTURE (Engraved planetary rings)
export const RingedSaturnPortalSvg: React.FC<IllustrationProps> = ({ className = 'w-44 h-44' }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none drop-shadow-[4px_6px_0px_rgba(10,13,20,0.15)]`}
    aria-label="Ringed planet portal"
  >
    {/* Deep space black organic aperture */}
    <path
      d="M140 24 C184 40, 196 96, 186 142 C176 182, 122 194, 82 186 C42 178, 16 136, 22 92 C28 46, 88 10, 140 24 Z"
      fill="#0A0D14"
    />

    {/* Distant stars inside portal */}
    <circle cx="50" cy="60" r="2" fill="#FFFFFF" />
    <circle cx="160" cy="50" r="1.5" fill="#FFFFFF" />
    <circle cx="70" cy="154" r="2" fill="#FFFFFF" />
    <circle cx="150" cy="156" r="1.5" fill="#FFFFFF" />
    <path d="M54 110 L56 114 L60 116 L56 118 L54 122 L52 118 L48 116 L52 114 Z" fill="#FFFFFF" />
    <path d="M148 38 L149 41 L152 42 L149 43 L148 46 L147 43 L144 42 L147 41 Z" fill="#FFFFFF" />

    {/* Back half of Saturn's concentric rings */}
    <g stroke="#FFFFFF" strokeWidth="2.5" fill="none">
      <ellipse cx="106" cy="98" rx="84" ry="24" strokeDasharray="300" strokeDashoffset="150" strokeWidth="3" />
      <ellipse cx="106" cy="98" rx="74" ry="20" strokeDasharray="300" strokeDashoffset="150" strokeWidth="2" />
      <ellipse cx="106" cy="98" rx="64" ry="16" strokeDasharray="300" strokeDashoffset="150" strokeWidth="1.5" />
    </g>

    {/* Saturn Planet Sphere with Woodcut Engraved Latitudinal Bands */}
    <circle cx="106" cy="98" r="42" fill="#FFFFFF" stroke="#0A0D14" strokeWidth="3" />
    {/* Latitudinal Cloud Bands */}
    <path d="M68 86 C88 92, 124 92, 144 86" stroke="#0A0D14" strokeWidth="2" fill="none" />
    <path d="M66 94 C86 100, 126 100, 146 94" stroke="#0A0D14" strokeWidth="2.5" fill="none" />
    <path d="M68 102 C88 108, 124 108, 144 102" stroke="#0A0D14" strokeWidth="2" fill="none" />
    <path d="M72 112 C90 118, 122 118, 140 112" stroke="#0A0D14" strokeWidth="2.5" fill="none" />
    <path d="M78 122 C94 126, 118 126, 134 122" stroke="#0A0D14" strokeWidth="2" fill="none" />

    {/* Front half of Saturn's concentric rings (Passing in front of the sphere) */}
    <g stroke="#0A0D14" fill="none">
      {/* Outer ring */}
      <path d="M22 98 C22 112, 60 122, 106 122 C152 122, 190 112, 190 98" strokeWidth="4" />
      {/* Middle ring */}
      <path d="M32 98 C32 110, 65 118, 106 118 C147 118, 180 110, 180 98" strokeWidth="2.5" />
      {/* Inner ring */}
      <path d="M42 98 C42 107, 71 114, 106 114 C141 114, 170 107, 170 98" strokeWidth="2" />
    </g>
  </svg>
);

// 3. RETRO FLYING SAUCER / UFO (With downward light beam)
export const FlyingSaucerUfoSvg: React.FC<IllustrationProps> = ({ className = 'w-40 h-40' }) => (
  <svg
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none drop-shadow-[4px_6px_0px_rgba(10,13,20,0.15)]`}
    aria-label="Retro UFO flying saucer"
  >
    {/* Light cone beam emitted downwards */}
    <polygon
      points="72,82 108,82 148,172 32,172"
      fill="#0A0D14"
      fillOpacity="0.08"
      stroke="#0A0D14"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
    <line x1="60" y1="120" x2="60" y2="150" stroke="#0A0D14" strokeWidth="1.5" strokeDasharray="3 3" />
    <line x1="90" y1="100" x2="90" y2="165" stroke="#0A0D14" strokeWidth="2" strokeDasharray="4 4" />
    <line x1="120" y1="120" x2="120" y2="150" stroke="#0A0D14" strokeWidth="1.5" strokeDasharray="3 3" />

    {/* Cockpit Dome */}
    <path
      d="M64 56 C64 40, 75 30, 90 30 C105 30, 116 40, 116 56 Z"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="3"
    />
    {/* Alien shadow inside cockpit */}
    <circle cx="90" cy="48" r="6" fill="#0A0D14" />
    <ellipse cx="90" cy="58" rx="8" ry="4" fill="#0A0D14" />

    {/* Upper Saucer Hull */}
    <ellipse cx="90" cy="62" rx="64" ry="16" fill="#FFFFFF" stroke="#0A0D14" strokeWidth="3.5" />

    {/* Concentric Rim & Portholes */}
    <ellipse cx="90" cy="68" rx="72" ry="12" fill="#0A0D14" />
    <circle cx="34" cy="68" r="3.5" fill="#FFFFFF" />
    <circle cx="52" cy="71" r="3.5" fill="#FFFFFF" />
    <circle cx="72" cy="72" r="4" fill="#FFFFFF" />
    <circle cx="90" cy="73" r="4.5" fill="#FFFFFF" />
    <circle cx="108" cy="72" r="4" fill="#FFFFFF" />
    <circle cx="128" cy="71" r="3.5" fill="#FFFFFF" />
    <circle cx="146" cy="68" r="3.5" fill="#FFFFFF" />

    {/* Underside thruster core */}
    <path
      d="M70 76 C70 86, 110 86, 110 76 Z"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="2.5"
    />
    <circle cx="90" cy="80" r="4" fill="#0A0D14" />
  </svg>
);

// 4. FRIENDLY RETRO ALIEN (Waving hand, big cosmic eyes)
export const FriendlyAlienSvg: React.FC<IllustrationProps> = ({ className = 'w-36 h-48' }) => (
  <svg
    viewBox="0 0 140 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none drop-shadow-[4px_6px_0px_rgba(10,13,20,0.15)]`}
    aria-label="Friendly retro alien"
  >
    {/* Antenna */}
    <line x1="70" y1="36" x2="70" y2="18" stroke="#0A0D14" strokeWidth="2.5" />
    <circle cx="70" cy="14" r="5" fill="#0A0D14" />

    {/* Oversized Cranium / Head */}
    <path
      d="M42 56 C36 34, 52 24, 70 24 C88 24, 104 34, 98 56 C94 72, 82 82, 70 82 C58 82, 46 72, 42 56 Z"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="3"
    />

    {/* Big almond eyes */}
    <ellipse cx="56" cy="52" rx="9" ry="14" transform="rotate(-15 56 52)" fill="#0A0D14" />
    <circle cx="58" cy="48" r="3" fill="#FFFFFF" />

    <ellipse cx="84" cy="52" rx="9" ry="14" transform="rotate(15 84 52)" fill="#0A0D14" />
    <circle cx="82" cy="48" r="3" fill="#FFFFFF" />

    {/* Small smile */}
    <path d="M66 70 Q70 74 74 70" stroke="#0A0D14" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Slender Body */}
    <path
      d="M62 82 C56 94, 54 130, 58 148 C64 152, 76 152, 82 148 C86 130, 84 94, 78 82 Z"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="3"
    />

    {/* Right Hand Waving Upwards */}
    <path
      d="M78 92 C92 90, 104 80, 108 64 C110 58, 116 60, 114 66 C110 82, 98 98, 80 102"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="2.5"
    />
    {/* 3 Fingers waving */}
    <circle cx="114" cy="58" r="3" fill="#0A0D14" />
    <circle cx="109" cy="55" r="2.5" fill="#0A0D14" />
    <circle cx="118" cy="63" r="2.5" fill="#0A0D14" />

    {/* Left Arm at side */}
    <path
      d="M62 92 C50 96, 42 110, 44 126 C46 130, 52 130, 52 124 C50 112, 56 102, 60 98"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="2.5"
    />

    {/* Legs & Feet */}
    <path
      d="M62 148 L58 184 L46 186 C42 186, 42 192, 48 192 L66 192 C70 192, 70 184, 68 180 L70 148"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="2.5"
    />
    <path
      d="M72 148 L74 180 C72 184, 72 192, 76 192 L94 192 C100 192, 100 186, 96 186 L84 184 L80 148"
      fill="#FFFFFF"
      stroke="#0A0D14"
      strokeWidth="2.5"
    />
  </svg>
);

// 5. CRATERED MOON IN COSMIC PEBBLE (With detailed craters)
export const CrateredMoonPortalSvg: React.FC<IllustrationProps> = ({ className = 'w-36 h-36' }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none drop-shadow-[4px_6px_0px_rgba(10,13,20,0.15)]`}
    aria-label="Cratered moon in space portal"
  >
    {/* Dark organic droplet/blob */}
    <path
      d="M26 94 C18 52, 54 20, 96 22 C134 24, 150 62, 144 104 C138 142, 94 154, 56 146 C28 140, 32 120, 26 94 Z"
      fill="#0A0D14"
    />
    <circle cx="130" cy="46" r="1.5" fill="#FFFFFF" />
    <circle cx="44" cy="42" r="2" fill="#FFFFFF" />
    <circle cx="120" cy="132" r="1.5" fill="#FFFFFF" />

    {/* Moon sphere */}
    <circle cx="82" cy="88" r="44" fill="#FFFFFF" stroke="#0A0D14" strokeWidth="3" />

    {/* Detailed Craters */}
    {/* Crater 1 (Big) */}
    <circle cx="70" cy="74" r="14" fill="#F4F4F6" stroke="#0A0D14" strokeWidth="2.5" />
    <ellipse cx="68" cy="72" rx="10" ry="7" fill="#0A0D14" fillOpacity="0.15" />
    <circle cx="68" cy="72" r="4" fill="#0A0D14" />

    {/* Crater 2 */}
    <circle cx="98" cy="70" r="9" fill="#F4F4F6" stroke="#0A0D14" strokeWidth="2" />
    <circle cx="97" cy="69" r="3" fill="#0A0D14" />

    {/* Crater 3 */}
    <circle cx="76" cy="108" r="11" fill="#F4F4F6" stroke="#0A0D14" strokeWidth="2.5" />
    <circle cx="74" cy="106" r="3.5" fill="#0A0D14" />

    {/* Crater 4 */}
    <circle cx="104" cy="98" r="7" fill="#F4F4F6" stroke="#0A0D14" strokeWidth="1.8" />
    <circle cx="103" cy="97" r="2" fill="#0A0D14" />

    {/* Micro craters */}
    <circle cx="56" cy="94" r="3" fill="#0A0D14" />
    <circle cx="88" cy="60" r="2.5" fill="#0A0D14" />
    <circle cx="114" cy="82" r="2.5" fill="#0A0D14" />
    <circle cx="94" cy="118" r="3" fill="#0A0D14" />
  </svg>
);

// 6. RETRO VINTAGE TELESCOPE ON TRIPOD
export const RetroTelescopeSvg: React.FC<IllustrationProps> = ({ className = 'w-36 h-36' }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none drop-shadow-[3px_4px_0px_rgba(10,13,20,0.15)]`}
    aria-label="Vintage astronomical telescope"
  >
    {/* Telescope Optical Tube Assembly (Angled looking up at 30 deg) */}
    <g transform="rotate(-28 75 75)">
      {/* Main Tube */}
      <rect x="25" y="65" width="90" height="20" rx="3" fill="#FFFFFF" stroke="#0A0D14" strokeWidth="3" />
      {/* Dew Shield / Objective lens ring */}
      <rect x="110" y="62" width="16" height="26" rx="4" fill="#0A0D14" />
      <line x1="126" y1="64" x2="126" y2="86" stroke="#FFFFFF" strokeWidth="2" />
      {/* Eyepiece assembly */}
      <rect x="15" y="70" width="12" height="10" rx="2" fill="#0A0D14" />
      <rect x="8" y="68" width="8" height="14" rx="2" fill="#FFFFFF" stroke="#0A0D14" strokeWidth="2" />
      {/* Finder Scope mounted on top */}
      <rect x="55" y="52" width="36" height="8" rx="2" fill="#FFFFFF" stroke="#0A0D14" strokeWidth="2" />
      <line x1="65" y1="60" x2="65" y2="65" stroke="#0A0D14" strokeWidth="2.5" />
      <line x1="82" y1="60" x2="82" y2="65" stroke="#0A0D14" strokeWidth="2.5" />
      {/* Tube mounting ring */}
      <rect x="68" y="64" width="14" height="22" rx="2" fill="#0A0D14" />
    </g>

    {/* Equatorial Mount & Altitude Axis */}
    <circle cx="75" cy="78" r="8" fill="#FFFFFF" stroke="#0A0D14" strokeWidth="3" />
    <circle cx="75" cy="78" r="3" fill="#0A0D14" />
    <rect x="71" y="86" width="8" height="16" rx="2" fill="#0A0D14" />

    {/* Tripod Legs */}
    {/* Center leg */}
    <line x1="75" y1="98" x2="75" y2="152" stroke="#0A0D14" strokeWidth="3" strokeLinecap="round" />
    {/* Left leg */}
    <line x1="73" y1="98" x2="38" y2="152" stroke="#0A0D14" strokeWidth="3" strokeLinecap="round" />
    {/* Right leg */}
    <line x1="77" y1="98" x2="112" y2="152" stroke="#0A0D14" strokeWidth="3" strokeLinecap="round" />

    {/* Tripod Spreader bar */}
    <line x1="48" y1="126" x2="102" y2="126" stroke="#0A0D14" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 7. SLEEK RETRO ROCKET / SPACESHIP (Cruising diagonally)
export const RetroSpaceshipSvg: React.FC<IllustrationProps> = ({ className = 'w-36 h-36' }) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} select-none drop-shadow-[4px_6px_0px_rgba(10,13,20,0.15)]`}
    aria-label="Retro rocket spaceship"
  >
    {/* Exhaust flame & speed dashes */}
    <path
      d="M48 112 C36 124, 28 140, 22 148 C30 142, 46 134, 58 122 Z"
      fill="#0A0D14"
    />
    <line x1="16" y1="154" x2="8" y2="162" stroke="#0A0D14" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="148" x2="18" y2="160" stroke="#0A0D14" strokeWidth="2" strokeLinecap="round" />

    {/* Rocket Main Hull (Angled at 45 deg) */}
    <g transform="rotate(-45 80 80)">
      {/* Rocket Fins */}
      {/* Left Fin */}
      <path d="M60 100 L44 124 L64 116 Z" fill="#0A0D14" />
      {/* Right Fin */}
      <path d="M100 100 L116 124 L96 116 Z" fill="#0A0D14" />
      {/* Center Fin */}
      <rect x="77" y="102" width="6" height="20" rx="2" fill="#0A0D14" />

      {/* Main Bullet Hull */}
      <path
        d="M60 110 C58 80, 68 40, 80 20 C92 40, 102 80, 100 110 Z"
        fill="#FFFFFF"
        stroke="#0A0D14"
        strokeWidth="3.5"
      />

      {/* Nose Cone Tip */}
      <path d="M72 40 C76 30, 80 22, 80 20 C80 22, 84 30, 88 40 Z" fill="#0A0D14" />

      {/* Circular Porthole Window */}
      <circle cx="80" cy="62" r="10" fill="#FFFFFF" stroke="#0A0D14" strokeWidth="3" />
      <circle cx="80" cy="62" r="6" fill="#0A0D14" />
      <circle cx="78" cy="60" r="2" fill="#FFFFFF" />

      {/* Racing Stripe */}
      <line x1="62" y1="88" x2="98" y2="88" stroke="#0A0D14" strokeWidth="3" />
      <line x1="64" y1="94" x2="96" y2="94" stroke="#0A0D14" strokeWidth="2" />
    </g>
  </svg>
);
