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
            src={"/images/logo.png"}
            width={200}
            height={50}
            alt={"タイトルロゴ"}
            priority
          />
        </Link>
        <nav className="nav">
          <ul className={header.nav__wrapper}>
            {user ? (
              <>
                <li className={header.nav__item}>
                  <Link href="/create-user">会員登録</Link>
                </li>
                <li className={header.nav__item}>
                  <Link href="/member-attendance">会員打刻</Link>
                </li>
                <li className={header.nav__item}>
                  <Link href="/member-list">会員一覧</Link>
                </li>
                <li className={header.nav__item}>
                  <Link href="/graph-management">グラフ管理</Link>
                </li>
                <li className={header.nav__item}>
                  <Link href="/" onClick={buttonSignOut}>
                    ログアウト
                  </Link>
                </li>
              </>
            ) : (
              <li className={header.nav__item}>
                <Link href="/owners-login">ログイン</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
