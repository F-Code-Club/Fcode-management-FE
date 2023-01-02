import { Col } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 85vh;
`;

export const ListWrapper = styled.div`
    width: 568px;
    height: 820px;
    background: #ffffff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 1.4rem 2rem;
    position: relative;
    overflow-y: scroll;
    .ant-list-item-meta-title {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
    }
    .ant-list-item-meta-description {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 131%;
    }
    a {
        color: ${themes.colors.primary};
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${themes.colors.primary};
    }
    .ant-tabs-ink-bar {
        background: ${themes.colors.primary};
    }
    .ant-tabs-tab-btn:active,
    .ant-tabs-tab-btn:focus,
    .ant-tabs-tab-remove:active,
    .ant-tabs-tab-remove:focus {
        color: ${themes.colors.primary};
    }
`;

export const SearchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 1.5rem;
    justify-content: space-between;
`;

// search box
export const SearchBox = styled.div`
    width: 568px;
    height: 40px;
    right: 30px;
    top: 30px;
    margin-bottom: 15px;
    //antd custom corlor
    .ant-btn-primary {
        background-color: ${themes.colors.primary};
        border: 1px solid ${themes.colors.primary400};
    }
    .ant-btn-default {
        border: 1px solid ${themes.colors.primary};
        box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
    }
    .ant-input-search .ant-input:hover {
        border-color: ${themes.colors.primary};
    }
    .ant-btn:focus,
    .ant-btn:hover {
        color: ${themes.colors.primary};
        border-color: ${themes.colors.primary};
        span {
            color: ${themes.colors.primary};
        }
    }
    .ant-btn-primary:focus,
    .ant-btn-primary:hover {
        background: ${themes.colors.primary};
        span {
            color: white;
        }
    }
    .ant-input-search .ant-input:focus {
        border-color: ${themes.colors.primary};
    }
`;
export const Container = styled.div`
    background-color: white;
    width: 960px;
    padding: 20px 25px;
    margin-bottom: 20px;
`;
export const Divider = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
export const TabContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px 20px;
    gap: 5px;
    margin-right: 20px;
    width: 157px;
    height: 195px;

    background: #ffffff;
    /* 02 dp */

    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    h3 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        /* identical to box height, or 157% */

        text-align: center;
        color: #000000;
        margin-bottom: 15px;
    }

    .ant-checkbox-checked::after {
        border-color: ${themes.colors.primary};
    }
    .ant-checkbox-checked .ant-checkbox-inner {
        background-color: ${themes.colors.primary};
        border-color: ${themes.colors.primary};
    }
    .ant-checkbox-input:focus + .ant-checkbox-inner,
    .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner {
        border-color: ${themes.colors.primary};
    }
`;
export const StyledCol = styled(Col)`
    margin: 8px 0;
`;
