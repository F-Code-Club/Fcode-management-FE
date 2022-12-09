import { Row } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const Wrapper = styled(Row)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;
export const ActionBar = styled.div`
    background-color: ${themes.colors.light};
`;

export const InfoList = styled(Row)`
    display: flex;
    flex-direction: column !important;
    align-items: center;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: ${themes.colors.light};
`;

export const InfoItem = styled.div`
    width: 100%;
    max-width: 300px;
    height: 100%;
    padding: 1.5rem;
    border-bottom: 1px solid #e9e9e9;
`;
