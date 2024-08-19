/**
 * Ratelimiting extension by ActionSchema. Can be applied globally, per plan, per tag, or per operation
 */
export interface Ratelimit {
  limit?: number;
  interval?: "second" | "minute";
  [k: string]: unknown;
}
