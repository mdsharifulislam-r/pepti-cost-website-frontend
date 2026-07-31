export interface ApiResponse<T> {
    success: boolean;
    message: string;
    pagination: Pagination;
    data: T;
}

export interface Pagination {
    total: number;
    limit: number;
    page: number;
    totalPage: number;
}
