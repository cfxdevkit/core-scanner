import { StatisticsModule } from "../../src";
import {
  TEST_ADDRESSES,
  getTimeParams,
  inspect,
  demonstrationWrapper,
  MODULE_OPTIONS,
} from "../common/utils";

/**
 * Demonstrates all methods available in the Statistics module
 */
async function demonstrateStatisticsModule() {
  // Initialize scanner for mainnet
  const statistics = new StatisticsModule(MODULE_OPTIONS.MAINNET);

  try {
    console.log("=== Statistics Module Demonstration ===");

    // Common parameters for time-based queries
    const timeParams = getTimeParams();

    // Get supply statistics
    console.log("\nTesting getSupply...");
    const supply = await statistics.getSupply();
    console.log("Supply statistics result:", inspect(supply));

    // Get mining statistics
    console.log("\nTesting getMining...");
    const mining = await statistics.getMining({
      ...timeParams,
      intervalType: "hour",
    });
    console.log("Mining statistics result:", inspect(mining));

    // Get TPS statistics
    console.log("\nTesting getTps...");
    const tps = await statistics.getTps({
      ...timeParams,
      intervalType: "hour",
    });
    console.log("TPS statistics result:", inspect(tps));

    // Get contract statistics
    console.log("\nTesting getContract...");
    const contract = await statistics.getContract(timeParams);
    console.log("Contract statistics result:", inspect(contract));

    // Get CFX holder statistics
    console.log("\nTesting getCfxHolder...");
    const cfxHolder = await statistics.getCfxHolder(timeParams);
    console.log("CFX holder statistics result:", inspect(cfxHolder));

    // Get account growth statistics
    console.log("\nTesting getAccountGrowth...");
    const accountGrowth = await statistics.getAccountGrowth(timeParams);
    console.log("Account growth statistics result:", inspect(accountGrowth));

    // Get account active statistics
    console.log("\nTesting getAccountActive...");
    const accountActive = await statistics.getAccountActive(timeParams);
    console.log("Account active statistics result:", inspect(accountActive));

    // Get account active overall statistics
    console.log("\nTesting getAccountActiveOverall...");
    const accountActiveOverall = await statistics.getAccountActiveOverall(timeParams);
    console.log("Account active overall statistics result:", inspect(accountActiveOverall));

    // Get transaction statistics
    console.log("\nTesting getTransaction...");
    const transaction = await statistics.getTransaction(timeParams);
    console.log("Transaction statistics result:", inspect(transaction));

    // Get CFX transfer statistics
    console.log("\nTesting getCfxTransfer...");
    const cfxTransfer = await statistics.getCfxTransfer(timeParams);
    console.log("CFX transfer statistics result:", inspect(cfxTransfer));

    // Get token transfer statistics
    console.log("\nTesting getTokenTransfer...");
    const tokenTransfer = await statistics.getTokenTransfer(timeParams);
    console.log("Token transfer statistics result:", inspect(tokenTransfer));

    // Get top statistics
    const spanType = "24h";

    // Get top gas used statistics
    console.log("\nTesting getTopGasUsed...");
    const topGasUsed = await statistics.getTopGasUsed({ spanType });
    console.log("Top gas used statistics result:", inspect(topGasUsed));

    // Get top miner statistics
    console.log("\nTesting getTopMiner...");
    const topMiner = await statistics.getTopMiner({ spanType });
    console.log("Top miner statistics result:", inspect(topMiner));

    // Get top transaction sender statistics
    console.log("\nTesting getTopTransactionSender...");
    const topTxSender = await statistics.getTopTransactionSender({ spanType });
    console.log("Top transaction sender statistics result:", inspect(topTxSender));

    // Get top transaction receiver statistics
    console.log("\nTesting getTopTransactionReceiver...");
    const topTxReceiver = await statistics.getTopTransactionReceiver({ spanType });
    console.log("Top transaction receiver statistics result:", inspect(topTxReceiver));

    // Get top CFX sender statistics
    console.log("\nTesting getTopCfxSender...");
    const topCfxSender = await statistics.getTopCfxSender({ spanType });
    console.log("Top CFX sender statistics result:", inspect(topCfxSender));

    // Get top CFX receiver statistics
    console.log("\nTesting getTopCfxReceiver...");
    const topCfxReceiver = await statistics.getTopCfxReceiver({ spanType });
    console.log("Top CFX receiver statistics result:", inspect(topCfxReceiver));

    // Get top token transfer statistics
    console.log("\nTesting getTopTokenTransfer...");
    const topTokenTransfer = await statistics.getTopTokenTransfer({ spanType });
    console.log("Top token transfer statistics result:", inspect(topTokenTransfer));

    // Get top token receiver statistics
    console.log("\nTesting getTopTokenReceiver...");
    const topTokenReceiver = await statistics.getTopTokenReceiver({ spanType });
    console.log("Top token receiver statistics result:", inspect(topTokenReceiver));

    // Get top token participant statistics
    console.log("\nTesting getTopTokenParticipant...");
    const topTokenParticipant = await statistics.getTopTokenParticipant({ spanType });
    console.log("Top token participant statistics result:", inspect(topTokenParticipant));

    // Token-specific statistics
    // Get token holder statistics
    console.log("\nTesting getTokenHolder...");
    const tokenHolder = await statistics.getTokenHolder({
      ...timeParams,
      contract: TEST_ADDRESSES.CONTRACT.TOKEN,
    });
    console.log("Token holder statistics result:", inspect(tokenHolder));

    // Get unique sender statistics
    console.log("\nTesting getUniqueSender...");
    const uniqueSender = await statistics.getUniqueSender({
      ...timeParams,
      contract: TEST_ADDRESSES.CONTRACT.TOKEN,
    });
    console.log("Unique sender statistics result:", inspect(uniqueSender));

    // Get unique receiver statistics
    console.log("\nTesting getUniqueReceiver...");
    const uniqueReceiver = await statistics.getUniqueReceiver({
      ...timeParams,
      contract: TEST_ADDRESSES.CONTRACT.TOKEN,
    });
    console.log("Unique receiver statistics result:", inspect(uniqueReceiver));

    // Get unique participant statistics
    console.log("\nTesting getUniqueParticipant...");
    const uniqueParticipant = await statistics.getUniqueParticipant({
      ...timeParams,
      contract: TEST_ADDRESSES.CONTRACT.TOKEN,
    });
    console.log("Unique participant statistics result:", inspect(uniqueParticipant));

    // Block statistics
    console.log("\nTesting block statistics...");

    // Get block base fee statistics
    console.log("\nTesting getBlockBasefee...");
    const blockBasefee = await statistics.getBlockBasefee(timeParams);
    console.log("Block base fee statistics result:", inspect(blockBasefee));

    // Get block average priority fee statistics
    console.log("\nTesting getBlockAvgpriorityfee...");
    const blockAvgPriorityFee = await statistics.getBlockAvgpriorityfee(timeParams);
    console.log("Block average priority fee statistics result:", inspect(blockAvgPriorityFee));

    // Get block gas used statistics
    console.log("\nTesting getBlockGasused...");
    const blockGasUsed = await statistics.getBlockGasused(timeParams);
    console.log("Block gas used statistics result:", inspect(blockGasUsed));

    // Get block transactions by type statistics
    console.log("\nTesting getBlockTxsbytype...");
    const blockTxsByType = await statistics.getBlockTxsbytype(timeParams);
    console.log("Block transactions by type statistics result:", inspect(blockTxsByType));
  } catch (error) {
    console.error(
      "Error during Statistics module demonstration:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Run the demonstration if this file is executed directly
if (require.main === module) {
  demonstrationWrapper("Statistics module", demonstrateStatisticsModule);
}
