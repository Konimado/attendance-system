import React, { useEffect, useState } from "react";
import {db} from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //データベースからデータを取得する
    const postData = collection(db, "users");
    console.log(postData);
    getDocs(postData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data })));
      console.log(snapShot.docs.map((doc) => doc.data()));
      // setPosts(snapShot.docs.map((doc) => ({ ...doc.data })));
      setPosts(snapShot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <div>index</div>
      <div>
        {posts.map((post) => (
          <div key={post.gender}>
            <h1>{post.gender}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default index;
