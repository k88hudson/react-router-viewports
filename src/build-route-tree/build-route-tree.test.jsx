var React = require('react');
var {NotFoundRoute, Route, DefaultRoute} = require('react-router');
var buildRouteTree = require('./build-route-tree');
var should = require('should');

var Page = React.createClass({
  render: () => {
    return (<div></div>);
  }
});

var testRoutes = (<Route handler={Page}>
  <DefaultRoute name="main" handler={Page} />
  <NotFoundRoute name="fourohfour" handler={Page} />
  <Route name="skipme" path="skipme/:blah" handler={Page} />
  <Route name="name" path="name/:first/:last" validParams={[{first: 'kate', last: 'hudson'}]}  handler={Page} />
  <Route name="animals" handler={Page}>
    <DefaultRoute name="animalsMain" handler={Page} />
    <Route name="dogs" path="dogs/:breed/:color" validParams={[{breed: 'dachshund', color: 'red'}]} handler={Page}/>
  </Route>
</Route>);

var testRoutesOutput = [
  '/',
  '/name/kate/hudson',
  '/animals',
  '/animals/dogs/dachshund/red'
];

describe('buildRouteTree', () => {
  describe('general', () => {
    var result = buildRouteTree(testRoutes);
    it('should include DefaultRoute', () => {
      should(result).containEql('/');
      should(result).containEql('/animals');
    });
    it('should skip NotFoundRoute', () => {
      should(result).not.containEql('/fourohfour');
    });
    it('should match expected output URLs', () => {
      should(result.length).be.equal(testRoutesOutput.length);
      result.forEach(url => should(testRoutesOutput).containEql(url));
    });
  });
  describe('param routes', () => {
    var paramResults = buildRouteTree(testRoutes);
    it('should skip param routes without validParams', () => {
      should(paramResults).not.containEql('/skipme/:blah');
    });
    it('should throw if a param is missing from a validParam defn', () => {
      var invalidTest = (<Route handler={Page}>
        <Route name="name" path="name/:first/:last" validParams={[{last: 'hudson'}]}  handler={Page} />
      </Route>);
      (() => {
        buildRouteTree(invalidTest);
      }).should.throw('Invariant Violation: Missing "first" parameter for path "/name/:first/:last"');
    });
    it('should include routes with validParams', () => {
      should(paramResults).containEql('/animals/dogs/dachshund/red');
    });
  });
});

