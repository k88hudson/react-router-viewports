var createRoutesFromReactChildren = require('react-router/lib/createRoutesFromReactChildren');
var PathUtils = require('react-router/lib/PathUtils');
var React = require('react');

function getRoutes(router, basePath) {
  basePath = basePath || '/';
  var result = [];
  var routes = createRoutesFromReactChildren(router)[0];

  function getPaths(node, routerEl, basePath) {
    if (node.childRoutes && node.childRoutes.length) {
      // We use React.Children because this data structure could be an array
      // of elements or an object
      React.Children.forEach(routerEl.props.children, (childEl, i) => {
        getPaths(node.childRoutes[i], childEl, node.path)
      });
    } else if (!node.isNotFound && !node.paramNames.length) {
      result.push(node.path);
    } else if (node.paramNames.length && routerEl.props && routerEl.props.validParams) {
      routerEl.props.validParams.forEach(paramVals => {
        result.push(PathUtils.injectParams(node.path, paramVals));
      });
    }
  }
  getPaths(routes, router, basePath);
  return result;
}

module.exports = getRoutes;
