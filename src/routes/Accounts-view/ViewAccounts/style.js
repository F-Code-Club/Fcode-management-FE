import { Image } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';
import Title from 'antd/lib/typography/Title';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 85vh;
`;

export const ListWrapper = styled.div`
    max-width: 750px;
    height: 820px;
    background: #ffffff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 1.4rem 2rem;
    position: relative;
    overflow-y: scroll;
`;
export const Container = styled.div`
    max-width: 990px;
    margin: 0 auto;

    .left-side {
        .ant-avatar {
            margin: 0 auto 1em auto;
            display: block;
        }

        .ant-typography {
            text-align: center;
        }

        span.ant-typography {
            display: block;
        }

        .full-fill {
            display: flex;
            .ant-space-item {
                display: block;
                width: 100%;
            }
        }

        .pos-sticky {
            position: sticky;
            top: 24px;
        }
    }

    .right-side {
        .ant-picker,
        .ant-select {
            width: 100%;
        }
    }
    .anticon {
        font-size: 24px;
        margin-right: 10px;
        color: ${themes.colors.primary};
    }
`;
export const StyleImage = styled(Image)`
    object-fit: cover;
`;
export const Titled = styled(Title)`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    text-align: center;
    line-height: 175%;
    /* identical to box height, or 32px */

    letter-spacing: 0.15px;

    color: #000000;
`;
export const Header = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 175%;
    /* identical to box height, or 32px */

    letter-spacing: 0.15px;

    color: #000000;
    margin-bottom: 10px;
`;
export const Info = styled.div`
    margin-bottom: 10px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 175%;
    /* or 24px */

    letter-spacing: 0.15px;

    color: #000000;
`;
