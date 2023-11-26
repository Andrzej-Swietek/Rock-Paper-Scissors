import { useCallback, useEffect, useState } from "react"

type AsyncFunction<T> = () => Promise<T>;

interface AsyncHookResult<T> {
    loading: boolean;
    error?: any;
    value?: T;
}

export default function useAsync<T>(callback: AsyncFunction<T>, dependencies: any[] = []): AsyncHookResult<T> {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>();
    const [value, setValue] = useState<T | undefined>();

    const callbackMemoized = useCallback(() => {
        setLoading(true);
        setError(undefined);
        setValue(undefined);
        callback()
            .then((result) => setValue(result))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, dependencies);

    useEffect(() => {
        callbackMemoized();
    }, [callbackMemoized]);

    return { loading, error, value };
}