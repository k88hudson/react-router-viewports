var React = require('react');
var assign = require('react/lib/Object.assign');
var buildRouteTree = require('./build-route-tree');

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

var ViewportTest = React.createClass({
  propTypes: {
    baseUrl: React.PropTypes.string,
    routes: React.PropTypes.array,
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
      {this.urls().map((url) => { return <div className="device-set">
        <h2>Route: <a href={url} target="_blank">{url}</a></h2>
        {devices.map((device, i) => {
          var isLast = devices.length - i === 1;
          return <DeviceTest {...device} url={url} gutter={isLast ? 0 : this.props.gutter} />
        })}
      </div>})}
    </div>);
  }
});

module.exports = ViewportTest;
