import { useState, useEffect } from 'react';

import { List, Row, Col, Typography, Modal, Input, Avatar, Empty, Skeleton } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Link, useNavigate } from 'react-router-dom';

import StyledButton from './../../components/Button/index';
import { toastError, toastSuccess, toastWarning } from './../../components/ToastNotification/index';
import commentApi from './../../utils/apiComponents/commentApi';
import questionApi from './../../utils/apiComponents/questionApi';
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
                } else {
                    if (res.data.code === 400) {
                        navigate('/home');
                    }
                    throw new Error(res.data.message);
                }
            })
            .catch((err) => {
                setLoading(false);
                // eslint-disable-next-line no-console
                console.log(err);
                toastError('Đã có lỗi xảy ra, vui lòng thử lại sau');
            });
        //set latest comments
        setLatestComments(questions.slice(0, 4));
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
            id: 5,
            questionId: selectedQuestion,
        };
        // todo: call api for answer question
        if (answer.length > 0) {
            console.log(selectedQuestion);
            // create comment
            // approve question when comment successfully
            await questionApi
                .approve(selectedQuestion)
                .then(async (res) => {
                    console.log(res);
                    if (res.data.code === 200) {
                        await commentApi.create(commentData).then(async (response) => {
                            console.log(response);
                            if (response.data.code === 200) {
                                toastSuccess('Trả lời thành công');
                                fetchQuestions();
                                return;
                            }
                            if (response.data.code === 400) {
                                navigate('/home');
                            }
                            throw new Error(response.data.message);
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
                    console.log(err);
                    toastError('Đã có lỗi xảy ra, vui lòng thử lại sau');
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
                console.log(id);
                await questionApi
                    .report(id)
                    .then((res) => {
                        if (res.data.code === 200) {
                            Modal.success(questionConfig.okModal);
                            fetchQuestions();
                            return;
                        }
                        if (res.data.code === 400) {
                            navigate('/home');
                            throw new Error(res.data.message);
                        }
                    })
                    .catch((err) => {
                        // eslint-disable-next-line no-console
                        console.log(err);
                        Modal.error(questionConfig.errorModal);
                    });
            },
        });
    };
    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <Wrapper>
            <Row gutter={30}>
                <Col span={14}>
                    <Title level={3}>Câu hỏi chờ trả lời </Title>
                    <List itemLayout="vertical">
                        <StyledContent>
                            <VirtualList
                                data={questions}
                                height={questions.length !== 0 ? questionContainerHeight : 0}
                                itemHeight={300}
                                itemKey="email"
                                onScroll={(e) => onScroll(e, questionContainerHeight)}
                            >
                                {(item) => (
                                    <List.Item
                                        key={item.id}
                                        actions={[
                                            <ActionButton
                                                key="question-action-answer"
                                                type="primary"
                                                id={item.email}
                                                text="Trả lời"
                                                onClick={() => answersQuestion(item.id)}
                                            />,
                                            <ActionButton
                                                key="question-action-answer"
                                                type="danger"
                                                id={item.email}
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
                                        {/* TODO: change to content when calling api */}
                                        <Text>{item.content}</Text>
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
                <Col span={10}>
                    <Title level={3}>Bình luận gần đây </Title>
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
                                                text="156"
                                                key="list-vertical-star-o"
                                            />,
                                            <IconText
                                                Icon={DislikeOutlined}
                                                text="156"
                                                key="list-vertical-like-o"
                                            />,
                                            <Link to="/home" key="list-vertical-message">
                                                Reply to
                                            </Link>,
                                        ]}
                                        style={{ padding: '1.5rem' }}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={dummyAvatar[0]} />}
                                            title={
                                                <CommentTitle
                                                    title={item.authorEmail}
                                                    time="2 day ago"
                                                />
                                            }
                                        />
                                        {/* TODO: change to content when calling api */}
                                    </List.Item>
                                </StyledContent>
                            )}
                        ></List>
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
