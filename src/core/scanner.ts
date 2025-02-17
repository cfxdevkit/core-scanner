/**
 * @packageDocumentation
 * Core Scanner implementation for the Conflux Core Scanner API.
 * This file contains the main scanner class that provides access to all API modules.
 * @module core/scanner
 */

/**
 * Core implementation of the Conflux Core Scanner API.
 * Provides direct access to all API endpoints with basic data validation and error handling.
 */
import { CoreApi } from "./api";
import { createLogger } from "../utils/logger";
import { AccountModule, ContractModule, NFTModule, StatisticsModule, UtilsModule } from "./modules";
import { ApiConfig } from "../types";

/**
 * Main scanner class that provides access to all Conflux Core API modules.
 * Extends the base API class with specific module implementations.
 *
 * @class CoreScanner
 * @extends {CoreApi}
 */
export class CoreScanner extends CoreApi {
  /** Logger instance for the scanner */
  protected logger = createLogger("CoreScanner");

  /** Module for account-related operations */
  public readonly account: AccountModule;
  /** Module for smart contract operations */
  public readonly contract: ContractModule;
  /** Module for NFT-related operations */
  public readonly nft: NFTModule;
  /** Module for statistics and metrics */
  public readonly statistics: StatisticsModule;
  /** Module for utility functions */
  public readonly utils: UtilsModule;

  /**
   * Creates an instance of CoreScanner with all available modules.
   * @param {ApiConfig} config - Configuration object for the scanner
   * @param {string} [config.target="mainnet"] - Target network ("mainnet" or "testnet")
   * @param {string} [config.apiKey] - Optional API key for authenticated requests
   * @param {string} [config.host] - Optional custom host URL
   */
  constructor(config: ApiConfig = { target: "mainnet" }) {
    super(config);
    this.account = new AccountModule(config);
    this.contract = new ContractModule(config);
    this.nft = new NFTModule(config);
    this.statistics = new StatisticsModule(config);
    this.utils = new UtilsModule(config);
  }
}
