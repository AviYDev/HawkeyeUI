import React, {
    Component
} from 'react';
import {Button} from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Calibrage from "../Pages/Calibrage";
//import GITLABlogo from "../Ressources/gitlab-logo.png";


class Settings extends Component {


    constructor(props) {


        super(props);
        this.hostname = 'http://127.0.0.1:5000'
        //this.hostname = 'https://c90f8be03a89.ngrok.io'
        this.calibrage = this.calibrage.bind(this)
        this.appel = this.appel.bind(this)
        this.userInfo = "";
        this.state = {
            userInfo : "",
            gitlabKey: "",
            isGitlabConnected : false,
            userPayload:"",
            balance : "",
            showA : true,
            redirect: false,

        };

    }
    handleSubmit(event) {
        event.preventDefault();
    }
    validateForm() {
        return  this.state.gitlabKey.length > 0 ;
    }

  
    calibrage(){
        console.log("calibrage")
        fetch(this.hostname+'/settings/'+'calibrage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'value': "lorem ipsum",
            })
        }).then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log("error");
                console.log(error);
               
            }
        )

    }

    appel(){
        console.log("appel")
        fetch(this.hostname+'/settings/'+'appel', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                'value': "lorem ipsum",
            })
        }).then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log("error");
                console.log(error);
               
            }
        )
    }

    render() {


     
            return (
                <div className="" style={{marginTop:'5%',float: 'left', width: '100%', paddingLeft:'20%'}} id="repositories">
                <div style={{textAlign: 'left'}}><p style={{fontSize: '1.8rem'}}>Activities</p>
    
             


                                        <Router>
                                        <Link to={"/Pages/Calibrage"}>
                                            <Button  className="btn  btn-warning" >Calibration</Button>
                                        </Link>
                                        <Link to={"/Pages/Calibrage"}>
                                            <Button  className="btn  btn-warning" >Call</Button>
                                        </Link>
                                       

                                        <Switch>


<Route path="/Pages/Calibrage" component={(props) => <Calibrage{...props} /> } />

</Switch>
                             </Router>



                </div>
    
           </div>
                );

             }
 }

export default Settings;

