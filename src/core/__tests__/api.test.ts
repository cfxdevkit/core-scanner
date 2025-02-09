import { CoreApi } from "../api";
import { jest } from "@jest/globals";

// Type for accessing protected members in tests
type TestableCoreApi = {
  baseUrl: string;
  apiKey?: string;
  fetchApi<T>(endpoint: string, params?: Record<string, string>): Promise<T>;
  getCurrentTimestamp(): number;
  get24HoursAgo(): number;
};

describe("CoreApi", () => {
  let api: CoreApi;
  const mockFetch: jest.Mock = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ code: 0, message: "success", data: {} }),
    } as Response)
  );

  beforeEach(() => {
    api = new CoreApi({ target: "mainnet" });
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  test("should make API request with correct parameters", async () => {
    const endpoint = "/test";
    const params = { param1: "value1" };

    await api["fetchApi"](endpoint, params);

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(endpoint), expect.any(Object));
  });

  describe("constructor", () => {
    it("should initialize with default mainnet URL", () => {
      expect((api as unknown as TestableCoreApi).baseUrl).toBe("https://api.confluxscan.io");
    });

    it("should initialize with testnet URL when target is testnet", () => {
      api = new CoreApi({ target: "testnet" });
      expect((api as unknown as TestableCoreApi).baseUrl).toBe(
        "https://api-testnet.confluxscan.io"
      );
    });

    it("should store API key when provided", () => {
      const apiKey = "test-api-key";
      api = new CoreApi({ apiKey });
      expect((api as unknown as TestableCoreApi).apiKey).toBe(apiKey);
    });
  });

  describe("fetchApi", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should call fetch with correct URL", async () => {
      const endpoint = "/test";
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              code: 0,
              message: "success",
              data: { test: "data" },
            }),
        } as Response)
      );

      await (api as unknown as TestableCoreApi).fetchApi(endpoint);

      expect(mockFetch).toHaveBeenCalledWith("https://api.confluxscan.io/test", {
        headers: {},
      });
    });

    it("should handle query parameters", async () => {
      const endpoint = "/test";
      const params = { param1: "value1", param2: "value2" };
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              code: 0,
              message: "success",
              data: { test: "data" },
            }),
        } as Response)
      );

      await (api as unknown as TestableCoreApi).fetchApi(endpoint, params);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.confluxscan.io/test?param1=value1&param2=value2",
        { headers: {} }
      );
    });

    it("should include API key in query parameters when provided", async () => {
      const apiKey = "test-api-key";
      api = new CoreApi({ apiKey });
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              code: 0,
              message: "success",
              data: { test: "data" },
            }),
        } as Response)
      );

      await (api as unknown as TestableCoreApi).fetchApi("/test");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.confluxscan.io/test?apiKey=test-api-key",
        { headers: {} }
      );
    });

    it("should throw error on non-OK response", async () => {
      const errorMessage = "Test error";
      mockFetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: errorMessage,
        } as Response)
      );

      await expect((api as unknown as TestableCoreApi).fetchApi("/test")).rejects.toThrow(
        `HTTP error! status: 400`
      );
    });
  });

  describe("utility methods", () => {
    it("should get current timestamp", () => {
      const timestamp = (api as unknown as TestableCoreApi).getCurrentTimestamp();
      expect(typeof timestamp).toBe("number");
      expect(timestamp).toBeLessThanOrEqual(Date.now() / 1000);
    });

    it("should get timestamp from 24 hours ago", () => {
      const timestamp = (api as unknown as TestableCoreApi).get24HoursAgo();
      const current = (api as unknown as TestableCoreApi).getCurrentTimestamp();
      expect(current - timestamp).toBeCloseTo(24 * 60 * 60, -2);
    });
  });
});
