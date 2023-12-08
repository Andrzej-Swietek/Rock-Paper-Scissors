import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

// TODO: Transform below to factory or singleton. Performance consuming
export const useWindowSize = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: 0,
        height: 0,
    });
    function handleResize() {
        setWindowDimensions(getWindowDimensions());
    }
    useEffect(() => {

        setWindowDimensions(getWindowDimensions());
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        windowDimensions,
        isMobile: windowDimensions.width < 640,
    };
};
