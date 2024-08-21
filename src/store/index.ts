// jotai atom
import { atom } from 'jotai';

/**
 * contact/thanksページのアクセス制限
 * @boolean true = submitted / false = no
 */
export const isSubmittedAtom = atom(false);

/**
 * contact -> contact/thanksへ{email}を渡す
 * @string form's email
 */
export const emailAtom = atom<string | null>(null);

/**
 * loading
 * @boolean true = loading / false = loaded (change once)
 */
export const loadingAtom = atom(true);
/**
 * loaded
 * @boolean true = loaded / false = not loaded
 */
export const loadedAtom = atom(false);
