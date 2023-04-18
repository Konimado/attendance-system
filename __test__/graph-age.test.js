import { setupServer } from "msw/node";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import GraphAge from "../src/pages/graph-age";

jest.unmock("../src/__mocks__/react-firebase-hooks/auth");

const server = setupServer(
  rest.get("/api/user_get", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ birth: "1994/01/06" }]));
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
  // グラフ　年齢比ページのデータ取得確認
  it("it render graph if deta exsit", async () => {
    render(<GraphAge />);
    await waitFor(() => screen.getByTestId("age"));
    expect(screen.getByTestId("age")).toHaveTextContent("計測結果(年齢別)");
  });

  // グラフ　年齢比ページのデータ取得できなかった時
  it("it render graph if no data", async () => {
    server.use(
      rest.get("/api/user_get", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    render(<GraphAge />);
    await waitFor(() => screen.getByTestId("no"));
    expect(screen.getByTestId("no")).toHaveTextContent(
      "データを取得できません。"
    );
  });
});
