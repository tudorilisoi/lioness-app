import React, { Component } from "react";
import LionessContext from "../../LionessContext/LionessContext";
import "../AdminDash/AdminDash.css";
import UserSearchBar from "../UserSearchBar/UserSearchBar";
import User from './User'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
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
        <div className="padded">
                <button className='addButton' onClick={ev=>{this.userRef && this.userRef.addUser()}}>
                <Icon icon="user-plus" />
                  Add Project Manager</button>
                {/* <button>Email Project Manager</button> */}
                <h2 className="barTitle">Project Managers</h2>
        <UserSearchBar role={opts.roleFilter} />
        </div>
                <User ref={ref => this.userRef = ref} role={opts.roleFilter} />
      </div>
    );
  }
}
