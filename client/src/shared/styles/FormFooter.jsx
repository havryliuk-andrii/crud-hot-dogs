import React from 'react';
import styled from 'styled-components'
import { colors } from './styled';

const FormFooterContent = styled.div`
    display: grid;
    grid-auto-flow: column;
    gap : 2rem;
`;

const Line = styled.div`
    height: .2rem;
    background-color: #fff;
    margin-bottom:1em;
`;

const FormFooter=(props)=>{
    return (
        <div>
            <Line />
            <FormFooterContent>
                {props.children}
            </FormFooterContent>
        </div>
    )
}

export default FormFooter;