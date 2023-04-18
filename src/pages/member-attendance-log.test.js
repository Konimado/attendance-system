/**
 * @jest-environment jsdom
 */

import { initTestHelpers } from "next-page-tester";

import { render, screen } from "@testing-library/react";

import MemberAttendanceLog, {
  getServerSideProps,
} from "./member-attendance-log";

initTestHelpers();
const res = [
  {
    exitTime: "2023-04-06T04:32:24.136Z",
    enterTime: "2023-04-06T04:31:25.267Z",
    id: "3547",
  },
  {
    exitTime: "2023-04-17T10:05:39.396Z",
    id: "3547",
    enterTime: "2023-04-17T10:05:37.621Z",
  },
];
jest.mock("./api/eachMember-attendance_get", () => {
  const originalModule = jest.requireActual("./api/eachMember-attendance_get");

  //Mock the default export and named export 'foo'
  return {
    __esModule: false,
    ...originalModule,
    getData: jest.fn(() => res),
  };
});

it("getserversideprops ", async () => {
  const { props } = await getServerSideProps({ query: { id: "3547" } });

  expect(props.data).toEqual(JSON.stringify(res));
}, 20000);

it("render time", () => {
  render(<MemberAttendanceLog data={JSON.stringify(res)} />);
  // screen.debug();
  expect(screen.getByText("13:31")).toBeInTheDocument();
});
