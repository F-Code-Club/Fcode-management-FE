import { Content } from 'antd/lib/layout/layout';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    padding: 2rem;
`;

export const StyledContent = styled(Content)`
    background-color: white;
    height: ${(props) => props.height || 745} px;
    overflow: hidden;
    padding: ${(props) => (!props.hidePadding ? '1.5rem' : 0)};
    border-radius: 10px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12),
        0px 1px 5px rgba(0, 0, 0, 0.2);
    margin-bottom: 0.8rem;
`;
