import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const ContainerAnnouncement = styled.div`
    width: 100%;
    min-height: calc(100vh - 140px);
    padding: 10px 20px 0;
    box-sizing: border-box;
    transition: 0.25 linear;
    .list-announcement {
        width: 100%;
        background: white;
        border-radius: 10px;
        padding: 20px;
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
            -webkit-line-clamp: 4;
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
    .btn-manage-announcement {
        margin: 2rem 0 0.5rem 0;
    }
    .btn-edit {
        color: white;
        background: ${themes.colors.primary400};
        border-radius: 5px;
        border: 1px solid ${themes.colors.primary400};
        margin-right: 20px;
        :hover {
            color: ${themes.colors.primary400};
            background: white;
            border: 1px solid ${themes.colors.primary400};
        }
    }
    .btn-view {
        color: ${themes.colors.primary400};
        background: white;
        border-radius: 5px;
        border: 1px solid ${themes.colors.primary400};
        margin-right: 20px;
        :hover {
            color: white;
            background: ${themes.colors.primary400};
            border: 1px solid ${themes.colors.primary400};
        }
    }
    .btn-delete {
        color: white;
        background: ${themes.colors.danger};
        border-radius: 5px;
        border: 1px solid ${themes.colors.danger};
        :hover {
            color: red;
            background: white;
            border: 1px solid ${themes.colors.danger};
        }
    }
`;
