const express = require('express')
const app = express()
const port = 3000
const data = require('./data.json')
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/api/search", (req, res) =>{
    const { q, key } = req.query
    console.log(`Search query: ${q}, API Key: ${key}`);

    switch (q) {
        case "pizza":
            return res.json(data.pizza)
        case "salad":
            return res.json(data.salad)
    }

    res.status(404).json({ error: "Item not found"});
})

app.get("/api/recipe/:id", (req, res) => {
    const { id } = req.params;
    console.log(`Item ID: ${id}`);

    const allItems = [...data.pizza.recipes, ...data.salad.recipes];
    const Item = allItems.find(el => el.recipe_id === id);
    if (Item) {
        return res.json(Item);
    }    


    res.status(404).json({ error: "Item not found"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
