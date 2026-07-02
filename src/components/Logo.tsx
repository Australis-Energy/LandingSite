import { useId } from 'react';

type LogoProps = {
  className?: string;
  /** Pass a solid color (e.g. "white") to render as a flat mark instead of the brand gradient — used on dark backgrounds. */
  color?: string;
};

/**
 * Australis mark — one continuous sheared-rectangle band with rounded knees
 * on the diagonals. Geometry extracted from the brand vector embedded in
 * public/assets/brand/favicon.svg (translated by -479.97,-1270.71); outer
 * ring + inner hole filled evenodd.
 */
const MARK_PATH =
  'M120.8,41.4 L119.2,41.2 Q106.8,37.7 102.4,33.2 L89.1,1.3 L0,0 L0.6,117.7 ' +
  'L124.8,117.8 Q128.4,118.8 132.3,123.8 L148.3,159.9 L236.8,159.9 L237,42 Z ' +
  'M22.5,26.6 L89.2,26.8 Q94.5,27.4 97.2,33.8 L108.4,60.1 Q112,66.3 115.9,67 ' +
  'L208,68.3 Q213.3,69.3 214.7,74.4 L215.1,132.1 L147.6,132.1 Q141.8,131.3 138.8,127.1 ' +
  'L130.2,104.1 Q127.5,98.9 121.6,97.3 L34.4,97.1 Q25.6,95 22.1,87.7 Z';

const Logo = ({ className = 'h-9 w-auto', color }: LogoProps) => {
  const gradientId = `logo-gradient-${useId()}`;

  return (
    <svg viewBox="-2 -2 241 164" className={className} aria-hidden="true">
      {!color && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="237" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9FE3C9" />
            <stop offset="48%" stopColor="#8FA3C4" />
            <stop offset="100%" stopColor="#4b4e6e" />
          </linearGradient>
        </defs>
      )}
      <path fill={color ?? `url(#${gradientId})`} fillRule="evenodd" d={MARK_PATH} />
    </svg>
  );
};

export default Logo;
