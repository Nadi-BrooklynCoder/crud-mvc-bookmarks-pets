const express = require('express')
const pets = express.Router()
const petsArray = require('../models/pet');
const { checkForNameKey } = require('../validations/petValidations')


// localhost:4001/pets/
pets.get('/', (req, res) => {
    res.json(petsArray)
})

pets.get('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    if(petsArray[arrayIndex]){
    res.status(200).json(petsArray[arrayIndex]);
    } else {
        res.status(404).json({ error: "Not Found"})
    }
})

pets.post('/', checkForNameKey, (req, res) => {
    petsArray.push(req.body)
    res.json(petsArray[petsArray.length - 1]);
})

pets.delete('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;

    if(petsArray[arrayIndex]){
        petsArray.splice(arrayIndex, 1);
        res.json({ message: "Successfully adopted a pet"});
    } else {
        res.json({ error: "Pet not Found"})
    }
})

pets.put('/:arrayIndex', (req, res) => {
    const { arrayIndex } = req.params;
    petsArray[arrayIndex] = req.body;
    res.status(200).json(petsArray[arrayIndex])
})

module.exports = pets