import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, orderBy } from "firebase/firestore";
import Layout from "../components/layout";

// type EntryUsers = {
//   address?: string;
//   birth?: string;
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
    const usersAttendance = collection(db, "users-attendance");
    // const q = query(usersAttendance, orderBy());
    getDocs(usersAttendance).then((snapShot) => {
      //現在時刻取得
      const date = new Date();
      const nowYear = date.getFullYear();
      const nowMonth = date.getMonth();
      const nowDate = date.getDate();
      const nowTime = `${nowYear}/${nowMonth + 1}/${nowDate}`;
      //users-attendance情報取得
      const nowEntries = snapShot.docs.map((doc) => doc.data());
      //現在入場者情報取得
      nowEntries
        .filter((nowEntry) => {
          if (nowEntry.enterTime) {
            const entrydate = nowEntry.enterTime.toDate();
            const entryYear = entrydate.getFullYear();
            const entryMonth = entrydate.getMonth();
            const entryDate = entrydate.getDate();
            const entryTime = `${entryYear}/${entryMonth + 1}/${entryDate}`;
            return entryTime === nowTime;
          }
        })
        .map(async (entryItem) => {
          //データベースからデータを取得する(ユーザー情報)
          const users = doc(db, "users", `${entryItem.id}`);
          const docSnap = await getDoc(users);
          mapEntryUsers.push(docSnap.data());
          setNowEntryUsers(mapEntryUsers);
        });
    });
    //warningを解消する為,ESLintのルールを無効
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //退場
  useEffect(() => {
    //データベースからデータを取得する(attendance情報)
    const usersAttendance = collection(db, "users-attendance");
    // const q = query(usersAttendance, orderBy());
    getDocs(usersAttendance).then((snapShot) => {
      //現在時刻取得
      const date = new Date();
      const nowYear = date.getFullYear();
      const nowMonth = date.getMonth();
      const nowDate = date.getDate();
      const nowTime = `${nowYear}/${nowMonth + 1}/${nowDate}`;
      //users-attendance情報取得
      const nowExits = snapShot.docs.map((doc) => doc.data());
      //現在入場者情報取得
      nowExits
        .filter((nowExit) => {
          if (nowExit.exitTime) {
            const exitdate = nowExit.exitTime.toDate();
            const exitYear = exitdate.getFullYear();
            const exitMonth = exitdate.getMonth();
            const exitDate = exitdate.getDate();
            const exitTime = `${exitYear}/${exitMonth + 1}/${exitDate}`;
            return exitTime === nowTime;
          }
        })
        .map(async (exitItem) => {
          //データベースからデータを取得する(ユーザー情報)
          const users = doc(db, "users", `${exitItem.id}`);
          const docSnap = await getDoc(users);
          mapExitUsers.push(docSnap.data());
          setNowExitUsers(mapExitUsers);
        });
    });
    //warningを解消する為,ESLintのルールを無効
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // setInterval(() => {
  //   console.log(nowEntryUsers);
  // }, 5000);

  return (
    <Layout>
      <div>
        <p>入場</p>
        {nowEntryUsers.map((item: any, index) => (
          <div key={index}>
            <h1>{item.name}</h1>
          </div>
        ))}
      </div>
      <div>
        <p>退場</p>
        {nowExitUsers.map((item: any, index) => (
          <div key={index}>
            <h1>{item.name}</h1>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Index;
