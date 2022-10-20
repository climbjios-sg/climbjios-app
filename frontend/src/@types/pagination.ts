export type PaginationResponseMetadata = {
  isLastPage: boolean;
  // Page size for each page
  // Note: Page size is the ceiling of the number of items in each request
  // There can be < pageSize number of items in the request
  pageSize: number;
  currentPage: number;
  // Total count of all items in the database
  totalCount: number;
  // Total number of pages in the database
  totalPages: number;
};

export type PaginationRequestData = {
  // Hard limit to the number of objects fetched back
  limit?: number;
  // Page number, starts from 0
  page: number;
  // Size of each page
  pageSize: number;
};
