import React, {useState} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
  const [alert, setAlert] = useState(null);

  // async componentDidMount(){
  //   this.setState({ loading:true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${
  //       process.env.REACT_APP_GITHUB_CLIENT_ID
  //     }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({users:res.data,loading:false});
  // };

  // set Alert
  const showAlert = (msg, type) => {
    setAlert({msg,type})
  };

  return ( 
    <GithubState>
      <Router>
        <div className = "App" >
          <Navbar title=" GitHub" icon="fab fa-github"/>
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <React.Fragment>
                  <Search
                  setAlert={showAlert}/>
                  <Users/>
                </React.Fragment>
              )}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' component={User}/>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;