import { setupServer } from "msw/node";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import GraphPlan from "../src/pages/graph-plan"

jest.unmock("../src/__mocks__/react-firebase-hooks/auth");

const server = setupServer(
  rest.get("/api/user_get", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ plan: "daily" }, { plan: "all" }]));
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
  // グラフ　プランページのデータ取得確認
  it("it render graph if deta exsit", async () => {
    render(<GraphPlan />);
    await waitFor(() => screen.getByTestId("plan"));
    expect(screen.getByTestId("plan")).toHaveTextContent("計測結果(プラン別)");
  });

  // グラフ　プランページのデータ取得できなかった時
  it("it render graph if no data", async () => {
    server.use(
      rest.get("/api/user_get", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    render(<GraphPlan />);
    await waitFor(() => screen.getByTestId("no"));
    expect(screen.getByTestId("no")).toHaveTextContent(
      "データを取得できません。"
    );
  });
});
