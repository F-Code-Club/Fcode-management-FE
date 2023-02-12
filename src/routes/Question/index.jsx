import { useState, useEffect } from 'react';

import { List, Row, Col, Typography, Modal, Input, Avatar, Empty, Skeleton } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useNavigate } from 'react-router-dom';

import StyledButton from './../../components/Button/index';
import { toastError, toastSuccess, toastWarning } from './../../components/ToastNotification/index';
import commentApi from './../../utils/apiComponents/commentApi';
import questionApi from './../../utils/apiComponents/questionApi';
import { countDays } from './../../utils/convertTime';
import CommentTitle from './components/CommentTitle';
import IconText from './components/IconText';
import ActionButton from './components/button/index';
import * as questionConfig from './question.config';
import { StyledContent, Wrapper } from './style';

import { dummyAvatar } from '@/utils/import-helper';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const questionContainerHeight = 705;
const { TextArea } = Input;

const QuestionManagement = () => {
    // hook
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [latestComments, setLatestComments] = useState([]);
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
    const [answer, setAnswer] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState({});
    // Custom hook
    const navigate = useNavigate();

    const fetchComment = async () => {
        await commentApi
            .getLatest()
            .then((res) => {
                if (res.data.code === 200) {
                    const data = res.data.data.slice(0, 4);
                    setLatestComments(data);
                    return;
                }
                if (res.data.code === 400) {
                    navigate('/home');
                    throw new Error('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại');
                }
                throw new Error('Đã có lỗi xảy ra, vui lòng thử lại sau');
            })
            .catch((err) => {
                // eslint-disable-next-line no-console

                toastError(err.message);
            });
    };
    const fetchQuestions = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        await questionApi
            .getAllProcessing()
            .then((res) => {
                setLoading(false);

                if (res.data.code === 200) {
                    setQuestions(res.data.data);
                    return;
                }
                if (res.data.code === 400) {
                    navigate('/home');
                    throw new Error('Phiên làm việc đã hết hạn, vui lòng đăng nhập lại');
                }
                throw new Error('Đã có lỗi xảy ra, vui lòng thử lại sau');
            })
            .catch((err) => {
                setLoading(false);
                // eslint-disable-next-line no-console

                toastError(err.message);
            });
    };
    // handle for scroll
    const onScroll = (e, height) => {
        const currentScroll = Math.floor(e.currentTarget.scrollHeight - e.currentTarget.scrollTop);
        if (currentScroll === height) {
            fetchQuestions();
        }
    };
    // handle for modal
    const handleAnswerModal = async () => {
        const commentData = {
            authorEmail: 'nghiane@gmail.com',
            content: answer,
            questionId: selectedQuestion,
        };
        // todo: call api for answer question
        if (answer.length > 0) {
            // create comment
            // approve question when comment successfully
            await questionApi
                .approve(selectedQuestion)
                .then(async (res) => {
                    if (res.data.code === 200) {
                        await commentApi.create(commentData).then(async (response) => {
                            if (response.data.code === 200) {
                                toastSuccess('Trả lời thành công');
                                fetchComment();
                                fetchQuestions();
                                return;
                            }
                            if (response.data.code === 400) {
                                //Todo: navigate to login;
                                navigate('/home');
                                throw new Error(
                                    'Phiên làm việc đã hết hạn, vui lòng đăng nhập lại'
                                );
                            }
                            throw new Error('Đã có lỗi xảy ra, vui lòng thử lại sau');
                        });
                        return;
                    }
                    if (res.data.code === 400) {
                        navigate('/home');
                    }
                    throw new Error(res.data.message);
                })

                .catch((err) => {
                    // eslint-disable-next-line no-console

                    toastError(err.message);
                });

            setIsAnswerModalOpen(false);
        } else {
            toastWarning('Vui lòng nhập câu trả lời');
        }
        setAnswer('');
        setSelectedQuestion('');
    };
    const handleModalCancel = () => {
        setIsAnswerModalOpen(false);
    };
    // handle for button
    const answersQuestion = (id) => {
        setSelectedQuestion(id);
        setIsAnswerModalOpen({
            ...isAnswerModalOpen,
            answerModal: true,
        });
    };
    const reportQuestion = (id) => {
        Modal.confirm({
            ...questionConfig.confirmModal,
            onOk: async () => {
                await questionApi
                    .report(id)
                    .then((res) => {
                        if (res.data.code === 200) {
                            Modal.success(questionConfig.okModal);
                            fetchQuestions();
                            return;
                        }
                        if (res.data.code === 400) {
                            //Todo: navigate to login
                            navigate('/home');
                            throw new Error(res.data.message);
                        }
                    })
                    .catch((err) => {
                        // eslint-disable-next-line no-console

                        Modal.error(questionConfig.errorModal);
                    });
            },
        });
    };
    const calculateTime = (date) => {
        const countedDays = countDays(date.createdTime);
        if (countedDays === 0) {
            return 'Hôm nay';
        }
        return `${countedDays} ngày trước`;
    };
    useEffect(() => {
        fetchComment();
        fetchQuestions();
    }, []);

    return (
        <Wrapper>
            <Row gutter={30}>
                <Col xs={24} xl={14}>
                    <Title level={3}>CÂU HỎI CHỜ TRẢ LỜI </Title>
                    <List itemLayout="vertical">
                        <StyledContent key="main-list">
                            <VirtualList
                                data={questions}
                                height={questions.length !== 0 ? questionContainerHeight : 0}
                                itemHeight={300}
                                itemKey="id"
                                onScroll={(e) => onScroll(e, questionContainerHeight)}
                            >
                                {(item) => (
                                    <List.Item
                                        key={item.id}
                                        actions={[
                                            <ActionButton
                                                key="question-action-answer"
                                                type="primary"
                                                id={item.id}
                                                text="Trả lời"
                                                onClick={() => answersQuestion(item.id)}
                                            />,
                                            <ActionButton
                                                key="question-action-report"
                                                type="danger"
                                                id={item.id}
                                                text="Báo cáo vi phạm"
                                                onClick={() => reportQuestion(item.id)}
                                            />,
                                        ]}
                                        style={{ padding: '1.5rem' }}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={dummyAvatar[0]} />}
                                            title={item.title}
                                            description={item.authorEmail}
                                        />
                                        <Text key="item.email">{item.content}</Text>
                                    </List.Item>
                                )}
                            </VirtualList>
                            {!loading && questions.length === 0 && (
                                <Empty key="empty-data" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            )}
                            {loading && (
                                <Skeleton key="skeleton-list" avatar paragraph={{ rows: 4 }} />
                            )}
                        </StyledContent>
                    </List>
                </Col>
                <Col xs={24} xl={10}>
                    <Title level={3}>BÌNH LUẬN GẦN ĐÂY</Title>
                    <StyledContent height={945}>
                        <List
                            itemLayout="vertical"
                            dataSource={latestComments}
                            renderItem={(item) => (
                                <StyledContent hidePadding>
                                    <List.Item
                                        key={item.email}
                                        actions={[
                                            <IconText
                                                Icon={LikeOutlined}
                                                text="0"
                                                key="list-vertical-star-o"
                                            />,
                                            <IconText
                                                Icon={DislikeOutlined}
                                                text="0"
                                                key="list-vertical-like-o"
                                            />,
                                            // todo: add reply to comment
                                            // <Link to="/home" key="list-vertical-message">
                                            //     Reply to
                                            // </Link>,
                                        ]}
                                        style={{ padding: '1.5rem' }}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={dummyAvatar[0]} />}
                                            title={
                                                <CommentTitle
                                                    title={item.authorEmail}
                                                    time={calculateTime(item)}
                                                    content={item.content}
                                                />
                                            }
                                        />
                                    </List.Item>
                                </StyledContent>
                            )}
                        >
                            {/* todo: create a new loading for report list */}
                            {loading && (
                                <Skeleton
                                    key="skeleton-list-report"
                                    avatar
                                    paragraph={{ rows: 4 }}
                                />
                            )}
                        </List>
                    </StyledContent>
                </Col>
            </Row>
            <Modal
                title="Nhập câu trả lời"
                open={isAnswerModalOpen}
                onOk={handleAnswerModal}
                onCancel={handleModalCancel}
                confirmLoading={loading}
                footer={
                    <Row justify="center">
                        <StyledButton type="primary" onClick={handleAnswerModal}>
                            Gửi câu trả lời
                        </StyledButton>
                    </Row>
                }
            >
                <TextArea
                    showCount
                    maxLength={100}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder={'Ghi câu trả lời của bạn ở đây'}
                    rows={4}
                    autoSize={{ minRows: 4, maxRows: 4 }}
                />
            </Modal>
        </Wrapper>
    );
};

export default QuestionManagement;
