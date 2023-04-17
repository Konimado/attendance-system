/**
 * @jest-environment jsdom
 */

import { rest } from "msw";
import { setupServer } from "msw/node";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";
import MemberAttendanceLog, {
  getServerSideProps,
} from "./member-attendance-log";
import { render, screen, waitFor } from "@testing-library/react";
// import { getData } from "../__mocks__/member-attendance-get/getData";
import { getData } from "./api/eachMember-attendance_get";

initTestHelpers();

jest.unmock("../__mocks__/react-firebase-hooks/auth");

// it("should be ", async () => {
// expect(getData(1)).toBe(2[]);
// const { render } = await getPage({
//   route: "/member-attendance-log?id=3547",
// });
// render;
// getData.mockReturnValue([
//   {
//     enterTime: "2023-04-10T04:47:44.858Z",
//     exitTime: "2023-04-10T04:47:46.118Z",
//     id: "2349",
//   },
// ]);
// expect(screen.findByText("時間")).toBeInTheDocument()
// expect(await screen.findByTestId("error")).toHaveTextContent("滞在時間");
// });
