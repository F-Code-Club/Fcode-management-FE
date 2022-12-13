import { Typography } from 'antd';

import { RouterLink } from './styled';

const { Link } = Typography;

const ListAction = (props) => {
    const { name, event, type, status, id } = props;
    if (status) {
        return (
            <RouterLink to={`/account/edit-account-by-admin/${id}`} state={{ from: 'occupation' }}>
                {name}
            </RouterLink>
        );
    } else {
        return (
            <Link type={type} onClick={event}>
                {name}
            </Link>
        );
    }
};

export default ListAction;
