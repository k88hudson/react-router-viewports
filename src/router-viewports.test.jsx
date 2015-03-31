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
  it('should create device sets from a router', () => {
    var instance = TestUtils.renderIntoDocument(
      <RouterViewports baseUrl={'/sample/#/'} routes={router} devices={['mobile', 'desktop']} />
    );
    var sets = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'device-set');
    should(sets.length).be.equal(urls.length);
  });
  it('should create device sets from an Array of urls', () => {
    var instance = TestUtils.renderIntoDocument(
      <RouterViewports baseUrl={'/sample/#/'} urls={urls} devices={['mobile', 'desktop']} />
    );
    var sets = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'device-set');
    should(sets.length).be.equal(urls.length);
  });
  describe('Sets', () => {
    var devices = ['mobile', 'desktop'];
    var instance;
    var el;
    var setEls;
    var refs;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <RouterViewports baseUrl={'/sample/#/'} routes={router} devices={devices} />
      );
      el = instance.getDOMNode();
      refs = Object.keys(instance.refs).map(key => instance.refs[key]);
      setEls = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'device-set');
    });

    it('should have one test per device in each set', () => {
      setEls.forEach((set) => {
        var tests = TestUtils.scryRenderedDOMComponentsWithClass(set, 'device-test');
        should(tests.length).be.equal(devices.length);
      });
    });

    it('should have a title and a link', () => {
      setEls.forEach((set) => {
        var setEl = set.getDOMNode();
        should(setEl.querySelector('h2')).be.ok;
        should(setEl.querySelector('h2 > a')).be.ok;
      });
    });

    it('each test should have an iframe', () => {
      refs.forEach((ref) => {
        var refEl = ref.getDOMNode();
        var width = ref.props.width;
        var height = ref.props.height;
        var iframe = refEl.querySelector('iframe');
        should(iframe.style.width).be.equal(width + 'px');
        should(iframe.style.height).be.equal(height + 'px');
      });
    });

  });
});
