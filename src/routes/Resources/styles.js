// import { down } from 'styled-breakpoints';
import styled, { keyframes } from 'styled-components';

import Resource_01 from '../../assets/Resource/Resource_01.jpg';

import { themes } from '@/theme/theme';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 40px 0px;
    isolation: isolate;
    & .ant-list {
        margin-top: 10px;
        width: 1050px;
        // height: 800px;
    }
    & .ant-list-lg .ant-list-item {
        padding: 0;
    }
    & .ant-list-pagination {
        margin-top: 10px;
    }
`;
export const Subtitle = styled.span`
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.15px;
    color: ${themes.colors.subtitle};
`;
export const Wrapper = styled.div`
    width: 1110px;
    // height: 840px;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: center;
    background: ${themes.colors.light};
    border-radius: 10px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    padding: 22px 30px;
    position: relative;
    overflow: hidden;
`;
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
`;
export const HeaderText = styled.span`
    font-style: normal;
    font-weight: 650;
    font-size: 50px;
    margin: 0;
`;

export const HeaderButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 14px;
    width: 40px;
    height: 40px;
    color: ${themes.colors.light};
    border: 1px solid ${themes.colors.primary400};
    background: ${themes.colors.primary400};
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s ease-in;
    &:hover {
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
            0px 1px 5px rgba(0, 0, 0, 0.2);
    }
`;
export const CardWrapper = styled.div`
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: flex-start;
    // padding: 0px;
    flex: 1;
    border-radius: 10px;
    overflow: hidden;

    height: ${(props) => props.height}rem;
`;
export const BackgroundCard = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;

    padding: 30px;
    width: 100%;
    min-height: 100%;
    background: ${({ url }) => (url ? `url(${url})` : null)};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    // background: url(${Resource_01});
`;

export const TitleResource = styled.span`
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.15px;
    color: ${themes.colors.light};
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
`;
export const ContentResource = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 34px;
    display: inline-block;
    max-width: 100%;
    // height: '50px';
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: 0.25px;
    color: ${themes.colors.light};
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 3px 4px rgba(0, 0, 0, 0.14),
        0px 3px 3px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.2);
`;
export const Description = styled.span`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.15px;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    color: ${themes.colors.light};
`;

export const ContentButton = styled(HeaderButton)`
    width: fit-content;
    height: 32px;
    padding: 4px 15px;
`;

export const ReverseContentButton = styled(HeaderButton)`
    background: ${themes.colors.light};
    color: ${themes.colors.dark};
    width: 56px;
    height: 32px;

    &:hover {
        color: ${themes.colors.light};
        background: ${themes.colors.primary400};
    }
`;

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
        border: 1px solid ${themes.colors.neutral5};
        margin-right: 10px;
        :hover {
            color: ${themes.colors.danger};
            border: 1px solid ${themes.colors.danger};
        }
    }
    .accept-btn {
        margin-top: 0.5rem;
        background: ${themes.colors.primary400};
        color: white;
        border: 1px solid ${themes.colors.primary400};
        :hover {
            color: ${themes.colors.primary400};
            border: 1px solid ${themes.colors.primary400};
        }
    }
`;
const move02 = keyframes`
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
    animation: ${move02} 0.15s linear forwards;
    /* wave-shadow-color: red; */
    .editor {
        width: 50%;
        position: absolute;
        // margin-bottom: 3rem;
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
    width: 150px;
    height: 32px;
    border: 1px solid ${themes.colors.neutral5};
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
    p {
        margin: 5px;
    }
    :hover {
        border: 1px solid ${themes.colors.primary400};
    }
`;

export const UploadTwoUrl = styled.div`
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
            border: 1px solid ${themes.colors.neutral5};
            margin-right: 10px;
            :hover {
                color: ${themes.colors.danger};
                border: 1px solid ${themes.colors.danger};
            }
        }
        .ok-btn {
            margin-top: 0.5rem;
            background: ${themes.colors.primary400};
            color: white;
            border: 1px solid ${themes.colors.primary400};
            :hover {
                color: rgba(69, 206, 124, 1);
                border: 1px solid ${themes.colors.primary400};
                background: white;
            }
        }
    }
`;

export const ButtonResourceCard = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    border-radius: 10px;
    transition: all 0.2s;
    &:hover {
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
            0px 1px 5px rgba(0, 0, 0, 0.2);
    }
`;
