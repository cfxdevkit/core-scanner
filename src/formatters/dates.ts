/**
 * @packageDocumentation
 * Date and timestamp formatting utilities.
 * Provides functionality for consistent date formatting and timestamp calculations.
 * All timestamps are handled in UTC to ensure consistency across different timezones.
 * @module formatters/dates
 */

import { createLogger } from "../utils/logger";

const logger = createLogger("DateFormatter");

/**
 * Utility class for handling date and timestamp formatting and calculations.
 * All timestamps are handled in UTC to ensure consistency across different timezones.
 */
export class DateFormatter {
  /**
   * Formats a timestamp into a human-readable date string.
   * Supports multiple output formats and handles both Unix timestamps and ISO date strings.
   *
   * @param {number | string} timestamp - Unix timestamp (seconds) or ISO date string
   * @param {"full" | "date" | "unix"} [style="full"] - Format style
   * @returns {string} Formatted date string
   * @throws {Error} If the timestamp is invalid or cannot be parsed
   *
   * @example
   * // Returns "2024-02-07 12:00:00"
   * DateFormatter.formatDate(1707307200, "full")
   * // Returns "2024-02-07"
   * DateFormatter.formatDate(1707307200, "date")
   * // Returns "1707307200"
   * DateFormatter.formatDate(1707307200, "unix")
   */
  static formatDate(timestamp: number | string, style: "full" | "date" | "unix" = "full"): string {
    try {
      const date = typeof timestamp === "string" ? new Date(timestamp) : new Date(timestamp * 1000);
      if (isNaN(date.getTime()) || timestamp === null || timestamp === undefined) {
        logger.warn({ timestamp }, "Invalid timestamp provided");
        return "N/A";
      }

      if (style === "unix") {
        return Math.floor(date.getTime() / 1000).toString();
      }

      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");

      if (style === "date") {
        return `${year}-${month}-${day}`;
      }

      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      const seconds = String(date.getUTCSeconds()).padStart(2, "0");
      const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      logger.debug({ timestamp, formatted }, "Successfully formatted timestamp");
      return formatted;
    } catch (error) {
      logger.error(
        {
          timestamp,
          error: error instanceof Error ? error.message : String(error),
        },
        "Error formatting timestamp"
      );
      return "N/A";
    }
  }

  /**
   * Formats a timestamp into a human-readable date string.
   * Always returns the full format (YYYY-MM-DD HH:mm:ss) in UTC.
   *
   * @param {number | string} timestamp - Unix timestamp (seconds) or ISO date string
   * @returns {string} Formatted date string in "YYYY-MM-DD HH:mm:ss" format (UTC)
   *
   * @example
   * // Returns "2024-02-07 12:00:00"
   * DateFormatter.formatTimestamp(1707307200)
   * // Returns "2024-02-07 12:00:00"
   * DateFormatter.formatTimestamp("2024-02-07T12:00:00Z")
   */
  static formatTimestamp(timestamp: number | string): string {
    return this.formatDate(timestamp, "full");
  }

  /**
   * Gets the current Unix timestamp in seconds.
   *
   * @returns {number} Current Unix timestamp
   *
   * @example
   * // Returns current timestamp (e.g., 1707307200)
   * DateFormatter.getCurrentTimestamp()
   */
  static getCurrentTimestamp(): number {
    const timestamp = Math.floor(Date.now() / 1000);
    logger.debug({ timestamp }, "Getting current timestamp");
    return timestamp;
  }

  /**
   * Gets the Unix timestamp from 24 hours ago.
   * Useful for querying data from the last day.
   *
   * @returns {number} Unix timestamp from 24 hours ago
   *
   * @example
   * // Returns timestamp from 24 hours ago
   * DateFormatter.get24HoursAgo()
   */
  static get24HoursAgo(): number {
    const timestamp = this.getCurrentTimestamp() - 24 * 60 * 60;
    logger.debug({ timestamp }, "Getting timestamp from 24 hours ago");
    return timestamp;
  }

  /**
   * Gets the Unix timestamp from a specified number of days ago.
   * Supports fractional days for more precise time ranges.
   *
   * @param {number} days - Number of days to go back (can be fractional)
   * @returns {number} Unix timestamp from specified days ago
   *
   * @example
   * // Returns timestamp from 7 days ago
   * DateFormatter.getTimeAgo(7)
   * // Returns timestamp from 12 hours ago
   * DateFormatter.getTimeAgo(0.5)
   */
  static getTimeAgo(days: number): number {
    const timestamp = this.getCurrentTimestamp() - days * 24 * 60 * 60;
    logger.debug({ days, timestamp }, "Getting timestamp from specified days ago");
    return timestamp;
  }
}
