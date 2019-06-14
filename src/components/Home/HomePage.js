import React, {Component} from 'react'
import DataLoader from '../DataLoader/DataLoader'
import ds from '../../STORE/dataservice';
import LionessContext from '../../LionessContext/LionessContext'
const {getUsers, getProjects, handleFetchError }  =ds

export default class HomePage extends Component{
    render(){
        return(
            <div className='tab-page'>
            <h2>Hi!</h2>
            </div>
        )
    }
}