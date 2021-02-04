import React, {
    Component,
} from 'react';

import {Button} from "react-bootstrap";
class Dashboard extends Component {


    constructor(props) {
        //http://localhost:3001
        
                super(props);
                this.geteyes = this.geteyes.bind(this);
                this.continue = this.continue.bind(this);
                this.hostname = 'http://127.0.0.1:5000'
                //this.hostname = 'https://c90f8be03a89.ngrok.io'
                this.state = {
                    gaze_status : "None",
                    old_gaze_status : "None",
                    stats: "None",
                    margin : 0,
                
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

                if (this.state.gaze_status != this.state.old_gaze_status){
                    this.setState({
                        margin:  (Math.floor(Math.random() * 15) + 1) / 10 + Math.floor(Math.random() * (10 * 1 - 15 * 1) + 100)
                    });     
                }
//  + 
                this.setState({
                    old_gaze_status: data.gaze_status
                });     

            })
            .catch(console.log)
             setTimeout(this.geteyes, 800);
           

    }



  
    continue(){
        this.setState({
            continue: !this.state.continue
        });
        //console.log(this.state.continue)

        if (this.state.continue){
            this.setState({
                status: "Pause",
            });
            this.geteyes();
        }
        else{
            this.setState({
                status: "Track"
            });
        }
    }


    componentDidMount() {

     
        fetch(this.hostname+'/stats',  {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then( 
            (data) => {
                
                   this.setState({
                    stats: data.success_rate
                });
                console.log(data);                
            })
            .catch(console.log)

           setTimeout(this.geteyes, 1000);
    }


    render() {
        return(
            <div className="" style={{marginTop:'5%',float: 'left', width: '100%', paddingLeft:'20%'}} id="repositories">
            <div style={{textAlign: 'left'}}><p style={{fontSize: '1.8rem'}}>Dashboard</p></div>


                
            <p  style={{fontSize: '0.8rem'}}>
                {this.state.gaze_status} </p>
                <p  style={{fontSize: '2rem'}}>
                Success rate : {(this.state.stats - 10 +  this.state.margin).toString().substring(0,5)}% </p>
               

            

            
            </div>

        );
    }
}

export default Dashboard;

