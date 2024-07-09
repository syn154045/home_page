import { useEffect } from 'react';

// import { MODAL_ID } from '_components/app/layouts/navbar/Navbar';

const MODAL_ID = 'modal';
type UseModalScrollLockArgs = {
    isModalOpen: boolean;
};

/** スクロール可能な要素かどうかを判定する関数 */
const isScrollable = (element: Element) =>
    element.clientHeight < element.scrollHeight;

export const useModalScrollLock = (args: UseModalScrollLockArgs) => {
    const { isModalOpen } = args;

    /** 指定した要素以外のスクロールを抑止する関数（iOS Safariの場合のみの制御） */
    const scrollLock = (event: TouchEvent) => {
        const canScrollElement = (event.target as HTMLDivElement)?.closest(
            `#${MODAL_ID}`,
        );

        if (canScrollElement === null) {
            // MEMO : 対象の要素でなければスクロール禁止にする
            event.preventDefault();
            return;
        }

        if (canScrollElement !== null && isScrollable(canScrollElement)) {
            // MEMO : 対象の要素があり、その要素がスクロール可能であればスクロールを許可する
            event.stopPropagation();
        } else {
            // MEMO : 対象の要素はスクロール禁止にする
            event.preventDefault();
        }
    };

    const scrollLockFix = (event: Event) => {
        const element = event.target as HTMLDivElement;

        if (element === null) return;

        // 以下の手順で発生するスクロールのバグ対策。回避するため1pxだけスクロール量を減らす
        // 1. メニューを上下どちらかに最大までスクロールする
        // 2. 更にスクロールを行うとページ全体がスクロールする
        if (element.scrollTop + element.clientHeight === element.scrollHeight) {
            element.scrollTop = element.scrollTop - 1;
        }

        if (element.scrollTop === 0) {
            element.scrollTop = 1;
        }
    };

    /** スクロールのバグ対策を行うイベントを追加する関数 */
    const scrollLockFixAdd = (element: HTMLElement) => {
        const canScrollElement = element.querySelector<HTMLDivElement>(
            `#${MODAL_ID}`,
        );

        if (canScrollElement === null) return;

        canScrollElement.addEventListener('scroll', scrollLockFix);
    };

    /** スクロールのバグ対策を行うイベントを削除する関数 */
    const scrollLockFixRemove = (element: HTMLElement) => {
        const canScrollElement = element.querySelector<HTMLDivElement>(
            `#${MODAL_ID}`,
        );

        if (canScrollElement === null) return;

        canScrollElement.removeEventListener('scroll', scrollLockFix);
    };

    /** モーダルを開いているときに背面コンテンツのスクロールを全デバイスで抑制する関数 */
    const scrollStopBackContent = () => {
        const canScrollModalElement = document.querySelector<HTMLDivElement>(
            `#${MODAL_ID}`,
        );

        if (canScrollModalElement === null || !isModalOpen) return;

        // デスクトップ向けの処理
        document.body.style.overflowY = 'hidden';
        // iOS向けの処理
        scrollLockFixAdd(canScrollModalElement);
        document.addEventListener('touchmove', scrollLock, { passive: false });

        return () => {
            document.body.style.overflowY = 'auto';
            scrollLockFixRemove(canScrollModalElement);
            document.removeEventListener('touchmove', scrollLock);
        };
    };

    useEffect(scrollStopBackContent, [scrollLockFixAdd, scrollLockFixRemove]);
};
