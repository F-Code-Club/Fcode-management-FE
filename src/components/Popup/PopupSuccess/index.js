import { Button } from 'antd';

import { ContainerPopup, ContentPopup, LayerPopup, Popup } from './style';

import { CheckCircleTwoTone } from '@ant-design/icons';

export const PopupSuccess = (props) => {
    const action = props.action;

    const handleClick = async () => {
        await action();
    };

    return (
        <ContainerPopup>
            <LayerPopup onClick={() => handleClick()} />
            <Popup>
                <CheckCircleTwoTone twoToneColor="#52C41A" className="icon-popup" />
                <ContentPopup>
                    <h3>{props.title}</h3>
                    <div>
                        <Button onClick={() => handleClick()}>{props.buttonValue}</Button>
                    </div>
                </ContentPopup>
            </Popup>
        </ContainerPopup>
    );
};
