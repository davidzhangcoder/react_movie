import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HotList from './hot-list';
import { getRecommendData } from '../../redux/action';
import { useSetTimeout } from '../../utils/hooks';

export default function HotMain() {
    const { data, count, loading } = useSelector(state => state.recommend);
    const dispatch = useDispatch();

    const [recommandLoadState, recommandSetLoadState, recommandTimeoutFn, loadingRef] = useSetTimeout(500);
    const dispatchGetRecommendData = () => {
        recommandTimeoutFn();
        dispatch(getRecommendData());
    }

    useEffect(() => {
        dispatchGetRecommendData();
    }, [])

    if (loading === false && recommandLoadState != false) {
        recommandSetLoadState(false)
        clearTimeout(loadingRef.current);
    }

    console.log(data);
    if (recommandLoadState)
        return <div>loading</div>
    else
        return (
            <HotList data={data} ></HotList>

            // <ul className="recommend-skeleton">
            //     {chunkArr.map((k, v) => {
            //         return (
            //             <li className="sk-item" key={v + "skeleton"}>
            //                 <p className="square"></p>
            //                 <p className="line"></p>
            //             </li>
            //         );
            //     })}
            // </ul>
        )
}