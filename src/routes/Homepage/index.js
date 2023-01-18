import { useState, useEffect } from 'react';

import { Avatar, List } from 'antd';
import { ContentState, Editor, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo/F-Code logo.png';
import { get } from '../../utils/ApiCaller';
import { selectUser } from '../Auth/slice/selector';
import ResourceCard from '../Resources/components/ResourceCard';
import Carousel2 from './component/reactSlider';
import {
    Col1,
    Col2,
    ContainerHomepage,
    ContainerHomepageStyled,
    Col1Styled,
    Col2Styled,
} from './style';

import productApi from '@/utils/apiComponents/productApi';

export const Homepage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const [dataEvent, setDataEvent] = useState();
    const [dataArticle, setDataArticle] = useState();
    const [dataAnnounce, setDataAnnounce] = useState();
    const [dataAvatar, setDataAvatar] = useState();
    const [memberAnnounce, setMemberAnnounce] = useState();
    const [listSubject, setListSubject] = useState();

    const userRole = useSelector(selectUser);

    useEffect(() => {
        get('/event/all', '', { authorization: token })
            .then((res) => setDataEvent(res.data.data.reverse()))
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        get('/article/processing', '', { authorization: token })
            .then((res) => {
                let sortData = res.data?.data?.sort((a, b) => (a.id < b.id ? 1 : -1));
                setDataArticle(sortData?.splice(0, 2));
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        get('/announcement/all', '', { authorization: token })
            .then((res) => {
                let sortData = res.data?.data?.sort((a, b) => (a.id < b.id ? 1 : -1));
                setDataAnnounce(sortData?.splice(0, 7));
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        get('/member/all', '', { authorization: token })
            .then((res) => setDataAvatar(res.data.data))
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        get('/announcement/notifications', '', { authorization: token })
            .then((res) => {
                let sortData = res.data?.data?.sort((a, b) => (a.id < b.id ? 1 : -1));
                setMemberAnnounce(sortData?.splice(0, 3));
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        productApi.getAllSubject().then((data) => {
            let sortData = data.data?.data?.sort((a, b) => (a.id > b.id ? 1 : -1));

            setListSubject(sortData);
        });
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

    const getContentEditorState = (item) => {
        try {
            return EditorState.createWithContent(
                ContentState.createFromBlockArray(htmlToDraft(JSON.parse(item)).contentBlocks)
            );
        } catch (error) {
            return EditorState.createEmpty();
        }
    };
    // useEffect(() => {
    //     const token = LocalStorageUtils.getItem('token');
    //     // const userId = LocalStorageUtils.getJWTUser().id;
    //     const getData = async (token) => {
    //         const response = await authApi.getUser(token);

    //         if (response.data.code === 200) {
    //             const { data } = response.data;

    //             const formatUser = {
    //                 firstName: data.firstName,
    //                 lastName: data.lastName,
    //                 role: data.role,
    //                 id: data.id,
    //             };
    //             LocalStorageUtils.setItem('role', formatUser.role);
    //             dispatch(setUser(formatUser));
    //         }
    //         if (response.data.code === 408) {
    //             LocalStorageUtils.removeItem('token');
    //             navigate('/auth');
    //         }
    //     };
    //     if (token) {
    //         getData(token);
    //     }
    // }, []);

    if (userRole.role == 'ADMIN' || userRole.role == 'MANAGER') {
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
                                pagination={false}
                                dataSource={dataArticle}
                                renderItem={(item) => (
                                    <Link
                                        to={`/blog/${item.id}?action=processing`}
                                        style={{ color: 'black' }}
                                    >
                                        <List.Item
                                            key={item.title}
                                            extra={
                                                <img width={272} alt="blog" src={item.imageUrl} />
                                            }
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
                                                editorState={getContentEditorState(item)}
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
                        <h3>
                            xin chào {userRole.firstName} {userRole.lastName}
                        </h3>
                    </div>

                    <div className="row2">
                        <h3>thông báo</h3>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={false}
                            dataSource={dataAnnounce}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.title}
                                    extra={
                                        <a
                                            href={`manage-announcement/view-announcement/${item.id}`}
                                        >
                                            Chi tiết
                                        </a>
                                    }
                                >
                                    <List.Item.Meta
                                        title={<h4 title={item.title}>{item.title}</h4>}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Col2>
            </ContainerHomepage>
        );
    }

    return (
        <>
            <Carousel2 />
            <ContainerHomepageStyled>
                <Col1Styled>
                    {dataEvent && (
                        <div className="row1">
                            <div className="content_2">
                                <Link to="/event" className="btn-view-more">
                                    Xem thêm
                                </Link>
                            </div>
                            <div className="content">
                                <h3 className="title">CLB ĐANG DIỄN RA</h3>
                                <p className="child1">{dataEvent[dataEvent.length - 1].name}</p>
                                <p className="child2">{dataEvent[dataEvent.length - 2].name}</p>
                            </div>
                        </div>
                    )}
                    <div className="row1">
                        <div className="content_2">
                            <Link to="/manage-resource" className="btn-view-more">
                                Xem thêm
                            </Link>
                        </div>
                        <div className="content">
                            <h3>Tài Nguyên</h3>
                        </div>
                        <div className="subjectNew">
                            {listSubject && (
                                <ResourceCard
                                    item={listSubject[listSubject.length - 1]}
                                    heightStyle="12"
                                />
                            )}
                        </div>
                    </div>
                </Col1Styled>

                <Col2Styled>
                    <div className="row2">
                        <h3>thông báo</h3>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={false}
                            dataSource={memberAnnounce}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.title}
                                    /*       extra={
                                        <a
                                            href={`manage-announcement/view-announcement/${item.id}`}
                                        >
                                            Chi tiết
                                        </a>
                                    }*/
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
                </Col2Styled>
            </ContainerHomepageStyled>
        </>
    );
};
// <ResourceCard item={listSubject[listSubject?.length - 1]} />
// <Link to="/event" className="btn-view-more">
// Xem thêm
// </Link>
