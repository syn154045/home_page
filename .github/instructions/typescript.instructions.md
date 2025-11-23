---
applyTo: '**/*.ts, **/*.tsx'
---

# TypeScript Instructions

## 🌲 ディレクトリ構成

```zsh
src/
├── app/              # Next.js App Router関連ファイル
├── assets/           # 画像、フォント、アイコンなどの静的資源
├── components/        # Reactコンポーネント
│   ├── layouts/        # レイアウトコンポーネント
│   └── parts/          # 再利用可能なUIパーツ
├── hooks/             # カスタムフック
├── store/             # JotaiのAtom定義
│   └── atoms/         # Atom定義ファイル
├── types/             # 型定義ファイル (valibotスキーマもここに配置)
├── utils/             # ユーティリティ関数
└── ...                # その他のディレクトリ

```

### コンポーネント配置ルール

#### 配置判断フロー

- **汎用的なUIパーツ**: `components/parts/`に配置
  - 例: ボタン、カード、モーダルなど
- **アプリ全体のレイアウトを構成するコンポーネント**: `components/layouts/`に配置
  - 例: ヘッダー、フッター、サイドバーなど
- **特定のページや機能に特化したコンポーネント**: `app/`ディレクトリ内に配置
  - 例: 各ページ固有のコンポーネント

---

## 🚨 ルール

### 型運用

#### 1. `type`の使用

- 必ず`type`を使用し、`interface`は使用しないでください。
- 理由:
  - 一貫性の担保
  - 制限性、予測可能性の担保
  - Union型やIntersection型の柔軟な使用
  - Declaration Mergingの回避

```typescript
// ❌️ interfaceは使用しない
interface User {
  id: number;
  name: string;
}

// ⭕️ typeを使用する
type User = {
  id: number;
  name: string;
};
```

#### 2. 変数宣言

- 宣言は特別な理由がない限り`const`を使用し、`let`や`var`は使用しないでください。`let`はループカウンタなど、再代入が必要な場合にのみ使用してください。`var`は絶対に使用しないでください。
- 理由:
  - 不変性の担保
  - 予測可能性の向上
  - スコープの明確化

```typescript
// ❌️ letやvarを使用する
let count = 0;
var name = 'syn';

// ⭕️ constを使用する
const count = 0;
const name = 'syn';
```

#### 3. 関数宣言

- アロー関数を使用してください。関数宣言は使用しないでください。Reactコンポーネントの場合も同様です。default exportの使用は控えてください。なお、アロー関数には必ず型注釈を付けてください。
- 理由:
  - 一貫性の担保
  - propsの型注釈が容易
  - typescriptの型推論が働きやすい

```typescript
// ❌️ 関数宣言を使用する
function add(a: number, b: number): number {
  return a + b;
}
export default function MyComponent() {
  return <div>Hello</div>;
}

// ❌️ アロー関数だが型注釈なし
export const add = (a, b) => {
  return a + b;
};
export const MyComponent = () => {
  return <div>Hello</div>;
};

// ⭕️ 型注釈付きアロー関数を使用する
const add = (a: number, b: number): number => {
  return a + b;
};
export const MyComponent: React.FC = () => {
  return <div>Hello</div>;
};
```

#### 4. プリミティブ型エイリアスの使用

- 可読性を考慮してプリミティブ型を避けたほうが良い場合は、プリミティブ型エイリアスを使用してください。
- 理由:
  - 意味の明確化
  - 将来的な変更の容易化

```typescript
// ❌️ 直接プリミティブ型を使用する
const userId: number = 123;

// ⭕️ プリミティブ型エイリアスを使用する
type UserID = number;
const userId: UserID = 123;
```

#### 5. 明示的な型注釈

- 変数、関数の引数、戻り値には明示的な型注釈を付けてください。型推論に依存しないでください。ただし、過度な型注釈は避けてください。
- 理由:
  - 可読性の向上
  - 予測可能性の向上
  - 冗長な型注釈の回避

```typescript
// ❌️ 型注釈を省略する
const multiply = (a, b) => {
  return a * b;
};

// ⭕️ 明示的な型注釈を付ける
const multiply = (a: number, b: number): number => {
  return a * b;
};
const asyncFunction = async (): Promise<void> => {
  // 非同期処理
};

// ❌️ 過度な変数の型注釈をする
const isActive: boolean = true;

// ⭕️ 推論できるようなケースにはつけないなど、適切な型注釈をする
const isActive = true;
```

#### 6. `any`型の禁止

- `any`型の使用は禁止です。
- 理由:
  - 型安全性の確保
  - バグの予防

```typescript
// ❌️ any型を使用する
const data: any = fetchData();

// ⭕️ 適切な型を使用する
type Data = { id: number; name: string };
const data: Data = fetchData();
```

#### 7. 非nullアサーション演算子の禁止

