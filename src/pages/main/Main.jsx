import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router-dom'

import styles from './main.scss'
import RecommendMain from '../recommend/RecommendMain'
import HotMain from '../hot/HotMain'
import SearchMain from '../search/SearchMain'

const menu = [
    { name: '推荐音乐', key: "/recommend" },
    { name: '热歌榜', key: "/hot" },
    { name: '搜索', key: "/search" },
]

export default function Main() {

    const onClickMenuItem = useCallback( (e, index) => {
         e.currentTarget.parentNode.children[0].children[1].style.left = index * 70 + 8 + 'px';
    },[]);

    return (
        <React.Fragment>
            <div id={styles.header}>
                <div className={styles['header-list']}>
                    {
                        menu.map((menuItem, index) => {
                            if (index === 0)
                                return (
                                    <div key={index} onClick={(e) => onClickMenuItem(e, index)}>
                                        <Link to={menuItem.key}>
                                            <span>{menuItem.name}</span>
                                        </Link>
                                        <div id={styles.selectednav}
                                            style={{ left: index * 70 + 8 + 'px' }}
                                        ></div>
                                    </div>
                                )
                            else
                                return (
                                    <div key={index} onClick={(e) => onClickMenuItem(e, index)}>
                                        <Link to={menuItem.key}>
                                            <span>{menuItem.name}</span>
                                        </Link>
                                    </div>
                                )
                        }
                        )
                    }
                </div>
            </div>
            <div id={styles.content} >
                <Route path="/recommend" component={RecommendMain} ></Route>
                <Route path="/hot" component={HotMain} ></Route>
                <Route path="/search" component={SearchMain} ></Route>
                <Redirect to="/recommend" />
            </div>
        </React.Fragment>
    )
}