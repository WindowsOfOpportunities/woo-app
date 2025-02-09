import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you are looking for does not exist."
            extra={
                <Link to="/">
                    <Button color="default" variant="solid" >Back to Home</Button>
                </Link>
            }
        />
    );
};

export default NotFoundPage;
