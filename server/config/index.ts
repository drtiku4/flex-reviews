export const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/flexliving",
  hostaway: {
    accountId: process.env.HOSTAWAY_ACCOUNT_ID || "",
    apiKey: process.env.HOSTAWAY_API_KEY || "",
    url: process.env.HOSTAWAY_API_URL || ""
  }
};
