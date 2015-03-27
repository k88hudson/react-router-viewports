# Viewport Tests

## Get started

```
npm install
npm test
```

## Usage

```jsx
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
```

```jsx
var ViewportTest = require('react-viewport-test');
var nexus = {
  id: 'nexus',
  label: 'Nexus 4',
  width: 384,
  height: 640
};

<ViewportTest
  baseUrl={'http://localhost:4040'}
  routes={router}
  devices={['mobile', 'desktop', nexus]}
/>
```

![screenshot of output](https://k88hudson-screenshots.s3.amazonaws.com/screen-shots/k88mac@2x_2015-03-27_at_7.27.39_PM.png)
