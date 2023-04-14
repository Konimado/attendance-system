// import { getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getData } from "./api/eachMember-attendance_get";
import { setupServer } from "msw/node";
import * as api from "./api/eachMember-attendance_get";

// jest.mock("getData"); // getDocs を mock する
// const mockGetDocs = getData();

// const handlers=[
//     rest.get
// ]

describe("render", () => {
  beforeEach(() => {
    api.getUser = jest.fn((async) => {
      return {
        enterTime: "2023-04-10T04:47:44.858Z",
        exitTime: "2023-04-10T04:47:46.118Z",
        id: "2349",
      };
    });
  }, 5000);
  it("get id", async () => {
    const req = "hoge";
    const expected = { userId: "hoge", name: "name-hoge" };
    // const actual = await getUserAsync(req);
    // expect(expected).toEqual(actual);
    // mock functionの機能を検証
    // const mockFn = api.getUser;
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
