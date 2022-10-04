import { Avatar as _Avatar, Modal as _Modal, Button, Slider } from 'antd';
import AvatarEditor from 'react-avatar-editor';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { actions } from '../../slice';
import selector from '../../slice/selectors';

import getGutter from '@/utils/getGutter';
import {
    RedoOutlined,
    UndoOutlined,
    CameraOutlined,
    ZoomOutOutlined,
    ZoomInOutlined,
} from '@ant-design/icons';

const Modal = styled(_Modal)`
    .icon-wrapper {
        position: relative;
        padding: 0px 24px;

        &.flip {
            transform: scaleY(-1);
        }

        & .anticon {
            position: absolute;
            top: -2px;
            width: 16px;
            height: 16px;
            font-size: 16px;
            line-height: 1;

            &:first-child {
                left: 0;
            }
            &:last-child {
                right: 0;
            }
        }
    }

    .sliders {
        margin-top: 24px;
    }

    .container {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: #f2f2f2;
        border: 2px;

        canvas {
            margin: 0 auto;
            display: block;
        }
    }
`;

const Avatar = () => {
    const avatar = useSelector(selector.avatar);
    const modal_avatar = useSelector(selector.modal.avatar);
    const zoom = useSelector(selector.zoom);
    const rotate = useSelector(selector.rotate);

    let editor = null;

    const dispatch = useDispatch();

    const handleOk = () => {
        dispatch(actions.modal_avatar(false));

        if (editor) {
            const canvas = editor.getImage().toDataURL();

            fetch(canvas)
                .then((res) => res.blob())
                .then((blob) => dispatch(actions.setAvatar(window.URL.createObjectURL(blob))));
        }
    };

    const handleCancel = () => {
        dispatch(actions.modal_avatar(false));
    };

    const handleRotate = (value) => {
        dispatch(actions.setRotate(value));
    };

    const handleZoom = (value) => {
        dispatch(actions.setZoom(value));
    };

    const handleClick = () => {
        handleRotate(0);
        handleZoom(1);
        dispatch(actions.modal_avatar(true));
    };

    const handleMouseWheel = (e) => {
        const value = zoom - e.deltaY / 1000;
        if (value < 1) {
            return handleZoom(1);
        }
        if (value > 3) {
            return handleZoom(3);
        }
        return handleZoom(value);
    };

    const setEditorRef = (_editor) => (editor = _editor);

    return (
        <>
            <div className="avatar">
                <Button className="overlay" onClick={handleClick}>
                    <CameraOutlined style={{ color: '#fff', fontSize: getGutter(2) }} />
                </Button>
                <_Avatar size={160} src={avatar}></_Avatar>
            </div>
            <Modal
                destroyOnClose={true}
                title="Đổi ảnh đại điện"
                open={modal_avatar}
                onOk={handleOk}
                onCancel={handleCancel}
                centered={true}
                maskClosable={false}
            >
                <div className="container">
                    <AvatarEditor
                        ref={setEditorRef}
                        onWheel={handleMouseWheel}
                        backgroundColor="#f2f2f2"
                        image={avatar}
                        width={320}
                        height={320}
                        border={0}
                        borderRadius={160}
                        color={[255, 255, 255, 0.7]}
                        scale={zoom}
                        rotate={rotate}
                        crossOrigin="anonymous"
                    />
                </div>
                <div className="sliders">
                    <div className="icon-wrapper flip">
                        <RedoOutlined />
                        <Slider value={rotate} min={0} max={360} onChange={handleRotate} />
                        <UndoOutlined />
                    </div>
                    <div className="icon-wrapper sliders">
                        <ZoomOutOutlined />
                        <Slider value={zoom} step={0.1} min={1} max={3} onChange={handleZoom} />
                        <ZoomInOutlined />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Avatar;
