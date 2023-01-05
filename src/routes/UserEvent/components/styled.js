import styled from 'styled-components';

import { themes } from '@/theme/theme';
import Modal from 'antd/lib/modal/Modal';

export const CustomModal = styled(Modal)`
    background-color: white;
    border: 2px solid #45ce7c;

    border-radius: 10px;
    padding: 0;
    .ant-modal-body {
        padding: 0;
    }
`;
export const DetailHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    section {
        margin-right: 20px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
    }
`;

export const LeftHeader = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 4px 8px;
    width: 400px;
    h1 {
        margin-right: 8px;
        margin-bottom: 0;
        font-size: 24px;
    }
    div {
        text-align: center;
        background: #45ce7c;
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
export const RightHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
`;
export const DetailBody = styled.div`
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    line-height: 24px;
    margin-left: 20px;
    div {
        display: flex;
    }
    h1 {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        margin-right: 5px;
    }
    h2 {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 0;
    }
`;
export const Status = styled.section`
    color: ${(props) => {
        if (props.state === 'ON_TIME') {
            return themes.colors.primary;
        } else if (props.state === 'LATE') {
            return themes.colors.late;
        } else {
            return themes.colors.upcoming;
        }
    }};
`;
