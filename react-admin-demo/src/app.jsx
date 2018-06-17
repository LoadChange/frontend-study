import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'element-theme-default';
import 'cube.css/src/scss/neat.scss'
import Layout from 'component/layout/index.jsx';
import Login from 'page/login/index.jsx';
import Home from 'page/home/index.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={
            props => (
              <Layout>
                <Switch>
                  <Route path="/" component={Home} />
                </Switch>
              </Layout>
            )
          } />
        </Switch>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);