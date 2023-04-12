import React from "react";
import {
  render,
  screen,
  waitFor,
  cleanup,
  within,
} from "@testing-library/react";
import Index from "./index";
import { rest } from "msw";
import { setupServer } from "msw/node";

// jest.mock("axios");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const server = setupServer(
  rest.post("/api/user_get", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: "太郎",
          enterTime: "2023-04-12T01:55:50.528Z",
          exitTime: "2023-04-12T01:58:50.528Z",
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("Rendering", () => {
  function renderOfficeCharacters() {
    render(<Index />);
    return {
      getCharacters() {
        return screen.getAllByTestId("character").map((item) => ({
          name: within(item).getByTestId("name").textContent,
        }));
      },
    };
  }
  it("[Fetch success]Should display fetched data carrectly and button disable", async () => {
    const { newCharacter, addButton, getCharacters } = renderOfficeCharacters();

    const pam = "太郎";
    await waitFor(() => screen.getByTestId("character"));
    expect(
      getCharacters().find((character) => character.name === pam)
    ).toBeTruthy();
  });
});
