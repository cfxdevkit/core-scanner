export interface StatsParams {
  minTimestamp?: number;
  maxTimestamp?: number;
  sort?: "DESC" | "ASC";
  skip?: number;
  limit?: number;
  intervalType?: "min" | "hour" | "day";
}

export interface ESpaceStatsParams {
  minTimestamp?: number;
  maxTimestamp?: number;
  sort?: "DESC" | "ASC";
  skip?: number;
  limit?: number;
  intervalType?: "min" | "hour" | "day";
  [key: string]: string | number | boolean | undefined;
}

export type StatsPeriod = "24h" | "3d" | "7d";

export type TokenType = "CRC20" | "CRC721" | "CRC1155";
