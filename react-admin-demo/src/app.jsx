import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Button } from 'element-react';
import 'element-theme-default';
import './style.css';
import './style.scss';

class A extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props.match.path)
    return <div>
      Component A
      <Switch>
        <Route exact path={`${this.props.match.path}`} render={(route) => {
          return <div>当前组件是不带参数的A</div>
        }} />
        <Route path={`${this.props.match.path}/sub`} render={(route) => {
          return <div>当前组件是Sub</div>
        }} />
        <Route path={`${this.props.match.path}/:id`} render={(route) => {
          return <div>当前组件是带参数的A, 参数是：{route.match.params.id}</div>
        }} />
      </Switch>
    </div>
  }
}
class B extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>Component B</div>
  }
}
class Wrapper extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>
      <Link to="/a">A</Link> <br/>
      <Link to="/a/123">A</Link><br/>
      <Link to="/b">B</Link><br/>
      <Link to="/a/sub">sub</Link><br/>
      {this.props.children}
    </div>
  }
}

ReactDOM.render(
  <Router>
    <Wrapper>
      <Route path="/a" component={A} />
      <Route path="/b" component={B} />
    </Wrapper>
  </Router>,
  document.getElementById('app')
);