import { CoreScannerWrapper } from "../src";
import util from "util";
import { StatsPeriod } from "../src/types";

const inspect = <T>(obj: T): string =>
  util.inspect(obj, {
    depth: null,
    colors: true,
    maxArrayLength: null,
  });

// Example of error handling and address validation
async function demonstrateErrorHandling(): Promise<void> {
  console.log("\n=== Error Handling Demonstration ===");
  const scanner = new CoreScannerWrapper({ target: "mainnet" });

  try {
    console.log("\nTesting invalid address handling...");
    await scanner.getContractABI("0xinvalid");
  } catch (error) {
    console.error(
      "Expected error for invalid address:",
      error instanceof Error ? error.message : String(error)
    );
  }

  try {
    console.log("\nTesting non-existent contract handling...");
    await scanner.getContractABI("0x0000000000000000000000000000000000000000");
  } catch (error) {
    console.error(
      "Expected error for non-existent contract:",
      error instanceof Error ? error.message : String(error)
    );
  }

  console.log("\n=== End of Error Handling Demonstration ===\n");
  console.log("=".repeat(80), "\n");
}

async function demonstrateCoreScannerWrapperUsage(): Promise<void> {
  // Initialize scanners for different networks
  const mainnetScanner = new CoreScannerWrapper({ target: "mainnet" });
  const testnetScanner = new CoreScannerWrapper({ target: "testnet" });
  const _scannerWithApiKey = new CoreScannerWrapper({
    target: "mainnet",
    apiKey: process.env.API_KEY,
  });

  try {
    console.log("=== Contract Methods ===");
    // Example Core contract address
    const contractAddress = "cfx:acg158kvr8zanb1bs048ryb6rtrhr283ma70vz70tx";

    const contractABI = await mainnetScanner.getContractABI(contractAddress);
    console.log("---\ngetContractABI\n", inspect(contractABI));

    const contractSource = await mainnetScanner.getContractSourceCode(contractAddress);
    console.log("---\ngetContractSourceCode\n", inspect(contractSource));

    console.log("\n=== Token Methods ===");
    // Example Core wallet address
    const walletAddress = "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm";

    // Test all token types
    for (const tokenType of ["CRC20", "CRC721", "CRC1155"] as const) {
      const tokens = await mainnetScanner.getAccountTokens(walletAddress, tokenType);
      console.log(`---\ngetAccountTokens ${tokenType}\n`, inspect(tokens));
    }

    console.log("\n=== Basic Statistics Methods ===");
    const statsParams = {
      minTimestamp: Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60, // 7 days ago
      maxTimestamp: Math.floor(Date.now() / 1000),
      limit: 5,
    };

    const activeAccounts = await mainnetScanner.getActiveAccountStats(statsParams);
    console.log("---\ngetActiveAccountStats\n", inspect(activeAccounts));

    const cfxHolders = await mainnetScanner.getCfxHolderStats(statsParams);
    console.log("---\ngetCfxHolderStats\n", inspect(cfxHolders));

    // Test TPS stats for different intervals
    for (const intervalType of ["min", "hour", "day"] as const) {
      const tpsStats = await mainnetScanner.getTpsStats({ ...statsParams, intervalType });
      console.log(`---\ngetTpsStats (${intervalType})\n`, inspect(tpsStats));
    }

    console.log("\n=== Top Statistics Methods ===");
    // Test different periods
    const periods: StatsPeriod[] = ["24h", "7d"];
    for (const period of periods) {
      const topGasUsed = await mainnetScanner.getTopGasUsed(period);
      console.log(`---\ngetTopGasUsed (${period})\n`, inspect(topGasUsed));

      const topTxSenders = await mainnetScanner.getTopTransactionSenders(period);
      console.log(`---\ngetTopTransactionSenders (${period})\n`, inspect(topTxSenders));

      const topMiners = await mainnetScanner.getTopMiners(period);
      console.log(`---\ngetTopMiners (${period})\n`, inspect(topMiners));
    }

    console.log("\n=== Mining Statistics ===");
    // Test different interval types for reward stats
    const rewardIntervals = ["hour", "day"] as const;
    for (const intervalType of rewardIntervals) {
      const powRewardStats = await mainnetScanner.getPowRewardStats({
        ...statsParams,
        intervalType,
      });
      console.log(`---\ngetPowRewardStats (${intervalType})\n`, inspect(powRewardStats));

      const posRewardStats = await mainnetScanner.getPosRewardStats({
        ...statsParams,
        intervalType,
      });
      console.log(`---\ngetPosRewardStats (${intervalType})\n`, inspect(posRewardStats));
    }

    console.log("\n=== Supply Statistics ===");
    const supplyStats = await mainnetScanner.getSupplyStats();
    console.log("---\ngetSupplyStats (mainnet)\n", inspect(supplyStats));

    console.log("\n=== Testnet Example ===");
    const testnetSupplyStats = await testnetScanner.getSupplyStats();
    console.log("---\ngetSupplyStats (testnet)\n", inspect(testnetSupplyStats));
  } catch (error) {
    console.error(
      "Error during demonstration:",
      error instanceof Error ? error.message : String(error)
    );
  }
}

// Run the demonstrations
if (require.main === module) {
  console.log("Starting demonstrations...");
  // Run error handling first, then the main demonstration
  demonstrateErrorHandling()
    .then(() => demonstrateCoreScannerWrapperUsage())
    .catch((error) =>
      console.error(
        "Error running demonstrations:",
        error instanceof Error ? error.message : String(error)
      )
    );
}
