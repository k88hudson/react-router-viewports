var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute} = Router;

var Page = React.createClass({
  render: function () {
    return (<div></div>);
  }
});

var routes = (
  <Route handler={Page} path="/react">
    <Route name="docs" path="/docs" handler={Page}>
      <Route name="getting-started" path="/getting-started.html" handler={Page}/>
      <Route name="tutorial" path="/tutorial.html" handler={Page}/>
    </Route>
    <Route name="support" path="/support.html" handler={Page}/>
    <Route name="test" path="/test/:foo" handler={Page}/>
    <DefaultRoute name="home" handler={Page}/>
  </Route>
);

module.exports = routes;
