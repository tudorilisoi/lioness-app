import React, {Component} from 'react';
import LionessContext from '../../LionessContext/LionessContext';

export default class Client extends Component{

    render(){
        console.log(this.props.clients)
        return(
            <div>
                <h2>Clients</h2>
                </div>
        )
    }
}