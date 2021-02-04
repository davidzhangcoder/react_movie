import React, { useEffect } from 'react'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import { connect } from 'react-redux'

import styles from './SearchMain.scss'
import { searchMovie, cleanSearchMovie } from '../../redux/action'
import SearchItem from './SearchItem'
import SearchBox from './search-box'

class SearchMain extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
        }

        BScroll.use(Pullup)
        this.wrapper = React.createRef();
        this.bs = null;
    }

    componentDidMount() {
        this.props.searchMovie(this.state.page, () => {
            this.resetBs();
        })
    }

    componentDidUpdate() {
        if (this.bs == null && this.wrapper.current) {
            this.bs = new BScroll(this.wrapper.current, {
                // probeType: 3,
                // pullUpLoad: true
                click: true,
                scrollY: true,
                // startY: startY.current,
                pullUpLoad: {
                    threshold: -70
                }
            })
            this.bs.on('pullingUp', () => {
                this.setState((state, props) => ({ page: state.page + 1 }), () => {
                    this.props.searchMovie(this.state.page, () => {
                        this.resetBs();
                    })
                })
            })

        }

        if (this.bs)
            this.bs.refresh()
    }

    componentWillUnmount() {
        this.props.cleanSearchMovie()
    }

    render() {
        const data = this.props.searchResult;
        const count = this.props.count;
        const loading = this.props.loading;

        return (
            <div id={styles['search-page-content']}>

                    <SearchBox selectedSearchKey="test"></SearchBox>

                    <div className={styles['search-item-box']} ref={el => this.wrapper.current = el}>
                        <div className={styles['search-item-box-content']}>

                            {
                                data.map((item, index) => {
                                    return <SearchItem key={index} poster={item.Poster} title={item.Title} year={item.Year}></SearchItem>
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

                        </div>
                    </div >


            </div>
        )
    }

    resetBs = () => {
        if (this.bs) {
            this.bs.finishPullUp();
            this.bs.refresh()
        }
    }
}

//way1 - class实现Scroll working
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

//way2 - hook实现Scroll working
// const SearchMain = () => {
//     let wrapper =null;
//     useEffect(()=>{
//         const scroll = new BScroll(wrapper, {
//             //   scrollX: true,
//             click: true,
//             scrollY: true,
//         })
//     },[])
//     const arr = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2]
//     return (
//         <div id="wrapper" className={styles.user_wrapper} ref={el => wrapper = el}>
//             <div className={styles.user_content}>
//                 {
//                     arr.map((e, i) => {
//                         return (
//                             <div className={styles.home_top}>
//                                 {e}
//                             </div>)
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

const mapProps = state => ({
    searchResult: state.search.data,
    count: state.search.count,
    loading: state.search.loading
})

const mapdispatch = {
    searchMovie,
    cleanSearchMovie
}

export default connect(mapProps, mapdispatch)(SearchMain);