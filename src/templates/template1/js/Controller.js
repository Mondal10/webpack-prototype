import '../../../global/scss/globalStyles.scss';
import '../scss/styles.scss';

import { square } from '../../../global/utils/MathUtils';
import render from '../js/render';

window.onload = () => {
    console.log('hello, template 1');
    console.log(document.getElementById('root'));
    console.log(square(13));
    render();
}

