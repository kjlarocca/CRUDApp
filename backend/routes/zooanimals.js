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
    res.json(res.zooanimal)
})

router.post('/', async (req, res) => {
    const zooanimal = new ZooAnimal({
        animaltype: req.body.animaltype,
        animalname: req.body.animalname,
        animaldetails: req.body.animaldetails
    })

    try {
        const newZooAnimal = await zooanimal.save()
        res.status(201).json(newZooAnimal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', getZooAnimal, async (req, res) => {
    if (req.body.animalname != null) {
        res.zooanimal.animalname = req.body.animalname
    }
    if (req.body.animaltype != null) {
        res.zooanimal.animaltype = req.body.animaltype
    }
    try {
        const updatedZooAnimal = await res.zooanimal.save()
        res.json(updatedZooAnimal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getZooAnimal, async (req, res) => {
    try {
        await ZooAnimal.findByIdAndRemove(req.params.id)
        res.json({ message: 'Animal removed successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
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