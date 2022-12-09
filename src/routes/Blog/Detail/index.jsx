import { useState, useEffect } from 'react';

import { Row, Col, Typography } from 'antd';
import { EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';

import { disableButton, ActionElements } from './configComponent';

import { actions as reducerButton } from '@/components/Button/slice/index';
import StyledContainer from '@/components/Container';
import { Wrapper, InfoList, InfoItem } from '@/routes/Blog/Detail/style';
import { themes } from '@/theme/theme';
import articleApi from '@/utils/apiComponents/articleApi';

// import { getGutter } from '@/utils/getGutter';

const { Text } = Typography;

const BlogDetailComponent = () => {
    //router variable
    const params = useParams();
    const location = useLocation();
    const [searchParams] = useSearchParams(location);
    const currentAction = searchParams.get('action') || '';
    const articleId = parseInt(params.id) || 0;

    const dispatch = useDispatch();

    const [editorState, setEditorState] = useState();

    useEffect(() => {
        (async () => {
            const { data } = await articleApi.getArticleById(articleId);
            console.log(data);
            setEditorState(
                EditorState.createWithContent(convertFromRaw(JSON.parse(data.data.content)))
            );
        })();
    }, []);

    //TODO: routing to blog when finish
    // If out of data
    if (
        currentAction === '' ||
        // data.content === '' ||
        !currentAction.match(/[(processing),(active),(inactive)]/g)
    ) {
        dispatch(reducerButton.changeButtons(disableButton));
        // return <Navigate to="/" />;
    } else {
        // switch (currentAction) {
        //     case 'processing':
        //         if (!data.isApprove) {
        //             return <Navigate to="/blog" />;
        //         }
        //         dispatch(reducerButton.changeButtons(approveButton));
        //         break;
        //     case 'active':
        //         if (data.isApprove) {
        //             return <Navigate to="/blog" />;
        //         }
        //         dispatch(reducerButton.changeButtons(hiddenButton));
        //         break;
        //     case 'inactive':
        //         if (!data.isDeclined) {
        //             return <Navigate to="/blog" />;
        //         }
        //         break;
        //     default:
        //         dispatch(disableButton);
        // }
    }
    return (
        <Wrapper>
            <Row align="top" justify="center" gutter={17}>
                <Col span={currentAction === 'hidden' ? 20 : 16}>
                    <StyledContainer>
                        <Editor
                            editorState={editorState}
                            toolbarHidden={true}
                            onChange={setEditorState}
                            readOnly="false"
                        />
                    </StyledContainer>
                </Col>
                <Col>
                    <InfoList>
                        <InfoItem>Trạng thái: Đã được duyệt</InfoItem>
                        <InfoItem>Ngày tạo: 24.05.2019</InfoItem>
                        <InfoItem>Ngày đăng: 24.05.2019</InfoItem>
                        <InfoItem>Thể loại: F-Code, Tách file, ngôn ngữ C</InfoItem>
                    </InfoList>
                </Col>
                {currentAction === 'hidden' && (
                    <Col align="middle">
                        <StyledContainer padding="1.2rem 0">
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
                                        <Text>12</Text>
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
