import React, { Component } from "react";
import "./ProjectSearchBar.css";
import ds from "../../STORE/dataservice";
import LionessContext from "../../LionessContext/LionessContext";
import 'react-dates/initialize';
const { getProjects, getStatuses } = ds;
export default class ProjectSearchBar extends Component {
  static contextType = LionessContext;
  constructor(props) {
    super(props);

    this.state = {
      ...ds.projectsDefaultOptions,
      dateTypeFilter: this.getSelectedDateOption(props),
      statusFilter: props.status,
    }
  }

  changePage = (pageNum) => {
    if (pageNum === "prev" && this.state.pageNumber > 1) {
      this.setState({
        pageNumber: this.state.pageNumber - 1
      }, () => { this.fetchData() });
    }
    if (pageNum === "next") {
      this.setState({
        pageNumber: this.state.pageNumber + 1
      }, () => { this.fetchData() });
    }


  };
  budgetChange = sortType => {

    if (sortType === "asc") {
      this.setState({
        budgetSort: ds.SORT_ASC,
        dateSort: null,
        pageNumber: 1
      }, () => { this.fetchData() });
    } else {
      this.setState({
        budgetSort: ds.SORT_DESC,
        dateSort: null,
        pageNumber: 1
      }, () => { this.fetchData() });
    }
  };
  dateTypeChange = dateType => {

    this.setState({ dateTypeFilter: dateType });
  };

  dateSortChange(dateSort) {

    if (dateSort === "asc") {
      this.setState({
        dateSort: ds.SORT_ASC,
        budgetSort: null,
        pageNumber: 1
      }, () => { this.fetchData() });
    } else {
      this.setState({
        dateSort: ds.SORT_DESC,
        budgetSort: null,
        pageNumber: 1
      }, () => { this.fetchData() });
    }

  }
  afterDateChange(date) {
    this.setState({ afterDate: date });
  }
  beforeDateChange(date) {
    this.setState({ beforeDate: date });
  }
  fetchData = () => {

    console.log('Data fetched')

    const opts = this.state;
    getProjects(opts).then(res => {
      this.context.setProjects(res, this.fetchData);
    });
    getStatuses().then(res => {
      this.context.setStatuses(res);
    })

  };
  handleSubmit = e => {
    e.preventDefault();
    this.fetchData();
  }

  getSelectedDateOption(props) {
    const isInProgress = props.status === "in progress"
    const isBilled = props.status === "billed"
    const isEstimate = props.status === "estimate"
    if (isEstimate) {
      return 'startDate'
    }
    if (isInProgress) {
      return 'estimatedDueDate'
    }
    if (isBilled) {
      return 'completionDate'
    }
    return 'startDate'
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    console.log('render Searchbar')

    const isInProgress = this.props.status === "in progress"
    const isBilled = this.props.status === "billed"
    const isEstimate = this.props.status === "estimate"

    const dateTypes = () => {
      const selectedOption = this.state.dateTypeFilter
      return (
        <select
          className="sortResults"
          id="sortResults"
          name="sortResults-dropdown"
          aria-label="dropdown menu of sort options for results"
          onChange={e => this.dateTypeChange(e.target.value)}
        >
          <option disabled="">Choose One</option>
          <option selected={'startDate' === selectedOption} value="startDate">Start Date</option>
          {isInProgress || isBilled
            ? (
              <option
                selected={'estimatedDueDate' === selectedOption}
                value="estimatedDueDate">Estimated Due Date</option>
            ) : (
              ""
            )}
          {isBilled ? (
            <option selected={'completionDate' === selectedOption} value="completionDate">Completion Date</option>
          ) : (
              ""
            )}
        </select>
      );
    };
    return (
      <div className="searchBar">
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="search"> Search</label>
          <input type="text" id="search" name="search" />
          <button type="submit">Search! </button>
          Filter By:
          <label htmlFor="sort">Type of Date</label>
          {dateTypes()}
          <div className='dates'>
            <label htmlFor="date">After</label>
            <input
              type="date"
              onChange={e => this.afterDateChange(e.target.value)}
            />
            <label htmlFor="date">Before</label>
            <input
              type="date"
              onChange={e => this.beforeDateChange(e.target.value)}
            />
          </div>
          <button type="submit" className="submitProjectFilters">
            Submit
          </button>
          Sort by:
          <div className="sort-buttons">
            <button
              type="button"
              name="date-new"
              value="asc"
              onClick={e => this.dateSortChange(e.target.value)}
            >
              Date (Newest)
            </button>
            <button
              type="button"
              name="date-old"
              value="des"
              onClick={e => this.dateSortChange(e.target.value)}
            >
              Date (Oldest)
            </button>
            <button
              type="button"
              name="budget-high"
              value="asc"
              onClick={e => this.budgetChange(e.target.value)}
            >
              Budget (Highest)
            </button>
            <button
              type="button"
              name="budget-low"
              value="des"
              onClick={e => this.budgetChange(e.target.value)}
            >
              Budget (Lowest)
            </button>
          </div>
        </form>
        <button value="prev" onClick={e => this.changePage(e.target.value)}>Previous</button>
        <button value="next" onClick={e => this.changePage(e.target.value)}>Next</button>
      </div>
    );
  }
}
