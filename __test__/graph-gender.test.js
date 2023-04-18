import { setupServer } from "msw/node";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import GraphGender from "../src/pages/graph-gender";

jest.unmock("../src/__mocks__/react-firebase-hooks/auth");

const server = setupServer(
  rest.get("/api/user_get", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{ gender: "male" }, { gender: "female" }])
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
  // グラフ　男女比ページのデータ取得確認
  it("it render graph if deta exsit", async () => {
    render(<GraphGender />);
    await waitFor(() => screen.getByTestId("gender"));
    expect(screen.getByTestId("gender")).toHaveTextContent("計測結果(男女別)");
  });

  // グラフ　男女比ページのデータ取得できなかった時
  it("it render graph if no data", async () => {
    server.use(
      rest.get("/api/user_get", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    render(<GraphGender />);
    await waitFor(() => screen.getByTestId("no"));
    expect(screen.getByTestId("no")).toHaveTextContent(
      "データを取得できません。"
    );
  });
});
