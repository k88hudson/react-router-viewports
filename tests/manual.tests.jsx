var React = require('react');
// This is essentially bulk require
var req = require.context('../src', true, /manual\.test\.jsx$/);
var manualTests = req.keys().map(file => req(file));

React.render(<div>
  {manualTests.map(Test => <Test />)}
</div>, document.getElementById('app'));
