import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './loading.scss'

class Loading extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

        return (
            <div className={styles['loading-contrainer']} onClick={this.touchMove} onTouchStart={this.touchMove}>
                <span className={styles['loading-content']}>
                    <Spin indicator={antIcon} size="large" tip="Loading"/>
                </span>
            </div>
        )
    }

    touchMove = (e) => {
        console.log("touchMove");
        console.log(e);
        e.preventDefault();
    }
}

export default Loading