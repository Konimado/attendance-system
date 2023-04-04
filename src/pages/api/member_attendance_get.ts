import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import {fetchmemberattendance} from "@/types/member-attendance";

const getAirportAPI = async (_req: NextApiRequest, res: NextApiResponse) => {
  const querySnapshot = await getDocs(collection(db, "users-attendance"));

  const user:fetchmemberattendance[]= [];
  querySnapshot.forEach((doc) => {
    const userdata = doc.data();
   
    user.push(userdata);
  });
  
  user.map((user)=>{
    console.log(typeof user.enterTime.toString())
    console.log( user.enterTime.toString())

    user.enterTime = (user.enterTime).toDate();
    user.exitTime = user.exitTime.toDate();
  })

  return res.status(200).json(user);
};

export default getAirportAPI;
