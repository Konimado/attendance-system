import Link from "next/link";
import Image from "next/image";
import header from "../style/header.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Header() {
  //ログイン状態の確認
  const [user] = useAuthState(auth);
  //ボタンクリック
  const buttonSignOut = function () {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {});
  };

  return (
    <header className={header.main}>
      <div className={header.site}>
        <Link href="/">
          <Image
            src={"next.svg"}
            width={100}
            height={50}
            alt={"タイトルロゴ"}
            priority
          />
        </Link>
        <nav className="nav">
          <ul className={header.nav__wrapper}>
            <li className={header.nav__item}>
              <Link href="/">会員一覧</Link>
            </li>
            <li className={header.nav__item}>
              <Link href="/">グラフ管理</Link>
            </li>
            <li className={header.nav__item}>
              {user ? (
                <Link href="/" onClick={buttonSignOut}>
                  ログアウト
                </Link>
              ) : (
                <Link href="/ownersLogin">ログイン</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
