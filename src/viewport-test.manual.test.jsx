var React = require('react');
var ViewportTest = require('./viewport-test.jsx');
var router = require('../tests/sample-router.jsx');

var nexus = {
  id: 'nexus',
  label: 'Nexus 4',
  width: 384,
  height: 640
};

var ViewportTestManualTest = React.createClass({
  render: function () {
    return (<div className="container">
      <h1>Manual tests for ViewportTest component</h1>
      <ViewportTest baseUrl={'https://facebook.github.io'} routes={router} devices={['mobile', 'desktop']} />
      <ViewportTest baseUrl={'https://facebook.github.io'} routes={router} devices={[nexus]} />
    </div>);
  }
});

module.exports = ViewportTestManualTest;
