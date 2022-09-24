import { useState } from 'react';

import { Row, Col, Typography } from 'antd';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';

import { selectActionButtons } from './../../../components/Button/slice/selector';

import StyledContainer from '@/components/Container';
import { Wrapper } from '@/routes/Blog/BlogDetail/style';
import { themes } from '@/theme/theme';
import { DUMMY_CONTENT } from '@/utils/dummy.js';
import { CommentOutlined, EyeOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ActionElements = [
    {
        name: 'view',
        Element: ({ ...rest }) => <EyeOutlined {...rest} />,
    },
    {
        name: 'like',
        Element: ({ ...rest }) => <LikeOutlined {...rest} />,
    },
    {
        name: 'share',
        Element: ({ ...rest }) => <ShareAltOutlined {...rest} />,
    },
    {
        name: 'comment',
        Element: ({ ...rest }) => <CommentOutlined {...rest} />,
    },
];

const BlogDetailComponent = () => {
    // Global state
    const dispatch = useDispatch();
    const actionButton = useSelector(selectActionButtons);

    console.log(dispatch, actionButton);
    // Local variable
    const content = htmlToDraft(DUMMY_CONTENT.content);
    const contentState = ContentState.createFromBlockArray(content.contentBlocks);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(contentState)
    );
    return (
        <Wrapper>
            <Row gutter={17}>
                <Col span={18}>
                    <StyledContainer>
                        <Editor
                            editorState={editorState}
                            toolbarHidden={true}
                            onChange={setEditorState}
                            readOnly="false"
                        />
                    </StyledContainer>
                </Col>
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
                                        style={{ color: themes.colors.primary, fontSize: '1.4rem' }}
                                    />
                                    <Text>12</Text>
                                </Col>
                            ))}
                        </Row>
                    </StyledContainer>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default BlogDetailComponent;
