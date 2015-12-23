import element from 'magic-virtual-element';
import Cropper from 'cropperjs';
import extend from 'xtend';

const croppers = {};

export default {
  beforeUpdate ({ props, id }, nextProps) {
    const cropper = croppers[id];
    const { x, y, width, height} = nextProps;

    // TODO: Work with all potential opts, so they can be changed at any point
    if (props.zoom !== nextProps.zoom) {
      cropper.zoomTo(nextProps.zoom);
    }
    if (props.x !== x || props.y !== y || props.width !== width || props.height !== height) {
      cropper.setData({
        x, y, width, height
      })
    }
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
