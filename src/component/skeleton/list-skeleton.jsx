import React, { Fragment } from 'react'
import { Skeleton } from 'antd';

import styles from './list-skeleton.scss'

class ListSkeleton extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <div className={styles['list-skeleton-item']}>
                    <Skeleton.Image active={true} className={styles['list-skeleton-item-image']} />
                    <div>
                        <Skeleton paragraph={{ rows: 3 }} active={true} />
                    </div>
                </div>

                <div className={styles['list-skeleton-item']}>
                    <Skeleton.Image active={true} className={styles['list-skeleton-item-image']} />
                    <div>
                        <Skeleton paragraph={{ rows: 3 }} active={true} />
                    </div>
                </div>

                <div className={styles['list-skeleton-item']}>
                    <Skeleton.Image active={true} className={styles['list-skeleton-item-image']} />
                    <div>
                        <Skeleton paragraph={{ rows: 3 }} active={true} />
                    </div>
                </div>

                <div className={styles['list-skeleton-item']}>
                    <Skeleton.Image active={true} className={styles['list-skeleton-item-image']} />
                    <div>
                        <Skeleton paragraph={{ rows: 3 }} active={true} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ListSkeleton;