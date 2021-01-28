import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getRecommendData } from '../../redux/action'
import { useSetTimeout } from '../../utils/hooks'

export default function RecommendMain() {

    const { data, count, loading } = useSelector(state => state.recommend);
    const dispatch = useDispatch();

    // const loadingRef = useRef(null);
    // const [loadingtate, setLoadState] = useState(false);
    // const dispatchGetRecommendData = () =>{
    //     loadingRef.current = window.setTimeout(() => {
    //             console.log("setLoadState(true)")
    //             setLoadState(true)
    //     }, 2000);
    //     dispatch(getRecommendData());
    // }

    const [recommandLoadState, recommandSetLoadState, recommandTimeoutFn, loadingRef] = useSetTimeout(2000);
    const [recommandLoadState1, recommandSetLoadState1, recommandTimeoutFn1, loadingRef1] = useSetTimeout(1000);
    const dispatchGetRecommendData = () => {
        recommandTimeoutFn();
        recommandTimeoutFn1();
        dispatch(getRecommendData());
    }

    useEffect(() => {
        dispatchGetRecommendData();
    }, [])

    if (loading === false && recommandLoadState != false) {
        recommandSetLoadState(false)
        clearTimeout(loadingRef.current);
    }
    if (loading === false && recommandLoadState1 != false) {
        recommandSetLoadState1(false)
        clearTimeout(loadingRef1.current);
    }


    return (
        <div>
            {
                (recommandLoadState) ?
                    <div>loading</div>
                    :
                    <div>RecommendMain</div>
            }
            {
                (recommandLoadState1) ?
                    <div>loading1</div>
                    :
                    <div>RecommendMain1</div>
            }

        </div>
    )
}