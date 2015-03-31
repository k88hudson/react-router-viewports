var React = require('react');
var assign = require('react/lib/Object.assign');
var buildRouteTree = require('./build-route-tree/build-route-tree');
var Route = require('react-router').Route;

var DEVICES = {
  mobile: {
    label: 'Mobile',
    width: 320,
    height: 480
  },
  mobileLarge: {
    label: 'Mobile - large',
    width: 480,
    height: 640
  },
  tablet: {
    label: 'Tablet',
    width: 768,
    height: 1024
  },
  desktop: {
    label: 'Desktop',
    width: 1024,
    height: 768
  }
};

var DeviceTest = React.createClass({
  render: function () {
    return (<div className="device-test" style={{marginRight: this.props.gutter + 'px'}}>
      <h4>{this.props.label} - {this.props.width}x{this.props.height}</h4>
      <iframe src={this.props.url} style={{
        width: this.props.width + 'px',
        height: this.props.height + 'px',
      }}></iframe>
    </div>);
  }
});

var RouterViewports = React.createClass({
  propTypes: {
    baseUrl: React.PropTypes.string,
    routes: React.PropTypes.element,
    urls: React.PropTypes.array,
    gutter: React.PropTypes.number,
    devices: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
      React.PropTypes.oneOf(Object.keys(DEVICES)),
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired
      })
    ]))
  },
  getDefaultProps: function () {
    return {
      devices: Object.keys(DEVICES),
      gutter: 20
    }
  },
  urls: function () {
    return this.props.urls || buildRouteTree(this.props.routes, this.props.baseUrl);
  },
  devices: function () {
    return this.props.devices.map(device => {
      if (typeof device === 'string') return assign({id: device}, DEVICES[device]);
      return device;
    });
  },
  getContainerWidth: function () {
    var widths = this.devices().map(device => device.width);
    return widths.reduce((x, y) => x + y) + (this.props.gutter * (widths.length - 1));
  },
  render: function () {
    var devices = this.devices();
    return (<div className="route-set" style={{width: this.getContainerWidth() + 'px'}}>
      {this.urls().map((url, i) => {
        return (<div className="device-set" key={i}>
          <h2>Route: <a href={url} target="_blank">{url}</a></h2>
          {devices.map((device, j) => {
            var isLast = devices.length - j === 1;
            var props = assign({}, device, {
              url: url,
              gutter: isLast ? 0 : this.props.gutter,
              key: j,
              ref: device.id + '_' + i
            });
            return <DeviceTest {...props} />;
          })}
        </div>);
      })}
    </div>);
  }
});

module.exports = RouterViewports;
