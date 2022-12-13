import { useEffect, useState } from 'react';

import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate, useParams } from 'react-router-dom';

import { ContainerAnnounce, ContentAnnounce } from './style';

import { get } from '@/utils/ApiCaller';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const ViewAnnouncement = () => {
    const token = localStorage.getItem('token');
    const [state, setState] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        get(`/announcement/one/${id}`, '', { authorization: token })
            .then((item) => {
                if (item != null) {
                    setState(item.data.data);
                } else {
                    navigate('/manage-announcement');
                }
            })
            .catch((error) => console.log(error));
    }, [id]);

    return (
        <ContainerAnnounce>
            {state && (
                <ContentAnnounce>
                    <h1 className="title">{state.title}</h1>
                    <Editor
                        editorState={EditorState.createWithContent(
                            ContentState.createFromBlockArray(
                                htmlToDraft(JSON.parse(state.description)).contentBlocks
                            )
                        )}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        readOnly
                        style={{ 'text-align': 'justify' }}
                        toolbar={{
                            options: [],
                        }}
                    />
                </ContentAnnounce>
            )}
        </ContainerAnnounce>
    );
};
