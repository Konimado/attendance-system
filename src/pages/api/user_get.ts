import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

// type EntryUsers = {
//   address?: string;
//   birth?: string;
//   enterTime?: string;
//   exitTime?: string;
//   gender?: string;
//   mailAddress?: string;
//   name?: string;
//   phoneNumber?: string;
//   plan?: string;
//   postalCode?: string;
//   startDate?: string;
//   statue?: boolean;
// };

const getAirportAPI = async (_req: NextApiRequest, res: NextApiResponse) => {
  //idがある場合は指定idのuser情報を取得
  // let users: EntryUsers[] = [];
  let users: any = [];
  if (_req.body.id) {
    const attendanceRef = doc(db, "users", _req.body.id);
    const docSnap = await getDoc(attendanceRef);
    users.push(docSnap.data());
  }
  //idがない場合は全user情報を取得
  else {
    if (_req.body.order) {
      //users情報取得
      const getUsers = collection(db, "users");
      const querySnapshot = query(getUsers, orderBy("enterTime", "desc"));
      await getDocs(querySnapshot).then((snapShot) => {
        const userdata = snapShot.docs.map((doc) => doc.data());
        users = users.concat(userdata);
        users.map((user: any) => {
          if (user.enterTime && user.exitTime) {
            user.enterTime = user.enterTime.toDate();
            user.exitTime = user.exitTime.toDate();
          }
        });
      });
    } else {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const userdata = doc.data();
        users.push(userdata);
      });
    }
  }
  return res.status(200).json(users);
};

export default getAirportAPI;
