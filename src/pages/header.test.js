import Header from "../components/header";
import { render } from "@testing-library/react";
import { auth } from "../firebase";
import { useAuthState } from "../__mocks__/react-firebase-hooks/auth";

it("should be ", () => {
  useAuthState.mockReturnValue([true]);
  const { getByText } = render(<Header />);
  expect(useAuthState).toBeCalledWith(auth);
  expect(getByText("会員登録")).toBeTruthy();
  expect(getByText("会員打刻")).toBeTruthy();
  expect(getByText("会員一覧")).toBeTruthy();
  expect(getByText("グラフ管理")).toBeTruthy();
});

it("should be mocked", () => {
  useAuthState.mockReturnValue([false]);
  const { getByText } = render(<Header />);
  expect(useAuthState).toBeCalledWith(auth);
  expect(getByText("ログイン")).toBeTruthy();
});
