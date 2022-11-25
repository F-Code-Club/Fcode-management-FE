import styled, { keyframes } from 'styled-components';

import { themes } from '@/theme/theme';

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
    animation: ${move} 0.15s linear forwards;
    /* wave-shadow-color: red; */
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
        .rdw-link-modal,
        .rdw-embedded-modal {
            height: auto;
        }
        .demo-editor {
            height: 30vh;
            overflow-y: scroll;
            border: 1px solid ${themes.colors.neutral5};
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
            background: ${themes.colors.primary400};
            color: white;
            border: 1px solid ${themes.colors.primary400};
            :hover {
                color: ${themes.colors.primary400};
                border: 1px solid ${themes.colors.primary400};
                background: white;
            }
        }
    }
    .errorMsg {
        color: red;
        margin: 0;
    }
`;

export const FirstLayer = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.38);
    position: absolute;
`;
