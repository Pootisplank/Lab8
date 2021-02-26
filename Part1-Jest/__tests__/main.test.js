const formatVolumeIconPath = require("../assets/scripts/main");

describe("volume icon path", () => {
  test("level 3 icon", () => {
    expect(formatVolumeIconPath(67)).toContain("3");
  });
  test("level 2 icon", () => {
    expect(formatVolumeIconPath(34)).toContain("2");
  });
  test("level 1 icon", () => {
    expect(formatVolumeIconPath(1)).toContain("1");
  });
  test("level 0 icon", () => {
    expect(formatVolumeIconPath(0)).toContain("0");
  });
});
