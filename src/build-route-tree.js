var createRoutesFromReactChildren = require('react-router/lib/createRoutesFromReactChildren');

function getRoutes(router, basePath) {
  var result = [];
  var routes = createRoutesFromReactChildren(router)[0];
  function getPaths(node, basePath) {
    if (node.childRoutes) {
      node.childRoutes.forEach(child => getPaths(child, basePath + node.path));
    } else if (node.isDefault) {
      result.push(basePath);
    } else if (node.paramNames.length) {
      console.log('Cannot yet handle params ' + node.paramNames);
    } else if (!node.isNotFound) {
      result.push(basePath + node.path);
    }
  }
  getPaths(routes, basePath);
  return result;
}

module.exports = getRoutes;
