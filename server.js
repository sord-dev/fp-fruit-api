require('dotenv').config()
const express = require('express');
const { expressLogger } = require('./utils')
const { fruitsRouter, fruits } = require('./routers');
const cors = require('cors')

// --- standard setup ---
const port = process.env.DEFAULT_PORT || 5000;
const app = express();


// --- middleware ---
app.use(express.json());
app.use(cors());
app.use(expressLogger)

// --- routes ---

// home route
app.get('/', (req, res) => {
    res.json({ message: `welcome to the fruity api copy! therer are currently ${fruits.length} fruits in this api, search to get more information on them! HINT - fruits/names` })
})

// fruits routes 
app.use('/fruits', fruitsRouter)

// --- app listen --- 
app.listen(port, () => console.log(`app listening on port ${port}`))