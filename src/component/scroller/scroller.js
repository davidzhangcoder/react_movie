import React from 'react'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

import styles from './scroller.scss'

class Scroller extends React.PureComponent {
    constructor(props) {
        super(props)

        this.wrapper = React.createRef();
        this.bScroll = null;
        this.scrollAction = null;
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        if (this.bScroll == null && this.wrapper.current) {
            // console.log("useEffect - scrolling");
            const { pullUpCallback } = this.props;

            // 注册插件
            BScroll.use(Pullup)

            this.bScroll = new BScroll(this.wrapper.current, {
                click: false,
                scrollY: true,
                pullUpLoad: {
                    threshold: -70
                }
            })

            this.bScroll.on('pullingUp', () => {
                // console.log("SCROLL_ACTION_PULL_UP");
                this.setScrollAction(SCROLL_ACTION_PULL_UP);
                pullUpCallback();
            })
        }

        if (this.bScroll) {
            // console.log(this.scrollAction);
            switch (this.scrollAction) {
                case SCROLL_ACTION_PULL_UP: {
                    this.bScroll.finishPullUp();
                    this.bScroll.refresh();
                    this.setScrollAction(null)
                    break;
                }
                case SCROLL_ACTION_PULL_DOWN: {
                    this.bScroll.finishPullDown();
                    this.bScroll.refresh();
                    this.setScrollAction(null);
                    break;
                }
                default:
                    this.bScroll.refresh();
            }
        }
    }

    render() {
        // console.log("SearchMain - Scroll - render");
        return (
            <div className={styles['scroller-container']} ref={el => this.wrapper.current = el}>
                <div className={styles['scroller-content']}>
                    {this.props.children}
                </div>
            </div>
        )
    }

    setScrollAction = (scrollAction) => {
        this.scrollAction = scrollAction;
    }
}

export const SCROLL_ACTION_PULL_UP = "SCROLL_ACTION_PULL_UP"
export const SCROLL_ACTION_PULL_DOWN = "SCROLL_ACTION_PULL_DOWN"

export default Scroller;