import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/detail.css';
import '../styles/responsive.css';
import App from './views/app';
import swRegister from './utils/sw-register';

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('#menuButton');
  const jumbotron = document.querySelector('.jumbotron');
  const main = document.querySelector('main');
  const drawer = document.querySelector('#drawer');

  drawer.classList.remove('open');

  menu.addEventListener('click', (event) => {
    drawer.classList.toggle('open');
    event.stopPropagation();
  });

  jumbotron.addEventListener('click', () => {
    drawer.classList.remove('open');
  });

  main.addEventListener('click', () => {
    drawer.classList.remove('open');
  });
});

const app = new App({
  header: document.querySelector('#header'),
  main: document.querySelector('#maincontent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
