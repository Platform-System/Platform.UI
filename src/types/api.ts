export interface Result<T> {
  success: boolean;
  data: T;
  statusCode: number;
  message?: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}
