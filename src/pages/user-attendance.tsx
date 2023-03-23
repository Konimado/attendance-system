import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import db from "../firebase";
import { useState } from "react";

export default function UserAttendance() {

    const [id,setId]=useState("");
    const [time,setTime]=useState("")
    const [realTime,setRealTime]=useState("")

const Enter=async()=>{
    const time=new Date()
    console.log("new Date",time)
    console.log("timestamp",time.getTime())

    await addDoc(collection(db,"users-attendance"),{id:id,enterTime:time.getTime(),exitTime:""})
}

const Exit=async()=>{
    const time=new Date()
    console.log("new Date",time)
    console.log("timestamp",time.getTime())

    await addDoc(collection(db,"users-attendance"),{id:id,exitTime:time.getTime(),enterTime:""})

}


  setInterval( () => {
    setRealTime(
      new Date().toLocaleString(),
    )
  },1000)


  return (
    <>
      <div>
        <label htmlFor="">
          会員番号
          <div>
            <input type="text" value={id} onChange={(e)=>setId(e.target.value)} />
          </div>
        </label>
      </div>
      
      <button onClick={Enter}>入場</button>
      <button onClick={Exit}>退場</button>

      <div>
          <div>現在時刻</div>
          <span>{realTime}</span>
      </div>


      <div>Koniさんは入場しました。</div>
      <span></span>

    </>
  );
}
