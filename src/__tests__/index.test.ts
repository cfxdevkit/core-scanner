import {
  ESpaceApi,
  ESpaceScanner,
  ESpaceScannerWrapper,
  NumberFormatter,
  DateFormatter,
  ResponseFormatter,
  AddressValidator,
} from "../index";

describe("Package exports", () => {
  it("should export core classes", () => {
    expect(ESpaceApi).toBeDefined();
    expect(ESpaceScanner).toBeDefined();
    expect(ESpaceScannerWrapper).toBeDefined();
  });

  it("should export formatter classes", () => {
    expect(NumberFormatter).toBeDefined();
    expect(DateFormatter).toBeDefined();
    expect(ResponseFormatter).toBeDefined();
  });

  it("should export utility classes", () => {
    expect(AddressValidator).toBeDefined();
  });

  it("should have correct class structures", () => {
    expect(new ESpaceScanner()).toBeInstanceOf(ESpaceApi);
    expect(new ESpaceScannerWrapper()).toBeDefined();
  });
});
