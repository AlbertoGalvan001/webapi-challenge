const express = require('express');
const router = express.Router();
const Actions = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
    Actions.get()
        .then(actns => {
            console.log("Actions Router", actns);
            res.status(200).json(actns);
        })
})

module.exports = router;