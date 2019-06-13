import React, { Component } from "react";
import DataLoader from "../DataLoader/DataLoader";
import LionessContext from "../../LionessContext/LionessContext";
import ds from "../../STORE/dataservice";
import "../AdminDash/AdminDash.css";
import Contractor from './Contractor'
import UserSearchBar from "../UserSearchBar/UserSearchBar";
const { getUsers, getProjects, handleFetchError } = ds;
export default class ContractorsPage extends Component {
  constructor(props) {
    super(props)
    this.contractorRef = null;
}
  static contextType = LionessContext;
  render() {
    const opts = { roleFilter: 3 };
    return (
      <div className="tab-page">
        <h2>Contractors</h2>
        <UserSearchBar role={opts.roleFilter} />
        <button onClick={ev=>{this.contractorRef && this.contractorRef.addContractor()}}>Add Contractor</button>
        <Contractor ref={ref => this.contractorRef = ref} role={opts.roleFilter}/>
      </div>
    );
  }
}
