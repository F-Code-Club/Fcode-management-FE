import { useEffect } from 'react';

import { Avatar, List } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setUser } from '../Auth/slice';
import { DATA } from './components/fakeData/data';
import { Col1, Col2, ContainerHomepage } from './style';

import authApi from '@/utils/apiComponents/authApi';
import LocalStorageUtils from '@/utils/localStorageUtils';

export const Homepage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = DATA;
    useEffect(() => {
        // const token = LocalStorageUtils.getItem('token');
        // const userId = LocalStorageUtils.getJWTUser().id;
        const getData = async () => {
            const response = await authApi.getUser();
            console.log(response);

            if (response.data.code === 200) {
                const { data } = response.data;
                const formatUser = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: data.role,
                };
                dispatch(setUser(formatUser));
            }
            if (response.data.code === 408) {
                LocalStorageUtils.removeItem('token');
                navigate('/auth');
            }
        };
        getData();
    }, []);
    return (
        <ContainerHomepage>
            <Col1>
                <div className="row1">
                    <div className="content">
                        <h3 className="title">CLB ĐANG DIỄN RA</h3>
                        <p className="child1">Hoạt động học thuật Techaway</p>
                        <p className="child2">
                            Đấu trường lập trình R.ODE toàn trường (Viết dài để biết giới hạn khung
                            text 300px)
                        </p>
                        <Link to="/event" className="btn-view-more">
                            Xem thêm
                        </Link>
                    </div>
                    <img
                        src="https://fcodehcm.files.wordpress.com/2021/09/logo.png?w=400"
                        alt="f-code"
                    />
                </div>

                <div className="row2">
                    <h3 className="title">BÀI VIẾT CHỜ DUYỆT</h3>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{ pageSize: 3 }}
                        dataSource={data}
                        renderItem={(item) => (
                            <Link
                                to={`/blog/${item.id}?action=${
                                    item.isApprove ? 'approved' : 'hidden'
                                }`}
                                style={{ color: 'black' }}
                            >
                                <List.Item
                                    key={item.title}
                                    extra={
                                        <img
                                            width={272}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        />
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar size="large" src={item.avatar} />}
                                        title={<h4 title={item.title}>{item.title}</h4>}
                                        description={item.name}
                                    />
                                    <p className="content">{item.content}</p>
                                </List.Item>
                            </Link>
                        )}
                    />
                </div>
            </Col1>

            <Col2>
                <div className="row1">
                    <h3>xin chào phạm văn abc</h3>
                </div>

                <div className="row2">
                    <h3>yêu cầu duyệt thành viên</h3>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{ pageSize: 3 }}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.title} extra={<a href="/account">Chi tiết</a>}>
                                <List.Item.Meta
                                    avatar={<Avatar size="large" src={item.avatar} />}
                                    title={<h4 title={item.title}>{item.title}</h4>}
                                    description={<p className="content">{item.content}</p>}
                                />
                            </List.Item>
                        )}
                    />
                </div>

                <div className="row3">
                    <h3>thông báo</h3>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{ pageSize: 3 }}
                        dataSource={data}
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
