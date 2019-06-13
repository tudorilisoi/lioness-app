import React, { Component } from "react";
import DataLoader from "../DataLoader/DataLoader";
import LionessContext from "../../LionessContext/LionessContext";
import ds from "../../STORE/dataservice";
import NavBar from "../Nav/Nav";
import "../AdminDash/AdminDash.css";
import ProjectManager from "./ProjectManager";
import UserSearchBar from "../UserSearchBar/UserSearchBar";
const { getUsers, getProjects, handleFetchError } = ds;
export default class ProjectManagerPage extends Component {
  static contextType = LionessContext;
  render() {
    const opts = { roleFilter: 4 };
    return (
      <div className="tab-page">
        <h2>Project Managers</h2>
        <UserSearchBar role={opts.roleFilter} />
        <ProjectManager role={opts.roleFilter} />
      </div>
    );
  }
}
