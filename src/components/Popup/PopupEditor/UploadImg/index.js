import { useState } from 'react';

import { Modal, Upload } from 'antd';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

export const UploadImage = () => {
    const [imgList, setImgList] = useState([]);
    const [preview, setPreview] = useState({
        open: false,
        image: '',
        title: '',
    });

    const handleCancel = () =>
        setPreview({
            ...preview,
            open: false,
        });

    const onChange = ({ fileList: newFileList }) => {
        setImgList(newFileList);
    };

    const onPreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreview({
            open: true,
            image: file.url || file.preview,
            title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={imgList}
                onChange={onChange}
                onPreview={onPreview}
            >
                {imgList.length < 2 && '+ Upload'}
            </Upload>
            <Modal open={preview.open} title={preview.title} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={preview.image}
                />
            </Modal>
        </div>
    );
};
