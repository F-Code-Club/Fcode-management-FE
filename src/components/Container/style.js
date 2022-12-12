import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const BaseContainer = styled.div`
    background-color: ${themes.colors.light};
    padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
`;
