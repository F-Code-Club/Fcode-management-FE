import { Row } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const Wrapper = styled(Row)`
    padding: 2rem 5.5rem;
    margin-right: 1rem;
`;
export const ActionBar = styled.div`
    background-color: ${themes.colors.light};
`;
