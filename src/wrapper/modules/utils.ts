/**
 * @packageDocumentation
 * Utility wrapper module for the Conflux eSpace Scanner SDK.
 * Provides high-level methods for utility operations with data formatting.
 * @module wrapper/modules/utils
 * @category Wrappers
 */

import { BaseWrapper } from "../base";
import { ApiConfig, Utils } from "../../types";
import { UtilsModule } from "../../core/modules";

export class UtilsWrapper extends BaseWrapper {
  /**
   * Decode method data
   */
  private utils: UtilsModule;
  constructor(config: ApiConfig = { target: "mainnet" }) {
    super();
    this.utils = new UtilsModule(config);
  }
  async decodeMethod(
    params: Utils.DecodeMethodParams,
    returnRaw: boolean = false
  ): Promise<Utils.DecodeMethod> {
    const data = await this.utils.decodeMethod(params);
    if (returnRaw) return data;
    return data;
  }

  /**
   * Decode method raw data
   */
  async decodeMethodRaw(
    params: Utils.MethodRawParams,
    returnRaw: boolean = false
  ): Promise<Utils.MethodRaw> {
    const data = await this.utils.decodeMethodRaw(params);
    if (returnRaw) return data;
    return data;
  }
}
