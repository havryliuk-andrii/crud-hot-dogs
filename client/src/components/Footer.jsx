import React from 'react'


import s from '../css/Footer.module.css'



const Footer = (props) =>{
    return (
        <footer>
          <div id={s.siteCopyright}>CRUD-HOT-DOGS © 2019</div>
          <div id={s.authorInfo}>
              <div id="gmail"><span>Gmail</span> : havryliuk.andrii.00@gmail.com</div>
              <div id="github"><span>GitHub </span>: <a href="https://github.com/havryliuk-andrii">https://github.com/havryliuk-andrii</a></div>
          </div>
        </footer>
    )
}

export default Footer