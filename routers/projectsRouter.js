const express = require('express');
const router = express.Router();
const Projects = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    Projects.get()
        .then(projs => {
            console.log("Projects Router", projs);
            res.status(200).json(projs);
        })
})

router.get('/:id')


function validateResId(req, res, next) {
    const ResId = req.params.id;
    if (!ResId) {
        return res.status(400).json({ message: "You did not provide a project or action id in the URL" })
    } if (isNaN(ResId)) {
        return res.status(400).json({ message: "ID must be a number" })
    }
    next();
}


module.exports = router;