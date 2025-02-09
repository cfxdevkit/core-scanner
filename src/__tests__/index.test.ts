import {
  CoreApi,
  CoreScanner,
  CoreScannerWrapper,
  NumberFormatter,
  DateFormatter,
  ResponseFormatter,
} from "../index";

describe("Index exports", () => {
  test("should export all required classes", () => {
    expect(CoreApi).toBeDefined();
    expect(CoreScanner).toBeDefined();
    expect(CoreScannerWrapper).toBeDefined();
    expect(NumberFormatter).toBeDefined();
    expect(DateFormatter).toBeDefined();
    expect(ResponseFormatter).toBeDefined();
  });
});
