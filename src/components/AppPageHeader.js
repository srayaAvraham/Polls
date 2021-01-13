import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import { PageHeader,Button } from 'antd';
export function AppPageHeader({ path, title, subTitle, extra }) {
    const history = useHistory();
    return (
        <PageHeader
            className="site-page-header"
            onBack={path ? () => history.push(`${path}`) : null}
            title={title}
            subTitle={subTitle}
            extra={extra ? [extra]: null}
        />
    );
};