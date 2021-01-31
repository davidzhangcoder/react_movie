import React from 'react'
import BScroll from '@better-scroll/core'

import styles from './SearchMain.scss'

export default class SearchMain extends React.PureComponent {

    constructor(props) {
        super(props)
        this.wrapper = null;
    }

    componentDidMount() {
        const wrapper = document.getElementById('wrapper')
        const scroll = new BScroll(wrapper, {
        //   scrollX: true,
          click: true,
          scrollY: true,
        })
    }

    render() {
        return (
            // <div className={wrapper}>
            //     <div className="content">

            //     </div>
            // </div>

            <div id="wrapper" className={styles.user_wrapper} ref={el => this.wrapper = el}>
                <div className={styles.user_content}>
                    <div className={styles.home_top}>
                        aa
                    </div>

                    <div className={styles.home_top}>
                        aa
                    </div>

                    <div className={styles.home_top}>
                        aa
                    </div>
                    <div className={styles.home_top}>
                        aa
                    </div>
                    <div className={styles.home_top}>
                        aa
                    </div>
                    <div className={styles.home_top}>
                        aa
                    </div>
                    <div className={styles.home_top}>
                        aa
                    </div>
                    <div className={styles.home_top}>
                        aa
                    </div>
                    <div className={styles.home_top}>
                        aa
                    </div>
                    <div className={styles.home_top}>
                        aabb
                    </div>
                    <div className={styles.home_top}>
                        aabb
                    </div>

                </div>
            </div>
        )
    }
}