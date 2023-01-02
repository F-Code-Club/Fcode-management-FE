import { Typography, Modal } from 'antd';

import LocalStorageUtils from '../../../utils/localStorageUtils/index';
import productApi from '../../../utils/productApi';
import { RouterLink } from './styled';

import { StopOutlined } from '@ant-design/icons';

const token = LocalStorageUtils.getItem('token');
const { Link } = Typography;
const confirm = (id) => {
    Modal.confirm({
        maskClosable: true,
        title: 'Bạn có muốn xóa tài khoản này',
        icon: <StopOutlined />,
        content: 'Tài khoản này sẽ không tồn tại nữa .',
        okText: 'Xác nhận',
        cancelText: 'Huỷ',
        onOk: async () => {
            await productApi.removeMember(id, token);
            await productApi.getAllAccount(token);
        },
    });
};
const ListAction = (props) => {
    const { name, type, status, id } = props;
    if (status) {
        return (
            <RouterLink to={`/account/view-account/${id}`} state={{ from: 'occupation' }}>
                {name}
            </RouterLink>
        );
    } else {
        return (
            <Link type={type} onClick={() => confirm(id)}>
                {name}
            </Link>
        );
    }
};

export default ListAction;
