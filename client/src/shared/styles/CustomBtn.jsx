import React from 'react';
import styled from 'styled-components';
import {neon, lightenDarken, colors, fly} from './styled';

const CustomBtn=(props)=>{
    const {fz,fw,bg,color,h,children}=props;

    const CustomBtn_ = styled.button`
    color:${color||"white"};
    background-color: ${bg||"#00ffff"};
    display:grid;
    justify-content:center;
    align-items:center;
    font-size: ${fz||"1rem"};
    font-weight: ${fw||"bold"};
    height:${h||""};
    ${fly}
    &:hover{
        background-color: ${lightenDarken(bg||"#00ffff",20)};
    }
`;

    return <CustomBtn_ 
            fz={fz}
            fw={fw}
            h={h}
            color={color}
            bg={bg}
            children={children}
            />
}



export default CustomBtn;