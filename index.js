const express = require('express');
const morgan = require('morgan');
const Person = require('./mongo');
require('dotenv').config();

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  switch (error.name) {
    case 'CastError':
      response.status(400).send({ error: 'malformatted id' });
      break;
    case 'ValidationError':
      response.status(400).json({ error: error.message });
      break;
  }

  next(error);
};

morgan.token('id', function getBody(req) {
  return JSON.stringify(req.body);
});

// ===================APP=======================
const app = express();

app.use(express.static('dist'));
// app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :id'));

// ==============ROUTES====================
app.get('/info', (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `);
  });
});

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((data) => {
      if (data) {
        response.json(data);
      } else {
        response.status(404).send({ error: 'Person with the given ID not found' });
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  Person.findByIdAndDelete(id)
    .then((data) => {
      if (data) {
        response.status(204).end();
      } else {
        response.status(404).send({ error: 'Person with the given ID not found' });
      }
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  Person.find({ name: body.name }).then((data) => {
    if (data.length > 0) {
      return response.status(400).json({
        error: 'Name must be unique',
      });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person
      .save()
      .then((data) => {
        response.json(data);
      })
      .catch((error) => next(error));
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true, context: 'query' })
    .then((updatedData) => {
      if (updatedData) {
        response.json(updatedData);
      } else {
        response.status(404).send({ error: 'Person with the given ID not found' });
      }
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
