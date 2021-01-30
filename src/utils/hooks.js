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
                if(loadingRef.current) {
                    clearTimeout(loadingRef.current);
                }
            }
        }
    ,[])

    return [loadState, setLoadState, fn, loadingRef];
}