import { DateFormatter } from "../dates";

describe("DateFormatter", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-02-07T12:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("formatTimestamp", () => {
    it("should format numeric timestamp", () => {
      const timestamp = 1707307200; // 2024-02-07 12:00:00
      const result = DateFormatter.formatTimestamp(timestamp);
      expect(result).toMatch(/2024.*02.*07.*12:00:00/);
    });

    it("should format string timestamp", () => {
      const timestamp = "2024-02-07T12:00:00Z";
      const result = DateFormatter.formatTimestamp(timestamp);
      expect(result).toMatch(/2024.*02.*07.*12:00:00/);
    });
  });

  describe("getCurrentTimestamp", () => {
    it("should return current unix timestamp", () => {
      const result = DateFormatter.getCurrentTimestamp();
      expect(result).toBe(1707307200); // 2024-02-07 12:00:00
    });
  });

  describe("get24HoursAgo", () => {
    it("should return timestamp from 24 hours ago", () => {
      const result = DateFormatter.get24HoursAgo();
      expect(result).toBe(1707307200 - 24 * 60 * 60);
    });
  });

  describe("getTimeAgo", () => {
    it("should return timestamp from specified days ago", () => {
      const result = DateFormatter.getTimeAgo(7);
      expect(result).toBe(1707307200 - 7 * 24 * 60 * 60);
    });

    it("should handle 0 days", () => {
      const result = DateFormatter.getTimeAgo(0);
      expect(result).toBe(1707307200);
    });

    it("should handle fractional days", () => {
      const result = DateFormatter.getTimeAgo(0.5);
      expect(result).toBe(1707307200 - Math.floor(0.5 * 24 * 60 * 60));
    });
  });
});
