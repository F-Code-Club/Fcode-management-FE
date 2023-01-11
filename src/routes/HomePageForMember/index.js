import { useState, useEffect } from 'react';

import { Avatar, List } from 'antd';
import { ContentState, Editor, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo/F-Code logo.png';
import { get } from '../../utils/ApiCaller';
import { setUser } from '../Auth/slice';
import { ProfileImage } from './components/avatarFormat';
import { Col1, Col2, ContainerHomepage } from './style';

import authApi from '@/utils/apiComponents/authApi';
import LocalStorageUtils from '@/utils/localStorageUtils';

export const HomepageMemeber = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const [dataEvent, setDataEvent] = useState();
    const [dataArticle, setDataArticle] = useState();
    const [dataAnnounce, setDataAnnounce] = useState();
    const [dataAvatar, setDataAvatar] = useState();

    useEffect(() => {
        get('/event/all', '', { authorization: token })
            .then((res) => setDataEvent(res.data.data.reverse()))
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        get('/article/processing', '', { authorization: token })
            .then((res) => setDataArticle(res.data.data.reverse()))
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        get('/announcement/all', '', { authorization: token })
            .then((res) => {
                setDataAnnounce(res.data.data.reverse());
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        get('/member/all', '', { authorization: token })
            .then((res) => {
                setDataAvatar(res.data.data);
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
    }, []);

    const getAvatar = (id) => {
        let url;
        let username;
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
                ContentState.createFromBlockArray(
                    htmlToDraft(JSON.parse(item.content)).contentBlocks
                )
            );
        } catch (error) {
            return EditorState.createEmpty();
        }
    };
    useEffect(() => {
        const token = LocalStorageUtils.getItem('token');
        // const userId = LocalStorageUtils.getJWTUser().id;
        const getData = async (token) => {
            const response = await authApi.getUser(token);

            if (response.data.code === 200) {
                const { data } = response.data;

                const formatUser = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: data.role,
                    id: data.id,
                };
                LocalStorageUtils.setItem('role', formatUser.role);
                dispatch(setUser(formatUser));
            }
            if (response.data.code === 408) {
                LocalStorageUtils.removeItem('token');
                navigate('/auth');
            }
        };
        if (token) {
            getData(token);
        }
    }, []);
    // {dataArticle && (
    //     <div className="row2">
    //         <h3 className="title">BÀI VIẾT CHỜ DUYỆT</h3>
    //         <List
    //             itemLayout="vertical"
    //             size="large"
    //             pagination={{ pageSize: 2 }}
    //             dataSource={dataArticle}
    //             renderItem={(item) => (
    //                 <Link
    //                     to={`/blog/${item.id}?action=processing`}
    //                     style={{ color: 'black' }}
    //                 >
    //                     <List.Item
    //                         key={item.title}
    //                         extra={<img width={272} alt="blog" src={item.imageUrl} />}
    //                     >
    //                         <List.Item.Meta
    //                             avatar={
    //                                 <Avatar
    //                                     size="large"
    //                                     src={getAvatar(item.memberId)}
    //                                 />
    //                             }
    //                             title={<h4 title={item.title}>{item.title}</h4>}
    //                             description={item.author}
    //                         />
    //                         <Editor
    //                             editorState={getContentEditorState(item)}
    //                             toolbarHidden={true}
    //                             readOnly="true"
    //                         />
    //                     </List.Item>
    //                 </Link>
    //             )}
    //         />
    //     </div>
    // )}

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
                                extra={
                                    <a href={`manage-announcement/view-announcement/${item.id}`}>
                                        Chi tiết
                                    </a>
                                }
                            >
                                <List.Item.Meta
                                    title={<h4 title={item.title}>{item.title}</h4>}
                                    avatar={<ProfileImage src={getAvatar(item.memberId)[0]} />}
                                    description={`${getAvatar(item.memberId)[1]}`}
                                ></List.Item.Meta>
                                <div className="content-announce">
                                    Vậy là kì học Fall 2022 đã bắt đầu. Trong tuần này, chúng ta sẽ
                                    có một buổi sinh hoạt câu lạc bộ để tổng kết những hoạt động vừa
                                    qua cũng như thông báo các hoạt động, sự k Vậy là kì học Fall
                                    2022 đã bắt đầu. Trong tuần này, chúng ta sẽ có một buổi sinh
                                    hoạt câu lạc bộ để tổng kết những hoạt động vừa qua cũng như
                                    thông báo các hoạt động, sự k.
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </Col2>
        </ContainerHomepage>
    );
};
