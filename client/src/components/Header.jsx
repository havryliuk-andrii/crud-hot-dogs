import React from 'react'

import '../css/Header.module.css'

import FilterForm from "./Filter";

const Header = (props) =>{
    return (
        <header>
            <div id="logo">
                CRUD-HOT-DOGS
            </div>
            <FilterForm />
        </header>
    )
}

export default Header