'use client';

import { JSX, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTypewriter } from '@/hooks/useTypewriter/useTypewriter';
import { Button } from '../parts/Button';

export const Header = (): JSX.Element => {
  const { displayed, isTyping, typeOnce } = useTypewriter();
  const pathname = usePathname();
  const router = useRouter();
  const isRoot = !pathname || pathname === '/';
  const currentPage = !isRoot ? `${pathname?.replace(/^\//, '')}/` : '';
  const navigateWithTitle = (path: string): void => {
    if (!typeOnce) {
      router.push(path);
      return;
    }

    const run = async (): Promise<void> => {
      try {
        await typeOnce('synmm/');
      } catch {
        // noop
      }
      router.push(path);
    };

    void run();
  };
  // refs for animation: title element and the target rounded nav button (about)
  const titleRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const titleEl = titleRef.current;
    const cursorWrap = titleEl.querySelector<HTMLDivElement>('.cursor-wrapper');

    if (displayed === 'synmm/' && titleRef.current && targetRef.current) {
      const targetEl = targetRef.current;
      const tRect = titleEl.getBoundingClientRect();
      const pRect = targetEl.getBoundingClientRect();

      const dx = pRect.left - tRect.left;
      const dy = pRect.top - tRect.top;

      // apply transform and smaller font-size (text-base ~= 1rem)
      titleEl.style.transition =
        'transform 1500ms cubic-bezier(.2,.9,.2,1), font-size 1500ms cubic-bezier(.2,.9,.2,1), opacity 1500ms cubic-bezier(.2,.9,.2,1)';
      titleEl.style.transform = `translate(${dx}px, ${dy}px)`;
      titleEl.style.fontSize = '1rem';

      // カーソルの外枠も同じタイミングで縮小する
      if (cursorWrap) {
        cursorWrap.style.transition =
          'width 1500ms cubic-bezier(.2,.9,.2,1), height 1500ms cubic-bezier(.2,.9,.2,1)';
        cursorWrap.style.width = '1rem';
        cursorWrap.style.height = '1.25rem';
      }
    } else {
      // リセット（ルートに戻ったときなど）
      titleEl.style.transition = '';
      titleEl.style.transform = '';
      titleEl.style.fontSize = '';
      if (cursorWrap) {
        cursorWrap.style.transition = '';
        cursorWrap.style.width = '';
        cursorWrap.style.height = '';
      }
    }
  }, [displayed]);

  return (
    <section className="fixed top-0 left-0 size-full">
      {/* ルートページ専用のタイトル */}
      {/* {isRoot && ( */}
      <div
        ref={titleRef}
        className="header-title absolute font-ubuntumono tracking-[0.5rem] top-1/2 left-0 ml-[10%] text-3xl bg-secondary-500/0 cursor-default flex opacity-80"
        aria-live="polite"
      >
        <span>&gt;{displayed}</span>
        {/* cursor wrapper にクラス名を付けて JS から幅/高さをアニメーション制御します */}
        <div className="cursor-wrapper flex w-[2.375rem] h-[4.6875rem] items-end">
          <span
            aria-hidden
            className={`w-full h-full align-middle bg-current inline-block ${isTyping ? '' : 'animate-blink'}`}
          />
        </div>
      </div>
      {/* )} */}

      {/* ルートページ以外のヘッダ */}
      {!isRoot && (
        <div className="absolute top-[5%] left-0 bg-secondary-500/0 font-ubuntumono  w-full tracking-[0.125rem]">
          <div
            ref={targetRef}
            className="flex justify-between items-center px-[5%]"
          >
            {/* ルートページ以外のタイトル、ここをクリックしたらルートページへ遷移 */}
            <div className="flex items-center tracking-[0.5rem]">
              <Button
                visualType="plain"
                color="neutral"
                onClick={() => router.push('/')}
              >
                synmm/
              </Button>
              <div className="px-2.5 py-2">{currentPage}</div>
            </div>

            {/* ルートページ以外のナビゲーション */}
            <div className="flex gap-4 rounded-2xl bg-secondary-200/20 p-2">
              <Button
                visualType="plain"
                color="neutral"
                onClick={() => navigateWithTitle('/about')}
              >
                about/
              </Button>
              <Button
                visualType="plain"
                color="neutral"
                onClick={() => navigateWithTitle('/works')}
              >
                works/
              </Button>
              <Button
                visualType="plain"
                color="neutral"
                onClick={() => navigateWithTitle('/contact')}
              >
                contact/
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ルートページ専用のナビゲーション */}
      <div className="absolute top-[10%] right-0 mr-[20%] font-ubuntumono tracking-[0.125rem]">
        <Button
          visualType="plain"
          color="neutral"
          onClick={() => navigateWithTitle('/about')}
        >
          <div className="rounded-full bg-secondary-200/40 size-32 flex justify-center items-center">
            about/
          </div>
        </Button>
      </div>
      <div className="absolute top-[38%] right-0 mr-[20%] font-ubuntumono tracking-[0.125rem]">
        <Button
          visualType="plain"
          color="neutral"
          onClick={() => navigateWithTitle('/works')}
        >
          <div className="rounded-full bg-secondary-200/40 size-32 flex justify-center items-center">
            works/
          </div>
        </Button>
      </div>
      <div className="absolute top-[66%] right-0 mr-[20%] font-ubuntumono tracking-[0.125rem]">
        <Button
          visualType="plain"
          color="neutral"
          onClick={() => navigateWithTitle('/contact')}
        >
          <div className="rounded-full bg-secondary-200/40 size-32 flex justify-center items-center">
            contact/
          </div>
        </Button>
      </div>
    </section>
  );
};
