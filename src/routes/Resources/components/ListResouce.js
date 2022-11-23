import { List } from 'antd';

import ResourceCard from './ResourceCard';

const dataSource = [
    { title: 'Card title1', value: 'Card content1' },
    { title: 'Card title2', value: 'Card content2' },
    { title: 'Card title3', value: 'Card content3' },
    { title: 'Card title4', value: 'Card content4' },
    { title: 'Card title5', value: 'Card content5' },
    { title: 'Card title1', value: 'Card content1' },
    { title: 'Card title2', value: 'Card content2' },
    { title: 'Card title3', value: 'Card content3' },
    { title: 'Card title4', value: 'Card content4' },
    { title: 'Card title5', value: 'Card content5' },
];
const ListResource = () => {
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
            dataSource={dataSource}
            renderItem={() => (
                <List.Item>
                    <ResourceCard />
                </List.Item>
            )}
        />
    );
};

export default ListResource;
