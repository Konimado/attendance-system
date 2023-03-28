import { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getAirportAPI = async (_req: NextApiRequest, res: NextApiResponse) => {
  const querySnapshot = await getDocs(collection(db, "users-attendance"));

  const user= [];
  querySnapshot.forEach((doc) => {
    const userdata = doc.data();
    user.push(userdata);
  });

  return res.status(200).json(user);
};

export default getAirportAPI;
