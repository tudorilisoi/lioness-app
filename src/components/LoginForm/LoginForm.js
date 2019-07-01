import React, { Component } from "react";
import "./LoginForm.css";
import LionessContext from "../../LionessContext/LionessContext";
import ValidationErrors from "../ValidationErrors/ValidationErrors";
import ds from "../../STORE/dataservice";
import * as EmailValidator from "email-validator";
import toast from "../Toast/toast";

const { doLogin, setStoredLoginInfo, getStoredLoginInfo, loadCurrentUser } = ds;
export default class LoginForm extends Component {
  static contextType = LionessContext;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      currentUser: {},
      emailValid: null,
      passwordValid: null,
      formValid: null,
      emailValidationMessage: "",
      passwordValidationMessage: ""
    };
  }
  componentDidMount() {
    ds.loadCurrentUser()
      .then(res => {
        this.context.setCurrentUser(res.data[0])
        this.props.history.push('/admin-dash')

      }).catch((e) => {
        console.error(e)

      })

  }
  emailChanged(email) {
    this.setState({ email });
  }
  passwordChanged(password) {
    this.setState({ password });
  }

  validateLogin(email, password) {
    let emailErrors = { ...this.state.emailValidationMessage };
    let passwordErrors = { ...this.state.passwordValidationMessage };
    let isEmailValid = null;
    let isPasswordValid = null;
    email = email.trim();
    if (email.length === 0) {
      emailErrors = "Login email is required";
      isEmailValid = false;
    } else {
      if (!EmailValidator.validate(email)) {
        emailErrors = "Please input a valid email";
        isEmailValid = false;
      } else {
        emailErrors = "";
        isEmailValid = true;
      }
    }
    if (password.length === 0) {
      passwordErrors = "Login password is required";
      isPasswordValid = false;
    } else {
      passwordErrors = "";
      isPasswordValid = true;
    }

    this.setState(
      {
        emailValidationMessage: emailErrors,
        emailValid: isEmailValid,
        passwordValidationMessage: passwordErrors,
        passwordValid: isPasswordValid
      },
      this.formValid
    );
  }

  formValid() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  }
  isAdmin() {
    if (this.state.currentUser.isAdmin) {
      this.props.history.push("/admin-dash");
    }
  }
  handleLoginSubmit(e, showToast = true) {
    e && e.preventDefault();
    const { email, password } = this.state;
    this.validateLogin(email, password);
    doLogin(email, password)
      .catch(e => {
        let errorMsg = "There was an error, please retry or reload the page";
        if (e && e.message) {
          errorMsg = e.message;
        }
        // debugger
        if (showToast === true) {
          toast.error(errorMsg);
          return false;
        }
      })
      .then(data => {
        if (data) {
          this.context.setCurrentUser(data.user);
          setStoredLoginInfo({
            authToken: data.authToken,
            userID: data.user.id
          });
        }
        return data.user;
      })
      .then(res => {
        if (res && res.role_id === 1) {
          //TODO change to rely on role
          this.props.history.push("/admin-dash");
          toast.info("Welcome!");
        }
      });
  }
  render() {
    return (
      <div className="LoginPage-Container">
        <div className="LoginPage padded">
          <h2>Welcome to Lioness!</h2>
          <p>
            Lioness is a project management tool, built to organize your
            organization's clients, project managers and contractors
          </p>
          <h2>Login</h2>
          <form className="LoginForm" onSubmit={e => this.handleLoginSubmit(e)}>
            <label htmlFor="email"> Email:</label>
            <input
              type="text"
              id="email"
              onChange={e => this.emailChanged(e.target.value)}
            />
            <ValidationErrors
              hasError={!this.state.emailValid}
              message={this.state.emailValidationMessage}
            />
            <label htmlFor="password"> Password:</label>
            <input
              name="password"
              type="password"
              id="password"
              onChange={e => this.passwordChanged(e.target.value)}
            />
            <ValidationErrors
              hasError={!this.state.passwordValid}
              message={this.state.passwordValidationMessage}
            />

            <button type="submit">Submit</button>
          </form>
          <div className="padded-top">
            <p>Demo Email: Mervin.Graham@hotmail.com</p>
            <p>Demo Password: GAfJ8cFYg2J1SdS</p>
          </div>
        </div>
      </div>
    );
  }
}
