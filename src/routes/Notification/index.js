import { useEffect, useState } from 'react';

import { Button, List } from 'antd';

import { RenderList } from '../Announcement/components/RenderList';
import { ContainerAnnouncement } from './style';

import { toastError, toastSuccess } from '@/components/ToastNotification';
import { get, post, put, remove } from '@/utils/ApiCaller';

export const NotifiCationMember = () => {
    const token = localStorage.getItem('token');

    const [dataAnnounce, setDataAnnounce] = useState();
    const [reload, setReload] = useState(1);

    useEffect(() => {
        get('/announcement/notifications', '', { authorization: token })
            .then((res) => {
                let sortData = res.data?.data?.sort((a, b) => (a.id < b.id ? 1 : -1));
                setDataAnnounce(sortData);
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
    }, [reload]);

    return (
        <ContainerAnnouncement>
            <div className="title_h2">
                <h2>
                    <b>TẤT CẢ THÔNG BÁO</b>
                </h2>
            </div>
            <List
                itemLayout="vertical"
                size="large"
                className="list-announcement"
                pagination={{ pageSize: 3 }}
                dataSource={dataAnnounce}
                renderItem={(item) => <RenderList item={item} />}
            />
        </ContainerAnnouncement>
    );
};
