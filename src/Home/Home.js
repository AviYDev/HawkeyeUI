import React, {
    Component
} from 'react';
import {Button} from "react-bootstrap";
import {Navbar, Nav} from 'react-bootstrap'

import '../bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Settings from "../Pages/Settings";
import Dashboard from "../Pages/Dashboard";

import {Redirect} from "react-router";

class Home extends Component {

    constructor(props) {
//http://localhost:3001

        super(props);
        this.hostname = 'http://127.0.0.1:5000'
        //this.hostname = 'https://c90f8be03a89.ngrok.io'
        this.state = {
            userInfo : "",
            redirect: false,
            gaze_status : "None",
        
        };

    }




    componentDidMount() {

     
        fetch(this.hostname+'/data',  {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then( 
            (data) => {
                console.log("Data from PYTHON SERVICE")
                console.log(data);
                NotificationManager.success('','Hawkeye connected', 5000);
            })
            .catch(console.log)
    }

    /*,
            (error) => {
                console.log("error");
                NotificationManager.error('Error', error, 5000);
            }*/

    render() {
    

    
        

            return (
                <div className="App-header">

                 
            
                 
                <Router>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

                <Navbar.Brand style={{textAlign: 'center'}}>Hawkeye</Navbar.Brand>


                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <ButtonToolbar>
                            <Link to={"/Pages/Dashboard"}>
                                            <Button  className="NavButton">Dashboard</Button>
                                        </Link>
                                        <Link to={"/Pages/Settings"}>
                                            <Button  className="NavButton" >Settings</Button>
                                        </Link>
                             

                            </ButtonToolbar>

                        </Nav>
                 
                    </Navbar.Collapse>
                </Navbar>


                <div>



                  

                    <div>

<Switch>


<Route path="/Pages/Dashboard" component={(props) => <Dashboard{...props} /> } />
<Route path="/Pages/Settings" component={(props) => <Settings{...props}   /> } />
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