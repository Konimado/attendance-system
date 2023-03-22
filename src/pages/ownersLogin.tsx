import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ownersLogin() {
  const [user] = useAuthState(auth);
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  //エラーメッセージ
  const [errorMessage, setErrorMessage] = useState("");

  const buttonSignIn = function () {
    signInWithEmailAndPassword(auth, mailAddress, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        setErrorMessage("※メールアドレスまたはパスワードが間違っています");
      });
  };

  return (
    <>
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
    </>
  );
}
