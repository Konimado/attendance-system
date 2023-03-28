import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import styles from "../style/user-attendance.module.scss";
import Layout from "@/components/layout";

export default function UserAttendance() {
  const [id, setId] = useState("");

  const [realTime, setRealTime] = useState("");

  const [attendanceTime, setAttendanceTime] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const [notice, setNotice] = useState("");
  const [timenotice,setTimenotice]=useState("")

  const now = new Date();
    const year = now.getFullYear(); //年
    const mon = now.getMonth() + 1; //月 １を足す
    const day = now.getDate(); //日
    const hour = now.getHours(); //時間
    const min = now.getMinutes(); //分
    const sec = now.getSeconds(); //秒
    const Time =
      year + "/" + mon + "/" + day + "  " + hour + ":" + min + ":" + sec;
  const Enter = async () => {
    setErrormessage("")
    if (!id) {
      return setErrormessage("会員番号を入力してください");
    }
    
   
    //状態をまず確認
    const attendanceRef = doc(db, "users", id);
    const docSnap = await getDoc(attendanceRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      console.log(docSnap.data().statue);
      if (docSnap.data().statue) {
        setErrormessage("エラー！！既入場しています。");
      } else {
        console.log(false);
        await addDoc(collection(db, "users-attendance"), {
          id: id,
          enterTime: Timestamp.fromDate(new Date()),
          exitTime: "",
        });
        //status:trueを保存
        const users_status = doc(db, "users", id);
        await updateDoc(users_status, { statue: true });
        const usersSnap = await getDoc(users_status);
        if (usersSnap.exists()) {
          setAttendanceTime(Time);
          console.log(usersSnap.data().name);
          setNotice(`${usersSnap.data().name}さんが入場しました。`);
        }
        setTimenotice("3秒後にリセットされます")
        setTimeout(() => {
          setNotice("");
          setAttendanceTime("");
          setId("")
          setTimenotice("")
    setErrormessage("")

        }, 3000);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };


  const Exit = async () => {
    if (!id) {
      return setErrormessage("会員番号を入力してください");
    }
    setErrormessage("")
    //状態をまず確認
    const attendanceRef = doc(db, "users", id);
    const docSnap = await getDoc(attendanceRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      console.log(docSnap.data().statue);
      if (docSnap.data().statue) {
        await addDoc(collection(db, "users-attendance"), {
          id: id,
          enterTime: "",
          exitTime: Timestamp.fromDate(new Date()),
        });
        //status:trueを保存
        const users_status = doc(db, "users", id);
        await updateDoc(users_status, { statue: false });
        const usersSnap = await getDoc(users_status);
        if (usersSnap.exists()) {
          setAttendanceTime(Time);
          console.log(usersSnap.data().name);
          setNotice(`${usersSnap.data().name}さんが退場しました。`);
          setTimenotice("3秒後にリセットされます")
          setTimeout(() => {
            setNotice("");
            setAttendanceTime("");
            setId("")
    setErrormessage("")

          }, 3000);
        }
      } else {
        console.log(false);
        setErrormessage("エラー！！入場していません。");
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  setInterval(() => {
    setRealTime(new Date().toLocaleString());
  }, 1000);

  return (
    <>
    <Layout>
      <div className={styles.contents}>
        <div className={styles.user_number}>
          {/* {user.map((u)=>u)} */}
          <label htmlFor="">
            会員番号
            <div>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </label>
        </div>
        <div className={styles.attendance_button}>
          <div className={styles.button}>
            <button onClick={Enter} className={styles.click}>
              入場
            </button>
          </div>
          <div className={styles.button}>
            <button onClick={Exit} className={styles.click}>
              退場
            </button>
          </div>
        </div>
        <div className={styles.real_time}>
          <div>現在時刻</div>
          <span>{realTime}</span>
        </div>
        <div className={styles.attendance_notice}>
          <p>{errormessage}</p>
          <p>{notice}</p>
          <span>{attendanceTime}</span>
          <p>{timenotice}</p>
        </div>
      </div>
      </Layout>
    </>
  );
}
