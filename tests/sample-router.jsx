var React = require('react/addons');
var {NotFoundRoute, Route, DefaultRoute} = require('react-router');
var RouterViewports = require('../src/router-viewports.jsx');

// Test Router
var Page = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    return (<div>Hello world</div>);
  }
});

var NotFound = React.createClass({
  render: function () {
    return (<div>Not Found</div>);
  }
});

var testRouter = (<Route>
  <Route name="skipme" path="skipme/:blah" handler={Page} />
  <Route name="name" path="name/:first/:last" validParams={[{first: 'kate', last: 'hudson'}]}  handler={Page} />
  <Route name="animals" handler={Page}>
    <DefaultRoute name="animalsMain" handler={Page} />
    <Route name="dogs" path="dogs/:breed/:color" validParams={[{breed: 'dachshund', color: 'red'}]} handler={Page}/>
  </Route>
  <DefaultRoute name="main" handler={Page} />
  <NotFoundRoute name="fourohfour" handler={NotFound} />
</Route>);

var testRouterOutput = [
  '/',
  '/name/kate/hudson',
  '/animals',
  '/animals/dogs/dachshund/red'
];

module.exports = {
  router: testRouter,
  urls: testRouterOutput
};
