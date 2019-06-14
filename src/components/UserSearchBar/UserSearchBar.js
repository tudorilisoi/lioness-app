import React, { Component } from "react";
import "../Projects/ProjectSearchBar.css";
import ds from "../../STORE/dataservice";
import LionessContext from "../../LionessContext/LionessContext";
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
const { getUsers, statuses } = ds;
export default class UserSearchBar extends Component {
  static contextType = LionessContext;
  constructor() {
    super();
    this.state = {
      userNameSortAsc: null,
      activeProjSortAsc: null,
      currentPageNumber: 1,
      totalPages: null,
      noSorting: null,
    };
  }

  changePage = (pageNum) => {
    if (pageNum === "prev" && this.state.currentPageNumber > 1) {
      this.setState({
        currentPageNumber: this.state.currentPageNumber - 1
      }, () => { this.fetchData() });
    }
    if (pageNum === "next") {
      this.setState({
        currentPageNumber: this.state.currentPageNumber + 1
      }, () => { this.fetchData() });
    }


  };
  userNameSortChange = (nameSort) => {

    if (nameSort === "asc") {
      this.setState({
        userNameSortAsc: true,
        activeProjSortAsc: null,
        noSorting: null,
        currentPageNumber: 1
      }, () => { this.fetchData() });
    } else {
      this.setState({
        userNameSortAsc: false,
        activeProjSortAsc: null,
        noSorting: null,
        currentPageNumber: 1
      }, () => { this.fetchData() });
    }
  }
  activeProjSortChange = (actProjSort) => {
    if (actProjSort === "asc") {
      this.setState({
        userNameSortAsc: null,
        activeProjSortAsc: true,
        noSorting: null,
        currentPageNumber: 1
      }, () => { this.fetchData() });
    } else {
      this.setState({
        userNameSortAsc: null,
        activeProjSortAsc: false,
        noSorting: null,
        currentPageNumber: 1
      }, () => { this.fetchData() });
    }
  }
  fetchData = () => {

    console.log('Data fetched')

    const opts = {
      pageNumber: this.state.currentPageNumber,
      userNameSortAsc: this.state.userNameSortAsc,
      noSorting: this.state.noSorting,
      activeProjSortAsc: this.state.activeProjSortAsc,
      roleFilter: this.props.role,
    };
    getUsers(opts).then(res => {
      console.log(res)
      this.context.setUsers(res);

    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.fetchData();
  }

  componentDidMount() {
    this.fetchData()
  }


  render() {
    return (
      <div className="tab-navBar">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className='searchBar'>
          <label htmlFor="search"> </label>
          <input type="text" id="search" name="search" />
          <button type="submit">Search! </button>
          </div>
          <div className="sort-buttons">
            <button
              type="button"
              name="name-asc"
              value="asc"
              onClick={e => this.userNameSortChange(e.target.value)}
            >
              Name
              <br />
              (A-Z)
              
              
            </button>
            <button
              type="button"
              name="name-dez"
              value="des"
              onClick={e => this.userNameSortChange(e.target.value)}
            >
              Name<br /> (Z-A)
            </button>
            {this.props.role === 3 || this.props.role === 4 ? <button
              type="button"
              name="active-project-high"
              value="asc"
              onClick={e => this.activeProjSortChange(e.target.value)}
            >
              Active Projects (Highest)
        </button> : ''}
            {this.props.role === 3 || this.props.role === 4 ? <button
              type="button"
              name="active-project-low"
              value="des"
              onClick={e => this.activeProjSortChange(e.target.value)}
            >
              Active Projects (Lowest)
            </button> : ''}
            <button value="prev" onClick={e => this.changePage(e.target.value)}>Previous</button>
        <button value="next" onClick={e => this.changePage(e.target.value)}>Next</button>
          </div>
        </form>
        
      </div>
    );
  }
}
