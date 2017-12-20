import React, { Component } from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Container } from "../../components/Grid";
import Nav from "../../components/Nav";
import Header from "../../components/Header";

class About extends Component {


  render() {
    return (
      <Container fluid>
        <Nav/>
        <main className="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
        <Header>
          <h1 className="float-left text-center text-md-left header">About</h1>
        </Header>
        <section>
          <Card className="text-center">
            <CardMedia>
              <img src="images/vigor-logo.jpg" alt="" />
            </CardMedia>
            <CardTitle title="About us" />
            <CardText>
             <p>What you will find at Vigor is several different platforms that can and will assist you in becoming a healthy and new you.</p>
             <p>From the inside out, we have a unique infrastructure built with our team and partners, Where Does It Hurt, and Black Sheep Massage.</p>
             <p>These companies were built to work along side Vigor to broaden our scope of professional tools, so that we can do what others cannot.</p>
             <p>It's a complete system tailored to fit your bodies every need.  Our customer service is for sure the best; we take great pride in treating
               our clients, customers, and members like they should be treated.</p>
             <p>Our complete system's drive and effort is to help make you the best you can be.  If you just want to relax and drink coffee with a Vigor smile,
               or if you are working with Where Does It Hurt, trying to become independent of all therapists.</p>
             <p>Also, don't forget SAVINGS.  Our members save more money a year on just coffee alone.  You have to, right??</p>
             <p>Again, superior customer service is the most important aspect of our company and we are here to earn your trust from the start.</p>
            


            </CardText>
            <CardActions>
              <FlatButton label="CLick here to Contact us" href="/contact"/>
            </CardActions>
          </Card>
          <br />
        </section>
        {/* <section className="row text-center">
          <div class="col-lg-12 mb-4">
            <div class="card">
              <div class="card-header"><strong><h3>About</h3></strong></div>
              
              <div class="card-block">
                <p>At Vigor we are revolutionizing the massage therapy and personal training industry by offering a unified solution that no one can rival. The beginning of the journey begins at a question, Where Does It Hurt? In this phase our clients begin by selecting a massage or the patented techniques of movement education we have developed to alleviate their pains. Not a single movement of our client's goes unanalyzed, our professionals are trained to asses patterns in movement in order to accurately solve the problem. With an entirely personalized array of stretches and movements, each client is treated individually with precision and care. As the body recovers our team trains our clients from diagnosing the problem, to solving it, to making sure it isn't privy to resurface. Ultimately to become independent of all therapists, including ourselves, and regain control of their life.</p>
              </div>
            </div>
          </div>
        </section> */}
        <section>
          <div className="card-deck">
            <div className="card">
              <img className="card-img-top" src="images/running.jpg" alt="Card cap" />
            </div>
            <div className="card">
              <img className="card-img-top" src="images/biking.jpg" alt="Card cap" />
            </div>
          </div>
        </section>
        <br />
        <section>
          <div className="card-deck">
            <div className="card">
              <img className="card-img-top" src="images/walking.jpg" alt="Card cap" />
            </div>
            <div className="card">
              <img className="card-img-top" src="images/step.jpg" alt="Card cap" />
            </div>
            <div className="card">
              <img className="card-img-top" src="images/walkDog.jpg" alt="Card cap" />
            </div>
          </div>
        </section>
        <br />
        <section>
          
        </section>
        </main>
      </Container>
    );
  }
}

export default About;
