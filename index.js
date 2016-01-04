import element from 'magic-virtual-element';
import Cropper from 'cropperjs';
import extend from 'xtend';

const croppers = {};

export default {
  beforeUpdate ({ props, id }, nextProps) {
    const cropper = croppers[id];
    const { x, y, width, height, src, zoom } = nextProps;

    // TODO: Work with all potential opts, so they can be changed at any point
    if (props.zoom !== zoom) {
      cropper.zoomTo(zoom);
    }
    // only update if change is significant
    if (Math.abs(props.x - x) > 1 ||
      Math.abs(props.y - y) > 1 ||
      Math.abs(props.width - width) > 1 ||
      Math.abs(props.height - height) > 1) {
      cropper.setData({
        x, y, width, height
      });
    }

    if (props.src !== src) {
      cropper.replace(src);
    }
  },

  render ({ props }) {
    return (<div style={{ width: props.containerWidth, height: props.containerHeight }}>
      <img src={props.src}/>
    </div>);
  },

  afterMount ({ props, id }, el, setState) {
    let cropper;
    const handleOnChange = props.onChange
      ? function () {
        const data = cropper.getData();
        const canvasData = cropper.getCanvasData();
        props.onChange({
          x: data.x,
          y: data.y,
          width: data.width,
          height: data.height,
          zoom: canvasData.width / canvasData.naturalWidth
        });
      }
      : undefined;
    const opts = extend({
      crop: handleOnChange,
      zoom: handleOnChange,
      built: function () {
        cropper.zoomTo(opts.zoom);
      }
    }, props);

    cropper = croppers[id] = new Cropper(el.querySelector('img'), opts);
  },

  beforeUnmount ({ id }) {
    croppers[id].destroy();
    delete croppers[id];
  }
};
