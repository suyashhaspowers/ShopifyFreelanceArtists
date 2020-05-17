const router = require('express').Router();
let Freelancer = require('../models/freelancer.model');

router.route('/').get((req, res) => {
    Freelancer.find()
        .then(freelancers => res.json(freelancers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const price = Number(req.body.price);

    const newFreelancer = new Freelancer({
        username,
        description,
        price
    });

    newFreelancer.save()
        .then(() => res.json('Freelancer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Freelancer.findById(req.params.id)
        .then(freelancer => res.json(freelancer))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Freelancer.findByIdAndDelete(req.params.id)
        .then(freelancer => res.json('freelancer Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Freelancer.findById(req.params.id)
        .then(freelancer => {
            freelancer.username = req.body.username;
            freelancer.description = req.body.description;
            freelancer.price = Number(req.bod.price);
            
            freelancer.save()
                .then(() => res.json('Freelancer updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
