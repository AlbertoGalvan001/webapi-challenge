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

router.get('/:id', validateResId, (req, res) => {
    Projects.get(req.params.id)
        .then(proj => {
            if (!proj) {
                return res.status(404).json({ message: "No project matching that id in database" })
            }
            console.log("Projects Router", proj);
            res.status(200).json(proj);
        })
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong with your post." })
        })
})

router.put('/:id', validateResId, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Projects.update(id, changes)
        .then(updateProj => {
            if (!updateProj) {
                return res.status(400).json({ message: "There is no project matching that id in the database." })
            } res.status(200).json(updateProj);
        })
        .catch(err => res.status(500).json({ errorMessage: "Something went wrong with your update." }))
})

router.delete('/:id', validateResId, (req, res) => {
    const { id } = req.params;
    Projects.remove(id)
        .then(removed => {
            res.status(200).json(id)
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error deleting info" })
        })
})


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