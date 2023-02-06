import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const ContainerAnnouncement = styled.div`
    width: 100%;
    min-height: calc(100vh - 140px);
    padding: 10px 20px 0;
    box-sizing: border-box;
    transition: 0.25 linear;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .title_h2 {
        display: flex;
        text-align: left;
        width: 90%;

        justify-content: flex-start;
    }
    .list-announcement {
        width: 90%;
        background: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
            0px 1px 5px rgba(0, 0, 0, 0.2);
        .DraftEditor-root {
            z-index: 0;
        }
        .ant-list-item-meta {
            align-items: center;
        }
        .ant-list-item {
            display: grid;
            grid-template-columns: 70% 30%;
        }
        .public-DraftEditor-content > div {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
        }
        .ant-list-item-meta-title {
            margin-bottom: 0;
        }
    }
    .ant-list-vertical .ant-list-item-meta {
        margin-bottom: 0.5rem;
    }
    .ant-list-vertical .ant-list-item-extra {
        margin: 0px;
    }
    .btn-manage-announcement {
        margin: 2rem 0 0.5rem 0;
    }
    .btn-edit {
        color: white;
        background: ${themes.colors.primary400};
        border-radius: 5px;
        border: 1px solid ${themes.colors.primary400};

        :hover {
            color: ${themes.colors.primary400};
            background: white;
            border: 1px solid ${themes.colors.primary400};
        }
    }
`;
