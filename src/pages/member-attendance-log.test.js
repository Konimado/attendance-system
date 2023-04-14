// import { getDocs } from "firebase/firestore";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";
import * as api from "./api/eachMember-attendance_get";
import MemberAttendanceLog from "./member-attendance-log";
import { render } from "@testing-library/react";

initTestHelpers();
jest.unmock("../__mocks__/react-firebase-hooks/auth");

jest.mock("./api/eachMember-attendance_get", (id) => {
  jest.fn().mockReturnValue([
    {
      enterTime: "2023-04-10T04:47:44.858Z",
      exitTime: "2023-04-10T04:47:46.118Z",
      id: "2349",
    },
  ]);
});

describe("render", () => {
  it("get id", async () => {
    const { page } = await getPage({
      route: "/member-attendance-log?id=3547",
    });
    render(page);
    expect(await screen.findByText("表示")).toBeInTheDocument();
  });
});
