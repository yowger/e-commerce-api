export interface Pagination {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
}

export interface PaginatedResult<T> {
    data: T
    pagination: Pagination
}

