import styled from 'styled-components';

export const ContainerAnnouncement = styled.div`
    width: 100%;
    padding: 3rem 10%;
    background: #e6f8ec;
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
        background: #45ce7c;
        border-radius: 5px;
        border: 1px solid #45ce7c;
        margin-right: 20px;
        :hover {
            color: #45ce7c;
            background: white;
            border: 1px solid #45ce7c;
        }
    }
    .btn-view {
        color: #45ce7c;
        background: white;
        border-radius: 5px;
        border: 1px solid #45ce7c;
        margin-right: 20px;
        :hover {
            color: white;
            background: #45ce7c;
            border: 1px solid #45ce7c;
        }
    }
    .btn-delete {
        color: white;
        background: #ff4d4f;
        border-radius: 5px;
        border: 1px solid #ff4d4f;
        :hover {
            color: red;
            background: white;
            border: 1px solid #ff4d4f;
        }
    }
`;
