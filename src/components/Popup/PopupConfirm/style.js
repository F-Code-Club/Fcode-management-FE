import styled, { keyframes } from 'styled-components';

const move = keyframes`
    0%{
        transform: scale(0.5);
        opacity: 0;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
`;

export const ContainerPopup = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    animation: ${move} 0.15s linear forwards;
`;

export const LayerPopup = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.38);
`;

export const Popup = styled.div`
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 25px;
    display: flex;
    justify-content: flex-start;
    border-radius: 2px;
    .icon-popup {
        margin-top: 3px;
        font-size: 20px;
    }
`;

export const ContentPopup = styled.div`
    width: 100%;
    margin-left: 1rem;
    transition: linear 0.25s;
    div {
        text-align: right;
    }
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
    .accept-btn {
        margin-top: 0.5rem;
        background: rgba(69, 206, 124, 1);
        color: white;
        border: 1px solid rgba(69, 206, 124, 1);
        :hover {
            color: rgba(69, 206, 124, 1);
            border: 1px solid rgba(69, 206, 124, 1);
        }
    }
`;
