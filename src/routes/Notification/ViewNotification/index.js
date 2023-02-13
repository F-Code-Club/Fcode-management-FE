import { useEffect, useState } from 'react';

import { Avatar } from 'antd';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { ContainerAnnounce, ContentAnnounce } from './styles';

import { get } from '@/utils/ApiCaller';
import memberApi from '@/utils/apiComponents/memberApi';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const ViewNotification = () => {
    const token = localStorage.getItem('token');
    // const { state } = useLocation();
    const [member, setMember] = useState();
    const [state, setState] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const calculateLiveTime = (createdTime) => {
        const currentTime = moment();

        const diff = moment.duration(currentTime.diff(createdTime));
        if (diff.asHours() >= 24) {
            return diff.humanize();
        }
        return createdTime ? diff.humanize() : currentTime.fromNow();
    };
    const getMember = async (id) => {
        await memberApi.getMemberByMemberId(id).then((member) => {
            setMember(member.data.data);
        });
    };
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
    useEffect(() => {
        if (state) {
            getMember(state?.memberId);
        }
    }, [state]);
    const getContentEditorState = (item) => {
        try {
            return EditorState.createWithContent(
                ContentState.createFromBlockArray(htmlToDraft(item).contentBlocks)
            );
        } catch (error) {
            return EditorState.createEmpty();
        }
    };

    return (
        <ContainerAnnounce>
            {state && (
                <ContentAnnounce>
                    <div className="InfoAnnounce">
                        <div className="infoMember">
                            <Avatar src={member?.avatarUrl} alt="" size="large" />
                            <span>{member?.lastName + ' ' + member?.firstName}</span>
                        </div>
                        <span className="liveTime">
                            Gửi vào lúc {calculateLiveTime(state.createdTime)} trước
                        </span>
                    </div>
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
