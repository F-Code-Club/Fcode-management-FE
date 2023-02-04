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
    .ant-page-header-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .ant-page-header-heading-extra {
        cursor: pointer;
    }
`;
export const NotificationContainer = styled.div`
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    background-color: ${themes.colors.primary050};
    // gap: 10px;
    width: 500px;
    overflow: hidden;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    & > .ant-dropdown-menu {
        box-shadow: none;
    }
`;
export const HeaderNotification = styled.div`
    display: flex;
    width: 100%;
    min-height: 40px;
    padding: 20px;
    align-items: center;
    justify-content: space-between;
    .title {
        font-weight: 800;
        font-size: 26px;
        line-height: 0px;
    }
    .btn-readAll {
        background: transparent;
        border: none;
        color: ${themes.colors.primary};
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
            color: #7bdca1;
        }
    }
`;
