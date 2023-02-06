import { Button } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';
import Modal from 'antd/lib/modal/Modal';

export const CustomModal = styled(Modal)`
    background-color: white;
    width: 700px;
    padding: 0 !important;
    border-radius: 10px;
    .ant-modal {
        padding: 0;
    }
    .ant-modal-content {
        border-radius: 10px;
        width: 760px;
        border: 2px solid #45ce7c;
    }
`;
export const Img = styled.img`
    margin-bottom: 43px;
`;
export const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 100px;
    background: white;
    border-radius: 10px;
    color: black;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 32px;
    margin-bottom: 32px;
    text-align: center;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
export const MilestoneContainer = styled.div`
    width: 700px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    /* 02 dp */

    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-bottom: 25px;
    padding: 20px 20px;
    .ant-picker-active-bar {
        left: 0 !important;
    }
`;
export const Hero = styled.div`
    svg {
        color: ${themes.colors.primary};
    }
    margin: 6px 0;
    display: flex;
    align-items: center;
    section {
        margin-right: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    span {
        color: ${themes.colors.primary};
        font-size: 20px;
    }
    h5 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        text-transform: uppercase;
        color: #000000;
        margin: 0;
    }
`;
export const Time = styled.div`
    span {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        /* identical to box height, or 157% */
        margin-right: 5px;
        color: #000000;
    }
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    /* or 157% */
    margin: 10px 0;
    color: #000000;
    display: flex;
`;
export const Des = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    max-height: 180px;
    margin: 10px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* number of lines to show */
    line-clamp: 3;
    /* or 157% */
    span {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        /* identical to box height, or 157% */

        color: #000000;
    }

    color: #000000;
`;
export const LeftSide = styled.div`
    margin-left: 30px;
    margin-right: 20px;
`;
export const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 32px;
`;
export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const FirstButton = styled.button`
    width: 68px;
    height: 22px;
    border: none;
    /* Primary/[400] */
    display: flex;
    align-items: center;
    justify-content: center;
    background: #45ce7c;
    /* drop-shadow/button-primary */
    margin-right: 10px;
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
    border-radius: 5px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    /* identical to box height, or 183% */
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    /* identical to box height, or 183% */

    text-align: center;

    /* Character / Primary(inverse) */

    color: #ffffff;
    cursor: pointer;
    text-align: center;
`;
export const SecondButton = styled.button`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* identical to box height, or 183% *
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 22px;
/* identical to box height, or 183% */

    text-align: center;

    /* Character/Title .85 */

    color: rgba(0, 0, 0, 0.85);

    text-align: center;

    /* Character/Title .85 */

    color: rgba(0, 0, 0, 0.85);
    background: #ffffff;
    /* Primary/[400] */

    border: 1px solid #45ce7c;
    /* drop-shadow/button-secondary */

    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
    border-radius: 5px;
    cursor: pointer;
`;
export const Avatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
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
export const AddContainer = styled.div`
    width: 480px;
    height: 609px;
    background: white;
    border-radius: 10px;
`;
export const InputContainer = styled.div`
    h1 {
        margin-top: 40px;
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        /* identical to box height, or 122% */
        text-transform: uppercase;
        color: #000000;
        margin-bottom: 15px;
    }
    .ant-row {
        display: block;
    }
    .ant-form-item-required {
        margin-bottom: 13px;
    }
    .ant-col-8 {
        display: inline;
    }
    .ant-col-16 {
        max-width: 100%;
    }
    .ant-form {
        width: 100%;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px 30px;
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

export const CancelButon = styled.button`
    padding: 4px 15px;
    gap: 10px;
    margin: 8px 12px;
    width: 57px;
    height: 32px;
    cursor: pointer;
    /* Neutral/1 */

    background: #ffffff;
    /* Primary/[400] */

    border: 1px solid #45ce7c;
    /* drop-shadow/button-secondary */

    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
    border-radius: 5px;
`;
export const Form = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    /* identical to box height, or 157% */

    color: #000000;
`;
export const ElementBox = styled.div`
    width: 700px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
`;
export const FullDes = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    margin: 10px 0;
    /* or 157% */
`;
export const ConfirmModal = styled(Modal)`
    .ant-modal-content {
        border-radius: 2px;
        background: #ffffff;
        /* drop-shadow/0.12+0.8+0.5 */

        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08),
            0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        border-radius: 2px;
    }
    .ant-btn-primary {
        background-color: ${themes.colors.primary};
    }
`;
export const Message = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    .anticon {
        color: #faad14;
        font-size: 22px;
        margin: 4px 16px 0 0;
    }
`;
export const MessageHero = styled.div`
    h1 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height, or 150% */

        /* Character/Title .85 */
        margin: 0;
        color: rgba(0, 0, 0, 0.85);
    }
    p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
    }
`;
