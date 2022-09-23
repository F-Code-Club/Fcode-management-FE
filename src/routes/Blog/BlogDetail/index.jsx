import { useState } from 'react';

import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';

import { Wrapper } from '@/routes/Blog/BlogDetail/style';
import { DUMMY_CONTENT } from '@/utils/dummy.js';

const BlogDetailComponent = () => {
    const content = htmlToDraft(DUMMY_CONTENT.content);
    const contentState = ContentState.createFromBlockArray(content.contentBlocks);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(contentState)
    );

    return (
        <Wrapper>
            <Editor
                editorState={editorState}
                toolbarHidden={true}
                onChange={setEditorState}
                readOnly="false"
            />
        </Wrapper>
    );
};

export default BlogDetailComponent;
