import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ds from '../../STORE/dataservice'
const {deleteStoredLoginInfo} = ds
export default class LogoutButton extends Component{
    static propTypes= {
        history: PropTypes.object.isRequired,
    }
    logoutClick=()=>{
        deleteStoredLoginInfo()
        this.props.history.push('/login')
    }
    render(){
        return<div className='BackButton'role='navigation'>
        <button onClick={()=>this.logoutClick()}>
            Log Out
        </button>
        </div>
    }
    
}
