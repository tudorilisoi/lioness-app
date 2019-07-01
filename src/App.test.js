// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from '../src/components/App/App';

import './reset.css'
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom"
import './index.css';

import App from '../src/components/App/App';
import * as serviceWorker from './serviceWorker';
const history = createBrowserHistory();
// export {history}

it('renders without crashing', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<App />, div);
  ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    div);
  ReactDOM.unmountComponentAtNode(div);
});
