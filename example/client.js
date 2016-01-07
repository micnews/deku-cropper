import Cropper from '../index';
import { render, tree } from 'deku';
import element from 'magic-virtual-element';

const onChange = (data) => {
  console.log('data', data);
  const cropX = Math.max(data.cropX, 0);
  const cropY = Math.max(data.cropY, 0);

  if (data.cropX !== cropX || data.cropY !== cropY) {
    app.mount(
      <Cropper
        containerWidth={'100%'}
        containerHeight={'auto'}
        src='http://cropperjs.com/img/picture.jpg'
        onChange={onChange}
        aspectRatio={480 / 640}
        cropX={cropX}
        cropY={cropY}
        width={data.width}
        height={data.height} />
    );
  }
};

var app = tree(
  <Cropper
    containerWidth={'100%'}
    containerHeight={'auto'}
    src='http://cropperjs.com/img/picture.jpg'
    onChange={onChange}
    aspectRatio={480 / 640}
  />
);

console.log(document.querySelector('.cropper'));

render(app, document.body.querySelector('.cropper'));
