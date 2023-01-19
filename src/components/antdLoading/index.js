import { Spin } from 'antd';
import styled from 'styled-components';

import { themes } from '@/theme/theme';

const Loading = () => {
    return (
        <SpinContainer>
            <Spin
                size="large"
                tip="Loading..."
                style={{
                    color: `${themes.colors.primary}`,
                }}
            />
        </SpinContainer>
    );
};

export default Loading;
export const SpinContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .ant-spin-dot-item {
        background-color: ${themes.colors.primary};
    }
`;
