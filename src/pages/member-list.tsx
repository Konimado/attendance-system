import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import memberList from "../style/member-list.module.scss";
import Layout from "../components/Layout";
import Link from "next/link";

export default function MemberList({ users }: { users: any }) {
  const usersItem = JSON.parse(users);
  const today = new Date();
  usersItem.map((item: any) => {
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

    //プラン"all","weekday平日","weekend土日","dayily 9:00 ~ 18:00"
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

  return (
    <Layout>
      <h2 className={memberList.h2}>会員一覧</h2>
      <div className={memberList.grupe}>
        <table className={memberList.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>性別</th>
              <th>年齢</th>
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
                {item.gender === "male" ? <td>男性</td> : <td>女性</td>}
                <td>{`${item.age}歳`}</td>
                <td>{item.plan}</td>
                <td>{item.startDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
