/**
 * @jest-environment jsdom
 */

import { initTestHelpers } from "next-page-tester";

import { render, screen } from "@testing-library/react";

import MemberAttendanceLog, {
  getServerSideProps,
} from "../src/pages/member-attendance-log";
jest.unmock("../src/__mocks__/react-firebase-hooks/auth");
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
jest.mock("../src/pages/api/eachMember-attendance_get", () => {
  const originalModule = jest.requireActual("../src/pages/api/eachMember-attendance_get");

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
  expect(screen.getByText("13:31")).toBeInTheDocument();
});
