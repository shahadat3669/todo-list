import './style.scss';
require('./assets/logo.png');
// Create heading node
const heading = document.createElement('h1');
heading.textContent = 'Hi there';

// Append heading node to the DOM
const app = document.querySelector('#root');
app.append(heading);
