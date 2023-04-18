import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Fetchmemberattendance } from "@/types/member-attendance";

export async function getMemberList() {
  const users: Fetchmemberattendance[] = [];
  const usersItem = await getDocs(collection(db, "users"));

  usersItem.forEach((doc) => {
    const userdata = doc.data();
    users.push(userdata);
  });

  return users;
}

export default getMemberList;
