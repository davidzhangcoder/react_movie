import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

import HotList from './hot-list';
import { getHotData, cleanHotData } from '../../redux/action';
import { useSetTimeout } from '../../utils/hooks';
import styles from './HotMain.scss'

export default function HotMain() { 

    //redux
    const { data, count, loading } = useSelector(state => state.hot);
    const dispatch = useDispatch();

    //useState
    const [page, setPage] = useState(1);
    const [bScroll, setBScroll] = useState(null);

    //useRef
    const wrapper = useRef();

    //dispatch
    const [recommandLoadState, recommandSetLoadState, recommandTimeoutFn, loadingRef] = useSetTimeout(500);
    const dispatchGetHotData = (page, callback) => {
        recommandTimeoutFn();
        dispatch(getHotData(page, callback));
    }

    //useEffect
    useEffect(() => {
        dispatchGetHotData(page, () => {
            if (bScroll) {
                bScroll.finishPullUp();
                bScroll.refresh()
            }
        }
        );
    }, [page])

    useEffect(() => {
        return () => {
            // console.log("need to clean2");
            dispatch(cleanHotData())
            clearTimeout(loadingRef.current);
        }
    }, [])

    useEffect(
        () => {
            // 注册插件
            BScroll.use(Pullup)

            //console.log(wrapper.current)
            if (wrapper.current) {
                let bs = new BScroll(wrapper.current, {
                    // probeType: 3,
                    // pullUpLoad: true
                    click: true,
                    scrollY: true,
                    // startY: startY.current,
                    pullUpLoad: {
                        threshold: -70
                    }
                })

                setBScroll(bs);

                bs.on('pullingUp', () => {
                    // startY.current = bs.startY;
                    setPage((pre) => pre + 1)
                })
            }
        }
        , [])

    useEffect(() => {
        if (bScroll)
            bScroll.refresh();
    })

    if (loading === false && recommandLoadState != false) {
        recommandSetLoadState(false)
        clearTimeout(loadingRef.current);
    }

    // console.log(data);
    // if (recommandLoadState)
    //     return <div>loading</div>
    // else
        return (
            <div className={styles['hot-item-box']} ref={el => wrapper.current = el}>
                <div className={styles['hot-item-box-content']}>

                    <HotList data={data} ></HotList>

                    <div className={styles['pullup-tips']}>
                        {
                            loading ? (
                                <div className={styles['after-trigger']}>
                                    <span className={styles['pullup-txt']}>Loading...</span>
                                </div>) : (
                                    <div className={styles['before-trigger']}>
                                        <span className={styles['pullup-txt']}>Pull up and load more</span>
                                    </div>)
                        }
                    </div>

                </div>
            </div >



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