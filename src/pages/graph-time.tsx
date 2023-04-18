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
import Layout from "@/components/Layout";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function GraphTime() {
  const [timesdeta, setTimesdeta] = useState<number[]>([]);
  const [dataexist, setDataexist] = useState(false);

  useEffect(() => {
    axios.get("/api/member_attendance_get").then((res) => {
      if (res.data.length != 0) {
        const datam = [
          {
            enterTime: "2023-04-10T05:19:08.096Z",
            id: "3762",
            exitTime: "2023-04-10T05:21:47.639Z",
          },
        ];
        setDataexist(true);

        type Timedeta = {
          "1": number;
          "2": number;
          "3": number;
          "4": number;
          "5": number;
          "6": number;
          "7": number;
          "8": number;
          "9": number;
          "10": number;
          "11": number;
          "12": number;

          "13": number;
          "14": number;
          "15": number;
          "16": number;
          "17": number;
          "18": number;
          "19": number;
          "20": number;
          "21": number;
          "22": number;
          "23": number;
          "24": number;
        };
        let timedeta = {
          "1": 0,
          "2": 0,
          "3": 0,
          "4": 0,
          "5": 0,
          "6": 0,
          "7": 0,
          "8": 0,
          "9": 0,
          "10": 0,
          "11": 0,
          "12": 0,
          "13": 0,
          "14": 0,
          "15": 0,
          "16": 0,
          "17": 0,
          "18": 0,
          "19": 0,
          "20": 0,
          "21": 0,
          "22": 0,
          "23": 0,
          "24": 0,
        } as Timedeta;

        for (let keys of datam) {
          (timedeta as any)[
            new Date(keys.enterTime).getHours() as keyof string
          ] = datam.filter(
            (x) =>
              new Date(x.enterTime).getHours() ===
              new Date(keys.enterTime).getHours()
          ).length;
        }

        setTimesdeta(Object.values(timedeta));
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

  const labels = [
    "1:00-2:00",
    "2:00-3:00",
    "3:00-4:00",
    "4:00-5:00",
    "5:00-6:00",
    "6:00-7:00",
    "7:00-8:00",
    "8:00-9:00",
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
    "18:00-19:00",
    "19:00-20:00",
    "20:00-21:00",
    "21:00-22:00",
    "22:00-23:00",
    "23:00-24:00",
  ];

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
      <h2>graph-time</h2>
      {dataexist ? (
        <div>
          <h2 data-testid="time">計測結果(時間別)</h2>

          <Bar options={options} data={data} />
        </div>
      ) : (
        <p data-testid="no">データを取得できません。</p>
      )}
    </Layout>
  );
}
