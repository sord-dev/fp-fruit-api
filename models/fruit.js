const fruitsData = require("../fruits.json");

function Fruit({
  name,
  genus = null,
  family = null,
  order = null,
  nutritions = { calories: 0, carbohydrates: 0, protein: 0, fat: 0 },
}) {
  const fruitIds = fruitsData.map((fruit) => fruit.id);
  let maxId = Math.max(...fruitIds);

  return {
    id: maxId += 1,
    name,
    genus,
    family,
    order,
    nutritions,
  };
}

module.exports = Fruit;
