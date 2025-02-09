import { NumberFormatter } from "./numbers";
import { DateFormatter } from "./dates";
import { TokenData, CoreStatItem, CoreTopStatsResponse, FormattedResponse } from "../types";
import { formatUnits } from "cive";

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
    return NumberFormatter.formatCFX(value);
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

  static formatStatItem(item: CoreStatItem): string {
    const formattedTime = DateFormatter.formatTimestamp(item.statTime);
    const entries = Object.entries(item)
      .filter(([key]) => key !== "statTime")
      .map(([key, value]) => `${key}: ${this.formatNumber(value)}`);

    return [`Time: ${formattedTime}`, ...entries].join("\n");
  }

  static formatTopStats(data: CoreTopStatsResponse): string[] {
    const lines: string[] = [];

    if (data.gasTotal) {
      lines.push(`Total Gas: ${this.formatGas(data.gasTotal)}`);
    }

    if (data.valueTotal) {
      lines.push(`Total Value: ${this.formatNumber(data.valueTotal)}`);
    }

    data.list.forEach((item) => {
      lines.push(`Address: ${item.address}`);

      if (item.gas) {
        lines.push(`Gas: ${this.formatGas(item.gas)}`);
      }

      if (item.value) {
        lines.push(`Value: ${this.formatNumber(item.value)}`);
      }

      if (item.transferCntr) {
        lines.push(`Transfers: ${this.formatNumber(item.transferCntr)}`);
      }
    });

    return lines;
  }

  static wrapResponse<T, F = T>(raw: T, formatted: F): FormattedResponse<T, F> {
    return {
      raw,
      formatted,
    };
  }
}
