import styled from 'styled-components';

import { ArrowRightOutlined } from '@ant-design/icons';

const parseCSS = (rules) => {
    let result = '';
    for (let key in rules) {
        result = result + key + ': ' + rules[key] + ';\n';
    }
    return result;
};

const StyledIcon = styled.div`
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${(props) => props.size || 'inherit'}px;
    ${(props) => (props.style ? parseCSS(props.style) : '')}

    & > ion-icon {
        font-size: inherit;
        --ionicon-stroke-width: ${(props) => (props.weight ? props.weight + 'em' : '16px')};
    }
`;

const Icon = (props) => {
    const { ...rest } = props;
    return (
        <StyledIcon {...rest}>
            <ArrowRightOutlined />
        </StyledIcon>
    );
};

export default Icon;
