import { Row } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const Wrapper = styled(Row)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 5.5rem;
`;
export const ActionBar = styled.div`
    background-color: ${themes.colors.light};
`;
