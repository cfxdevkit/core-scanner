import { CoreScannerWrapper } from "../src";
import { createLogger } from "../src/utils/logger";

const logger = createLogger("Usage");

async function demonstrateCoreScannerWrapperUsage(): Promise<void> {
  // Initialize scanners for different networks
  const mainnetScanner = new CoreScannerWrapper({ target: "mainnet" });
  const testnetScanner = new CoreScannerWrapper({ target: "testnet" });
  const scannerWithApiKey = new CoreScannerWrapper({
    target: "mainnet",
    apiKey: process.env.API_KEY,
  });

  try {
    logger.info("=== Contract Methods ===");
    // Example Core contract address
    const contractAddress = "cfx:acg158kvr8zanb1bs048ryb6rtrhr283ma70vz70tx";
    // const tokenAddress = "0x8b8689c7f3014a4d86e4d1d0daaf74a47f5e0f27";

    const contractABI = await mainnetScanner.getContractABI(contractAddress);
    logger.info("Contract ABI:");
    logger.info({ formatted: contractABI.formatted }, "Formatted ABI");
    logger.debug({ raw: contractABI.raw }, "Raw ABI");

    const contractSource = await mainnetScanner.getContractSourceCode(contractAddress);
    logger.info("\nContract Source:");
    logger.info({ formatted: contractSource.formatted }, "Formatted Source");
    logger.debug({ raw: contractSource.raw }, "Raw Source");

    logger.info("\n=== Token Methods ===");
    // Example Core wallet address
    const walletAddress = "cfx:aapgmw9up7tm7dxy5pctg8442dz6x7ak4u9fzsj0fm";

    const crc20Tokens = await mainnetScanner.getAccountTokens(walletAddress, "CRC20");
    logger.info("\nCRC20 Tokens:");
    logger.info({ formatted: crc20Tokens.formatted }, "Formatted CRC20 Tokens");
    logger.debug({ raw: crc20Tokens.raw }, "Raw CRC20 Tokens");

    const crc721Tokens = await mainnetScanner.getAccountTokens(walletAddress, "CRC721");
    logger.info("\nCRC721 Tokens:");
    logger.info({ formatted: crc721Tokens.formatted }, "Formatted CRC721 Tokens");
    logger.debug({ raw: crc721Tokens.raw }, "Raw CRC721 Tokens");

    logger.info("\n=== Basic Statistics Methods ===");
    const statsParams = {
      minTimestamp: Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60, // 7 days ago
      maxTimestamp: Math.floor(Date.now() / 1000),
      limit: 5,
    };

    const activeAccounts = await mainnetScanner.getActiveAccountStats(statsParams);
    logger.info("\nActive Accounts:");
    logger.info({ formatted: activeAccounts.formatted }, "Formatted Active Accounts");
    logger.debug({ raw: activeAccounts.raw }, "Raw Active Accounts");

    const cfxHolders = await mainnetScanner.getCfxHolderStats(statsParams);
    logger.info("\nCFX Holders:");
    logger.info({ formatted: cfxHolders.formatted }, "Formatted CFX Holders");
    logger.debug({ raw: cfxHolders.raw }, "Raw CFX Holders");

    const tpsStats = await mainnetScanner.getTpsStats({ ...statsParams, intervalType: "hour" });
    logger.info("\nTPS Stats:");
    logger.info({ formatted: tpsStats.formatted }, "Formatted TPS Stats");
    logger.debug({ raw: tpsStats.raw }, "Raw TPS Stats");

    logger.info("\n=== Top Statistics Methods ===");
    const topGasUsed = await mainnetScanner.getTopGasUsed("24h");
    logger.info("\nTop Gas Used:");
    logger.info({ formatted: topGasUsed.formatted }, "Formatted Top Gas Used");
    logger.debug({ raw: topGasUsed.raw }, "Raw Top Gas Used");

    const topTxSenders = await mainnetScanner.getTopTransactionSenders("24h");
    logger.info("\nTop Transaction Senders:");
    logger.info({ formatted: topTxSenders.formatted }, "Formatted Top Transaction Senders");
    logger.debug({ raw: topTxSenders.raw }, "Raw Top Transaction Senders");

    logger.info("\n=== Mining Statistics ===");
    const topMiners = await mainnetScanner.getTopMiners("24h");
    logger.info("\nTop Miners:");
    logger.info({ formatted: topMiners.formatted }, "Formatted Top Miners");
    logger.debug({ raw: topMiners.raw }, "Raw Top Miners");

    const powRewardStats = await mainnetScanner.getPowRewardStats({
      ...statsParams,
      intervalType: "day",
    });
    logger.info("\nPoW Reward Stats:");
    logger.info({ formatted: powRewardStats.formatted }, "Formatted PoW Reward Stats");
    logger.debug({ raw: powRewardStats.raw }, "Raw PoW Reward Stats");

    const posRewardStats = await mainnetScanner.getPosRewardStats({
      ...statsParams,
      intervalType: "day",
    });
    logger.info("\nPoS Reward Stats:");
    logger.info({ formatted: posRewardStats.formatted }, "Formatted PoS Reward Stats");
    logger.debug({ raw: posRewardStats.raw }, "Raw PoS Reward Stats");

    logger.info("\n=== Supply Statistics ===");
    const supplyStats = await mainnetScanner.getSupplyStats();
    logger.info("\nSupply Stats:");
    logger.info({ formatted: supplyStats.formatted }, "Formatted Supply Stats");
    logger.debug({ raw: supplyStats.raw }, "Raw Supply Stats");

    // Example with testnet
    logger.info("\n=== Testnet Example ===");
    const testnetSupplyStats = await testnetScanner.getSupplyStats();
    logger.info("\nTestnet Supply Stats:");
    logger.info({ formatted: testnetSupplyStats.formatted }, "Formatted Testnet Supply Stats");
    logger.debug({ raw: testnetSupplyStats.raw }, "Raw Testnet Supply Stats");

  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : String(error) },
      "Error during demonstration"
    );
  }
}

// Example of error handling and address validation
async function demonstrateErrorHandling(): Promise<void> {
  const scanner = new CoreScannerWrapper({ target: "mainnet" });

  try {
    // Invalid address example
    logger.info("Testing invalid address handling...");
    await scanner.getContractABI("0xinvalid");
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : String(error) },
      "Expected error for invalid address"
    );
  }

  try {
    // Non-existent contract
    logger.info("Testing non-existent contract handling...");
    await scanner.getContractABI("0x0000000000000000000000000000000000000000");
  } catch (error) {
    logger.error(
      { error: error instanceof Error ? error.message : String(error) },
      "Expected error for non-existent contract"
    );
  }
}

// Run the demonstrations
if (require.main === module) {
  logger.info("Starting demonstrations...");
  Promise.all([demonstrateCoreScannerWrapperUsage(), demonstrateErrorHandling()]).catch((error) =>
    logger.error(
      { error: error instanceof Error ? error.message : String(error) },
      "Error running demonstrations"
    )
  );
}
