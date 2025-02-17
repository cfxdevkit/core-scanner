/**
 * @packageDocumentation
 * Block-related type definitions for the Conflux eSpace Scanner SDK.
 * Contains types for block queries and timestamps.
 * @module types/domains/block
 */

/**
 * Parameters for getting block number by timestamp.
 *
 * @public
 */
export interface BlockNumberByTimeParams {
  /** The integer representing the Unix timestamp in seconds */
  timestamp: number;

  /** The closest available block to the provided timestamp, either before or after
   * @default before */
  closest?: "before" | "after";
}

/**
 * Block number response.
 * Returns the block number as a string.
 *
 * @public
 */
export type BlockNumberByTime = string;
