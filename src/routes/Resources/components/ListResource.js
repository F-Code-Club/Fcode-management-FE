import { List } from 'antd';
import { useSelector } from 'react-redux';

import { selectIsLoading } from '../slice/selectors';
import ResourceCard from './ResourceCard';

import { selectUser } from '@/routes/Auth/slice/selector';
import usePersistedState from '@/utils/usePersistedState';

const ListResource = ({ handleClick, resource }) => {
    const IsLoading = useSelector(selectIsLoading);

    let tmpListResources;
    if (resource === null || resource === undefined)
        tmpListResources = [{ semester: 'unknown', name: 'unknown' }];
    tmpListResources = resource;

    if (IsLoading) {
        return <div>...Loading</div>;
    }
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
            dataSource={tmpListResources ? [...tmpListResources].reverse() : []}
            renderItem={(item) => {
                return (
                    <List.Item>
                        <ResourceCard item={item} clickEvent={handleClick} heightStyle="20" />
                    </List.Item>
                );
            }}
        />
    );
};

export default ListResource;
