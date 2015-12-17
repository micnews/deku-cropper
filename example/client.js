import Cropper from '../index';
import { render, tree } from 'deku';
import element from 'magic-virtual-element';

const onCrop = (data) => {
  const x = Math.max(data.x, 0);
  const y = Math.max(data.y, 0);

  if (data.x !== x || data.y !== y) {
    app.mount(
      <Cropper
        containerWidth={640}
        containerHeight={480}
        src='http://cropperjs.com/img/picture.jpg'
        onCrop={onCrop}
        aspectRatio={480/640}
        x={x}
        y={y}
        width={data.width}
        height={data.height} />
    );
  }
};

var app = tree(
  <Cropper
    containerWidth={640}
    containerHeight={480}
    src='http://cropperjs.com/img/picture.jpg'
    onCrop={onCrop}
    aspectRatio={480/640}
  />
);

console.log(document.querySelector('.cropper'));

render(app, document.body.querySelector('.cropper'));
