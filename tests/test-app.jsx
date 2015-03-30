var React = require('react/addons');
var routes = require('./sample-router.jsx').router;
var Router = require('react-router');

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
