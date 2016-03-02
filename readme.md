# deku-cropper

[cropper.js](http://cropperjs.com) component for [deku](https://github.com/dekujs/deku).

## Installation

```shell
npm install deku-cropper
```

## Usage
```js
import Cropper from 'deku-cropper';
import { render, tree } from 'deku';
import element from 'magic-virtual-element';

const onChange = (data) => {
  console.log('data', data);
}

const onBuilt = () => {
  console.log('on built');
}

const app = tree(<Cropper containerWidth={400} containerHeight={300}) onChange={onChange} onBuilt={onBuilt} aspectRatio={480/640} src='http://cropperjs.com/img/picture.jpg' />);

render(app, document.body);

```
