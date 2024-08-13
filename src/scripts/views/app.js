import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ header, main, footer }) {
    this._header = header;
    this._main = main;
    this._footer = footer;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      header: this._header,
      main: this._main,
      footer: this._footer,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._main.innerHTML = await page.render();
    await page.afterRender();
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('#maincontent');

    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      mainContent.focus();
    });
  }
}

export default App;
