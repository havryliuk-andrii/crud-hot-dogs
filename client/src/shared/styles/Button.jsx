import styled from 'styled-components'
import { colors, lightenDarken, fly } from './styled';

const Button = styled.button`
    background: ${props=>props.ok?colors.green:props.danger?colors.red:colors.white};
    ${fly}
    &:hover{
        background-color: ${props=>lightenDarken(props.ok?colors.green:props.danger?colors.red:"#00ffff",20)};
    }
`;

export default Button;