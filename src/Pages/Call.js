import React, {
    Component,
} from 'react';

import {Button} from "react-bootstrap";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
class Calibrage extends Component {


    constructor(props) {
        //http://localhost:3001
        
                super(props);
                this.geteyes = this.geteyes.bind(this);
                this.hostname = 'http://127.0.0.1:5000'
                //this.hostname = 'https://c90f8be03a89.ngrok.io'
                this.state = {
                    gaze_status : "None",
                    gaze_instructions : ["Blinking", "Looking left", "Looking right", "Looking center","Blinking"],
                    index : 0
                };
        
            }
        



    geteyes(){
        

        fetch(this.hostname+'/data',  {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then( 
            (data) => {
                
                this.setState({
                    gaze_status: data.gaze_status
                });     
                if (this.state.index < 5){
                if (this.state.gaze_status === this.state.gaze_instructions[this.state.index]){
                  
                    this.setState({
                        index: this.state.index + 1
                        });
                    }
                    
                }else{
                    NotificationManager.success('Good','', 5000);
                    this.setState({
                        index: 0
                        });
                    
                }
            })
            .catch(console.log)
            setTimeout(this.geteyes, 800);
           
           

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
                
                this.setState({
                    gaze_status: data.gaze_status
                });
                console.log(data);                
            })
            .catch(console.log)

           setTimeout(this.geteyes, 800);
    }


    render() {
        return(
            <div className="" style={{marginTop:'5%',float: 'left', width: '100%', paddingLeft:'20%'}} id="repositories">
            <div style={{textAlign: 'left'}}><p style={{fontSize: '1.8rem'}}>Calibration : {this.state.gaze_instructions[this.state.index]} </p></div>


         
            <p  style={{fontSize: '1.5rem', color : 'yellow'}}>
                {this.state.gaze_status} </p>
            

            
                <NotificationContainer/>
            
            </div>

        );
    }
}

export default Calibrage;

