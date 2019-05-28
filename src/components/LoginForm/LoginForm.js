import React, { Component } from "react";
import "./LoginForm.css";
import LionessContext from "../../LionessContext/LionessContext";
import ValidationErrors from '../ValidationErrors/ValidationErrors';
import ds from '../../STORE/dataservice';
import { thisTypeAnnotation } from "@babel/types";
import * as EmailValidator from 'email-validator'
const {getUserLogin} =ds
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
      emailValidationMessage:"",
      passwordValidationMessage:"",
    };
  }
  emailChanged(email) {
    this.setState({ email });
  }
  passwordChanged(password) {
    this.setState({ password });
  }

  validateLogin(email, password){
      let emailErrors = {...this.state.emailValidationMessage }
      let passwordErrors={...this.state.passwordValidationMessage}
let isEmailValid= null
let isPasswordValid= null
email = email.trim();
if(email.length === 0) {
    emailErrors= "Login email is required";
    isEmailValid= false;
}else{
  if(!EmailValidator.validate(email)){
    emailErrors= "Please input a valid email";
    isEmailValid= false;
  }else{
  emailErrors= "";
  isEmailValid =true;
}
}
if(password.length===0){
  passwordErrors= "Login password is required";
  isPasswordValid= false;
}
else{
  passwordErrors= "";
  isPasswordValid = true;

}

this.setState(
    {
        emailValidationMessage:emailErrors,
        emailValid: isEmailValid,
        passwordValidationMessage:passwordErrors,
        passwordValid: isPasswordValid
    },
    this.formValid
)
  }

formValid(){
    this.setState({
        formValid: this.state.emailValid && this.state.passwordValid
    })
}
isAdmin(){
    if(this.state.currentUser.isAdmin){
       this.props.history.push('/admin-dash')
    }
}
handleLoginSubmit(e){
    e.preventDefault();
    const {email, password} = this.state
    this.validateLogin(email,password)
    getUserLogin(email,password)
    .catch((e)=>{
      console.log(e)
    })
    .then(data=>{
      this.setState({
        currentUser: data
      })
    
     
})

}
  render() {
console.log(this.state)
    return (
      <div className="LoginForm-Container">
        <h2>Login</h2>
        <form className="LoginForm"onSubmit={e=>this.handleLoginSubmit(e)}>
          <label htmlFor="email"> Email:</label>
          <input
            type="text"
            id="email"
            onChange={e => this.emailChanged(e.target.value)}
          />
          <ValidationErrors 
          hasError= {!this.state.emailValid}
          message={this.state.emailValidationMessage}
          />
          <label htmlFor="password"> Password:</label>
          <input
            type="password"
            id="password"
            onChange={e => this.passwordChanged(e.target.value)}
          />
          <ValidationErrors 
          hasError= {!this.state.passwordValid}
          message={this.state.passwordValidationMessage}
          />
          {/* <Link to={'/admin-dash'}></Link> */}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
