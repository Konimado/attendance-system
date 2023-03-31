import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Time from "../function/time";
import index from "../style/index.module.scss";
import axios from "axios";
import Router from "next/router";

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

    axios
      .post("/api/user_get", { order: "order" })
      .then((response) => {
        //現在時刻取得
        const time = Time();
        const nowTime = `${time.year}/${time.mon}/${time.day}`;
        // const nowEntries = JSON.parse(response.data);
        const nowEntries = response.data;
        //現在入場者情報取得
        // const nowEntryUsersItem = nowEntries.filter((nowEntry) => {
        const nowEntryUsersItem: any = nowEntries.filter((nowEntry: any) => {
          if (nowEntry.enterTime) {
            // const entrydate = nowEntry.enterTime.toDate();
            const entrydate = new Date(nowEntry.enterTime);
            const entryYear = entrydate.getFullYear();
            const entryMonth = entrydate.getMonth();
            const entryDate = entrydate.getDate();
            const entryTime = `${entryYear}/${entryMonth + 1}/${entryDate}`;
            return entryTime === nowTime;
          }
        });
        setNowEntryUsers(nowEntryUsersItem);
      })
      .catch(function (error) {
        Router.push("/");
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

                  {new Date(item.enterTime).getMinutes() < 10 ? (
                    <td>{`${new Date(item.enterTime).getHours()}:0${new Date(
                      item.enterTime
                    ).getMinutes()}`}</td>
                  ) : (
                    <td>{`${new Date(item.enterTime).getHours()}:${new Date(
                      item.enterTime
                    ).getMinutes()}`}</td>
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
              {nowEntryUsers.map((item: any, index) => (
                <tr key={index}>
                  {item.exitTime !== "NaN" &&
                  item.exitTime.split("T")[0] ===
                    new Date().toISOString().split("T")[0] ? (
                    new Date(item.exitTime).getMinutes() < 10 ? (
                      <>
                        <td>{item.name}</td>
                        <td>{`${new Date(item.exitTime).getHours()}:0${new Date(
                          item.exitTime
                        ).getMinutes()}`}</td>
                      </>
                    ) : (
                      <>
                        <td>{item.name}</td>
                        <td>{`${new Date(item.exitTime).getHours()}:${new Date(
                          item.exitTime
                        ).getMinutes()}`}</td>
                      </>
                    )
                  ) : (
                    <td></td>
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
