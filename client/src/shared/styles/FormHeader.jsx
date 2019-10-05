import styled from 'styled-components'
import { colors } from '../styles/styled';

const FormHeader = styled.div`
    font-size :1.5rem;
    display: grid;
    align-items: center;
    gap: 1rem;
    grid-auto-flow: column;
    grid-template : 1fr / 1fr auto 1fr;
    font-weight: bold;

    color: ${colors.white};

    &::after,&::before{
        content:'';
        display: inline-block;
        height :.2rem;
        background: ${colors.white};
    }
`;

export default FormHeader;