import React, { Component } from "react";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import 'react-dates/initialize';
import LionessContext from "../../LionessContext/LionessContext";
import ds from "../../STORE/dataservice";
import "./ProjectSearchBar.css";
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
    this.setState({
      budgetSort: sortType === "asc" ? ds.SORT_ASC : ds.SORT_DESC,
      dateSort: null,
      pageNumber: 1
    }, () => { this.fetchData() });
  };
  dateTypeChange = dateType => {
    this.setState({ dateTypeFilter: dateType });
  };

  dateSortChange(dateSort) {
    this.setState({
      dateSort: dateSort === "asc" ? ds.SORT_ASC : ds.SORT_DESC,
      budgetSort: null,
      pageNumber: 1
    }, () => { this.fetchData() });
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
    const isInProgress = props.status === ds.STATUS_IDS.STATUS_IN_PROGRESS
    const isBilled = props.status === ds.STATUS_IDS.STATUS_BILLED
    const isEstimate = props.status === ds.STATUS_IDS.STATUS_ESTIMATE
    if (isEstimate) {
      return 'start_date'
    }
    if (isInProgress) {
      return 'estimated_due_date'
    }
    if (isBilled) {
      return 'completion_date'
    }
    return 'start_date'
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    console.log('render Searchbar')

    const isInProgress = this.props.status === ds.STATUS_IDS.STATUS_IN_PROGRESS
    const isBilled = this.props.status === ds.STATUS_IDS.STATUS_BILLED
    // const isEstimate = this.props.status === ds.STATUS_IDS.STATUS_ESTIMATE

    const dateTypes = () => {
      const selectedOption = this.state.dateTypeFilter
      return (
        <select
          className="sortResults"
          id="sortResults"
          name="sortResults-dropdown"
          aria-label="dropdown menu of sort options for results"
          onChange={e => this.dateTypeChange(e.target.value)}
          value={selectedOption}
        >
          <option disabled="">Choose One</option>
          <option value="start_date">Start Date</option>
          {isInProgress || isBilled
            ? (
              <option value="estimated_due_date">Estimated Due Date</option>
            ) : (
              ""
            )}
          {isBilled ? (
            <option value="completion_date">Completion Date</option>
          ) : (
              ""
            )}
        </select>
      );
    };
    return (
      <div className="searchBar">
        <form onSubmit={e => this.handleSubmit(e)}>
          {/* <div className='search-word-bar'>
            <label htmlFor="search"></label>
            <input type="text" id="search" name="search" placeholder='Search by keyword' />
            <button type="submit">Search! </button>
          </div> */}
          <div className='dateFilter'>
            <label htmlFor="sort">Filter By:</label>
            {dateTypes()}
          </div>
          <div className='dates'><div>
            <label htmlFor="date">After</label>
            <input
              type="date"
              onChange={e => this.afterDateChange(e.target.value)}
            />
          </div>
            <div>
              <label htmlFor="date">Before</label>
              <input
                type="date"
                onChange={e => this.beforeDateChange(e.target.value)}
              />
            </div>

          </div>
          <button type="submit" className="submitProjectFilters">
            Submit
          </button>
          <div>
            <span className="buttonsRowLabel">Sort by:</span>
            <div className="sortButtons buttonsRow">
              <button
                type="button"
                name="date-new"
                value="desc"
                onClick={e => this.dateSortChange(e.target.value)}
              >
                Date <br />(Newest)
            </button>
              <button
                type="button"
                name="date-old"
                value="asc"
                onClick={e => this.dateSortChange(e.target.value)}
              >
                Date <br />(Oldest)
            </button>
              <button
                type="button"
                name="budget-high"
                value="asc"
                onClick={e => this.budgetChange(e.target.value)}
              >
                Budget<br /> (Highest)
            </button>
              <button
                type="button"
                name="budget-low"
                value="des"
                onClick={e => this.budgetChange(e.target.value)}
              >
                Budget <br />(Lowest)
            </button>
            </div>
          </div>
        </form>
        <div className='pageButtons buttonsRow'>
          <button value="prev" onClick={e => this.changePage(e.target.value)}>
            <Icon icon="arrow-left" /> Previous
          </button>
          <span className="paginationInfo">
            {this.context.projects && `page ${this.state.pageNumber} of ${this.context.projects.numPages}`}
          </span>
          <button value="next" onClick={e => this.changePage(e.target.value)}>
            Next <Icon icon="arrow-right" />
          </button>
        </div>
      </div>
    );
  }
}
