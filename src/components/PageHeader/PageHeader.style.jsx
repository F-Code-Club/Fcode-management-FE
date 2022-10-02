import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const PageHeaderContainer = styled.div`
    .ant-page-header {
        padding: 0px 24px;
    }
    .ant-breadcrumb {
        padding: 20px 0 0 24px;
    }
    .ant-layout {
        background-color: ${themes.colors.primary050};
    }
    .ant-layout-header {
        height: 100;
        padding: 0;
        background: rgb(255, 255, 255);
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12),
            0px 1px 3px rgba(0, 0, 0, 0.2);
    }
`;
