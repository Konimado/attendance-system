import React, { use, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import Layout from "@/components/Layout";
import { Users } from "@/types/user";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function GraphPlan() {
  let planItem = [0, 0, 0, 0];
  const [dataexist, setDataexist] = useState(false);
  const [planItems, setPlanItems] = useState([0, 0, 0, 0]);

  useEffect(() => {
    axios.get("/api/user_get").then((response) => {
      console.log("aaa", response.data);
      if (response.data.length != 0) {
        const userdata = response.data;
        setDataexist(true);
        userdata.map((item: Users) => {
          // console.log(item.plan);
          if (item.plan === "all") {
            return (planItem = [
              planItem[0] + 1,
              planItem[1],
              planItem[2],
              planItem[3],
            ]);
          } else if (item.plan === "daily") {
            return (planItem = [
              planItem[0],
              planItem[1] + 1,
              planItem[2],
              planItem[3],
            ]);
          } else if (item.plan === "weekday") {
            return (planItem = [
              planItem[0],
              planItem[1],
              planItem[2] + 1,
              planItem[3],
            ]);
          } else if (item.plan === "weekend") {
            return (planItem = [
              planItem[0],
              planItem[1],
              planItem[2],
              planItem[3] + 1,
            ]);
          }
        });
        setPlanItems(planItem);
      } else {
        console.log("エラー");
      }
    });
  }, []);

  const data = {
    labels: ["24時間", "平日", "土日", "通常"],
    datasets: [
      {
        label: "人数",
        data: planItems,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <Layout>
      <h2>graph-plan</h2>
      {dataexist ? (
        <div>
          <h2 data-testid="plan">計測結果(プラン別)</h2>
          <Pie data={data} />{" "}
        </div>
      ) : (
        <div data-testid="no">データを取得できません。</div>
      )}
    </Layout>
  );
}
