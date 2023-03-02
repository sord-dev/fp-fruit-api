const express = require("express");
const fruitsData = require("../fruits.json");
const Fruit = require("../models/fruit");
const fruitsRouter = express.Router();

// get all fruits
fruitsRouter.get("/", (req, res) => {
  res.status = 200;
  res.json(fruitsData);
});

// get all names
fruitsRouter.get("/all/names", (req, res) => {
  const fruitNames = fruitsData.map((fruit) => fruit.name);
  res.json(fruitNames);
});

// get one fruit
fruitsRouter.get("/:slug", (req, res) => {
  const { slug } = req.params;

  // search for fruit
  const findQuery = fruitsData.filter((fruit) => {
    return fruit.name.toLowerCase() === slug.toLowerCase();
  });

  if (findQuery.length > 0) {
    let fruit = findQuery[0];
    res.status(200);
    res.json(fruit);
  } else {
    res.status(404).json({ error: "fruit not found." });
  }
});

// create one fruit
fruitsRouter.post("/", (req, res) => {
  const { body } = req;
  const fruit = Fruit(body);

  const exists = fruitsData.filter((fruit) => {
    return fruit.name.toLowerCase() == body.name.toLowerCase();
  });

  if (exists.length === 0) {
    fruitsData.push(fruit);
    res.status(301).json(fruit);
  } else {
    res.status(409).send({ error: "creation error - fruit already exists" });
  }
});

// delete one fruit
fruitsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const findQuery = fruitsData.filter((fruit) => fruit.id == id)[0];

  if (findQuery.id) {
    const fruit = findQuery;
    const i = fruitsData.indexOf(fruit);
    const deleted = fruitsData.splice(i, 1)[0];

    res.status(202);
    res.json({ deleted });
  } else {
    res.status(404);
    res.send({ error: "fruit not found." });
  }
});

// update fruit
fruitsRouter.patch("/:id", (req, res) => {
  const { body } = req;
  const id = Number(req.params.id);

  const findQuery = fruitsData.filter((fruit) => fruit.id === id)[0];

  if (findQuery.id) {
    const i = fruitsData.indexOf(findQuery);
    const newItem = { ...findQuery, ...body };
    fruitsData[i] = newItem;
    res.status(200).json({ findQuery, newItem });
  } else {
    res.status(404).send("fruit not found.");
  }
});

module.exports = { fruitsRouter };
