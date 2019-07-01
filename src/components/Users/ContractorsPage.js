import React, { Component } from "react";
import LionessContext from "../../LionessContext/LionessContext";

import "../AdminDash/AdminDash.css";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import User from './User'
import UserSearchBar from "../UserSearchBar/UserSearchBar";
export default class ContractorsPage extends Component {
  constructor(props) {
    super(props)
    this.userRef = null;
}
  static contextType = LionessContext;
  render() {
    const opts = { roleFilter: 3 };
    return (
      <div className="tab-page">
        <div className="padded">
        <button className='addButton' onClick={ev=>{this.userRef && this.userRef.addUser()}}>
        <Icon icon="user-plus" />
          Add Contractor</button>
        <h2 className="barTitle">Contractors</h2>
       
               
                {/* <button>Email Contractor</button> */}
                
        <UserSearchBar role={opts.roleFilter} />
        </div>
                <User ref={ref => this.userRef = ref} role={opts.roleFilter} />
      </div>
    );
  }
}
