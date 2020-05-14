import React from 'react'
import classes from './Backdrop.module.css';

const Backdrop = ({ show, clicked}) => {
    return (
        <div onClick={clicked}>
            {show ? <div className={classes.Backdrop} ></div> : null}
        </div>
    )
}

export default Backdrop