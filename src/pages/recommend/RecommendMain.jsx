import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

import styles from './css/RecommendMain.scss'
import { getRecommendData, cleanRecommandData } from '../../redux/action'
import { useSetTimeout } from '../../utils/hooks'
import RecommendItem from './RecommendItem';
import Scroller from '../../component/scroller/scroller-hook'

export default function RecommendMain() {

    //redux
    const { data, count, loading } = useSelector(state => state.recommend);
    const dispatch = useDispatch();

    //useState
    const [page, setPage] = useState(1);
    const [bScroll, setBScroll] = useState();

    //useRef
    let wrapper = useRef();
    const startY = useRef(0)

    //useEffect
    useEffect(() => {
        dispatchGetRecommendData(page
            // , () => {
            //     if (bScroll) {
            //         bScroll.finishPullUp();
            //         bScroll.refresh()
            //     }
            // }
        );
    }, [page])

    useEffect(
        () => {
            return () => {
                // console.log("need to clean1");
                dispatch(cleanRecommandData())
                clearTimeout(loadingRef.current);
            }
        }
        , [])

    // //放在useEffect(()=>{})是因为每次render后要用新的wrapper.current即ref,来生成BScroll
    // useEffect(
    //     () => {
    //         // 注册插件
    //         BScroll.use(Pullup)

    //         //console.log(wrapper.current)
    //         if (wrapper.current) {
    //             let bs = new BScroll(wrapper.current, {
    //                 // probeType: 3,
    //                 // pullUpLoad: true
    //                 click: true,
    //                 scrollY: true,
    //                 // startY: startY.current,
    //                 pullUpLoad: {
    //                     threshold: -70
    //                 }
    //             })

    //             setBScroll(bs);

    //             bs.on('pullingUp', () => {
    //                 // startY.current = bs.startY;
    //                 setPage((pre) => pre + 1)

    //                 // dispatchGetRecommendData(page, () => {
    //                 //     bs.finishPullUp();
    //                 //     bs.refresh()
    //                 // })
    //             })
    //         }
    //     }
    //     , [])

    // useEffect(() => {
    //     if (bScroll) {
    //         bScroll.refresh();
    //     }
    // });


    //dispatch
    const [recommandLoadState, recommandSetLoadState, recommandTimeoutFn, loadingRef] = useSetTimeout(500);
    const dispatchGetRecommendData = (page, callback) => {
        recommandTimeoutFn();
        dispatch(getRecommendData(page, callback));
    }

    if (loading === false && recommandLoadState != false) {
        recommandSetLoadState(false)
        clearTimeout(loadingRef.current);
    }

    const arr = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2]
    // console.log(data);
    // if (recommandLoadState)
    //     return <div>loading</div>
    // else
    return (

        <Scroller pullUpCallback={() => {
            setPage((pre) => pre + 1)
            }}>
            {
                data.map((item, index) => {
                    return <RecommendItem key={index} poster={item.Poster} title={item.Title} year={item.Year}></RecommendItem>
                })
            }

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
        </Scroller>

        //两种方法都可以 - ref
        //ref={el => wrapper.current = el}
        //ref={wrapper}
        // <div className={styles['recommend-item-box']} ref={el => wrapper.current = el}>
        //     {/* <button onClick={()=> {setPage((pre)=>pre+1)}}>test</button> */}
        //     <div className={styles['recommend-item-box-content']}>
        //         {
        //             data.map((item, index) => {
        //                 return <RecommendItem key={index} poster={item.Poster} title={item.Title} year={item.Year}></RecommendItem>
        //             })
        //         }

        //         <div className={styles['pullup-tips']}>
        //             {
        //                 loading ? (
        //                     <div className={styles['after-trigger']}>
        //                         <span className={styles['pullup-txt']}>Loading...</span>
        //                     </div>) : (
        //                         <div className={styles['before-trigger']}>
        //                             <span className={styles['pullup-txt']}>Pull up and load more</span>
        //                         </div>)
        //             }
        //         </div>

        //     </div>
        // </div>

        //两种方法都可以 - ref
        //ref={el => wrapper.current = el}
        //ref={wrapper}
        //测试better-scroll的代码
        // <div id="wrapper" className={styles.user_wrapper} ref={el => wrapper.current = el}>
        //     <div className={styles.user_content}>
        //         {
        //             arr.map((e, i) => {
        //                 return (
        //                     <div className={styles.home_top} key={i}>
        //                         {e}
        //                     </div>)
        //             })
        //         }
        //     </div>
        // </div>

    )
}