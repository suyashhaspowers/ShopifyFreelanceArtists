import React, { Component } from 'react';
import {Jumbotron, Button} from 'react-bootstrap'
import '../styles.css'

export default class Home extends Component {

  render() {
    return (
        <Jumbotron id="jumbotron" className="text-center jumbotron" >
        <h1>Shopify FreelanceMe</h1>
        <p>
            Find Shopify-endorsed Freelance Artists to help support your business.
        </p>
        <p>
            <Button variant="primary" style={{marginRight: "15px"}} href="/view">Find Freelancers</Button>
            <Button variant="success" href="/create">Sign Up as a Freelancer</Button>
        </p>
    </Jumbotron>
    );
  }
}