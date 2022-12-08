// import { useRef, useState } from 'react';
// import { Tabs } from 'antd';
import { useSelector } from 'react-redux';

import { selectResourceChild } from '../slice/selector';
import { WrapperTabs } from '../styled';
import ViewResourcesCard from './ViewResourceCard';

const TabsCard = () => {
    const listResourcesChildren = useSelector(selectResourceChild);

    return (
        <WrapperTabs>
            {listResourcesChildren.map((item, i) => (
                <ViewResourcesCard
                    key={i}
                    des={item.description}
                    title={item.title}
                    link={item.link}
                    img={item.imgs}
                />
            ))}
        </WrapperTabs>
    );
};
export default TabsCard;
