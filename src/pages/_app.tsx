import type { AppProps } from "next/app";
import "../style/globals.scss";
import React from "react";
import { ReactDOM } from "react";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function MyApp({ Component, pageProps }: AppProps) {
  // //ログイン確認
  const [user] = useAuthState(auth);

  return <Component {...pageProps} />;
}
