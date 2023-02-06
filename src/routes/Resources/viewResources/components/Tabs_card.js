import { Empty, List } from 'antd';

import { WrapperTabs, WrapperStyledEmpty } from '../styled';
import ViewResourcesCard from './ViewResourceCard';

const TabsCard = ({ resourceChild, handleClick }) => {
    if (resourceChild === null || resourceChild === undefined) {
        return (
            <WrapperStyledEmpty>
                <Empty />
            </WrapperStyledEmpty>
        );
    }

    return (
        <WrapperTabs>
            <List
                size="large"
                pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '50', '100', '1000'],
                    position: 'bottom',
                    pageSize: 3,
                }}
                dataSource={resourceChild ? [...resourceChild].reverse() : []}
                renderItem={(item, i) => {
                    return (
                        <ViewResourcesCard
                            handleClick={handleClick}
                            key={i}
                            item={item}
                            des={item.contributor}
                            title={item.description}
                            link={item.url}
                        />
                    );
                }}
            />
        </WrapperTabs>
    );
};
export default TabsCard;
