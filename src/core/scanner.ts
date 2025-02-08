import { CoreApi } from "./api";
import { AddressValidator } from "../utils";
import { createLogger } from "../utils/logger";
import {
  ContractABIResponse,
  ContractSourceResponse,
  TokenData,
  TokenListResponse,
  StatsParams,
  StatsPeriod,
  ListResponse,
  StatItem,
  SupplyResponse,
  MinerItem,
  TopStatsItem,
} from "../types";

export class CoreScanner extends CoreApi {
  protected logger = createLogger("CoreScanner");

  // Contract methods
  async getContractABI(address: string): Promise<ContractABIResponse> {
    this.logger.debug({ address }, "Getting contract ABI");
    if (!AddressValidator.validateAddress(address)) {
      this.logger.error({ address }, "Invalid address provided for contract ABI");
      throw new Error(`Invalid address: ${address}`);
    }
    const response = await this.fetchApi<ContractABIResponse>("/contract/getabi", {
      address,
    });
    if (!response.data) {
      this.logger.error({ address }, "Contract ABI not available");
      throw new Error(`Contract ${address} not verified or ABI not available`);
    }
    this.logger.debug({ address }, "Successfully retrieved contract ABI");
    return response.data;
  }

  async getContractSourceCode(address: string): Promise<ContractSourceResponse> {
    this.logger.debug({ address }, "Getting contract source code");
    if (!AddressValidator.validateAddress(address)) {
      this.logger.error({ address }, "Invalid address provided for contract source");
      throw new Error(`Invalid address: ${address}`);
    }
    const response = await this.fetchApi<ContractSourceResponse>("/contract/getsourcecode", {
      address,
    });
    if (!response.data) {
      this.logger.error({ address }, "Contract source code not available");
      throw new Error(`Contract ${address} not verified or source code not available`);
    }
    this.logger.debug({ address }, "Successfully retrieved contract source code");
    return response.data;
  }

  // Token methods
  async getAccountTokens(
    address: string,
    tokenType: "CRC20" | "CRC721" | "CRC1155" = "CRC20",
    skip = 0,
    limit = 10
  ): Promise<TokenData[]> {
    this.logger.debug({ address, tokenType, skip, limit }, "Getting account tokens");
    if (!AddressValidator.validateAddress(address)) {
      this.logger.error({ address }, "Invalid address provided for account tokens");
      throw new Error(`Invalid address: ${address}`);
    }
    const response = await this.fetchApi<TokenListResponse>("/account/tokens", {
      account: address,
      tokenType,
      skip,
      limit,
    });
    this.logger.debug(
      {
        address,
        tokenCount: response.data.list.length,
      },
      "Successfully retrieved account tokens"
    );
    return response.data.list;
  }

  async getTokenInfos(params: { contracts?: string | string[]; skip?: number; limit?: number } = {}) {
    const { contracts, ...paginationParams } = params;
    const contractList = Array.isArray(contracts) ? contracts.join(",") : contracts;

    const response = await this.fetchApi<TokenListResponse>("/token/tokeninfos", {
      ...(contractList && { contracts: contractList }),
      ...paginationParams,
    });
    return response.data.list;
  }

  // Statistics methods
  protected async getBasicStats<T>(endpoint: string, params: StatsParams = {}) {
    this.logger.debug({ endpoint, params }, "Getting basic stats");
    const fetchParams = {
      minTimestamp: params.minTimestamp || this.get24HoursAgo(),
      maxTimestamp: params.maxTimestamp || this.getCurrentTimestamp(),
      sort: params.sort || "DESC",
      skip: params.skip || 0,
      limit: params.limit || 10,
      ...params,
    };

    const response = await this.fetchApi<T>(endpoint, fetchParams);
    if (!response.data) {
      this.logger.error({ endpoint }, "No data returned for stats");
      throw new Error(`No data returned for ${endpoint}`);
    }
    return response.data;
  }

