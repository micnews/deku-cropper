import element from 'magic-virtual-element';
import Cropper from 'cropperjs';
import extend from 'xtend';
import isNumber from 'is-number';

const croppers = {};

export default {
  beforeUpdate ({ props, id }, nextProps, nextState) {
    croppers[id].setData(nextProps);
  },

  render ({ props }) {
    return (<div style={{ width: props.containerWidth, height: props.containerHeight }}>
      <img src={props.src}/>
    </div>);
  },

  afterMount ({ props, id }, el, setState) {
    const opts = extend({
      crop: props.onCrop
    }, props);
    croppers[id] = new Cropper(el.querySelector('img'), opts);
  },

  beforeUnmount ({ id }) {
    croppers[id].destroy();
    delete croppers[id];
  }
};
