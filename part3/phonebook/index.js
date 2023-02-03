require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

morgan.token("post", (req, res) => {
  if (req.method === "POST") return JSON.stringify(req.body);
  else return "";
});

morgan.format(
  "postFormat",
  ":method :url :status :res[content-length] - :response-time ms | :post"
);

app.use(morgan("postFormat"));

const url = process.env.MONGODB_URI;
console.log(url);

const Person = require("./models/person");

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  const reqTime = new Date();
  const numOfpersons = persons.length;
  res.send(
    `<h2>Phonebook has info for ${numOfpersons} people</h2><h2>${reqTime}</h2>`
  );
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((returnedPerson) => {
      if (returnedPerson) {
        res.json(returnedPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number missing" });
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    });
    person.save().then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch(error => next(error))
  }
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: "qurey",
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndPoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return res.status(404).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send.json({ error: error.message });
  }
};

const PORT = "3001";

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
