/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";
import { rest } from "msw";
import { SetupServer, setupServer } from "msw/lib/node";
import MemberList from "../pages/member-list";

initTestHelpers();

const headlers = [
  res.get("/api/user_get", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          address: "aaa",
          birth: "",
          enterTime: "1",
          exitTime: "1",
          gender: "",
          id: "",
          mailAddress: "",
          name: "",
          phoneNumber: "",
          plan: "",
          postalCode: "",
          startDate: "",
          statue: "1",
        },
      ])
    );
  }),
];
const server = setupServer(...headlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.restoreHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe("member-list page", () => {
  it("Should render the list of member-list by getStaticprops", async () => {
    const { page } = await getPage({
      route: "/member-list",
    });
    render(page)
    expect(await screen.findAllByText('')).toBeInTheDocument()
    expect(screen.getByText('')).toBeInTheDocument()
    expect(screen.getByText('')).toBeInTheDocument()
    screen.debug();
  });
});
