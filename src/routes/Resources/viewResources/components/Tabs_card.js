import { WrapperTabs } from '../styled';
import ViewResourcesCard from './ViewResourceCard';

const TabsCard = ({ resourceChild }) => {
    let tmpResources;

    if (resourceChild === null || resourceChild === undefined) {
        tmpResources = [{ title: 'unknown', description: 'unknown', link: 'unknown' }];
    } else {
        tmpResources = resourceChild;
    }
    console.log(tmpResources);
    return (
        <WrapperTabs>
            {tmpResources.map((item, i) => (
                <ViewResourcesCard
                    key={i}
                    des={item.contributor}
                    title={item.description}
                    link={item.url}
                    img={item.imgs}
                />
            ))}
        </WrapperTabs>
    );
};
export default TabsCard;
