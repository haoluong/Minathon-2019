import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar.js';
import LoginButton from './LoginButton/LoginButton.js';
import LoginForm from './LoginForm/LoginForm.js';
import ItemList from './ItemList/ItemList.js';
import SignupButton from './SignupButton/SignupButton.js';
import SignupForm from './SignupForm/SignupForm.js';

class App extends Component {

  state = {
    showLogin: false,
    showSignup: false,
  }

  showLoginForm() {
    this.setState({showLogin: true});
  }

  showSignupForm() {
    this.setState({showSignup: true});
  }

  hideLoginForm() {
    this.setState({showLogin: false});
  }

  hideSignupForm() {
    this.setState({showSignup: false});
  }

  render() {
    return (
      <div>
        <LoginButton click={()=>this.showLoginForm()}/>
        <SignupButton click={()=>this.showSignupForm()} />
        {this.state.showLogin && <LoginForm click={()=>this.hideLoginForm()}/>}
        {this.state.showSignup && <SignupForm click={()=>this.hideSignupForm()} />}
        <div className="container">
          <div className="leftColumn">
            <Sidebar />
          </div>
          <div className="rightColumn">
            <div className="list">
              <ItemList />
              <ItemList />
              <ItemList />
              <ItemList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
