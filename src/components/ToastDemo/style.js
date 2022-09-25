import { notification } from 'antd';

import { themes } from '@/theme/theme';
import { CheckCircleOutlined } from '@ant-design/icons';

const successIcon = <CheckCircleOutlined style={{ color: themes.colors.primary5 }} />;

export const openNotificationWithIcon = (description) => {
    notification.success({
        description,
        placement: 'bottom-right',
        style: {
            background: themes.colors.primary1,
        },
        icon: successIcon,
    });
};
