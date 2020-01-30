
import express from 'express';
//const express = require('express');
import {User, UsersController} from './UsersController';
const app = express();
const port = 3000;

const users = new UsersController();
users.addUser({id: "123", name: "Napulione Buonaparte", age: 250});
users.addUser({id: "111", name: "Francis Ford Coppola", age: 80 });


app.get('/api/v1/users', (req, res) => res.json(users.getAllUsers()));

app.get('/api/v1/users/:user_id', (req, res) => {
  const user = users.getUser(req.params.user_id);
  if(user) 
    res.send(user);
  else 
    res.status(404).send("No such id");
});

app.delete('/api/v1/users/:user_id', (req, res) => {
  const result = users.deleteUser(req.params.user_id);
  if(result) 
    res.status(204).end();
  else 
    res.status(422).send("No such id");
});

app.use(express.json());

app.post('/api/v1/users', (req, res) => {
  const user: User = req.body;

  console.log(req.body);
  if(!user || !user.id || !user.name || !user.age){
    res.status(422).send("Invalid user data");
    return;
  }

  const result = users.addUser(user);

  if(result)
    res.status(201).end();
  else
    res.status(422).send("Allready have such id!!!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));  