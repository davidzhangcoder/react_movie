import React, { useEffect } from 'react'
import BScroll from '@better-scroll/core'

import styles from './SearchMain.scss'

//way1 - class实现 working
// export default class SearchMain extends React.PureComponent {

//     constructor(props) {
//         super(props)
//         this.wrapper = null;
//     }

//     componentDidMount() {
//         // const wrapper = document.getElementById('wrapper')
//         const scroll = new BScroll(this.wrapper, {
//             //   scrollX: true,
//             click: true,
//             scrollY: true,
//         })
//     }

//     render() {
//         const arr = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2]
//         return (
//             // <div className={wrapper}>
//             //     <div className="content">

//             //     </div>
//             // </div>

//             <div id="wrapper" className={styles.user_wrapper} ref={el => this.wrapper = el}>
//                 <div className={styles.user_content}>
//                     {
//                         arr.map((e, i) => {
//                             return (
//                                 <div className={styles.home_top}>
//                                     {e}
//                                 </div>)
//                         })
//                     }
//                 </div>
//             </div>
//         )
//     }
// }

//way2 - hook实现 working
const SearchMain = () => {
    let wrapper =null;
    useEffect(()=>{
        const scroll = new BScroll(wrapper, {
            //   scrollX: true,
            click: true,
            scrollY: true,
        })
    },[])
    const arr = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2]
    return (
        <div id="wrapper" className={styles.user_wrapper} ref={el => wrapper = el}>
            <div className={styles.user_content}>
                {
                    arr.map((e, i) => {
                        return (
                            <div className={styles.home_top}>
                                {e}
                            </div>)
                    })
                }
            </div>
        </div>
    )
}

export default SearchMain;