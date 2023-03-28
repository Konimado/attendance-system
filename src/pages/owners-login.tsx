import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";
import Layout from "../components/Layout";
import ownersLogin from "../style/ownersLogin.module.scss";

export default function OwnersLogin() {
  //入力欄
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  //エラーメッセージ
  const [errorMessage, setErrorMessage] = useState("");

  //ログインボタン
  const buttonSignIn = function () {
    signInWithEmailAndPassword(auth, mailAddress, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        setErrorMessage("※メールアドレスまたはパスワードが間違っています");
      });
  };

  return (
    <Layout>
      <main className={ownersLogin.main}>
        <div>
          <label>メールアドレス</label>
          <input
            type="email"
            name="mailAddress"
            id="mailAddress"
            value={mailAddress}
            onChange={(e) => setMailAddress(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>{errorMessage}</p>
        <button onClick={buttonSignIn}>Sign in</button>
      </main>
    </Layout>
  );
}
