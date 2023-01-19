import styled from 'styled-components';

import Flexbox from '@/components/Flexbox';
import { themes } from '@/theme/theme';

export const NotificationStyled = styled.div`
    .notification_content {
        width: 90%;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;

        .userAnnounce {
            font-weight: 700;
            font-size: 16px;
            line-height: 20px;
        }
    }
    .notification_liveTime {
        font-weight: 400;
        font-size: 14px;
        line-height: 10px;
        color: ${themes.colors.primary};
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;
export const FlexStyled = styled(Flexbox)`
    width: fit-content;
    padding: 12px;
    width: auto;
    background: ${(props) => (props.read ? '#e6f8ec' : 'transparent')};
    border-radius: 12px;
`;
