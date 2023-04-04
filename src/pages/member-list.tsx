import { getDocs, collection, DocumentData } from "firebase/firestore";
import { db } from "../firebase";
import memberList from "../style/member-list.module.scss";
import Layout from "../components/Layout";
import Link from "next/link";
import { useState } from "react";
import { fetchUsers } from "../types/fetchUsers";

type UsersItem = {
  address: string;
  birth: string;
  enterTime: string;
  exitTime: string;
  gender: string;
  id: string;
  mailAddress: string;
  name: string;
  phoneNumber: string;
  plan: string;
  postalCode: string;
  startDate: string;
  statue: boolean;
  age: number;
};

export default function MemberList({ users }: { users: string }) {
  //会員データ取得
  const usersItem = JSON.parse(users);
  //現在時刻取得
  const today = new Date();
  //検索内容
  const [search, setSearch] = useState("");
  //検索結果
  const [searchItem, setSearchItem] = useState(usersItem);
  const [flag, setflag] = useState(true);
  const [showFlag, setShowFlag] = useState(false);
  //会員データに年齢追加/プラン名変更
  usersItem.map((item: UsersItem) => {
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
    } else if (item.plan === "daily") {
      item.plan = "日中";
    } else if (item.plan === "weekday") {
      item.plan = "平日";
    } else if (item.plan === "weekend") {
      item.plan = "土日";
    }
  });

  //年齢select
  let sortAgeItem: number[] = [];
  let setSortAgeItem: object = [];
  searchItem.map((item: UsersItem) => {
    sortAgeItem.push(item.age);
  });
  let newArrItem: number[] = [];
  sortAgeItem.map((item: number) => {
    let itemAge = Math.floor(item / 10);
    if (itemAge < 1) {
      newArrItem.push(0);
    } else {
      newArrItem.push(itemAge * 10);
    }
    return Math.floor(item / 10);
  });
  //重複削除
  setSortAgeItem = new Set(newArrItem);
  const newArr = [...sortAgeItem];
  // 年齢低い順
  newArr.sort(function (first: number, second: number) {
    return first - second;
  });

  //検索機能
  const getSearchItem = () => {
    let serchItems: UsersItem[] = [];
    setSearchItem([]);
    setShowFlag(false);
    usersItem.forEach((userSearch: UsersItem) => {
      let findName = userSearch.name;
      if (0 <= findName.search(search)) {
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
  const genderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "0") {
      setSearchItem(usersItem);
    } else {
      let serchGenderItems: UsersItem[] = [];
      searchItem.forEach((userSearch: UsersItem) => {
        let findGender = userSearch.gender;
        if (0 <= findGender.search(e.target.value)) {
          serchGenderItems.push(userSearch);
          setflag(false);
        } else {
          setflag(false);
        }
      });
      setSearchItem(serchGenderItems);
    }
  };

  //年齢ソート
  const ageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "0") {
      setSearchItem(usersItem);
    } else {
      let serchAgeItems: UsersItem[] = [];
      searchItem.forEach((userSearch: UsersItem) => {
        let userSearchAge = `${Math.floor(userSearch.age / 10)}`;
        if (userSearchAge < "1") {
          userSearchAge = "0";
        } else {
          userSearchAge = `${Math.floor(userSearch.age / 10)}`;
        }
        let findAge = userSearchAge;
        if (0 <= findAge.search(`${e.target.value}`)) {
          serchAgeItems.push(userSearch);
          setflag(false);
        } else {
          setflag(false);
        }
      });
      setSearchItem(serchAgeItems);
    }
  };

  //プランソート
  const planChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "0") {
      setSearchItem(usersItem);
    } else {
      let serchPlanItems: UsersItem[] = [];
      searchItem.forEach((userSearch: UsersItem) => {
        let findPlan = userSearch.plan;
        if (0 <= findPlan.search(e.target.value)) {
          serchPlanItems.push(userSearch);
          setflag(false);
        } else {
          setflag(false);
        }
      });
      setSearchItem(serchPlanItems);
    }
  };

  //登録日ソート
  let sortStartDateItem: number[] = [];
  let steSortStartDateItem: object = [];
  searchItem.map((item: UsersItem) => {
    sortStartDateItem.push(new Date(item.startDate).getFullYear());
  });
  sortStartDateItem.sort(function (first: number, second: number) {
    return first - second;
  });
  steSortStartDateItem = new Set(sortStartDateItem);
  const newStartDateItem = [...sortStartDateItem];
  const startDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "0") {
      setSearchItem(usersItem);
    } else {
      let serchDtartDateItems: UsersItem[] = [];
      searchItem.forEach((userSearch: UsersItem) => {
        let findAge = `${userSearch.startDate}`;
        if (0 <= findAge.search(`${e.target.value}`)) {
          serchDtartDateItems.push(userSearch);
          setflag(false);
        } else {
          setflag(false);
        }
      });
      setSearchItem(serchDtartDateItems);
    }
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
                    <option value="0">▼</option>
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                  </select>
                </th>
                <th>
                  年齢
                  <select
                    name="age"
                    id="select-age"
                    onChange={(e) => ageChange(e)}
                  >
                    <option value="0">▼</option>
                    {newArr.map((item) => {
                      return (
                        <option value={item / 10} key={item}>
                          {item}代
                        </option>
                      );
                    })}
                  </select>
                </th>
                <th>
                  プラン名
                  <select
                    name="gender"
                    id="select-gender"
                    onChange={(e) => planChange(e)}
                  >
                    <option value="0">▼</option>
                    <option value="24時間">24時間</option>
                    <option value="日中">日中</option>
                    <option value="平日">平日</option>
                    <option value="土日">土日</option>
                  </select>
                </th>
                <th>
                  会員登録日
                  <select
                    name="age"
                    id="select-age"
                    onChange={(e) => startDateChange(e)}
                  >
                    <option value="0">▼</option>
                    {newStartDateItem.map((item) => {
                      return (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {usersItem.map((item: UsersItem) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <Link href={`/member-attendance-log/?id=${item.id}`}>
                      {item.name}
                    </Link>
                  </td>
                  {item.gender === "男性" ? <td>男性</td> : <td>女性</td>}
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
                    <option value="0">▼</option>
                    <option value="男性">男性</option>
                    <option value="女性">女性</option>
                  </select>
                </th>
                <th>
                  年齢
                  <select
                    name="age"
                    id="select-age"
                    onChange={(e) => ageChange(e)}
                  >
                    <option value="0">▼</option>
                    {newArr.map((item) => {
                      return (
                        <option value={item / 10} key={item}>
                          {item}代
                        </option>
                      );
                    })}
                  </select>
                </th>
                <th>
                  プラン名
                  <select
                    name="gender"
                    id="select-gender"
                    onChange={(e) => planChange(e)}
                  >
                    <option value="0">▼</option>
                    <option value="24時間">24時間</option>
                    <option value="日中">日中</option>
                    <option value="平日">平日</option>
                    <option value="土日">土日</option>
                  </select>
                </th>
                <th>
                  会員登録日
                  <select
                    name="age"
                    id="select-age"
                    onChange={(e) => startDateChange(e)}
                  >
                    <option value="0">▼</option>
                    {newStartDateItem.map((item) => {
                      return (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {searchItem.map((item: UsersItem) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <Link href={`/member-attendance-log/?id=${item.id}`}>
                      {item.name}
                    </Link>
                  </td>
                  {item.gender === "男性" ? <td>男性</td> : <td>女性</td>}
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
  let users: fetchUsers[] = [];
  const usersItem = await getDocs(collection(db, "users"));
  usersItem.forEach((doc) => {
    const userdata = doc.data();
    users.push(userdata);
  });
  return {
    props: { users: JSON.stringify(users) },
  };
}
