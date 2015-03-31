# React Router Viewports

Use this to create viewport manual tests from your React router or a list of urls.

![screenshot of output](https://k88hudson-screenshots.s3.amazonaws.com/screen-shots/k88mac@2x_2015-03-27_at_7.27.39_PM.png)

## Usage
```jsx
var RouterViewports = require('react-router-viewports');
<RouterViewports routes={routes} />
<RouterViewports urls={['/', '/foo', '/bar']} devices={['mobile', 'desktop']} />
```

## Complete Example
```jsx
var router = (
  <Route path="/react">
    <Route name="docs" handler={Page}>
      <Route name="getting-started" path="getting-started.html" handler={Page}/>
      <Route name="tutorial" path="tutorial.html" handler={Page}/>
    </Route>
    <Route name="support" path="support.html" handler={Page}/>
    <Route name="test" path="test/:foo" handler={Page}/>
    <DefaultRoute name="home" handler={Page}/>
  </Route>
);
```

```jsx
var RouterViewports = require('react-router-viewports');
var nexus = {
  id: 'nexus',
  label: 'Nexus 4',
  width: 384,
  height: 640
};

<RouterViewports

  // Defaults to /
  baseUrl={'http://localhost:4040'}

  // You can also pass in an array of urls:
  // urls={['/', '/foo', '/bar']}
  routes={router}

  // Defaults to mobile, mobile-large, tablet, desktop
  devices={['mobile', 'desktop', nexus]}

  // Defaults to 20
  gutter={20}

/>
```

```css

/* Add clearfix to .device-set */
.device-set:before,
.device-set:after {
  content: " ";
  display: table;
}
.device-set:after {
  clear: both;
}

.device-test {
  float: left;
}
.device-test iframe {
  border: 1px solid #CCC;
}
```

## Development

```
npm install
npm test - [runs tests]
npm test:browser - [runs a server/tests in browser]
```

