import { ESpaceApi } from "../api";
import { jest } from "@jest/globals";

// Type for accessing protected members in tests
type TestableESpaceApi = {
  baseUrl: string;
  apiKey?: string;
  fetchApi<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
  getCurrentTimestamp(): number;
  get24HoursAgo(): number;
};

describe("ESpaceApi", () => {
  let api: ESpaceApi;
  const mockFetch = jest.fn() as jest.MockedFunction<typeof global.fetch>;

  beforeEach(() => {
    jest.clearAllMocks();
    api = new ESpaceApi();
    global.fetch = mockFetch;
  });

  describe("constructor", () => {
    it("should initialize with default mainnet URL", () => {
      expect((api as unknown as TestableESpaceApi).baseUrl).toBe("https://evmapi.confluxscan.io");
    });

    it("should initialize with testnet URL when target is testnet", () => {
      api = new ESpaceApi({ target: "testnet" });
      expect((api as unknown as TestableESpaceApi).baseUrl).toBe(
        "https://evmapi-testnet.confluxscan.io"
      );
    });

    it("should store API key when provided", () => {
      const apiKey = "test-api-key";
      api = new ESpaceApi({ apiKey });
      expect((api as unknown as TestableESpaceApi).apiKey).toBe(apiKey);
    });
  });

  describe("fetchApi", () => {
    beforeEach(() => {
      mockFetch.mockClear();
    });

    it("should call fetch with correct URL", async () => {
      const endpoint = "/test";
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ status: "1", result: { data: "test" } }),
      } as Response);

      await (api as unknown as TestableESpaceApi).fetchApi(endpoint);

      expect(mockFetch).toHaveBeenCalledWith("https://evmapi.confluxscan.io/test", { headers: {} });
    });

    it("should handle query parameters", async () => {
      const endpoint = "/test";
      const params = { param1: "value1", param2: "value2" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ status: "1", result: { data: "test" } }),
      } as Response);

      await (api as unknown as TestableESpaceApi).fetchApi(endpoint, params);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://evmapi.confluxscan.io/test?param1=value1&param2=value2",
        { headers: {} }
      );
    });

    it("should include API key in query parameters when provided", async () => {
      const apiKey = "test-api-key";
      api = new ESpaceApi({ apiKey });
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ status: "1", result: { data: "test" } }),
      } as Response);

      await (api as unknown as TestableESpaceApi).fetchApi("/test");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://evmapi.confluxscan.io/test?apiKey=test-api-key",
        { headers: {} }
      );
    });

    it("should throw error on non-OK response", async () => {
      const errorMessage = "Test error";
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: errorMessage,
      } as Response);

      await expect((api as unknown as TestableESpaceApi).fetchApi("/test")).rejects.toThrow(
        `HTTP error! status: 400`
      );
    });
  });

  describe("utility methods", () => {
    it("should get current timestamp", () => {
      const timestamp = (api as unknown as TestableESpaceApi).getCurrentTimestamp();
      expect(typeof timestamp).toBe("number");
      expect(timestamp).toBeLessThanOrEqual(Date.now() / 1000);
    });

    it("should get timestamp from 24 hours ago", () => {
      const timestamp = (api as unknown as TestableESpaceApi).get24HoursAgo();
      const current = (api as unknown as TestableESpaceApi).getCurrentTimestamp();
      expect(current - timestamp).toBeCloseTo(24 * 60 * 60, -2);
    });
  });
});
