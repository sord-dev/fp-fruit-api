function Fruit({name, genus = null, family = null, order = null, nutritions = null}) {
    return {id: Math.floor(Math.random() * 20000), name, genus, family, order, nutritions}
}

module.exports = Fruit;