'use client';

import React, { useEffect, useRef, useState } from 'react';

const FIRST_VIEW_TEXT = 'synmm...';
const firstViewTextLength = FIRST_VIEW_TEXT.length;

type IntroProps = {
  onComplete?: () => void;
};

export default function FirstView({
  onComplete,
}: IntroProps): React.ReactElement {
  const [phase, setPhase] = useState<'typing' | 'falling' | 'done'>('typing');
  const [charCount, setCharCount] = useState(1);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typingAnimRef = useRef<any | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fallingAnimRef = useRef<any | null>(null);

  useEffect(() => {
    if (phase !== 'typing') return;
    // 文字数が達するまで繰り返す
    if (charCount < firstViewTextLength) {
      const delayMin = 80;
      const delayMax = 240;
      const delay = Math.round(
        Math.random() * (delayMax - delayMin) + delayMin
      );

      const id = window.setTimeout(() => setCharCount((c) => c + 1), delay);
      timerRef.current = id;
      const cleanup = (): void => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
      return cleanup;
    }

    // 文字数カウント完了 -> falling
    const t = window.setTimeout(() => setPhase('falling'), 600);
    const cleanup = (): void => {
      clearTimeout(t);
    };
    return cleanup;
  }, [charCount, phase]);

  // 新しく表示された1文字をanime.jsでフェード/スライドイン
  useEffect(() => {
    if (phase !== 'typing') return;
    const el = containerRef.current?.querySelectorAll('.fv-char')[
      charCount - 1
    ] as HTMLElement | undefined;
    if (el) {
      if (typingAnimRef.current) typingAnimRef.current.pause();
      // anime.js はクライアント側で dynamic import する（型/SSR 回避）
      (async () => {
        const mod = await import('animejs');
        // default export があるかもしれないので両方に対応
        const a: any = (mod as any).default ?? mod;
        typingAnimRef.current = a({
          targets: el,
          translateY: [-20, 0],
          opacity: [0, 1],
          duration: 180,
          easing: 'easeOutCubic',
        });
      })();
    }
    return (): void => {
      if (typingAnimRef.current) typingAnimRef.current.pause();
    };
  }, [charCount, phase]);

  // falling -> done -> onComplete
  useEffect(() => {
    if (phase === 'falling') {
      // 全文字を落下させるアニメーション
      const nodeList = containerRef.current?.querySelectorAll('.fv-char') ?? [];
      const targets: HTMLElement[] = Array.from(nodeList) as HTMLElement[];
      if (targets.length) {
        if (fallingAnimRef.current) fallingAnimRef.current.pause();
        // anime.js はクライアント側で dynamic import する（型/SSR 回避）
        (async () => {
          const mod = await import('animejs');
          const a: any = (mod as any).default ?? mod;
          const tl = a.timeline({ easing: 'easeInQuad' });
          targets.forEach((el, i) => {
            const x = (Math.random() - 0.5) * 300;
            const rotate = (Math.random() - 0.5) * 720;
            const delay = i * 20 + Math.random() * 120;
            tl.add(
              {
                targets: el,
                translateY: 500 + Math.random() * 200,
                translateX: x,
                rotate: rotate,
                opacity: 0,
                duration: 1200,
                delay,
              },
              0
            );
          });
          fallingAnimRef.current = tl;
        })();
      }

      const t = window.setTimeout(() => setPhase('done'), 1400);
      return (): void => {
        if (fallingAnimRef.current) fallingAnimRef.current.pause();
        clearTimeout(t);
      };
    }
    if (phase === 'done') {
      const t = window.setTimeout(() => onComplete && onComplete(), 250);
      const cleanup = (): void => {
        clearTimeout(t);
      };
      return cleanup;
    }
    return undefined;
  }, [phase, onComplete]);

  return (
    <>
      {phase !== 'done' && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          aria-hidden
        >
          <div ref={containerRef}>
            {phase === 'typing' && (
              <div className="text-6xl md:text-8xl font-bold tracking-tight text-white">
                <div>
                  {FIRST_VIEW_TEXT.slice(0, charCount)
                    .split('')
                    .map((ch: string, i: number) => (
                      <span
                        aria-hidden
                        key={i}
                        className="fv-char"
                        style={{
                          display: 'inline-block',
                          opacity: 0,
                          transform: 'translateY(-20px)',
                        }}
                      >
                        {ch}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {phase === 'falling' && (
              <div className="text-6xl md:text-8xl font-bold tracking-tight text-white">
                {FIRST_VIEW_TEXT.split('').map((ch, i) => (
                  <span
                    aria-hidden
                    key={i}
                    className="fv-char"
                    style={{ display: 'inline-block' }}
                  >
                    {ch}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
