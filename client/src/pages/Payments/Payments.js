
import React, { Component } from "react";
import { Container } from "../../components/Grid";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import API from "../../utils/API"
 // Set the application ID
 var applicationId = "sq0idp-lPUdSmBAeuRX-ofzZm8PAQ";
 
 // Set the location ID
 var locationId = "AZ3CYZ36ZZ2EX";
//import axios from 'axios'
//import paypal from 'paypal-rest-sdk';
//import requestCardNonce from "../../sqpaymentform.js"


  // Create and initialize a payment form object
  var paymentForm = new window.SqPaymentForm({
    
        // Initialize the payment form elements
        applicationId: applicationId,
        locationId: locationId,
        inputClass: 'sq-input',
    
        // Customize the CSS for SqPaymentForm iframe elements
        inputStyles: [{
            fontSize: '.9em'
        }],
    
        // Initialize Apple Pay placeholder ID
        applePay: {
            elementId: 'sq-apple-pay'
        },
    
        // Initialize Masterpass placeholder ID
        masterpass: {
            elementId: 'sq-masterpass'
        },
    
        // Initialize the credit card placeholders
        cardNumber: {
            elementId: 'sq-card-number',
            placeholder: '•••• •••• •••• ••••'
        },
        cvv: {
            elementId: 'sq-cvv',
            placeholder: 'CVV'
        },
        expirationDate: {
            elementId: 'sq-expiration-date',
            placeholder: 'MM/YY'
        },
        postalCode: {
            elementId: 'sq-postal-code'
        },
    
        // SqPaymentForm callback functions
        callbacks: {
    
            /*
             * callback function: methodsSupported
             * Triggered when: the page is loaded.
             */
            methodsSupported: function(methods) {
    
                var applePayBtn = document.getElementById('sq-apple-pay');
                var applePayLabel = document.getElementById('sq-apple-pay-label');
                var masterpassBtn = document.getElementById('sq-masterpass');
                var masterpassLabel = document.getElementById('sq-masterpass-label');
    
                // Only show the button if Apple Pay for Web is enabled
                // Otherwise, display the wallet not enabled message.
                if (methods.applePay === true) {
                    applePayBtn.style.display = 'inline-block';
                    applePayLabel.style.display = 'none';
                }
                // Only show the button if Masterpass is enabled
                // Otherwise, display the wallet not enabled message.
                if (methods.masterpass === true) {
                    masterpassBtn.style.display = 'inline-block';
                    masterpassLabel.style.display = 'none';
                }
            },
    
            /*
             * callback function: createPaymentRequest
             * Triggered when: a digital wallet payment button is clicked.
             */
            createPaymentRequest: function() {
    
                var paymentRequestJson;
                /* ADD CODE TO SET/CREATE paymentRequestJson */
                return paymentRequestJson;
            },
    
            /*
             * callback function: cardNonceResponseReceived
             * Triggered when: SqPaymentForm completes a card nonce request
             */
            cardNonceResponseReceived: function(errors, nonce, cardData) {
                if (errors) {
                    // Log errors from nonce generation to the Javascript console
                    console.log("Encountered errors:");
                    errors.forEach(function(error) {
                        console.log('  ' + error.message);
                    });
    
                    return;
                } else {

                    alert('Nonce received: ' + nonce); /* FOR TESTING ONLY */
                    chargeCardWithNonce(nonce);
                }
    
                

                
                // Assign the nonce value to the hidden form field
                document.getElementById('card-nonce').value = nonce;
    
                // POST the nonce form to the payment processing page
                document.getElementById('nonce-form').submit();
    
            },
    
            /*
             * callback function: unsupportedBrowserDetected
             * Triggered when: the page loads and an unsupported browser is detected
             */
            unsupportedBrowserDetected: function() {
                /* PROVIDE FEEDBACK TO SITE VISITORS */

            },
    
            /*
             * callback function: inputEventReceived
             * Triggered when: visitors interact with SqPaymentForm iframe elements.
             */
            inputEventReceived: function(inputEvent) {
                switch (inputEvent.eventType) {
                    case 'focusClassAdded':
                        /* HANDLE AS DESIRED */
                        break;
                    case 'focusClassRemoved':
                        /* HANDLE AS DESIRED */
                        break;
                    case 'errorClassAdded':
                        /* HANDLE AS DESIRED */
                        break;
                    case 'errorClassRemoved':
                        /* HANDLE AS DESIRED */
                        break;
                    case 'cardBrandChanged':
                        /* HANDLE AS DESIRED */
                        break;
                    case 'postalCodeChanged':
                        /* HANDLE AS DESIRED */
                        break;
                }
            },
    
            /*
             * callback function: paymentFormLoaded
             * Triggered when: SqPaymentForm is fully loaded
             */
            paymentFormLoaded: function() {
                /* HANDLE AS DESIRED */
                console.log("Payment form loaded");
            }
        }
    });

//Card Number: 4532759734545858
//Postal Code: 94103


function chargeCardWithNonce (nonce){
    const payment = {
    buyerInfo : {
        buyer_email_address: "test@test.com",
        shipping_address: {
            address_line_1: "123 main street",
            locality: "San Francisco",
            administrative_district_level_1: "CA",
            postal_code: "94114",
            country: "US"
            }
        },
    merchantInfo: {
        application_id: applicationId,
        location_id: locationId
    },
    nonce: nonce
    }


API.createPayment(payment);

}























// const handleSubmit = () => {
    
//     paypal.configure({
//         mode: 'sandbox', // Sandbox or live
//         client_id: '',
//         client_secret: ''});

