const express = require('express')
const router = express.Router()
const ZooAnimal = require('../models/zooanimal')


router.get('/', async (req, res) => {
    try {
    const zooanimals = await ZooAnimal.find()
    res.json(zooanimals)
} catch (err) {
    res.status(500).json({ message: err.message })
}
})

router.get('/:id', getZooAnimal, (req, res) => {
    res.send(res.zooanimal.name)
})

router.post('/', async (req, res) => {
    const zooanimal = new ZooAnimal({
        animaltype: req.body.animaltype,
        animalname: req.body.animalname
    })

    try {
        const newZooAnimal = await zooanimal.save()
        res.status(201).json(newZooAnimal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

async function getZooAnimal(req, res, next) {
    let zooanimal
    try {
        zooanimal = await ZooAnimal.findById(req.params.id)
        if (zooanimal == null) {
            return res.status(404).json( { message: 'Cannot find zoo animal'})
        }
    } catch (err) {
        return res.status(500).json( { message: err.message })

    }
    res.zooanimal = zooanimal
    next()
}

module.exports = router