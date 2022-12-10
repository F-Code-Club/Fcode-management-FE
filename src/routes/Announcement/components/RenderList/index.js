import { Avatar, Button, Carousel, Image, List } from 'antd';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { useNavigate } from 'react-router-dom';

import NoPhoto from '../../../../assets/no-photo.jpg';
import { DataSlick } from '../Slick/slick';

export const RenderList = (props) => {
    const item = props.item;
    const handleClick = props.handleClick;
    const navigate = useNavigate();

    const ImageAnnouncement = (DataImg) => {
        switch (DataImg.length) {
            case 0:
                return (
                    <Image src={NoPhoto} alt="no-image-announcement" style={{ width: '100%' }} />
                );
            case 1:
                return (
                    <Image
                        src={DataImg[0]}
                        alt="image-item-announcement"
                        style={{ width: '100%' }}
                    />
                );
            default:
                return (
                    <Carousel {...DataSlick}>
                        {DataImg.map((todo, key) => (
                            <div key={key}>
                                <Image
                                    src={todo}
                                    alt="image-item-announcement"
                                    style={{ width: '100%' }}
                                />
                            </div>
                        ))}
                    </Carousel>
                );
        }
    };

    return (
        <List.Item key={item.id} extra={ImageAnnouncement(item.imgs)}>
            <List.Item.Meta
                avatar={<Avatar size="large" src={item.avatarAdmin} />}
                title={<h4 style={{ marginBottom: 0 }}>{item.title}</h4>}
                description={item.nameAdmin}
            />
            <Editor
                editorState={EditorState.createWithContent(
                    convertFromRaw(JSON.parse(item.content))
                )}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                readOnly
            />
            <div className="btn-manage-announcement">
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
            </div>
        </List.Item>
    );
};
