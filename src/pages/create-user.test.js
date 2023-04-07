import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateUser from "./create-user";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("create-user", () => {
  it("render heading", async () => {
    render(<CreateUser />);
    await waitFor(() => {
      expect(screen.getByRole("heading")).toBeTruthy();
    });
  });
});
