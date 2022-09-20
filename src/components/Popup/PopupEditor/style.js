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

export const ContainerEditor = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    animation: ${move} 0.3s linear forwards;
    .editor {
        width: 70%;
        position: absolute;
        margin-bottom: 3rem;
        background: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        padding: 25px;
        .demo-editor {
            height: 15rem;
            overflow-y: scroll;
            border: 1px solid #d9d9d9;
        }
        .checkbox {
            margin: 0.5rem 0;
            display: flex;
        }
        .container-btn {
            text-align: center;
        }
        .save-btn {
            margin-top: 0.5rem;
            background: rgba(69, 206, 124, 1);
            color: white;
            border: 1px solid rgba(69, 206, 124, 1);
            :hover {
                color: rgba(69, 206, 124, 1);
                border: 1px solid rgba(69, 206, 124, 1);
                background: white;
            }
        }
    }
`;

export const FirstLayer = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.38);
    position: absolute;
`;
