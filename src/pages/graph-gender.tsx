import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import Layout from "@/components/Layout";
import { Users } from "@/types/user";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function GraphGender() {
  let genderItem = [0, 0];
  const [genderItems, setGenderItems] = useState([0, 0]);
  const [dataexist, setDataexist] = useState(false);

  useEffect(() => {
    axios.get("/api/user_get").then((response) => {
      if (response.data.length != 0) {
        const userdata = response.data;
        setDataexist(true);
        userdata.map((item: Users) => {
          if (item.gender === "male") {
            return (genderItem = [genderItem[0] + 1, genderItem[1]]);
          } else {
            return (genderItem = [genderItem[0], genderItem[1] + 1]);
          }
        });
        setGenderItems(genderItem);
      } else console.log("エラー");
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
      <h2>graph-gender</h2>
      {dataexist ? (
        <div>
          <h2 data-testid="gender">計測結果(男女別)</h2>
          <Pie data={data} />
        </div>
      ) : (
        <p data-testid="no">データを取得できません。</p>
      )}
    </Layout>
  );
}
