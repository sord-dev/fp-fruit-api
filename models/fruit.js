function Fruit({ name, genus = null, family = null, order = null, nutritions = { calories: 0, carbohydrates: 0, protein: 0, fat: 0, } }) {
    return { id: Math.floor(Math.random() * 20000), name, genus, family, order, nutritions }
}

module.exports = Fruit;