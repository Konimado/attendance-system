import Header from "../components/header";
import { render } from "@testing-library/react";
import { auth } from "../firebase";
import { useAuthState } from "../__mocks__/react-firebase-hooks/auth";

it("should be mocked", () => {
  // Change the implementation of the mock
  useAuthState.mockReturnValue([false]);
  const { getByText } = render(<Header />);
  // Expect that the app file got the mocked value
  expect(useAuthState).toBeCalledWith(auth);
  expect(getByText("ログイン")).toBeTruthy();
});
