import { isValidAddress, validateTimestampRange } from "../validation";

describe("validation utils", () => {
  describe("isValidAddress", () => {
    it("should validate correct Conflux addresses", () => {
      expect(isValidAddress("cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg")).toBe(true);
      expect(isValidAddress("cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm")).toBe(true);
    });

    it("should reject invalid addresses", () => {
      expect(isValidAddress("0xinvalid")).toBe(false);
      expect(isValidAddress("")).toBe(false);
      expect(isValidAddress("not-an-address")).toBe(false);
    });
  });

  describe("validateTimestampRange", () => {
    it("should validate correct timestamp ranges", () => {
      const now = Math.floor(Date.now() / 1000);
      const weekAgo = now - 7 * 24 * 60 * 60;

      expect(() =>
        validateTimestampRange({
          minTimestamp: weekAgo,
          maxTimestamp: now,
        })
      ).not.toThrow();
    });

    it("should reject invalid timestamp ranges", () => {
      const now = Math.floor(Date.now() / 1000);
      const weekAgo = now - 7 * 24 * 60 * 60;

      expect(() =>
        validateTimestampRange({
          minTimestamp: now,
          maxTimestamp: weekAgo,
        })
      ).toThrow();
    });

    it("should handle missing timestamps", () => {
      expect(() => validateTimestampRange({})).not.toThrow();
    });
  });
});
