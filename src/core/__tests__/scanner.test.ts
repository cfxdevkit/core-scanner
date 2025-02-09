import { CoreScanner } from "../scanner";
import { mockContractABI } from "../../__tests__/__mocks__/api";

describe("CoreScanner", () => {
  let scanner: CoreScanner;

  beforeEach(() => {
    scanner = new CoreScanner({ target: "mainnet" });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockContractABI),
      })
    ) as jest.Mock;
  });

  test("should get contract ABI", async () => {
    const address = "cfx:acg158kvr8zanb1bs048ryb6rtrhr283ma70vz70tx";
    const result = await scanner.getContractABI(address);
    expect(result).toBeDefined();
  });
});
