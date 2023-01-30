import { useState, useEffect } from 'react';

import { Avatar, List } from 'antd';
import { ContentState, Editor, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import NoImg from '../../assets/fallback.png';
import Logo from '../../assets/logo/F-Code logo.png';
import { get } from '../../utils/ApiCaller';
import { selectUser } from '../Auth/slice/selector';
import { ProfileImage } from '../HomePageForMember/components/avatarFormat';
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

import memberApi from '@/utils/apiComponents/memberApi';
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
    const [announceInfo, setAnnounceInfo] = useState([]);
    const [err, setErr] = useState(false);
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

    const getMember = async (id) => {
        let url;
        let name;
        let memberId;
        await memberApi.getMemberByMemberId(id).then((member) => {
            memberId = member.data.data.id;
            url = member.data.data.avatarUrl;
            name = member.data.data.firstName + ' ' + member.data.data.lastName;
        });

        return { memberId, url, name };
    };

    function FetchDataAnnounce() {
        let dataAva = memberAnnounce?.map(async (el) => {
            return await getMember(el.memberId).then((member) => {
                return member;
            });
        });
        Promise.all(dataAva).then((responses) => {
            setAnnounceInfo(responses);
        });
    }

    const getAnnounceInfo = (id) => {
        let url;
        let name;

        for (let i = 0; announceInfo && i < announceInfo.length; i++) {
            if (announceInfo[i].memberId === id) {
                url = announceInfo[i].url;
                name = announceInfo[i].name;
                break;
            }
        }
        return [url, name];
    };
    useEffect(() => {
        if (memberAnnounce?.length >= 0) {
            FetchDataAnnounce();
        }
    }, [memberAnnounce]);
    function handleAvatarError() {
        setErr(true);
    }
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
                                                <img
                                                    width={272}
                                                    alt="blog"
                                                    src={err ? NoImg : item.imageUrl}
                                                    onError={handleAvatarError}
                                                />
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
                                        avatar={
                                            <ProfileImage src={getAnnounceInfo(item.memberId)[0]} />
                                        }
                                        description={`${getAnnounceInfo(item.memberId)[1]}`}
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
