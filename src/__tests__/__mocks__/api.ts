export const mockApiResponse = {
  code: 0,
  message: "success",
  data: {
    list: [
      {
        statTime: 1234567890,
        count: "100",
        address: "cfx:type.user.address",
      },
    ],
  },
};

export const mockContractABI = {
  code: 0,
  message: "success",
  data: {
    abi: "[]",
  },
};

export const mockSupplyStats = {
  code: 0,
  message: "success",
  data: {
    totalSupply: "1000000000000000000",
    totalCirculating: "900000000000000000",
    totalStaking: "100000000000000000",
    totalCollateral: "50000000000000000",
    totalEspaceTokens: "25000000000000000",
    totalIssued: "1100000000000000000",
    nullAddressBalance: "0",
    twoYearUnlockBalance: "0",
    fourYearUnlockBalance: "0",
  },
};
