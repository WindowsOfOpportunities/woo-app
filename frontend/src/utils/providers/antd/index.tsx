
import { Modal, ConfigProvider as Wrapper, message, notification } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { HookAPI } from 'antd/es/modal/useModal';
import { NotificationInstance } from 'antd/es/notification/interface';
import { JSX, createContext } from 'react';


type AntContext = { messageApi: MessageInstance, notificationApi: NotificationInstance, modalApi: HookAPI };
export const AntContext = createContext<AntContext>({} as AntContext);

interface ConfigProviderProps {
    children: JSX.Element;
}

const AntdConfigProvider = ({ children }: ConfigProviderProps) => {
    const [messageApi, messageHolder] = message.useMessage();
    const [notificationApi, notificationHolder] = notification.useNotification();
    const [modalApi, modalHolder] = Modal.useModal();

    return (
        <Wrapper
        >
            {messageHolder}
            {notificationHolder}
            {modalHolder}
            <AntContext.Provider value={{ messageApi, notificationApi, modalApi }}>{children}</AntContext.Provider>
        </Wrapper>
    );
};

export default AntdConfigProvider;
