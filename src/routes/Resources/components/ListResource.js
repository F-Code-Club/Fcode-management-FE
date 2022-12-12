import { List } from 'antd';
import { useSelector } from 'react-redux';

import { selectResources, selectIsLoading } from '../slice/selectors';
import ResourceCard from './ResourceCard';

const ListResource = ({ handleClick }) => {
    const listResources = useSelector(selectResources);
    const IsLoading = useSelector(selectIsLoading);
    let tmpListResources;
    if (listResources === null || listResources === undefined)
        tmpListResources = [{ semester: 'unknown', name: 'unknown' }];
    tmpListResources = listResources[0];
    console.log(tmpListResources);
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
                        <ResourceCard item={item} clickEvent={handleClick} />
                    </List.Item>
                );
            }}
        />
    );
};

export default ListResource;
