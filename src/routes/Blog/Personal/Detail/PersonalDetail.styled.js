import { Row } from 'antd';
import styled from 'styled-components';

import StyledContainer from '@/components/Container';
import { themes } from '@/theme/theme';

export const Wrapper = styled(Row)`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem;
    flex-direction: row;
`;

export const ContentBlog = styled(StyledContainer)`
    width: 700px;

    h1 {
        font-size: 30px;
        margin: 20px 0;
        font-weight: 600;
        text-align: center;
    }

    h2 {
        font-style: italic;
        margin: 5px 0;
    }

    .ant-btn-primary {
        background: ${themes.colors.primary};
        border-color: ${themes.colors.primary};
    }

    .public-DraftEditor-content {
        overflow-x: hidden;
    }
`;

export const InfoList = styled(Row)`
    margin: 0 24px;
    position: sticky;
    top: 25%;
    right: 32px;
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
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${themes.colors.light};
`;