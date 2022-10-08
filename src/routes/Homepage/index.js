import { Avatar, List } from 'antd';

import { Col1, Col2, ContainerHomepage } from './style';

export const Homepage = () => {
    const data = [
        {
            title: 'Homepage',
            name: 'Trương Lê Tuấn Kiệt',
            content:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            avatar: 'https://loanthehongnhan.vn/anh-avatar-dang-yeu/imager_9_27298_700.jpg',
        },
        {
            title: 'Homepage',
            name: 'Trương Lê Tuấn Kiệt',
            content:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            avatar: 'https://loanthehongnhan.vn/anh-avatar-dang-yeu/imager_9_27298_700.jpg',
        },
        {
            title: 'Homepage',
            name: 'Trương Lê Tuấn Kiệt',
            content:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            avatar: 'https://loanthehongnhan.vn/anh-avatar-dang-yeu/imager_9_27298_700.jpg',
        },
        {
            title: 'Homepage',
            name: 'Trương Lê Tuấn Kiệt',
            content:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            avatar: 'https://loanthehongnhan.vn/anh-avatar-dang-yeu/imager_9_27298_700.jpg',
        },
    ];

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
                        <button className="btn-view-more">Xem thêm</button>
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
                                    title={<h4>{item.title}</h4>}
                                    description={item.name}
                                />
                                <p className="content">{item.content}</p>
                            </List.Item>
                        )}
                    />
                </div>
            </Col1>
            <Col2>
                <div className="row1">Xin chào Phạm Văn ABC</div>
            </Col2>
        </ContainerHomepage>
    );
};
