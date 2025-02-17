/**
 * @packageDocumentation
 * Contract-related wrapper module for the Conflux eSpace Scanner SDK.
 * Provides high-level methods for contract operations with data formatting.
 * @module wrapper/modules/contract
 * @category Wrappers
 */

import { BaseWrapper } from "../base";
import { ApiConfig, Contract } from "../../types";
import { ContractModule } from "../../core/modules";
export class ContractWrapper extends BaseWrapper {
  /**
   * Get contract ABI
   */
  private contract: ContractModule;
  constructor(config: ApiConfig = { target: "mainnet" }) {
    super();
    this.contract = new ContractModule(config);
  }
  async getABI(params: Contract.ABIParams, returnRaw: boolean = false): Promise<Contract.ABI> {
    const data = await this.contract.getABI(params);
    if (returnRaw) return data;
    return data;
  }

  /**
   * Get contract source code
   */
  async getSourceCode(
    params: Contract.SourceParams,
    returnRaw: boolean = false
  ): Promise<Contract.Source> {
    const data = await this.contract.getSourceCode(params);
    if (returnRaw) return data;
    return {
      ...data,
      Runs: this.formatNumber(data.Runs),
    };
  }

  /**
   * Check source code verification submission status
   */
  async checkVerifyStatus(
    params: Contract.checkVerifyStatusParams,
    returnRaw: boolean = false
  ): Promise<Contract.checkVerifyStatus> {
    const data = await this.contract.checkVerifyStatus(params);
    if (returnRaw) return data;
    return data;
  }

  /**
   * Verify a proxy contract
   */
  async verifyProxyContract(
    params: Contract.verifyProxyContractParams,
    returnRaw: boolean = false
  ): Promise<Contract.verifyProxyContract> {
    const data = await this.contract.verifyProxyContract(params);
    if (returnRaw) return data;
    return data;
  }

  /**
   * Check proxy contract verification submission status
   */
  async checkProxyVerification(
    params: Contract.checkProxyVerificationParams,
    returnRaw: boolean = false
  ): Promise<Contract.checkProxyVerification> {
    const data = await this.contract.checkProxyVerification(params);
    if (returnRaw) return data;
    return data;
  }
}
