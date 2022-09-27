import { useState, useEffect } from 'react';

import { Row, Col, Typography } from 'antd';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch } from 'react-redux';
import { Navigate, useParams, useSearchParams, useLocation } from 'react-router-dom';

import { approveButton, disableButton, hiddenButton, ActionElements } from './configComponent';

import { actions as reducerButton } from '@/components/Button/slice/index';
import StyledContainer from '@/components/Container';
import { Wrapper } from '@/routes/Blog/Detail/style';
import { themes } from '@/theme/theme';
import { DUMMY_CONTENT } from '@/utils/dummy.js';

const { Text } = Typography;

const BlogDetailComponent = () => {
    //router variable
    const params = useParams();
    const location = useLocation();
    const [searchParams] = useSearchParams(location);
    const currentAction = searchParams.get('action') || '';
    const data = DUMMY_CONTENT[params.key - 1] ? DUMMY_CONTENT[params.key - 1].content : '';
    // Global state
    const dispatch = useDispatch();
    // Local variable
    const content = htmlToDraft(data);
    const contentState = ContentState.createFromBlockArray(content.contentBlocks);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(contentState)
    );
    useEffect(() => {
        // check action type to change button
        switch (currentAction) {
            case 'approve':
                dispatch(reducerButton.changeButtons(approveButton));
                break;
            case 'hidden':
                dispatch(reducerButton.changeButtons(hiddenButton));
                break;
            default:
                dispatch(disableButton);
        }
    }, [location]);
    //TODO: routing to blog when finish
    // If out of data
    if (currentAction === '' || data === '' || !currentAction.match(/[(approve),(hidden)]/g)) {
        dispatch(reducerButton.changeButtons(disableButton));
        return <Navigate to="/" />;
    }
    return (
        <Wrapper>
            <Row align="top" justify="center" gutter={17}>
                <Col span={currentAction === 'hidden' ? 20 : 24}>
                    <StyledContainer>
                        <Editor
                            editorState={editorState}
                            toolbarHidden={true}
                            onChange={setEditorState}
                            readOnly="false"
                        />
                    </StyledContainer>
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
