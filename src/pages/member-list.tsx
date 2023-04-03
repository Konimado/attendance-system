import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import memberList from "../style/member-list.module.scss";
import Layout from "../components/Layout";
import Link from "next/link";
import { use, useState } from "react";

export default function MemberList({ users }: { users: any }) {
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState([]);
  const [flag, setflag] = useState(true);
  const [showFlag, setShowFlag] = useState(false);
  const [genderValue, setGenderValue] = useState("");
  const [searchGenderItem, setSearchGenderItem] = useState([]);
  const usersItem = JSON.parse(users);
  console.log(usersItem);
  const today = new Date();

  //userデータを取得
  usersItem.map((item: any) => {
    //ageオブジェクトを作成
    const birthday = {
      year: new Date(item.birth).getFullYear(),
      month: new Date(item.birth).getMonth() + 1,
      date: new Date(item.birth).getDate(),
    };
    //今年の誕生日
    const thisYearsBirthday = new Date(
      today.getFullYear(),
      birthday.month - 1,
      birthday.date
    );
    //年齢
    let age: number = today.getFullYear() - birthday.year;
    if (today < thisYearsBirthday) {
      //今年まだ誕生日が来ていない
      age--;
    }
    item.age = age;

    //プラン"all:24時間","weekday:平日","weekend:土日","dayily:9:00 ~ 18:00"
    if (item.plan === "all") {
      item.plan = "24時間";
    } else if (item.plan === "dayily") {
      item.plan = "日中";
    } else if (item.plan === "weekday") {
      item.plan = "平日";
    } else if (item.plan === "weekend") {
      item.plan = "土日";
    }
  });

  //検索機能
  const getSearchItem = () => {
    let serchItems: any = [];
    setSearchItem([]);
    setShowFlag(false);
    usersItem.forEach((userSearch: any) => {
      let findName = userSearch.name;
      if (0 <= findName.search(search)) {
        // setSearchItem([userSearch]);
        serchItems.push(userSearch);
        setflag(false);
      } else {
        setflag(false);
      }
    });
    if (serchItems.length !== 0) {
      setShowFlag(false);
    } else {
      setShowFlag(true);
    }
    setSearchItem(serchItems);
  };

  //性別ソート
  const genderChange = (e: any) => {
    let serchGenderItems: any = [];
    setSearchGenderItem([]);
    usersItem.forEach((userSearch: any) => {
      console.log("userSearch", userSearch);
      let findGender = userSearch.gender;
      if (0 <= findGender.search(e.target.value)) {
        serchGenderItems.push(userSearch);
        setflag(false);
      } else {
        setflag(false);
      }
    });
    console.log("serchGenderItems", serchGenderItems);
    setSearchItem(serchGenderItems);
  };

  //年齢ソート
  const ageChange = (e: any) => {
    let serchGenderItems: any = [];
    setSearchGenderItem([]);
    usersItem.forEach((userSearch: any) => {
      console.log("userSearch", userSearch);
      let findGender = userSearch.age;
      if (0 <= findGender.search(e.target.value)) {
        serchGenderItems.push(userSearch);
        setflag(false);
      } else {
        setflag(false);
      }
    });
    console.log("serchGenderItems", serchGenderItems);
    setSearchItem(serchGenderItems);
  };

  return (
    <Layout>
      <div className={memberList.searchGrupe}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={memberList.input}
        />
        <button onClick={getSearchItem}>検索</button>
      </div>
      <h2 className={memberList.h2}>会員一覧</h2>
      {flag ? (
        <div className={memberList.grupe}>
          <table className={memberList.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>名前</th>
                <th>
                  性別
                  <select
                    name="gender"
                    id="select-gender"
                    onChange={(e) => genderChange(e)}
                  >
                    <option value="">▼</option>
                    <option value="1">男性</option>
                    <option value="2">女性</option>
                  </select>
                </th>
                <th>
                  年齢
                  <select
                    name="age"
                    id="select-age"
                    onChange={(e) => ageChange(e)}
                  >
                    <option value="">▼</option>
                    {usersItem.map((item: any) => {
                      // <option value={item.age} key={item.id}>
                      //   {item.age}歳
                      // </option>;
                      return <option key={item.id}>{item.age}</option>;
                    })}
                  </select>
                </th>
                <th>プラン名</th>
                <th>会員登録日</th>
              </tr>
            </thead>
            <tbody>
              {usersItem.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <Link href={`/member-attendance-log/?id=${item.id}`}>
                      {item.name}
                    </Link>
                  </td>
                  {item.gender === "1" ? <td>男性</td> : <td>女性</td>}
                  <td>{`${item.age}歳`}</td>
                  <td>{item.plan}</td>
                  <td>{item.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={memberList.grupe}>
          <table className={memberList.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>名前</th>
                <th>
                  性別
                  <select
                    name="pref_cd"
                    id="select-pref"
                    onChange={(e) => genderChange(e)}
                  >
                    <option value="">▼</option>
                    <option value="1">男性</option>
                    <option value="2">女性</option>
                  </select>
                </th>
                <th>年齢</th>
                <th>プラン名</th>
                <th>会員登録日</th>
              </tr>
            </thead>
            <tbody>
              {searchItem.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <Link href={`/member-attendance-log/?id=${item.id}`}>
                      {item.name}
                    </Link>
                  </td>
                  {item.gender === "1" ? <td>男性</td> : <td>女性</td>}
                  <td>{`${item.age}歳`}</td>
                  <td>{item.plan}</td>
                  <td>{item.startDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showFlag ? <p>該当する名前はありません</p> : <p></p>}
    </Layout>
  );
}

export async function getStaticProps() {
  let users: any = [];
  const usersItem = await getDocs(collection(db, "users"));
  usersItem.forEach((doc) => {
    const userdata = doc.data();
    users.push(userdata);
  });
  return {
    props: { users: JSON.stringify(users) },
  };
}