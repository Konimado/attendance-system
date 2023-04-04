import Layout from "@/components/Layout";
import useSWR from "swr";
import {
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRef, useState } from "react";
import { fetchUsers } from "@/types/fetchUsers";
import { fetchmemberattendance } from "@/types/member-attendance";

export const getServerSideProps = async (id: { query: { id: number; }; }) => {
  const user:fetchmemberattendance[]  = [];
  const useRef = collection(db, "users-attendance");
  const q = query(useRef, where("id", "==", `${id.query.id}`));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    user.push(doc.data());
  });

  user.map((u) => {
    u.enterTime = u.enterTime.toDate();
    u.exitTime = u.exitTime.toDate();
  });

  return {
    props: {
      //javascriptオブジェクト
      data: JSON.stringify(user),
    },
  };
};

export default function MemberAttendanceLog({ data }) {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  if (!data) return;
  const datam = JSON.parse(data);
  //取得したデータに新たなオブジェクトdateを追加して00/00の形で保存
  datam.map((t) => {
    t.date = `${new Date(t.enterTime).getMonth() + 1}/${new Date(
      t.enterTime
    ).getDate()}`;
  });

  //最終日計算
  let lastday = new Date(year, month, 0);
  //最終日の日付のみ
  lastday = lastday.getDate();


  let date = [];
  for (var i = 1; i <= lastday; i++) {
    let xday = new Date(year, month, i);
    let xdays = xday.getDay();
    let weekjp = new Array("日", "月", "火", "水", "木", "金", "土");
    let weeks = weekjp[xdays];
    date.push({ day: `${month}/${i}`, date: i, weeks: weeks });
  }


  let datefinish = [];
  date.map((d) => {
    const filterdam = datam.filter((dm) => {
      return dm.date === d.day;
    });
    if (filterdam.length === 0) {
      datefinish.push({
        enterTime: "",
        exitTime: "",
        date: d.day,
        week: d.weeks,
      });
    } else {
      filterdam[0].week = d.weeks;
      datefinish.push(filterdam[0]);
    }
  });

  //プルダウン用：とりあえず前後10年間表示
  let pulldownyear = [];
  for (let i = 2013; i < 2033; i++) {
    pulldownyear.push(i);
  }
  //プルダウン用：1月〜12月
  let pulldownmonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const changeYear = (e) => {
    setYear(e.target.value);
  };

  const changeMonth = (e) => {
    console.log(e.target.value);
    setMonth(e.target.value);
  };

  return (
    <>
      <Layout>
        <p>月次入退場データ</p>

        <form action="">
          <select name="" id="" value={year} onChange={changeYear}>
            {pulldownyear.map((y, index) => {
              return (
                <option value={y} key={index}>
                  {y}
                </option>
              );
            })}
          </select>
          年
          <select name="" id="" value={month} onChange={changeMonth}>
            {pulldownmonth.map((m, index) => {
              return (
                <option value={m} key={index}>
                  {m}
                </option>
              );
            })}
          </select>
          月
        </form>
        <div>
          表示期間:{year}年{month}月
        </div>
        <table border={1} style={{ borderCollapse: "collapse" }}>
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
            {datefinish.map((d, index) => (
              <tr key={index}>
                <td>{d.date}</td>
                <td>{d.week}</td>

                <td>
                  {d.enterTime === ""
                    ? ""
                    : `${
                      new Date(d.enterTime).getMinutes() < 10
                        ? `${new Date(d.enterTime).getHours()}:0${new Date(
                            d.enterTime
                          ).getMinutes()}`
                        : `${new Date(d.enterTime).getHours()}:${new Date(
                            d.enterTime
                          ).getMinutes()}`
                    }`}
                </td>
                <td>
                  {d.exitTime === ""
                    ? ""
                    : `${
                        new Date(d.exitTime).getMinutes() < 10
                          ? `${new Date(d.exitTime).getHours()}:0${new Date(
                              d.exitTime
                            ).getMinutes()}`
                          : `${new Date(d.exitTime).getHours()}:${new Date(
                              d.exitTime
                            ).getMinutes()}`
                      }`}
                </td>

                <td>
                  {d.enterTime === ""
                    ? ""
                    : `${Math.round(
                        ((new Date(d.exitTime).getTime() -
                          new Date(d.enterTime).getTime()) /
                          1000 /
                          60 /
                          60) %
                          24
                      )}時間  ${Math.round(
                        ((new Date(d.exitTime).getTime() -
                          new Date(d.enterTime).getTime()) /
                          1000 /
                          60) %
                          60
                      )}
                  分`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </>
  );
}
