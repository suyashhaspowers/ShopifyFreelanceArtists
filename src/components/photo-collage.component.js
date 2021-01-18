import React, { Component } from 'react';
import { ReactPhotoCollage } from "react-photo-collage";
import axios from 'axios';

export default class PhotoCollage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            freelancer: null,
            name: '',
            setting: {},
            settingDone: false,
        }
    }

    async componentDidMount() {
        const {id} = this.props.match.params;
        const url = 'http://localhost:5000/freelancer/' + id;
        await axios.get(url)
          .then(response => {
              this.setState({
                freelancer: response.data,
                name: response.data.username,
            });
          })
          .catch((error) => {
            console.log(error);
          })

        let setting = {
            width: '800px',
            height: ['250px', '170px'],
            layout: [1, 4],
            showNumOfRemainingPhotos: true
          };
        
        let photos = [];
        for (const photoIndex in this.state.freelancer.repositoryPhotoUrlArray) {
            const image = {
                src: this.state.freelancer.repositoryPhotoUrlArray[photoIndex]
            };
            photos.push(image);
        }

        setting["photos"] = photos;
        this.setState({
            setting: setting,
            settingDone: true,
        });
    }

  render() {
    console.log(this.state);
    let collage;

    if (this.state.settingDone) {
        collage = (
            <ReactPhotoCollage {...this.state.setting} />
        )
    }

    return (
        <div>
            <h3>View {this.state.name}'s Repository:</h3>
            {collage}
        </div>
    );
  }
}