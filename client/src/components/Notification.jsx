import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

const Notification = () => {
    const notificationMessage = useSelector(({ notification }) => notification);

    if (!notificationMessage) {
        return;
    }

    return (
        <Alert className="mt-4" variant="danger">
            {notificationMessage}
        </Alert>
    );
};

export default Notification;
