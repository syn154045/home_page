# todo...
- ナビゲーションバーをスクロールするとハンバーガーメニューに切り替わるアニメーション（現在はuseStateを多用している）
- ページのイメージを形にしてください。
- Canvasタグを使用したトップビュー

# Directory...

```script
|-- app/
|   |-- db/
|   |   L-- user.ts  in=db{ prisma } / ex=(DBアクセス){ getUserByEmail }
|   |-- lib/
|   |   |-- actions.ts  in={ getUserByEmail / signUpSchema / signIn,signOut / prisma }
|   |   L-- schemas.ts  ex=(validation){ signUpSchema / signInSchema }
|-- globals
|   |-- db.ts  ex=(prismaインスタンス){ prisma }


```

# Prisma init...
```bash
npm run dev
npx prisma init --datasource-provider sqlite
    Next steps:
    1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
    2. Run prisma db pull to turn your database schema into a Prisma schema.
    3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
npx prisma generate
npx prisma migrate dev --name init
```

```.env
User: postgres
Password: pass
Host: localhost
Port: 5432
Database name: myapp
Schema name: public
DATABASE_URL=postgresql://root:pass@localhost:5432/mydb?schema=public
```

# color palette...
```ts:tailwind.config.ts
theme: { extend: { colors: {

    natural: {
        base: '#FFFFEC', // ivory
        main: '#F1E4C3', // dutch white
        accent: '#C6A969', // ecru
        accent2: '#597E52', // fern green
        text: {
            main: '#333',
            sub: '#222',
        },
    },
    neon: {
        base: '#071952',
        main: '#0B666A',
        accent: '#97FEED',
        accent2: '#35A29F',
        text: {
        main: '#ffffff',
        sub: '#fefefe',
        }
    },
    monotone: {
        base: '#48555C',
        main: '#B7AAA3',
        accent: '#4EFFEF',
        accent2: '#00A7F5',
        text: {
            main: '#C5C5C5',
            sub: '#FFFEF6',
        }
    },
    purpule: {
        base: '#5A639C',
        main: '#7776B3',
        accent: '#9B86BD',
        accent2: '#E2BBE9',
        text: {
            main: '#FFFFFF',
            sub: '#FFFFFF'
        }
    }
    

},},}
```

# memo...
- gsap?
```tsx:
'use client';
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NavButton from '_components/app/elements/buttons/NavButton';
import { gsap } from 'gsap';
import { useOffsetTop } from '@/app/_hooks/useOffsetTop';

const Navbar = () => {
    const navRef = useRef<HTMLUListElement>(null);
    const hamRef = useRef<HTMLLabelElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const isOpenRef = useRef(false);
    
    
    const toggleM = () => {
        isOpenRef.current = !isOpenRef.current;
        if (isOpenRef.current) {
            gsap.to(menuRef.current, {
                opacity: 1,
                display: 'flex',
                duration: 0.5,
            });
            document.body.style.overflow = 'hidden';
        } else {
            gsap.to(menuRef.current, {
                opacity: 0,
                display: 'none',
                duration: 0.5,
            });
            document.body.style.overflow = '';
        }
    };

    const handleS = useCallback(() => {
        const nav = navRef.current;
        const ham = hamRef.current;
        if (window.scrollY > 50) {
            console.log(nav);
            
            gsap.fromTo(nav, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.1 });
            gsap.fromTo(ham, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 });
        } else {
            gsap.fromTo(nav, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 });
            gsap.fromTo(ham, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.1 });
        }
    }, []);

    const handleClickO = useCallback((e: any) => {
        if (isOpenRef.current && !e.target.closest('.navbar-container')) {
            toggleM();
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleS);
        window.addEventListener('click', handleClickO);
        return () => {
            window.removeEventListener('scroll', handleS);
            window.removeEventListener('click', handleClickO);
        };
    }, [handleS, handleClickO]);
    
    
    const maxIconSize = 100; // 要素の最大サイズ
    const minIconSize = 20; // 要素の最小サイズ

    const iconRef = useRef(null);
    const { pageOffsetTop, viewportTop } = useOffsetTop(iconRef);

    // 要素の位置をもとにサイズを計算
    const iconSize = useMemo(() => {
        // 位置を取得できなかったときは最大サイズとして表示
        if (pageOffsetTop === undefined || viewportTop === undefined) return maxIconSize;
        
        // 位置に応じてサイズ計算
        const size = minIconSize + (viewportTop / pageOffsetTop) * (maxIconSize - minIconSize);
        return size.toFixed(1);
    }, [pageOffsetTop, viewportTop]);

    return (
        <nav className="inline-block text-right">
            <div
                className="navbar-container flex h-12 justify-center rounded-full border-2 border-app-accent bg-app-accent/20 px-4 py-2 transition-all duration-500 ease-in-out"
            >
                <ul ref={navRef} className="flex opacity-100 transition-all duration-500 ease-in-out">
                    <NavButton href="/about" label="ABOUT" />
                    <NavButton href="/blog" label="BLOG" />
                    <NavButton href="/contact" label="CONTACT" />
                    <NavButton href="/labo" label="LABO" />
                </ul>
                <label
                    ref={hamRef}
                    htmlFor="hamburger"
                    className="relative block h-7 w-9 cursor-pointer bg-transparent transition-all duration-500 ease-in-out"
                >
                    <input
                        type="checkbox"
                        id="hamburger"
                        className="peer absolute appearance-none"
                        onChange={toggleM}
                    />
                    <span className="absolute left-0 top-0 block h-0.5 w-full origin-left rotate-0 rounded-lg bg-app-accent opacity-100 transition-all duration-500 ease-in-out peer-checked:left-1 peer-checked:rotate-45" />
                    <span className="absolute left-0 top-1/2 block h-0.5 w-full origin-left -translate-y-1/2 rotate-0 rounded-lg bg-app-accent opacity-100 transition-all duration-500 ease-in-out peer-checked:w-0 peer-checked:opacity-0" />
                    <span className="absolute left-0 top-full block h-0.5 w-full origin-left -translate-y-full rotate-0 rounded-lg bg-app-accent opacity-100 transition-all duration-500 ease-in-out peer-checked:left-1 peer-checked:top-7 peer-checked:-rotate-45" />
                </label>
            </div>
            <div
                ref={menuRef}
                className="fixed inset-0 hidden items-center justify-center bg-black/50 opacity-0 transition-opacity duration-500"
            >
                <ul className="space-y-6 text-xl text-white">
                    <li onClick={toggleM}>
                        <Link href="/about">ABOUT</Link>
                    </li>
                    <li onClick={toggleM}>
                        <Link href="/blog">BLOG</Link>
                    </li>
                    <li onClick={toggleM}>
                        <Link href="/contact">CONTACT</Link>
                    </li>
                    <li onClick={toggleM}>
                        <Link href="/labo">LABO</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

```

- 

