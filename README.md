# Viewport Tests

## Get started

```
npm install
npm test
```

## Usage

```jsx
var ViewportTest = require('react-viewport-test');

var router = (
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

<ViewportTest baseUrl={'http://localhost:4040'} routes={router} devices={['mobile', 'desktop']} />
```
