import Layout from "@/components/Layout";
import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import {
  Fetchmemberattendance,
  Memberattendance,
} from "@/types/member-attendance";
import { getData, getUser } from "./api/eachMember-attendance_get";
import axios from "axios";

type tofetchmemberattendance = {
  enterTime?: any;
  exitTime?: any;
  id?: number;
  date: any;
  week: string;
};
export const getServerSideProps = async (context: {
  query: { id: number };
}) => {
  console.log("aaa");
  const user = await getUser(context.query.id);
  // const user = await getUser(2349);

  // const user = axios.get("/api/eachMember-attendance_get").then((res) => {
  //   console.log("SSR", res.data);
  //   return res.data;
  // });
  console.log(user);

  return {
    props: {
      //javascriptオブジェクト(タイムスタンプをシリアライズする必要がある)
      data: JSON.stringify(user),
    },
  };
};

export default function MemberAttendanceLog({ data }: { data: string }) {
  // useEffect(() => {
  //   axios
  //     .get("/api/eachMember-attendance_get")
  //     .then((res) => {
  //       console.log("axios", res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  if (!data) return;
  const datam: Memberattendance[] = JSON.parse(data);
  //取得したデータに新たなオブジェクトdateを追加して00/00の形で保存
  datam.map((t) => {
    t.date = `${new Date(t.enterTime).getMonth() + 1}/${new Date(
      t.enterTime
    ).getDate()}`;
  });

  //最終日計算
  let lastday = new Date(year, month, 0).getDate();

  type Date = {
    day: string;
    date: number;
    weeks: string;
  };
  let date: Date[] = [];
  for (var i = 1; i <= lastday; i++) {
    let xday = new Date(year, month, i);
    let xdays = xday.getDay();
    let weekjp = new Array("日", "月", "火", "水", "木", "金", "土");
    let weeks = weekjp[xdays];
    date.push({ day: `${month}/${i}`, date: i, weeks: weeks });
  }

  let datefinish: tofetchmemberattendance[] = [];
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

  const changeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  const changeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(e.target.value));
  };

  return (
    <>
      <Layout>
        <p>月次入退場データ</p>

        <form action="">
          <select
            name=""
            id=""
            value={year}
            onChange={(e) => {
              changeYear(e);
            }}
          >
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
