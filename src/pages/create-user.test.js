import "@testing-library/jest-dom";
import CreateUser from "./create-user";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";
import {
  render,
  screen,
  waitFor,
  cleanup,
  getByTestId,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

initTestHelpers();
describe("submit", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  // 未入力時と形式のエラー;
  it("render error msg", async () => {
    render(<CreateUser />);
    //形式違いのメールアドレスを入力;
    const addressinputValue = screen.getByPlaceholderText("mailAddress");
    await userEvent.type(addressinputValue, "makaahoo.co.jp");
    // //形式違いの電話番号を入力;
    const phoneNumberinputValue = screen.getByPlaceholderText("phoneNumber");
    await userEvent.type(phoneNumberinputValue, "080-12222");
    // //形式違いの生年月日を入力;
    const birthinputValue = screen.getByPlaceholderText("birth");
    await userEvent.type(birthinputValue, "199/04/03");

    await userEvent.click(screen.getByTestId("submit"));
    expect(await screen.findByTestId("nameError")).toHaveTextContent(
      "名前を入力してください"
    );
    expect(await screen.findByTestId("genderError")).toHaveTextContent(
      "※性別を選択してください"
    );
    expect(await screen.findByTestId("addressError")).toHaveTextContent(
      "※住所を入力してください"
    );
    expect(await screen.findByTestId("planError")).toHaveTextContent(
      "プランを選択してください"
    );
    expect(await screen.findByTestId("startDateError")).toHaveTextContent(
      "※入会日を正しく入力してください"
    );
    expect(await screen.findByTestId("mailAddressError")).toHaveTextContent(
      "※メールアドレスを正しく入力してください"
    );
    expect(await screen.findByTestId("phoneNumberError")).toHaveTextContent(
      "※電話番号を正しく入力してください"
    );
    expect(await screen.findByTestId("birthError")).toHaveTextContent(
      "※生年月日を正しく入力してください"
    );
  });

  //正しく入力し、会員登録ボタン押下後、画面遷移するか
  it("navigate to home after submit", async () => {
    // const { page } = await getPage({
    //   route: "/create-user",
    // });
    // render(page);
    // userEvent.click(screen.getByTestId("submit"));
    // expect(await screen.findByText("入場時間")).toBeInTheDocument();

    render(<CreateUser />);

    const nameinputValue = screen.getByPlaceholderText("name");
    await userEvent.type(nameinputValue, "日向ヒナタ");
    const addressinputValue = screen.getByPlaceholderText("address");
    await userEvent.type(addressinputValue, "東京都墨田区両国");
    const mailaddressinputValue = screen.getByPlaceholderText("mailAddress");
    await userEvent.type(mailaddressinputValue, "makaa@hoo.co.jp");
    const phoneNumberinputValue = screen.getByPlaceholderText("phoneNumber");
    await userEvent.type(phoneNumberinputValue, "080-1222-2222");
    const birthinputValue = screen.getByPlaceholderText("birth");
    await userEvent.type(birthinputValue, "1999/04/03");
    await userEvent.click(screen.getByText("男"));
    await userEvent.click(screen.getByText("プラン"));

    await userEvent.click(screen.getByTestId("submit"));

    //エラーがないことを確認
    expect(await screen.findByTestId("birthError")).toHaveTextContent("");
  });
});
