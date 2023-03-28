import Layout from "@/components/Layout";
import useSWR from "swr";

export default function MemberAttendanceLog() {


  const fetcher1 = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());
  const { data } = useSWR( "/api/user-get", fetcher1);
  console.log("datam",data)

  
  return (
    <>
      <Layout>
        <p>月次入退場データ</p>

        <form action="">
          <select name="" id="">
            <option value=""></option>
          </select>
          年
          <select name="" id="">
            <option value=""></option>
          </select>
          月
        </form>
        <div></div>
      </Layout>
    </>
  );
}
