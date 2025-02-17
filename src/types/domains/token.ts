/**
 * @packageDocumentation
 * Token-related type definitions for the Conflux eSpace Scanner SDK.
 * Contains types for token balances, supplies, and historical data.
 * @module types/domains/token
 */

/**
 * Parameters for token balance request
 * Gets the current balance of a specific token for an account
 *
 * @interface TokenBalanceParams
 */
export interface TokenBalanceParams {
  /** Token contract address */
  contractaddress: string;
  /** Account address to check balance for */
  address: string;
}

/** Token balance amount in smallest unit */
export type TokenBalance = string;

/**
 * Parameters for token supply request
 * Gets the current total supply of a token
 *
 * @interface TokenSupplyParams
 */
export interface TokenSupplyParams {
  /** Token contract address */
  contractaddress: string;
}

/** Token total supply amount in smallest unit */
export type TokenSupply = string;

/**
 * Parameters for historical token supply data
 * Gets the total supply of a token at a specific block
 *
 * @interface TokenSupplyHistoryParams
 * @extends {TokenBalanceParams}
 */
export interface TokenSupplyHistoryParams extends TokenBalanceParams {
  /** Block number to query supply at */
  blockno: number;
}

/** Historical token supply amount in smallest unit */
export type TokenSupplyHistory = string;

/**
 * Parameters for token balance history
 * Gets the balance of a token for an account at a specific block
 *
 * @interface TokenBalanceHistoryParams
 */
export interface TokenBalanceHistoryParams {
  /** Token contract address */
  contractaddress: string;
  /** Account address to check balance for */
  address: string;
  /** Block number to query balance at */
  blockno: number;
}

/** Historical token balance amount in smallest unit */
export type TokenBalanceHistory = string;
