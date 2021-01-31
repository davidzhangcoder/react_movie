import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

import styles from './css/RecommendMain.scss'
import { getRecommendData, cleanRecommandData } from '../../redux/action'
import { useSetTimeout } from '../../utils/hooks'
import RecommendItem from './RecommendItem';

export default function RecommendMain() {

    //redux
    const { data, count, loading } = useSelector(state => state.recommend);
    const dispatch = useDispatch();

    //useState
    const [page, setPage] = useState(1);

    //useRef
    const wrapper = useRef();

    //useEffect
    useEffect(() => {
        dispatchGetRecommendData(page);
    }, [page])

    useEffect(
        () => {
            // 注册插件
            // BScroll.use(Pullup)

            let bs = new BScroll(wrapper.current, {
                // probeType: 3,
                // pullUpLoad: true
            })

            return () => {
                // console.log("need to clean1");
                dispatch(cleanRecommandData())
                clearTimeout(loadingRef.current);
            }
        }
        , [])


    //dispatch
    const [recommandLoadState, recommandSetLoadState, recommandTimeoutFn, loadingRef] = useSetTimeout(500);
    const dispatchGetRecommendData = (page) => {
        recommandTimeoutFn();
        dispatch(getRecommendData(page));
    }

    if (loading === false && recommandLoadState != false) {
        recommandSetLoadState(false)
        clearTimeout(loadingRef.current);
    }

    // console.log(data);
    if (recommandLoadState)
        return <div>loading</div>
    else
        return (
            <div className={styles['recommend-item-box']} ref={wrapper}>
                {/* <button onClick={()=> {setPage((pre)=>pre+1)}}>test</button> */}
                <div className={styles.content}>
                    {
                        data.map((item, index) => {
                            return <RecommendItem key={index} poster={item.Poster} title={item.Title} year={item.Year}></RecommendItem>
                        })
                    }
                </div>
            </div>

        )
}