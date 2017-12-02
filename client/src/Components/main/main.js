import React, {Component} from "react";

class Main extends Component {




render(){
    return(
<div>

    <div class="container">
        <div id='appt'>
            <h1>Create an Appointment:</h1>
            <div class="panel panel-default">
                <div class="panel panel-heading">
                    <h2>Service</h2>
                </div>
                <div class="panel panel-body">
                    <select id="Service">Service
                                <option default="select">Select</option>
                                <option value = "1">Deep Tissue</option>
                                <option value = "2">Medical</option>
                                <option value = "3">Neuromuscular</option>
                                <option value = "4">PreNatal</option>
                        </select>
                </div>
                <div class="panel panel-default">
                    <div class="panel panel-heading">
                        <h2>Therapist</h2>
                    </div>
                    <div class="panel panel-body">

                        <select id="Therapist">
                            <option default="select">Select</option>
                            <option value = "1">Tom</option>
                            <option value = "2">Lisa</option>
                            <option value = "3">Harry</option>
                            <option value = "4">Dick</option>
                          </select>

                    </div>
                </div><br></br>
                <button class="btn btn-lg btn-success">Book</button>
                <div id="times"></div>
                <br></br><br></br>
                <div id='calendar'></div>

            </div>
        </div>
    </div>
</div>
    )
}

}
export default Main;