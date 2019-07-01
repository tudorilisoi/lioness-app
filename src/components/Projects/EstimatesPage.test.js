
import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

import EstimatesPage from './EstimatesPage';


it('renders without crashing', () => {
    const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    const element = (<EstimatesPage />)
    ReactDOM.render(element, div);
    ReactDOM.unmountComponentAtNode(div);
    // const mounted = mount(element);
    // debugger
    // expect(wrapper.find('LoginForm')).to.have.lengthOf(1);
    // return Promise
    //     .resolve(mounted)
    //     .then(() => mounted.update())
    //     .then(() => {
    //         // const el = mounted.find('button').first()
    //         console.log(mounted.debug());
    //         // console.log(el);
    //         // expect(el.length).toEqual(1);
    //         // expect(mounted.text()).toContain("Login");
    //     });
});