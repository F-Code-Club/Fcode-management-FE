import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const EditorStateToHTML = (editorState) => {
    return JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent())));
};

const HTMLToEditorState = (html) => {
    return EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(JSON.parse(html)).contentBlocks)
    );
};

export { EditorStateToHTML, HTMLToEditorState };
