import { TransactionModule } from "../../src";
import { TEST_ADDRESSES, inspect, demonstrationWrapper, MODULE_OPTIONS } from "../common/utils";

/**
 * Demonstrates all methods available in the Transaction module
 */
async function demonstrateTransactionModule() {
  // Initialize scanner for mainnet
  const transaction = new TransactionModule(MODULE_OPTIONS.MAINNET);

  try {
    console.log("=== Transaction Module Demonstration ===");

    // Get transaction status
    console.log("\nTesting getStatus...");
    const status = await transaction.getStatus({
      txhash: TEST_ADDRESSES.TRANSACTION.HASH,
    });
    console.log("Transaction status result:", inspect(status));

    // Get transaction receipt status
    console.log("\nTesting getReceiptStatus...");
    const receiptStatus = await transaction.getReceiptStatus({
      txhash: TEST_ADDRESSES.TRANSACTION.HASH,
    });
    console.log("Transaction receipt status result:", inspect(receiptStatus));
  } catch (error) {
    console.error(
      "Error during Transaction module demonstration:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Run the demonstration if this file is executed directly
if (require.main === module) {
  demonstrationWrapper("Transaction module", demonstrateTransactionModule);
}
