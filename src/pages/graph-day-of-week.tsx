import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Layout from "@/components/layout";
import axios from "axios";
import { Memberattendance } from "@/types/member-attendance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function GraphDayWeek() {
  const [dataexist, setDataexist] = useState(false);

  const [timesdeta, setTimesdeta] = useState<number[]>([]);
  useEffect(() => {
    axios.get("/api/member_attendance_get").then((res) => {
      if (res.data.length != 0) {
        const datam: Memberattendance[] = res.data;
        setDataexist(true);
        let daydeta = {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
          "6": 0,
          "7": 0,
        };

        for (let key of datam) {
          (daydeta as any)[new Date(key.enterTime).getDay()] = datam.filter(
            (x) =>
              new Date(x.enterTime).getDay() ===
              new Date(key.enterTime).getDay()
          ).length;
        }

        setTimesdeta(Object.values(daydeta));
      } else {
        console.log("エラー");
      }
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "時間別会員数",
      },
    },
  };

  const labels = ["月", "火", "水", "木", "金", "土", "日"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: timesdeta,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <Layout>
      <h2>graph-day-of-week</h2>
      {dataexist ? (
        <div>
          <h2 data-testid="weekday">計測結果(曜日別)</h2>
          <Bar options={options} data={data} />
        </div>
      ) : (
        <div data-testid="no">データを取得できません。</div>
      )}
    </Layout>
  );
}
