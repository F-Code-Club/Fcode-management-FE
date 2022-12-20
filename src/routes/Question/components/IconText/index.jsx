import { Space } from 'antd';

const IconText = (props) => {
    const { Icon, text } = props;
    return (
        <Space>
            {Icon && <Icon />}
            {text}
        </Space>
    );
};

export default IconText;
