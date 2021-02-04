import React, { useEffect, useRef } from 'react'

import './search-box.scss'

const SearchBox = ( {selectedSearchKey, setSearchKey} ) => {
    // console.log("render SearchBox")

    const searchBoxRef = useRef();

    const doSearch = () => {
        console.log(searchBoxRef.current.value)
        const searchKey = searchBoxRef.current.value;
        setSearchKey(searchKey);
    }

    useEffect(()=>{
        searchBoxRef.current.value=selectedSearchKey;
    }
    ,[selectedSearchKey])

    return (
        <div className="header">
            <input type="text" className="header-left" id="search-box" ref={searchBoxRef}/>

            <div className="header-right">
                <a onClick={doSearch}>查找</a>
            </div>
        </div>
    )
}

export default React.memo(SearchBox);