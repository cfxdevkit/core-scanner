/**
 * High-level wrapper for the Conflux Core Scanner API.
 * Provides formatted responses and additional data processing on top of the core modules.
 * All functionality is delegated to specialized modules for better organization and maintainability.
 *
 * @example
 * ```typescript
 * // Create a new scanner instance for mainnet
 * const scanner = new CoreScannerWrapper({ target: 'mainnet' });
 *
 * // Get account balance
 * const balance = await scanner.account.getBalance({
 *   address: '0x1234...'
 * });
 *
 * // Get token transfers
 * const transfers = await scanner.token.getTransfers({
 *   address: '0x1234...'
 * });
 * ```
 *
 * @public
 */
import { ApiConfig } from "../types";
import { BaseWrapper } from "./base";
import {
  AccountWrapper,
  ContractWrapper,
  NFTWrapper,
  StatisticsWrapper,
  UtilsWrapper,
} from "./modules";

export class CoreScannerWrapper extends BaseWrapper {
  /** Account module for balance and transaction queries */
  public readonly account: AccountWrapper;
  /** Contract module for contract verification and source code */
  public readonly contract: ContractWrapper;
  /** NFT module for NFT balances and transfers */
  public readonly nft: NFTWrapper;
  /** Statistics module for network metrics */
  public readonly stats: StatisticsWrapper;
  /** Utilities module for method decoding and other tools */
  public readonly utils: UtilsWrapper;

  /**
   * Create a new CoreScannerWrapper instance
   * @param config - API configuration options
   * @param config.target - Network target ('mainnet' or 'testnet')
   * @param config.apiKey - Optional API key for authentication
   * @param config.host - Optional custom API host URL
   */
  constructor(config: ApiConfig = { target: "mainnet" }) {
    super();
    this.account = new AccountWrapper(config);
    this.contract = new ContractWrapper(config);
    this.nft = new NFTWrapper(config);
    this.stats = new StatisticsWrapper(config);
    this.utils = new UtilsWrapper(config);
  }
}
