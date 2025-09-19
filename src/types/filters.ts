export type Order = "asc" | "desc";

export interface BaseFilters {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  order?: Order;
}
