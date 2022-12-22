import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 85vh;
`;

export const ListWrapper = styled.div`
    width: 960px;
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

// search box
export const SearchBox = styled.div`
    width: 500px;
    height: 40px;
    right: 30px;
    top: 30px;
`;
export const Container = styled.div`
    background-color: white;
    width: 960px;
    padding: 20px 25px;
    margin-bottom: 20px;
`;
