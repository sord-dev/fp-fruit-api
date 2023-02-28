const express = require('express')
const fruitsData = require('../fruits.json')
const Fruit = require('../models/fruit')
const fs = require('node:fs')
const fruitsRouter = express.Router();

// fill route state
const fruitState = [];
fruitsData.forEach((fruit) => fruitState.push(fruit))

// get all fruits
fruitsRouter.get('/', (req, res) => {
    res.status = 200;
    res.json(fruitState)
})

// get all names
fruitsRouter.get('/names', (req, res) => {
    const fruitNames = fruitState.map(fruit => fruit.name);
    res.json(fruitNames);
})

// get one fruit
fruitsRouter.get('/:slug', (req, res) => {
    const { slug } = req.params;
    const JSONRes = fruitState.filter((fruit) => {
        return fruit.name.toLowerCase() === slug.toLowerCase()
    });

    if (JSONRes.length) {
        res.status(200)
        res.json(JSONRes[0])
    } else {
        res.status(404)
        res.send('fruit not found.')
    }
})

// create one fruit
fruitsRouter.post("/", (req, res) => {
    const { body } = req;
    const fruit = Fruit(body);

    const exists = fruitState.filter((fruit) => {
        return fruit.name.toLowerCase() == fruit.name.toLowerCase()
    })

    if (exists.length > 0) {
        fruitState.push(fruit);

        fs.writeFileSync('fruits.json', JSON.stringify(fruitState))

        console.log('adding fruit')
        res.status(301).json(fruit);
    } else {
        res.status(400).send('creation error - fruit already exists')
    }


})

// delete one fruit
fruitsRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const JSONRes = fruitState.filter((fruit) => fruit.id === Number(id))[0];

    if (JSONRes) {
        const i = fruitState.indexOf(JSONRes);
        const deleted = fruitState.splice(i, 1);

        fs.writeFileSync('fruits.json', JSON.stringify(fruitState))
        res.status(201)
        res.json({ deleted })
    } else {
        res.status(404)
        res.send('fruit not found.')
    }
})


// update fruit

// BROKEN - WILL CLEAR THE OBJECT AND MESS UP SEARCHING

// fruitsRouter.patch('/:id', (req, res) => {
//     const { body } = req;
//     console.log(body);
//     const id = Number(req.params.id);

//     const JSONRes = fruitState.filter((fruit) => fruit.id === id)[0];

//     console.log(JSONRes);

//     if (JSONRes) {
//         const i = fruitState.indexOf(JSONRes);

//         const newItem = {...fruitState[i], ...body}
//         fruitState[i] = newItem;

//         fs.writeFileSync('fruits.json', JSON.stringify(fruitState))

//         res.status(200)
//         res.json(newItem)
//     } else {
//         res.status(404)
//         res.send('fruit not found.')
//     }
// })



module.exports = { fruitsRouter, fruits: fruitState };