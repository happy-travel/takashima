import { notification } from 'antd';

export const notifications = (message, state) => {
    notification.open({
        message,
        icon:
            state === 'success' ? (
                <span className="icon icon-success" />
            ) : state === 'failed' ? (
                <span className="icon icon-failed" />
            ) : (
                <span className="icon icon-information" />
            ),
        className: `notification notification-${state}`,
    });
};
