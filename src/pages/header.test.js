/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";
// import "setimmediate";

initTestHelpers();

describe("Navigation by Link", () => {
  it("Should route to selected page in navbar", async () => {
    const { page } = await getPage({
      route: "/",
    });
    render(page);

    userEvent.click(screen.getByTestId("create-user-nav"));
    expect(await screen.findByText("会員登録")).toBeInTheDocument();
  });
});
