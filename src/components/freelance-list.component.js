import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Freelancer = props => (
    <tr>
      <td><img className="rounded-circle" src={require('../profilelogo.jpg')} /></td>
      <td>{props.freelancer.username}</td>
      <td>{props.freelancer.description}</td>
      <td>${props.freelancer.price}</td>
      <td>
        <Link to={"/edit/"+props.freelancer._id}>View Profile</Link>
      </td>
    </tr>
  )

export default class FreelancerList extends Component {
    constructor(props) {
        super(props);

        this.deleteFreelancer = this.deleteFreelancer.bind(this);

        this.state = {
            freelancers: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/freelancer')
            .then(response => {
                this.setState({ freelancers: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteFreelancer(id) {
        axios.delete('http://localhost:5000/freelancer/'+id)
            .then(res => console.log(res.data));
        this.setState({
            freelancer: this.state.freelancer.filter(el => el._id !== id)
        })
    }

    freelanceList() {
        return this.state.freelancers.map(currentfreelance => {
         return <Freelancer freelancer={currentfreelance} deleteFreelancer={this.deleteFreelancer} key={currentfreelance._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Freelancer Catalogue</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { this.freelanceList() }
                </tbody>
                </table>
            </div>
        )
    }
}