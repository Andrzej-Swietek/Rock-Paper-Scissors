import { useState, useEffect, MutableRefObject } from 'react';

export const useOnScreen = (ref:  MutableRefObject<any>) => {
    const [isIntersecting, setIntersecting] = useState<boolean>(false);
    useEffect(() => {
        const observer: IntersectionObserver = new IntersectionObserver(
            ([entry]) => setIntersecting(entry.isIntersecting)
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
    }, [])
    return isIntersecting;
}
