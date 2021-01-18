import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import ImageUploader from 'react-images-upload';


export default class CreateFreelancer extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onProfileUpload = this.onProfileUpload.bind(this);
        this.uploadCloudinary = this.uploadCloudinary.bind(this);
        this.onPortfolioUpload = this.onPortfolioUpload.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            price: 0,
            users: [],
            profileURL: "",
            profileFile: '',
            repositoryFiles: [],
            repositoryURL: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username),
                username: response.data[0].username
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }
    
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onProfileUpload(pictureFile, pictureDataURLs) {
      console.log(pictureDataURLs);
      this.setState({
          profileFile: pictureFile
      });
  }

  onPortfolioUpload(pictureFile, pictureDataURLs) {
    const repo = this.state.repositoryFiles.slice()
    repo.push(pictureFile);
    this.setState({
      repositoryFiles: repo,
    });
  }

  async uploadCloudinary(pictureFiles, isRepo) {
    if (!Array.isArray(pictureFiles)) {
      pictureFiles = [pictureFiles];
    }
    for (const pictureIndex in pictureFiles) {
      const imageData = new FormData();
      imageData.append('file', pictureFiles[pictureIndex])
      imageData.append('upload_preset', 'freelanceMe');

      const res = await axios.post('https://api.cloudinary.com/v1_1/dxokwzig6/image/upload', imageData)
      .then((response) => {
        console.log(response);
        if (isRepo) {
          this.setState({
            repositoryURL: [...this.state.repositoryURL, response.data.url]
          });
        } else {
          this.setState({
            profileURL: response.data.url,
          })
        }

      }, (error) => {
        console.log(error);
      });

    }
  }

    async onSubmit(e) {
      e.preventDefault();

      // Upload Profile Photo
      await this.uploadCloudinary(this.state.profileFile, false);

      // Upload Repo Photo(s)
      const totalLength = this.state.repositoryFiles.length;
      await this.uploadCloudinary(this.state.repositoryFiles[totalLength-1], true);

      const freelancer = {
          username: this.state.username,
          description: this.state.description,
          price: this.state.price,
          profilePhotoUrl: this.state.profileURL,
          repositoryPhotoUrlArray: this.state.repositoryURL,
      }

      console.log(freelancer);

      axios.post('http://localhost:5000/freelancer/add', freelancer)
          .then(res => console.log(res.data));

      window.location = '/';
    }

    render() {
      console.log(this.state);
        return (
            <div>
      <h3>Register as a Freelancer</h3>
      <p><i>Create your freelance profile where you can describe your work and pricing.</i></p>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Profile Photo:</label>
          <div style={{border: "black", borderStyle: "solid", borderWidth: "3px"}}>
            <ImageUploader
                  withIcon={true}
                  buttonText='Choose Image'
                  onChange={this.onProfileUpload}
                  singleImage={true}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
              />
            </div>
        </div>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Repository</label>
          <p><i>Add portfolio pictures here:</i></p>
          <div style={{border: "black", borderStyle: "solid"}}>
            <ImageUploader
                withIcon={true}
                buttonText='Choose Image(s)'
                onChange={this.onPortfolioUpload}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
            </div>
        </div>
        <div className="form-group">
          <label>Price ($): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Submit Registration" className="btn btn-primary" />
        </div>
      </form>
    </div>
        )
    }
}