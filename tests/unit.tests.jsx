var req = require.context('../src', true, /test\.jsx$/);
req.keys().forEach(function (file) {
  req(file);
});
