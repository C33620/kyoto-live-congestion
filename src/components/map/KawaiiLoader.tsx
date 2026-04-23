// components/map/KawaiiLoader.tsx
"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Exploring Kyoto's hidden lanes…",
  "Asking the tanuki for directions…",
  "Brewing matcha, one moment…",
  "Counting torii gates…",
  "Finding the best ramen nearby…",
  "Consulting the kitsune oracle…",
  "Mapping Gion's cobblestones…",
  "Summoning sakura spirits…",
];

const PETAL_COUNT = 16;

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function KawaiiLoader() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [petals] = useState<Petal[]>(() =>
    Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      left: rand(2, 98),
      delay: rand(0, 9),
      duration: rand(6, 13),
      size: rand(10, 18),
      drift: rand(-60, 60),
    })),
  );

  useEffect(() => {
    const t = setInterval(() => {
      setMsgIndex((p) => (p + 1) % MESSAGES.length);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        .kl-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #fdf4f0 0%, #fde8e8 45%, #f5e2ef 100%);
          overflow: hidden;
          font-family: Georgia, serif;
        }
        /* petals */
        .kl-petal {
          position: absolute;
          top: -24px;
          pointer-events: none;
          animation: kl-fall linear infinite;
        }
        @keyframes kl-fall {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          8%   { opacity: 0.8; }
          92%  { opacity: 0.5; }
          100% { transform: translateY(108vh) translateX(var(--kl-drift, 0px)) rotate(540deg); opacity: 0; }
        }
        /* torii float */
        .kl-torii {
          animation: kl-float 3s ease-in-out infinite;
          filter: drop-shadow(0 10px 24px rgba(196,79,42,0.22));
          margin-bottom: 2rem;
        }
        @keyframes kl-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        /* lantern sway */
        .kl-lantern { animation: kl-sway 2.6s ease-in-out infinite; transform-origin: top center; }
        .kl-lantern-r { animation: kl-sway 2.6s ease-in-out infinite reverse; transform-origin: top center; }
        @keyframes kl-sway {
          0%,100% { transform: rotate(-7deg); }
          50%      { transform: rotate(7deg); }
        }
        /* title */
        .kl-title {
          font-size: clamp(1.9rem, 5vw, 2.8rem);
          font-weight: 700;
          color: #2d1a1a;
          letter-spacing: -0.02em;
          margin-bottom: 0.3rem;
          text-align: center;
        }
        .kl-title em { color: #c44f2a; font-style: normal; }
        /* message */
        .kl-msg {
          font-size: clamp(0.82rem, 2vw, 0.97rem);
          color: #7a5050;
          min-height: 1.4em;
          text-align: center;
          letter-spacing: 0.01em;
          animation: kl-fadein 2.6s ease-in-out infinite;
        }
        @keyframes kl-fadein {
          0%,100% { opacity: 0; transform: translateY(5px); }
          18%,82% { opacity: 1; transform: translateY(0); }
        }
        /* dots */
        .kl-dots { display: flex; gap: 8px; margin-top: 1.8rem; }
        .kl-dot {
          width: 8px; height: 8px; border-radius: 50%;
          animation: kl-dot 1.4s ease-in-out infinite;
        }
        .kl-dot:nth-child(1) { background: #c44f2a; animation-delay: 0s; }
        .kl-dot:nth-child(2) { background: #e89080; animation-delay: 0.2s; }
        .kl-dot:nth-child(3) { background: #c47090; animation-delay: 0.4s; }
        @keyframes kl-dot {
          0%,80%,100% { transform: scale(0.55); opacity: 0.35; }
          40%          { transform: scale(1.25); opacity: 1; }
        }
        /* wave */
        .kl-wave { position: absolute; bottom: 0; left: 0; width: 100%; pointer-events: none; }
        /* sparkles */
        .kl-spark {
          position: absolute;
          pointer-events: none;
          animation: kl-spark ease-in-out infinite;
        }
        @keyframes kl-spark {
          0%,100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
          50%      { opacity: 1; transform: scale(1) rotate(180deg); }
        }
      `}</style>

      <div
        className="kl-root"
        role="status"
        aria-label="Loading Kyoto map, please wait"
      >
        {/* Falling sakura petals */}
        {petals.map((p) => (
          <div
            key={p.id}
            className="kl-petal"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ["--kl-drift" as string]: `${p.drift}px`,
            }}
          >
            <svg width={p.size} height={p.size} viewBox="0 0 24 24">
              <path
                d="M12 2C8 2 4 6 4 10c0 5 8 12 8 12s8-7 8-12c0-4-4-8-8-8z"
                fill="#f4a7b9"
              />
            </svg>
          </div>
        ))}

        {/* Sparkles */}
        {(
          [
            { top: "11%", left: "9%", delay: "0s", dur: "2.0s", s: 15 },
            { top: "18%", left: "86%", delay: "0.7s", dur: "1.8s", s: 11 },
            { top: "74%", left: "7%", delay: "1.2s", dur: "2.3s", s: 13 },
            { top: "79%", left: "89%", delay: "0.4s", dur: "1.9s", s: 10 },
          ] as const
        ).map((s, i) => (
          <div
            key={i}
            className="kl-spark"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}
          >
            <svg width={s.s} height={s.s} viewBox="0 0 24 24">
              <path
                d="M12 2l2 8h8l-6.5 5 2.5 8L12 18l-6 5 2.5-8L2 10h8z"
                fill="#f4c2d0"
              />
            </svg>
          </div>
        ))}

        {/* Torii gate */}
        <svg
          className="kl-torii"
          width="180"
          height="155"
          viewBox="0 0 180 155"
          fill="none"
        >
          {/* Pillars */}
          <rect x="26" y="68" width="16" height="87" rx="3" fill="#c44f2a" />
          <rect x="138" y="68" width="16" height="87" rx="3" fill="#c44f2a" />
          {/* Inner crossbar */}
          <rect x="38" y="83" width="104" height="11" rx="3" fill="#c44f2a" />
          {/* Top beam */}
          <path
            d="M10 60 Q90 42 170 60 L166 72 Q90 54 14 72 Z"
            fill="#c44f2a"
          />
          {/* Cap beam */}
          <path d="M5 48 Q90 28 175 48 L170 60 Q90 42 10 60 Z" fill="#d96040" />
          {/* Highlight */}
          <path
            d="M18 50 Q90 34 162 50"
            stroke="#f0a080"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.45"
          />
          {/* Left lantern */}
          <g className="kl-lantern">
            <rect x="40" y="85" width="16" height="22" rx="4" fill="#f0c040" />
            <rect x="43" y="82" width="10" height="5" rx="1.5" fill="#c44f2a" />
            <rect
              x="43"
              y="107"
              width="10"
              height="4"
              rx="1.5"
              fill="#c44f2a"
            />
            <ellipse
              cx="48"
              cy="96"
              rx="5"
              ry="6.5"
              fill="#f8e080"
              opacity="0.55"
            />
            <line
              x1="48"
              y1="111"
              x2="48"
              y2="120"
              stroke="#c44f2a"
              strokeWidth="1.5"
            />
            <ellipse cx="48" cy="121" rx="3" ry="2" fill="#c44f2a" />
          </g>
          {/* Right lantern */}
          <g className="kl-lantern-r">
            <rect x="124" y="85" width="16" height="22" rx="4" fill="#f0c040" />
            <rect
              x="127"
              y="82"
              width="10"
              height="5"
              rx="1.5"
              fill="#c44f2a"
            />
            <rect
              x="127"
              y="107"
              width="10"
              height="4"
              rx="1.5"
              fill="#c44f2a"
            />
            <ellipse
              cx="132"
              cy="96"
              rx="5"
              ry="6.5"
              fill="#f8e080"
              opacity="0.55"
            />
            <line
              x1="132"
              y1="111"
              x2="132"
              y2="120"
              stroke="#c44f2a"
              strokeWidth="1.5"
            />
            <ellipse cx="132" cy="121" rx="3" ry="2" fill="#c44f2a" />
          </g>
          {/* Kawaii face */}
          <circle cx="90" cy="42" r="5.5" fill="#fff4f0" opacity="0.85" />
          <circle cx="88" cy="41" r="1.1" fill="#2d1b1b" />
          <circle cx="92" cy="41" r="1.1" fill="#2d1b1b" />
          <path
            d="M88 44.5 Q90 46.5 92 44.5"
            stroke="#2d1b1b"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Title */}
        <p className="kl-title">
          Kyoto<em>Map</em> 🌸
        </p>

        {/* Cycling message */}
        <p className="kl-msg" key={msgIndex}>
          {MESSAGES[msgIndex]}
        </p>

        {/* Bouncing dots */}
        <div className="kl-dots" aria-hidden="true">
          <div className="kl-dot" />
          <div className="kl-dot" />
          <div className="kl-dot" />
        </div>

        {/* Bottom wave */}
        <svg
          className="kl-wave"
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
        >
          <path
            d="M0,36 C360,72 1080,0 1440,36 L1440,72 L0,72 Z"
            fill="#f4a7b9"
            opacity="0.22"
          />
          <path
            d="M0,50 C400,18 1000,64 1440,42 L1440,72 L0,72 Z"
            fill="#c44f2a"
            opacity="0.09"
          />
        </svg>
      </div>
    </>
  );
}
