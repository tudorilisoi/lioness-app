import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import ClientPage from './ClientPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    const element = (<ClientPage />)
    ReactDOM.render(element, div);
    ReactDOM.unmountComponentAtNode(div);
})