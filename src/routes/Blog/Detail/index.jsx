import { useState, useEffect } from 'react';

import { Row, Col, Typography, Affix } from 'antd';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams, useLocation, Navigate, useNavigate } from 'react-router-dom';

import { changeBlog } from '../slice';
// import articleApi from '@/utils/apiComponents/articleApi';
// import { getGutter } from '@/utils/getGutter';
import { selectCurrentBlog } from './../slice/selector';
import { disableButton, ActionElements, processingButton, activeButton } from './configComponent';

import { actions as reducerButton } from '@/components/Button/slice/index';
import StyledContainer from '@/components/Container';
import { actions as titleHeaderActions } from '@/components/PageHeader/slice/index';
import { toastError } from '@/components/ToastNotification';
import { Wrapper } from '@/routes/Blog/Detail/style';
import { themes } from '@/theme/theme';

const { Text, Title } = Typography;

const BlogDetailComponent = () => {
    // Get current action (processing, active, inactive)
    const location = useLocation();
    const [searchParams] = useSearchParams(location);
    const [articleData, setArticleData] = useState({});
    const article = useSelector(selectCurrentBlog);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Get id of blog
    const params = useParams();
    const currentAction = searchParams.get('action');
    const articleId = parseInt(params.id) || 0;
    const [editorState, setEditorState] = useState();

    useEffect(() => {
        const getArticle = () => {
            const data = article[currentAction].find((item) => item.id === articleId);
            if (data === undefined) {
                return navigate('/blog');
            }
            dispatch(titleHeaderActions.changeTitle(data.title));
            setArticleData(data);
            dispatch(changeBlog(data));
            try {
                const content = htmlToDraft(JSON.parse(data.content));
                setEditorState(
                    EditorState.createWithContent(
                        ContentState.createFromBlockArray(content.contentBlocks)
                    )
                );
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log(e);
                toastError('Lỗi khi tải nội dung bài viết, vui lòng liên hệ quản trị viên');
            }
        };
        getArticle();
    }, []);

    //TODO: routing to blog when finish
    // Handle change button in header
    if (
        currentAction === '' ||
        // data.content === '' ||
        !currentAction.match(/[(processing),(active),(inactive)]/g)
    ) {
        dispatch(reducerButton.changeButtons(disableButton));
        return <Navigate to="/" />;
    } else {
        switch (currentAction) {
            case 'processing':
                dispatch(
                    reducerButton.changeButtons({
                        ...processingButton,
                        articleId: article.currentBlog.id,
                    })
                );
                break;
            case 'active':
                dispatch(
                    reducerButton.changeButtons({
                        ...activeButton,
                        articleId: articleData.id,
                    })
                );
                break;
            case 'inactive':
                dispatch(reducerButton.changeButtons(disableButton));
                break;
            default:
            // dispatch(disableButton);
        }
    }
    return (
        <Wrapper>
            <Row align="top" justify="center" gutter={17} style={{ width: '100%' }}>
                <Col span={currentAction === 'active' ? 16 : 20}>
                    <StyledContainer>
                        <Row align="center">
                            <Title level={2}>{articleData.title}</Title>
                        </Row>
                        <Editor
                            editorState={editorState}
                            toolbarHidden={true}
                            onChange={setEditorState}
                            editorStyle={{
                                overflow: 'hidden',
                            }}
                            readOnly="false"
                        />
                    </StyledContainer>
                </Col>
                {currentAction === 'active' && (
                    <Col align="middle" xxl={1} xs={2}>
                        <Affix offsetTop={10}>
                            <StyledContainer padding="1.2rem 1rem">
                                <Row gutter={[0, 32]}>
                                    {ActionElements.map((item, index) => (
                                        <Col
                                            key={item.name + index}
                                            className="gutter-row"
                                            span={24}
                                            align="middle"
                                            style={{ display: 'flex', flexDirection: 'column' }}
                                        >
                                            <item.Element
                                                style={{
                                                    color: themes.colors.primary,
                                                    fontSize: '1.4rem',
                                                }}
                                            />
                                            <Text>0</Text>
                                        </Col>
                                    ))}
                                </Row>
                            </StyledContainer>
                        </Affix>
                    </Col>
                )}
            </Row>
        </Wrapper>
    );
};

export default BlogDetailComponent;
