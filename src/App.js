import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import TopNavbar from "./components/navbar.component";
import FreelancerList from "./components/freelance-list.component";
import CreateFreelancer from "./components/create-freelancer.component";
import CreateUser from "./components/create-user.component";
import PhotoCollage from "./components/photo-collage.component";
import Home from './components/home.component'

function App() {
  return (
    <div>
    <Router>
      <TopNavbar />
      <br />
      <div className="container">
        <Route path="/home" component={Home} />
        <Route path="/view" exact component={FreelancerList} />
        <Route path="/create" component={CreateFreelancer} />
        <Route path="/user" component={CreateUser} />
        <Route path="/repo/:id" component={PhotoCollage} />
      </div>
    </Router>
    </div>
  );
}

export default App;
