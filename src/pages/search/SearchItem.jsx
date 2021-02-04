import React from 'react'

import styles from './SearchItem.scss'

const SearchItem = ({title,year,poster}) =>{
    return (
        <div className={styles['recommend-item']}>
            <img src={poster}></img>
            <div>
                <span>{title}</span>
                <p>
                {year}
                </p>
                <div className={styles['recommend-ite-message']}><span>你可能感兴趣 Search</span></div>
            </div>
            <div><span>想看</span></div>
        </div>
    )
}

export default React.memo(SearchItem);