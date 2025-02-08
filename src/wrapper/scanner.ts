import { CoreScanner } from "../core";
import { ResponseFormatter } from "../formatters";
import {
  TokenData,
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
  async getContractABI(address: string): Promise<FormattedResponse<ContractABIResponse>> {
    const data = await this.scanner.getContractABI(address);
    return ResponseFormatter.wrapResponse(data, JSON.stringify(data, null, 2));
  }

  async getContractSourceCode(address: string): Promise<FormattedResponse<ContractSourceResponse>> {
    const data = await this.scanner.getContractSourceCode(address);
    return ResponseFormatter.wrapResponse(data, JSON.stringify(data, null, 2));
  }

  // Token methods
  async getAccountTokens(
    address: string,
    tokenType: "CRC20" | "CRC721" | "CRC1155" = "CRC20",
    skip = 0,
    limit = 10
  ): Promise<FormattedResponse<TokenData[]>> {
    const tokens = await this.scanner.getAccountTokens(address, tokenType, skip, limit);
    return ResponseFormatter.wrapResponse(
      tokens,
      tokens.map((token) => ResponseFormatter.formatTokenData(token)).join("\n\n")
    );
  }

  // Statistics methods
  async getActiveAccountStats(
    params: StatsParams = {}
  ): Promise<FormattedResponse<ListResponse<StatItem>>> {
    const data = await this.scanner.getActiveAccountStats(params);
    return ResponseFormatter.wrapResponse(
      data,
      data.list?.map((item) => ResponseFormatter.formatStatItem(item)).join("\n\n") ||
        "No data available"
    );
  }

  async getCfxHolderStats(
    params: StatsParams = {}
  ): Promise<FormattedResponse<ListResponse<StatItem>>> {
    const data = await this.scanner.getCfxHolderStats(params);
    return ResponseFormatter.wrapResponse(
      data,
      data.list?.map((item) => ResponseFormatter.formatStatItem(item)).join("\n\n") ||
        "No data available"
    );
  }

  async getTpsStats(
    params: StatsParams & { intervalType: "min" | "hour" | "day" }
  ): Promise<FormattedResponse<ListResponse<StatItem>>> {
    const data = await this.scanner.getTpsStats(params);
    return ResponseFormatter.wrapResponse(
      data,
      data.list?.map((item) => ResponseFormatter.formatStatItem(item)).join("\n\n") ||
        "No data available"
    );
  }

  // Top statistics methods
  async getTopGasUsed(spanType: StatsPeriod): Promise<FormattedResponse<ListResponse<TopStatsItem>>> {
    const data = await this.scanner.getTopGasUsed(spanType);
    return ResponseFormatter.wrapResponse(data as ListResponse<TopStatsItem>, ResponseFormatter.formatTopStats(data as any));
  }

  async getTopTransactionSenders(
    spanType: StatsPeriod
  ): Promise<FormattedResponse<ListResponse<TopStatsItem>>> {
    const data = await this.scanner.getTopTransactionSenders(spanType);
    return ResponseFormatter.wrapResponse(data as ListResponse<TopStatsItem>, ResponseFormatter.formatTopStats(data as any));
  }

  // Mining statistics methods
  async getTopMiners(spanType: StatsPeriod): Promise<FormattedResponse<ListResponse<MinerItem>>> {
    const data = await this.scanner.getTopMiners(spanType);
    return ResponseFormatter.wrapResponse(
      data,
      data.list
        ?.map(
          (item, index) => `
#${index + 1} ${item.address}
Blocks Mined: ${ResponseFormatter.formatNumber(item.blockCntr)}
Hash Rate: ${ResponseFormatter.formatNumber(item.hashRate)} H/s
Block Rewards: ${ResponseFormatter.formatCFX(item.rewardSum)}
Transaction Fees: ${ResponseFormatter.formatCFX(item.txFeeSum)}
`
        )
        .join("\n") || "No data available"
    );
  }

  async getPowRewardStats(
    params: StatsParams & { intervalType: "hour" | "day" | "month" }
  ): Promise<FormattedResponse<ListResponse<StatItem>>> {
    const data = await this.scanner.getPowRewardStats(params);
    return ResponseFormatter.wrapResponse(
      data,
      data.list?.map((item) => ResponseFormatter.formatStatItem(item)).join("\n\n") ||
        "No data available"
    );
  }

  async getPosRewardStats(
    params: StatsParams & { intervalType: "hour" | "day" | "month" }
  ): Promise<FormattedResponse<ListResponse<StatItem>>> {
    const data = await this.scanner.getPosRewardStats(params);
    return ResponseFormatter.wrapResponse(
      data,
      data.list?.map((item) => ResponseFormatter.formatStatItem(item)).join("\n\n") ||
        "No data available"
    );
  }

  // Supply statistics
  async getSupplyStats(): Promise<FormattedResponse<SupplyResponse>> {
    const data = await this.scanner.getSupplyStats();
    return ResponseFormatter.wrapResponse(
      data,
      `Total Supply: ${ResponseFormatter.formatCFX(data.totalSupply)}
Total Circulating: ${ResponseFormatter.formatCFX(data.totalCirculating)}
Total Staking: ${ResponseFormatter.formatCFX(data.totalStaking)}
Total Collateral: ${ResponseFormatter.formatCFX(data.totalCollateral)}
Total eSpace Tokens: ${ResponseFormatter.formatCFX(data.totalEspaceTokens)}
Total Issued: ${ResponseFormatter.formatCFX(data.totalIssued)}
Null Address Balance: ${ResponseFormatter.formatCFX(data.nullAddressBalance)}
Two Year Unlock Balance: ${ResponseFormatter.formatCFX(data.twoYearUnlockBalance)}
Four Year Unlock Balance: ${ResponseFormatter.formatCFX(data.fourYearUnlockBalance)}`
    );
  }
}
