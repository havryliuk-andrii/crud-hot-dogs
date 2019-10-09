import styled from 'styled-components'
import { colors } from '../styles/styled';

const TooltipInput = styled.div`
    position: relative;

    .tooltip{
        display: grid;
        position: absolute;
        grid-auto-flow:column;
        height:100%; 
        top:0;
        left:102%;
        &::before{
            content:'';
            border-right:1em solid ${colors.red};
            border-top:1em solid transparent;
            border-bottom:1em solid transparent;
        }
    }
    span{
        white-space: nowrap;
        font-size:1.1em;
        font-weight: bold;
        color:white;
        padding: 0 1.2em 0 .6em;
        background-color: ${colors.red}; 
        display:grid;
        justify-content:center;
        align-items:center;
    }
`;

export default TooltipInput;