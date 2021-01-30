import React from 'react'

import styles from './hot-list.scss'

const HotList = ({ data }) => {
    // let test = new Array();
    // test = data.slice(0,1);
    return (
        <div className={styles.container}>
            {
                data.map((e, i) => {
                    return (
                        <div className={styles["content-outter"]} key={i}>
                            <div className={styles.content}>
                                <div className={styles.image}>
                                    {/* <span></span> */}
                                    {/* <span style={{background: "url("+e.Poster+")"}}></span> */}
                                    <span style={{ backgroundImage: ["url(", e.Poster, ")"].join(" ") }}></span>
                                </div>
                            </div>
                            <h3>{e.Title}</h3>
                            <p>{e.Year}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default HotList;