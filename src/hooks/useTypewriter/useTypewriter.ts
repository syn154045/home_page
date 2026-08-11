import { useEffect, useRef, useState } from 'react';
import { SEPARATED_QWERTY_NEAR_KEYS, TITLE_WORDS } from './models';

type UseTypewriterReturn = {
  displayed: string;
  isTyping: boolean;
  // 外部から一度だけ特定の文字列をタイプさせ、ループを停止させる
  typeOnce: (target: string) => Promise<void>;
};

// cancellable wait: resolves after ms or immediately if signal is aborted
const cancellableWait = (
  ms: number,
  signal?: AbortSignal | null
): Promise<void> =>
  new Promise((res) => {
    if (signal?.aborted) return res();
    const t = setTimeout(() => {
      cleanup();
      res();
    }, ms);
    const onAbort = (): void => {
      clearTimeout(t);
      cleanup();
      // resolve early on abort so callers continue and can handle externalTargetRef
      res();
    };
    function cleanup(): void {
      signal?.removeEventListener('abort', onAbort);
    }
    signal?.addEventListener('abort', onAbort);
  });

export const useTypewriter = (): UseTypewriterReturn => {
  // パラメータ
  const loop = true;
  const typingSpeed = 120; // ベースの入力速度(ms). 値が小さいほど速く入力される
  const deletingSpeed = 80; // ベースの削除速度(ms). 値が小さいほど速く削除される
  const pauseAfterTyped = 3000; // 1語が打ち終わった後の待機時間(ms). 値が大きいほど次の語までの間隔が大きくなる
  const pauseAfterDeleted = 200; // 共通接頭辞まで削除した後の待機時間(ms).
  const typingJitter = 50; // 文字ごとのランダムジッター(±ms). 値を大きくするとばらつきが増える
  const deletingJitter = 40; // 削除時のジッター(±ms). 値を上げるとばらつきが増える

  const mistakeProbability = 0.01; // 1文字あたりのタイプミス確率(0~1). 値を上げるとミスが増えます
  const mistakeCorrectionDelay = 120; // ミスを入力してから気づくまでの時間(ms). 値が短いと即座に訂正、長いと「考えてから訂正」する印象
  const mistakeDeleteSpeedFactor = 0.5; // 訂正時の削除を速める係数(0~1). 小さいほど速く消す
  const mistakePostDeleteDelay = 220; // 削除後に再入力を始めるまでの短い待機(ms). 値を大きくすると訂正後に一呼吸入る

  const jitter = (range: number): number =>
    Math.round((Math.random() * 2 - 1) * range);
  const typingDelay = (_idx: number, _len: number): number =>
    Math.max(20, typingSpeed + jitter(typingJitter));
  const deletingDelay = (): number =>
    Math.max(12, deletingSpeed + jitter(deletingJitter));

  const [displayed, setDisplayed] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const mountedRef = useRef<boolean>(true);
  const displayedRef = useRef<string>('');
  const controllerRef = useRef<AbortController | null>(null);
  const externalTargetRef = useRef<string | null>(null);
  const externalResolveRef = useRef<(() => void) | null>(null);
  const stopLoopRef = useRef<boolean>(false);

  // sync ref, state
  const setDisplayedAndRef = (v: string): void => {
    displayedRef.current = v;
    setDisplayed(v);
  };

  useEffect(() => {
    mountedRef.current = true;

    let shouldCancel = false;

    const run = async (): Promise<void> => {
      let index = 0;
      while (mountedRef.current && !shouldCancel && !stopLoopRef.current) {
        // create a fresh controller for this iteration so cancellableWait can be aborted
        // abort previous controller to immediately wake any pending waits
        try {
          controllerRef.current?.abort();
        } catch {
          // ignore
        }
        controllerRef.current = new AbortController();
        const signal = controllerRef.current?.signal;
        // 外部からの強制タイプ要求がある場合はそれを優先して処理し、ループを停止する
        if (externalTargetRef.current) {
          const forced = externalTargetRef.current;
          const current = displayedRef.current || '';
          const getCommonPrefixLength = (a: string, b: string): number => {
            const minLen = Math.min(a.length, b.length);
            let i = 0;
            for (; i < minLen; i++) {
              if (a[i] !== b[i]) break;
            }
            return i;
          };

          const commonPrefixLen = getCommonPrefixLength(current, forced);

          setIsTyping(true);

          // delete down to common prefix
          while (
            mountedRef.current &&
            displayedRef.current.length > commonPrefixLen &&
            !shouldCancel
          ) {
            const next = displayedRef.current.slice(0, -1);
            setDisplayedAndRef(next);
            await cancellableWait(deletingDelay(), signal);
          }

          if (!mountedRef.current || shouldCancel) break;

          await cancellableWait(pauseAfterDeleted, signal);

          // type forced target (no typos)
          for (
            let i = Math.max(commonPrefixLen + 1, 1);
            i <= forced.length && mountedRef.current && !shouldCancel;
            i++
          ) {
            setDisplayedAndRef(forced.slice(0, i));
            await cancellableWait(typingDelay(i, forced.length), signal);
          }

          setIsTyping(false);

          // resolve external promise and stop the loop permanently
          const resolve = externalResolveRef.current;
          externalTargetRef.current = null;
          externalResolveRef.current = null;
          stopLoopRef.current = true;
          if (resolve) resolve();

          break; // exit main while loop
        }

        const word = TITLE_WORDS[index];
        // この語の処理中に外部要求が来たら即時中断して外部処理へ戻るためのフラグ
        let externalTriggered = false;

        // determine common prefix length with next word to avoid erasing shared prefix
        const current = displayedRef.current || '';
        const getCommonPrefixLength = (a: string, b: string): number => {
          const minLen = Math.min(a.length, b.length);
          let i = 0;
          for (; i < minLen; i++) {
            if (a[i] !== b[i]) break;
          }
          return i;
        };

        const commonPrefixLen = getCommonPrefixLength(current, word);

        // delete current down to the common prefix (no need to erase shared part)
        setIsTyping(true);

        while (
          mountedRef.current &&
          displayedRef.current.length > commonPrefixLen &&
          !shouldCancel
        ) {
          const next = displayedRef.current.slice(0, -1);
          setDisplayedAndRef(next);
          await cancellableWait(deletingDelay(), signal);
          if (externalTargetRef.current) {
            externalTriggered = true;
            break;
          }
        }

        if (!mountedRef.current || shouldCancel) break;

        if (externalTriggered) {
          // 外部トリガが来たので次イテレーションで外部処理を行う
          continue;
        }

        await cancellableWait(pauseAfterDeleted, signal);

        if (externalTargetRef.current) {
          // 外部要求が来たら外部処理へ
          continue;
        }

        // type the remainder after the common prefix
        for (
          let i = Math.max(commonPrefixLen + 1, 1);
          i <= word.length && mountedRef.current && !shouldCancel;
          i++
        ) {
          if (externalTargetRef.current) {
            externalTriggered = true;
            break;
          }
          // decide whether to simulate a typo before typing the correct char
          const prefix = word.slice(0, i - 1);
          const correctChar = word[i - 1];
          // 同一文字が連続するケースでは誤入力を発生させない
          const prevChar = i > 1 ? word[i - 2] : null;
          const isRepeatedChar = prevChar !== null && prevChar === correctChar;
          const makeMistake =
            !isRepeatedChar && Math.random() < mistakeProbability;

          if (makeMistake && mountedRef.current && !shouldCancel) {
            // 誤文字を選択
            const near = SEPARATED_QWERTY_NEAR_KEYS[correctChar];
            const wrongChar = near[Math.floor(Math.random() * near.length)];

            // type wrong char
            setDisplayedAndRef(prefix + wrongChar);
            await cancellableWait(typingDelay(i, word.length), signal);

            if (externalTargetRef.current) {
              externalTriggered = true;
              break;
            }

            if (!mountedRef.current || shouldCancel) break;

            // brief pause to simulate realization, then delete the wrong char faster
            await cancellableWait(mistakeCorrectionDelay, signal);
            // delete wrong char
            setDisplayedAndRef(prefix);
            await cancellableWait(
              Math.max(8, deletingDelay() * mistakeDeleteSpeedFactor),
              signal
            );

            if (externalTargetRef.current) {
              externalTriggered = true;
              break;
            }

            // 削除後に少し間を置くことで「気づいて手を止める」感じを出す
            await cancellableWait(mistakePostDeleteDelay, signal);
          }

          // type correct char
          setDisplayedAndRef(word.slice(0, i));
          await cancellableWait(typingDelay(i, word.length), signal);

          if (externalTargetRef.current) {
            externalTriggered = true;
            break;
          }
        }

        setIsTyping(false);

        if (externalTriggered) {
          // 外部要求を検知したので次イテレーションで外部処理を優先
          continue;
        }

        if (!mountedRef.current || shouldCancel) break;

        await cancellableWait(pauseAfterTyped, signal);

        index += 1;
        if (index >= TITLE_WORDS.length) {
          if (loop) index = 0;
          else break;
        }
      }
    };

    run().catch((err) => {
      if (process.env.NODE_ENV !== 'production') console.error(err);
    });

    return (): void => {
      shouldCancel = true;
      mountedRef.current = false;
    };
    // intentionally only re-run if words array instance changes
  }, []);

  const typeOnce = (target: string): Promise<void> =>
    new Promise((resolve) => {
      // set resolver first, then the target, then abort any pending waits so the loop
      // wakes up and handles the external target immediately
      externalResolveRef.current = resolve;
      externalTargetRef.current = target;
      try {
        controllerRef.current?.abort();
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') console.error(err);
      }
    });

  return { displayed, isTyping, typeOnce };
};
