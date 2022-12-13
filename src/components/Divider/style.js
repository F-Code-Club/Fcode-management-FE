import styled from 'styled-components';

import { themes } from '@/theme/theme';

const StyledDivider = styled.hr`
    height: 1px;
    width: ${(props) => (props.width ? props.width + 'px' : '100%')};
    background-image: linear-gradient(
        90deg,
        ${themes.slate4},
        ${themes.slate4} 75%,
        transparent 75%,
        transparent 100%
    );
    background-size: ${(props) => (props.variant === 'dashed' ? '0.5em' : '999em')} 1.25px;
    border: none;
    margin: ${(props) => (props.margin ? props.margin : 10)}px 0;
`;

export { StyledDivider };
