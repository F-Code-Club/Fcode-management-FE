import styled from 'styled-components';

export const ContainerUploadImg = styled.div`
    display: flex;
    margin-top: 1rem;
    .title {
        min-width: 100px;
    }
    .ant-image {
        margin-right: 0.5rem;
    }
`;

export const ImageUpload = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    margin-left: 10px;
    p {
        margin: 5px;
    }
    :hover {
        border: 1px dashed #45ce7c;
    }
`;

export const UploadTwoUrl = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .ant-image {
        margin: 1rem 0.5rem 0 0;
        overflow: hidden;
    }
    .two-button {
        margin-top: 1rem;
        text-align: right;
        .cancel-btn {
            margin-top: 0.5rem;
            color: black;
            border: 1px solid #d9d9d9;
            margin-right: 10px;
            :hover {
                color: #ff4d4f;
                border: 1px solid #ff4d4f;
            }
        }
        .ok-btn {
            margin-top: 0.5rem;
            background: #45ce7c;
            color: white;
            border: 1px solid #45ce7c;
            :hover {
                color: rgba(69, 206, 124, 1);
                border: 1px solid #45ce7c;
                background: white;
            }
        }
    }
`;
