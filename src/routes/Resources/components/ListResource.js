import { List } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectResources, selectIsLoading } from '../slice/selectors';
import { ButtonResourceCard } from '../styles';
import ResourceCard from './ResourceCard';

const ListResource = ({ handleClick }) => {
    const navigate = useNavigate();
    const listResources = useSelector(selectResources);
    const IsLoading = useSelector(selectIsLoading);

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
            dataSource={listResources ? [...listResources[0]].reverse() : []}
            renderItem={(item) => {
                return (
                    <List.Item>
                        <ButtonResourceCard onClick={() => navigate(`${item.id}`)}>
                            <ResourceCard item={item} clickEvent={handleClick} />
                        </ButtonResourceCard>
                    </List.Item>
                );
            }}
        />
    );
};

export default ListResource;