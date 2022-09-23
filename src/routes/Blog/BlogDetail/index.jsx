import { useState } from 'react';

import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';

import { Wrapper } from '@/routes/Blog/BlogDetail/style';
import dummy from '@/utils/dummy.json';

const BlogDetailComponent = () => {
    const content = htmlToDraft(dummy.content);
    const contentState = ContentState.createFromBlockArray(content.contentBlocks);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(contentState)
    );

    console.log(content.contentBlocks);

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