- 非nullアサーション演算子（`!`）の使用は極力避けてください。非nullアサーション演算子を使用しないことによって冗長になるようであれば、型定義やコードロジックを見直してください。
- 理由:
  - 型安全性の確保
  - バグの予防

```typescript
// ❌️ 非nullアサーション演算子を使用する
const input = document.getElementById('input')!;

// ⭕️ nullチェックを行う
const input = document.getElementById('input');
if (input) {
  // inputを使用する処理
}
```

#### 8. 型キャストの禁止

- 型キャスト（`as`キーワード）の使用は極力避けてください。型キャストを使用しないことによって冗長になるようであれば、型定義を見直してください。
- 理由:
  - 型安全性の確保
  - バグの予防

```typescript
// ❌️ 型キャストを使用する
const element = document.getElementById('my-element') as HTMLDivElement;
// ⭕️ 適切な型チェックを行う
const element = document.getElementById('my-element');
if (element instanceof HTMLDivElement) {
  // elementを使用する処理
}
```

#### 9. 型ガード使用

- 8.の延長になるが、場合によっては、型ガードを使用して型の安全性を確保してください。
- 推奨される型ガード:
  - 型ガード関数
  - `typeof`ガード (プリミティブ型に対して有効)
  - `instanceOf`ガード (オブジェクト型判定に有効)
  - `unknown`ガード (any型回避に有効だが、なるべく避ける)
    - ただし、`unknown`型から`object`型への変換を安全に絞り込むには、プロパティをひとつひとつチェックする必要があるので、型ガード関数を使用するか、valibotのスキーマバリデーションライブラリを使用してください。
- 非推奨の型ガード:
  - `in`ガード (オブジェクト型までは型推論されないため避ける)
- 理由:
  - 型安全性の確保
  - バグの予防

```typescript
// ⭕️ 型ガード関数の使用例
// 型ガード関数
const isUser = (value: unknown): value is User => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value
  );
};

// 呼び出し
if (isUser(userData)) {
  // この中では userData は User 型として扱われる
  console.log(userData.name);
}

// ⭕️ typeof ガードの使用例 (プリミティブ型に対して有効)
const processValue = (value: string | number) => {
  if (typeof value === 'string') {
    console.log('String value:', value.toUpperCase());
  } else {
    console.log('Number value:', value.toFixed(2));
  }
};

// ⭕️ instanceOf ガードの使用例 (オブジェクト型判定に有効)
class Animal {}
class Bird extends Animal {
  fly() {}
}
class Fish extends Animal {
  swim() {}
}
const handleAnimal = (animal: Animal) => {
  if (animal instanceof Bird) {
    animal.fly();
  } else if (animal instanceof Fish) {
    animal.swim();
  }
};

// ⭕️ unknown ガードの使用例 (any型回避に有効だが、なるべく避ける)
const parseApiResponse = (response: unknown): ApiResult<User> => {
  if (isApiResult(response) && isUser(response.data)) {
    return response;
  }
  throw new Error('Invalid API response');
};

// ⭕️ valibotスキーマバリデーションの使用例
// ジェネリクス型ガード (utils/typeGuards.ts)
import { BaseIssue, BaseSchema, is } from 'valibot';
export function createValibotTypeGuard<
  TInput,
  TOutput,
  TSchema extends BaseSchema<TInput, TOutput, BaseIssue<unknown>>,
>(schema: TSchema) {
  // TOutput がこのジェネリクス型ガードの対象となる型
  type R = TOutput;

  // data is R がジェネリクス型ガードの役割を果たす
  return function isType(data: unknown): data is R {
    // is(schema, data) が true なら、data は TOutput 型であることを保証
    return is(schema, data);
  };
}
// 使用例
const UserSchema = z.object({ id: z.number(), name: z.string() });
const isUser = createZodTypeGuard(UserSchema);

// ❌️ in ガードの使用 (オブジェクト型までは型推論されないため避ける)
type Cat = { meow: () => void };
type Dog = { bark: () => void };
const makeSound = (animal: Cat | Dog) => {
  if ('meow' in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
};
```

#### 10. const アサーションの活用

- リテラル型を厳密に扱いたい場合、`as const`を使用してください。

```typescript
// ⭕️ constアサーションの使用例
const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];
```

#### 11. Union型とIntersection型の活用

- 場合によっては、Union型とIntersection型を使用してください。
- 理由:
  - 柔軟な型定義
  - 複雑なデータ構造の表現

```typescript
// ⭕️ Union型の使用例
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

type SuccessResponse = {
  status: 'success';
  data: User[];
};
type ErrorResponse = {
  status: 'error';
  message: string;
};
type ApiResponse = SuccessResponse | ErrorResponse;

// ⭕️ Intersection型の使用例
type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};
type UserWithTimestamps = User & Timestamps;
```

