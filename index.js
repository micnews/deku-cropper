import element from 'magic-virtual-element';
import Cropper from 'cropperjs';
import extend from 'xtend';

const croppers = {};

export default {
  beforeUpdate ({ props, id }, nextProps) {
    const cropper = croppers[id];
    const { cropX, cropY, cropWidth, cropHeight, src, zoom } = nextProps;

    if (props.zoom !== zoom) {
      cropper.zoomTo(zoom);
    }
    // only update if change is significant
    if (Math.abs(props.cropX - cropX) > 1 ||
      Math.abs(props.cropY - cropY) > 1 ||
      Math.abs(props.cropWidth - cropWidth) > 1 ||
      Math.abs(props.cropHeight - cropHeight) > 1) {
      cropper.setData({
        x: cropX, y: cropY, width: cropWidth, heigth: cropHeight
      });
    }

    if (props.src !== src) {
      cropper.replace(src);
    }
  },

  render ({ props }) {
    return (<div style={{ width: props.containerWidth, height: props.containerHeight }} class='deku-cropper-container'>
      <img src={props.src}/>
    </div>);
  },

  afterMount ({ props, id }, el, setState) {
    let cropper;
    const handleOnChange = props.onChange
      ? function () {
        const cropData = cropper.getData();
        const canvasData = cropper.getCanvasData();
        props.onChange({
          cropX: cropData.x,
          cropY: cropData.y,
          cropWidth: cropData.width,
          cropHeight: cropData.height,
          canvasX: canvasData.left,
          canvasY: canvasData.right,
          canvasWidth: canvasData.width,
          canvasHeight: canvasData.height,
          zoom: canvasData.width / canvasData.naturalWidth,
          loaded: cropper.built
        });
      }
      : function () {};
    const onBuilt = props.onBuilt || function () {};

    const opts = extend({
      crop: handleOnChange,
      zoom: handleOnChange,
      built: function () {
        cropper.zoomTo(opts.zoom);
        cropper.setData({
          x: opts.cropX,
          y: opts.cropY,
          width: opts.cropWidth,
          height: opts.cropHeight
        });
        onBuilt();
      }
    }, props);

    cropper = croppers[id] = new Cropper(el.querySelector('img'), opts);
  },

  beforeUnmount ({ id }) {
    croppers[id].destroy();
    delete croppers[id];
  }
};
