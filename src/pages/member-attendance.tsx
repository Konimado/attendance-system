import { useState } from "react";
import styles from "../style/user-attendance.module.scss";
import Layout from "@/components/Layout";
import Times from "@/function/time";
import axios from "axios";

export default function MemberAttendance() {
  const [id, setId] = useState("");
  const [realTime, setRealTime] = useState("");
  const [attendanceTime, setAttendanceTime] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const [notice, setNotice] = useState("");
  const [timenotice, setTimenotice] = useState("");
  const Time =
    Times().year +
    "/" +
    Times().mon +
    "/" +
    Times().day +
    "  " +
    Times().hour +
    ":" +
    Times().min +
    ":" +
    Times().sec;

  const Enter = async () => {
    if (!id) {
      return setErrormessage("会員番号を入力してください");
    }
    //状態をまず確認
    //response.dataに指定userの情報が取得
    axios.post("/api/user_get", { id: id }).then((response) => {
      if (response.data[0]) {
        const userInfo = response.data[0];
        //statue:trueの場合はエラー文を出力
        if (response.data[0].statue) {
          setErrormessage("エラー！！既に入場しています。");
        }
        //statue;falseの場合はstatue:tureを保存する
        else {
          axios.post("/api/user_post", {
            id: id,
            statue: true,
          });
          setAttendanceTime(Time);
          setNotice(`${userInfo.name}さんが入場しました。`);
          setTimenotice("3秒後にリセットされます");
          setTimeout(() => {
            setNotice("");
            setAttendanceTime("");
            setId("");
            setTimenotice("");
            setErrormessage("");
          }, 3000);
        }
      } else {
        setErrormessage("会員番号が間違っています");
      }
    });
  };

  const Exit = async () => {
    if (!id) {
      return setErrormessage("会員番号を入力してください");
    }
    //状態をまず確認
    axios.post("/api/user_get", { id: id }).then((response) => {
      if (response.data[0]) {
        const userInfo = response.data[0];

        //statue:trueの場合はstatue:falseを保存

        if (response.data[0].statue) {
          axios.post("/api/user_post", {
            id: id,
            statue: false,
          });
          //enterTimeとexitTimeをuser-attendanceに保存

          axios.post("/api/member_attendance_post", {
            id: id,
            enterTime: response.data[0].enterTime,
          });
          setAttendanceTime(Time);
          setNotice(`${userInfo.name}さんが退場しました。`);
          setTimenotice("3秒後にリセットされます");
          setTimeout(() => {
            setNotice("");
            setAttendanceTime("");
            setId("");
            setTimenotice("");
            setErrormessage("");
          }, 3000);
        }
        //statue;falseの場合はエラー文を出力
        else {
          // setErrormessage("エラー！！既に入場しています。");
        }
      } else {
        setErrormessage("会員番号が間違っています");

        // return Promise.reject(new Error("エラーです"));
      }
    });
  };

  setInterval(() => {
    setRealTime(new Date().toLocaleString());
  }, 1000);

  return (
    <>
      <Layout>
        <div className={styles.contents}>
          <div className={styles.user_number}>
            <label htmlFor="">
              会員番号
              <div>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="memberid"
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
            <p data-testid="error">{errormessage}</p>
            <h2 data-testid="notice">{notice}</h2>

            <span>{attendanceTime}</span>
            <p data-testid="timenotice">{timenotice}</p>
          </div>
        </div>
      </Layout>
    </>
  );
}
