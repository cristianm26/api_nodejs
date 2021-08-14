const express = require('express');
const app = express();
const Joi = require('@hapi/joi');

app.use(express.json());

const fruits = [
    { name: 'Manzanas', id: 1 },
    { name: 'Fresas', id: 2 },
    { name: 'Frutillas', id: 3 },
    { name: 'Limones', id: 4 },
    { name: 'Melón', id: 5 },
];

app.get('/', (req, res) => {
    res.send('Hola Mundo')
});

app.get('/api/fruits', (req, res) => {
    res.send(fruits)
})

app.get('/api/fruits/:id', (req, res) => {
    const fruit = fruits.find(c => c.id === parseInt(req.params.id));
    if (!fruit) res.status(404).send('Fruit Not Found');
    res.send(fruit);
});

// Create
app.post('/api/fruits', (req, res) => {
    const { error } = validateFruit(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    const fruit = {
        id: fruits.length + 1,
        name: req.body.name
    };
    fruits.push(fruit);
    res.send(fruit);

})

//Update
app.put('/api/fruits/:id', (req, res) => {

    const fruit = fruits.find(c => c.id === parseInt(req.params.id));
    if (!fruit) res.status(404).send('Fruit Not Found');

    const { error } = validateFruit(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    fruit.name = req.body.name;
    res.send(fruit);

})

//Eliminar
app.delete('/api/fruits/:id', (req, res) => {
    const fruit = fruits.find(c => c.id === parseInt(req.params.id));
    if (!fruit) res.status(404).send('Fruit Not Found');

    const index = fruits.indexOf(fruit);
    fruits.splice(index, 1);
    res.send(fruit);
})


function validateFruit(fruit) {
    const schema = Joi.object({ name: Joi.string().min(3).required() });
    const validation = schema.validate(fruit);
    return validation;
}



/* function validateFruit(fruit) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(fruit, schema);
} */

const port = process.env.PORT || 5001;
app.listen(port, () =>
    console.log(`Servidor Escuchando en el puerto ${port}`)
);