#### 12. ジェネリクスの活用

- 多数の型に対応する必要がある場合、ジェネリクスを使用してください。濫用は避けてください。
- 理由:
  - 再利用性の向上
  - 柔軟な型定義

```typescript
// ⭕️ ジェネリクスの使用例
type ApiResponse<T> = {
  status: 'success' | 'error';
  data: T;
  message?: string;
};

const wrapInArray = <T>(value: T): T[] => {
  return [value];
};
```

#### 13. ユーティリティ型の活用

- TypeScriptの組み込みユーティリティ型を活用してください。

```typescript
// ⭕️ ユーティリティ型の使用例
type User = {
  id: number;
  name: string;
  email?: string;
};
type PartialUser = Partial<User>;
type UserNameAndEmail = Pick<User, 'name' | 'email'>;
type UserWithoutEmail = Omit<User, 'email'>;

// ❌️ requiredは型エラーを発生させる可能性があるため、使用を避ける
type RequiredUser = Required<User>;
```

### 状態管理 (Jotai)

#### 1. Atomの定義

- Atomは`src/store/atoms/`ディレクトリに定義してください。関連するAtomは同じファイルにまとめてください。

```typescript
// src/store/atoms/userAtoms.ts
import { atom } from 'jotai';

// 基本atom定義例
export const userAtom = atom<User | null>(null);

// 派生atom定義例
export const isLoggedInAtom = atom((get) => get(userAtom) !== null);

// 書き込み可能なatom定義例
export const updateUserAtom = atom(
  null,
  (get, set, updatedUser: Partial<User>) => {
    const currentUser = get(userAtom);
    if (currentUser) {
      set(userAtom, { ...currentUser, ...updatedUser });
    }
  }
);
```

#### 2. Atomの使用

- コンポーネント内でAtomを使用する場合、用途に応じて`useAtomValue`, `useSetAtom`フックを使用してください。

```typescript
import { useAtom } from 'jotai';
import { userAtom, updateUserAtom } from '../store/atoms/userAtoms';

const UserProfile: React.FC = () => {
  const user = useAtomValue(userAtom);
  const updateUser = useSetAtom(updateUserAtom);

  const handleChangeName = (newName: string) => {
    updateUser({ name: newName });
  };

  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={() => handleChangeName('New Name')}>Change Name</button>
    </div>
  );
};
```

#### 3. Atomの命名規則

- Atomの命名規則は以下の通りです:
  - 基本atom: 基本名 + Atom (例: `userAtom`)
  - 派生atom: is + 基本atom名 (例: `isLoggedInUserAtom`)
  - 書き込み可能なatom: action + 基本atom名 (例: `updateUserAtom`)

#### 4. Atomの型注釈

- Atomの型注釈は必ず明示的に行ってください。型推論に依存しないでください。

```typescript
// ❌️ 型注釈を省略する
export const countAtom = atom(0);
// ⭕️ 明示的な型注釈を付ける
export const countAtom = atom<number>(0);
```

#### 5. JotaiとuseStateの使い分け

- グローバルに共有する必要がある状態はjotaiのAtomを使用してください。コンポーネント内でのみ使用されるローカルな状態はReactの`useState`を使用してください。

#### 6.

### スタイル (TailwindCSS + cva)

#### 1. Tailwind CSSの使用

- スタイルはTailwind CSSを使用して記述してください。カスタムCSSや他のスタイリング手法は避けてください。
- カスタム変数は`src/app/globals.css`に記載されています。追加設定は原則しないでください。（必要な場合は応相談）

#### 2. cvaの使用

- 複雑なクラス名の組み合わせが必要な場合、`cva` (Class Variance Authority) を使用してスタイルを管理してください。

```typescript
import { cva } from 'class-variance-authority';

const buttonStyles = cva('px-4 py-2 font-semibold rounded', {
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    },
    size: {
      small: 'text-sm',
      large: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'small',
  },
});
// 使用例
<button className={buttonStyles({ variant: 'secondary', size: 'large' })}>Click Me</button>
```

### 文法

#### 1. switch文の使用方法

- 複数の条件分岐が必要な場合、`switch`文を使用してください。`if-else`チェーンは避けてください。
- ユニオン型は必ず`switch`文で扱ってください。
- 各`case`には必ず`break`文を使用してください。`fallthrough`は避けてください。
- 各`case`は簡潔に保ち、即時`return`を使用したり、別関数に切り出したりしてください。
- `default`ケースは必ず含めてください。
- **!!注意!!** 複雑なロジックが必要な場合は、`switch`文を使用せず、代わりにオブジェクトリテラルと型ガード関数、ブラケット記法を組み合わせてください。

