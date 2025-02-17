import { NumberFormatter } from "./numbers";
import { DateFormatter } from "./dates";
import { formatUnits } from "cive";

export class ResponseFormatter {
  static formatUnit(value: string | number | undefined, decimals: number): string {
    if (value === undefined) return "0";
    try {
      return formatUnits(BigInt(value), decimals);
    } catch {
      return "0";
    }
  }

  static formatNumber(value: string | number | undefined): string {
    return NumberFormatter.formatNumber(value);
  }

  static formatGas(value: string | number | undefined): string {
    return NumberFormatter.formatGas(value);
  }

  static formatCFX(value: string | number | undefined): string {
    return NumberFormatter.formatCFX(value);
  }

  static formatTimestamp(value: string | number | undefined): string {
    if (value === undefined) return "N/A";
    return DateFormatter.formatTimestamp(value);
  }

  static formatDate(
    value: string | number | undefined,
    style: "full" | "date" | "unix" = "full"
  ): string {
    if (value === undefined) return "N/A";
    return DateFormatter.formatDate(value, style);
  }
}
