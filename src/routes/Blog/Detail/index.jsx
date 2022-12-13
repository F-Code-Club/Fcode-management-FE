import { useState, useEffect } from 'react';

import { Row, Col, Typography } from 'antd';
import { EditorState, convertFromRaw } from 'draft-js';
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
            // todo make redux to main state for getting current data
            dispatch(changeBlog(data));
            setEditorState(
                EditorState.createWithContent(convertFromRaw(JSON.parse(data.content || '')))
            );
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
                // if (!data.isApprove) {
                //     return <Navigate to="/blog" />;
                // }
                dispatch(
                    reducerButton.changeButtons({
                        ...processingButton,
                        articleId: article.currentBlog.id,
                    })
                );
                break;
            case 'active':
                // if (data.isApprove) {
                //     return <Navigate to="/blog" />;
                // }
                dispatch(
                    reducerButton.changeButtons({
                        ...activeButton,
                        articleId: articleData.id,
                    })
                );
                break;
            case 'inactive':
                // if (!data.isDeclined) {
                //     return <Navigate to="/blog" />;
                // }
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
                            readOnly="false"
                        />
                    </StyledContainer>
                </Col>
                {currentAction === 'active' && (
                    <Col align="middle" span={1}>
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
                    </Col>
                )}
            </Row>
        </Wrapper>
    );
};

export default BlogDetailComponent;
