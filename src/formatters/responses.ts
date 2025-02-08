import { NumberFormatter } from "./numbers";
import { DateFormatter } from "./dates";
import { TokenData, ESpaceStatItem, ESpaceTopStatsResponse, FormattedResponse } from "../types";
import { formatUnits } from "viem";

export class ResponseFormatter {
  static formatUnit(value: string | number | undefined, decimals: number): string {
    if (value === undefined) return "0";
    return formatUnits(BigInt(value), decimals);
  }

  static formatNumber(value: string | number | undefined): string {
    if (value === undefined) return "0";
    return NumberFormatter.formatNumber(value);
  }

  static formatGas(value: string | number | undefined): string {
    if (value === undefined) return "0";
    return NumberFormatter.formatGas(value);
  }

  static formatCFX(value: string | number | undefined): string {
    if (value === undefined) return "0";
    return NumberFormatter.formatNumber(value);
  }

  static formatTimestamp(value: string | number | undefined): string {
    if (value === undefined) return "N/A";
    return DateFormatter.formatTimestamp(value);
  }

  static formatTokenData(token: TokenData): string {
    const lines = [
      `Token: ${token.name || "Unknown"} (${token.symbol || "Unknown"})`,
      `Type: ${token.type || "Unknown"}`,
      `Amount: ${NumberFormatter.formatTokenAmount(token.amount || "0", token.decimals)} ${token.symbol || ""}`,
      `Contract: ${token.contract || "Unknown"}`,
      token.priceInUSDT ? `Price: $${Number(token.priceInUSDT).toFixed(4)}` : undefined,
    ].filter(Boolean);
    return lines.join("\n");
  }

  static formatStatItem(item: ESpaceStatItem): string {
    const formattedTime = DateFormatter.formatTimestamp(item.statTime);
    const entries = Object.entries(item)
      .filter(([key]) => key !== "statTime")
      .map(([key, value]) => `${key}: ${this.formatNumber(value)}`);

    return [`Time: ${formattedTime}`, ...entries].join("\n");
  }

  static formatTopStats(data: ESpaceTopStatsResponse): string {
    if (!data?.list?.length) return "No data available";

    const lines = [];
    if (data.gasTotal) {
      lines.push(`Total Gas Used: ${this.formatGas(data.gasTotal)}`);
    }
    if (data.valueTotal) {
      lines.push(`Total Value: ${this.formatNumber(data.valueTotal)}`);
    }

    data.list.forEach((item, index) => {
      lines.push(`#${index + 1} ${item.address}`);
      if (item.gas) {
        lines.push(`Gas Used: ${this.formatGas(item.gas)}`);
      }
      if (item.value) {
        lines.push(`Value: ${this.formatNumber(item.value)}`);
      }
      if (item.transferCntr) {
        lines.push(`Transfers: ${this.formatNumber(item.transferCntr)}`);
      }
    });

    return lines.join("\n");
  }

  static wrapResponse<T, F = T>(raw: T, formatted: F): FormattedResponse<T, F> {
    return {
      raw,
      formatted,
    };
  }
}
