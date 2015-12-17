'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _magicVirtualElement = require('magic-virtual-element');

var _magicVirtualElement2 = _interopRequireDefault(_magicVirtualElement);

var _cropperjs = require('cropperjs');

var _cropperjs2 = _interopRequireDefault(_cropperjs);

var _xtend = require('xtend');

var _xtend2 = _interopRequireDefault(_xtend);

var _isNumber = require('is-number');

var _isNumber2 = _interopRequireDefault(_isNumber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var croppers = {};

exports.default = {
  beforeUpdate: function beforeUpdate(_ref, nextProps, nextState) {
    var props = _ref.props;
    var id = _ref.id;

    croppers[id].setData(nextProps);
  },
  render: function render(_ref2) {
    var props = _ref2.props;

    return (0, _magicVirtualElement2.default)(
      'div',
      { style: { width: props.containerWidth, height: props.containerHeight } },
      (0, _magicVirtualElement2.default)('img', { src: props.src })
    );
  },
  afterMount: function afterMount(_ref3, el, setState) {
    var props = _ref3.props;
    var id = _ref3.id;

    var opts = (0, _xtend2.default)({
      crop: props.onCrop
    }, props);
    croppers[id] = new _cropperjs2.default(el.querySelector('img'), opts);
  },
  beforeUnmount: function beforeUnmount(_ref4) {
    var id = _ref4.id;

    croppers[id].destroy();
    delete croppers[id];
  }
};

function optsFromProps(props) {
  return {};
}