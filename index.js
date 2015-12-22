import element from 'magic-virtual-element';
import Cropper from 'cropperjs';
import extend from 'xtend';

const croppers = {};

export default {
  beforeUpdate ({ props, id }, nextProps, nextState) {
    // TODO: Work with all potential opts, so they can be changed at any point
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
