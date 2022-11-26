import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const Wrapper = styled.div`
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
`;

// search box
export const SearchBox = styled.div`
    width: 400px;
    height: 40px;
    right: 30px;
    top: 30px;
`;
export const DownloadButton = styled.button``;
