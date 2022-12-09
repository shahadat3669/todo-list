import './style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

require('./assets/logo.png');
// Create heading node
const heading = document.createElement('h1');
const icon = document.createElement('i');
icon.classList.add('fa-solid', 'fa-house');
heading.textContent = 'Hi there ';

// Append heading node to the DOM
const app = document.querySelector('#root');
app.append(heading);
app.append(icon);
