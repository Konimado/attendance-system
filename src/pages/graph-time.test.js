import { setupServer } from "msw/node";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import GraphTime from "./graph-time";
import axios from "axios";

const server = setupServer(
  rest.get("/api/member_attendance_get", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          enterTime: "2023-04-10T05:19:08.096Z",
          id: "3762",
          exitTime: "2023-04-10T05:21:47.639Z",
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
//各テストが終了するごとにモックサーバの状態をリセット
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("graph-plan-render", () => {
  // グラフ　時間別ページのデータ取得確認
  it("it render graph if deta exsit", async () => {
    render(<GraphTime />);
    await waitFor(() => screen.getByTestId("time"));
    expect(screen.getByTestId("time")).toHaveTextContent("計測結果(時間別)");
  });

  // グラフ　時間別ページのデータ取得できなかった時
  it("it render graph if no data", async () => {
    server.use(
      rest.get("/api/member_attendance_get", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    render(<GraphTime />);
    await waitFor(() => screen.getByTestId("no"));
    expect(screen.getByTestId("no")).toHaveTextContent(
      "データを取得できません。"
    );
  });
});
