import one from '../../../global/images/one.png';

export default function render() {
    console.log('Render');

    const image = document.createElement("IMG");
    image.src = one

    console.log(one, image)

    document.getElementById('root').appendChild(image);
}