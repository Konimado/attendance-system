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
import { Memberattendance } from "@/types/member-attendance";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {
  const [timesdeta, setTimesdeta] = useState<number[]>([]);
  useEffect(() => {
    axios.get("/api/member_attendance_get").then((res) => {
      console.log(res.data);
      const datam:Memberattendance[] = res.data;

      let daydeta = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0
      };

      console.log(new Date().getDay())
      for (let key of datam) {
        (daydeta as any)[new Date(key.enterTime).getDay()] = datam.filter(
          (x) =>
            new Date(x.enterTime).getDay() ===
            new Date(key.enterTime).getDay()
        ).length;
      }
  
      setTimesdeta(Object.values(daydeta));
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
    "月",
    "火",
    "水",
    "木",
    "金",
    "土",
    "日",
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
      <h2>graph-day-of-week</h2>
      <Bar options={options} data={data} />
    </Layout>
  );
}
