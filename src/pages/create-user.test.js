import "@testing-library/jest-dom";
import CreateUser from "./create-user";

import { render, screen, waitFor, cleanup } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// describe("create-user", () => {
//   it("render", () => {
//     render(<NextLink href="/">home1</NextLink>, {
//       wrapper: MemoryRouterProvider,
//     });
//     fireEvent.click(screen.getByText("home1"));
//     expect(mockRouter.asPath).toEqual("/");
//   });
// });

describe("submit", () => {
  //未入力時と形式のエラー
  it("render error msg if already enterd", async () => {
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
});
