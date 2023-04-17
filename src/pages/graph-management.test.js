import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event"; // ユーザーにクリックさせるため必要
// next-page-testerからgetPageとinitTestHelpersをインポート
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester"; // 初期設定を行うもの
/**
 * @jest-environment jsdom
 */

jest.unmock("../__mocks__/react-firebase-hooks/auth");

initTestHelpers();

describe("Navigation by Link", () => {
  it("Should route to selected page in graph-age-nav", async () => {
    const { page } = await getPage({
      route: "/graph-management",
    });
    render(page);

    await userEvent.click(screen.getByTestId("graph-age-nav"));
    expect(await screen.findByText("graph-age")).toBeInTheDocument();
    // await userEvent.click(screen.getByTestId("graph-time-nav"));
    // expect(await screen.findByText("graph-time")).toBeInTheDocument();
    // await userEvent.click(screen.getByTestId("graph-day-of-week-nav"));
    // expect(await screen.findByText("graph-day-of-week")).toBeInTheDocument();
    // await userEvent.click(screen.getByTestId("graph-gender-nav"));
    // expect(await screen.findByText("graph-gender")).toBeInTheDocument();
    // await userEvent.click(screen.getByTestId("graph-plan-nav"));
    // expect(await screen.findByText("graph-plan")).toBeInTheDocument();
    screen.debug();
  });
});
