import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import decode from "jwt-decode";

import Context from "./context";
import Loading from 'components/Loading/Loading';

class GlobalState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      loading: true,
      showLargeHero: false,
      showSlider: false,
      showSearchbar: null,
      heroTitle: 'Forside',
      heroImageId: '1',
    };
  }

  setSideInfo = (sideInfo) => {
    this.setState({
      heroTitle: sideInfo[0],
      heroImageId: sideInfo[1],
      showSearchbar: sideInfo[2],
    });
  };

  setHeroImageId = id => {
    this.setState({ heroImageId: id });
  };

  redirectBack = path => {
    this.setState({ redirectBack: path });
  };

  login = async ({ email, password }) => {
    let requestBody = {
      query: `
              mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                token
                }
              }
            `,
      variables: {
        email: email,
        password: password
      }
    };

    return await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("email or password is wrong" + res.status);
      }
      return res.json();
    })
    .then(res => {
      console.log('', res)
      if (res.data.login.token) {
        this.setToken(res.data.login.token);
        this.setUser(res.data.login.token);
      }
      return res;
    })
    .catch(err => {
      return err;
    });
  };
  
  // function that sets token in localstorage
  setToken = token => localStorage.setItem("token", token);

  // function that takes token to decoded
  // checks if decodeding is successful & sets user global state
  // return true/false
  setUser = token => {
    const decoded = decode(token);
    
    if(decoded) {
      this.setState({
        user: {
          _id: decoded._id,
          email: decoded.email,
          role: decoded.role
        }
      })
      return true
    } else {
      return false
    }
  }

  // function to get token from localStorage
  getToken = () => {
    let local = localStorage.getItem("token")
    return local
  }

  // function to call on logout
  // it clears localStorage & users global state
  // redirect to new page if path param is entered
  logout = (path) => {
    localStorage.removeItem("token");

    this.setState({
      user: null,
      token: null
    });
    if(path) {
      this.props.history.push("/");
    }
  };

  //function to decoded token & return true/false
  getConfirm = token => decode(token) ? true : false;
  
  // function that checks if the token is expired
  // return true/false
  isTokenExpired = token => {
    try {
      const decoded = decode(token);

      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  componentDidMount() {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      let decoded = decode(token);

      this.setState({ token: decoded });
      this.setUser(token);
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          // login: this.login,
          logout: this.logout,
          setToken: this.setToken,
          setUser: this.setUser,
          setHeroTitle: this.setHeroTitle,
          setShowSearchbar: this.setShowSearchbar,
          setHeroImageId: this.setHeroImageId,
          setSideInfo: this.setSideInfo,
        }}
        >
        {this.state.loading ? <Loading {...this.props} /> : this.props.children}
      </Context.Provider>
    );
  }
}
export default withRouter(GlobalState);
