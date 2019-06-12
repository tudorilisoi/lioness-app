import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import dayjs from "dayjs";
import ds from "../../STORE/dataservice";

// see https://react-select.com/home#getting-started
import Select from "react-select";
import LionessContext from "../../LionessContext/LionessContext";

function dateForInput(dateString) {
  return dayjs(dateString).format("YYYY-MM-DD");
}
function dateFromInput(dateString) {
  // return dayjs(dateString).format('YYYY-MM-DD')
  return new Date(dateString).toUTCString();
}
const { getStatuses, getUsers } = ds;

export default class EditProject extends Component {
  static contextType = LionessContext;
  constructor(props) {
    super(props);
    const { project } = this.props;
    this.state = {
      ...project,
      validationMessages:{
        title:'',
      status:'',
      description:'',
      startDate:'',
      budget:'',
      estimatedDueDate:'',
      client:'',
      projectManager:'',
      contractors:''


      }

    };
    "startDate completionDate estimatedDueDate"
      .split(" ")
      .forEach(i => (this.state[i] = dateForInput(this.state[i])));
  }

  onChange = (fieldName, value) => {
    this.validateField(fieldName, value);

    this.setState(
      {
        [fieldName]: value
      },
      () => {
        console.log("EDIT STATE", this.state);
      }
    );
  };

  validateField = (fieldName, value) => {
    console.log(`validating "${fieldName}" against the value of: ${value}`);
    
    switch (fieldName) {
      case "title":
          if(value==='')
      this.setState({validationMessages:{
        title:'Title can not be empty'
      }})
      case "description":
          this.setState({validationMessages:{
            description:'Description can not be empty'
          }})
        //TODO setState with proper validation messages
        break;

      default:
        break;
    }
  };

  componentDidMount() {

    // TODO keeps users filter in the local state

    /* getStatuses().then(res => {
      this.context.setStatuses(res);
    });
    getUsers().then(res => {
      this.context.setUsers(res);
    }); */
  }
  render() {
    const {
      title,
      status,
      id,
      description,
      startDate,
      budget,
      estimatedDueDate,
      client,
      projectManager,
      contractors,
      completionDate,
    } = this.state;
    const formattedStartDate = dateForInput(startDate);

    // const jsStartDate = dateToJS(startDateString)
    // debugger
    const { editMode } = this.props;

    const statusesOpts = this.context.statuses.map(status => {
      const options = { value: status.id, label: status.title };
      // { value: 'strawberry', label: 'Strawberry' },
      // { value: 'vanilla', label: 'Vanilla' }

      return options;
    });
    const prevStatus = statusesOpts.filter(
      status => status.value === this.state.status.id
    );
    const clientList = this.context.users.filter(user => user.role.id === 2);
    const clientOpts = clientList.map(client => {
      const options = { value: client.id, label: client.full_name };
      return options;
    });
    const prevClient = clientOpts.filter(
      client => client.value === this.state.client[0].id
    );
    const projectManagerList = this.context.users.filter(
      user => user.role.id === 4
    );
    const pmOpts = projectManagerList.map(pm => {
      const options = { value: pm.id, label: pm.full_name };
      return options;
    });
    const prevPm = pmOpts.filter(
      pm => pm.value === this.state.projectManager[0].id
    );
    const contractorList = this.context.users.filter(
      user => user.role.id === 3
    );
    const contractorOpts = contractorList.map(contractor => {
      const options = { value: contractor.id, label: contractor.full_name };
      return options;
    });

    let currentContractorFilter = this.state.contractors.map(contractor => {
      return contractor.id;
    });
    let prevContractors = contractorOpts.filter(contractor =>
      currentContractorFilter.includes(contractor.value)
    );
    let currentContractorNames = contractors.map(contractor => {
      return contractor.full_name;
    });
    currentContractorNames.join(" and ");

    return (
      <div>
      <form>
        <div>
          <span>Status:</span>
          {!editMode ? (
            status.title
          ) : (
            <Select
              options={statusesOpts}
              defaultValue={prevStatus[0]}
              onChange={value => this.onChange("status", value)}
            />
          )}
        </div>
        <div>
          <span>Client:</span>
          {!editMode ? (
            client[0].full_name
          ) : (
            <Select
              options={clientOpts}
              defaultValue={prevClient[0]}
              onChange={value => this.onChange("client", value)}
            />
          )}
        </div>
        <div>
          <span>Project Manager:</span>
          {!editMode ? (
            projectManager[0].full_name
          ) : (
            <Select
              options={pmOpts}
              defaultValue={prevPm[0]}
              onChange={value => this.onChange("projectManager", value)}
            />
          )}
        </div>
        <div>
          <span>Contractors:</span>
          {!editMode ? (
            currentContractorNames
          ) : (
            <Select
              defaultValue={prevContractors}
              isMulti
              name="colors"
              options={contractorOpts}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          )}
        </div>
        <p>
          <span>Title:</span>
          <ControlledInput
            onChange={value => this.onChange("title", value)}
            tag="input"
            required={true}
            initialValue={title}
            editMode={editMode}
          />
        </p>
        <p>
          <span>Description :</span>
          <ControlledInput
            onChange={value => this.onChange("description", value)}
            tag="input"
            required={true}
            initialValue={description}
            editMode={editMode}
          />
        </p>
        <p>
          <span>Start Date :</span>
          <ControlledInput
            onChange={value => this.onChange("startDate", value)}
            tag="input"
            type="date"
            required={true}
            initialValue={startDate}
            editMode={editMode}
          />
        </p>
       <p className={status.id===2 || status.id===3 ? 'show':''}>
          <span>Estimated Due Date :</span>
          <ControlledInput
            onChange={value => this.onChange("estimatedDueDate", value)}
            tag="input"
            type="date"
            required={true}
            initialValue={
              estimatedDueDate === "Invalid Date" ? "" : estimatedDueDate
            }
            editMode={editMode}
          />
        </p> 
       { status.id===3 ? <p>
          <span>Completion Date :</span>
          <ControlledInput
            onChange={value => this.onChange("estimatedDueDate", value)}
            tag="input"
            type="date"
            required={true}
            initialValue={
              completionDate === "Invalid Date" ? "" : completionDate
            }
            editMode={editMode}
          />
        </p> :''}
        <p> 
          <span>Budget: :</span>
          <ControlledInput
            onChange={value => this.onChange("budget", value)}
            tag="input"
            type="number"
            required={true}
            initialValue={budget}
            editMode={editMode}
          />
        </p>
        
      </form>
      
      </div>
    );
  }
}
