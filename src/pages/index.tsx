import React, { useEffect, useState } from "react";

import { db } from "../firebase";


import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Layout from "../components/layout";

const Index = () => {
  const [posts, setPosts] = useState([]);

  //ログイン確認
  // const dispatch = useDispatch();
  // const [user] = useAuthState(auth);
  // if (user) {
  //   dispatch(login());
  // }

  useEffect(() => {
    //データベースからデータを取得する
    const postData = collection(db, "users");
    // console.log(postData);
    getDocs(postData).then((snapShot) => {
      // console.log(snapShot.docs.map((doc) => ({ ...doc.data })));
      // console.log(snapShot.docs.map((doc) => doc.data()));
      // setPosts(snapShot.docs.map((doc) => ({ ...doc.data })));
      setPosts(snapShot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <Layout>
      <div>index</div>
      <div>
        {/* {posts.map((post) => (
          <div key={post.gender}>
            <h1>{post.gender}</h1>
          </div>
        ))} */}
      </div>
    </Layout>
  );
};

export default Index;
