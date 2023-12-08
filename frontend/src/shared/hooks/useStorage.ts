import {useEffect, useState} from "react";

export const useStorage = <T>( key: string, defaultValue: T): [T, (data: T)=> void ] => {
    const [state, setState] = useState<T>(defaultValue);

    useEffect(() => {
        ;(async () => {
            try {
                const value = sessionStorage.getItem(key)!
                await setData(JSON.parse(value) ?? defaultValue)
            } catch (e) {
                console.log(e);
            }
        })()
    }, [])

    const setData = async (value: T) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value))
            setState(value)
        } catch (e) {
            // ...
        }
    }
    return [state, setData]
}
