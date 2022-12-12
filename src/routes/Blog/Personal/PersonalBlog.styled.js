import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const Background = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e6f8ec;
`;

export const Wrapper = styled.div`
    width: 920px;
    min-height: 693px;
    background: #ffffff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 22px 30px;
    position: relative;

    /* Override Ant Design */
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn,
    a,
    .ant-pagination-item-active a {
        color: ${themes.colors.primary};
    }

    .ant-pagination-item-active {
        border-color: ${themes.colors.primary};
    }

    .ant-btn-primary {
        border-color: ${themes.colors.primary};
        background: ${themes.colors.primary};
    }

    .ant-tabs-ink-bar {
        background: ${themes.colors.primary};
    }
`;

export const Search = styled.div`
    display: flex;
    margin-left: auto;
    margin-bottom: 12px;
    width: 500px;
    height: 40px;
    right: 30px;
    top: 30px;

    & button {
        margin-left: 10px;
    }
`;
