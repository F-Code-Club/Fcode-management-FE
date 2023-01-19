import { useEffect, useState } from 'react';

import { Avatar, Button, Carousel, Image, List } from 'antd';
import { ContentState, Editor, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NoPhoto from '../../../../assets/no-photo.jpg';
import { DataSlick } from '../Slick/slick';

import { selectUser } from '@/routes/Auth/slice/selector';
import { get } from '@/utils/ApiCaller';

export const RenderList = (props) => {
    const token = localStorage.getItem('token');
    const item = props.item;
    const userRole = useSelector(selectUser);
    const handleClick = props.handleClick;
    const navigate = useNavigate();
    const [dataAvatar, setDataAvatar] = useState();

    useEffect(() => {
        get('/member/all', '', { authorization: token })
            .then((res) => setDataAvatar(res.data.data))
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
    }, []);

    const ImageAnnouncement = (data) => {
        const DataImg = data ? data.split(';') : [];
        switch (DataImg.length) {
            case 0:
                return (
                    <Image
                        src={NoPhoto}
                        alt="no-image-announcement"
                        width={300}
                        height={200}
                        style={{ objectFit: 'cover', padding: '10px' }}
                    />
                );
            case 1:
                return (
                    <Image
                        src={NoPhoto}
                        alt="image-item-announcement-1"
                        width={300}
                        height={200}
                        style={{ objectFit: 'cover', padding: '10px' }}
                    />
                );
            default:
                return (
                    <Carousel {...DataSlick}>
                        {DataImg.map((todo, key) => (
                            <Image
                                key={key}
                                src={todo}
                                alt="image-item-announcement-default"
                                width={300}
                                height={200}
                                style={{
                                    objectFit: 'cover',
                                    padding: '10px',
                                }}
                            />
                        ))}
                    </Carousel>
                );
        }
    };

    const getAvatar = (id) => {
        let url;
        for (let i = 0; dataAvatar && i < dataAvatar.length; i++) {
            if (dataAvatar[i].id === id) {
                url = dataAvatar[i].avatarUrl;
                break;
            }
        }
        return url;
    };
    const getAuthor = (id) => {
        let name;
        for (let i = 0; dataAvatar && i < dataAvatar.length; i++) {
            if (dataAvatar[i].id === id) {
                name = `${dataAvatar[i].lastName.trim()} ${dataAvatar[i].firstName.trim()}`;
                break;
            }
        }
        return name;
    };

    const getContentEditorState = (item) => {
        try {
            return EditorState.createWithContent(
                ContentState.createFromBlockArray(htmlToDraft(JSON.parse(item)).contentBlocks)
            );
        } catch (error) {
            return EditorState.createEmpty();
        }
    };

    return (
        <List.Item key={item.id} extra={ImageAnnouncement(item.imageUrl)}>
            <List.Item.Meta
                avatar={<Avatar size="large" src={getAvatar(item.memberId)} />}
                title={<h4 style={{ marginBottom: 0 }}>{item.title}</h4>}
                description={getAuthor(item.memberId)}
            />
            <Editor
                editorState={getContentEditorState(item.description)}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                readOnly
            />
            <div className="btn-manage-announcement">
                {userRole.role === 'ADMIN' || userRole.role === 'MANAGER' ? (
                    <>
                        <Button className="btn-edit" onClick={() => handleClick('edit', item)}>
                            Chỉnh sửa
                        </Button>
                        <Button
                            className="btn-view"
                            onClick={() => navigate(`view-announcement/${item.id}`)}
                        >
                            Xem chi tiết
                        </Button>
                        <Button className="btn-delete" onClick={() => handleClick('delete', item)}>
                            Xóa
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            className="btn-edit"
                            onClick={() => navigate(`/notifications/${item.id}`, { state: item })}
                        >
                            Xem chi tiết
                        </Button>
                    </>
                )}
            </div>
        </List.Item>
    );
};
