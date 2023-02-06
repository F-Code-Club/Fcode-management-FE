import { useEffect, useState } from 'react';

import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { ContainerAnnounce, ContentAnnounce } from './styles';

import { get } from '@/utils/ApiCaller';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const ViewNotification = () => {
    const token = localStorage.getItem('token');
    // const { state } = useLocation();
    console.log('line 16:', location);
    const [state, setState] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        get(`/announcement/one/${id}`, '', { authorization: token })
            .then((item) => {
                if (item != null) {
                    setState(item.data.data);
                } else {
                    navigate('/notifications');
                }
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
    }, [id]);

    const getContentEditorState = (item) => {
        try {
            return EditorState.createWithContent(
                ContentState.createFromBlockArray(htmlToDraft(JSON.parse(item)).contentBlocks)
            );
        } catch (error) {
            return EditorState.createEmpty();
        }
    };

    return (
        <ContainerAnnounce>
            {state && (
                <ContentAnnounce>
                    <h1 className="title">{state.title}</h1>
                    <Editor
                        editorState={getContentEditorState(state.description)}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        readOnly
                        style={{ 'text-align': 'justify' }}
                        toolbarHidden
                    />
                </ContentAnnounce>
            )}
        </ContainerAnnounce>
    );
};
