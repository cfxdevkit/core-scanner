/**
 * @packageDocumentation
 * Transaction-related type definitions for the Conflux eSpace Scanner SDK.
 * Contains types for transaction status, receipts, and method decoding.
 * @module types/domains/transaction
 */

/**
 * Transaction status information
 * Indicates whether a transaction succeeded or failed
 *
 * @interface Status
 */
export interface Status {
  /** Error status (0 for success, 1 for failure) */
  isError: string;
  /** Detailed error description if failed */
  errDescription: string;
}

/**
 * Transaction receipt status information
 * Contains the final execution status from the receipt
 *
 * @interface ReceiptStatus
 */
export interface ReceiptStatus {
  /** Transaction status (0 for failed, 1 for success) */
  status: string;
}

/**
 * Parameters for transaction status request
 * Used to check if a transaction succeeded or failed
 *
 * @interface StatusParams
 */
export interface StatusParams {
  /** Transaction hash to check status for */
  txhash: string;
}

/**
 * Parameters for transaction receipt status request
 * Used to get the status from the transaction receipt
 *
 * @interface ReceiptStatusParams
 */
export interface ReceiptStatusParams {
  /** Transaction hash to get receipt status for */
  txhash: string;
}

/**
 * Decoded method information
 * Contains the decoded function call data for a transaction
 *
 * @interface DecodedMethod
 */
export interface DecodedMethod {
  /** Transaction hash */
  hash: string;
  /** Human-readable decoded function call data */
  decodedData: string;
  /** Error message if decoding failed */
  error?: string;
}

/**
 * Raw decoded method information
 * Contains the decoded function call data for raw input
 *
 * @interface DecodedMethodRaw
 */
export interface DecodedMethodRaw {
  /** Contract address the method was called on */
  contract?: string;
  /** Raw input data to decode */
  input: string;
  /** Human-readable decoded function call data */
  decodedData: string;
  /** Error message if decoding failed */
  error?: string;
}

/**
 * Parameters for method decoding
 * Used to decode function calls in transactions
 *
 * @interface DecodeMethodParams
 */
export interface DecodeMethodParams {
  /** Transaction hashes to decode (comma-separated) */
  hashes: string;
}

/**
 * Parameters for raw method decoding
 * Used to decode raw function call data
 *
 * @interface DecodeMethodRawParams
 */
export interface DecodeMethodRawParams {
  /** Contract addresses for the function calls (comma-separated) */
  contracts: string;
  /** Raw input data to decode (comma-separated) */
  inputs: string;
}
