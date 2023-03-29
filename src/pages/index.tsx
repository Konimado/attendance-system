import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Layout from "../components/Layout";
import Time from "../function/time";
import index from "../style/index.module.scss";

// type EntryUsers = {
//   address?: string;
//   birth?: string;
//   enterTime: number;
//   exitTime: number;
//   gender?: string;
//   mailAddress?: string;
//   name?: string;
//   phoneNumber?: string;
//   plan?: string;
//   postalCode?: string;
//   startDate?: string;
//   statue?: boolean;
// };

//入場
const Index = () => {
  const [nowEntryUsers, setNowEntryUsers] = useState([]);
  const [nowExitUsers, setNowExitUsers] = useState([]);
  // const mapEntryUsers: EntryUsers[] = [];
  const mapEntryUsers: any = [];
  const mapExitUsers: any = [];

  useEffect(() => {
    //データベースからデータを取得する(attendance情報)
    const users = collection(db, "users");
    const q = query(users, orderBy("enterTime", "desc"));
    getDocs(q).then((snapShot) => {
      //現在時刻取得
      const time = Time();
      const nowTime = `${time.year}/${time.mon}/${time.day}`;
      //users-attendance情報取得
      const nowEntries = snapShot.docs.map((doc) => doc.data());
      //現在入場者情報取得
      // const nowEntryUsersItem = nowEntries.filter((nowEntry) => {
      const nowEntryUsersItem: any = nowEntries.filter((nowEntry) => {
        if (nowEntry.enterTime) {
          const entrydate = nowEntry.enterTime.toDate();
          const entryYear = entrydate.getFullYear();
          const entryMonth = entrydate.getMonth();
          const entryDate = entrydate.getDate();
          const entryTime = `${entryYear}/${entryMonth + 1}/${entryDate}`;
          return entryTime === nowTime;
        }
      });
      return setNowEntryUsers(nowEntryUsersItem);
    });
    //warningを解消する為,ESLintのルールを無効
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //退場
  useEffect(() => {
    //データベースからデータを取得する(attendance情報)
    const usersAttendance = collection(db, "users");
    const q = query(usersAttendance, orderBy("enterTime", "desc"));
    getDocs(q).then((snapShot) => {
      //現在時刻取得
      const time = Time();
      const nowTime = `${time.year}/${time.mon}/${time.day}`;
      //users-attendance情報取得
      snapShot.docs.map((doc) => console.log(doc.data()));
      const nowExits = snapShot.docs.map((doc) => doc.data());
      //現在退場者情報取得
      // const nowExitUsersItem= nowExits.filter((nowExit) => {
      const nowExitUsersItem: any = nowExits.filter((nowExit) => {
        if (nowExit.exitTime) {
          const entrydate = nowExit.enterTime.toDate();
          const entryYear = entrydate.getFullYear();
          const entryMonth = entrydate.getMonth();
          const entryDate = entrydate.getDate();
          const entryTime = `${entryYear}/${entryMonth + 1}/${entryDate}`;
          return entryTime === nowTime;
        }
      });
      return setNowExitUsers(nowExitUsersItem);
    });
    //warningを解消する為,ESLintのルールを無効
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <>
        <h2 className={index.h2}>入場</h2>
        <div className={index.table}>
          <table>
            <thead>
              <tr>
                <th>名前</th>
                <th>入場時間</th>
              </tr>
            </thead>
            <tbody>
              {nowEntryUsers.map((item: any, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  {item.enterTime.toDate().getMinutes() < 10 ? (
                    <td>{`${item.enterTime
                      .toDate()
                      .getHours()}:0${item.enterTime
                      .toDate()
                      .getMinutes()}`}</td>
                  ) : (
                    <td>{`${item.enterTime.toDate().getHours()}:${item.enterTime
                      .toDate()
                      .getMinutes()}`}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className={index.h2}>退場</h2>
        <div className={index.table}>
          <table>
            <thead>
              <tr>
                <th>名前</th>
                <th>退場時間</th>
              </tr>
            </thead>
            <tbody>
              {nowExitUsers.map((item: any, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  {item.exitTime.toDate().getMinutes() < 10 ? (
                    <td>{`${item.exitTime.toDate().getHours()}:0${item.exitTime
                      .toDate()
                      .getMinutes()}`}</td>
                  ) : (
                    <td>{`${item.exitTime.toDate().getHours()}:${item.exitTime
                      .toDate()
                      .getMinutes()}`}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </Layout>
  );
};

export default Index;
