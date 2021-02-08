import React, { useEffect, useState, useRef } from 'react'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

import styles from './scroller-hook.scss'


const ScrollerHook = (props) => {

    const { pullUpCallback } = props

    //useState
    const [bScroll, setBScroll] = useState(null)
    const [scrollAction, setScrollAction] = useState(null);

    //useRef
    const wrapper = useRef();

    //useEffect
    useEffect(() => {
        if (bScroll == null && wrapper.current) {
            // console.log("useEffect - scrolling");
            // 注册插件
            BScroll.use(Pullup)

            let bs = new BScroll(wrapper.current, {
                click: true,
                scrollY: true,
                pullUpLoad: {
                    threshold: -70
                }
            })
            setBScroll(bs)

            bs.on('pullingUp', () => {
                setScrollAction(SCROLL_ACTION_PULL_UP);
                pullUpCallback();
            })
        } else {
            // console.log("scrolling",bScroll,scrollAction);
            if (bScroll) {
                switch (scrollAction) {
                    case SCROLL_ACTION_PULL_UP: {
                        bScroll.finishPullUp();
                        bScroll.refresh();
                        setScrollAction(null)
                        break;
                    }
                    case SCROLL_ACTION_PULL_DOWN: {
                        bScroll.finishPullDown();
                        bScroll.refresh();
                        setScrollAction(null);
                        break;
                    }
                    default:
                        bScroll.refresh();
                }
            }
        }
    })

    return (
        <div className={styles['scroller-container']} ref={el => wrapper.current = el}>
            <div className={styles['scroller-content']}>
                {props.children}
            </div>
        </div>
    )
}

export const SCROLL_ACTION_PULL_UP = "SCROLL_ACTION_PULL_UP"
export const SCROLL_ACTION_PULL_DOWN = "SCROLL_ACTION_PULL_DOWN"

export default React.memo( ScrollerHook )