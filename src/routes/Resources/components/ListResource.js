import { List } from 'antd';
import { useSelector } from 'react-redux';

import { selectResources } from '../slice/selectors';
import ResourceCard from './ResourceCard';

const ListResource = ({ handleClick }) => {
    const listResources = useSelector(selectResources);
    return (
        <List
            size="large"
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 2,
                xxl: 2,
            }}
            pagination={{
                showSizeChanger: true,
                pageSizeOptions: ['10', '50', '100', '1000'],
                position: 'bottom',
                pageSize: 4,
            }}
            dataSource={[...listResources].reverse()}
            renderItem={(item) => (
                <List.Item>
                    <ResourceCard item={item} clickEvent={handleClick} />
                </List.Item>
            )}
        />
    );
};

export default ListResource;
