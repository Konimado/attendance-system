import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import {

  doc,
  Timestamp,
  updateDoc,

} from "firebase/firestore";

const getAirportAPI = async (_req: NextApiRequest, res: NextApiResponse) => {

    //statue:trueの場合は入場する
  if (_req.body.statue) {
    const users_status = doc(db, "users", _req.body.id);
    await updateDoc(users_status, {
      statue: true,
      enterTime: Timestamp.fromDate(new Date()),
    });
  }
    //statue:trueの場合は退場する
  else{
    const users_status = doc(db, "users", _req.body.id);
    await updateDoc(users_status, {
      statue: false,
      exitTime: Timestamp.fromDate(new Date()),
    });
  }
};

export default getAirportAPI;
