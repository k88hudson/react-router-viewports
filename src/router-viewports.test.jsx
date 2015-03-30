var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var should = require('should');

var {router, urls} = require('../tests/sample-router.jsx');
var RouterViewports = require('./router-viewports.jsx');

// Test device
var nexus = {
  id: 'nexus',
  label: 'Nexus 4',
  width: 384,
  height: 640
};

describe('RouterViewports', () => {
  it('should create a RouterViewports instance from a router', () => {
    var instance = TestUtils.renderIntoDocument(
      <RouterViewports baseUrl={'/sample/#/'} routes={router} devices={['mobile', 'desktop']} />
    );
    should(instance).be.an.instanceOf(RouterViewports);
  });
  it('should create a RouterViewports instance from an Array of ', () => {
    var instance = TestUtils.renderIntoDocument(
      <RouterViewports baseUrl={'/sample/#/'} urls={urls} devices={['mobile', 'desktop']} />
    );
    should(instance).be.an.instanceOf(RouterViewports);
  });
});
