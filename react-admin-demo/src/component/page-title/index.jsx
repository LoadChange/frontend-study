import React from 'react';
import { Breadcrumb } from 'element-react';

class PageTitle extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="main-title">{this.props.title}</div>
                {this.props.children}
            </div>
        );
    }
}

export default PageTitle;