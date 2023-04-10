import { render, screen, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import MemberAttendance from "./member-attendance";
import { setupServer } from "msw/node";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event";

// jest.setTimeout(10000);
const server = setupServer(
  rest.post("/api/user_get", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ statue: true }]));
  })
);

beforeAll(() => server.listen());
//各テストが終了するごとにモックサーバの状態をリセット
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("member-attendance", () => {
  // //入場ボタン押下時：IDのinputが空の時「会員番号を入力してください」表示
  it("it render error msg if memberID don't input", async () => {
    render(<MemberAttendance />);
    await userEvent.click(screen.getAllByRole("button")[0]);
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "会員番号を入力してください"
    );
  });

  //入場ボタン押下時：IDが見つからない時「会員番号が間違っています」エラー表示
  it("render error msg if memberID can't find", async () => {
    render(<MemberAttendance />);
    server.use(
      rest.post("/api/user_get", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    const inputValue = screen.getByPlaceholderText("memberid");
    await userEvent.type(inputValue, "1234");
    await userEvent.click(screen.getAllByRole("button")[0]);
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "会員番号が間違っています"
    );
  });

  //入場ボタン押下時：すでに入場している時のエラー分表示
  it("render error msg if already enterd", async () => {
    render(<MemberAttendance />);
    const inputValue = screen.getByPlaceholderText("memberid");
    await userEvent.type(inputValue, "1234");
    await userEvent.click(screen.getAllByRole("button")[0]);
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "エラー！！既に入場しています。"
    );
  });

  //入場ボタン押下時:正常に入場し、「名前」と「3秒後にリセットされます」が表示
  it("render notice and time after entered collectly", async () => {
    // await new Promise((r) => setTimeout(r, 6000));
    server.use(
      rest.post("/api/user_get", (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([{ statue: false, name: "太郎" }])
        );
      })
    );
    render(<MemberAttendance />);
    const inputValue = screen.getByPlaceholderText("memberid");
    await userEvent.type(inputValue, "1234");
    await userEvent.click(screen.getAllByRole("button")[0]);
    await waitFor(() => screen.getByTestId("notice"));
    expect(screen.getByTestId("notice")).toHaveTextContent(
      `太郎さんが入場しました。`
    );
    expect(screen.getByTestId("timenotice")).toHaveTextContent(
      `3秒後にリセットされます`
    );
  });
});
