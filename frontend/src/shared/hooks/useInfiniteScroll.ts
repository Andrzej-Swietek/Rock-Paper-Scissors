import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

export type UseInfiniteScrollOutput<T> = { loading: boolean; error: boolean; data: T[]; hasMore: boolean };

export const useInfiniteScroll = <T extends unknown>(
    query: string,
    pageNumber: number,
    fetchUrl: string,
    fetchParams?: object,
): UseInfiniteScrollOutput<T> => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<T[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const url: string = useMemo(() => fetchUrl, [fetchUrl]);

    useEffect(() => {
        setData([]);
    }, [query]);

    useEffect(() => {
        let cancel = () => {};
        (async () => {
            setLoading(true);
            setError(false);
            try {
                const res = await axios.get<ApiResponse<T[]>>(url, {
                    params: { ...fetchParams },
                    cancelToken: new axios.CancelToken((c) => (cancel = c)),
                });
                console.log(res.data);
                // @ts-ignore
                setData((prev: T): T[] => [...new Set<T>([...prev, ...res.data.data])]);
                setHasMore(res.data.data.length > 0);
                setLoading(false);
            } catch (e) {
                console.log(e);
                if (axios.isCancel(e)) return;
                setError(true);
            }
        })();
        return () => cancel();
    }, [query, pageNumber]);

    return { loading, error, data, hasMore };
};