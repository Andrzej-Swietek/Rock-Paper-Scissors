import {useEffect, useRef} from "react";

export const useUpdateEffect = (callback: Function, deps: any[]) => {
    const firstRenderRef = useRef(true);

    useEffect( ()=> {
        if ( firstRenderRef.current ) {
            firstRenderRef.current = false;
            return;
        }
        else {
            return callback();
        }
    } ,[...deps])
}
