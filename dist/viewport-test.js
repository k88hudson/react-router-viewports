"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");
var assign = require("react/lib/Object.assign");

var DEVICES = {
  mobile: {
    label: "Mobile",
    width: 320,
    height: 480
  },
  mobileLarge: {
    label: "Mobile - large",
    width: 480,
    height: 640
  },
  tablet: {
    label: "Tablet",
    width: 768,
    height: 1024
  },
  desktop: {
    label: "Desktop",
    width: 1024,
    height: 768
  }
};

var DeviceTest = React.createClass({
  displayName: "DeviceTest",

  render: function render() {
    return React.DOM.div(
      { className: "device-test", style: { marginRight: this.props.gutter + "px" } },
      React.DOM.h4(
        null,
        this.props.label,
        " - ",
        this.props.width,
        "x",
        this.props.height
      ),
      React.DOM.iframe({ src: this.props.url, style: {
          width: this.props.width + "px",
          height: this.props.height + "px" } })
    );
  }
});

var ViewportTest = React.createClass({
  displayName: "ViewportTest",

  propTypes: {
    routes: React.PropTypes.array.isRequired,
    gutter: React.PropTypes.number,
    devices: React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.oneOf(Object.keys(DEVICES)), React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      width: React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired
    })]))
  },
  getDefaultProps: function getDefaultProps() {
    return {
      devices: Object.keys(DEVICES),
      gutter: 20
    };
  },
  devices: function devices() {
    return this.props.devices.map(function (device) {
      if (typeof device === "string") return assign({ id: device }, DEVICES[device]);
      return device;
    });
  },
  getContainerWidth: function getContainerWidth() {
    var widths = this.devices().map(function (device) {
      return device.width;
    });
    return widths.reduce(function (x, y) {
      return x + y;
    }) + this.props.gutter * (widths.length - 1);
  },
  render: function render() {
    var _this = this;

    var devices = this.devices();
    return React.DOM.div({ className: "route-set", style: { width: this.getContainerWidth() + "px" } }, this.props.routes.map(function (url) {
      return React.DOM.div(
        { className: "device-set" },
        React.DOM.h2(
          null,
          "Route: ",
          React.DOM.a({ href: url, target: "_blank" }, url)
        ),
        devices.map(function (device, i) {
          var isLast = devices.length - i === 1;
          return DeviceTest(_extends({}, device, { url: url, gutter: isLast ? 0 : _this.props.gutter }));
        })
      );
    }));
  }
});

module.exports = ViewportTest;

