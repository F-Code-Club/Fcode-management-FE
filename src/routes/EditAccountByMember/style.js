import { Button, Form, Image, Modal, Typography } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';

const { Title } = Typography;
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 85vh;
`;

export const ListWrapper = styled.div`
    max-width: 750px;
    height: 820px;
    background: #ffffff;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 1.4rem 2rem;
    position: relative;
    overflow-y: scroll;
`;
export const Container = styled.div`
    max-width: 920px;
    margin: 0 auto;

    .left-side {
        .ant-avatar {
            margin: 0 auto 1em auto;
            display: block;
        }

        .ant-typography {
            text-align: center;
        }

        span.ant-typography {
            display: block;
        }

        .full-fill {
            display: flex;
            .ant-space-item {
                display: block;
                width: 100%;
            }
        }

        .pos-sticky {
            position: sticky;
            top: 24px;
        }
    }

    .right-side {
        .ant-picker,
        .ant-select {
            width: 100%;
        }
    }
    .ant-btn-primary,
    .ant-btn-primary:hover,
    .ant-btn-primary:focus {
        background: ${themes.colors.primary} !important;
        background-color: ${themes.colors.primary} !important;
        border-color: ${themes.colors.primary} !important;
    }
`;
export const StyleImage = styled(Image)`
    object-fit: cover;
`;
export const EditButton = styled(Button)`
    position: absolute;
    transform: translate(150px, -70px);
    background-color: ${themes.colors.primary};
    .ant-btn-primary,
    .ant-btn-primary:hover,
    .ant-btn-primary:focus {
        background-color: ${themes.colors.primary} !important;
    }
`;
export const AvatarContainer = styled.div`
    position: relative;
`;
export const StyledForm = styled(Form)`
    width: 450px;
    .ant-input:hover {
        border-color: ${themes.colors.primary};
    }
`;
export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const Label = styled(Title)`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400 !important;
    font-size: 14px !important;
    line-height: 22px !important;
    /* identical to box height, or 157% */

    /* Character/Title .85 */

    color: rgba(0, 0, 0, 0.85);
`;
export const NotiModal = styled(Modal)`
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
