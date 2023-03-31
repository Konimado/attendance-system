import Layout from "@/components/Layout";
import useSWR from "swr";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRef, useState } from "react";

export const getServerSideProps = async (id) => {
  console.log("SSR", id.query);
  const user: any = [];
  const useRef = collection(db, "users-attendance");
  const q = query(useRef, where("id", "==", "3547"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    user.push(doc.data());
  });

  user.map((u: any) => {
    u.enterTime = u.enterTime.toDate();
    u.exitTime = u.exitTime.toDate();
  });

  // });

  // console.log("parse");
  return {
    props: {
      //javascriptオブジェクト
      data: JSON.stringify(user),
    },
  };
};

export default function MemberAttendanceLog({ data }) {
  if (!data) return;
  // console.log("data", JSON.parse(data));
  const datam = JSON.parse(data);

  datam.map((t) => {
    // t.date = `${new Date(t.enterTime).getMonth}`/`${new Date(t.enterTime).getDate()}`;
    t.date = `${new Date(t.enterTime).getMonth() + 1}/${new Date(
      t.enterTime
    ).getDate()}`;
  });
  console.log("datm", datam);

  // const parseData = JSON.parse(data);
  // const enterTime=parseData[0].enterTime
  // console.log()
  // console.log("timee", new Date(enterTime).getDay());

  // console.log("javascript",Date.now())
  // console.log(Timestamp.fromDate(new Date()).toDate())

  let today = new Date();
  let myYear = today.getFullYear();
  let myMonth = today.getMonth();
  let lastday = new Date(myYear, myMonth + 1, 0);
  lastday = lastday.getDate();
  // console.log("lastday", lastday);

  let date = [];
  for (var i = 1; i <= lastday; i++) {
    let xday = new Date(myYear, myMonth, i);
    let xdays = xday.getDay();
    // console.log("xdays", xdays);
    let weekjp = new Array("日", "月", "火", "水", "木", "金", "土");
    let weeks = weekjp[xdays];
    date.push({ day: `${myMonth + 1}/${i}`, date: i, weeks: weeks });
  }
  console.log(date);

  date.map((d) => {
    const filterdam = datam.filter((dm) => {
      // console.log(dm.date,d.day)
      return dm.date === d.day;
    });
    filterdam.day = d.day;
    filterdam.weeks = d.weeks;
    if (!filterdam.enterTime) {
      filterdam.enterTime = "";
      filterdam.exitTime = "";
    }
    console.log("filter", filterdam);
  });

  return (
    <>
      <Layout>
        <p>月次入退場データ</p>

        {/* <p>{data[0].enterTime}</p> */}
        {/* <p >{ new Date(JSON.parse(data)[0].enterTime.seconds*1000).toLocaleString()}</p> */}
        {/* {new Date(JSON.parse(data)[0].enterTime.seconds*1000)} */}
        {/* <p>{new Date(data[0].enterTime.seconds*1000)}</p> */}
        <form action="">
          <select name="" id="">
            <option value=""></option>
          </select>
          年
          <select name="" id="">
            <option value=""></option>
          </select>
          月
        </form>
        <div></div>
        <table>
          <thead>
            <tr>
              <td>日付</td>
              <td>曜日</td>
              <td>入場</td>
              <td>退場</td>
              <td>滞在時間</td>
            </tr>
          </thead>
          <tbody>
            {date.map((d, index) => (
              <tr key={index}>
                <td>{d.date}</td>
                <td>{d.weeks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </>
  );
}
