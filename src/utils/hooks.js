import React, { useEffect, useRef, useState } from 'react'

export function useSetTimeout(time) {
    const [loadState, setLoadState] = useState(false);
    const loadingRef = useRef(null);

    const fn = () => {
        loadingRef.current = window.setTimeout(() => {
            setLoadState(true)
        }, time);
    }

    useEffect(
        ()=>{
            return ()=>{
                if(loadingRef1.current) {
                    clearTimeout(loadingRef1.current);
                }
            }
        }
    ,[])

    return [loadState, setLoadState, fn, loadingRef];
}