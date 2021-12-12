// const express = require('express');
import express from 'express';
import {MongoClient} from 'mongodb';
import dotenv from "dotenv";
import { moviesRouter } from './routes/movies.js';
import { usersRouter } from './routes/users.js';
import cors from "cors";
// import bcrypt from "bcrypt";
// import { getMovies, 
//     getMovieById, 
//     deleteMovieById, 
//     addMovies, 
//     updateMovie } from './helper.js'


dotenv.config();

const app = express();

const PORT = process.env.PORT||9000;

const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(cors())

const receipies = [{
    imageurl: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gnocchi-1d16725.jpg?quality=90&webp=true&resize=375,341",
    name: "Chorizo & mozzarella gnocchi bake"
  },
  {
    imageurl: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/butter-chicken-cf6f9e2.jpg?quality=90&webp=true&resize=375,341",
    name: "Easy butter chicken"
  },
  {
    imageurl: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/classic-lasange-4a66137.jpg?quality=90&webp=true&resize=375,341",
    name: "Easy classic lasagne"
  },
  {
    imageurl: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/easy-teriyaki-c845724.jpg?quality=90&webp=true&resize=375,341",
    name: "Easy teriyaki chicken"
  }];

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB Connected");

    // const movie = await client.db("movieDb").collection("movies").findOne({id:"101"})

    // console.log(movie);
    return client;
}

export  const client = await createConnection();



app.get('/', (req, res) => {
    res.send("Hello World");
});


app.use('/movies', moviesRouter);

app.use('/users', usersRouter)


// recipes

app.get('/recipes',async (req, res)=>{
    const result = await client.db("movieDb").collection("recipes").find().toArray();
    res.send(result)
})

app.post('/recipes',async (req, res)=>{
    const data = req.body;
    const result = await client.db("movieDb").collection("recipes").insertMany(data);
    res.send(result)
})

app.listen(PORT, () => console.log("App is Started"));