```typescript
// ❌️ if-elseチェーンを使用する (基本2条件以上の場合は避ける)
if (status === 'idle') {
  // 処理
} else if (status === 'loading') {
  // 処理
} else if (status === 'success') {
  // 処理
} else {
  // 処理
}
// ⭕️ switch文を使用する
switch (status) {
  case 'idle':
    // 処理
    break;
  case 'loading':
    // 処理
    break;
  case 'success':
    // 処理
    break;
  default:
    // 処理
    break;
}

// ❌️ 複雑なロジックや量の多い分岐処理にswitch文を使用する
switch (key) {
  case 'ArrowLeft': {
    move(rowIndex, columnIndex - 1);
    break;
  }
  case 'ArrowRight': {
    move(rowIndex, columnIndex + 1);
    break;
  }
  case 'ArrowUp': {
    move(rowIndex - 1, columnIndex);
    break;
  }
  case 'ArrowDown': {
    move(rowIndex + 1, columnIndex);
    break;
  }
  case 'Enter': {
    handleEnter();
    break;
  }
  default: {
    console.log('指定外のキーが押されました');
    break;
  }
}
// ⭕️ オブジェクトリテラルと型ガード関数、ブラケット記法を使用する
/* define mapping */
const keyMap = {
  ArrowLeft: () => move(rowIndex, columnIndex - 1),
  ArrowRight: () => move(rowIndex, columnIndex + 1),
  ArrowUp: () => move(rowIndex - 1, columnIndex),
  ArrowDown: () => move(rowIndex + 1, columnIndex),
  Enter: () => handleEnter(),
} as const;

const isKey = (key: string): key is keyof typeof keyMap =>
  Object.hasOwn(keyMap, key);

/* execute */
if (isKey(key)) {
  keyMap[key]();
} else {
  console.log('指定外のキーが押されました');
}
```

#### 2. 網羅性チェック

- `switch`文や条件分岐で列挙型やユニオン型を扱う場合、網羅性チェックを行ってください。`default`ケースでコンパイルエラーを発生させるクラスを使用してください。
- exhaustiveErrorHandle関数設置場所: `src/utils/errors.ts`

```typescript:errors.ts
class ExhaustiveError extends Error {
  constructor(value: never, message = `Unsupported type: ${value}`) {
    super(message);
  }
}
```

```typescript
import { ExhaustiveError } from '../utils/errors';
// ⭕️ 網羅性チェックの例
type Status = 'idle' | 'loading' | 'success';
switch (status) {
  case 'idle':
    // 処理
    break;
  case 'loading':
    // 処理
    break;
  default:
    throw new ExhaustiveError(status); // statusが'success'のcaseが抜けているため、コンパイルエラーを検出
}
```

#### 3. setTimeout/setIntervalの使用

- 原則`setTimeout`や`setInterval`は使用しないでください。`Promise`や`async/await`、`requestAnimationFrame`、`Framer Motion`のアニメーション機能など、他の手段で代替してください。

```typescript
// ❌️ setTimeout/setIntervalを使用する
setTimeout(() => {
  // 処理
}, 1000);

// ⭕️ Promiseやasync/awaitを使用する
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
await delay(1000);

// ⭕️ requestAnimationFrameを使用する
const animate = () => {
  // アニメーション処理
  requestAnimationFrame(animate);
};
requestAnimationFrame(animate);
```

#### 4. DOM操作

- 直接的なDOM操作は避けてください。useRef, useEffectなど、Reactの状態管理やライフサイクルメソッドを使用してDOM操作を行ってください。

```typescript
// ❌️ 直接的なDOM操作を行う
const element = document.getElementById('my-element');
element.style.backgroundColor = 'red';

// ⭕️ Reactの状態管理を使用する
const [isRed, setIsRed] = useState(false);
return (
  <div
    id="my-element"
    style={{ backgroundColor: isRed ? 'red' : 'transparent' }}
    onClick={() => setIsRed(!isRed)}
  >
    Click me
  </div>
);
```

### その他ルール

#### 1. index.tsファイルの使用

- ディレクトリ内の複数のエクスポートをまとめるために、`index.ts`ファイルを使用してください。これにより、インポートが簡潔になります。ただし、循環参照を避けるために注意してください。

```zsh
# 例
src/components/parts
├── Button/
│   ├── Button.tsx
│   ├── Button.stories.tsx
│   └── index.ts
├── Card/
│   ├── Card.tsx
│   ├── Card.stories.tsx
│   └── index.ts
└── index.ts
```

#### 2. コメントの使用

- 複雑なロジックや意図を説明するために、適切にコメントを使用してください。ただし、過度なコメントは避けてください。コード自体が自己説明的であることを目指してください。

#### 3. ファイルの分割

- ファイルが大きくなりすぎた場合、適切に分割してください。一般的な目安として、1ファイルあたり200行を超えた場合は分割を検討してください。

#### 4. コード整形

- Eslint, Prettierを使用したコード整形を行ってください。
