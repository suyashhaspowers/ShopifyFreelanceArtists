import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import FreelancerList from "./components/freelance-list.component";
import CreateFreelancer from "./components/create-freelancer.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <div className='container'>
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={FreelancerList} />
      <Route path="/create" component={CreateFreelancer} />
      <Route path="/user" component={CreateUser} />
    </Router>
    </div>
  );
}

export default App;
