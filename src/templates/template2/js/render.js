import two from '../images/two.png';

export default function render() {
    console.log('Render');

    const image = document.createElement("IMG");
    image.src = two

    console.log(two, image)

    document.getElementById('root').appendChild(image);
}