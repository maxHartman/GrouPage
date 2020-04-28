// Mock logger so that no logs are printed
jest.mock("../src/logger");

describe("block name", () => {
  test("test name", async () => {
    expect(1).toBe(1);
  });
});
