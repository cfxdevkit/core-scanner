import { TransactionWrapper } from "../../src";
import { TEST_ADDRESSES, inspect, demonstrationWrapper, MODULE_OPTIONS } from "../common/utils";

/**
 * Demonstrates all methods available in the Transaction wrapper module
 */
async function demonstrateTransactionWrapper() {
  // Initialize wrapper for mainnet
  const transaction = new TransactionWrapper(MODULE_OPTIONS.MAINNET);

  try {
    console.log("=== Transaction Wrapper Module Demonstration ===");

    // Get transaction status with formatting
    console.log("\nTesting getStatus with formatting...");
    const statusFormatted = await transaction.getStatus({
      txhash: TEST_ADDRESSES.TRANSACTION.HASH,
    });
    console.log("Transaction status (formatted) result:", inspect(statusFormatted));

    // Get transaction receipt status with formatting
    console.log("\nTesting getReceiptStatus with formatting...");
    const receiptStatusFormatted = await transaction.getReceiptStatus({
      txhash: TEST_ADDRESSES.TRANSACTION.HASH,
    });
    console.log("Transaction receipt status (formatted) result:", inspect(receiptStatusFormatted));
  } catch (error) {
    console.error(
      "Error during Transaction wrapper module demonstration:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Run the demonstration if this file is executed directly
if (require.main === module) {
  demonstrationWrapper("Transaction wrapper module", demonstrateTransactionWrapper);
}
