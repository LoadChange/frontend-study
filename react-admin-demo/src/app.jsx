import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom'
import 'element-theme-default';
import 'cube.css/src/scss/neat.scss'
import Layout from 'component/layout/index.jsx';
import Login from 'page/login/index.jsx';
import Home from 'page/home/index.jsx';
import User from 'page/user/index.jsx';
import Error from 'page/error/index.jsx';

class App extends React.Component {

    render() {
        let LayoutRoute = props => {
            return (<Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/user/index" component={User}/>
                    <Redirect exact from="/user" to="/user/index"/>
                    <Route component={Error}/>
                </Switch>
            </Layout>);
        }
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={props => LayoutRoute(props)}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);