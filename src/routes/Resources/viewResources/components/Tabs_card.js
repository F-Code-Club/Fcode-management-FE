import { useRef, useState } from 'react';

import { Tabs } from 'antd';
import { useSelector } from 'react-redux';

import { selectResourceChild } from '../slice/selector';
import { WrapperTabs } from '../styled';
import ViewResourcesCard from './ViewResourceCard';

// const initialItems = [
//     {
//         label: 'HTML',
//         children: <ViewResourcesCard />,
//         key: '1',
//         closable: false,
//     },
//     {
//         label: 'CSS',
//         children: <ViewResourcesCard />,
//         key: '2',
//         closable: false,
//     },
//     {
//         label: 'JavaScript',
//         children: <ViewResourcesCard />,
//         key: '3',
//         closable: false,
//     },
// ];

const TabsCard = () => {
    const listResourcesChildren = useSelector(selectResourceChild);

    const [activeKey, setActiveKey] = useState(listResourcesChildren[0].id);

    const newTabIndex = useRef(0);
    const onChange = (newActiveKey) => {
        setActiveKey(newActiveKey);
    };
    const RenderListResourceChild = listResourcesChildren.map((item, i) => (
        <ViewResourcesCard
            key={i}
            des={item.description}
            title={item.title}
            link={item.link}
            img={item.imgs}
        />
    ));
    const [items, setItems] = useState([
        {
            label: 'JavaScript',
            children: RenderListResourceChild,
            key: 0,
            closable: false,
        },
    ]);
    const itemss = items.map((item) => {
        const id = String(item.key + 1);
        return {
            label: `Tab ${id}`,
            key: id,
            children: RenderListResourceChild,
            closable: false,
        };
    });

    const add = () => {
        const newActiveKey = `${newTabIndex.current++}`;
        console.log(newActiveKey);
        const newPanes = [...items];
        newPanes.push({
            label: 'New Tab',
            children: 'Content of new Tab',
            key: newActiveKey,
        });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };
    //optional remove
    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };
    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };
    return (
        <WrapperTabs>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={itemss}
            />
        </WrapperTabs>
    );
};
export default TabsCard;
