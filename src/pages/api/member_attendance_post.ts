import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import {
  doc,
  Timestamp,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";

const getAirportAPI = async (_req: NextApiRequest, res: NextApiResponse) => {
    // console.log("aaa",new Date(_req.body.enterTime))
  await addDoc(collection(db, "users-attendance"), {
    id: _req.body.id,
    enterTime: Timestamp.fromDate(new Date(_req.body.enterTime)),
    exitTime: Timestamp.fromDate(new Date()),
  });
};

export default getAirportAPI;
