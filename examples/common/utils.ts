import util from "util";
import { DateFormatter } from "../../src";

/**
 * Common test addresses used across examples
 */
export const TEST_ADDRESSES = {
  // Account addresses
  ACCOUNT: {
    SINGLE: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
    OWNER: "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
    MULTI: [
      "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
      "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm",
    ],
  },
  // Contract addresses
  CONTRACT: {
    TOKEN: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
    NFT: "cfx:ach7c9fr2skv5fft98cygac0g93999z1refedecnn1",
    VERIFIED: "cfx:achc8nxj7r451c223m18w2dwjnmhkd6rxawrvkvsy2",
  },
  // Example transaction hash
  TRANSACTION: {
    HASH: "0x15b73dd77ab6fb9ba061a41f0df2cfa8737a9b390260556c8759a33ac0325932",
  },
};

/**
 * Common test data used across examples
 */
export const TEST_DATA = {
  // NFT related test data
  NFT: {
    TOKEN_ID: "2",
    NAME: "CDW",
  },
  // Method related test data
  METHOD: {
    HASH: "0xa9059cbb", // transfer method hash
    INPUT_DATA:
      "0xa9059cbb000000000000000000000000e796f076084eef751968cf13838ac0b0cb60adaa0000000000000000000000000000000000000000000000000de0b6b3a7640000",
  },
  // Block related test data
  BLOCK: {
    START: 74180740,
    END: 74180760,
    HISTORY: 116288160,
  },
};

/**
 * Common time-based parameters used in statistics
 */
export const getTimeParams = (days = 7, limit = 5) => ({
  minTimestamp: DateFormatter.getTimeAgo(days),
  maxTimestamp: DateFormatter.getCurrentTimestamp(),
  limit,
});

/**
 * Common pagination parameters
 */
export const PAGINATION = {
  DEFAULT: {
    skip: 0,
    limit: 5,
    page: 1,
    offset: 5,
    sort: "desc" as "asc" | "desc",
  },
};

/**
 * Common block range parameters for queries
 */
export const BLOCK_RANGE = {
  DEFAULT: {
    startblock: 0,
    endblock: 99999999,
  },
};

/**
 * Helper function to format objects for console output
 */
export const inspect = <T>(obj: T): string =>
  util.inspect(obj, {
    depth: 4,
    colors: false,
    maxArrayLength: 2,
  });

/**
 * Common error handler for demonstration functions
 */
export const handleError = (context: string, error: unknown): void => {
  console.error(`Error during ${context}:`, error instanceof Error ? error.message : String(error));
};

/**
 * Wrapper for demonstration functions to provide consistent error handling and logging
 */
export const demonstrationWrapper = async (
  name: string,
  demoFn: () => Promise<void>
): Promise<void> => {
  console.log(`Starting ${name} demonstration...`);
  try {
    await demoFn();
    console.log(`\n${name} demonstration completed.`);
  } catch (error) {
    console.error(
      `Fatal error during ${name} demonstration:`,
      error instanceof Error ? error.message : String(error)
    );
  }
};

/**
 * Common module initialization options
 */
export const MODULE_OPTIONS = {
  MAINNET: { target: "mainnet" as const },
};
