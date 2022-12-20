import { Typography } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';

const { Title } = Typography;

export const Box = styled.div`
    width: min(100vw - 48px - 250px, 980px); // 48px: margin left right, 250px: sidebar width
    margin: auto;
    padding: 40px 45px;
    gap: 10px;
    background: ${themes.colors.light};
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
`;

export const TitleForm = styled(Title)`
    font-weight: 700 !important;
    text-align: center;
    text-transform: uppercase;
`;

export const Border = styled.div`
    border: 1px solid ${themes.colors.neutral5};
    padding: 4px 12px;

    &:focus {
        border-color: ${themes.colors.primary};
    }
`;
