/**
 * @jest-environment jsdom
 */

import { initTestHelpers } from "next-page-tester";
import { render, screen } from "@testing-library/react";
import MemberList, { getStaticProps } from "../src/pages/member-list";

jest.unmock("../src/__mocks__/react-firebase-hooks/auth");

initTestHelpers();

const res = [
  {
    address: "神奈川県横須賀市西浦賀",
    birth: "2002/02/05",
    enterTime: { seconds: 1681725899, nanoseconds: 495000000 },
    exitTime: { seconds: 1681725901, nanoseconds: 399000000 },
    gender: "male",
    id: "2349",
    mailAddress: "matsu@gmail.com",
    name: "松川 一静",
    phoneNumber: "070-2222-2222",
    plan: "daily",
    postalCode: "239-0824",
    startDate: "2012/02/02",
    statue: false,
  },
  {
    address: "宮城県石巻市鮎川浜",
    birth: "1996/06/21",
    enterTime: { seconds: 1681725909, nanoseconds: 814000000 },
    exitTime: { seconds: 1681725911, nanoseconds: 259000000 },
    gender: "男性",
    id: 2909,
    mailAddress: "hinata@yahoo.co.jp",
    name: "日向 翔陽",
    phoneNumber: "090-3333-2222",
    plan: "all",
    postalCode: "986-2523",
    startDate: "2002/03/02",
    statue: false,
  },
];

jest.mock("../src/pages/api/member_list_get", () => {
  const originalModule = jest.requireActual("../src/pages/api/member_list_get");
  return {
    __esModule: false,
    ...originalModule,
    getMemberList: jest.fn(() => res),
  };
});

it("getserversideprops ", async () => {
  const { props } = await getStaticProps();
  expect(props.users).toEqual(JSON.stringify(res));
}, 20000);

it("render time", () => {
  render(<MemberList users={JSON.stringify(res)} />);
  expect(screen.getByText("松川 一静")).toBeInTheDocument();
});
