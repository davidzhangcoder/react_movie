import React, { useEffect, useRef } from 'react'
import {
    CloseOutlined
  } from '@ant-design/icons';


import styles from './search-box.scss'

const SearchBox = ( {selectedSearchKey, setSearchKey} ) => {
    // console.log("render SearchBox")

    const searchBoxRef = useRef();

    const doSearch = () => {
        console.log(searchBoxRef.current.value)
        const searchKey = searchBoxRef.current.value;
        setSearchKey(searchKey);
    }

    // useEffect(()=>{
    //     searchBoxRef.current.value=selectedSearchKey;
    // }
    // ,[selectedSearchKey])

    return (
        <div className={styles.header}>

            {/* input, img, iframe不支持伪元素，如before, after */}
            <input type="text" className={styles['header-left']} id="search-box" ref={searchBoxRef}/>

            <CloseOutlined className={styles['close-outlined']}/>

            {/* <div className={styles['header-left']}></div> */}

            <div className={styles['header-right']}>
                <a onClick={doSearch}>查找</a>
            </div>
        </div>
    )
}

export default React.memo(SearchBox);