export type RateLimitInfo = {
  limit: string; // e.g. "5 per 1 minute"
  remaining: number;
  reset: string; // ISO string
};
