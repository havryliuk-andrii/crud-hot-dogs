import React from 'react'
import styled from 'styled-components'
import s from '../css/Footer.module.css'

const Link = styled.a`
position: relative;
&::after{
    display: block;
    position: absolute;
        content:"";
        height: 1px;
        width: 0;
        transition: all .4s;
        background: #88D498;
}
&:hover::after{
    width: 100%;
}
`

const Footer = (props) =>{
    return (
        <footer>
          <div id={s.siteCopyright}>Hot Dogs Manager © 2019</div>
          <div id={s.authorInfo}>
              <div id="gmail"><span>Gmail</span> : havryliuk.andrii.00@gmail.com</div>
              <div id="github"><span>GitHub </span>: <Link href="https://github.com/havryliuk-andrii">https://github.com/havryliuk-andrii</Link></div>
          </div>
        </footer>
    )
}

export default Footer