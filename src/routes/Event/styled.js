import { Button } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
    background-color: white;
    padding: 24px;
    min-height: 90vh;
`;

export const DetailHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
`;

export const Title = styled.div``;
export const DetailBody = styled.div`
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    line-height: 24px;
    margin-left: 20px;
    div {
        display: flex;
    }
    h1 {
        font-weight: 500;
        margin-bottom: 4px;
    }
    h2 {
        font-weight: 400;
        font-size: 14px;
    }
`;
export const BoxContainer = styled.div`
    height: 100vh;
    z-index: 99;
    width: 100vw;
    background: rgba(0, 0, 0, 0.38);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const ButtonConTainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;
export const NormalButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 25px;
    border-radius: 8px;
    margin: 8px 12px;
    cursor: pointer;
    /* Inside auto layout */
    flex: none;
    order: 0;
    border: 2px solid #45ce7c;
    flex-grow: 0;
    &:hover {
        background-color: #37a463;
        span {
            color: white;
        }
    }
    span {
        color: #45ce7c !important ;
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
export const RedButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 15px;
    gap: 10px;

    width: 55px;
    height: 30px;

    /* Character/danger */
    margin: 8px 12px;
    background: #ff4d4f;
    /* drop-shadow/button-primary */

    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
    border-radius: 2px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;

    .anticon-close-circle {
        color: white !important;
    }
`;
export const GreenButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 15px;
    margin: 8px 12px;
    gap: 10px;

    width: 55px;
    height: 30px;

    /* Character/danger */

    background: #45ce7c;
    /* drop-shadow/button-primary */

    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
    border-radius: 2px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
    color: white;
`;
export const AddContainer = styled.div`
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const InputContainer = styled.div`
    h1 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 34px;
        line-height: 123.5%;
    }
    padding: 20px 30px;
    .ant-form {
        width: 100%;
    }
`;
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
`;
export const CustomButton = styled(Button)`
    margin: 8px 12px;
    background: #45ce7c !important;
    border-color: #45ce7c !important ;
    transition: 0.3s ease all;
    &:hover {
        color: black !important;
        background: #a5e7c0 !important;
        border-color: #a5e7c0 !important ;
    }
`;
export const DetailContainer = styled.div`
    background: white;
    z-index: 100;
    position: absolute;
    border: 2px solid #45ce7c;
    top: translate(50%, 100%);
    border-radius: 10px;
    max-width: 500px;
    padding: 20px 20px 0 20px;
`;
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    div {
        padding: 0 20px;
    }
    h1 {
        margin: 0 !important;
        margin-right: 12px !important;
    }
`;
export const Body = styled.div`
    h2 {
        padding: 0 20px;
    }
`;
export const Action = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
        width: calc(100% / 2);
        color: #45ce7c;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        &:hover {
            background: #e6f8ec;
            color: black;
        }
    }
`;
export const LeftHeader = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    padding: 4px 8px;
    h1 {
        margin-right: 8px;
        margin-bottom: 0;
        font-size: 24px;
        max-width: 350px;
        flex: 0.9;
    }
    div {
        text-align: center;
        background: #45ce7c;
        height: 20px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100px;
        font-size: 18px;
        color: white;
        margin-left: 10px;
    }
`;
export const EditContainer = styled.div`
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const RightHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
`;
export const EditButton = styled.div`
    cursor: pointer;
`;
export const DeleteButton = styled.div`
    cursor: pointer;
`;