//     const card_data = {
//         "type": "visa",
//         "number": "4417119669820331",
//         "expire_month": "11",
//         "expire_year": "2018",
//         "cvv2": "123",
//         "first_name": "Joe",
//         "last_name": "Shopper"
//       };
//      axios.post('api/payments', (res, req) => {
        
//         paypal.creditCard.create(card_data, function(error, credit_card){
//             if (error) {
//               console.log(error);
//               throw error;
//             } else {
//               console.log("Create Credit-Card Response");
//               console.log(credit_card);
//             }
//           })

//      })
//      .then(response => 
//        {
//            console.log(response);
//        }
//      )
//      .catch(err => {
//        console.log(err)
//      })
//    }


class Payments extends Component {
        
       
        
      
state={
    cardNumber: "",
    cvv: ""
};

handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
   
  };
  
/*
 * function: requestCardNonce
 *
 * requestCardNonce is triggered when the "Pay with credit card" button is
 * clicked
 *
 * Modifying this function is not required, but can be customized if you
 * wish to take additional action when the form button is clicked.
 */
requestCardNonce = (event) =>{
    console.log(event);
    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();

    // Request a nonce from the SqPaymentForm object
    paymentForm.requestCardNonce();

    console.log(paymentForm);
}


  render() {  
    return (
    <Container fluid>
        <Nav />
        <main className="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
            <Header>
                <h1 className="float-left text-center text-md-left header">Payments</h1>
            </Header>
            <br />
            <section>
                <div id="pay-invoice" className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h3 className="text-center">Pay with PayPal</h3>
                        </div>
                        <hr />
                        <div className="form-group text-center">
                            <ul className="list-inline">
                                <li className="list-inline-item"><i className="fa fa-paypal fa-2x" aria-hidden="true"></i></li>
                            </ul>
                        </div>
                        <form target="paypal" action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value="NFQESSVC9HEKJ" />
                        
                        <div className="form-group">
                            <input type="hidden" name="on0" value="Choose duration" />Choose duration of service
                            <select name="os0" class="form-control">
                                <option value="30 min">30 min $54.99 USD</option>
                                <option value="60 min">60 min $99.99 USD</option>
                                <option value="90 min">90 min $124.99 USD</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="hidden" name="on1" value="Choose type of service" />Choose type of service
                            <select name="os1" class="form-control">
                                <option value="Personal Training">Personal Training </option>
                                <option value="Cardio Training">Cardio Training </option>
                                <option value="Movement Education">Movement Education </option>
                                <option value="Clinical Bodywork">Clinical Bodywork </option>
                                <option value="Massage Therapy">Massage Therapy </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="hidden" name="on2" value="Choose a Therapist" />Choose a Therapist
                            <select name="os2" class="form-control">
                                <option value="Carrie">Carrie </option>
                                <option value="Judge">Judge </option>
                                <option value="Steven">Steven </option>
                            </select>
                        </div>
                        <input type="hidden" name="currency_code" value="USD" />
                        <button type="submit" name="submit" class="btn btn-lg btn-primary btn-block">Add to cart</button>
                        </form>
                    </div>
                </div>
                <br />
            </section>

            <section>
            <div id="pay-invoice" className="card">
                <div className="card-body">
                    <div className="card-title">
                        <h3 className="text-center">Pay with Square</h3>
                    </div>
                    <hr />
                    <div className="form-group text-center">
                        <ul className="list-inline">
                            <li><img src="images/Square-Payment-Methods.jpg" alt="square"/></li>
                        </ul>
                    </div>
                    <div className="form-group">
                        <input type="hidden" name="on0" value="Choose duration" />Choose duration of service
                        <select name="os0" class="form-control">
                        <option value="30 min">30 min $54.99 USD</option>
                        <option value="60 min">60 min $99.99 USD</option>
                        <option value="90 min">90 min $124.99 USD</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="hidden" name="on1" value="Choose type of service" />Choose type of service
                        <select name="os1" class="form-control">
                            <option value="Personal Training">Personal Training </option>
                            <option value="Cardio Training">Cardio Training </option>
                            <option value="Movement Education">Movement Education </option>
                            <option value="Clinical Bodywork">Clinical Bodywork </option>
                        </select>
                    </div>

                    <div id="sq-ccbox">
            {/* <!--
                You should replace the action attribute of the form with the path of
                the URL you want to POST the nonce to (for example, "/process-card")
            --> */}
            <form id="nonce-form">
                Pay with a Credit Card
                <table>
                <tbody>
                <tr>
                    <td>Card Number:</td>
                    <td><div id="sq-card-number"
                    name= "cardNumber"
                    value={this.state.cardNumber}
                    onChange={this.handleChange}></div></td>
                </tr>
                <tr>
                    <td>CVV:</td>
                    <td><div id="sq-cvv"
                    name="cvv"
                    value={this.state.cvv}
                    onChange={this.handleChange}></div></td>
                </tr>
                <tr>
                    <td>Expiration Date: </td>
                    <td><div id="sq-expiration-date"
                    onChange={this.handleChange}></div></td>
                </tr>
                <tr>
                    <td>Postal Code:</td>
                    <td><div id="sq-postal-code"
                    onChange={this.handleChange}></div></td>
                </tr>
                <tr>
                    <td colspan="2">
                    <button id="sq-creditcard" className="button-credit-card btn btn-lg btn-primary btn-block" onClick={this.requestCardNonce}>
                        Pay with card
                    </button>
                    </td>
                </tr>
                </tbody>
                </table>

                {/* <!--
                After a nonce is generated it will be assigned to this hidden input field.
                --> */}
                <input type="hidden" id="card-nonce" name="nonce"/>
            </form>
            </div>
        </div>
    </div>
    <br />
</section>


            

 </main>
 </Container>
    );
  }
}

export default Payments;