import { Typography } from 'antd';

const { Link } = Typography;

const ListAction = (props) => {
    const { name, event, type } = props;
    return (
        <Link type={type} onClick={event}>
            {name}
        </Link>
    );
};

export default ListAction;
