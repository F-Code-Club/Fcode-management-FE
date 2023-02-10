import { Button } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';
import Modal from 'antd/lib/modal/Modal';

export const Container = styled.div`
    background-color: white;
    padding: 24px;
    border-radius: 10px;
    .ant-breadcrumb {
        padding-left: 16px !important;
    }
    .events {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .events .ant-badge-status {
        width: 100%;
        overflow: hidden;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .notes-month {
        font-size: 28px;
        text-align: center;
    }
    .notes-month section {
        font-size: 28px;
    }
    .ant-picker-calendar {
        width: 82vw;
        border-radius: 10px;
    }
    .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-content {
        height: 60px;
    }
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
        z-index: 1;
        color: ${themes.colors.primary};
        background: #fff;
        border-color: ${themes.colors.primary};
    }
    .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date,
    .ant-picker-calendar-full
        .ant-picker-panel
        .ant-picker-cell-selected
        .ant-picker-calendar-date-today,
    .ant-picker-calendar-full
        .ant-picker-panel
        .ant-picker-cell-selected:hover
        .ant-picker-calendar-date,
    .ant-picker-calendar-full
        .ant-picker-panel
        .ant-picker-cell-selected:hover
        .ant-picker-calendar-date-today {
        background: #e6f8ec;
    }
    .ant-picker-calendar-full
        .ant-picker-panel
        .ant-picker-cell-selected
        .ant-picker-calendar-date-today
        .ant-picker-calendar-date-value,
    .ant-picker-calendar-full
        .ant-picker-panel
        .ant-picker-cell-selected
        .ant-picker-calendar-date
        .ant-picker-calendar-date-value,
    .ant-picker-calendar-full
        .ant-picker-panel
        .ant-picker-cell-selected:hover
        .ant-picker-calendar-date-today
        .ant-picker-calendar-date-value,
    .ant-picker-calendar-full
        .ant-picker-panel
        .ant-picker-cell-selected:hover
        .ant-picker-calendar-date
        .ant-picker-calendar-date-value {
        color: ${themes.colors.primary};
    }
    .ant-radio-button-wrapper:hover {
        color: ${themes.colors.primary};
    }
    .input-element div {
        display: block;
        max-width: 100%;
        text-align: left;
    }
    .date-element .ant-row {
        display: block;
        max-width: 100%;
    }
    ::selection {
        color: #fff;
        background: ${themes.colors.primary};
    }
    .ant-form-item {
        margin: 0 0 8px;
    }
    .ant-form-item-label {
        text-align: left;
    }
    .ant-picker-focused,
    .ant-picker:hover {
        border-color: ${themes.colors.primary};
    }
    .ant-picker-range .ant-picker-active-bar {
        background: ${themes.colors.primary};
    }
    .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner,
    .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner,
    .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
        background: ${themes.colors.primary};
    }
    .ant-picker-cell-in-view.ant-picker-cell-today .ant-picker-cell-inner:before {
        border-color: ${themes.colors.primary};
    }
    .ant-btn-primary {
        border-color: ${themes.colors.primary};
        background: ${themes.colors.primary};
    }
    .anticon-close-circle {
        font: 18px;
        margin: 10px;
        color: ${themes.colors.primary};
    }
    hr.solid {
        border-top: 1.5px solid ${themes.colors.primary};
    }
    .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today {
        border-color: ${themes.colors.primary};
    }
    .ant-picker-cell-in-view.ant-picker-cell-range-end:not(
            .ant-picker-cell-range-end-single
        ):before,
    .ant-picker-cell-in-view.ant-picker-cell-range-start:not(
            .ant-picker-cell-range-start-single
        ):before {
        background: #e6f8ec;
    }
    .ant-picker-cell-in-view.ant-picker-cell-in-range:before {
        background: #e6f8ec;
    }
    .ant-picker-time-panel-column
        > li.ant-picker-time-panel-cell-selected
        .ant-picker-time-panel-cell-inner {
        background: #e6f8ec;
    }
    .ant-input-focused,
    .ant-input:focus {
        border-color: ${themes.colors.primary};
    }

    .rbc-agenda-table > tbody > tr {
        background-color: #e6f8ec;
    }
    .rbc-today {
        background: #e6f8ec;
    }
    .rbc-show-more {
        color: white;
    }
    .rbc-event,
    .rbc-background-event {
        background-color: ${themes.colors.primary};
    }
`;

export const DetailHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Title = styled.div``;
export const DetailBody = styled.div`
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    line-height: 24px;
    div {
        display: flex;
    }
    h1 {
        font-weight: 500;
        margin-bottom: 4px;
    }
    h2 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        font-weight: 400;
        font-size: 14px;
    }
    .ant-input-number {
        width: 100%;
    }
    & .wrap_place {
        display: flex;

        gap: 10px;
        & > .place {
            max-width: 200px;
            display: inline;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 400;
            font-size: 14px;
        }
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
        color: #45ce7c;
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
        color: white;
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
    .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    h1 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        // line-height: 123.5%;
        margin: 0;
    }
    padding: 20px 30px;
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
    border-radius: 10px;
    min-width: 400px;
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

    h1 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
export const Wrapper = styled.section`
    min-height: calc(100vh - 100px);
    border-radius: 10px;
`;
export const ConfirmModal = styled(Modal)`
    .ant-modal-content {
        border-radius: 10px;
        background: #ffffff;
        /* drop-shadow/0.12+0.8+0.5 */

        box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08),
            0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    }
    .ant-btn-primary {
        background-color: #ff4d4f;
    }
    .ant-btn-primary:focus,
    .ant-btn-primary:hover {
        background-color: #ff4d4f;
    }
    .ant-btn-default,
    .ant-btn-default:hover {
        border-color: ${themes.colors.primary};
        color: ${themes.colors.primary};
    }
`;
export const Message = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    .anticon {
        color: #ff4d4f;
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

export const WrapperListAttend = styled.div`
    & > .ant-btn-primary {
        background: ${themes.colors.primary};
    }
    .custom-modal .ant-modal-content {
        width: 500px;
        height: 300px;
    }
`;
export const CheckboxPresent = styled.div`
    .ant-checkbox-wrapper:hover .ant-checkbox-inner {
        border-color: ${themes.colors.primary};
    }
    .ant-checkbox-checked .ant-checkbox-inner {
        background: ${themes.colors.primary};
        border-color: ${themes.colors.primary};
    }
`;
export const CheckboxAbsent = styled.div`
    .ant-checkbox-wrapper:hover .ant-checkbox-inner {
        border-color: ${themes.colors.primary};
    }
    .ant-checkbox-checked .ant-checkbox-inner {
        background: ${themes.colors.calendulaGold};
        border-color: ${themes.colors.calendulaGold};
    }
`;
