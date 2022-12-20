import styled from 'styled-components';

import { themes } from '@/theme/theme';

const StyledWrapper = styled.div`
    position: relative;
    background: ${themes.colors.primary050};
    min-width: 100vw;
    min-height: ${(props) => props.minHeight || 'auto'};
    margin: 0 auto;
    padding: 0;
`;

export { StyledWrapper };
