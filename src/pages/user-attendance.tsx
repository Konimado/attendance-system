import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import db from "../firebase";
import { useState } from "react";
import styles from "../style/user-attendance.module.scss";

export default function UserAttendance() {
  const [id, setId] = useState("");

  const [realTime, setRealTime] = useState("");

  const [attendanceTime, setAttendanceTime] = useState("");

  console.log(attendanceTime);

  const Enter = async () => {
    const now = new Date();
    const year = now.getFullYear(); //年
    const mon = now.getMonth() + 1; //月 １を足す
    const day = now.getDate(); //日
    const hour = now.getHours(); //時間
    const min = now.getMinutes(); //分
    const sec = now.getSeconds(); //秒
    const Time = year + "/" + mon + "/" + day + "  " + hour + ":" + min + ":" + sec
    setAttendanceTime(Time);
    //状態をまず確認
    const attendanceRef = collection(db, "users-attendance");
    const attendanceData = query(attendanceRef, where("id", "==", "6662"));
    console.log(attendanceData);
    getDocs(attendanceData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => doc.data()));
      // console.log(snapShot.docs.map((doc) => doc.data().exitTime));

      const entertime = snapShot.docs.map((doc) => doc.data().enterTime);
    });
    await addDoc(collection(db, "users-attendance"), {
      id: id,
      enterTime: Timestamp.fromDate(new Date()),
      exitTime: "",
    });
    const users_status = doc(db, "users", "0pwT684Gb50bHWvKFXtg");
    await updateDoc(users_status, { status: true });
  };

  const Exit = async () => {
    const time = new Date();

    await addDoc(collection(db, "users-attendance"), {
      id: id,
      exitTime: Timestamp.fromDate(new Date()),
      enterTime: "",
    });
  };

  setInterval(() => {
    setRealTime(new Date().toLocaleString());
  }, 1000);

  return (
    <>
      <div className={styles.contents}>
        <div className={styles.user_number}>
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
          <div>Koniさんは入場しました。</div>
          <span>{attendanceTime}</span>
        </div>
      </div>
    </>
  );
}
