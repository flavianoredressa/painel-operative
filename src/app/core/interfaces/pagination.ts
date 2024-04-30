export interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface PaginationResponse<T> {
  pagination: Pagination;
  data: T[];
}
