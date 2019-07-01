import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import ActiveProjectsPage from './ActiveProjectsPage';


it('renders without crashing', () => {
    const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    const element = (<ActiveProjectsPage />)
    ReactDOM.render(element, div);
    ReactDOM.unmountComponentAtNode(div);
})