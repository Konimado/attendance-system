import React, { useEffect } from "react";
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
import { useState } from "react";
import { Users, UsersAddAge } from "../types/user";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const options = {
//   indexAxis: "y" as const,
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "right" as const,
//     },
//     title: {
//       display: true,
//       text: "年齢別会員数",
//     },
//   },
// };

// const labels = ["10", "20", "30", "40", "50", "60", "70", "80", "90"];

// const data = {
//   labels, // x軸のラベルの配列
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: Object.values(agedata), // データの配列(labelsと要素数同じ)
//       backgroundColor: "rgba(255, 99, 132, 0.5)", // グラフの棒の色
//     },
//   ],
// };

export default function ChartBar() {
  const [age, setAge] = useState<number[]>([]);

  useEffect(() => {
    axios.get("/api/user_get").then((response) => {
      const userdata: UsersAddAge[] = response.data;

      userdata.map((item) => {
        const birthday = {
          year: new Date(item.birth).getFullYear(),
          month: new Date(item.birth).getMonth() + 1,
          date: new Date(item.birth).getDate(),
        };
        //今年の誕生日
        const thisYearsBirthday = new Date(
          today.getFullYear(),
          birthday.month - 1,
          birthday.date
        );
        //年齢
        let age: number = today.getFullYear() - birthday.year;
        if (today < thisYearsBirthday) {
          //今年まだ誕生日が来ていない
          age--;
        }
        item.age = age;
      });

      let agedata = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
      };

      for (let key of userdata) {
        (agedata as any)[Math.floor(key.age / 10)] = userdata.filter(
          (x) => Math.floor(x.age / 10) === Math.floor(key.age / 10)
        ).length;
      }
      setAge(Object.values(agedata));
      console.log(Object.values(agedata));
    });
    //warningを解消する為,ESLintのルールを無効
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const today = new Date();

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: true,
        text: "年齢別会員数",
      },
    },
  };

  const labels = [
    "10歳未満",
    "10代",
    "20代",
    "30代",
    "40代",
    "50代",
    "60代",
    "70代",
    "80代",
    "90代",
  ];

  const data = {
    labels, // x軸のラベルの配列
    datasets: [
      {
        label: "Dataset 1",
        data: age, // データの配列(labelsと要素数同じ)
        backgroundColor: "rgba(255, 99, 132, 0.5)", // グラフの棒の色
      },
    ],
  };

  return (
    <>
      <Layout>
        <h2>graph-age</h2>
        <Bar options={options} data={data} />
      </Layout>
    </>
  );
}
