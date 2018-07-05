import React from 'react';
import { Breadcrumb } from 'element-react';

class PageTitle extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="page-title">
                <div className="main-title">{this.props.title}</div>
                <div className="title-right">{this.props.children}</div>
            </div>
        );
    }
}

export default PageTitle;