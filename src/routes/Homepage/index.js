import { useEffect, useState } from 'react';

import { Avatar, List } from 'antd';
import { ContentState, Editor, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo/F-Code logo.png';
import { get } from '../../utils/ApiCaller';
import { Col1, Col2, ContainerHomepage } from './style';

export const Homepage = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const [dataEvent, setDataEvent] = useState();
    const [dataArticle, setDataArticle] = useState();
    const [dataAnnounce, setDataAnnounce] = useState();
    const [dataAvatar, setDataAvatar] = useState();

    useEffect(() => {
        get('/event/all', '', { authorization: token })
            .then((res) => setDataEvent(res.data.data.reverse()))
            .catch((error) => console.log(error));
        get('/article/processing', '', { authorization: token })
            .then((res) => setDataArticle(res.data.data.reverse()))
            .catch((error) => console.log(error));
        get('/announcement/all', '', { authorization: token })
            .then((res) => setDataAnnounce(res.data.data.reverse()))
            .catch((error) => console.log(error));
        get('/member/all', '', { authorization: token })
            .then((res) => setDataAvatar(res.data.data))
            .catch((error) => console.log(error));
    }, []);

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

    return (
        <ContainerHomepage>
            <Col1>
                {dataEvent && (
                    <div className="row1">
                        <div className="content">
                            <h3 className="title">CLB ĐANG DIỄN RA</h3>
                            <p className="child1">{dataEvent[0].name}</p>
                            <p className="child2">{dataEvent[1].name}</p>
                            <Link to="/event" className="btn-view-more">
                                Xem thêm
                            </Link>
                        </div>
                        <img src={Logo} alt="f-code" />
                    </div>
                )}

                {dataArticle && (
                    <div className="row2">
                        <h3 className="title">BÀI VIẾT CHỜ DUYỆT</h3>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{ pageSize: 2 }}
                            dataSource={dataArticle}
                            renderItem={(item) => (
                                <Link to={`/blog/${item.id}`} style={{ color: 'black' }}>
                                    <List.Item
                                        key={item.title}
                                        extra={<img width={272} alt="blog" src={item.imageUrl} />}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    size="large"
                                                    src={getAvatar(item.memberId)}
                                                />
                                            }
                                            title={<h4 title={item.title}>{item.title}</h4>}
                                            description={item.author}
                                        />
                                        <Editor
                                            editorState={EditorState.createWithContent(
                                                ContentState.createFromBlockArray(
                                                    htmlToDraft(JSON.parse(item.content))
                                                        .contentBlocks
                                                )
                                            )}
                                            toolbarHidden={true}
                                            readOnly="true"
                                        />
                                    </List.Item>
                                </Link>
                            )}
                        />
                    </div>
                )}
            </Col1>

            <Col2>
                <div className="row1">
                    <h3>xin chào {user}</h3>
                </div>

                <div className="row2">
                    <h3>thông báo</h3>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{ pageSize: 10 }}
                        dataSource={dataAnnounce}
                        renderItem={(item) => (
                            <List.Item
                                key={item.title}
                                extra={
                                    <a href={`manage-announcement/view-announcement/${item.id}`}>
                                        Chi tiết
                                    </a>
                                }
                            >
                                <List.Item.Meta title={<h4 title={item.title}>{item.title}</h4>} />
                            </List.Item>
                        )}
                    />
                </div>
            </Col2>
        </ContainerHomepage>
    );
};
