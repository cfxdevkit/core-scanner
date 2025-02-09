import { CoreScanner } from "../core";
import { ResponseFormatter } from "../formatters";
import {
  StatsParams,
  StatsPeriod,
  ContractABIResponse,
  ContractSourceResponse,
  TokenListResponse,
  ListResponse,
  StatItem,
  MinerItem,
  SupplyResponse,
  TopStatsItem,
} from "../types";
import { ApiConfig, FormattedResponse } from "../types/api";

export class CoreScannerWrapper {
  private scanner: CoreScanner;

  constructor(config: ApiConfig = {}) {
    this.scanner = new CoreScanner(config);
  }

  // Contract methods
  async getContractABI(
    address: string
  ): Promise<FormattedResponse<ContractABIResponse, ContractABIResponse>> {
    const data = await this.scanner.getContractABI(address);
    return ResponseFormatter.wrapResponse(data, data);
  }

  async getContractSourceCode(
    address: string
  ): Promise<FormattedResponse<ContractSourceResponse, ContractSourceResponse>> {
    const data = await this.scanner.getContractSourceCode(address);
    return ResponseFormatter.wrapResponse(data, data);
  }

  // Token methods
  async getAccountTokens(
    address: string,
    tokenType: "CRC20" | "CRC721" | "CRC1155" = "CRC20",
    skip = 0,
    limit = 10
  ): Promise<FormattedResponse<TokenListResponse, TokenListResponse>> {
    const data = await this.scanner.getAccountTokens(address, tokenType, skip, limit);
    const formattedData: TokenListResponse = {
      list: data.map((token) => ({
        ...token,
        amount: token.amount ? ResponseFormatter.formatUnit(token.amount, token.decimals) : "0",
        totalSupply: token.totalSupply
          ? ResponseFormatter.formatUnit(token.totalSupply, token.decimals)
          : "0",
      })),
      total: data.length,
    };
    return ResponseFormatter.wrapResponse({ list: data, total: data.length }, formattedData);
  }

  // Statistics methods
  async getActiveAccountStats(
    params: StatsParams = {}
  ): Promise<FormattedResponse<ListResponse<StatItem>, ListResponse<StatItem>>> {
    const data = await this.scanner.getActiveAccountStats(params);
    const formattedData: ListResponse<StatItem> = {
      ...data,
      list: data.list.map((item) => ({
        ...item,
        count: ResponseFormatter.formatNumber(item.count),
      })),
    };
    return ResponseFormatter.wrapResponse(data, formattedData);
  }

  async getCfxHolderStats(
    params: StatsParams = {}
  ): Promise<FormattedResponse<ListResponse<StatItem>, ListResponse<StatItem>>> {
    const data = await this.scanner.getCfxHolderStats(params);
    const formattedData: ListResponse<StatItem> = {
      ...data,
      list: data.list.map((item) => ({
        ...item,
        count: ResponseFormatter.formatNumber(item.count),
      })),
    };
    return ResponseFormatter.wrapResponse(data, formattedData);
  }

  async getTpsStats(
    params: StatsParams & { intervalType: "min" | "hour" | "day" }
  ): Promise<FormattedResponse<ListResponse<StatItem>, ListResponse<StatItem>>> {
    const data = await this.scanner.getTpsStats(params);
    const formattedData: ListResponse<StatItem> = {
      ...data,
      list: data.list.map((item) => ({
        ...item,
        tps: ResponseFormatter.formatNumber(item.tps),
      })),
    };
    return ResponseFormatter.wrapResponse(data, formattedData);
  }

  // Top statistics methods
  async getTopGasUsed(
    spanType: StatsPeriod
  ): Promise<FormattedResponse<ListResponse<TopStatsItem>, ListResponse<TopStatsItem>>> {
    const data = await this.scanner.getTopGasUsed(spanType);
    const formattedData: ListResponse<TopStatsItem> = {
      ...data,
      gasTotal: ResponseFormatter.formatGas(data.gasTotal),
      list: data.list.map((item) => ({
        ...item,
        gas: ResponseFormatter.formatGas(item.gas),
      })),
    };
    return ResponseFormatter.wrapResponse(data, formattedData);
  }

  async getTopTransactionSenders(
    spanType: StatsPeriod
  ): Promise<FormattedResponse<ListResponse<TopStatsItem>, ListResponse<TopStatsItem>>> {
    const data = await this.scanner.getTopTransactionSenders(spanType);
    const formattedData: ListResponse<TopStatsItem> = {
      ...data,
      list: data.list.map((item) => ({
        ...item,
        value: item.value ? ResponseFormatter.formatNumber(item.value) : undefined,
      })),
    };
    return ResponseFormatter.wrapResponse(data, formattedData);
  }

  // Mining statistics methods
  async getTopMiners(
    spanType: StatsPeriod
  ): Promise<FormattedResponse<ListResponse<MinerItem>, ListResponse<MinerItem>>> {
    const data = await this.scanner.getTopMiners(spanType);
    const formattedData: ListResponse<MinerItem> = {
      ...data,
      list: data.list.map((item) => ({
        ...item,
        blockCntr: ResponseFormatter.formatNumber(item.blockCntr),
        hashRate: ResponseFormatter.formatNumber(item.hashRate),
        rewardSum: ResponseFormatter.formatCFX(item.rewardSum),
        txFeeSum: ResponseFormatter.formatCFX(item.txFeeSum),
      })),
    };
    return ResponseFormatter.wrapResponse(data, formattedData);
  }

  async getPowRewardStats(
    params: StatsParams & { intervalType: "hour" | "day" | "month" }
  ): Promise<FormattedResponse<ListResponse<StatItem>, ListResponse<StatItem>>> {
    const data = await this.scanner.getPowRewardStats(params);
    const formattedData: ListResponse<StatItem> = {
      ...data,
      list: data.list.map((item) => ({
        ...item,
        count: ResponseFormatter.formatNumber(item.count),
      })),
    };
    return ResponseFormatter.wrapResponse(data, formattedData);
  }

  async getPosRewardStats(
    params: StatsParams & { intervalType: "hour" | "day" | "month" }
  ): Promise<FormattedResponse<ListResponse<StatItem>, ListResponse<StatItem>>> {
    const data = await this.scanner.getPosRewardStats(params);
    const formattedData: ListResponse<StatItem> = {
      ...data,
      list: data.list.map((item) => ({
        ...item,
        count: ResponseFormatter.formatNumber(item.count),
      })),
    };
    return ResponseFormatter.wrapResponse(data, formattedData);
  }

  // Supply statistics
  async getSupplyStats(): Promise<FormattedResponse<SupplyResponse, SupplyResponse>> {
    const data = await this.scanner.getSupplyStats();
    const formattedData: SupplyResponse = {
      ...data,
      totalSupply: ResponseFormatter.formatCFX(data.totalSupply),
      totalCirculating: ResponseFormatter.formatCFX(data.totalCirculating),
      totalStaking: ResponseFormatter.formatCFX(data.totalStaking),
      totalCollateral: ResponseFormatter.formatCFX(data.totalCollateral),
      totalEspaceTokens: ResponseFormatter.formatCFX(data.totalEspaceTokens),
      totalIssued: ResponseFormatter.formatCFX(data.totalIssued),
      nullAddressBalance: ResponseFormatter.formatCFX(data.nullAddressBalance),
      twoYearUnlockBalance: ResponseFormatter.formatCFX(data.twoYearUnlockBalance),
      fourYearUnlockBalance: ResponseFormatter.formatCFX(data.fourYearUnlockBalance),
    };
    return ResponseFormatter.wrapResponse(data, formattedData);
  }
}
