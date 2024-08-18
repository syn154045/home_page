// jotai atom
import { atom } from 'jotai';

/** contact/thanksページのアクセス制限 */
export const isSubmittedAtom = atom(false);

/** contact -> contact/thanksへ{email}を渡す */
export const emailAtom = atom<string | null>(null);

/** loading */
export const loadingAtom = atom(true);
