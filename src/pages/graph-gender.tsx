import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import Layout from "@/components/Layout";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function App() {
  let genderItem = [0, 0];
  const [genderItems, setGenderItems] = useState([0, 0]);

  useEffect(() => {
    axios.get("/api/user_get").then((response) => {
      const userdata = response.data;
      userdata.map((item: any) => {
        if (item.gender === "male") {
          return (genderItem = [genderItem[0] + 1, genderItem[1]]);
        } else {
          return (genderItem = [genderItem[0], genderItem[1] + 1]);
        }
      });
      setGenderItems(genderItem);
    });
  }, []);

  const data = {
    labels: ["女性", "男性"],
    datasets: [
      {
        label: "# of Votes",
        data: genderItems,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <Layout>
      <Pie data={data} />
    </Layout>
  );
}
