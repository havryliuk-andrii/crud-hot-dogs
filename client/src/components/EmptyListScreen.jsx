import React from 'react'
import s from '../css/EmptyListScreen.module.css'
const EmptyListScreen = (props) =>{
    return (
        <div id={s.emptyListScreen}>
            <p id={s.emptyListString}>There are no hot dogs ... Create them!</p>
        </div>
    )
}

export default EmptyListScreen