  protected async getTopStats<T>(endpoint: string, spanType: StatsPeriod = "24h") {
    this.logger.debug({ endpoint, spanType }, "Getting top stats");
    const response = await this.fetchApi<T>(endpoint, { spanType });
    if (!response.data) {
      this.logger.error({ endpoint }, "No data returned for top stats");
      throw new Error(`No data returned for ${endpoint}`);
    }
    return response.data;
  }

  // Basic statistics methods
  async getActiveAccountStats(params: StatsParams = {}) {
    return this.getBasicStats<ListResponse<StatItem>>("/statistics/account/active", params);
  }

  async getCfxHolderStats(params: StatsParams = {}) {
    return this.getBasicStats<ListResponse<StatItem>>("/statistics/account/cfx/holder", params);
  }

  async getAccountGrowthStats(params: StatsParams = {}) {
    return this.getBasicStats<ListResponse<StatItem>>("/statistics/account/growth", params);
  }

  async getContractStats(params: StatsParams = {}) {
    return this.getBasicStats<ListResponse<StatItem>>("/statistics/contract", params);
  }

  async getTransactionStats(params: StatsParams = {}) {
    return this.getBasicStats<ListResponse<StatItem>>("/statistics/transaction", params);
  }

  async getCfxTransferStats(params: StatsParams = {}) {
    return this.getBasicStats<ListResponse<StatItem>>("/statistics/cfx/transfer", params);
  }

  async getTpsStats(params: StatsParams & { intervalType: "min" | "hour" | "day" }) {
    return this.getBasicStats<ListResponse<StatItem>>("/statistics/tps", params);
  }

  // Top statistics methods
  async getTopGasUsed(spanType: StatsPeriod = "24h") {
    return this.getTopStats<ListResponse<TopStatsItem>>("/statistics/top/gas/used", spanType);
  }

  async getTopTransactionSenders(spanType: StatsPeriod = "24h") {
    return this.getTopStats<ListResponse<TopStatsItem>>("/statistics/top/transaction/sender", spanType);
  }

  async getTopTransactionReceivers(spanType: StatsPeriod = "24h") {
    return this.getTopStats<ListResponse<StatItem>>("/statistics/top/transaction/receiver", spanType);
  }

  async getTopCfxSenders(spanType: StatsPeriod = "24h") {
    return this.getTopStats<ListResponse<StatItem>>("/statistics/top/cfx/sender", spanType);
  }

  async getTopCfxReceivers(spanType: StatsPeriod = "24h") {
    return this.getTopStats<ListResponse<StatItem>>("/statistics/top/cfx/receiver", spanType);
  }

  // Supply statistics
  async getSupplyStats() {
    return this.getBasicStats<SupplyResponse>("/statistics/supply");
  }

  // Miner statistics methods
  async getTopMiners(spanType: StatsPeriod = "24h") {
    return this.getTopStats<ListResponse<MinerItem>>("/statistics/top/miner", spanType);
  }

  // Reward statistics methods
  async getPowRewardStats(params: StatsParams & { intervalType: "hour" | "day" | "month" }) {
    return this.getBasicStats<ListResponse<StatItem>>("/statistics/reward/pow", params);
  }

  async getPosRewardStats(params: StatsParams & { intervalType: "hour" | "day" | "month" }) {
    return this.getBasicStats<ListResponse<StatItem>>("/statistics/reward/pos", params);
  }

  // Burnt statistics methods
  async getBurntFeeStats(params: StatsParams = {}) {
    return this.getBasicStats<ListResponse<StatItem>>("/statistics/burnt/fee", params);
  }

  async getBurntRateStats(params: StatsParams = {}) {
    return this.getBasicStats<ListResponse<StatItem>>("/statistics/burnt/rate", params);
  }

  protected validateAddress(address: string): void {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      throw new Error("Invalid address");
    }
  }

  protected validateContractAddresses(addresses: string[]): void {
    if (!addresses.every((address) => /^0x[a-fA-F0-9]{40}$/.test(address))) {
      throw new Error("Invalid contract addresses provided");
    }
  }
}
