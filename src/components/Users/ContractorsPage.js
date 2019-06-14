import React, { Component } from "react";
import LionessContext from "../../LionessContext/LionessContext";
import ds from "../../STORE/dataservice";
import "../AdminDash/AdminDash.css";
import User from './User'
import UserSearchBar from "../UserSearchBar/UserSearchBar";
const { getUsers, getProjects, handleFetchError } = ds;
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
        <h2>Contractors</h2>
        <div className='user-buttons'>
                <button onClick={ev=>{this.userRef && this.userRef.addUser()}}>Add Contractor</button>
                <button>Email Contractor</button>
                </div>
        <UserSearchBar role={opts.roleFilter} />
                <User ref={ref => this.userRef = ref} role={opts.roleFilter} />
      </div>
    );
  }
}
