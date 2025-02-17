import { DateFormatter } from "../../../formatters/dates";

describe("DateFormatter", () => {
  describe("formatDate", () => {
    it("should format timestamp to full date string", () => {
      const timestamp = 1677649200; // 2023-03-01 05:40:00
      expect(DateFormatter.formatDate(timestamp, "full")).toBe("2023-03-01 05:40:00");
    });

    it("should format timestamp to date only", () => {
      const timestamp = 1677649200;
      expect(DateFormatter.formatDate(timestamp, "date")).toBe("2023-03-01");
    });

    it("should format timestamp to unix timestamp", () => {
      const timestamp = 1677649200;
      expect(DateFormatter.formatDate(timestamp, "unix")).toBe("1677649200");
    });

    it("should handle string timestamps", () => {
      const timestamp = "2023-03-01T05:40:00Z";
      expect(DateFormatter.formatDate(timestamp, "full")).toBe("2023-03-01 05:40:00");
    });

    it("should handle invalid timestamps", () => {
      expect(DateFormatter.formatDate("invalid", "full")).toBe("N/A");
    });

    it("should handle empty timestamps", () => {
      expect(DateFormatter.formatDate("", "full")).toBe("N/A");
    });

    it("should handle null timestamps", () => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(DateFormatter.formatDate(null as any, "full")).toBe("N/A");
    });

    it("should handle undefined timestamps", () => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(DateFormatter.formatDate(undefined as any, "full")).toBe("N/A");
    });
  });

  describe("formatTimestamp", () => {
    it("should format unix timestamp to date string", () => {
      const timestamp = 1677649200;
      expect(DateFormatter.formatTimestamp(timestamp)).toBe("2023-03-01 05:40:00");
    });

    it("should format ISO string to date string", () => {
      const timestamp = "2023-03-01T05:40:00Z";
      expect(DateFormatter.formatTimestamp(timestamp)).toBe("2023-03-01 05:40:00");
    });

    it("should handle invalid timestamps", () => {
      expect(DateFormatter.formatTimestamp("invalid")).toBe("N/A");
    });
  });

  describe("getCurrentTimestamp", () => {
    it("should return current timestamp in seconds", () => {
      const timestamp = DateFormatter.getCurrentTimestamp();
      expect(typeof timestamp).toBe("number");
      expect(timestamp).toBeLessThanOrEqual(Math.floor(Date.now() / 1000));
      expect(timestamp).toBeGreaterThan(Math.floor(Date.now() / 1000) - 2);
    });
  });

  describe("get24HoursAgo", () => {
    it("should return timestamp from 24 hours ago", () => {
      const timestamp = DateFormatter.get24HoursAgo();
      const now = Math.floor(Date.now() / 1000);
      expect(timestamp).toBeLessThanOrEqual(now - 24 * 60 * 60);
      expect(timestamp).toBeGreaterThan(now - 24 * 60 * 60 - 2);
    });
  });

  describe("getTimeAgo", () => {
    it("should return timestamp from specified days ago", () => {
      const days = 7;
      const timestamp = DateFormatter.getTimeAgo(days);
      const now = Math.floor(Date.now() / 1000);
      expect(timestamp).toBeLessThanOrEqual(now - days * 24 * 60 * 60);
      expect(timestamp).toBeGreaterThan(now - days * 24 * 60 * 60 - 2);
    });

    it("should handle fractional days", () => {
      const days = 0.5; // 12 hours
      const timestamp = DateFormatter.getTimeAgo(days);
      const now = Math.floor(Date.now() / 1000);
      expect(timestamp).toBeLessThanOrEqual(now - days * 24 * 60 * 60);
      expect(timestamp).toBeGreaterThan(now - days * 24 * 60 * 60 - 2);
    });
  });
});
