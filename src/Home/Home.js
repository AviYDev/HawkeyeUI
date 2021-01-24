import React, {
    Component, useState
} from 'react';
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Navbar, Nav, NavDropdown, Card} from 'react-bootstrap'

import '../bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import GitlabCredView from "../Pages/Settings";
import HomeView from "../Pages/Dashboard";

import {Redirect} from "react-router";

class Home extends Component {

    constructor(props) {
//http://localhost:3001

        super(props);
        this.hostname = 'https://ece-projectmanager-back.herokuapp.com'
        this.state = {
            userInfo : "",
            redirect: false,
        
        };

    }



 


    componentDidMount() {

        this.setState({redirect: false});


        fetch(this.hostname+'/getUser',  {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access_token':localStorage.getItem('access_token'),
            }
        })   .then(res => res.json())
            .then((data) => {
                console.log('UserInfo !');
     

            })
            .catch(console.log)
    }

    render() {
        const { redirect } = this.state;

        if (this.state.redirect) {
            return (
                <Router>
                    <Redirect exact from="/" to='/SignIn'/>
                </Router>);
        }


            return (
                <div className="App-header">

                  
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

                                <Navbar.Brand>Hawkeye</Navbar.Brand>


                        </Navbar>


                   
                    <Router>
                    <Link to={"/Pages/Dashboard"}>
                                            <Button  >Dashboard</Button>
                                        </Link>
                                        <Link to={"/Pages/Settings"}>
                                            <Button  >Settings</Button>
                                        </Link>


                    <div>

                        <div>

                            <Switch>


                                <Route path="/Pages/Dashboard" component={(props) => <HomeView{...props} gitlab_public={this.state.gitlab_public} gitlab_ece={this.state.gitlab_ece} />} />
                                <Route path="/Pages/Settings" component={(props) => <GitlabCredView{...props}  gitlabKey={this.state.gitlabKey} gitlabKeyAdded={this.gitlabKeyAdded} user={this.state.userInfo}  />} />
                            </Switch>
                            <Redirect exact from="/" to="/Pages/Dashboard" />

                        </div>
                


                    </div>
                </Router>
                    <NotificationContainer/>
                </div>

            );
    }

}



export default Home;
/* <ButtonToolbar>
                                        <Link to={"/Pages/Dashboard"}>
                                            <Button  className="NavButton" >Repositories</Button>
                                        </Link>
                                        <Link to={"/Pages/Settings"}>
                                            <Button  className="NavButton" >Gitlab Token</Button>
                                        </Link>
                                       

                                    </ButtonToolbar> */