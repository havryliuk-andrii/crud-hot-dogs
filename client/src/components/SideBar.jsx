import React from 'react';
import { NavLink } from 'react-router-dom';


import s from '../css/SideBar.module.css'


const SideBar = (props) => {
    return (
        <section id={s.sideBarWr}>
            <div id={s.sideBar}>
                <NavLink to='/create'>
                    <button onClick={props.createHandle} id={s.create}>Create new hot dog</button>
                </NavLink>
                <NavLink to='/'>
                    <button onClick={props.readHandle} id={s.read}>show hot dogs</button>
                </NavLink>
                {/* <button onClick={props.updateHandle} id={s.update}>edit hot dog</button>
                <button onClick={props.deleteHandle} id={s.delete}>delete hot dog</button> */}
            </div>
        </section>
    )
}

export default SideBar