import { Button } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';

export const BaseButton = styled(Button)`
    transition-duration: 0.4s;
    &.ant-btn-primary {
        background: ${(props) => themes.colors[props.type]};
        border-color: ${(props) => themes.colors[props.type]};
        transition-duration: 0.5s;
    }

    &.ant-btn:hover,
    &.ant-btn:focus {
        background: ${(props) => themes.colors[props.type]};
        border-color: ${(props) => themes.colors[props.type]};
    }
`;
