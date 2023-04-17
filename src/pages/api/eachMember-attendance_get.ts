import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "../../firebase";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Fetchmemberattendance,
  Memberattendance,
} from "@/types/member-attendance";

export async function getData(keyword: number) {
  const user: Fetchmemberattendance[] = [];
  const useRef = collection(db, "users-attendance");
  const q = query(useRef, where("id", "==", `${keyword}`));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    user.push(doc.data());
  });
  user.map((u) => {
    u.enterTime = u.enterTime.toDate();
    u.exitTime = u.exitTime.toDate();
  });

  return user;
}

// export const getUser = async (id) => {
//   return await fetch(`https://example.com/user?userId=${id}`, {
//     method: "GET",
//   });
// };

// Next.jsのAPI定義
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>
// ) {
//   const data = await getData();

//   res.status(200).json(data);
// }
