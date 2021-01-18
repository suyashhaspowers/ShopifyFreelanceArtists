import React, { Component } from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class TopNavbar extends Component {

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <div className="container">
          <Navbar.Brand href="/home">Shopify - FreelanceMe</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/view">Find Freelancer</Nav.Link>
            <Nav.Link href="/create">Create Freelancer Profile</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Button href="/user" variant="light">+</Button>
          </Nav>
        </div>
      </Navbar>
    );
  }
}