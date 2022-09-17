import styled from 'styled-components';

export const ContainerEditor = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    .first-layer {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.38);
        position: absolute;
    }
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
            height: 20rem;
            overflow-y: scroll;
            border: 1px solid #d9d9d9;
        }
        .checkbox {
            margin: 1rem 0;
        }
        .container-btn {
            text-align: center;
        }
        button {
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
