import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import ds from "../../STORE/dataservice";
import toast from '../Toast/toast'

// see https://react-select.com/home#getting-started
import Select from "react-select";
import LionessContext from "../../LionessContext/LionessContext";


export default class EditUser extends Component {
  static contextType = LionessContext;
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      ...user,

    };

  }

  onChange = (fieldName, value) => {
    this.validateField(fieldName, value);

    const changedUser = { ...this.state, [fieldName]: value }
    if ('role'.includes(fieldName)) {
      changedUser[`${fieldName}_id`] = value.id
    }
    this.setState(
      changedUser,
      () => {

      }
    );
  };

  validateField = (fieldName, value) => {


    switch (fieldName) {
      case "full_name":
break;
      case "email":

        //TODO setState with proper validation messages
        break;

      default:
        break;
    }
  };
  save() {
    // pluck out the projects and the role
    const { projects, role, ...user } = { ...this.state }

    const data = {
      user: user
    }

    return ds.saveUser(data)
      .then(res => {
        toast.info('User saved')
        return res
      })
      .catch(e => {
        toast.error('There was an error, please retry later')
      })
  }

  render() {
    const {
      full_name,
      email,
      phone,
      password,
      
    } = this.state;
    const roles = [...this.context.roles]
    roles.shift()


    const roleOpts = roles.map(role => {
      const options = { value: role.id, label: role.title };
      // { value: 'strawberry', label: 'Strawberry' },
      // { value: 'vanilla', label: 'Vanilla' }

      return options;
    });

    const { editMode } = this.props;
    //TODO add a role dropdown (cutom component)
    return (
      <div className='details'>
        <form>
          <p>
            <span>Name</span>
            {!editMode ? (
              full_name
            ) : (
                <ControlledInput
                  onChange={value => this.onChange("full_name", value)}
                  tag="input"
                  type="text"
                  required={true}
                  initialValue={full_name}
                  editMode={editMode}
                />
              )}
          </p>
          <p>
            <span>Email:</span>
            <ControlledInput
              onChange={value => this.onChange("email", value)}
              tag="input"
              type="email"
              required={true}
              initialValue={email}
              editMode={editMode}
            />
          </p>
          <p>
            <span>Phone:</span>
            <ControlledInput
              onChange={value => this.onChange("phone", value)}
              tag="input"
              type="tel"
              required={true}
              initialValue={phone}
              editMode={editMode}
            />
          </p>
          {this.state.id === -1 ?
            <>
              <span>Role:</span>
              <Select
                options={roleOpts}
                onChange={option => this.onChange("role",
                  this.context.roles.find(i => i.id === option.value))}
              />
              <p>
                <span>Password:</span>
                <ControlledInput
                  onChange={value => this.onChange("password", value)}
                  tag="input"
                  type="password"
                  required={true}
                  initialValue={password}
                  editMode={editMode}
                />
              </p>


            </>
            : ''}
        </form>

      </div>
    );
  }
}
