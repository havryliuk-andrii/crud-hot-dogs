import React from 'react'
import preloader from './../assets/preloader.svg';
import s from '../css/Preloader.module.css'

const Preloader = (props) =>{
    return (
        <div className={s.preloader+" dd"}>
          <img src={preloader} alt="data is loading..."/>
        </div>
    )
}

export default Preloader