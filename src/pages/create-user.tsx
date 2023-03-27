import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import axios from "axios";
import styles from "../style/create-user.module.scss";
import { useRouter } from "next/router";

export default function CreateUser() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [plan, setPlan] = useState("");
  const [startDate, setstartDate] = useState("");
  const [errormessage, setErrormessage] = useState({
    name: "",
    birth: "",
    postalCode: "",
    address: "",
    phoneNumber: "",
    mailAddress: "",
    gender: "",
    plan: "",
    startDate: "",
    num: "",
   
  });

  const addressAutoComplete = () => {
    axios
      .get(`https://api.zipaddress.net/?zipcode=${postalCode}`)
      .then((res) => {
        setAddress(res.data.data.fullAddress);
      });
  };

  const CreateUser = async (e) => {
    e.preventDefault();
    setErrormessage({
      name: "",
      birth: "",
      postalCode: "",
      address: "",
      phoneNumber: "",
      mailAddress: "",
      gender: "",
      plan: "",
      startDate: "",
      num: "",
    });
    const error = checkvalidate();
    setErrormessage(error);
    console.log("res", error);
    const num = ("000" + Math.floor(Math.random() * 10000)).substr(-4, 4);
    console.log("error", errormessage.name);

    if (
      error.name === "" &&
      error.address === "" &&
      error.birth === "" &&
      error.gender === "" &&
      error.phoneNumber === "" &&
      error.plan === "" &&
      error.startDate === ""
    ) {
      // console.log("データ送信");
      await setDoc(doc(db, "users",num), {
        name,
        birth,
        postalCode,
        address,
        phoneNumber,
        mailAddress,
        gender,
        plan,
        startDate,
        statue:false
  
      });
      router.push("/");
    }
  };

  const checkvalidate = () => {
    const error = {
      name: "",
      birth: "",
      postalCode: "",
      address: "",
      phoneNumber: "",
      mailAddress: "",
      gender: "",
      plan: "",
      startDate: "",
      num: "",
    };
    if (!name) {
      error.name = "名前を入力してください";
    }

    if (!address) {
      error.address = "※住所を入力してください";
    }
    if (!birth.match(/\d{4}\/\d{2}\/\d{2}/)) {
      error.birth = "※生年月日を正しく入力してください";
    }
    if (!phoneNumber.match(/^0[-0-9]{9,12}$/)) {
      error.phoneNumber = "※電話番号を正しく入力してください";
    }
    if (
      !mailAddress.match(
        /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
      )
    ) {
      error.mailAddress = "※メールアドレスを正しく入力してください";
    }
    if (!gender) {
      error.gender = "※性別を選択してください";
    }
    if (!plan) {
      error.plan = "プランを選択してください";
    }
    if (!startDate.match(/\d{4}\/\d{2}\/\d{2}/)) {
      error.startDate = "※入会日を正しく入力してください";
    }
    return error;
  };

  return (
    <>
      <h1>会員登録</h1>

      <div className={styles.contents}>
        <form action="" onSubmit={CreateUser}>
          <div className={styles.flex}>
            <div className={styles.divideContents}>
              <div className={styles.label}>
                名前
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.errormessage}>{errormessage.name}</div>
              </div>
              <div className={styles.label}>
                郵便番号
                <div>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                  <button onClick={addressAutoComplete}>🔍</button>
                </div>
              </div>
              <div className={styles.label}>
                住所
                <div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className={styles.errormessage}>
                  {errormessage.address}
                </div>
              </div>
              <div className={styles.label}>
                電話番号
                <div>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setphoneNumber(e.target.value)}
                  />
                </div>
                <div className={styles.errormessage}>
                  {errormessage.phoneNumber}
                </div>
              </div>
              <div className={styles.label}>
                メールアドレス
                <div>
                  <input
                    type="text"
                    value={mailAddress}
                    onChange={(e) => setMailAddress(e.target.value)}
                  />
                </div>
                <div className={styles.errormessage}>
                  {errormessage.mailAddress}
                </div>
              </div>
            </div>
            <div>
              <div className={styles.label}>
                性別
                <div>
                  男
                  <input
                    type="radio"
                    value="male"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  女
                  <input
                    type="radio"
                    value="female"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div className={styles.errormessage}>{errormessage.gender}</div>
              </div>
              <div className={styles.label}>
                生年月日(例:1999/01/01)
                <div>
                  <input
                    type="text"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                  />
                </div>
                <div className={styles.errormessage}>{errormessage.birth}</div>
              </div>
              <div className={styles.label}>
                プラン
                <div>
                  <select
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                  >
                    <option value="-">-</option>
                    <option value="all">２４時間</option>
                    <option value="weekday">平日のみ</option>
                    <option value="weekend">土日のみ</option>
                    <option value="daily">09:00~18:00</option>
                  </select>
                </div>
                <div className={styles.errormessage}>{errormessage.plan}</div>
              </div>
              <div className={styles.label}>
                入会日(例:1999/01/01)
                <div>
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setstartDate(e.target.value)}
                  />
                </div>
                <div className={styles.errormessage}>
                  {errormessage.startDate}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <button type="submit" className={styles.submit}>
              会員登録
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
