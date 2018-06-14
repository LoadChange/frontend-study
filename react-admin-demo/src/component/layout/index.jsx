import React from 'react';
import HeaderNav from 'component/header-nav/index.jsx';
import LeftNav from 'component/left-nav/index.jsx';
import './style.scss'

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <HeaderNav />
                <div className="bd">
                    <LeftNav />
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Layout