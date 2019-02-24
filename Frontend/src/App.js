import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar.js';
import LoginButton from './LoginButton/LoginButton.js';
import LoginForm from './LoginForm/LoginForm.js';
import ItemList from './ItemList/ItemList.js';
import SignupButton from './SignupButton/SignupButton.js';
import SignupForm from './SignupForm/SignupForm.js';
import PostNewPost from './PostNewPost/PostNewPost.js';
import ViewPost from './ViewPost/ViewPost.js';

class App extends Component {
  state = {
    showLogin: false,
    showSignup: false,
    give: true,
    postNew: false,
    viewPost: false,
  }

  showLoginForm = () => {
    this.setState({showLogin: true});
  }

  showSignupForm = () => {
    this.setState({showSignup: true});
  }

  hideLoginForm = () => {
    this.setState({showLogin: false});
  }

  hideSignupForm = () => {
    this.setState({showSignup: false});
  }

  showPostNew = () => {
    this.setState({postNew: true});
    console.log("hi");
  }
  hidePostNew = () => {
      this.setState({postNew: false});
  }

  // createPost = () => {
  //   let postList = [];

  //   for (let i = 0; i < 7; i++) {
  //     postList.push(
  //       <ItemList click={this.showViewPost src} />
  //     )
  //   }
  //   return postList;
  // }

  showViewPost = () => {
    this.setState({viewPost: true});
    console.log("hello");
  }

  hideViewPost = () => {
    this.setState({viewPost: false});
  }

  render() {
    return (
      <div>
        <LoginButton click={this.showLoginForm}/>
        <SignupButton click={this.showSignupForm}/>
        {this.state.showLogin && <LoginForm click={this.hideLoginForm}/>}
        {this.state.showSignup && <SignupForm click={this.hideSignupForm} />}
        {this.state.postNew && <PostNewPost click={this.hidePostNew}/>}
        {this.state.viewPost && <ViewPost click={this.hideViewPost}/>}
        <div className="container">
          <div className="leftColumn">
            <Sidebar click={this.showPostNew}/>
            {/* <div className="postNew">
              <button className="postNewButton" onClick={()=>this.showPostNew()}>
                Đăng bài mới
              </button>
            </div> */}
          </div>
          <div className="rightColumn">
            <div className="list">
              <ItemList click={this.showViewPost} source="https://www.ikea.com/PIAimages/0517381_PE640656_S5.JPG" txt="Wooden table"/>
              <ItemList click={this.showViewPost} source="https://www.ikea.com/PIAimages/0355482_PE547815_S5.JPG" txt="Wooden chair"/>
              <ItemList click={this.showViewPost} source="https://s7d2.scene7.com/is/image/academy/20212564?wid=250&hei=250" txt="Clothes"/>
              <ItemList click={this.showViewPost} source="https://www.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2061439_CD.jpg" txt="Jeans"/>
              <ItemList click={this.showViewPost} source="https://lumiere-a.akamaihd.net/v1/images/file_bf3b6713.jpeg?width=1200&region=0%2C0%2C2000%2C2000&quality=8" txt="T-Shirt"/>
              <ItemList click={this.showViewPost} source="https://scene7.josbank.com/is/image/JosBank/62F9_62_TRAVELER_PURPLE_MAIN?$browse_thumbnail$?$browse_thumbnail$" txt="Shirt"/>
              <ItemList click={this.showViewPost} source="https://www.ikea.com/PIAimages/0517381_PE640656_S5.JPG" txt="This is the best table"/>
              {/* {this.createPost()} */}
            </div>
          </div>
        </div>
        {/* //React.createElement(ItemList, onClick={}) */}
      </div>
    );
  }
}

export default App;
