import { Typography } from 'antd';

import { RouterLink } from './styled';

const { Link } = Typography;

const ListAction = (props) => {
    const { name, event, type, status } = props;
    if (status) {
        return <RouterLink to="/account/edit-account">{name}</RouterLink>;
    } else {
        return (
            <Link type={type} onClick={event}>
                {name}
            </Link>
        );
    }
};

export default ListAction;
