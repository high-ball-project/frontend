import { describe, expect, it } from "vitest";

// The two tests marked with concurrent will be run in parallel
describe("App", () => {
  it("앱 작동 확인", async () => {
    expect(1 + 1).toEqual(2);
  });
});
