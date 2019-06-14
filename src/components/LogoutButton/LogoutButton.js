import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ds from '../../STORE/dataservice'
const {deletestoredLoginInfo} = ds
export default class LogoutButton extends Component{
    static propTypes= {
        history: PropTypes.object.isRequired,
    }
    logoutClick=()=>{
        deletestoredLoginInfo()
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
