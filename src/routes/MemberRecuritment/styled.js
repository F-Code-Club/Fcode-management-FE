import styled from 'styled-components';

export const Container = styled.div`
    min-height: 650px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Inter' !important;
`;
export const Button = styled.button`
    width: 110px;
    height: 32px;

    /* Primary/[400] */

    background: #45ce7c;
    /* Primary/[400] */

    border: 1px solid #45ce7c;
    /* drop-shadow/button-primary */

    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
    border-radius: 5px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    /* identical to box height, or 157% */

    text-align: center;

    /* Character / Primary(inverse) */

    color: #ffffff;
    cursor: pointer;
`;
