import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";

export default function GraphList() {
  return (
    <Layout>
      <div style={{ marginBottom: "40px", marginTop: "10px" }}>グラフ一覧</div>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <Link href={"/graph-age"}>
              <div data-testid="graph-age-nav">年齢別会員数</div>
              <div>
                <Image
                  src={"/images/graph/age.png"}
                  alt="画像"
                  width={400}
                  height={200}
                />
              </div>
            </Link>
          </div>
          <div>
            <Link rel="stylesheet" href={"/graph-time"}>
              <div data-testid="graph-time-nav">時間別会員数</div>
              <div>
                <Image
                  src={"/images/graph/time.png"}
                  alt="画像"
                  width={400}
                  height={200}
                />
              </div>
            </Link>
          </div>
          <div>
            <Link href={"/graph-day-of-week"}>
              <div data-testid="graph-day-of-week-nav">曜日別会員数</div>
              <div>
                <Image
                  src={"/images/graph/day.png"}
                  alt="画像"
                  width={400}
                  height={200}
                />
              </div>
            </Link>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <div>
            <Link href={"/graph-gender"}>
              <div data-testid="graph-gender-nav">会員男女比</div>
              <div>
                <Image
                  src={"/images/graph/gender.png"}
                  alt="画像"
                  width={300}
                  height={300}
                />
              </div>
            </Link>
          </div>
          <div>
            <Link href={"/graph-plan"}>
              <div data-testid="graph-plan-nav">会員プラン比</div>
              <div>
                <Image
                  src={"/images/graph/plan.png"}
                  alt="画像"
                  width={300}
                  height={300}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
