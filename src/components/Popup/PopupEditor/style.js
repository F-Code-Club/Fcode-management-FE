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
    .editor {
        width: 70%;
        min-width: 900px;
        position: absolute;
        margin-bottom: 3rem;
        background: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        padding: 25px;
        h2 {
            text-align: center;
            margin: 0 auto;
        }
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
            display: grid;
            grid-template-columns: 49% 49%;
            justify-content: space-between;
            .container-choose-receiver {
                display: flex;
                flex-direction: column;
                margin-top: 1rem;
                h3 {
                    margin: auto 0;
                }
                .ant-checkbox-wrapper {
                    display: flex;
                    align-items: center;
                }
                .choose-receiver {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                }
                .choose-individual {
                    display: grid;
                    grid-template-columns: 85px calc(100% - 85px);
                }
            }
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
        .close-btn {
            cursor: pointer;
            padding: 2px;
            transition: 0.2s linear;
            position: absolute;
            top: 15px;
            right: 15px;
            :hover {
                color: red;
                transform: rotate(90deg);
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

export const optionStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    background: 'white',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    lineHeight: '25px',
};
