type WithFile<T> = T & { file: File|null }

type DataLinks = {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
}
type DataMeta = {
    current_page: number;
    from: number;
    last_page: number;
    links: object[];
    path: string;
    per_page: number;
    to: number;
    total: number
}

interface Paginated<T> {
    data: Array<T>,
    meta: DataMeta,
    links: DataLinks
}


interface ApiResponse<T> extends Pagination{
    data: T,
}

interface Pagination {
    links: {
        first: string;
        last: string;
        prev?: string;
        next?: string;
    },
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links:  { url?: string, label: string, active: boolean }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    }
}

interface ApiError<T extends object> {
    message?: string;
    errors?: Record<keyof T, string[]>
}

interface BasicResponse {
    success: boolean;
    message: string;
}

interface BasicDataResponse<T extends object, U extends object> {
    data: T | null;
    error: U | null;
    success: boolean;
}