import { useState, useEffect } from 'react';

import { Avatar, List } from 'antd';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo/F-Code logo.png';
import { get } from '../../utils/ApiCaller';
import { selectUser } from '../Auth/slice/selector';
import { ProfileImage } from './components/avatarFormat';
import { Col1, Col2, ContainerHomepage, ContainerHomepageStyled } from './style';

export const HomepageMemeber = () => {
    const token = localStorage.getItem('token');
    const [dataEvent, setDataEvent] = useState();
    const [dataArticle, setDataArticle] = useState();
    const [dataAnnounce, setDataAnnounce] = useState();
    const [dataAvatar, setDataAvatar] = useState();

    const fetchMemberById = async (memberId) => {
        const result = await get(`/member/memberId/${memberId}`, '', { authorization: token })
            .then((res) => {
                console.log(res.data.data);
                setDataAvatar(res.data.data);
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        get('/event/all', '', { authorization: token })
            .then((res) => setDataEvent(res.data.data.reverse()))
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        get('/article/processing', '', { authorization: token })
            .then((res) => setDataArticle(res.data.data.reverse()))
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        get('/announcement/notifications', '', { authorization: token })
            .then((res) => {
                setDataAnnounce(res.data.data.reverse());
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        // get(`/member/memberId/$`, '', { authorization: token })
        //     .then((res) => {
        //         setDataAvatar(res.data.data);
        //     })
        //     // eslint-disable-next-line no-console
        //     .catch((error) => console.log(error));
    }, []);

    const getAvatar = (id) => {
        let url;
        let username;
        // fetchMemberById(id);
        for (let i = 0; dataAvatar && i < dataAvatar.length; i++) {
            if (dataAvatar[i].id === id) {
                url = dataAvatar[i].avatarUrl;
                username = dataAvatar[i].firstName + ' ' + dataAvatar[i].lastName;
                break;
            }
        }
        return [url, username];
    };

    const getContentEditorState = (item) => {
        try {
            return EditorState.createWithContent(
                ContentState.createFromBlockArray(htmlToDraft(item).contentBlocks)
            );
        } catch (error) {
            return EditorState.createEmpty();
        }
    };

    return (
        <ContainerHomepageStyled>
            <Col1>
                {dataEvent && (
                    <div className="row1">
                        <div className="content">
                            <h3 className="title">CLB ĐANG DIỄN RA</h3>
                            <p className="child1">{dataEvent[dataEvent.length - 1].name}</p>
                            <p className="child2">{dataEvent[dataEvent.length - 2].name}</p>
                            <Link to="/event" className="btn-view-more">
                                Xem thêm
                            </Link>
                        </div>
                    </div>
                )}
                <div className="row1">
                    <div className="content">
                        <h3>Tài Nguyên</h3>
                    </div>
                </div>
            </Col1>

            <Col2>
                <div className="row2">
                    <h3>thông báo</h3>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{ pageSize: 3 }}
                        dataSource={dataAnnounce}
                        renderItem={(item) => (
                            <List.Item
                                key={item.title}
                                extra={<a href={`manage-announcement/${item.id}`}>Chi tiết</a>}
                            >
                                <List.Item.Meta
                                    title={<h4 title={item.title}>{item.title}</h4>}
                                    // avatar={<ProfileImage src={getAvatar(item.memberId)[0]} />}
                                    description={`${item.location}`}
                                ></List.Item.Meta>
                                <div className="content-announce">
                                    <Editor
                                        editorState={getContentEditorState(item.description)}
                                        readOnly
                                        toolbar={{
                                            options: [],
                                        }}
                                    />
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </Col2>
        </ContainerHomepageStyled>
    );
};
