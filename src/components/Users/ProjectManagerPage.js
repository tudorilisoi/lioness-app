import React, { Component } from "react";
import LionessContext from "../../LionessContext/LionessContext";
import "../AdminDash/AdminDash.css";
import UserSearchBar from "../UserSearchBar/UserSearchBar";
import User from './User'
export default class ProjectManagerPage extends Component {
  constructor(props) {
    super(props)
    this.userRef = null;
}
  static contextType = LionessContext;
  render() {
    const opts = { roleFilter: 4 };
    return (
      <div className="tab-page">
        <h2>Project Managers</h2>
        <UserSearchBar role={opts.roleFilter} />
        <div className='user-buttons'>
                <button onClick={ev=>{this.userRef && this.userRef.addUser()}}>Add Project Manager</button>
                <button>Email Project Manager</button>
                </div>
                <User ref={ref => this.userRef = ref} role={opts.roleFilter} />
      </div>
    );
  }
}
