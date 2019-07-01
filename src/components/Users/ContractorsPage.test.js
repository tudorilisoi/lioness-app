import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import ContractorsPage from './ContractorsPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    const element = (<ContractorsPage />)
    ReactDOM.render(element, div);
    ReactDOM.unmountComponentAtNode(div);
})