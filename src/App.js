import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends React.Component {
  state = {
    users: [],
    loading:false,
    alert:null
  };

  // async componentDidMount(){
  //   this.setState({ loading:true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${
  //       process.env.REACT_APP_GITHUB_CLIENT_ID
  //     }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({users:res.data,loading:false});
  // };

  // search Github users
  searchUsers = async text => {
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users:res.data.items,loading:false});
  };

  // clear users
  clear = () => {
    this.setState({
      users: [],
      loading:false,
      alert:null
    });
  };

  // set Alert
  setAlert = (msg, type) => {
    this.setState({alert: {msg,type}});
  }

  render() {
    const {loading,users} = this.state;

    return ( 
      <Router>
        <div className = "App" >
          <Navbar title=" GitHub" icon="fab fa-github"/>
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <React.Fragment>
                  <Search 
                  searchUsers={this.searchUsers} 
                  clear={this.clear} 
                  showClear={users.length >0 ? true:false}
                  setAlert={this.setAlert}/>
                  <Users loading={loading} users={users}/>
                </React.Fragment>
              )}/>
              <Route exact path='/about' component={About}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
};

export default App;