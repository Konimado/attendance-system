import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Time from "../function/time";
import index from "../style/index.module.scss";
import axios from "axios";
import Router from "next/router";
import { Users } from "../types/user";

//入場
const Index = () => {
  const [nowEntryUsers, setNowEntryUsers] = useState<Users[]>([]);

  useEffect(() => {
    //データベースからデータを取得する(attendance情報)
    axios
      .post("/api/user_get", { order: "order" })
      .then((response) => {
        //現在時刻取得
        const time = Time();
        const nowTime = `${time.year}/${time.mon}/${time.day}`;
        const nowEntries = response.data;
        console.log(nowEntries);
        //現在入場者情報取得
        const nowEntryUsersItem: Users[] = nowEntries.filter(
          (nowEntry: Users) => {
            if (nowEntry.enterTime) {
              const entrydate = new Date(nowEntry.enterTime);
              console.log(entrydate);
              const entryYear = entrydate.getFullYear();
              const entryMonth = entrydate.getMonth();
              const entryDate = entrydate.getDate();
              const entryTime = `${entryYear}/${entryMonth + 1}/${entryDate}`;
              return entryTime === nowTime;
            }
          }
        );
        setNowEntryUsers(nowEntryUsersItem);
      })
      .catch(function (_error) {
        Router.push("/");
      });

    //warningを解消する為,ESLintのルールを無効
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <>
        <h2 className={index.h2}>入場</h2>
        <p>aaa</p>
        <p>bbb</p>
        <div className={index.table}>
          <table>
            <thead>
              <tr>
                <th>名前</th>
                <th>入場時間</th>
              </tr>
            </thead>
            <tbody>
              {nowEntryUsers
                ? nowEntryUsers.map((item: Users, index) => (
                    <tr key={index} data-testid="character">
                      <td data-testid="name">{item.name}</td>
                      {new Date(item.enterTime).getMinutes() < 10 ? (
                        <td>
                          {`${new Date(item.enterTime).getHours()}:0${new Date(
                            item.enterTime
                          ).getMinutes()}`}
                        </td>
                      ) : (
                        <td>
                          {`${new Date(item.enterTime).getHours()}:${new Date(
                            item.enterTime
                          ).getMinutes()}`}
                        </td>
                      )}
                    </tr>
                  ))
                : null}
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
              {nowEntryUsers
                ? nowEntryUsers.map((item: Users, index) => (
                    <tr key={index}>
                      {item.exitTime !== "NaN" &&
                      item.exitTime.split("T")[0] ===
                        new Date().toISOString().split("T")[0] ? (
                        new Date(item.exitTime).getMinutes() < 10 ? (
                          <>
                            <td>{item.name}</td>
                            <td>{`${new Date(
                              item.exitTime
                            ).getHours()}:0${new Date(
                              item.exitTime
                            ).getMinutes()}`}</td>
                          </>
                        ) : (
                          <>
                            <td>{item.name}</td>
                            <td>{`${new Date(
                              item.exitTime
                            ).getHours()}:${new Date(
                              item.exitTime
                            ).getMinutes()}`}</td>
                          </>
                        )
                      ) : (
                        <td></td>
                      )}
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </>
    </Layout>
  );
};

export default Index;
