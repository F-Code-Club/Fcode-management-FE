import { Empty } from 'antd';

import { WrapperTabs, WrapperStyled } from '../styled';
import ViewResourcesCard from './ViewResourceCard';

const TabsCard = ({ resourceChild, handleClick }) => {
    if (resourceChild === null || resourceChild === undefined) {
        return (
            <WrapperStyled>
                <Empty />
            </WrapperStyled>
        );
        // tmpResources = [{ contributor: 'unknown', description: 'unknown', url: 'unknown' }];
    }

    return (
        <WrapperTabs>
            {resourceChild.map((item, i) => (
                <ViewResourcesCard
                    handleClick={handleClick}
                    key={i}
                    item={item}
                    des={item.contributor}
                    title={item.description}
                    link={item.url}
                />
            ))}
        </WrapperTabs>
    );
};
export default TabsCard;
