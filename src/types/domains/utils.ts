/**
 * @packageDocumentation
 * Utility type definitions for the Conflux eSpace Scanner SDK.
 * Contains types for method decoding and other utility functions.
 * @module types/domains/utils
 */

/**
 * Parameters for decoding transaction method data.
 *
 * @public
 */
export interface DecodeMethodParams {
  /** Hash array of transactions to decode data, separated by comma,
   * eg. 0x8378892767d0afce19b278015702531a61512e8444ee7f51c41c90e56fec462d,0xa09c63d8dc9867851b254b31a723e653c9608a94a4a61bc97bf8a5f4aeffb4f4 */
  hashes: string;
}

/**
 * Decoded method data response.
 *
 * @public
 */
export type DecodeMethod = {
  /** Transaction hash. */
  hash?: string;

  /** Decoded data of the transaction. */
  decodedData?: string;

  /** Error message when something wrong. */
  error?: string;
};

/**
 * Parameters for decoding raw method data.
 *
 * @public
 */
export interface MethodRawParams {
  /** To address array of transactions to decode data, separated by comma,
   * eg. 0xc18944582317654327f20ce92df111cae83995dd,0x30b987679c1dcf3a8c890395eadf178078a99b82 */
  contracts: string;

  /** To input data array of transactions to decode data, separated by comma,
   * eg. 0xaea1414f,0x6e756fb200000000000000000000000015a0a156ce9feb9f01881b3b4a9788c49e65c6fa00000000000000000000000000000000000000000000 */
  inputs: string;
}

/**
 * Raw method decoding response.
 *
 * @public
 */
export type MethodRaw = {
  /** Contract address. */
  contract?: string;

  /** Input data of the transaction. */
  input?: string;

  /** Decoded data of the transaction. */
  decodedData?: string;

  /** Error message when something wrong. */
  error?: string;
};
