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
import { fetchUsers } from "@/types/fetchUsers";

type toFetchUsers = {
  address?: string;
  birth?: string;
  enterTime?: any;
  exitTime?: any;
  gender?: string;
  id?: string;
  mailAddress?: string;
  name?: string;
  phoneNumber?: string;
  plan?: string;
  postalCode?: string;
  startDate?: string;
  statue?: boolean;
};

const getAirportAPI = async (_req: NextApiRequest, res: NextApiResponse) => {
  //idがある場合は指定idのuser情報を取得
  let user: toFetchUsers[] = [];
  if (_req.body.id) {
    const attendanceRef = doc(db, "users", _req.body.id);
    const docSnap = await getDoc(attendanceRef);

    console.log("doc", docSnap.data());
    user.push(docSnap.data());
    //このif分がないと会員番号が存在しない場合はエラーになってしまう
    if(user[0]){
      user.map((u) => (u.enterTime = u.enterTime.toDate()));
    }

  }
  //idがない場合は全user情報を取得
  else {
    if (_req.body.order) {
      //users情報取得
      const getUsers = collection(db, "users");
      const querySnapshot = query(getUsers, orderBy("enterTime", "desc"));
      await getDocs(querySnapshot).then((snapShot) => {
        const userdata = snapShot.docs.map((doc) => doc.data());
        user = user.concat(userdata);
        user.map((user:fetchUsers) => {
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
        user.push(userdata);
      });
    }
  }
  return res.status(200).json(user);
};

export default getAirportAPI;
