import React, { Component } from "react";
import DataLoader from "../DataLoader/DataLoader";
import LionessContext from "../../LionessContext/LionessContext";
import ds from "../../STORE/dataservice";
import "../AdminDash/AdminDash.css";
import Contractor from './Contractor'
import UserSearchBar from "../UserSearchBar/UserSearchBar";
const { getUsers, getProjects, handleFetchError } = ds;
export default class ContractorsPage extends Component {
  static contextType = LionessContext;
  render() {
    const opts = { roleFilter: 3 };
    return (
      <div className="tab-page">
        <DataLoader
          onReject={handleFetchError}
          promise={getProjects()}
          onDataLoaded={this.context.setProjects}
        />
        <DataLoader
          promise={getUsers(opts)}
          onReject={handleFetchError}
          onDataLoaded={this.context.setUsers}
        />
        <h2>Contractors</h2>
        <UserSearchBar role={opts.roleFilter} />
        <Contractor />
      </div>
    );
  }
}
