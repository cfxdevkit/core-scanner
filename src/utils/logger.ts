/**
 * @packageDocumentation
 * Logging utility configuration and factory.
 * Provides a centralized logging setup using pino with pretty printing.
 * Supports module-specific child loggers and configurable log levels.
 * @module utils/logger
 */

import pino from "pino";

/**
 * Base logger configuration with pretty printing and default settings.
 * Log level can be configured via LOG_LEVEL environment variable.
 *
 * @constant
 * @type {pino.Logger}
 */
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});

/**
 * Creates a child logger for a specific module.
 * Automatically adds module name to all log entries for better tracing.
 *
 * @param {string} module - Name of the module requesting the logger
 * @returns {pino.Logger} Child logger instance with module context
 *
 * @example
 * // Create a logger for the AccountModule
 * const logger = createLogger("AccountModule");
 * logger.info("Account module initialized");
 * // Output: ... [AccountModule] Account module initialized
 */
export const createLogger = (module: string) => logger.child({ module });

/**
 * Default logger instance for general use.
 * Prefer using createLogger for module-specific logging.
 *
 * @type {pino.Logger}
 */
export default logger;
