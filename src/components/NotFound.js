import { Result, Button } from 'antd';
import { Link } from "react-router-dom";
export function NotFound() {
    return (<Result
        status="404"
        title="404"
        subTitle="Sorry, the poll does not exist."
        extra={<Button type="primary"><Link to={'/'} >
            Back Home
    </Link></Button>
        }
    />)
}
