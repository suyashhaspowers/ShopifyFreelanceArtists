const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const freelancerSchema = new Schema({
    // These are all fields for the model 
    username: { type: String, required: true },
    profilePhotoUrl: {type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    repositoryPhotoUrlArray: [String],

}, {
    timestamps: true,
});

const Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;