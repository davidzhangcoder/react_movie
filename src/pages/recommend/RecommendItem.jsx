import React from 'react'

import styles from './css/RecommendItem.scss'

const RecommendItem = ({title,year,poster}) =>{
    return (
        <div className={styles['recommend-item']}>
            <img src={poster}></img>
            {/* <img src="../../images/shop_back_svg.svg"></img> */}
            <div>
                <span>{title}</span>
                <p>
                {year}
                </p>
                <div className={styles['recommend-ite-message']}><span>你可能感兴趣</span></div>
            </div>
            <div><span>想看</span></div>
        </div>
    )
}

export default React.memo(RecommendItem);