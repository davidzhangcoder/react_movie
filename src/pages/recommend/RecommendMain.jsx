import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './css/RecommendMain.scss'
import { getRecommendData, cleanRecommandData } from '../../redux/action'
import { useSetTimeout } from '../../utils/hooks'
import RecommendItem from './RecommendItem';

export default function RecommendMain() {

    const { data, count, loading } = useSelector(state => state.recommend);
    const dispatch = useDispatch();

    const [page,setPage] = useState(1);

    const [recommandLoadState, recommandSetLoadState, recommandTimeoutFn, loadingRef] = useSetTimeout(500);
    const dispatchGetRecommendData = (page) => {
        recommandTimeoutFn();
        dispatch(getRecommendData(page));
    }

    useEffect(() => {
        dispatchGetRecommendData(page);
    }, [page])

    useEffect(
        () => {
            return ()=>{
                console.log("need to clean1");
                dispatch(cleanRecommandData())
                clearTimeout(loadingRef.current);
            }    
        }
    ,[])

    if (loading === false && recommandLoadState != false) {
        recommandSetLoadState(false)
        clearTimeout(loadingRef.current);
    }

    // console.log(data);
    if (recommandLoadState)
        return <div>loading</div>
    else
        return (
            <div className={styles['recommend-item-box']}>
                <button onClick={()=> {setPage((pre)=>pre+1)}}>test</button>
                {
                    data.map((item, index) => {
                        return <RecommendItem key={index} poster={item.Poster} title={item.Title} year={item.Year}></RecommendItem>
                    })
                }
            </div>

        )
}