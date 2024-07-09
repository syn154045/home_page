import React, { useCallback, useEffect, useRef, useState } from 'react';

export function useOffsetTop(ref?: React.RefObject<HTMLElement>) {
    const [viewportTop, setViewportTop] = useState<number | undefined>(
        undefined,
    );
    const [pageOffsetTop, setPageOffsetTop] = useState<number | undefined>(
        undefined,
    );

    const handler = useThrottle(() => {
        if (!ref?.current) return;

        const clientRect = ref.current.getBoundingClientRect();
        setViewportTop(clientRect.top);
        const newPageOffsetTop = clientRect.top + window.pageYOffset;
        setPageOffsetTop(newPageOffsetTop);
    }, 100); // 100msに一度実行

    useEffect(() => {
        if (!ref?.current) return;

        // マウント時にも実行
        handler();
        window.addEventListener('scroll', handler);

        // アンマウント時にイベントリスナーを解除
        return () => window.removeEventListener('scroll', handler);
    }, [handler, ref]);

    return { viewportTop, pageOffsetTop };
}

// 受け取った関数をスロットリング
export function useThrottle<T>(
    fn: (args?: T) => void,
    durationMS: number, // スロットルする時間
) {
    const scrollingTimer = useRef<undefined | NodeJS.Timeout>();
    return useCallback(
        (args?: T) => {
            if (scrollingTimer.current) return; // すでにタイマーがセットされている場合は何もしない
            scrollingTimer.current = setTimeout(() => {
                fn(args);
                scrollingTimer.current = undefined; // タイマーをリセット
            }, durationMS);
        },
        [scrollingTimer, fn, durationMS],
    );
}
