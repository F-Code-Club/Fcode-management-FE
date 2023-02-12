import { Table } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const CustomTable = styled(Table)`
    width: 100%;
    a {
        color: ${themes.colors.primary};
        &:hover {
            color: ${themes.colors.primary};
        }
    }
    .ant-pagination-item-active {
        border-color: ${themes.colors.primary};
    }
    .ant-pagination-item-active a {
        color: ${themes.colors.primary};
    }
    .ant-pagination-item-active:focus-visible,
    .ant-pagination-item-active:hover {
        border-color: ${themes.colors.primary};
    }
    .ant-pagination-item-active:focus-visible a,
    .ant-pagination-item-active:hover a {
        color: ${themes.colors.primary};
    }
`;
