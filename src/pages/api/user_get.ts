import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { doc, getDoc,getDocs,collection } from "firebase/firestore";

const getAirportAPI = async (_req: NextApiRequest, res: NextApiResponse) => {
  // console.log("req", _req.body.id);
//idがある場合は指定idのuser情報を取得
  const user = [];
  if (_req.body.id) {
    const attendanceRef = doc(db, "users", _req.body.id);
    const docSnap = await getDoc(attendanceRef);
    // console.log("doc", docSnap.data());
    user.push(docSnap.data());
    user.map((u)=>u.enterTime=u.enterTime.toDate())
  }
  //idがない場合は全user情報を取得
  else{
const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const userdata = doc.data();
    user.push(userdata);
  });
  }
  

  return res.status(200).json(user);
};

export default getAirportAPI;
